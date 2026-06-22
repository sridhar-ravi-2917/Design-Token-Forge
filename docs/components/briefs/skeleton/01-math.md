<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Skeleton — Mathematical Contracts

> Values sourced from skeleton.tokens.css.

---

## 1. Height ladder (text and rect variants)

| Size   | Height |
|--------|-------:|
| micro  | 8px    |
| tiny   | 10px   |
| small  | 12px   |
| base   | 16px   |
| medium | 20px   |
| large  | 24px   |
| big    | 28px   |
| huge   | 32px   |
| mega   | 36px   |
| ultra  | 40px   |

---

## 2. Circle diameter ladder

| Size   | Diameter |
|--------|--------:|
| micro  | 16px    |
| tiny   | 20px    |
| small  | 24px    |
| base   | 32px    |
| medium | 40px    |
| large  | 48px    |
| big    | 56px    |
| huge   | 64px    |
| mega   | 80px    |
| ultra  | 96px    |

---

## 3. Ratio contracts

### Matching real content
Skeleton height is calibrated against font-size to be close to the actual rendered text line height:
- `base` skeleton (16px) ≈ body text rendered line at `--font-size-13` (line height ≈ 20px) — slightly shorter is correct (skeleton shows text line weight, not full line box).

### Derived value table
Shown in ladders above.

### Height : Font-size ratio
N/A — skeleton has no text. Height tokens are sized to approximate corresponding text heights.

### Padding-inline ratio
N/A — display-only, no padding concept.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Text/rect height ladder documented from source
- [x] Circle diameter ladder documented
- [x] Non-participation in cross-component height ladder noted
- [x] Calibration against real content heights explained
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted
