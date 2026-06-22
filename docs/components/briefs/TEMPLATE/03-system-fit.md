<!-- status: draft -->
<!-- last-verified: 2026-06-18 -->

# {ComponentName} — System Fit & Cross-Component Contracts

> Gate 0 file. Defines what this component BORROWS from the global system
> and what it MUST stay consistent with across sibling components.
> Breaking these = silent regressions in already-shipped components.

---

## 1. Token inheritance

<!-- What global tokens does this component consume directly?
     These must NOT be overridden per-component — they are system contracts. -->

| Token | Source | This component uses it for |
|-------|--------|---------------------------|
| `--focus-ring-width` | global | focus ring width |
| `--focus-ring-offset` | global | focus ring offset |
| `--focus-ring-color` | global | focus ring color |
| `--disabled-opacity` | global | disabled state opacity |
| `--motion-duration-fast` | global | color/bg transitions |
| `--motion-duration-base` | global | layout/size transitions |
| `--motion-easing-standard` | global | transition easing |
| Custom: | | |

---

## 2. Height ladder participation

<!-- Does this component participate in the cross-component height ladder?
     Interactive components (those that sit in form rows) MUST.
     Display-only components (badge, tooltip, divider) do not. -->

- [ ] This component is interactive and MUST match the cross-component height ladder
- [ ] This component is display-only and has its own height logic

If interactive: verify heights match in `01-math.md` derived value table.

---

## 3. Sibling components that must visually align

<!-- When this component appears next to these siblings in a real layout,
     they must feel proportionally consistent. List what must align. -->

| Sibling | What must align | How verified |
|---------|----------------|-------------|
| Button  | height at same size | height ladder |
| Input   | height at same size | height ladder |
| Select  | height at same size | height ladder |
| Custom: | | |

---

## 4. Token naming consistency

<!-- Verify these naming patterns are followed. Inconsistency = sync server breaks. -->

- Prefix used: `--{prefix}-`
- Internal switching vars: `--_{prefix}-` (double dash, underscore, prefix)
- Size variants: `--{prefix}-{property}-{size}` (e.g. `--btn-height-base`)
- State variants: encoded via `--_` internal vars, NOT via direct state selectors on public tokens
- Role overrides: `--{prefix}-bg`, `--{prefix}-color`, `--{prefix}-border` overrideable
- `-default` suffix rule: used ONLY when the property naturally has a "default" option (e.g. `data-size="base"` default)

---

## 5. What this component must NOT break in others

<!-- When this component's tokens change, what might regress in sibling components?
     Shared primitives (spacing, radius, color steps) that this component aliases
     — if those primitives move, these components are affected. -->

| If this primitive changes | Components affected | Regression test needed |
|--------------------------|-------------------|----------------------|
| `--spacing-{n}` | button, input, select, ... | height ladder check |
| `--radius-{size}` | button, card, badge, ... | visual snapshot |
| `--color-brand-{step}` | button, badge, alert, ... | contrast audit |
| Custom: | | |

---

## 6. a11y contracts (WCAG 2.1 AA minimum)

<!-- Define the a11y requirements for this component before building. -->

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target (WCAG 2.5.5) | 44×44px at base+ | `min-height` in CSS |
| Focus visible (WCAG 2.4.7) | 2px ring, 3:1 contrast | `:focus-visible` ring |
| Contrast — text on bg | 4.5:1 minimum | on-component token derivation |
| Contrast — large text | 3:1 minimum | spec + auto-AA |
| Disabled state | Exempt from contrast (WCAG 1.4.3) | opacity only |
| Role attribute | `role="{x}"` needed? | yes / no |
| Required ARIA | list them | |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [ ] All global token contracts listed
- [ ] Height ladder participation declared (yes/no)
- [ ] Sibling alignment requirements listed
- [ ] Token naming conventions verified
- [ ] Primitive-change blast radius documented
- [ ] WCAG AA contracts listed with enforcement method
