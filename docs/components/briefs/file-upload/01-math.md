<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# File Upload — Density Math

---

## Derived value table — Button mode

| Size | Button height | Padding-x | Font-size |
|------|-------------:|----------:|----------:|
| micro | 24px | 8px | 10px |
| tiny | 28px | 10px | 11px |
| small | 32px | 12px | 12px |
| base | 36px | 16px | 13px |
| medium | 40px | 18px | 14px |
| large | 44px | 20px | 14px |
| big | 48px | 24px | 16px |
| huge | 56px | 28px | 18px |
| mega | 64px | 32px | 20px |
| ultra | 72px | 40px | 24px |

---

## Derived value table — Dropzone mode

| Size | Min-height | Padding-x | Font-size |
|------|----------:|----------:|----------:|
| micro | 80px | 8px | 10px |
| base | 120px | 16px | 13px |
| large | 120px | 20px | 14px |
| huge | 120px | 28px | 18px |
| ultra | 120px | 40px | 24px |

Dropzone min-height caps at 120px (`micro`–`ultra`); larger sizes grow to content.

---

## Height:Font-size ratio (button mode matches cross-component height ladder)

| Size | Button height | Font-size | Ratio |
|------|----------:|----------:|------:|
| base | 36px | 13px | 2.77 |
| large | 44px | 14px | 3.14 |
| ultra | 72px | 24px | 3.00 |

Button heights match the cross-component height ladder exactly.

---

## Padding-inline ratio (button mode)

| Size | padding-x / font-size |
|------|-----------------------|
| small | 12/12 = 1.00 |
| base  | 16/13 = 1.23 |
| ultra | 40/24 = 1.67 |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Derived value table present — button mode (all 10 sizes)
- [x] Derived value table present — dropzone mode
- [x] Height:Font-size ratio computed (button mode)
- [x] Padding-inline ratio computed
- [x] Dropzone min-height cap documented
