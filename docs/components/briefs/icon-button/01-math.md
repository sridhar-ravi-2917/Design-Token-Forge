<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Icon Button — Mathematical Contracts

> Values confirmed against icon-button.tokens.css. Height ladder identical to button.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

Icon button heights are IDENTICAL to button heights — they must sit in the same toolbar row.

| Size   | Height | Icon-size | Padding (symmetric) | Min tap |
|--------|-------:|----------:|--------------------:|--------:|
| micro  | 24px   | 12px      | 6px                 | 44px    |
| tiny   | 28px   | 14px      | 7px                 | 44px    |
| small  | 32px   | 16px      | 8px                 | 44px    |
| base   | 36px   | 18px      | 9px                 | 44px    |
| medium | 40px   | 20px      | 10px                | 44px    |
| large  | 44px   | 22px      | 11px                | 44px    |
| big    | 48px   | 24px      | 12px                | 44px    |
| huge   | 56px   | 28px      | 14px                | 44px    |
| mega   | 64px   | 32px      | 16px                | 44px    |
| ultra  | 72px   | 36px      | 18px                | 44px    |

---

## 2. Component-specific ratio contracts

### Square formula
```
width = height   (always — icon button must be a square)
padding-inline = (height - icon-size) / 2
```

### Icon size : Height ratio
```
icon-size(size) = height(size) × 0.5
```
Justification: 50% of height leaves equal breathing room on all four sides.

### Height : Font-size ratio
Not directly applicable — no visible text. Font-size token exists for any internal text (e.g. badge count), same ladder as button.

### Padding-inline ratio
```
padding-inline = (height - icon-size) / 2 = height × 0.25
```
This ensures perfect square at all sizes.

---

## 3. Derived value table

| Size   | H  | Icon | Padding (each side) | Width |
|--------|---:|-----:|--------------------:|------:|
| micro  | 24 | 12   | 6                   | 24    |
| tiny   | 28 | 14   | 7                   | 28    |
| small  | 32 | 16   | 8                   | 32    |
| base   | 36 | 18   | 9                   | 36    |
| medium | 40 | 20   | 10                  | 40    |
| large  | 44 | 22   | 11                  | 44    |
| big    | 48 | 24   | 12                  | 48    |
| huge   | 56 | 28   | 14                  | 56    |
| mega   | 64 | 32   | 16                  | 64    |
| ultra  | 72 | 36   | 18                  | 72    |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values match button source of truth exactly
- [x] Square formula documented (`width = height`)
- [x] Padding formula derived from icon-size and height
- [x] Derived value table complete — no blank cells
- [x] Icon : height ratio confirmed at 0.5×
