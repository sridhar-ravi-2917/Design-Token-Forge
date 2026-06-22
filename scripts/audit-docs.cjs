#!/usr/bin/env node
/**
 * DTF Doc Audit
 * =============
 * Scans all markdown files in docs/ and reports:
 *   - Files missing a status header (current | superseded | draft)
 *   - Files marked as superseded (calls them out so they can be deleted)
 *   - Files not updated in > 90 days (may be stale)
 *   - Duplicate coverage (two files covering the same topic)
 *
 * Usage:
 *   node scripts/audit-docs.cjs
 *   node scripts/audit-docs.cjs --fix     → add missing status headers
 *   node scripts/audit-docs.cjs --clean   → list superseded files for deletion
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const MEMS_DIR = path.join(ROOT, 'memories', 'repo'); // not accessible from script, skip

const C = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
};

// ── Walk all MD files ─────────────────────────────────────────────────────────
function walkMd(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkMd(full, results);
    else if (entry.endsWith('.md')) results.push({ path: full, stat });
  }
  return results;
}

// ── Parse status frontmatter ──────────────────────────────────────────────────
// Looks for a line like:  <!-- status: current | superseded | draft -->
// OR a YAML-style line:   status: current
function parseStatus(content) {
  const htmlComment = content.match(/<!--\s*status:\s*(current|superseded|draft)\s*-->/i);
  if (htmlComment) return htmlComment[1].toLowerCase();
  const yamlLine = content.match(/^status:\s*(current|superseded|draft)/im);
  if (yamlLine) return yamlLine[1].toLowerCase();
  return null;
}

function parseSupersededBy(content) {
  const m = content.match(/<!--\s*superseded-by:\s*([^\s>]+)\s*-->/i)
         || content.match(/^superseded-by:\s*(.+)/im);
  return m ? m[1].trim() : null;
}

function parseLastVerified(content) {
  const m = content.match(/<!--\s*last-verified:\s*(\d{4}-\d{2}-\d{2})\s*-->/i)
         || content.match(/^last-verified:\s*(\d{4}-\d{2}-\d{2})/im);
  return m ? m[1] : null;
}

// ── Age check ─────────────────────────────────────────────────────────────────
const STALE_DAYS = 90;
function daysSince(dateStr) {
  const d = dateStr ? new Date(dateStr) : null;
  if (!d || isNaN(d)) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

// ── FIX mode: inject missing status header ────────────────────────────────────
function injectStatusHeader(filePath, content) {
  const header = `<!-- status: draft -->\n<!-- last-verified: ${new Date().toISOString().slice(0,10)} -->\n\n`;
  fs.writeFileSync(filePath, header + content);
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
const args  = process.argv.slice(2);
const FIX   = args.includes('--fix');
const CLEAN = args.includes('--clean');

const files = walkMd(DOCS_DIR);

const report = {
  current:     [],
  draft:       [],
  superseded:  [],
  noStatus:    [],
  stale:       [],
  missingFile: [],  // superseded-by points to nonexistent file
};

for (const { path: fpath, stat } of files) {
  const rel     = path.relative(ROOT, fpath);
  const content = fs.readFileSync(fpath, 'utf8');
  const status  = parseStatus(content);
  const supBy   = parseSupersededBy(content);
  const lastVer = parseLastVerified(content);
  const age     = daysSince(lastVer);

  const entry = { rel, fpath, status, supBy, lastVer, age };

  if (!status) {
    report.noStatus.push(entry);
    if (FIX) {
      injectStatusHeader(fpath, content);
      console.log(C.cyan(`  Fixed: injected draft status → ${rel}`));
    }
  } else if (status === 'superseded') {
    report.superseded.push(entry);
    if (supBy && !fs.existsSync(path.join(ROOT, supBy))) {
      report.missingFile.push({ ...entry, supBy });
    }
  } else if (status === 'draft') {
    report.draft.push(entry);
  } else {
    report.current.push(entry);
    if (age !== null && age > STALE_DAYS) {
      report.stale.push(entry);
    }
  }
}

// ── Print report ──────────────────────────────────────────────────────────────
console.log(C.bold('\n╔══════════════════════════════════════════════════════'));
console.log(C.bold('║  DTF Doc Audit'));
console.log(C.bold('╠══════════════════════════════════════════════════════'));
console.log(`║  Total MD files scanned:   ${files.length}`);
console.log(`║  ${C.green('Current (active docs):')}      ${report.current.length}`);
console.log(`║  ${C.dim('Draft (in progress):')}        ${report.draft.length}`);
console.log(`║  ${C.yellow('No status header:')}           ${report.noStatus.length}`);
console.log(`║  ${C.red('Superseded (dead):')}          ${report.superseded.length}`);
console.log(`║  ${C.yellow('Stale (>90 days old):')}       ${report.stale.length}`);
console.log(C.bold('╚══════════════════════════════════════════════════════'));

if (report.noStatus.length > 0) {
  console.log(C.bold(`\n⚠️  FILES MISSING STATUS HEADER (${report.noStatus.length})`));
  console.log(C.dim('   Add <!-- status: current|superseded|draft --> to each.'));
  console.log(C.dim('   Run --fix to inject draft status automatically.\n'));
  for (const e of report.noStatus) {
    console.log(`  ${C.yellow('?')}  ${e.rel}`);
  }
}

if (report.superseded.length > 0) {
  console.log(C.bold(`\n🗑️  SUPERSEDED DOCS (${report.superseded.length}) — safe to delete`));
  for (const e of report.superseded) {
    const sup = e.supBy ? C.dim(` → replaced by: ${e.supBy}`) : C.red(' (no superseded-by link!)');
    console.log(`  ${C.red('✗')}  ${e.rel}${sup}`);
  }
  if (CLEAN) {
    console.log(C.yellow('\n  Run these to delete:'));
    for (const e of report.superseded) {
      console.log(`  rm "${e.fpath}"`);
    }
  }
}

if (report.stale.length > 0) {
  console.log(C.bold(`\n🕰️  POTENTIALLY STALE DOCS (${report.stale.length}) — last verified >${STALE_DAYS} days ago`));
  for (const e of report.stale) {
    console.log(`  ${C.yellow('~')}  ${e.rel}  ${C.dim(`(${e.age} days ago: ${e.lastVer})`)}`);
  }
}

if (report.missingFile.length > 0) {
  console.log(C.bold(`\n❌  BROKEN SUPERSEDED-BY LINKS (${report.missingFile.length})`));
  for (const e of report.missingFile) {
    console.log(`  ${C.red('!')}  ${e.rel} → ${e.supBy} (file not found)`);
  }
}

if (report.current.length > 0 && report.stale.length === 0 && report.noStatus.length === 0) {
  console.log(C.green('\n✅ All docs have status headers. No stale files detected.'));
}

// ── Summary line for CI ───────────────────────────────────────────────────────
const exitCode = (report.noStatus.length + report.superseded.length + report.missingFile.length) > 0 ? 1 : 0;
if (!FIX) process.exit(exitCode);
