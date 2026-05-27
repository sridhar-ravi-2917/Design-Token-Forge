# Demo Page Blueprint

> **Canonical specification for every component demo page in Design Token Forge.**
> When building a new demo page or fixing an existing one, follow this document exactly.
> CI tests (`demo-consistency.spec.js`) enforce key assertions from this blueprint.

---

## Quick Reference — Mandatory Section Order

| # | Section Name | ID | Tag | Required? |
|---|---|---|---|---|
| 01 | Hero Inspector | `sec-hero` | `Live` | ALL |
| 02 | Variant Gallery | `sec-variants` | varies | ALL (except single-variant) |
| 03 | Density Scale | `sec-density` | `Dimension` | ALL |
| 04 | State Matrix | `sec-states` | `States` | ALL |
| 05 | Surface Context | `sec-surface` | `Surface` | ALL |
| 06 | Shape & Shadow | `sec-shape` | `Shape` | ALL |
| 07 | Slots & Anatomy | `sec-slots` | `Slots` | ALL |
| 08 | Motion | `sec-motion` | `Motion` | ALL |
| 09 | Accessibility | `sec-a11y` | `A11y` | ALL |
| 10 | Context Playground | `sec-playground` | `Surface × Role` | RECOMMENDED |
| 11 | Use in Framework | `sec-framework` | `Integration` | ALL |

**Component-specific sections** (e.g. "Dot Indicator", "File List", "Placement", "Accent Bar",
"Dismiss") are inserted between §07 and §08 (after Slots, before Motion).

---

## Naming Rules

### Section numbering
- Use **zero-padded** digits in the sidebar: `01`, `02`, … `11`.
- Sidebar nav class: `<a href="#sec-{id}"><span class="sn-num">01</span>{Section Name}</a>`.

### Hero section
- **Fixed name**: "Hero Inspector" (not "Hero Preview").
- Reason: every page shows a resolved-token inspector below the hero instance.

### Labels — never use
| ❌ Don't use | ✅ Use instead |
|---|---|
| "Hero Preview" | "Hero Inspector" |
| "Base / Elevated / Sunken" | `surface-base-bg` / `surface-base-subtle` / `surface-deep-bg` |
| "primary" / "secondary" / "tertiary" (as variant names) | `filled` / `outlined` / `soft` / `ghost` |
| "Structure" (bar label) | "Variant" (bar label) — unless the component genuinely has structural variants like button |

---

## Section Specifications

### §01 Hero Inspector

**Purpose**: Default instance of the component at current global size/variant/role + a
resolved-token inspector showing live computed values.

```html
<section class="section" id="sec-hero">
  <div class="section-header"><h2>Hero Inspector</h2><span class="section-tag">Live</span></div>
  <div class="section-body">
    <div class="hero-stage" id="heroStage">
      <!-- Single default-state component instance, synced to global bars -->
    </div>
    <div class="hero-inspector" id="heroInspector">
      <div class="inspector-title">Resolved Tokens</div>
      <!-- Rows built by P.buildInspector() or inline -->
    </div>
  </div>
</section>
```

**Rules:**
- Hero instance MUST be `synced` (responds to global VARIANT/SIZE/ROLE/SHAPE bars).
- Inspector MUST show ≥5 resolved token rows (no `undefined`, no `NaN`).
- Inspector rows show: token name → alias chain → computed value.

---

### §02 Variant Gallery

**Purpose**: All structural/visual variants displayed side-by-side.

```html
<section class="section" id="sec-variants">
  <div class="section-header"><h2>Variant Gallery</h2><span class="section-tag">{N} Variants</span></div>
  <p class="section-desc">{Component} ships with {N} structural variants…</p>
  <div class="section-body">
    <div class="variant-grid" id="variantGallery">
      <!-- One .variant-card per variant -->
    </div>
  </div>
</section>
```

**Tag value**: `"{N} Variants"` or the component-specific equivalent (e.g. "3 Content Modes" for avatar).

**Alternate names** (when semantically appropriate):
- Avatar → "Content Modes"
- Badge → "Variant Gallery"
- File-upload → "Modes" (dropzone vs button)

---

### §03 Density Scale

**Purpose**: The component rendered at every supported size, with token metadata below each.

```html
<section class="section" id="sec-density">
  <div class="section-header"><h2>Density Scale</h2><span class="section-tag">Dimension</span></div>
  <p class="section-desc">10 density modes from micro to ultra…</p>
  <div class="section-body">
    <div class="density-strip" id="densityStrip">
      <!-- One .density-item per size, built by P.wrapDensityItem() -->
    </div>
  </div>
</section>
```

**Rules:**
- Show ALL sizes the component supports (not just a subset).
- Meta text below each item shows the size token value (e.g. `32px` / `--spacing-16`).
- Use `P.wrapDensityItem(component, metaText)` helper.

---

### §04 State Matrix

**Purpose**: Grid of variants × interactive states (default, hover, active, focus, disabled).

```html
<section class="section" id="sec-states">
  <div class="section-header"><h2>State Matrix</h2><span class="section-tag">States</span></div>
  <p class="section-desc">Visual treatment across interactive states…</p>
  <div class="section-body">
    <div class="state-matrix" id="stateMatrix">
      <!-- Use P.renderStateMatrix() or manual grid -->
    </div>
  </div>
</section>
```

**Canonical state columns**: `default`, `hover`, `active/pressed`, `focus-visible`, `disabled`.
Additional columns if relevant: `loading`, `error`, `selected`, `indeterminate`.

**Rules:**
- Rows = variants (or content modes).
- Each cell contains a single component instance in that state.
- Use `data-state` attribute or CSS class to force visual state.

---

### §05 Surface Context — CRITICAL

**Purpose**: Component rendered on 3 background depth levels to verify contrast and visibility.

**MUST use the shared helper:**

```js
function renderSurface() {
  P.renderSurfacePanels('surfaceStrip', function(panel) {
    panel.appendChild(makeComponent(/* current global state */));
  });
}
```

**HTML:**
```html
<section class="section" id="sec-surface">
  <div class="section-header"><h2>Surface Context</h2><span class="section-tag">Surface</span></div>
  <p class="section-desc">{Components} on base, subtle, and deep backgrounds to verify contrast and border visibility.</p>
  <div class="section-body">
    <div class="surface-strip" id="surfaceStrip"></div>
  </div>
</section>
```

**What `P.renderSurfacePanels` does:**
1. Creates 3 panels with CSS classes: `.surface-panel--base`, `.surface-panel--alt`, `.surface-panel--deep`
2. Labels them: `surface-base-bg`, `surface-base-subtle`, `surface-deep-bg`
3. Calls `applySurface(panel, 'deep')` on the third panel to rebind `--surface-base-*` tokens

**❌ NEVER do any of these:**
- Use custom labels like "Base / Elevated / Sunken"
- Use `cm-bg` or `cm-bg-pressed` tokens for panel backgrounds
- Build panels manually with inline `style.background`
- Forget `applySurface()` on the deep panel
- Use a class name like `surface-label` (correct: `surface-panel-label`)

---

### §06 Shape & Shadow

**Purpose**: Border-radius scale (default → rounded → pill) and shadow levels.

```html
<section class="section" id="sec-shape">
  <div class="section-header"><h2>Shape & Shadow</h2><span class="section-tag">Shape</span></div>
  <p class="section-desc">Border radius scales per density. Toggle Rounded to see pill shape. Shadow appears on hover.</p>
  <div class="section-body">
    <div class="shape-grid" id="shapeGallery">
      <!-- 3-4 cards: Default, Rounded/Pill, Custom clip if applicable -->
    </div>
  </div>
</section>
```

**Rules:**
- Show radius at current size, not all sizes (density section covers that).
- Shadow cards: none / sm / md / lg levels.
- For components where shape is a primary axis (badge, avatar), this section may be
  renamed to "Shape Gallery" and moved to position §03.

---

### §07 Slots & Anatomy

**Purpose**: Show every possible slot configuration (icon, label, prefix, suffix, badge, etc.).

```html
<section class="section" id="sec-slots">
  <div class="section-header"><h2>Slots & Anatomy</h2><span class="section-tag">Slots</span></div>
  <p class="section-desc">{N} configurations showing optional anatomy…</p>
  <div class="section-body">
    <div class="anatomy-wrap" id="slotsDemo">
      <!-- One .anatomy-item per configuration -->
    </div>
  </div>
</section>
```

**Rules:**
- Label each configuration (e.g. "Icon + Label", "Label only", "Icon only").
- Show at the current global size.

---

### §08 Motion

**Purpose**: Hover/press/focus transitions demonstrated interactively.

```html
<section class="section" id="sec-motion">
  <div class="section-header"><h2>Motion</h2><span class="section-tag">Motion</span></div>
  <p class="section-desc">Hover and press to feel timing and easing…</p>
  <div class="section-body">
    <div class="motion-demo" id="motionDemo">
      <!-- Interactive instances, labeled with token names (e.g. --btn-transition) -->
    </div>
  </div>
</section>
```

---

### §09 Accessibility

**Purpose**: Focus ring, keyboard navigation, disabled state, and forced-colors behavior.

```html
<section class="section" id="sec-a11y">
  <div class="section-header"><h2>Accessibility</h2><span class="section-tag">A11y</span></div>
  <p class="section-desc">Focus ring, keyboard navigation, disabled state, forced-colors…</p>
  <div class="section-body">
    <div class="a11y-grid">
      <div class="a11y-card">
        <div class="a11y-card-title">Focus Ring</div>
        <p class="a11y-card-desc">Tab to focus. <code>:focus-visible</code> ring…</p>
        <div id="a11yFocus"><!-- instance --></div>
      </div>
      <div class="a11y-card">
        <div class="a11y-card-title">Keyboard Nav</div>
        <p class="a11y-card-desc">…</p>
        <div id="a11yKeyboard"><!-- instance --></div>
      </div>
      <div class="a11y-card">
        <div class="a11y-card-title">Disabled</div>
        <p class="a11y-card-desc"><code>data-disabled</code> reduces opacity…</p>
        <div id="a11yDisabled"><!-- instance --></div>
      </div>
      <div class="a11y-card">
        <div class="a11y-card-title">Forced Colors</div>
        <p class="a11y-card-desc">High Contrast…</p>
        <div id="a11yForced"><!-- instance --></div>
      </div>
    </div>
  </div>
</section>
```

**Canonical cards (4):** Focus Ring, Keyboard Nav, Disabled, Forced Colors.
Add more if the component has unique a11y concerns (e.g. ARIA live region for toast).

---

### §10 Context Playground (RECOMMENDED)

**Purpose**: Two side-by-side cards with independent surface × role overrides + live token chain.

```html
<section class="section" id="sec-playground">
  <div class="section-header"><h2>Context Playground</h2><span class="section-tag">Surface × Role</span></div>
  <p class="section-desc">See how {components} adapt across surface contexts and semantic color roles.</p>
  <div class="section-body">
    <div class="pg-controls">
      <div class="pg-ctrl"><label>Density</label>
        <div class="pill-bar" id="pgDensityBar" role="radiogroup" aria-label="Playground density">
          <!-- Subset: micro/small/base/large/huge/ultra -->
        </div>
      </div>
    </div>
    <div class="pg-cards">
      <div class="pg-card" id="pgCardA">
        <div class="pg-card-head">
          <span class="pg-card-label">Card A</span>
          <div class="pg-ctrl"><label>Surface</label><select data-pg-surface="A">...</select></div>
          <div class="pg-ctrl"><label>Role</label><select data-pg-role="A">...</select></div>
        </div>
        <div class="pg-card-body" id="pgBodyA"></div>
      </div>
      <!-- Card B: mirror with different defaults (deep + danger) -->
    </div>
    <div class="pg-chain" id="pgChain"></div>
  </div>
</section>
```

**Surface options (8):** base, bright, deep, accent, dim, container, over-container, float.
**Role options (6):** brand, danger, success, warning, info, neutral.
**Token Resolution Chain** (`#pgChain`): shows `role → fill/content/container → component token → computed`.

**Rules:**
- Card A defaults: surface=base, role=brand.
- Card B defaults: surface=deep, role=danger.
- `pgChain` MUST be non-empty when page loads (test enforces this).
- Use `P.applySurface()` and `P.applyRole()` on card bodies.

---

### §11 Use in Framework

**Purpose**: Copy-paste framework integration snippets.

```html
<section class="section" id="sec-framework">
  <div class="section-header"><h2>Use in Your Framework</h2><span class="section-tag">Integration</span></div>
  <p class="section-desc">Wrap this component in your framework. Props become data attributes…</p>
  <div class="section-body">
    <div class="fw-snippet">
      <div class="fw-snippet-head">
        <h3>{Component} Wrapper</h3>
        <a class="fw-snippet-link" href="frameworks.html">Full guide →</a>
      </div>
      <div class="fw-snippet-tabs" data-tabs="fw-{prefix}">
        <button class="fw-snippet-tab" aria-selected="true" data-tab="react">React</button>
        <button class="fw-snippet-tab" data-tab="vue">Vue</button>
        <button class="fw-snippet-tab" data-tab="html">HTML</button>
        <button class="fw-snippet-tab" data-tab="css">CSS Tokens</button>
      </div>
      <div class="fw-snippet-code" data-panel="react" data-active>...</div>
      <div class="fw-snippet-code" data-panel="vue">...</div>
      <div class="fw-snippet-code" data-panel="html">...</div>
      <div class="fw-snippet-code" data-panel="css">...</div>
    </div>
  </div>
</section>
```

**Canonical tabs (4):** React, Vue, HTML, CSS Tokens.

---

## Global Pill Bars (Top of Page)

Pill bars sit above the sections and control ALL synced component instances globally.

### Canonical bars and their IDs

| Bar Label | ID | data-key | Values |
|---|---|---|---|
| Variant | `variantBar` | `ctrlVariant` | Component-specific (filled/outlined/soft/ghost…) |
| Size | `sizeBar` | `ctrlSize` | micro/tiny/small/**base**/medium/large/big/huge/mega/ultra |
| Role | `roleBar` | `ctrlRole` | brand/danger/success/warning/info/neutral |
| Shape | `roundedBar` | `ctrlRounded` | "false" (Default) / "true" (Rounded) |
| Mode | `modeBar` | `ctrlMode` | Component-specific (dropzone/button, etc.) |

**Rules:**
- Default value is **bold** and has `aria-pressed="true"`.
- Use `P.wirePillBar(barId, dataKey, callback)`.
- NEVER use `structBar`/"Structure" — use `variantBar`/"Variant" instead.
  Exception: Button family keeps `structBar` for historical reasons (filled/outlined/soft/ghost
  are structural variants, not semantic roles). New components MUST use `variantBar`.

---

## Component-Specific Extra Sections

Insert between §07 (Slots) and §08 (Motion):

| Component | Extra Section | ID | Purpose |
|---|---|---|---|
| Badge | Dot Indicator | `sec-dot` | Dot-only mode with no label |
| File-upload | File List | `sec-filelist` | Uploaded file list rendering |
| Alert | Accent Bar | `sec-accent` | Left-border accent pattern |
| Alert | Dismiss | `sec-dismiss` | Close button + animation |
| Tooltip | Placement | `sec-placement` | Top/Bottom/Left/Right arrow positions |
| Tooltip | Rich Content | `sec-rich` | HTML content inside tooltip |
| Toast | Positions | `sec-positions` | Screen position (top-right, bottom-center…) |
| Avatar | Status Badges | `sec-badges` | Online/offline/busy/away indicators |
| Avatar | Avatar Group | `sec-group` | Stacked avatar group component |
| Datepicker | Day States | `sec-daystates` | Today/selected/range/disabled day cells |
| Progress Circle | Linecap | `sec-linecap` | Round vs butt stroke cap |

---

## CSS Architecture per Demo Page

### Required stylesheets (in order)
```html
<link rel="stylesheet" href="../packages/tokens/src/index.css">
<link rel="stylesheet" href="../packages/components/src/{component}/{component}.tokens.css">
<link rel="stylesheet" href="../packages/components/src/{component}/{component}.css">
<link rel="stylesheet" href="shared.css?v={ver}">
```

### Page-specific `<style>` block
Only for layout rules unique to this demo (e.g. `.preset-grid`, `.state-row`).
**NEVER** redefine `.surface-panel--deep` background or `.a11y-grid` layout in a page-
specific block — use the shared.css definitions.

---

## JavaScript Architecture

### Required scripts (in order)
```html
<script src="auth-gate.js?v=2"></script>       <!-- before body renders -->
<!-- ... body content ... -->
<script src="dtf-topbar.js?v={ver}"></script>
<script src="nav.js?v={ver}"></script>
<script src="shared.js?v={ver}"></script>
<script src="shared-page.js?v={ver}"></script>  <!-- if using P.* helpers -->
<script>
  // Page-specific code
</script>
```

### Page script structure (canonical order)
```js
(function() {
  'use strict';
  var P = window.DTFPage;

  // 1. Constants (VARIANTS, SIZES, STRUCTS, STATES, etc.)
  var SURFACE_TOKENS = [...];  // ← MUST be before any function that calls applySurface

  // 2. Component factory: makeComponent(opts) → HTMLElement
  function makeComponent(opts) { ... }

  // 3. Render functions (one per section, named render{Section})
  function renderVariants() { ... }
  function renderDensity() { ... }
  function renderStates() { ... }
  function renderSurface() { P.renderSurfacePanels('surfaceStrip', fn); }
  function renderShape() { ... }
  function renderSlots() { ... }
  function renderMotion() { ... }
  function renderA11y() { ... }

  // 4. Inspector update
  function updateInspector() { P.buildInspector(...); }

  // 5. Global apply (calls all renders)
  function applyGlobals() {
    // sync all synced instances
    renderVariants(); renderDensity(); renderStates();
    renderSurface(); renderShape(); renderSlots(); renderMotion(); renderA11y();
    requestAnimationFrame(updateInspector);
  }

  // 6. Wire pill bars
  P.wirePillBar('variantBar', 'ctrlVariant', function(v) { curVariant = v; applyGlobals(); });
  P.wirePillBar('sizeBar', 'ctrlSize', function(v) { curSize = v; applyGlobals(); });
  P.wirePillBar('roleBar', 'ctrlRole', function(v) { curRole = v; applyGlobals(); });

  // 7. Initial render
  applyGlobals();

  // 8. Context Playground (applySurface/applyRole used here too)
  // ...

  // 9. Theme change listener
  window.DTF.onThemeChange = updateInspector;
})();
```

**Critical**: `SURFACE_TOKENS` array MUST be declared before `applyGlobals()` is called,
because `applyGlobals()` → `renderSurface()` → `applySurface()` reads it synchronously.

---

## QC Test Assertions (enforced by CI)

| Assertion | Test file | What it catches |
|---|---|---|
| Surface panel labels match rendered background | `demo-consistency.spec.js` | Wrong label text or missing `applySurface()` |
| Deep surface panels render `--surface-deep-bg` | `demo-consistency.spec.js` | Old `surface-base-strong` pattern |
| Hero inspector has ≥1 resolved row, no NaN/undefined | `demo-consistency.spec.js` | Broken inspector rendering |
| Playground chain is non-empty on load | `demo-consistency.spec.js` | Missing initial `pgChain` content |
| Global variant/size bars propagate to synced elements | `demo-consistency.spec.js` | Broken pill-bar wiring |
| Deep-surface label text is readable (≥3:1 contrast) | `demo-consistency.spec.js` | Unreadable text on dark panels |

---

## Migration Checklist (for fixing existing pages)

When bringing a page into compliance:

- [ ] Rename "Hero Preview" → "Hero Inspector" in sidebar
- [ ] Zero-pad sidebar numbers (`01`, `02`, …)
- [ ] Replace custom surface rendering with `P.renderSurfacePanels()`
- [ ] Fix surface labels to `surface-base-bg` / `surface-base-subtle` / `surface-deep-bg`
- [ ] Remove inline `.surface-panel--deep` background overrides from page `<style>`
- [ ] Ensure `SURFACE_TOKENS` is declared before first `applyGlobals()` call
- [ ] Add Context Playground if missing
- [ ] Verify all 4 a11y cards present (Focus Ring, Keyboard Nav, Disabled, Forced Colors)
- [ ] Verify Framework section has 4 tabs (React, Vue, HTML, CSS Tokens)
- [ ] Run `npx playwright test tests/visual/demo-consistency.spec.js` — all must pass
