<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Tooltip — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--surface-base-ct-default` | T1 semantic | Default (dark) bg |
| `--surface-base-cn-bg` | T1 semantic | Default (dark) text; Light bg |
| `--{role}-component-bg-default` | T1 semantic | Semantic variant bgs |
| `--{role}-on-component` | T1 semantic | Semantic variant text |
| `--radius-sm` | global | Corner radius |
| `--shadow-sm / --shadow-md` | global | Drop shadow |
| `--spacing-{N}` | global | Padding, gap, offset |

---

## 2. Height ladder participation

- (n/a) Tooltip does NOT participate in the cross-component height ladder
- [x] Tooltip uses 3 density sizes (small/base/large); height is content-driven

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Popover | Tooltip is non-interactive with `pointer-events:none`. Popover is interactive (can contain buttons/links). |
| Validation message | Tooltip `data-variant="danger"` mirrors validation error bg. |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Role | `role="tooltip"` | HTML |
| Link to trigger | `aria-describedby="{tooltip-id}"` on trigger | Markup contract |
| Hidden state | `aria-hidden="true"` when not visible | JS contract |
| Reduced motion | Enter animation suppressed | `@media (prefers-reduced-motion: reduce)` in CSS |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Popover sibling contract documented
- [x] a11y ARIA contracts documented
