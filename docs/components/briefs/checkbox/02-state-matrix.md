<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Checkbox — State × Variant Matrix

> Gate 0 file — retroactively completed. Values confirmed against checkbox.css.

---

## State × Variant Matrix

Legend:
- `box-bg` = `.checkbox__box` background fill
- `box-border` = border color on `.checkbox__box`
- `check-color` = stroke color of the SVG check/dash icon

| State | Filled — Unchecked | Filled — Checked | Filled — Indeterminate | Outlined — Unchecked | Outlined — Checked | Outlined — Indeterminate |
|-------|--------------------|-----------------|----------------------|---------------------|-------------------|------------------------|
| **Default** | box-bg=white, border=neutral-300 | box-bg=brand-500, check=white, border=brand-500 | box-bg=brand-500, dash=white, border=brand-500 | box-bg=transparent, border=neutral-400 | box-bg=brand-100, check=brand-600, border=brand-500 | box-bg=brand-100, dash=brand-600, border=brand-500 |
| **Hover** | border=neutral-400, bg=neutral-50 | box-bg=brand-600, border=brand-600 | box-bg=brand-600, border=brand-600 | border=neutral-500 | box-bg=brand-200, border=brand-600 | box-bg=brand-200, border=brand-600 |
| **Pressed** | bg=neutral-100, border=neutral-500 | box-bg=brand-700, border=brand-700 | box-bg=brand-700, border=brand-700 | bg=neutral-50, border=neutral-600 | box-bg=brand-300, border=brand-700 | box-bg=brand-300, border=brand-700 |
| **Focus-visible** | +2px ring, 2px offset, brand-500 | +2px ring on top of checked state | +2px ring on top of indeterminate state | +2px ring, 2px offset, brand-500 | +2px ring | +2px ring |
| **Disabled** | opacity=0.45 on root `<label>` | opacity=0.45 | opacity=0.45 | opacity=0.45 | opacity=0.45 | opacity=0.45 |
| **Invalid** | border=danger-500, box-bg=danger-50 | border=danger-500, bg=danger-500, check=white | border=danger-500, bg=danger-500, dash=white | border=danger-500 | border=danger-500, bg=danger-100 | border=danger-500, bg=danger-100 |

---

## Compounding rules

When multiple states apply simultaneously:

1. **Disabled + any other state** → disabled (opacity=0.45) wins unconditionally. No hover, pressed, or focus effects. `pointer-events: none` on root.
2. **Invalid + hover** → invalid border color shifts one step darker on hover. Both invalid indicator AND hover interaction visible.
3. **Invalid + focus-visible** → focus ring uses `--focus-ring-color-invalid` (danger-500) instead of brand-500. The ring signals the error.
4. **Indeterminate + hover** → same hover rules as checked state (both share the `checked` visual treatment for hover/pressed).
5. **Checked + focus** → checked fill + focus ring simultaneously. Both visible.

---

## Visual change summary per state

| State | Primary change | Secondary change |
|-------|---------------|-----------------|
| hover | Border darkens 1 step; unchecked bg gets subtle tint | cursor=pointer |
| pressed | Box bg darkens further (checked: bg darker; unchecked: bg tint stronger) | no scale/transform |
| checked | Box fills brand-500; check SVG appears | border matches fill |
| indeterminate | Box fills brand-500; dash SVG appears; check SVG hides | border matches fill |
| focus-visible | 2px ring, brand-500 (or danger-500 if invalid) | ring on outer `<label>` via `:focus-within` or on hidden input with outline passed through |
| disabled | 0.45 opacity on entire `<label>` | no pointer events |
| invalid | Border turns danger-500; unchecked bg gets danger-50 tint | error-specific focus ring color |

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled — no blanks
- [x] Indeterminate state is distinct from checked (dash vs check icon)
- [x] Compounding rules defined for all multi-state cases
- [x] Invalid state documented — distinct from disabled and default
- [x] Focus ring: confirmed tied to global tokens; uses danger color when invalid
- [x] Disabled: confirmed uses opacity-only (WCAG 1.4.3 exempt)
