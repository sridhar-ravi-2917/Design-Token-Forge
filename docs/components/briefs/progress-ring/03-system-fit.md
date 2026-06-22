<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Ring — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--{role}-component-bg-default` | T1 semantic | Arc (fill) color per role |
| `--{role}-container-bg` | T1 semantic | Soft track bg |
| `--font-size-{N}` | global | Centered label font per size |
| `--spacing-{N}` | global | Gap between ring and external label |

---

## 2. Height ladder participation

- (n/a) Progress ring does NOT participate in the cross-component interactive height ladder
- [x] Progress ring uses its own 10-step diameter ladder (16px–96px)

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Spinner | Spinner = no-value loading indicator. Ring = determinate/indeterminate progress. Same role system. |
| Progress bar | Same role color system, variant names, and ARIA pattern. Ring = circular, bar = linear. |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Role | `role="progressbar"` | HTML |
| Value | `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` | HTML |
| Indeterminate | `aria-valuenow` removed | JS contract |
| Label | `aria-label` or `aria-labelledby` on wrapper | Markup contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in interactive height ladder noted
- [x] Own 10-step diameter ladder noted
- [x] Spinner/bar sibling contracts noted
- [x] a11y ARIA progressbar contracts documented
