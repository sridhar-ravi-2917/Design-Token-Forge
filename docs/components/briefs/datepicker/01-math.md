<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# DatePicker — Density Math

---

## Derived value table — Day cell

| Size | Day cell size | Font-size | Ratio (size/font) |
|------|-------------:|----------:|-----------------:|
| micro | 16px | 10px | 1.60 |
| tiny | 20px | 10px | 2.00 |
| small | 28px | 11px | 2.55 |
| base | 36px | 13px | 2.77 |
| medium | 40px | 14px | 2.86 |
| large | 48px | 16px | 3.00 |
| big | 54px | 18px | 3.00 |
| huge | 60px | 20px | 3.00 |
| mega | 72px | 24px | 3.00 |
| ultra | 80px | 28px | 2.86 |

Ratio stabilizes at 3.0× for `large`–`mega`, then compresses slightly at ultra.

---

## Derived value table — Header

| Size | Header height | Header font-size |
|------|-------------:|-----------------:|
| small | 32px | 12px |
| base | 36px | 14px |
| large | 48px | 16px |

---

## Height:Font-size ratio (header row)

Same pattern as button: header height ≈ 2.5–3× font-size.

---

## Padding-inline ratio

- (n/a) Day cells have no padding-x — they are square cells sized by `--datepicker-day-size-{size}`.
- Popover padding: `--datepicker-padding` = `var(--spacing-16)` (uniform inset).

---

## Grid geometry

- 7 columns × 6 rows maximum (42 cells).
- Column width = `--datepicker-day-size-{size}`.
- Total calendar width = `7 × day-size + 6 × gap`. Gap is typically 2–4px.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present — day cells (all 10 sizes)
- [x] Derived value table present — header
- [x] Height:Font-size ratio computed
- [x] Padding-inline — N/A (square cells) noted
- [x] Grid geometry documented
