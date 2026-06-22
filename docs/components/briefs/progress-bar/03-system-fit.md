<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Bar — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--{role}-component-bg-default` | T1 semantic | Fill color per role |
| `--{role}-container-bg` | T1 semantic | Soft track bg |
| `--radius-full` | global | Pill shape (default per size) |
| `--shadow-none / --shadow-xs` | global | Track shadow options |
| `--font-size-{N}` | global | Label font per size |
| `--spacing-{N}` | global | Gap between track and label |

---

## 2. Height ladder participation

- (n/a) Progress-bar does NOT participate in the cross-component interactive height ladder
- [x] Progress-bar uses its own 10-step track height ladder (2px–24px) — this is a visual thickness ladder, not an interactive density ladder

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Spinner | Both communicate loading; spinner = unknown duration, progress-bar = known duration or indeterminate |
| Progress ring | Same role/variant system; ring is circular; bar is linear |

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
- [x] Own 10-step track height ladder documented
- [x] Spinner/ring sibling contracts noted
- [x] a11y ARIA progressbar contracts documented
