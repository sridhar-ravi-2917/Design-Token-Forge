<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Alert — Mathematical Contracts

> Values from alert.tokens.css. Alert uses only 3 sizes (small/base/large), not the full 10-step density ladder.

---

## 1. Size ladder (3 sizes only)

| Size  | Padding-y | Padding-x | Font-size | Icon size | Gap  |
|-------|----------:|----------:|----------:|----------:|-----:|
| small | 10px      | 12px      | 13px      | 16px      | 8px  |
| base  | 14px      | 16px      | 14px      | 20px      | 12px |
| large | 18px      | 20px      | 16px      | 24px      | 16px |

---

## 2. Ratio contracts

### Padding-x : Font-size ratio
```
small: 12/13 ≈ 0.92  base: 16/14 ≈ 1.14  large: 20/16 = 1.25
```
Padding-x grows slightly relative to font-size — larger alerts feel more spacious.

### Height : Font-size ratio
N/A — alert height is content-driven (grows with text). No fixed height tokens.

### Padding-inline ratio
Same as `padding-x` values above.

### Derived value table
Shown in the size ladder table above.

---

## 3. Accent bar dimensions
```
--alert-accent-width: 4px (fixed, all sizes)
--alert-accent-radius: radius-full
```
The accent bar is a fixed 4px left-border regardless of size — a design constant, not density-relative.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Full 3-size ladder documented from tokens
- [x] Non-participation in 10-step height ladder noted
- [x] Padding ratios computed
- [x] Accent bar dimensions documented
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A (content-driven height)
- [x] Padding-inline ratio — documented
