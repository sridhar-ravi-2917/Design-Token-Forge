<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Tooltip — State × Variant Matrix

---

## State × Variant Matrix

| State | default (dark) | light | danger | warning | info | success |
|-------|---------------|-------|--------|---------|------|---------|
| **Hidden** | display:none / opacity:0 | same | same | same | same | same |
| **Visible** | dark bg, light text | light bg, dark text | danger role bg | warning role bg | info role bg | success role bg |
| **Entering** | opacity + scale transition | same | same | same | same | same |
| **Disabled** | opacity 0.5 | same | same | same | same | same |

---

## Compound rules

- Arrow color always matches the tooltip bg for the active variant.
- `data-placement="top|right|bottom|left"` controls arrow position — CSS rotates/positions the caret.
- `pointer-events: none` — tooltip never intercepts mouse events.
- `z-index: 1000` ensures tooltip sits above most page stacking contexts.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 6 variants documented (default, light, danger, warning, info, success)
- [x] Hidden and visible states documented
- [x] Enter animation state documented
- [x] Disabled state documented
- [x] Arrow compound rule documented
