<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Spinner — Mathematical Contracts

> Values sourced from spinner.tokens.css.

---

## 1. Size ladder

| Size   | Diameter | Track stroke width |
|--------|--------:|------------------:|
| micro  | 12px     | 2px               |
| tiny   | 14px     | 2px               |
| small  | 16px     | 2px               |
| base   | 20px     | 3px               |
| medium | 24px     | 3px               |
| large  | 28px     | 3px               |
| big    | 32px     | 4px               |
| huge   | 40px     | 4px               |
| mega   | 48px     | 5px               |
| ultra  | 64px     | 6px               |

---

## 2. Ratio contracts

### Stroke width : Diameter ratio
```
ratio(size) = track-width(size) / diameter(size)
```
| Size | Ratio |
|------|------:|
| micro | 16.7% |
| base | 15.0% |
| large | 10.7% |
| ultra | 9.4% |

Stroke thins relative to diameter as size grows — thick strokes on large spinners look too heavy.

### Derived value table
Already in the size ladder table above.

### Height : Font-size ratio
N/A — spinner has no intrinsic text in the ring zone. The optional label below inherits context font-size.

### Padding-inline ratio
N/A — spinner is a circular display element with no padding-inline concept.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Full size ladder from source documented
- [x] Track stroke width ladder documented
- [x] Stroke:diameter ratio computed
- [x] Non-participation in height ladder noted
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted
