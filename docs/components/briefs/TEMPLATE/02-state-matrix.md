<!-- status: draft -->
<!-- last-verified: 2026-06-18 -->

# {ComponentName} — State × Variant Matrix

> Gate 0 file. This ENTIRE table must be filled before CSS is written.
> Every empty cell = a design decision that will be discovered during coding = rework.
> "same as default" and "n/a" are valid answers. Blank is not.

---

## Instructions

For each (state, variant) cell, describe the VISUAL DIFFERENCE from the default filled-primary state.
Be specific: "bg becomes brand-600" not "darker". Use step names from the token ladder.

Notation:
- `bg=step-N` — background changes to palette step N
- `+ring` — focus ring added (always 2px solid, 2px offset)
- `opacity=X` — opacity applied to whole component
- `border=step-N` — border color changes
- `icon/label=step-N` — foreground changes
- `same` — no visual change from previous column
- `n/a` — this combination is not valid / does not exist

---

## Variant axis definitions

<!-- First: define exactly what variants exist and what makes them visually different.
     This forces the decision BEFORE the state matrix. -->

| Variant | Surface treatment | Border | Background | Text/Icon |
|---------|-----------------|--------|-----------|-----------|
|         |                 |        |           |           |

---

## State × Variant Matrix

<!-- Rows = states, Columns = variants
     Add/remove columns to match the component's actual variants -->

| State          | filled-primary | filled-danger | filled-success | outlined-primary | outlined-danger | ghost | neutral |
|----------------|---------------|---------------|----------------|-----------------|-----------------|-------|---------|
| **default**    |               |               |                |                 |                 |       |         |
| **hover**      |               |               |                |                 |                 |       |         |
| **pressed**    |               |               |                |                 |                 |       |         |
| **focus-vis.** |               |               |                |                 |                 |       |         |
| **disabled**   |               |               |                |                 |                 |       |         |
| **loading**    |               |               |                |                 |                 |       |         |
| **error**      |               |               |                |                 |                 |       |         |
| **selected**   |               |               |                |                 |                 |       |         |

---

## State compounding rules

<!-- What happens when two states apply at once? -->

| Combination | Visual result | CSS selector pattern |
|------------|--------------|----------------------|
| disabled + hover | Hover has NO effect — disabled wins | `:disabled` checked first |
| disabled + focus | Focus ring still shows (keyboard a11y) | Focus ring on wrapper, not input |
| loading + hover | Loading overrides hover visuals | `[data-loading]` checked first |
| selected + hover | Hover applies ON TOP of selected bg | Additive |
| error + focus | Both error border AND focus ring show | Additive |
| Custom:          |               |                       |

---

## Dark mode delta

<!-- Only list what CHANGES in dark mode. If a token alias auto-handles it, say "handled by token system". -->

| Variant | Light | Dark | Notes |
|---------|-------|------|-------|
|         |       |      |       |

---

## RTL delta

<!-- Only list what CHANGES in RTL. -->

| Element | LTR | RTL | Handled by |
|---------|-----|-----|-----------|
| Icon position | leading | trailing | `padding-inline-start/end` |
| Text align | | | |
| Custom:  | | | |

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [ ] All variants listed and visually differentiated
- [ ] All states have entries for ALL variants (no blank cells)
- [ ] Compounding rules defined for all realistic combinations
- [ ] Disabled + hover explicitly called out
- [ ] Dark mode delta documented (even if "handled by token system")
- [ ] RTL delta documented (even if "handled by logical properties")
- [ ] on-component text color AA-verified across default + hover + pressed fills (not just default)
