#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2] || 'artifacts/demo-qc/results.json';
const outputPath = process.argv[3] || 'artifacts/demo-qc/summary.md';

function walkSuites(suites, failures) {
  if (!Array.isArray(suites)) return;
  for (const suite of suites) {
    if (Array.isArray(suite.specs)) {
      for (const spec of suite.specs) {
        const tests = Array.isArray(spec.tests) ? spec.tests : [];
        for (const t of tests) {
          const results = Array.isArray(t.results) ? t.results : [];
          for (const r of results) {
            if (!r || r.status === 'passed' || r.status === 'skipped') continue;
            const errors = Array.isArray(r.errors) ? r.errors : [];
            const firstError = errors[0] || {};
            failures.push({
              project: t.projectName || t.projectId || 'unknown',
              title: spec.title || 'Unnamed test',
              file: spec.file || '',
              line: spec.line || '',
              status: r.status || 'failed',
              message: (firstError.message || '').split('\n').slice(0, 4).join(' ').trim(),
              retry: r.retry || 0,
            });
          }
        }
      }
    }
    walkSuites(suite.suites, failures);
  }
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function esc(v) {
  return String(v || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

if (!fs.existsSync(inputPath)) {
  ensureDir(outputPath);
  const missing = [
    '# Demo QC Summary',
    '',
    `- Status: missing report`,
    `- JSON file not found: ${inputPath}`,
    '',
    'Playwright may have failed before producing JSON output.',
    '',
  ].join('\n');
  fs.writeFileSync(outputPath, missing, 'utf8');
  console.log(`[demo-qc] Missing JSON report at ${inputPath}`);
  process.exit(0);
}

const raw = fs.readFileSync(inputPath, 'utf8');
let report;
try {
  report = JSON.parse(raw);
} catch (err) {
  ensureDir(outputPath);
  fs.writeFileSync(
    outputPath,
    `# Demo QC Summary\n\n- Status: invalid JSON\n- Error: ${String(err.message || err)}\n`,
    'utf8'
  );
  console.log('[demo-qc] Invalid JSON report');
  process.exit(0);
}

const stats = report.stats || {};
const failures = [];
walkSuites(report.suites, failures);

const lines = [];
lines.push('# Demo QC Summary');
lines.push('');
lines.push(`- Expected tests: ${stats.expected || 0}`);
lines.push(`- Unexpected failures: ${stats.unexpected || 0}`);
lines.push(`- Flaky: ${stats.flaky || 0}`);
lines.push(`- Skipped: ${stats.skipped || 0}`);
lines.push(`- Duration (ms): ${Math.round(stats.duration || 0)}`);
lines.push('');

if (!failures.length) {
  lines.push('## Result');
  lines.push('');
  lines.push('All demo QC checks passed.');
  lines.push('');
} else {
  lines.push('## Failures');
  lines.push('');
  lines.push('| Project | Test | Location | Status | Retry | Message |');
  lines.push('|---|---|---|---|---:|---|');
  failures.slice(0, 200).forEach((f) => {
    const location = f.file ? `${f.file}:${f.line || ''}` : '';
    lines.push(
      `| ${esc(f.project)} | ${esc(f.title)} | ${esc(location)} | ${esc(f.status)} | ${esc(f.retry)} | ${esc(f.message)} |`
    );
  });
  lines.push('');
  if (failures.length > 200) {
    lines.push(`_Only first 200 failures shown (${failures.length} total)._`);
    lines.push('');
  }
}

ensureDir(outputPath);
fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log(`[demo-qc] Wrote summary: ${outputPath}`);
