<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Select — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

Same as Input. No additional tokens beyond the chevron-size tokens.

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-color` | global | Focus border |
| `--focus-ring-color-invalid` | global | Invalid focus |
| `--disabled-opacity` | global | Disabled |
| `--color-brand-500` | T1 | Focus border |
| `--color-danger-500` | T1 | Invalid border |

---

## 2. Height ladder participation

- [x] MUST match the cross-component height ladder (`--select-height-{size}` = `--btn-height-{size}` = `--input-height-{size}`)
- (n/a) Display-only path does not apply

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Input | Height, font-size, padding, radius at same size — must be visually identical |
| Button | Height at same size |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Label | `<label for>` or `aria-label` | Markup contract |
| Invalid | `aria-invalid="true"` | JS consumer |
| Open/closed | `aria-expanded` on custom trigger | JS consumer |
| Options | `<option>` elements or `role="option"` in custom listbox | Markup contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared — same values as input
- [x] Visual parity with input documented as explicit contract
- [x] WCAG AA contracts listed
