<!-- status: current -->
<!-- last-verified: 2026-06-18 -->

# DTF — Canonical Reference Index

> This is the ONE file to read at the start of any session.
> Everything links from here. If it's not here, it's either draft or superseded.

---

## The Single Source of Control

```bash
pnpm gate:status          # Which gate is every component at?
pnpm gate <comp> --advance  # Check a component and advance its gate
pnpm gate:regression      # Did any shipped component's tokens silently change?
pnpm audit:docs           # Are any docs stale or superseded?
```

These four commands tell you the health of the entire system. Run them before any session.

---

## Active Architecture Docs (status: current)

| Doc | What it answers |
|-----|----------------|
| [architecture/overview.md](architecture/overview.md) | 7 axes, T0→T3 chain, two-tier model |
| [architecture/component-builder/overview.md](architecture/component-builder/overview.md) | How the Figma plugin builds components |
| [architecture/component-builder/variant-axes.md](architecture/component-builder/variant-axes.md) | Family vs Type rule, variant explosion control |
| [architecture/component-builder/token-naming-and-aliasing.md](architecture/component-builder/token-naming-and-aliasing.md) | `-default` suffix rule, `--_xx` internal vars |
| [architecture/component-builder/slot-padding-model.md](architecture/component-builder/slot-padding-model.md) | Single-zone padding (button/input/badge) |
| [architecture/component-builder/multi-zone-model.md](architecture/component-builder/multi-zone-model.md) | Split/menu multi-zone contracts |
| [architecture/component-builder/figma-binding-rules.md](architecture/component-builder/figma-binding-rules.md) | NEVER delete+recreate; update in place |
| [architecture/component-builder/component-ledger-and-safe-rebuild.md](architecture/component-builder/component-ledger-and-safe-rebuild.md) | Ledger, W1–W2, safe rebuild system |

## Active Component Docs (status: current)

| Doc | What it answers |
|-----|----------------|
| [components/inventory.md](components/inventory.md) | All 38 components, category, prefix, variants |
| [components/variable-spec-template.md](components/variable-spec-template.md) | YAML spec format for all 7 axes |
| [CONSISTENCY.md](CONSISTENCY.md) | Canonical vocabulary, class naming, microcopy |

## Active Token Docs (status: current)

| Doc | What it answers |
|-----|----------------|
| [tokens/global-tokens.md](tokens/global-tokens.md) | Global token naming, categories |
| [tokens/color-architecture.md](tokens/color-architecture.md) | T0→T3 color chain |

## Active Decision Docs (status: current)

| Doc | What it answers |
|-----|----------------|
| [decisions/adrs.md](decisions/adrs.md) | All architectural decisions and rationale |
| [decisions/naming-charter.md](decisions/naming-charter.md) | Token naming rules and history |

## Roadmap

| Doc | What it answers |
|-----|----------------|
| [ROADMAP.md](ROADMAP.md) | Phase plan, what's done, what's next |

---

## Gate System (the enforcement layer)

The gate system lives in `scripts/gate-check.cjs`. Every check in that script IS a living rule — when we learn something new, it goes into that file as a check. The script is the truth. Docs are context.

**6 gates, sequential, no skipping:**

| Gate | Name | What it checks |
|------|------|---------------|
| G0 | RESEARCH | Brief folder: all 5 files filled, all checklists checked |
| G1 | SPEC | spec.yaml: all 7 axes, variants, states, sizes |
| G2 | TOKENS | Depth, no hex, no self-cycles, no hardcoded white, on-component AA coverage |
| G3 | CSS | Internal vars, logical props, focus-visible, tap-target, no negative offset, no translateY centering |
| G4 | DEMO | Exists, deterministic (no Math.random, Date guard) |
| G5 | QC | Cross-component height ladder, system token usage, visual suite |
| G6 | FIGMA | Blueprint registered, page field present |

**Brief template:** `docs/components/briefs/TEMPLATE/` — copy for each new component.

---

## Key Learnings (encoded as gate checks — not just prose)

These are the hard-won lessons from building DTF. Each one is already a check in `gate-check.cjs`. Listed here for human recall only.

| # | Learning | Gate where enforced |
|---|---------|-------------------|
| 1 | `--x: var(--x)` = CSS cycle → computes empty. Never. | G2 |
| 2 | `var()` resolves at declaring element, not use site. Tokens on `:root` can't re-resolve per-element overrides. | G2, G3 |
| 3 | `white` in tokens must be `var(--color-fixed-white)` — theme immune. | G2 |
| 4 | on-component text AA must be tested across default + hover + pressed fills, not just default. | G2 |
| 5 | Unitless `0` in custom properties feeding `calc()` = invalid. Use `0px`. | G2, G3 |
| 6 | Negative `outline-offset` = inside ring. All focus rings must use positive offset. | G3 |
| 7 | Composite components (split-button): focus ring on wrapper via `:has(:focus-visible)`, not inner zones — parent `overflow:hidden` clips inner rings. | G3 |
| 8 | `[hidden]` attribute loses to author `display:flex`. Pair with `[hidden]{display:none !important}`. | G3 |
| 9 | `translateY(-50%)` centering conflicts with hover/active scale transforms. Use `margin-block:auto` instead. | G3 |
| 10 | Global `[data-tip]::before{content:none}` suppressor kills new `::before` decorations on tipped elements. | G3 |
| 11 | `file://` iframes block `contentDocument` in Chrome (even with sandbox allow-same-origin). Use postMessage. | Figma/sync |
| 12 | `Math.random()` in demos causes Playwright flake. `new Date()` causes baseline drift — use visual-snapshot guard. | G4 |
| 13 | Figma variables: NEVER delete+recreate — severs all component bindings permanently. Update in place. | G6 |
| 14 | Height ladder must be consistent across ALL interactive components at the same size. | G5 |
| 15 | Palette anchor must be `'exact'` — default `'normalized'` means user's picked color ≠ what ships. | Token system |

---

## Draft Docs (need review — may be current, may be outdated)

Run `pnpm audit:docs` to see the full list. 30 docs are currently in draft status.
Priority ones to review and promote to `current` or `superseded`:
- `docs/FLOW.md`
- `docs/getting-started.md`
- `docs/components/demo-page-blueprint.md`
- `docs/tokens/typography.md`
- `docs/tokens/color-generator-plan.md`

---

## Process: How to add a new learning

1. Discover the rule through a session (pain, bug, rework)
2. Add it as a **check in `scripts/gate-check.cjs`** at the appropriate gate
3. Add a row to the Key Learnings table above (this file)
4. If it retroactively applies to existing components — run `pnpm gate:status` and note which components are now failing that gate

Do NOT create a new MD file for a new learning. Encode it. The script enforces it.
