<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Tooltip — Density Math

---

## Derived value table

| Property | small | base | large |
|----------|------:|-----:|------:|
| padding-y | 4px | 6px | 8px |
| padding-x | 8px | 10px | 14px |
| font-size | 11px | 12px | 14px |
| icon size | 14px | 16px | 18px |
| max-width | 180px | 240px | 320px |
| gap (icon→text) | 4px | 6px | 8px |
| offset from trigger | 8px | 8px | 8px |
| arrow size | 6px | 6px | 6px |

---

## Height:Font-size ratio

- (n/a) Tooltip height is always content-driven; no fixed height tokens.

---

## Padding-inline ratio

| Size | padding-x / font-size |
|------|-----------------------|
| small | 8/11 = 0.73 |
| base  | 10/12 = 0.83 |
| large | 14/14 = 1.00 |

---

## Arrow dimensions

- Arrow size: fixed `6px` across all density sizes — arrow is a visual anchor, not a density function.
- Arrow offset: `12px` — keeps caret aligned when trigger is narrow.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present
- [x] Height:Font-size ratio — N/A noted
- [x] Padding-inline ratio computed
- [x] Arrow dimensions documented
