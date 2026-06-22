<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Menu Button — Mathematical Contracts

> Values confirmed against menu-button.tokens.css. Height ladder identical to button.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

Identical to button. Menu button is a button with a chevron appended.

| Size   | Height | Font-size | Padding-x | Chevron-size | Gap  |
|--------|-------:|----------:|----------:|-------------:|-----:|
| micro  | 24px   | 10px      | 4px       | 10px         | 2px  |
| tiny   | 28px   | 11px      | 6px       | 11px         | 2px  |
| small  | 32px   | 12px      | 8px       | 12px         | 3px  |
| base   | 36px   | 13px      | 10px      | 14px         | 4px  |
| medium | 40px   | 14px      | 10px      | 14px         | 4px  |
| large  | 44px   | 14px      | 12px      | 16px         | 5px  |
| big    | 48px   | 16px      | 14px      | 18px         | 6px  |
| huge   | 56px   | 18px      | 14px      | 20px         | 6px  |
| mega   | 64px   | 20px      | 16px      | 22px         | 8px  |
| ultra  | 72px   | 24px      | 20px      | 26px         | 8px  |

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
Same as button (`≈ 2.4–2.9×`).

### Padding-inline ratio
Same as button.

### Chevron size : Font-size ratio
```
chevron-size(size) ≈ font-size(size) × 1.0–1.1
```
Chevron should match text height — not an icon, just a directional cue.

---

## 3. Derived value table

| Size   | H  | px | Padding-x | Chevron |
|--------|---:|---:|----------:|--------:|
| micro  | 24 | 10 | 4         | 10      |
| base   | 36 | 13 | 10        | 14      |
| large  | 44 | 14 | 12        | 16      |
| ultra  | 72 | 24 | 20        | 26      |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values match button source of truth exactly
- [x] Chevron size ratio documented
- [x] Gap tokens documented and tabulated
- [x] Derived value table complete
- [x] Padding-inline ratio — same as button
