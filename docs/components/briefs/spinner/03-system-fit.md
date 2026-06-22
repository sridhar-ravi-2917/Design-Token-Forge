<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Spinner — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--color-brand-500` | T1 | Default arc color |
| `--radius-full` | global | Ring shape |
| `--spin-duration` | component | Animation duration |
| `--motion-duration-normal` | global | Default spin speed source |
| `--motion-easing-linear` | global | Spin easing |

---

## 2. Height ladder participation

- (n/a) Spinner does NOT participate in the cross-component height ladder
- [x] Spinner uses its own circular size system: `--spin-size-{size}` (diameter)
- [x] Spinner sizes are designed to be matched against button heights when used inline:
  - Button `base` (36px) → use `spinner` `medium` (24px) — leaves comfortable padding
  - Button `large` (44px) → use `spinner` `big` (32px)

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Button | When spinner replaces button label, use spinner 1 size smaller than button size |
| Avatar | Both circular — spinner `base` (20px) ≈ avatar `micro` (20px). Useful for avatar loading state |
| Skeleton | Skeleton circle variant is the "before" state; spinner is the "during" state |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Role | `role="status"` | HTML on `.spinner` |
| Label | `aria-label="Loading"` or `<span class="sr-only">Loading</span>` | Markup contract |
| Reduced motion | `@media (prefers-reduced-motion)` pauses animation | CSS |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Inline-with-button sizing guidance documented
- [x] a11y contracts documented
- [x] Reduced motion contract documented
