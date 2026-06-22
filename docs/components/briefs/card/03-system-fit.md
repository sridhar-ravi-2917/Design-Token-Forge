<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Card — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--surface-base-cm-bg` | T1 semantic | Card background |
| `--surface-base-outline` | T1 semantic | Outlined variant border |
| `--shadow-sm` / `--shadow-md` | global | Raised + hover shadow |
| `--radius-sm` … `--radius-2xl` | global | Border radius per size |
| `--color-brand-500` | T1 | Selected state border |
| `--spacing-{N}` | global | Padding values |
| `--disabled-opacity` | global | Disabled state |

---

## 2. Height ladder participation

- (n/a) Card does NOT participate in the cross-component height ladder
- [x] Card height is content-driven; no fixed height tokens

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Button | Buttons placed in `.card__footer` must use the card's density size — `base` card → `base` buttons |
| Avatar | `.card__header .avatar` must use the same size step: `base` card → `medium` or `large` avatar |
| Divider | Can be used between card zones; must not add extra margin that duplicates card zone spacing |
| Skeleton | Skeleton blocks must exactly match card zone dimensions for a loading card placeholder |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Interactive card | `<a>` stretch-link or `role="button"` | Markup contract |
| Selected | `aria-selected="true"` or `aria-pressed="true"` | JS consumer |
| Disabled | `aria-disabled="true"` | Markup contract |
| Heading hierarchy | `.card__title` must be correct heading level for document context | Consumer responsibility |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Child component density alignment contracts listed
- [x] a11y contracts documented
