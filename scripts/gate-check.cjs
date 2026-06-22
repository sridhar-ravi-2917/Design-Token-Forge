#!/usr/bin/env node
/**
 * DTF Component Gate Check
 * ========================
 * Enforces the 6-gate quality system for component development.
 * No component can advance to Gate N without Gate N-1 passing.
 *
 * Usage:
 *   node scripts/gate-check.cjs <component>           → check current gate
 *   node scripts/gate-check.cjs <component> --gate=N  → check specific gate
 *   node scripts/gate-check.cjs <component> --advance  → run check + advance if passing
 *   node scripts/gate-check.cjs --all                 → status of all components
 *   node scripts/gate-check.cjs --regression          → detect token drift on shipped comps
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const STATUS_F  = path.join(__dirname, 'component-gates.json');
const SNAP_DIR  = path.join(__dirname, 'snapshots');
const BRIEFS    = path.join(ROOT, 'docs/components/briefs');
const SPECS     = path.join(ROOT, 'specs/components');
const COMP_SRC  = path.join(ROOT, 'packages/components/src');
const DEMO_DIR  = path.join(ROOT, 'demo');

// ── Interactive components that MUST have tap-target + focus-visible ─────────
const INTERACTIVE = new Set([
  'button','split-button','menu-button','icon-button',
  'toggle','checkbox','radio','input','textarea','select',
  'slider','datepicker','file-upload',
  'accordion','tabs','pagination','link','modal','drawer',
  'popover','sheet','menu','navbar'
]);

// ── Components that are Figma-blueprint-ready ─────────────────────────────────
const PLUGIN_FILE = path.join(ROOT, 'packages/figma-plugin/code.js');

// ── ANSI colours ─────────────────────────────────────────────────────────────
const C = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
};

function pass(msg) { return { ok: true,  msg: C.green('✅ ') + msg }; }
function fail(msg) { return { ok: false, msg: C.red('❌ ') + msg }; }
function warn(msg) { return { ok: true,  msg: C.yellow('⚠️  ') + msg, warn: true }; }

// ── Load / save status file ───────────────────────────────────────────────────
function loadStatus() {
  if (!fs.existsSync(STATUS_F)) return {};
  return JSON.parse(fs.readFileSync(STATUS_F, 'utf8'));
}
function saveStatus(data) {
  fs.writeFileSync(STATUS_F, JSON.stringify(data, null, 2));
}

// ═════════════════════════════════════════════════════════════════════════════
// GATE DEFINITIONS
// Each gate returns an array of {ok, msg} result objects.
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Gate 0 — Research brief must exist and be structurally complete.
 */
function checkGate0(comp) {
  const results = [];
  const briefDir = path.join(BRIEFS, comp);

  if (!fs.existsSync(briefDir)) {
    return [fail(`Brief folder missing: docs/components/briefs/${comp}/
       → Copy TEMPLATE/ and fill it in before writing any code.`)];
  }

  const required = [
    { file: '00-anatomy.md',      checks: [
        ['Anatomy review checklist', /##\s+.*Anatomy review checklist/i],
        ['Edge cases section',       /##\s+.*[Ee]dge case/],
        ['Reference system study',   /##\s+.*[Rr]eference system/],
      ]
    },
    { file: '01-math.md',         checks: [
        ['Derived value table',      /##\s+.*[Dd]erived value table/],
        ['Height : Font-size ratio', /[Hh]eight.*[Ff]ont.?size ratio/],
        ['Padding-inline ratio',     /[Pp]adding.inline.*ratio/i],
        ['Math review checklist',    /##\s+.*Math review checklist/i],
      ]
    },
    { file: '02-state-matrix.md', checks: [
        ['State × Variant Matrix',   /[Ss]tate.*[Vv]ariant [Mm]atrix/],
        ['Compounding rules',        /[Cc]ompound/],
        ['State-matrix checklist',   /##\s+.*[Ss]tate.matrix review checklist/i],
      ]
    },
    { file: '03-system-fit.md',   checks: [
        ['Token inheritance table',  /[Tt]oken inheritance/],
        ['Height ladder section',    /[Hh]eight ladder/],
        ['System-fit checklist',     /##\s+.*[Ss]ystem.fit review checklist/i],
      ]
    },
    { file: '04-flexibility.md',  checks: [
        ['Rebrand use-case',         /[Uu]se.case 1.*rebrand/i],
        ['Dark mode use-case',       /[Uu]se.case 4.*dark/i],
        ['Flexibility checklist',    /##\s+.*[Ff]lexibility review checklist/i],
      ]
    },
  ];

  for (const { file, checks } of required) {
    const fpath = path.join(briefDir, file);
    if (!fs.existsSync(fpath)) {
      results.push(fail(`Missing brief file: ${file}`));
      continue;
    }
    const content = fs.readFileSync(fpath, 'utf8');
    const lineCount = content.split('\n').length;
    if (lineCount < 30) {
      results.push(fail(`${file} looks empty (${lineCount} lines). Fill the template sections.`));
      continue;
    }
    results.push(pass(`${file} exists (${lineCount} lines)`));
    for (const [label, pattern] of checks) {
      if (!pattern.test(content)) {
        results.push(fail(`${file} — missing required section: "${label}"`));
      } else {
        results.push(pass(`${file} — "${label}" found`));
      }
    }
    // Check no unchecked items in checklist (- [ ] means incomplete)
    const unchecked = (content.match(/- \[ \]/g) || []).length;
    if (unchecked > 0) {
      results.push(fail(`${file} — ${unchecked} checklist item(s) still unchecked`));
    }
  }

  return results;
}

/**
 * Gate 1 — spec.yaml must exist and cover all 7 axes.
 */
function checkGate1(comp) {
  const results = [];
  const specFile = path.join(SPECS, `${comp}.yaml`);

  if (!fs.existsSync(specFile)) {
    return [fail(`Missing spec: specs/components/${comp}.yaml`)];
  }

  const content = fs.readFileSync(specFile, 'utf8');
  results.push(pass(`spec.yaml exists (${content.split('\n').length} lines)`));

  const axes = ['shape', 'dimension', 'surface', 'typography', 'slots', 'motion', 'a11y'];
  for (const axis of axes) {
    if (content.toLowerCase().includes(axis + ':') || content.toLowerCase().includes(`# ${axis}`)) {
      results.push(pass(`Axis covered: ${axis}`));
    } else {
      results.push(fail(`Spec missing axis: ${axis}  (add a "${axis}:" section)`));
    }
  }

  const hasVariants = /^variants:/m.test(content);
  const hasStates   = /^states:/m.test(content);
  const hasSizes    = /^sizes:/m.test(content);
  if (!hasVariants) results.push(fail('Spec missing "variants:" key'));
  else results.push(pass('Spec has variants'));
  if (!hasStates) results.push(fail('Spec missing "states:" key'));
  else results.push(pass('Spec has states'));
  if (!hasSizes) results.push(fail('Spec missing "sizes:" key'));
  else results.push(pass('Spec has sizes'));

  return results;
}

/**
 * Gate 2 — tokens.css must exist with sufficient depth and clean architecture.
 */
function checkGate2(comp) {
  const results = [];
  const tokenFile = path.join(COMP_SRC, comp, `${comp}.tokens.css`);

  if (!fs.existsSync(tokenFile)) {
    return [fail(`Missing tokens: packages/components/src/${comp}/${comp}.tokens.css`)];
  }

  const content = fs.readFileSync(tokenFile, 'utf8');
  const lines   = content.split('\n');
  const varLines = lines.filter(l => /^\s*--/.test(l));
  results.push(pass(`tokens.css exists (${varLines.length} custom properties)`));

  // Minimum token count: interactive = 80, display = 30
  const minCount = INTERACTIVE.has(comp) ? 80 : 30;
  if (varLines.length < minCount) {
    results.push(fail(`Only ${varLines.length} tokens — minimum for this component type is ${minCount}. Token surface is too shallow.`));
  } else {
    results.push(pass(`Token count ${varLines.length} meets minimum ${minCount}`));
  }

  // No hardcoded hex colors
  const hexMatches = content.match(/#[0-9a-fA-F]{3,8}(?!\s*\/)/g) || [];
  if (hexMatches.length > 0) {
    results.push(fail(`Hardcoded hex colors found (${hexMatches.length}): ${hexMatches.slice(0,3).join(', ')}
       → Replace with var(--color-*) references`));
  } else {
    results.push(pass('No hardcoded hex colors'));
  }

  // No hardcoded rgb/hsl literals
  const rgbMatches = content.match(/(?:rgb|hsl)a?\(/g) || [];
  if (rgbMatches.length > 0) {
    results.push(warn(`${rgbMatches.length} rgb/hsl literal(s) found — consider token references instead`));
  }

  // Check for self-cycles: --x: var(--x)
  const prefix = comp.replace(/-([a-z])/g, (_, c) => c); // rough prefix guess
  for (const line of varLines) {
    const m = line.match(/--([a-z][a-z0-9-]*):\s*var\(--([a-z][a-z0-9-]*)\)/);
    if (m && m[1] === m[2]) {
      results.push(fail(`Self-cycle detected: --${m[1]}: var(--${m[2]})  → will compute to empty`));
    }
  }

  // Has motion/transition tokens
  if (/--.*(?:duration|easing|motion|transition)/i.test(content)) {
    results.push(pass('Motion tokens present'));
  } else {
    results.push(fail('No motion/duration tokens found — add --{prefix}-duration-* tokens'));
  }

  // ── LEARNED: unitless 0 in custom properties that feed calc() ────────────
  // `calc(18px - 0)` is INVALID. 0 must be 0px in any property used in calc.
  // Discovered during button spacing rework.
  for (const line of varLines) {
    if (/:\s*0\s*;/.test(line) && /height|padding|margin|gap|radius|offset|width/.test(line)) {
      results.push(warn(`Unitless 0 value: ${line.trim()} — use 0px if this feeds into calc()`));
    }
  }

  // ── LEARNED: white must never be hardcoded in component tokens ────────────
  // Use --color-fixed-white instead. In dark mode, 'white' on a light surface
  // is correct but the token name makes intent explicit and theme-overrideable.
  if (/:\s*white\s*;|:\s*#fff\s*;|:\s*#ffffff\s*;/i.test(content)) {
    results.push(fail('Hardcoded white/\"#fff\" in tokens — use var(--color-fixed-white) for theme immunity'));
  } else {
    results.push(pass('No hardcoded white — uses token reference'));
  }

  // ── LEARNED: on-component token must cover ALL fill states ───────────────
  // One --{prefix}-on-component token is bound to default/hover/pressed fills.
  // If derived only from the default fill, AA fails on hover/pressed steps.
  // Check: if tokens include on-component, also check for hover/pressed fills.
  const hasOnComp    = /--[a-z-]+-on-component/.test(content);
  const hasHoverFill = /--[a-z-]+-bg-hover/.test(content);
  const hasPressedFill = /--[a-z-]+-bg-(?:pressed|active)/.test(content);
  if (hasOnComp && (!hasHoverFill || !hasPressedFill)) {
    results.push(fail('on-component token present but hover/pressed fill tokens missing — AA derivation will only test default fill and may fail on other states'));
  } else if (hasOnComp) {
    results.push(pass('on-component token with hover+pressed fills present — AA derivation covers all states'));
  }

  return results;
}

/**
 * Gate 3 — component.css must have correct architectural patterns.
 */
function checkGate3(comp) {
  const results = [];
  const cssFile = path.join(COMP_SRC, comp, `${comp}.css`);

  if (!fs.existsSync(cssFile)) {
    return [fail(`Missing CSS: packages/components/src/${comp}/${comp}.css`)];
  }

  const content = fs.readFileSync(cssFile, 'utf8');
  results.push(pass(`component.css exists (${content.split('\n').length} lines)`));

  // Internal --_ vars (architecture requirement)
  if (/--_/.test(content)) {
    results.push(pass('Internal --_ switching vars present'));
  } else {
    results.push(fail('No internal --_ vars found — state selectors must not reference public tokens directly'));
  }

  // data-variant attribute selectors
  if (/\[data-variant/.test(content)) {
    results.push(pass('data-variant selectors present'));
  } else {
    results.push(warn('No [data-variant] selectors — component may be single-variant (ok if intentional)'));
  }

  // Logical properties (RTL readiness)
  const hasLogical = /padding-inline|margin-inline|padding-block|margin-block|inset-inline|inset-block/.test(content);
  const hasPhysical = /padding-left|padding-right|margin-left|margin-right/.test(content);
  if (hasLogical) {
    results.push(pass('Logical properties (RTL-ready) used'));
  } else {
    results.push(fail('No logical properties — replace padding-left/right with padding-inline-start/end'));
  }
  if (hasPhysical) {
    results.push(warn('Physical directional properties found — verify these are intentional (not RTL-breaking)'));
  }

  // Focus-visible (interactive only)
  if (INTERACTIVE.has(comp)) {
    if (/:focus-visible/.test(content)) {
      results.push(pass('focus-visible ring present'));
    } else {
      results.push(fail('Missing :focus-visible ring — required for all interactive components (WCAG 2.4.7)'));
    }

    // Tap target
    if (/min-height|tap-target|min-tap/.test(content)) {
      results.push(pass('Tap target enforcement present'));
    } else {
      results.push(fail('Missing min-height tap target — required for interactive components (WCAG 2.5.5 = 44px)'));
    }
  }

  // No hardcoded colors in CSS either
  const hexInCss = content.match(/#[0-9a-fA-F]{3,8}(?!\s*\/)/g) || [];
  if (hexInCss.length > 0) {
    results.push(fail(`Hardcoded hex in component.css: ${hexInCss.slice(0,3).join(', ')}`));
  } else {
    results.push(pass('No hardcoded hex colors in CSS'));
  }

  // No inline unitless 0 in calc
  const unitlessZero = content.match(/calc\([^)]*[^0-9.]-\s*0\b[^px%rem]/g) || [];
  if (unitlessZero.length > 0) {
    results.push(fail(`Unitless 0 in calc() — use 0px instead: ${unitlessZero[0]}`));
  }

  // ── LEARNED: var() resolves at the declaring element, not use site ────────
  // `:root { --A: var(--B) }` — child overrides of --B cannot re-resolve --A.
  // If component tokens are declared only on :root, per-element role overrides
  // (data-role="brand") silently inherit the eagerly-substituted :root value.
  // Check: public tokens should NOT be declared exclusively on :root if they
  // need to respond to per-element overrides.
  const rootOnlyDecls = [];
  let inRoot = false;
  for (const line of content.split('\n')) {
    if (/:root\s*\{/.test(line)) { inRoot = true; continue; }
    if (inRoot && /^\s*\}/.test(line)) { inRoot = false; continue; }
    if (inRoot && /--[a-z][a-z0-9-]*-bg\b/.test(line)) rootOnlyDecls.push(line.trim());
  }
  if (rootOnlyDecls.length > 0) {
    results.push(warn(`${rootOnlyDecls.length} bg/color token(s) declared only on :root — per-element role overrides (data-role) may not work. Redeclare on the component selector too.`));
  }

  // ── LEARNED: focus ring MUST use positive offset (not negative) ───────────
  // Negative outline-offset draws the ring INSIDE the element border.
  // For all button-family components use positive offset for outer ring.
  // Composite components (split-button) with overflow:hidden on wrapper:
  //   put focus ring on wrapper via :has(:focus-visible), NOT inner zones.
  const negOffset = content.match(/outline-offset:\s*-/g) || [];
  if (negOffset.length > 0) {
    results.push(fail(`Negative outline-offset found (${negOffset.length} instance(s)) — focus ring must be outside the element. Use positive offset or wrapper :has(:focus-visible) pattern.`));
  } else {
    results.push(pass('No negative outline-offset — focus ring draws outside element'));
  }

  // ── LEARNED: [hidden] attr loses to author display rules ─────────────────
  // If a section uses display:flex/grid, [hidden]{display:none} (UA rule) loses.
  // Must pair with [hidden]{display:none !important} in base CSS.
  // Check: any element that might use both hidden attr and display:flex.
  if (/\[hidden\]/.test(content) && !/!important/.test(content.match(/\[hidden\][^}]*/)?.[0] || '')) {
    results.push(warn('[hidden] selector found without !important — UA display:none may be overridden by component display:flex/grid. Add [hidden]{display:none !important}'));
  }

  // ── LEARNED: centering with transform: translateY conflicts with state transforms
  // Use top:0; bottom:0; margin-block:auto instead of translateY(-50%).
  if (/translateY\(-50%\)/.test(content)) {
    results.push(warn('translateY(-50%) centering found — conflicts with hover/active scale transforms. Use margin-block:auto with top:0;bottom:0 instead.'));
  }

  // ── LEARNED: global [data-tip]::before suppressor may kill ::before decorations
  // If project uses tooltip portal (html.ev2-tip-js [data-tip]::before{content:none}),
  // any new ::before decoration on a tipped element is silently suppressed.
  // Check: if CSS uses ::before on elements that might carry data-tip.
  if (/::before/.test(content)) {
    results.push(warn('::before pseudo-element used — verify it is not suppressed by global [data-tip]::before{content:none} rule. If suppressed, use ::after instead.'));
  }

  return results;
}

/**
 * Gate 4 — demo.html must exist and be deterministic.
 */
function checkGate4(comp) {
  const results = [];
  const demoFile = path.join(DEMO_DIR, `${comp}.html`);

  if (!fs.existsSync(demoFile)) {
    return [fail(`Missing demo: demo/${comp}.html`)];
  }

  const content = fs.readFileSync(demoFile, 'utf8');
  results.push(pass(`demo.html exists (${content.split('\n').length} lines)`));

  // Determinism checks
  if (/Math\.random\(\)/.test(content)) {
    results.push(fail('Math.random() in demo — causes Playwright flake. Use deterministic values (index-derived).'));
  } else {
    results.push(pass('No Math.random() — deterministic'));
  }
  if (/new Date\(\)/.test(content) && !/visual.snapshot/.test(content)) {
    results.push(warn('new Date() in demo without visual-snapshot guard — dates will drift in baselines. Add stabilization pattern.'));
  }

  // Has all main variant sections (loose check)
  const variantSections = (content.match(/data-variant|data-size|data-state/g) || []).length;
  if (variantSections < 3) {
    results.push(warn(`Only ${variantSections} attribute references — demo may not cover all variants/sizes/states`));
  } else {
    results.push(pass(`${variantSections} variant/size/state attribute references found`));
  }

  return results;
}

/**
 * Gate 5 — Cross-component QC and consistency checks.
 */
function checkGate5(comp) {
  const results = [];
  const tokenFile = path.join(COMP_SRC, comp, `${comp}.tokens.css`);

  if (!fs.existsSync(tokenFile)) {
    return [fail('tokens.css not found — complete Gate 2 first')];
  }

  const content = fs.readFileSync(tokenFile, 'utf8');

  // Check focus ring uses system tokens (not hardcoded)
  if (/--.*focus.*ring.*width|--.*ring.*width/i.test(content)) {
    if (/var\(--focus-ring|var\(--ring-width/i.test(content)) {
      results.push(pass('Focus ring width references system token'));
    } else {
      results.push(warn('Focus ring width may not reference system --focus-ring-* token'));
    }
  }

  // Check disabled opacity uses system token
  if (/opacity.*0\.[34]/i.test(content)) {
    results.push(warn('Hardcoded disabled opacity — use var(--disabled-opacity) system token'));
  }

  // Cross-component height ladder check (compare vs button as reference)
  const btnTokenFile = path.join(COMP_SRC, 'button', 'button.tokens.css');
  if (INTERACTIVE.has(comp) && fs.existsSync(btnTokenFile) && comp !== 'button') {
    const btnContent = fs.readFileSync(btnTokenFile, 'utf8');
    const sizes = ['micro','tiny','small','base','medium','large','big','huge','mega','ultra'];
    let ladderOk = true;
    const ladderIssues = [];
    for (const size of sizes) {
      // Extract btn height for this size
      const btnH = btnContent.match(new RegExp(`--btn-height-${size}:\\s*([^;]+)`));
      const compH = content.match(new RegExp(`--[a-z-]+-height-${size}:\\s*([^;]+)`));
      if (btnH && compH) {
        const bv = btnH[1].trim();
        const cv = compH[1].trim();
        if (bv !== cv) {
          ladderIssues.push(`${size}: btn=${bv} vs ${comp}=${cv}`);
          ladderOk = false;
        }
      }
    }
    if (ladderOk) {
      results.push(pass('Cross-component height ladder matches button at all sizes'));
    } else {
      results.push(fail(`Height ladder mismatch with button:\n       ${ladderIssues.join('\n       ')}`));
    }
  }

  // Motion tokens reference system easing
  if (/var\(--motion-easing|var\(--easing|ease-in-out|ease-out/.test(content)) {
    results.push(pass('Motion easing references system tokens or standard keywords'));
  } else {
    results.push(warn('No motion easing found — verify transitions use var(--motion-easing-*)'));
  }

  results.push(pass('Gate 5 QC pass — run visual Playwright suite to confirm: pnpm test:demo-qc'));
  return results;
}

/**
 * Gate 6 — Figma blueprint must be registered in code.js.
 */
function checkGate6(comp) {
  const results = [];

  if (!fs.existsSync(PLUGIN_FILE)) {
    return [fail('Figma plugin code.js not found')];
  }

  const pluginContent = fs.readFileSync(PLUGIN_FILE, 'utf8');

  // Check COMPONENT_BLUEPRINTS registry
  const bpRegex = new RegExp(`['"]${comp}['"]\\s*:`);
  if (bpRegex.test(pluginContent)) {
    results.push(pass(`Blueprint registered in COMPONENT_BLUEPRINTS: "${comp}"`));
  } else {
    results.push(fail(`Blueprint NOT registered — add "${comp}": BLUEPRINT_VAR to COMPONENT_BLUEPRINTS in code.js`));
  }

  // Check blueprint has a page field
  const bpVarMatch = pluginContent.match(new RegExp(`var\\s+(\\w+BLUEPRINT)\\s*=\\s*\\{[^}]*name:\\s*['"][^'"]*${comp}[^'"]*['"]`, 'i'));
  if (bpVarMatch) {
    const bpName = bpVarMatch[1];
    const bpStart = pluginContent.indexOf(`var ${bpName}`);
    const bpSnip  = pluginContent.slice(bpStart, bpStart + 500);
    if (/page:\s*['"]/.test(bpSnip)) {
      results.push(pass(`Blueprint has "page:" field (multi-page Figma organization)`));
    } else {
      results.push(fail(`Blueprint missing "page:" field — add page: 'Buttons' (or appropriate page name)`));
    }
  }

  results.push(warn('Manual verification needed: open Figma, run Build, confirm component renders correctly in the right page'));
  return results;
}

// ═════════════════════════════════════════════════════════════════════════════
// TOKEN REGRESSION SNAPSHOT
// ═════════════════════════════════════════════════════════════════════════════

function snapshotTokens(comp) {
  const tokenFile = path.join(COMP_SRC, comp, `${comp}.tokens.css`);
  if (!fs.existsSync(tokenFile)) return null;
  const content = fs.readFileSync(tokenFile, 'utf8');
  const snap = {};
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*(--[a-z][a-z0-9-]*):\s*(.+?);/);
    if (m) snap[m[1]] = m[2].trim();
  }
  return snap;
}

function saveSnapshot(comp) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const snap = snapshotTokens(comp);
  if (!snap) return false;
  fs.writeFileSync(path.join(SNAP_DIR, `${comp}-tokens.json`), JSON.stringify(snap, null, 2));
  return true;
}

function checkRegression(comp) {
  const snapFile = path.join(SNAP_DIR, `${comp}-tokens.json`);
  if (!fs.existsSync(snapFile)) return [];
  const old  = JSON.parse(fs.readFileSync(snapFile, 'utf8'));
  const curr = snapshotTokens(comp);
  if (!curr) return [fail(`tokens.css missing for ${comp}`)];

  const issues = [];
  for (const [key, oldVal] of Object.entries(old)) {
    if (!(key in curr)) {
      issues.push({ type: 'removed', key, oldVal });
    } else if (curr[key] !== oldVal) {
      issues.push({ type: 'changed', key, oldVal, newVal: curr[key] });
    }
  }
  for (const key of Object.keys(curr)) {
    if (!(key in old)) issues.push({ type: 'added', key, newVal: curr[key] });
  }
  return issues;
}

// ═════════════════════════════════════════════════════════════════════════════
// RUNNER
// ═════════════════════════════════════════════════════════════════════════════

const GATES = [
  { num: 0, name: 'RESEARCH',  fn: checkGate0 },
  { num: 1, name: 'SPEC',      fn: checkGate1 },
  { num: 2, name: 'TOKENS',    fn: checkGate2 },
  { num: 3, name: 'CSS',       fn: checkGate3 },
  { num: 4, name: 'DEMO',      fn: checkGate4 },
  { num: 5, name: 'QC',        fn: checkGate5 },
  { num: 6, name: 'FIGMA',     fn: checkGate6 },
];

function runGate(comp, gateNum) {
  const gate = GATES[gateNum];
  console.log(C.bold(`\n── Gate ${gate.num}: ${gate.name} ──────────────────────────`));
  const results = gate.fn(comp);
  let passed = true;
  for (const r of results) {
    console.log('  ' + r.msg);
    if (!r.ok) passed = false;
  }
  const fails   = results.filter(r => !r.ok).length;
  const warnings= results.filter(r => r.warn).length;
  console.log(passed
    ? C.green(`  → Gate ${gate.num} PASSED` + (warnings ? ` (${warnings} warning(s))` : ''))
    : C.red(`  → Gate ${gate.num} FAILED (${fails} error(s))`)
  );
  return passed;
}

function runAll(comp, upToGate, advance) {
  const status = loadStatus();
  const compStatus = status[comp] || { gate: -1, snapshots: {} };

  console.log(C.bold(`\n╔══════════════════════════════════════════`));
  console.log(C.bold(`║  DTF Gate Check: ${comp}`));
  console.log(C.bold(`╚══════════════════════════════════════════`));
  console.log(C.dim(`   Current gate: ${compStatus.gate < 0 ? 'None (not started)' : `Gate ${compStatus.gate} (${GATES[compStatus.gate]?.name})`}`));

  const maxGate = upToGate !== undefined ? upToGate : GATES.length - 1;
  let allPassed = true;

  for (let g = 0; g <= maxGate; g++) {
    const passed = runGate(comp, g);
    if (!passed) {
      allPassed = false;
      console.log(C.red(`\n⛔  Stopped at Gate ${g}. Fix errors above before proceeding.`));
      break;
    }
    if (advance && passed && g > compStatus.gate) {
      compStatus.gate = g;
      if (g === 5) {
        // Snapshot tokens when QC passes
        if (saveSnapshot(comp)) {
          console.log(C.cyan(`  📸 Token snapshot saved for regression protection`));
        }
      }
    }
  }

  if (allPassed) {
    console.log(C.green(`\n✅ All checked gates passed for ${comp}`));
    if (advance) {
      status[comp] = compStatus;
      saveStatus(status);
      console.log(C.cyan(`   Gate status updated → ${GATES[compStatus.gate]?.name}`));
    }
  }

  return allPassed;
}

function printAllStatus() {
  const status = loadStatus();
  const allComps = fs.readdirSync(COMP_SRC).filter(f =>
    fs.statSync(path.join(COMP_SRC, f)).isDirectory()
  );
  console.log(C.bold('\n╔══════════════════════════════════════════════════════════'));
  console.log(C.bold('║  DTF Component Gate Status'));
  console.log(C.bold('╠══════════════════════════════════════════════════════════'));
  console.log(C.bold('║  Component              G0  G1  G2  G3  G4  G5  G6'));
  console.log(C.bold('╠══════════════════════════════════════════════════════════'));
  for (const comp of allComps.sort()) {
    const g = (status[comp]?.gate ?? -1);
    const cells = GATES.map(gate =>
      gate.num <= g ? C.green(' ✅ ') : C.dim(' ·  ')
    ).join('');
    const label = comp.padEnd(24);
    console.log(`║  ${label}${cells}`);
  }
  console.log(C.bold('╚══════════════════════════════════════════════════════════'));
  console.log(C.dim('  Run: node scripts/gate-check.cjs <comp> --advance  to check and advance'));
}

function printRegression() {
  const status  = loadStatus();
  const shipped = Object.entries(status).filter(([_, s]) => s.gate >= 5).map(([c]) => c);

  if (shipped.length === 0) {
    console.log(C.yellow('No components at Gate 5+ yet. Regression snapshots will be created when QC passes.'));
    return;
  }

  console.log(C.bold(`\n╔══ Token Regression Check (${shipped.length} shipped components) ══`));
  let anyDrift = false;

  for (const comp of shipped) {
    const issues = checkRegression(comp);
    if (issues.length === 0) {
      console.log(C.green(`✅ ${comp} — no drift`));
    } else {
      anyDrift = true;
      const changed  = issues.filter(i => i.type === 'changed');
      const removed  = issues.filter(i => i.type === 'removed');
      const added    = issues.filter(i => i.type === 'added');
      console.log(C.red(`❌ ${comp} — ${issues.length} token changes detected:`));
      for (const i of changed)  console.log(C.yellow(`   CHANGED  ${i.key}: "${i.oldVal}" → "${i.newVal}"`));
      for (const i of removed)  console.log(C.red(`   REMOVED  ${i.key} (was: "${i.oldVal}")`));
      for (const i of added)    console.log(C.cyan(`   ADDED    ${i.key}: "${i.newVal}"`));
    }
  }

  if (anyDrift) {
    console.log(C.red('\n⚠️  Token drift detected. Review changes above.'));
    console.log(C.dim('   If the change was intentional, run: node scripts/gate-check.cjs <comp> --snapshot'));
    process.exit(1);
  } else {
    console.log(C.green('\n✅ No token drift across all shipped components.'));
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// CLI
// ═════════════════════════════════════════════════════════════════════════════

const args = process.argv.slice(2);

if (args.includes('--all')) {
  printAllStatus();
  process.exit(0);
}

if (args.includes('--regression')) {
  printRegression();
  process.exit(0);
}

const comp = args.find(a => !a.startsWith('--'));
if (!comp) {
  console.log(`Usage:
  node scripts/gate-check.cjs <component>              Check current gate status
  node scripts/gate-check.cjs <component> --gate=N     Check specific gate only
  node scripts/gate-check.cjs <component> --advance    Check + advance gate in status file
  node scripts/gate-check.cjs <component> --snapshot   Re-snapshot tokens (after intentional change)
  node scripts/gate-check.cjs --all                    Show all component gate statuses
  node scripts/gate-check.cjs --regression             Check for token drift on shipped comps
`);
  process.exit(1);
}

const gateArg   = args.find(a => a.startsWith('--gate='));
const gateNum   = gateArg ? parseInt(gateArg.split('=')[1], 10) : undefined;
const advance   = args.includes('--advance');
const snapshot  = args.includes('--snapshot');

if (snapshot) {
  if (saveSnapshot(comp)) {
    console.log(C.green(`📸 Token snapshot updated for ${comp}`));
  } else {
    console.log(C.red(`Failed to snapshot ${comp} — tokens.css not found`));
  }
  process.exit(0);
}

const passed = runAll(comp, gateNum, advance);
process.exit(passed ? 0 : 1);
