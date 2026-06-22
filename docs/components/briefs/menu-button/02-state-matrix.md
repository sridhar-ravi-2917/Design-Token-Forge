<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Menu Button — State × Variant Matrix

---

## State × Variant Matrix

Single zone — state applies to the entire button including chevron.

| State | Filled | Outlined | Ghost |
|-------|--------|---------|-------|
| **Default** | Same as button | Same as button | Same as button |
| **Hover** | bg darkens 1 step | bg=role-50, border darkens | bg=role-50 |
| **Pressed** | bg darkens 2 steps | bg=role-100 | bg=role-100 |
| **Open (aria-expanded)** | bg=role-600 (pressed-equivalent) | bg=role-100 | bg=role-100 |
| **Focus-visible** | +2px ring on root `<button>` | +2px ring | +2px ring |
| **Disabled** | opacity=0.45 | opacity=0.45 | opacity=0.45 |
| **Loading** | spinner, no interaction | same | same |

---

## Compounding rules

1. **Open + hover** → open state bg wins (menu is open, hover is irrelevant).
2. **Disabled + open** → cannot be open and disabled simultaneously (JS prevents).
3. **Chevron rotation** — `transform: rotate(180deg)` on `[aria-expanded="true"]`. No JS class needed.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] "Open" state documented (aria-expanded = pressed-equivalent visual)
- [x] Chevron rotation documented as CSS transform, not JS class
- [x] Focus ring on single `<button>` — no overflow:hidden complication
- [x] Disabled uses opacity-only
