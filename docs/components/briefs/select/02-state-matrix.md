<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Select — State × Variant Matrix

---

## State × Variant Matrix

| State | Outline | Filled |
|-------|---------|--------|
| **Default** | Same as Input outline | Same as Input filled |
| **Hover** | border=neutral-400 | bg=neutral-200 |
| **Focus / Open** | border=brand-500 (2px) | border=brand-500 |
| **Disabled** | opacity=0.45 | opacity=0.45 |
| **Readonly** | bg=neutral-50 | bg=neutral-100 dimmed |
| **Invalid** | border=danger-500 | bg=danger-50, border=danger-500 |

Chevron rotation:
- `aria-expanded="false"` → chevron points down (0deg)
- `aria-expanded="true"` → chevron rotates 180deg

---

## Compounding rules

Same as Input — see input/02-state-matrix.md.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] Chevron rotation on open documented
- [x] Readonly vs disabled distinct
- [x] Invalid uses danger token
- [x] Disabled uses opacity-only
