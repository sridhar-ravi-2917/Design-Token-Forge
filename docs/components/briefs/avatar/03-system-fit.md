<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Avatar — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--spacing-{N}` | global | Avatar size values |
| `--radius-full` | global | Circle shape default |
| `--radius-lg` | global | Rounded-square variant |
| `--surface-base-cm-bg` | T1 semantic | Neutral initials background |
| `--brand-container-bg` etc. | T1 semantic | Role-colored initials bg |
| `--shadow-none` | global | Default (no shadow) |
| `--shadow-sm` | global | Strong presence mode |

---

## 2. Height ladder participation

- (n/a) Avatar does NOT participate in the cross-component height ladder (not a form control)
- [x] Avatar uses its own square size system: `--avatar-size-{size}` from spacing scale

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Button (large) | Avatar `large` (40px) = Button `large` height (44px) — close enough for inline placement |
| Skeleton circle | Skeleton `circle` at matching size must match avatar dimensions exactly |
| Spinner | Both are circular at matching sizes — use same size steps for loading placeholder |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Alt text | `alt="Person Name"` on `<img>` | Markup contract |
| Initials fallback | `aria-label` on wrapper | JS consumer |
| Interactive | `role="button"` + `tabindex="0"` | JS consumer |
| Focus ring | `--focus-ring-*` tokens | CSS on `[data-interactive]:focus-visible` |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Non-participation in height ladder noted
- [x] Skeleton + spinner sibling contract documented
- [x] a11y contracts for all content modes documented
