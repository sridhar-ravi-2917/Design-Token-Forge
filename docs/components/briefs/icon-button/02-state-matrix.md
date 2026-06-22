<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Icon Button — State × Variant Matrix

---

## State × Variant Matrix

Identical surface treatment to Button. States/variants are a subset (no label, always square).

| State | Filled | Outlined | Ghost |
|-------|--------|---------|-------|
| **Default** | bg=role-500, icon=on-component | bg=transparent, border=role-500, icon=role-500 | bg=transparent, icon=role-600 |
| **Hover** | bg=role-600 | bg=role-50, border=role-600 | bg=role-50 |
| **Pressed** | bg=role-700 | bg=role-100, border=role-700 | bg=role-100 |
| **Focus-visible** | +2px ring, 2px offset | +2px ring | +2px ring |
| **Disabled** | opacity=0.45 | opacity=0.45 | opacity=0.45 |
| **Loading** | spinner replaces icon | same | same |

---

## Compounding rules

Same as Button — see button/02-state-matrix.md. Role × variant matrix is orthogonal.

---

## Visual change summary per state

Identical to button. No label means no text-color changes.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] Compounding rules align with button (shared parent contract)
- [x] Focus ring tied to global tokens
- [x] Disabled uses opacity-only
- [x] No text-color state since no visible label
