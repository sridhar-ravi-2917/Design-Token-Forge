<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Textarea — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

Same as Input. Additional: `--textarea-min-height-{size}`, `--textarea-resize`.

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-color` | global | Focus border color |
| `--focus-ring-color-invalid` | global | Invalid focus color |
| `--disabled-opacity` | global | Disabled opacity |
| `--motion-duration-fast` | global | Border-color transition |
| `--color-brand-500` | T1 | Focus border |
| `--color-danger-500` | T1 | Invalid border |

---

## 2. Height ladder participation

- (n/a) Textarea does NOT participate in the fixed-height ladder — it is multi-line
- [x] Font-size and padding tokens MUST match Input at same size for visual consistency

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Input | Font-size at same density, padding-x at same density |
| Select | Font-size at same density |

---

## 4. Token naming

- Prefix: `--textarea-` (public) / `--_ta-` (internal)
- Same state/variant pattern as input

---

## 5. a11y contracts

Same as Input. Additionally:
- `resize: vertical` by default (not `none` — disabling resize is a usability failure).
- No `rows` attribute default in component — consumer sets meaningful row count.

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder explicitly N/A — font/padding must still match input
- [x] Resize: vertical documented as default
- [x] WCAG AA contracts listed (same as input)
