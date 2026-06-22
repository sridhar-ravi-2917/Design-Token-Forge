<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Badge — Mathematical Contracts

> Values from badge.tokens.css. Badge does NOT participate in the button/input height ladder — it uses its own annotation-scale height system.

---

## 1. Height and padding-inline ladder

| Size   | Height | Padding-x | Font-size |
|--------|-------:|----------:|----------:|
| micro  | 16px   | 4px       | 10px      |
| tiny   | 18px   | 5px       | 10px      |
| small  | 20px   | 6px       | 10px      |
| base   | 22px   | 8px       | 11px      |
| medium | 24px   | 10px      | 12px      |
| large  | 28px   | 12px      | 13px      |
| big    | 32px   | 14px      | 14px      |
| huge   | 36px   | 16px      | 16px      |
| mega   | 40px   | 18px      | 18px      |
| ultra  | 48px   | 24px      | 20px      |

---

## 2. Ratio contracts

### Height : Font-size ratio
```
ratio(size) = height(size) / font-size(size)
```
| Size  | Ratio |
|-------|------:|
| micro | 1.6× |
| base  | 2.0× |
| large | 2.15× |
| ultra | 2.4× |

Compact range (1.6–2.4×). Badges are smaller than buttons at every size.

### Padding-inline ratio
```
padding-x(size) / height(size)
```
| Size  | Ratio |
|-------|------:|
| micro | 0.25 |
| base  | 0.36 |
| large | 0.43 |
| ultra | 0.50 |

### Derived value table
Shown in the height/padding table above.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Full height ladder from tokens documented
- [x] Font-size ladder documented
- [x] Padding-x ladder documented
- [x] Non-participation in button/input height ladder noted
- [x] Compact height:font-size ratio documented
- [x] Derived value table complete
- [x] Height : Font-size ratio computed
- [x] Padding-inline ratio computed
