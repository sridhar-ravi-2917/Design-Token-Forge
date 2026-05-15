# Editor v2 — Tier Architecture Spec

> Authoritative design doc for the T1 (Roles) → T2 (Surfaces) → T3 (Components) editing experience.
> Status: **DRAFT for ratification**. Code follows; no implementation begins until §10 is closed.
> Owners: design + eng. Date opened: 15 May 2026.

---

## 0. Purpose & non-goals

**Purpose.** Lock the UX/UI/architecture of the three editing tiers in a single pass so we stop ping-ponging between “build it” and “fix it.” Same shell, same primitives, same mental model across T1/T2/T3.

**Non-goals.**
- Not redesigning T0 primitives (palette generation lives in `palette-engine.js` and is upstream of all of this).
- Not re-doing the current `color-system.html` editor — that page can be retired once editor-v2 covers T2 + T3.
- Not building Figma round-trip in this doc (separate spec, but inheritance graph below is what the round-trip will key off of).

---

## 1. Tier model — the names & counts we will live with

### T0 — Primitives (out of scope, listed for graph clarity)
Per palette: `25, 50, 75, 100, 150, 175, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900` (21 steps × N palettes).

Source palettes today: `neutral`, `brand`, `danger`, `warning`, `success`, `info`.
**Open question Q1**: do we add `accent` as its own palette or keep it as a brand alias? See §10.

### T1 — Roles  *(already shipping)*
6 roles × 2 modes × 3 picks (+ optional border/separator overrides).
Roles: `brand · danger · warning · success · info · neutral`.
Picks per role: `fill`, `content`, `container`. Plus per-mode optional `borderStep` / `separatorStep` (added 15 May 2026).

### T2 — Surfaces  *(this doc covers)*
**8 surfaces** — sourced from `packages/tokens/src/surfaces.css`:

| # | id            | source palette  | role            |
|---|---------------|-----------------|-----------------|
| 1 | `bright`      | neutral         | brightest page bg |
| 2 | `base`        | neutral         | default page bg   |
| 3 | `dim`         | neutral         | recessed bg       |
| 4 | `deep`        | neutral         | most recessed     |
| 5 | `accent`      | brand           | branded panels    |
| 6 | `container`   | derived         | card-on-surface   |
| 7 | `float`       | derived         | popovers/menus    |
| 8 | `inverse`     | neutral (flip)  | dark on light, light on dark |

**16 properties per surface × 2 modes = 256 cells per surface set; 8 surfaces × 16 props × 2 modes = 256 max.** *(Some props are optional — see taxonomy in §3.)*

### T3 — Components  *(this doc covers in outline; detailed spec in v2 of this doc)*
**Component families** (initial, mirrors `demo/*.html`):
`alert · avatar · badge · button · checkbox · datepicker · file-upload · icon-button · input · menu-button · progress-bar · progress-circle · radio · select · slider · split-button · textarea · toast · toggle · tooltip` — 20 families.

**Per family**: variants × states × tokens. Conservative average: 8 variants × 5 states × 6 tokens × 2 modes ≈ 480 cells/family. **We will not edit T3 cell-by-cell** — see §6 “Bulk by default.”

---

## 2. Architectural decisions (ratified)

These mirror what was agreed in chat. Listed here as the contract code must obey.

| ID | Decision |
|---|---|
| **D1** | One layout pattern across T1/T2/T3: left rail (items) → main pane (header + property cards grouped by family) → sticky footer (change-bar / discard / reset). |
| **D2** | One **Property Card** component used in every tier. Frozen anatomy in §4. |
| **D3** | **Inheritance is first-class UI.** Every property either *follows* an upstream token or *detaches* with a custom step. Toggle is one click. Visible at-a-glance via swatch border style and a “follows X” chip. |
| **D4** | **Mode-awareness is global.** All step offsets pass through `tonalDir(mode)`. Codified in `solver.js`; no inline `± constant` allowed. |
| **D5** | **WCAG ratios always show their baseline.** `4.6:1 vs surface-base-bg`, never bare numbers. Three sentinels: `vs page`, `vs surface`, `vs component-fill`. |
| **D6** | **Bulk affordances are baked in, not bolted on.** Per card: *Apply to both modes*, *Follow upstream*, *Apply to peers*. |
| **D7** | **Preview iframe renders real components on real surfaces.** Canonical preview composition spec'd in §8. |

---

## 3. Property taxonomy

> **All names below are tentative.** Renames are explicitly allowed during build. Ratify the *structure*, treat names as v0.

### 3.1 T1 — Roles  *(already implemented; documented for completeness)*

```
brand
├── fill        (component bg base step)
├── content     (text/icon on surfaces)
├── container   (filled-tonal background)
├── borderStep* (override; default = container ± 6 · tonalDir)
└── separatorStep* (override; default = container ± 2 · tonalDir)
```
Aliases derived per role (read-only, exposed in preview only):
`*-component-bg-{default,hover,pressed}`, `*-component-outline-{default,hover,pressed}`, `*-component-separator`,
`*-container-{bg,hover,pressed,outline,separator}`,
`*-content-{default,strong,subtle,faint}`, `*-on-component`, `*-on-container`.

### 3.2 T2 — Surfaces  *(new)*

Each surface has **16 properties** in 4 families. Naming follows existing CSS:

| Family | Properties | Inherits from |
|---|---|---|
| **Surface** (4) | `bg`, `subtle`, `strong`, `outline`, `separator` | T0 step on source palette |
| **Content** (4) | `ct-default`, `ct-strong`, `ct-subtle`, `ct-faint` | T0 step (must pass WCAG vs `bg`) |
| **Component-on-surface** (5) | `cm-bg`, `cm-bg-hover`, `cm-bg-pressed`, `cm-outline`, `cm-outline-hover`, `cm-outline-pressed`, `cm-separator` | T1 role pick OR T0 step |

> Rule: every property is either `step on source palette` (default) or `follows brand.fill` etc. The *Follow upstream* toggle in §4 is what flips between them.

**Default offset table** (relative to `bg` step on source palette, `dir = tonalDir(mode)`):

```
bg        → 0
subtle    → +1·dir
strong    → +2·dir
outline   → +3·dir
separator → +3·dir
ct-default→ -16·dir   (forced into AA range; clamped)
ct-strong → -19·dir
ct-subtle → -10·dir
ct-faint  → -8·dir
cm-bg     → -1·dir    (lifted toward viewer — “card on surface”)
cm-bg-h   → 0
cm-bg-p   → +1·dir
cm-outline→ +3·dir
cm-outline-h → +4·dir
cm-outline-p → +4·dir
cm-separator → +3·dir
```

All offsets are **default**; user can detach + walk via the same ± stepper used in T1.

### 3.3 T3 — Components  *(outline; deeper spec to follow once T2 ships)*

Each component family declares its token surface as a **template** in JS:

```js
{
  family: 'button',
  variants: ['filled','outlined','ghost'],
  states:   ['default','hover','pressed','focus','disabled','loading'],
  tokens: {
    bg:        { inherits: 'role.fill',   states: ['default','hover','pressed'] },
    fg:        { inherits: 'role.on-component' },
    outline:   { inherits: 'role.component-outline', states: ['default','hover','pressed','focus'] },
    radius:    { inherits: 'shape.radius-md' },
    paddingX:  { inherits: 'space.4' },
    paddingY:  { inherits: 'space.2' },
    fontSize:  { inherits: 'type.body-md.size' },
  }
}
```

This template format is the contract T3 editor reads from. **One template per family**, lives in `demo/editor-v2/t3-templates.js`.

---

## 4. Property Card — frozen anatomy

The single primitive used everywhere. Same DOM in T1, T2, T3.

```
┌──────────────────────────────────────────────────────────────────────┐
│ ▢  ct-default        [step 200 ▾] [−][+]  ↺      4.6:1 vs surf-bg ✓ │
│ ░  follows brand · 500   ·custom                                     │
└──────────────────────────────────────────────────────────────────────┘
  ↑   ↑                  ↑           ↑      ↑
 swatch token-name     step pill   reset   WCAG ratio + sentinel + grade
        + inheritance chip        (only if overridden)
```

### Anatomy parts (all optional, shown when relevant)

| Part | Class | Always | When shown |
|---|---|---|---|
| Swatch | `.ev2-pc-swatch` | yes | always (border style: solid=detached, dotted=follows) |
| Token name | `.ev2-pc-name` | yes | always |
| Inheritance chip | `.ev2-pc-follows` | no | when `follows` is active |
| Step pill | `.ev2-pc-step` | no | when **detached** (shows current step) |
| ± stepper | `.ev2-pc-stepper` | no | when **detached** |
| Custom marker | `.ev2-pc-custom` | no | when step ≠ default offset |
| Reset chevron | `.ev2-pc-reset` | no | when overridden (step OR follow target) |
| WCAG ratio | `.ev2-pc-wcag` | no | when card represents a *pair* (content vs bg, etc.) |
| WCAG sentinel | `.ev2-pc-wcag-vs` | no | always shown with ratio (`vs surface-base-bg`) |
| WCAG grade | `.ev2-pc-wcag-grade` | no | always shown with ratio (AAA/AA/AA-large/fail) |

### Card states (data-attributes on `.ev2-pc`)

```
data-mode-source = "follows" | "detached"
data-step-status = "default" | "custom"
data-wcag-grade  = "aaa" | "aa" | "aa-large" | "fail" | (none)
```

CSS owns the visual differences entirely. JS sets data-attrs.

### Card actions menu (kebab, optional)

For bulk ops (D6):
- `Apply to both modes`
- `Apply to all status surfaces`
- `Follow brand · 500…`  *(opens a 1-level picker)*
- `Detach`
- `Reset`

---

## 5. Layout wireframes

### 5.1 Shell (same for T1, T2, T3)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Tier rail:  [T1 Roles] [T2 Surfaces] [T3 Components]  ░ mode: ◐    │
├──────────┬──────────────────────────────────────────────────────────┤
│ items    │  Item header bar:   ▢ name   · follows X · WCAG summary  │
│          ├──────────────────────────────────────────────────────────┤
│ ● brand  │  ── Family: Surface ─────────────────────  [edit family] │
│   danger │  [ Property Card ]                                       │
│   warning│  [ Property Card ]                                       │
│   ...    │                                                          │
│          │  ── Family: Content ─────────────────────  [edit family] │
│          │  [ Property Card ]                                       │
│          │  ...                                                     │
│          │                                                          │
│          │  ── Family: Component-on-surface ────────  [edit family] │
│          │  [ Property Card ]                                       │
│          │  ...                                                     │
├──────────┴──────────────────────────────────────────────────────────┤
│  Sticky footer:   3 changes in this tier   [Discard]  [Reset all]   │
└─────────────────────────────────────────────────────────────────────┘

Right-side pinned (resizable): Live preview iframe (§8)
```

### 5.2 Differences per tier

| Region | T1 | T2 | T3 |
|---|---|---|---|
| Tier rail | Roles | Surfaces | Components |
| Left items | 6 roles | 8 surfaces | 20 families (search + group by category) |
| Item header | Role badge + key color | Surface badge + bg swatch | Component name + variant pill |
| Property groups | (single group) | Surface · Content · Component-on-surface | (one group per state, e.g. default/hover/pressed) |
| Sub-pivot inside main pane | mode toggle (already exists) | mode toggle | variant tabs + mode toggle |

### 5.3 Tier rail behaviour
- Single horizontal pill bar at the top of the editor pane.
- Tier change preserves: active mode, draft state per tier, scroll position per tier.
- Each tier owns its own `State.tN.draft` slot. Saves are per-tier with a global “Save all” option in the footer.

---

## 6. Bulk-op catalog  *(D6)*

### Per-card actions
1. **Apply to both modes** — copy current pick to the opposite mode for the same surface/role/component.
2. **Follow upstream** — replace step pick with a follows-target.
3. **Detach** — flip a follows card to step + ± stepper.
4. **Reset** — drop override (step OR follow), revert to default offset.

### Per-family actions (top-right of the family group header)
5. **Edit family** — opens a multi-select panel; check N cards, then choose:
   - *Same step on all* (writes one step to all selected, both modes)
   - *Same follows target on all*
   - *Reset all*
6. **Snap-to-AA** — walk all content cards in this family until they pass AA vs their baseline.

### Per-tier actions (footer)
7. **Apply T1 picks to all status surfaces** *(T2 only)* — one-click rebuild of `accent`, status surfaces from current T1 picks.
8. **Discard tier** — wipe draft for this tier only.
9. **Reset tier to defaults** — wipe draft AND clear any saved overrides.

> Without these, no human will sit through editing 256 surface cells. Bulk is the contract that makes the editor usable.

---

## 7. WCAG sentinel matrix  *(D5)*

Every WCAG ratio in the editor renders as `<ratio>:1 vs <baseline-token-name> <grade>`.

| Card type | Baseline | Sentinel label | Threshold |
|---|---|---|---|
| T1 `content` | T1 `fill` (component-bg-default) | `vs <role>-component-bg` | AA 4.5 |
| T1 `container` | page (surface-base-bg) | `vs surface-base-bg` | AA 3.0 (large) |
| T1 `border` | T1 `container` | `vs <role>-container-bg` | AA 3.0 |
| T1 `separator` | T1 `container` | `vs <role>-container-bg` | AA 3.0 (informational only — no fail blocking) |
| T2 `ct-*` | surface `bg` | `vs <surface>-bg` | AA 4.5 (default), AA-large 3.0 (subtle/faint) |
| T2 `cm-bg-*` | surface `bg` | `vs <surface>-bg` | AA 3.0 |
| T2 `cm-outline-*` | adjacent `cm-bg` | `vs <surface>-cm-bg` | AA 3.0 |
| T2 `outline` | surface `bg` | `vs <surface>-bg` | AA 3.0 |
| T2 `separator` | surface `bg` | `vs <surface>-bg` | informational |
| T3 fg pairs | resolved bg in same component state | `vs <comp>-<variant>-<state>-bg` | AA 4.5 / large 3.0 |

Grades: `aaa` (≥7) · `aa` (≥4.5) · `aa-large` (≥3) · `fail` (<3).

---

## 8. Preview composition  *(D7)*

`preview.html` renders three canonical compositions stacked vertically. Each receives the live tokens via `postMessage`.

```
┌─ Page (surface-base-bg) ────────────────────────────┐
│  H1 + body copy              [Brand Button][Outline]│
│  ┌─ Card (surface-container) ──────────────────────┐│
│  │  H3 + body                                      ││
│  │  [Inputs][Select][Toggle]   [Primary][Danger]   ││
│  │  ┌─ Inline panel (surface-accent) ────────────┐ ││
│  │  │  Banner content + dismiss icon              │ ││
│  │  └────────────────────────────────────────────┘ ││
│  └────────────────────────────────────────────────┘ │
│  Status row: [Toast info][Toast success][Toast danger]│
└──────────────────────────────────────────────────────┘
```

This composition exercises: page bg, container surface, accent surface, status surfaces, all 6 role fills, all 4 content tints, outlines, separators, and one of every component family from §1 (initially: button, input, select, toggle, toast — extends as T3 lands).

> Adding a new T2 surface or T3 family to the spec **must** add a corresponding rendering in `preview.html`. Else it’s invisible and we’ll regress it.

---

## 9. Inheritance graph  *(D3, machine-readable)*

```
T0 primitives (palettes × steps)
   │
   ▼
T1 Roles  (6 × 3 picks + 2 optional step overrides per mode)
   │
   ├──▶ T2 Surfaces  (8 × 16 props; each prop EITHER step-on-palette OR follows T1)
   │       │
   │       ▼
   │     T3 Components (20 families × variants × states; each token EITHER follows T2 surface OR T1 role)
   │
   └──▶ T3 (some component tokens follow T1 directly, e.g. `button.bg = role.fill`)
```

- A T1 pick change cascades to: any T2 prop with `follows: 'role.<x>'` and any T3 token with `follows: 'role.<x>'`.
- A T2 prop change cascades to: any T3 token with `follows: 'surface.<id>.<prop>'`.
- Saved overrides at any tier **stop** the cascade for that cell only.

Implementation note: cascade is computed in `solver.js`, not the editor — editor only renders the resolved value + the “follows X” chip.

---

## 10. Open questions  *(closed 15 May 2026 — all defaults accepted)*

| Q | Question | Decision |
|---|---|---|
| Q1 | Add `accent` as its own T0 palette? | **No** — keep deriving from brand. |
| Q2 | T2 default offsets in §3.2 — accept or workshop? | **Accept** — tune later via the ± steppers. |
| Q3 | T3 family scope for v1? | **Start with 5: `button`, `input`, `select`, `toggle`, `toast`.** Rest follow the same template. |
| Q4 | Sunset existing `color-system.html`? | **Run in parallel** until T3 ships, then sunset with a banner pointing to editor-v2. |
| Q5 | Bulk-op kebab placement? | **Hover-only on the card; always-visible on the family-group header.** Inline ± and ↺ stay always-visible on the card. |
| Q6 | Footer “Save all” fires deploy? | **No — localStorage only.** Deploy is a separate explicit action. |
| Q7 | Preview iframe placement? | **Pinned right, resizable, collapsible.** |
| Q8 | Tier rail position? | **Top of editor pane** (matches wireframe). |
| Q9 | Mode toggle scope? | **Global** to editor. |
| Q10 | Naming pass timing? | **After T2 ships**, single bulk codemod pass. |

---

## 11. Build order (after §10 closes)

1. **Refactor T1 to use the frozen Property Card** from §4. Two cards: `Pair card` (current border/separator style) and `Single card` (fill/content/container). One-day refactor, zero behaviour change.
2. **Add tier rail** to editor shell, T2/T3 routes empty.
3. **T2 — surface model + state** (`State.t2[mode][surfaceId][prop] = {step?, follows?}`).
4. **T2 — render** with same Property Card + family groups.
5. **T2 — bulk ops** (per-card, per-family, per-tier as in §6).
6. **Preview composition** updated to exercise T2 surfaces.
7. **T3 templates** (5 families).
8. **T3 — render + bulk + preview.**
9. **Naming pass** (Q10) + Figma round-trip (separate spec).

Each step is a single focused commit. No back-and-forth.

---

## Appendix A — File layout (target)

```
demo/editor-v2/
  index.html              # shell + tier rail
  editor-v2.css           # shell + Property Card primitive
  editor-v2.js            # shell, state, dispatcher
  tiers/
    t1-roles.js           # data + render
    t2-surfaces.js        # data + render
    t3-components.js      # data + render
  property-card.js        # the one frozen primitive
  t3-templates.js         # per-family token templates
  preview.html            # canonical composition
  solver.js               # tonalDir, stepRel, resolve cascade
```

## Appendix B — Glossary

- **Step** — a 21-step palette index; stored as a string id (`'500'`).
- **Follows** — a card whose value is computed from an upstream tier’s pick; no own step.
- **Detached** — a card with its own step; the ± stepper is enabled.
- **Override** — a custom step that differs from the family’s default offset.
- **Sentinel** — the baseline token name shown next to a WCAG ratio.
- **Tier** — T1/T2/T3, each with its own draft and save lifecycle.
