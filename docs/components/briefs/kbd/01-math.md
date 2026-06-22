<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# KBD — Mathematical Contracts

> Values sourced from kbd.tokens.css. KBD uses its own height/padding ladder, NOT the button/input height ladder (KBD heights are much smaller — these are inline annotations, not controls).

---

## 1. Height and padding ladder

| Size   | Height (min) | Padding-x | Padding-y | Radius |
|--------|------------:|---------:|----------:|--------|
| micro  | 16px         | 3px      | 1px       | radius-xs |
| tiny   | 18px         | 4px      | 1px       | radius-xs |
| small  | 20px         | 5px      | 2px       | radius-sm |
| base   | 22px         | 6px      | 2px       | radius-sm |
| medium | 24px         | 7px      | 3px       | radius-sm-md |
| large  | 26px         | 8px      | 3px       | radius-md |
| big    | 28px         | 9px      | 4px       | radius-md |
| huge   | 32px         | 10px     | 4px       | radius-md-lg |
| mega   | 36px         | 12px     | 5px       | radius-lg |
| ultra  | 40px         | 14px     | 6px       | radius-lg |

---

## 2. Ratio contracts

### Height : Font-size ratio
KBD heights are calibrated to be slightly taller than their font size to give breathing room:
- `base` (22px min-height) at ~12–13px font-size → ratio ≈ 1.7–1.8×

### Padding-inline ratio
```
padding-x(size) / height(size) ≈ 0.18–0.27
```
Tighter than buttons — key caps are compact annotations, not call-to-action elements.

### Min-width contract
```
min-width(size) = height(size)
```
Ensures square minimum for single-character keys.

### Derived value table
Shown in the height/padding table above.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder from source documented
- [x] Padding-x ladder from source documented
- [x] Non-participation in button/input height ladder noted
- [x] Height:font-size ratio computed
- [x] Padding-inline ratio computed
- [x] Min-width = height contract documented
- [x] Derived value table complete
