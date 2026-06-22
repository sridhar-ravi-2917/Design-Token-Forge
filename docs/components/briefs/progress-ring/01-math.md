<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Ring — Density Math

---

## Derived value table

| Size | Diameter | Stroke width | Gap | Font-size (label) | Stroke/Diameter ratio |
|------|--------:|------------:|----:|------------------:|---------------------:|
| micro | 16px | 2px | 2px | 10px | 12.5% |
| tiny | 20px | 2.5px | 3px | 11px | 12.5% |
| small | 24px | 3px | 4px | 12px | 12.5% |
| base | 32px | 3.5px | 6px | 12px | 10.9% |
| medium | 40px | 4px | 6px | 13px | 10.0% |
| large | 48px | 4.5px | 8px | 14px | 9.4% |
| big | 56px | 5px | 10px | 16px | 8.9% |
| huge | 64px | 5.5px | 12px | 18px | 8.6% |
| mega | 80px | 6px | 14px | 20px | 7.5% |
| ultra | 96px | 7px | 16px | 24px | 7.3% |

---

## Height:Font-size ratio

- (n/a) Ring diameter and label font-size are decoupled — label is optional. Outer size is a diameter, not a text-bearing height.

---

## Padding-inline ratio

- (n/a) Progress ring is a circular SVG component — no padding-x.

---

## Stroke width progression

- Stroke/diameter ratio stays ~8–12% across sizes — maintains visual consistency.
- Strokes use `round` linecap; adds ~stroke-width to perceived arc end lengths.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present (all 10 sizes)
- [x] Height:Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted
- [x] Stroke/diameter ratio progression documented
