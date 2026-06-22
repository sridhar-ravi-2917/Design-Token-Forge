<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Textarea — Mathematical Contracts

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

Textarea does NOT participate in the fixed-height ladder — it is multi-line. However, the **font-size** and **padding** tokens MUST match Input at the same density so text feels consistent.

| Size   | Min-height (3 rows equiv.) | Font-size | Padding-x | Padding-y | Border-radius |
|--------|---------------------------:|----------:|----------:|----------:|---------------|
| micro  | 56px                       | 10px      | 6px       | 4px       | radius-sm     |
| tiny   | 64px                       | 11px      | 8px       | 5px       | radius-sm     |
| small  | 72px                       | 12px      | 10px      | 6px       | radius-md     |
| base   | 84px                       | 13px      | 12px      | 8px       | radius-DEFAULT|
| medium | 96px                       | 14px      | 12px      | 8px       | radius-DEFAULT|
| large  | 108px                      | 14px      | 14px      | 10px      | radius-md-lg  |
| big    | 120px                      | 16px      | 14px      | 10px      | radius-md-lg  |
| huge   | 140px                      | 18px      | 16px      | 12px      | radius-lg     |
| mega   | 160px                      | 20px      | 18px      | 14px      | radius-lg     |
| ultra  | 192px                      | 24px      | 20px      | 16px      | radius-xl     |

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
```
Not applicable (variable height).
Min-height ≈ font-size × line-height × 3 + 2×padding-y
```

### Padding-inline ratio
```
padding-x matches Input at same size (same contract)
```

### Padding-y ratio
```
padding-y(size) ≈ padding-x(size) × 0.65
```
Slightly less vertical padding than horizontal gives the field a natural "document" proportion.

---

## 3. Derived value table

| Size  | Min-H | px  | Padding-x | Padding-y |
|-------|------:|----:|----------:|----------:|
| micro | 56    | 10  | 6         | 4         |
| base  | 84    | 13  | 12        | 8         |
| large | 108   | 14  | 14        | 10        |
| ultra | 192   | 24  | 20        | 16        |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Textarea does NOT participate in fixed-height ladder — documented
- [x] Font-size and padding-x MUST match Input at same size
- [x] Min-height formula documented (3-row equivalent)
- [x] Padding-y ratio documented
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A for variable-height component, explained
- [x] Padding-inline ratio confirmed matches input
