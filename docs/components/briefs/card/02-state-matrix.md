<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Card — State × Variant Matrix

---

## State × Variant Matrix

| State | raised | outlined | flat | ghost |
|-------|--------|---------|------|-------|
| **Default** | shadow-sm, no border | border visible, no shadow | no shadow, no border | transparent, no shadow, no border |
| **Hover** (data-interactive) | shadow-md (lift) | shadow-sm added | shadow-sm added | bg tint |
| **Selected** (data-selected) | brand border 2px | brand border 2px | brand border 2px | brand bg subtle |
| **Disabled** (data-disabled) | opacity=0.45 | opacity=0.45 | opacity=0.45 | opacity=0.45 |

### Direction variants
| Value | Layout |
|-------|--------|
| `vertical` (default) | Media top → header → body → footer stacked |
| `horizontal` | Media left, content (header+body+footer) right |

---

## Compound rules

- `data-interactive` + `data-selected` can coexist: selected card still lifts on hover.
- `data-disabled` prevents all interactive states.
- `data-selected` adds a 2px brand-colored border regardless of variant — this overrides the variant's border style.
- Footer is visually separated from body by spacing alone — no `<hr>` or border.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 4 variants documented
- [x] Interactive hover states per variant
- [x] Selected state documented
- [x] Disabled state documented
- [x] Direction variants documented
- [x] Compound rules (selected + interactive) documented
