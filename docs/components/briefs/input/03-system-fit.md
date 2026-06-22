<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Input — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-color` | global | Focus border color (not outline — inner border thickens) |
| `--focus-ring-color-invalid` | global | Invalid focus color |
| `--disabled-opacity` | global | Disabled opacity |
| `--motion-duration-fast` | global | Border-color transition |
| `--color-brand-500` | T1 | Focus border color |
| `--color-danger-500` | T1 | Invalid border color |

---

## 2. Height ladder participation

- [x] This component MUST match the cross-component height ladder (`--input-height-{size}` = `--btn-height-{size}`)
- (n/a) Display-only path does not apply

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Button | Height at same size — inline form rows |
| Select | Height at same size |
| Textarea | Uses its own height (multi-line) — but inline variant must match |

---

## 4. Token naming

- Prefix: `--input-` (public) / `--_inp-` (internal)
- Variant switching: `[data-variant="filled"]`, `[data-variant="underline"]`
- State: `:focus-within`, `[data-invalid]`, `[data-disabled]`, `[data-readonly]`

---

## 5. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Label required | `<label>` or `aria-label` | Markup contract |
| Focus visible | Border thickens to 2px on focus | `:focus-within` on wrapper |
| Invalid | `aria-invalid="true"` on `<input>` | JS consumer |
| Helper text | `aria-describedby` linking to helper | Markup contract |
| Readonly | `readonly` attribute | Native |
| Placeholder | NOT substitute for label | Documentation |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared
- [x] Label/aria-label markup contract documented
- [x] Invalid vs disabled distinction documented
- [x] WCAG AA contracts listed
