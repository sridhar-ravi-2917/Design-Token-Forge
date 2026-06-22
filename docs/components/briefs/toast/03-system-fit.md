<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Toast — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--{role}-container-bg` | T1 semantic | Soft/outlined bg |
| `--{role}-component-bg-default` | T1 semantic | Filled bg |
| `--{role}-on-component` | T1 semantic | Filled fg |
| `--radius-lg` | global | Corner radius |
| `--font-size-13/14/16` | global | Font per size |
| `--spacing-{N}` | global | Padding and gap values |

---

## 2. Height ladder participation

- (n/a) Toast does NOT participate in the cross-component height ladder
- [x] Toast uses only 3 sizes (small/base/large)
- [x] Toast height is content-driven; no fixed height tokens

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Alert | Alert is persistent inline; Toast is ephemeral overlay. Same role color system and icon set. |
| Portal / overlay | Toast is always rendered in a portal container, outside the component tree. Z-index managed by portal. |
| Button (action) | `.toast__action` button uses `small` size when inside `base` toast. |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Live region | `role="status"` (polite) or `role="alert"` (assertive) | HTML |
| Icon | `aria-hidden="true"` — role communicated by text | Markup contract |
| Close button | `aria-label="Dismiss"` | Markup contract |
| Auto-dismiss | Timer ≥ 4 s. Paused on hover/focus. | JS contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Alert sibling contract documented
- [x] a11y ARIA contracts documented
- [x] Auto-dismiss pause contract documented
