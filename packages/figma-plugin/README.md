# Design Token Forge — Figma Plugin

> **Status:** Sync-capable — detects existing DTF variables in Figma,
> computes a diff, and applies only what changed.

## What this proves

| Concern | Answer |
|---------|--------|
| Can DTF CSS tokens be parsed automatically? | Yes — 538 variables extracted from 4 files |
| Can light/dark themes map to Figma modes? | Yes — Semantic + Surface collections get Light / Dark modes |
| Does the Figma variable hierarchy feel native? | Yes — `/`-separated paths create proper groups in the Variables panel |
| Is the mapping lossless? | Colors & numbers: yes. Shadows & composite values: STRING fallback (Figma limitation) |
| Can it sync incrementally? | Yes — diffs existing vs incoming, applies add/update/remove selectively |

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  Design Token Forge                       │
│  primitives.css  semantic.css  surfaces.css  extras.css  │
└───────────────────────┬──────────────────────────────────┘
                        │  node export-figma.js
                        ▼
              ┌─────────────────────┐
              │ dtf-figma-tokens.json│  538 variables
              │  4 collections       │  Light / Dark modes
              └─────────┬───────────┘
                        │  Figma Plugin UI
                        ▼
              ┌─────────────────────┐
              │   Figma Variables    │
              │  ├ DTF / Primitives  │  173 COLOR + 64 FLOAT + 9 STRING
              │  ├ DTF / Semantic    │  108 COLOR  (Light/Dark)
              │  ├ DTF / Surfaces    │  128 COLOR  (Light/Dark)
              │  └ DTF / Extras      │  35 FLOAT + 21 STRING
              └─────────────────────┘
```

## Quick start

### 1. Export tokens

```bash
# From repo root
node packages/generator/src/export-figma.js

# Or with custom output path
node packages/generator/src/export-figma.js --out ./my-tokens.json
```

This reads the 4 CSS token files and produces `dtf-figma-tokens.json`.

### 2. Install plugin in Figma (development mode)

1. Open Figma Desktop
2. Go to **Plugins → Development → Import plugin from manifest…**
3. Select `packages/figma-plugin/manifest.json`
4. The plugin appears under **Plugins → Development → Design Token Forge**

### 3. Run the plugin

#### First time (fresh import)

1. Open any Figma file
2. **Plugins → Development → Design Token Forge**
3. The banner shows: "No existing DTF variables found — fresh import"
4. Load `dtf-figma-tokens.json` via **"Load JSON file…"** or paste
5. Preview shows 4 collections, 538 variables
6. Click **"Import into Figma"**

#### Subsequent runs (sync)

1. Make changes to DTF's CSS token files (edit values, add/remove tokens)
2. Re-run the exporter: `node packages/generator/src/export-figma.js`
3. Open the plugin — the banner shows: "Found 538 existing DTF variables in 4 collections"
4. Load the updated `dtf-figma-tokens.json`
5. The **Sync Preview** panel appears automatically, showing:

```
┌─────────────────────────────────────────────┐
│  SYNC PREVIEW                               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌──────────┐      │
│  │  3  │ │  5  │ │  1  │ │   529    │      │
│  │ New │ │ Chg │ │Stale│ │Unchanged │      │
│  └─────┘ └─────┘ └─────┘ └──────────┘      │
│                                             │
│  +ADD  spacing/128             (new token)  │
│  ~UPD  primary/content-default  #1E54→#2060 │
│  ~UPD  surface/base/bg         #FAFA→#F8F8 │
│  -DEL  prim/brand/deprecated   (removed)    │
│                                             │
│  ☐ Remove stale variables                   │
│                                             │
│  [Cancel]              [Sync Changes]       │
└─────────────────────────────────────────────┘
```

6. **Sync options:**
   - **Unchecked** "Remove stale" = safe sync (add + update only)
   - **Checked** "Remove stale" = full sync (add + update + remove)
7. Click **"Sync Changes"** — only the diff is applied
8. After sync, the plugin re-scans and shows "Already up to date"
6. Open the **Variables** panel (right sidebar) — you'll see:

```
DTF / Primitives
  ├ prim/
  │  ├ brand/     (white, 25, 50, … 950, black)
  │  ├ brand/
  │  ├ desaturated/
  │  └ ...
  ├ color/        (white, black, fixed-white, …)
  ├ spacing/      (none, 1, 2, 4, 6, 8, …)
  └ font/         (family-sans, size-xs, weight-regular, …)

DTF / Semantic Roles     [Light | Dark]
  ├ primary/      (content-default, component-bg-default, …)
  ├ brand/
  ├ danger/
  ├ success/
  ├ warning/
  └ info/

DTF / Surfaces           [Light | Dark]
  — Canvas tones (page surfaces)
  ├ surface/bright/   (bg, hover, pressed, outline, ct-default, …)
  ├ surface/base/
  ├ surface/dim/
  ├ surface/deep/
  ├ surface/accent/
  — Elevation tones (lifted regions)
  ├ surface/card/         (resting lift — cards, panels)
  ├ surface/modal/        (blocking overlay — dialogs, sheets)
  └ surface/float/        (transient overlay — menus, dropdowns, tooltips)

DTF / Extras
  ├ radius/       (none, xs, sm, md, DEFAULT, lg, …)
  ├ shadow/       (none, xs, sm, md, lg, xl, 2xl, inner)
  ├ duration/     (instant, fast, normal, slow, …)
  ├ easing/       (linear, in, out, bounce, spring)
  ├ z-index/      (base, dropdown, sticky, fixed, …)
  └ opacity/      (0, 5, 10, 15, …, 100)
```

### 4. Use in your designs

Once imported, variables are available in:
- **Fill picker** → click the variable icon → select from DTF collections
- **Inspector panel** → shows `{surface/base/bg}` (resolved: #FAFAFA)
- **Prototype mode** → switch between Light and Dark modes per frame

## What's validated

- **CSS → JSON parsing** — regex extracts `:root` (light) and `[data-theme="dark"]` (dark) blocks
- **Type detection** — hex → COLOR, numeric → FLOAT, composite → STRING
- **Figma path grouping** — `--surface-modal-bg` → `surface/modal/bg`
- **Light/Dark modal** — Figma mode switching works on semantic + surface collections
- **538 variables** across 4 collections — full token system imported in one click
- **Incremental sync** — scans existing DTF collections, computes per-variable diff, applies only changes
- **Content hash** — exported JSON includes SHA-256 hash for change detection

## Sync workflow

```
Developer edits CSS tokens
        │
        ▼
  node export-figma.js     ─→  dtf-figma-tokens.json (with content hash)
        │
        ▼
  Open Figma Plugin
        │
        ├── Scans existing DTF Variable Collections
        │
        ├── Loads new JSON
        │
        ├── Computes diff:
        │     Added:     tokens in JSON but not in Figma
        │     Changed:   tokens in both but values differ
        │     Stale:     tokens in Figma but not in JSON
        │     Unchanged: identical
        │
        ├── Shows Sync Preview (counts + detail list)
        │
        ├── User picks:
        │     Safe sync = add + update
        │     Full sync = add + update + remove stale
        │
        └── Applies only the diff → done
```

## Limitations

| Limitation | Full-version fix |
|------------|-----------------|
| No component-level tokens (T3) | Export component token files; create additional collections per component |
| No variable aliasing | Map component vars → semantic/surface vars using Figma's `VariableAlias` type |
| STRING shadows (not native effects) | Generate Figma Effect Styles alongside variables |
| Manual JSON paste/load | HTTP endpoint or embedded JSON from DTF server |
| No DTCG format output | Add W3C DTCG JSON export alongside Figma format |

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Figma plugin descriptor |
| `code.js` | Plugin sandbox — scan, diff, import, sync |
| `ui.html` | Plugin UI — file load, preview, sync diff, actions |
| `dtf-figma-tokens.json` | Exported token payload (generated, not committed) |
| `package.json` | Package metadata + export script |
| `README.md` | This file |

## Path to full development

```
POC (done)                       → V1 (current)                    → V2
─────────────────────────────────────────────────────────────────────────
CSS parse + JSON export          │ ✓ Incremental sync             │ + bidirectional sync
Manual file load in UI           │ + HTTP fetch from DTF server    │ + real-time watch mode
4 flat collections               │ + variable aliasing (T3→T1→T0) │ + Figma Component generation
✓ Diff/update (only changed)    │ + component tokens (T3)         │ + AI Screen Composer integration
✓ Content hashing               │ + DTCG + Style Dictionary out   │ + publish to Figma Community
```
