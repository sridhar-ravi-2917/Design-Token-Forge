<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Bar — Density Math

---

## Derived value table

| Size | Track height | Label font-size | Gap |
|------|------------:|----------------:|----:|
| micro | 2px | 10px | 2px |
| tiny | 3px | 11px | 3px |
| small | 4px | 10px | 4px |
| base | 6px | 12px | 6px |
| medium | 8px | 13px | 6px |
| large | 10px | 14px | 8px |
| big | 12px | 14px | 10px |
| huge | 16px | 18px | 12px |
| mega | 20px | 20px | 14px |
| ultra | 24px | 20px | 16px |

---

## Height:Font-size ratio

- (n/a) Track height and label font-size are decoupled — track height is purely visual, label font-size is readability-driven.

---

## Padding-inline ratio

- (n/a) Progress bar track has no padding-x — fill and buffer extend edge-to-edge.

---

## Track height progression

- micro→ultra: 2px → 3px → 4px → 6px → 8px → 10px → 12px → 16px → 20px → 24px
- Ratio each step ≈ 1.3–1.5×; compressed at top end to avoid overly chunky bars.
- `micro` (2px) is thin enough for loading indicators embedded in headers.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present (all 10 sizes)
- [x] Height:Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted (track is edge-to-edge)
- [x] Track height progression documented
