<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Skeleton — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--surface-base-outline` | T1 semantic | Base skeleton bg |
| `--radius-sm` / `--radius-md` / `--radius-full` | global | Shape per variant |
| `--motion-duration-slow` | global | Shimmer animation duration |
| `--motion-easing-linear` | global | Shimmer sweep easing |

---

## 2. Height ladder participation

- (n/a) Skeleton does NOT participate in the cross-component height ladder
- [x] Skeleton uses its own per-variant size systems (`--skel-height-{size}`, `--skel-circle-size-{size}`)

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Avatar | `skeleton[data-variant="circle"][data-size="base"]` (32px) must match `avatar[data-size="base"]` (32px) — used as avatar loading placeholder |
| Typography | `skeleton[data-variant="text"]` height per size is calibrated against actual text line heights in the typography system |
| Card | Skeleton blocks are composed inside a card-shaped container to create a card loading state |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Role | `role="status"` or `aria-hidden="true"` | Markup contract (either hide or announce) |
| Label | `aria-label="Loading..."` if `role="status"` | Markup contract |
| Animation | `@media (prefers-reduced-motion: reduce)` stops shimmer | CSS |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Avatar + typography sibling alignment documented
- [x] a11y role contract documented
- [x] Reduced motion contract documented
