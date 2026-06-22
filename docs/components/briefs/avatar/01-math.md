<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Avatar — Mathematical Contracts

> Values sourced from avatar.tokens.css. Avatar does NOT participate in the button/input/select height ladder — it uses its own square size ladder.

---

## 1. Size ladder

| Size   | Width = Height |
|--------|---------------:|
| micro  | 20px           |
| tiny   | 24px           |
| small  | 28px           |
| base   | 32px           |
| medium | 36px           |
| large  | 40px           |
| big    | 48px           |
| huge   | 56px           |
| mega   | 64px           |
| ultra  | 72px           |

Source: `--avatar-size-{size}: var(--spacing-{N})` tokens.

---

## 2. Ratio contracts

### Height : Font-size ratio (initials text)
Initials font-size ≈ `avatar-size × 0.4`:
| Size | Diameter | Font-size (approx) |
|------|--------:|-------------------:|
| micro | 20px | 8px |
| base | 32px | 13px |
| large | 40px | 16px |
| ultra | 72px | 28px |

### Padding-inline ratio
N/A — avatar is a square container with no padding-inline (content is absolutely centered or flex-centered).

### Group overlap offset
```
overlap-offset(size) = avatar-size(size) × -0.25
```
| Size | Offset |
|------|-------:|
| micro | -5px |
| base | -8px |
| large | -10px |
| ultra | -18px |

### Derived value table
| Size | Diameter | Group offset |
|------|--------:|-------------:|
| micro | 20px | -5px |
| tiny | 24px | -6px |
| small | 28px | -7px |
| base | 32px | -8px |
| medium | 36px | -9px |
| large | 40px | -10px |
| big | 48px | -12px |
| huge | 56px | -14px |
| mega | 64px | -16px |
| ultra | 72px | -18px |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Full size ladder from source tokens documented
- [x] Non-participation in button/input height ladder noted
- [x] Initials font-size ratio documented
- [x] Group offset formula documented
- [x] Derived value table complete
- [x] Height : Font-size ratio — noted (approximate, not a hard token)
- [x] Padding-inline ratio — N/A noted
