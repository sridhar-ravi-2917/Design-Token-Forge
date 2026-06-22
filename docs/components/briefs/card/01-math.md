<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Card — Mathematical Contracts

> Values sourced from card.tokens.css.

---

## 1. Padding ladder (body)

| Size   | Body padding | Header padding |
|--------|------------:|---------------:|
| micro  | 6px          | 4px            |
| tiny   | 8px          | 6px            |
| small  | 10px         | 8px            |
| base   | 16px         | 12px           |
| medium | 18px         | 14px           |
| large  | 20px         | 16px           |
| big    | 24px         | 18px           |
| huge   | 28px         | 20px           |
| mega   | 32px         | 24px           |
| ultra  | 36px         | 28px           |

---

## 2. Radius ladder

| Size   | Radius token |
|--------|-------------|
| micro  | radius-sm    |
| small  | radius-md    |
| base   | radius-md    |
| medium | radius-DEFAULT |
| large  | radius-lg    |
| huge   | radius-xl    |
| mega   | radius-xl    |
| ultra  | radius-2xl   |

---

## 3. Ratio contracts

### Padding : Radius relationship
As size increases, both padding and radius increase. There is no strict mathematical ratio — they are independently sourced from the global spacing/radius scales. The relationship is: larger padding = larger radius = card feels proportionally rounded.

### Header padding : Body padding ratio
`header-padding ≈ body-padding × 0.67–0.75` — header is tighter than body to make the content zone feel like the primary zone.

### Derived value table
Shown in the padding/radius tables above.

### Height : Font-size ratio
N/A — card has no fixed height (it grows with content).

### Padding-inline ratio
Card uses uniform padding on all sides (not separate padding-inline vs padding-block). This is a design decision: card padding should feel equal on all sides at each density.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Body padding ladder from source documented
- [x] Header padding ladder from source documented
- [x] Radius ladder from source documented
- [x] Header:body padding ratio documented
- [x] Non-fixed-height noted
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A noted (no fixed height)
- [x] Padding-inline ratio — uniform padding noted
