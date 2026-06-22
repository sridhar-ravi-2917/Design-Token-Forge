<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Input — Mathematical Contracts

> Values confirmed against input.tokens.css. Height MUST match button at each size.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

| Size   | Height | Font-size | Padding-x | Border-radius   |
|--------|-------:|----------:|----------:|-----------------|
| micro  | 24px   | 10px      | 6px       | radius-sm (4px) |
| tiny   | 28px   | 11px      | 8px       | radius-sm (4px) |
| small  | 32px   | 12px      | 10px      | radius-md (6px) |
| base   | 36px   | 13px      | 12px      | radius-DEFAULT (8px) |
| medium | 40px   | 14px      | 12px      | radius-DEFAULT (8px) |
| large  | 44px   | 14px      | 14px      | radius-md-lg (10px) |
| big    | 48px   | 16px      | 14px      | radius-md-lg (10px) |
| huge   | 56px   | 18px      | 16px      | radius-lg (12px) |
| mega   | 64px   | 20px      | 18px      | radius-lg (12px) |
| ultra  | 72px   | 24px      | 20px      | radius-xl (16px) |

> Input radius is one step above button radius at most sizes — inputs feel slightly more rounded for the "form field" aesthetic.

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
```
height(size) / font-size(size) ≈ 2.4–2.9× (same contract as button)
```

### Padding-inline ratio
```
padding-x(size) ≈ height(size) × 0.25–0.33
```
Slightly more generous than button padding — text fields need more breathing room for readability.

### Icon-start / icon-end adjustment
```
input padding-inline-start when icon-start present:
  = padding-x + icon-size + gap
```
This ensures typed text is never occluded by the prefix icon.

### Border width
```
border-width: 1px (outline variant)
border-width: 0 (filled variant — relies on bg contrast)
border-width: 0 0 1px 0 (underline variant — bottom only)
```

---

## 3. Derived value table

| Size   | H  | px  | Padding-x | Radius |
|--------|---:|----:|----------:|-------:|
| micro  | 24 | 10  | 6         | 4px    |
| base   | 36 | 13  | 12        | 8px    |
| large  | 44 | 14  | 14        | 10px   |
| ultra  | 72 | 24  | 20        | 16px   |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values match button source of truth
- [x] Padding-x values documented and ratio confirmed
- [x] Border width variants documented (1px/0/bottom-only)
- [x] Icon-start padding adjustment formula documented
- [x] Radius is intentionally one step above button — documented
- [x] Derived value table complete
