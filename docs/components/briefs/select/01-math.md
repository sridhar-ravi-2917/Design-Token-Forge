<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Select — Mathematical Contracts

> Values confirmed against select.tokens.css. Height MUST match input and button.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

Identical to Input — select trigger must be the same height as input at matching size.

| Size   | Height | Font-size | Padding-x | Chevron-reserved-space | Border-radius |
|--------|-------:|----------:|----------:|-----------------------:|---------------|
| micro  | 24px   | 10px      | 6px       | 20px                   | radius-sm     |
| base   | 36px   | 13px      | 12px      | 28px                   | radius-DEFAULT|
| large  | 44px   | 14px      | 14px      | 32px                   | radius-md-lg  |
| ultra  | 72px   | 24px      | 20px      | 44px                   | radius-xl     |

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
Same as Input (`≈ 2.4–2.9×`).

### Padding-inline ratio
Same as Input.

### Chevron reserved trailing space
```
chevron-space(size) ≈ height(size) × 0.6–0.7
```
The `<input>` text must not flow under the chevron. `padding-inline-end` of the native `<select>` or custom trigger is set to `chevron-space`.

### Border width
```
outline variant: 1px all sides
filled variant: 0
```
Same as Input.

---

## 3. Derived value table

Same as Input with an extra `chevron-space` column. See table above.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height matches input source of truth exactly
- [x] Chevron-reserved trailing space formula documented
- [x] Padding-x same as input — confirmed
- [x] Border-radius same as input — confirmed
- [x] Derived value table complete
- [x] Height : Font-size ratio — same contract as input
- [x] Padding-inline ratio — same contract as input
