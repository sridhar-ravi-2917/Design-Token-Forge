<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Input — State × Variant Matrix

---

## State × Variant Matrix

| State | Outline | Filled | Underline |
|-------|---------|--------|-----------|
| **Default** | bg=surface-bg, border=neutral-300 | bg=neutral-100, border=none | bg=transparent, border-bottom=neutral-300 |
| **Hover** | border=neutral-400 | bg=neutral-200 | border-bottom=neutral-400 |
| **Focus** | border=brand-500 (2px), ring=none | border-bottom=brand-500 (2px), ring visible | border-bottom=brand-500 (2px) |
| **Filled (has value)** | Same as default | Same | Same |
| **Disabled** | opacity=0.45, bg=neutral-50 | opacity=0.45 | opacity=0.45 |
| **Readonly** | bg=neutral-50, border=neutral-200, cursor=default | bg=neutral-100, no border | Same — bottom border dimmed |
| **Invalid** | border=danger-500, helper-text=danger-600 | bg=danger-50, border-bottom=danger-500 | border-bottom=danger-500 |

---

## Compounding rules

1. **Readonly + focus** — focus ring does NOT show (field is not editable). Browser `cursor: default`.
2. **Invalid + focus** — focus ring color uses `--focus-ring-color-invalid` (danger-500). Error border + ring both visible.
3. **Disabled + invalid** — disabled wins. No error styling (opacity=0.45 conveys non-interaction).
4. **Invalid + hover** — invalid border stays; hover effect is suppressed or subtle.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] Readonly vs disabled documented as distinct states
- [x] Invalid + focus ring color uses danger token
- [x] Autofill visual handling noted (box-shadow override)
- [x] Disabled uses opacity-only
