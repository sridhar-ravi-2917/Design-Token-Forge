<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Split Button — Mathematical Contracts

> Values confirmed against split-button.tokens.css. Height ladder identical to button.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

| Size   | Height | Action padding-x | Toggle width | Divider width |
|--------|-------:|-----------------:|-------------:|--------------:|
| micro  | 24px   | 4px              | 20px         | 1px           |
| tiny   | 28px   | 6px              | 22px         | 1px           |
| small  | 32px   | 8px              | 24px         | 1px           |
| base   | 36px   | 10px             | 28px         | 1px           |
| medium | 40px   | 10px             | 30px         | 1px           |
| large  | 44px   | 12px             | 32px         | 1px           |
| big    | 48px   | 14px             | 36px         | 1px           |
| huge   | 56px   | 14px             | 40px         | 1px           |
| mega   | 64px   | 16px             | 48px         | 1px           |
| ultra  | 72px   | 20px             | 56px         | 1px           |

---

## 2. Component-specific ratio contracts

### Height : Font-size ratio
Same as button — `height / font-size ≈ 2.4–2.9×`.

### Padding-inline ratio
Action zone: same padding-x as button at matching size.

### Toggle zone width : Height ratio
```
toggle-width(size) ≈ height(size) × 0.75–0.78
```
Wide enough for a chevron icon with symmetric padding; not so wide it dwarfs the action zone.

### Divider
```
divider-width: 1px (all sizes)
divider-color: role-border-color at 60% opacity
```

---

## 3. Derived value table

| Size   | H  | Action px | Toggle w | Total min-w |
|--------|---:|-----------:|---------:|------------:|
| micro  | 24 | 4          | 20       | ~50px       |
| base   | 36 | 10         | 28       | ~80px       |
| large  | 44 | 12         | 32       | ~90px       |
| ultra  | 72 | 20         | 56       | ~140px      |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values match button source of truth exactly
- [x] Toggle zone width ratio documented
- [x] Divider width and color formula documented
- [x] Derived value table complete
- [x] Padding-inline ratio — same as button, confirmed
