<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Toast — Density Math

---

## Derived value table

| Property | small | base | large |
|----------|------:|-----:|------:|
| padding-y | 8px | 14px | 18px |
| padding-x | 12px | 16px | 20px |
| icon size | 16px | 20px | 24px |
| close size | 16px | 20px | 24px |
| gap (icon→content) | 8px | 12px | 14px |
| content gap (title→body) | 2px | 4px | 6px |
| font-size | 13px | 14px | 16px |
| accent bar width | 4px | 4px | 4px |

---

## Height:Font-size ratio

- (n/a) Toast height is always content-driven; no fixed height tokens.

---

## Padding-inline ratio

| Size | padding-x / font-size |
|------|-----------------------|
| small | 12/13 = 0.92 |
| base  | 16/14 = 1.14 |
| large | 20/16 = 1.25 |

---

## Accent bar dimensions

- Width is fixed at 4px across all sizes — visual accent, not a sizing function.
- Radius is `var(--radius-full)`.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present
- [x] Height:Font-size ratio — N/A noted (content-driven)
- [x] Padding-inline ratio computed
- [x] Accent bar dimensions documented
