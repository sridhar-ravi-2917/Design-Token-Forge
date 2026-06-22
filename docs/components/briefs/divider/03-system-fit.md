<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Divider — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--color-border` | T1 semantic | Default line color |
| `--color-border-strong` | T1 semantic | Strong variant |
| `--color-border-subtle` | T1 semantic | Subtle variant |
| `--font-size-xs` | global | Label font size |
| `--font-weight-medium` | global | Label weight |
| `--color-text-muted` | T1 semantic | Label text color |
| `--spacing-{N}` | global | Spacing/margin values |

---

## 2. Height ladder participation

- (n/a) Divider does NOT participate in the cross-component height ladder
- [x] Divider uses its own block-spacing system (`--div-spacing-{size}`) for margin above/below

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Card | Divider inside `.card__body` should use `--div-spacing-{size}` matching the card's density. A `base` card → `base` divider spacing |
| List items | Divider between list items uses `tiny` or `small` spacing — never same spacing as section dividers |
| Navigation | Section dividers in nav use `base` spacing minimum |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Semantic | `<hr>` for content separation | HTML |
| Visual-only | `role="separator"` or `aria-hidden="true"` on `<div>` | Markup contract |
| Label | Label text is visible text, not aria-label | HTML (accessible by default) |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Context-appropriate sizing guidance documented
- [x] a11y semantic element contract documented
