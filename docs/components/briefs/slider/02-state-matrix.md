<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Slider — State × Variant Matrix

---

## State × Variant Matrix

| State | filled (default) | soft |
|-------|-----------------|------|
| **Default** | fill=brand-500, track=neutral-200, thumb=white+border | fill=brand-100, track=neutral-100, thumb=white+border |
| **Hover** | thumb-shadow increases, halo visible | same shadow increase |
| **Pressed** | thumb-shadow reduces (pressed feel) | same |
| **Focus-visible** | outline on thumb (2px brand) | same |
| **Disabled** | opacity=0.45, pointer-events=none | same |

### Role remapping (data-role)
| Role | Fill color | Thumb border |
|------|-----------|-------------|
| brand (default) | brand-500 | brand-600 |
| danger | danger-500 | danger-600 |
| success | success-500 | success-600 |
| warning | warning-400 | warning-500 |
| info | info-500 | info-600 |
| neutral | neutral-500 | neutral-600 |

---

## Compound rules

- **Hover** does not apply when disabled.
- **Focus-visible** does not apply when disabled.
- **Pressed** only applies while pointer is held down on thumb.
- The hidden `<input type="range">` holds focus state; the visual thumb receives the focus ring via CSS sibling/parent selectors.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled
- [x] All 6 roles documented
- [x] Disabled prevents hover/focus states
- [x] Focus ring goes on thumb element
- [x] Compound rules documented
