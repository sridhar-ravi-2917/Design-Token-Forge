<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Icon Button — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

Same set as Button plus: `--icon-btn-height-{size}` must equal `--btn-height-{size}`.

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-width` | global | Focus ring width |
| `--focus-ring-offset` | global | Focus ring offset |
| `--disabled-opacity` | global | Disabled opacity |
| `--motion-duration-fast` | global | Bg transition |
| `--color-brand-500` | T1 | Filled primary background |

---

## 2. Height ladder participation

- [x] This component is interactive and MUST match the cross-component height ladder
- (n/a) Display-only path does not apply

---

## 3. Sibling components that must visually align

| Sibling | What must align |
|---------|----------------|
| Button | Height at same size — must sit flush in same toolbar row |
| Split-button | Height at same size |
| Menu-button | Height at same size |

---

## 4. Token naming consistency

- Prefix: `--icon-btn-` (public) / `--_ibtn-` (internal)
- Same variant/role switching pattern as button

---

## 5. What this component must NOT break

| If this changes | Affected |
|----------------|---------|
| `--btn-height-{size}` (source) | icon-button heights must be updated to match |
| `--color-brand-*` | icon-button filled variant |

---

## 6. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Accessible name | `aria-label` required | Markup contract — cannot be CSS-enforced |
| Min tap target | 44×44px | `min-height` on root |
| Focus visible | 2px ring | `:focus-visible` |
| Tooltip | Strongly recommended | External composition |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared
- [x] Sibling alignment requirements listed
- [x] `aria-label` markup contract explicitly documented
- [x] WCAG AA contracts listed
