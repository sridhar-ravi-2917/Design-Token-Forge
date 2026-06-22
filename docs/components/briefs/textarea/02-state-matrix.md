<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Textarea — State × Variant Matrix

---

## State × Variant Matrix

Same states as Input. Underline variant is excluded (not applicable for multi-line).

| State | Outline | Filled |
|-------|---------|--------|
| **Default** | bg=surface-bg, border=neutral-300 | bg=neutral-100 |
| **Hover** | border=neutral-400 | bg=neutral-200 |
| **Focus** | border=brand-500 (2px) | border=brand-500 (2px bottom + full) |
| **Disabled** | opacity=0.45 | opacity=0.45 |
| **Readonly** | bg=neutral-50, border=neutral-200 | bg=neutral-100, dimmed |
| **Invalid** | border=danger-500, helper=danger-600 | bg=danger-50, border=danger-500 |

---

## Compounding rules

Identical to Input — see input/02-state-matrix.md.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] Underline variant explicitly excluded with justification
- [x] Readonly vs disabled distinct
- [x] Invalid + focus ring uses danger token
- [x] Compounding rules reference Input (shared contract)
