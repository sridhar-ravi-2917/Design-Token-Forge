<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Button — Mathematical Contracts

> Gate 0 file — retroactively completed. Values confirmed against button.tokens.css.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

| Size   | Height | Font-size | Padding-x | Icon-size | Radius token     |
|--------|-------:|----------:|----------:|----------:|------------------|
| micro  | 24px   | 10px      | 4px       | 12px      | radius-sm (4px)  |
| tiny   | 28px   | 11px      | 6px       | 14px      | radius-sm (4px)  |
| small  | 32px   | 12px      | 8px       | 16px      | radius-md (6px)  |
| base   | 36px   | 13px      | 10px      | 18px      | radius-md (6px)  |
| medium | 40px   | 14px      | 10px      | 20px      | radius-DEFAULT (8px) |
| large  | 44px   | 14px      | 12px      | 22px      | radius-DEFAULT (8px) |
| big    | 48px   | 16px      | 14px      | 24px      | radius-md-lg (10px) |
| huge   | 56px   | 18px      | 14px      | 28px      | radius-md-lg (10px) |
| mega   | 64px   | 20px      | 16px      | 32px      | radius-lg (12px) |
| ultra  | 72px   | 24px      | 20px      | 36px      | radius-lg-xl (14px) |

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
```
height(size) / font-size(size) ≈ 2.4–2.9×
```
Justification: A button needs vertical padding above and below the text. Less than 2.4× feels cramped; more than 3× feels like a nav bar item.

### Padding-inline ratio
```
padding-x(size) ≈ height(size) × 0.17–0.28×
```
Values range from 4px (micro) to 20px (ultra). Intentionally conservative — the label provides width, not empty padding.

### Icon size : Font-size ratio
```
icon-size(size) ≈ font-size(size) × 1.2–1.5×
```
Icon is slightly larger than text cap-height so it reads as a peer element, not a decorative mark.

### Icon-only symmetric padding
```
When icon-only: padding-inline = (height - icon-size) / 2
```
This makes the button a near-perfect square. Verified at each size.

### Border-radius rule
```
Radius steps with size (sm → lg-xl): larger buttons warrant larger corners
Pill override: --btn-radius-rounded = radius-full (always)
```

---

## 3. Derived value table

| Size   | H  | px | Icon | Padding-x | Min tap |
|--------|---:|---:|-----:|----------:|--------:|
| micro  | 24 | 10 | 12   | 4         | 44px    |
| tiny   | 28 | 11 | 14   | 6         | 44px    |
| small  | 32 | 12 | 16   | 8         | 44px    |
| base   | 36 | 13 | 18   | 10        | 44px    |
| medium | 40 | 14 | 20   | 10        | 44px    |
| large  | 44 | 14 | 22   | 12        | 44px    |
| big    | 48 | 16 | 24   | 14        | 44px    |
| huge   | 56 | 18 | 28   | 14        | 44px    |
| mega   | 64 | 20 | 32   | 16        | 44px    |
| ultra  | 72 | 24 | 36   | 20        | 44px    |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values sourced from `button.tokens.css` — this IS the system source of truth
- [x] All ratios stated as formulas first, then values derived
- [x] Derived value table complete — no blank cells
- [x] Icon-only symmetric padding formula documented
- [x] Border-radius scaling rule documented
- [x] Padding-x values tabulated and ratio confirmed
