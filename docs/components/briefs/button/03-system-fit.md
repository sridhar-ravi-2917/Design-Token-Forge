<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Button — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-width` | global | Focus ring width |
| `--focus-ring-offset` | global | Focus ring offset |
| `--focus-ring-color` | global | Focus ring color |
| `--disabled-opacity` | global | Disabled state opacity |
| `--motion-duration-fast` | global | Hover/pressed bg transition |
| `--motion-easing-standard` | global | Transition easing |
| `--color-brand-500` | T1 | Filled primary background |
| `--font-weight-medium` | global | Label font weight |

---

## 2. Height ladder participation

- [x] This component IS the height ladder source of truth
- (n/a) All other interactive components must match `--btn-height-{size}`

---

## 3. Sibling components that must visually align

| Sibling | What must align | How verified |
|---------|----------------|-------------|
| Input | Height at same size | `--input-height-{size}` = `--btn-height-{size}` |
| Select | Height at same size | Same |
| Icon-button | Height at same size | `--icon-btn-height-{size}` = `--btn-height-{size}` |
| Split-button | Height at same size | `--split-btn-height-{size}` = `--btn-height-{size}` |

---

## 4. Token naming consistency

- Prefix: `--btn-` (public) / `--_btn-` (internal switching vars)
- Role overrides: `[data-role="danger"] { --btn-bg: var(--color-danger-500) }` etc.
- Variant switching: `[data-variant="outlined"]` sets `--_btn-bg`, `--_btn-border`, `--_btn-color`

---

## 5. What this component must NOT break in others

| If this changes | Components affected |
|----------------|-------------------|
| `--btn-height-{size}` | All input-family, icon-button, split-button, menu-button |
| `--color-brand-500` | Button filled, badge, alert, toggle |
| `--focus-ring-*` | All interactive components |

---

## 6. a11y contracts (WCAG 2.1 AA minimum)

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target | 44×44px | `min-height: 44px` at micro–medium |
| Focus visible | 2px ring, 2px offset | `:focus-visible` |
| Role | `<button>` native | No extra ARIA needed |
| Disabled | `disabled` attribute | CSS `[disabled]` hook |
| Loading | `aria-busy="true"` | JS consumer |
| Contrast text | 4.5:1 | on-component auto-AA |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared (IS the source of truth)
- [x] Sibling alignment requirements listed
- [x] Token naming conventions verified
- [x] Primitive-change blast radius documented
- [x] WCAG AA contracts listed with enforcement method
