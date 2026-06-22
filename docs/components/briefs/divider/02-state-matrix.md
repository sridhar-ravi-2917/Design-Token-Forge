<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Divider — State × Variant Matrix

> Divider is display-only. No interactive states.

---

## State × Variant Matrix

| Style variant | Appearance |
|---------------|-----------|
| **solid** (default) | Continuous 1px line |
| **dashed** | Dashed line (`border-style: dashed`) |
| **dotted** | Dotted line (`border-style: dotted`) |
| **double** | Two parallel lines (`border-style: double`, needs 3px+ thickness) |

### Color variants
| Token | Appearance |
|-------|-----------|
| `--div-color` (default) | Standard border color |
| `--div-color-strong` | Stronger/darker separator |
| `--div-color-subtle` | Faint separator |

### Direction variants
| Value | Layout |
|-------|--------|
| `horizontal` (default) | Full-width line, block margin |
| `vertical` | Full-height line, inline margin |

### Label slot
When `.divider__label` is present: two equal lines flank the label text, centered.

---

## Compound rules

- Style, color, and direction combine freely.
- No interactive states — divider is structural/decorative.
- Vertical divider requires the parent to establish a height context.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 4 style variants documented
- [x] All 3 color variants documented
- [x] Both direction variants documented
- [x] Label slot behavior documented
- [x] No interactive states — display-only noted
