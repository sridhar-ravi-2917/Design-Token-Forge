<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Alert — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--{role}-container-bg` | T1 semantic | Soft/outlined bg |
| `--{role}-content-default` | T1 semantic | Body text color |
| `--{role}-component-bg-default` | T1 semantic | Filled bg |
| `--radius-md` | global | Alert corner radius |
| `--font-size-13/14/16` | global | Font per size |
| `--spacing-{N}` | global | Padding and gap values |

---

## 2. Height ladder participation

- (n/a) Alert does NOT participate in the cross-component height ladder
- [x] Alert uses only 3 sizes (small/base/large) — not the 10-step density ladder
- [x] Alert height is always content-driven; no fixed height tokens

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Toast | Alert is persistent inline; Toast is ephemeral overlay. Both use the same role color system and icon set. |
| Button (in alert footer) | Action buttons inside alert use `small` size to match `base` alert padding |
| Icon | Alert icon size matches text size: `base` alert → 20px icon ≈ `--spacing-20` |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Live region | `role="alert"` (assertive) or `role="status"` (polite) | HTML |
| Icon | `aria-hidden="true"` on icon — label is in body text | Markup contract |
| Close button | `aria-label="Dismiss"` | Markup contract |
| Color alone | Icon + color required — not color-only | Design contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] 3-size limitation noted
- [x] Toast sibling contract documented
- [x] a11y ARIA live region contracts documented
