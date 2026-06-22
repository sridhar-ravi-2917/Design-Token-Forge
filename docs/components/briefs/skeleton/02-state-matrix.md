<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Skeleton — State × Variant Matrix

> Skeleton is display-only. No interactive states.

---

## State × Variant Matrix

| Variant | Shape | Radius |
|---------|-------|--------|
| **text** (default) | Rectangle, typically narrow height | `radius-sm` |
| **rect** | Rectangle, taller block | `radius-md` |
| **circle** | Square → circle | `radius-full` |

### Animation states
| State | Appearance |
|-------|-----------|
| **Animated** (default) | Shimmer band sweeps left→right |
| **Static** (`data-animated="false"`) | Flat muted color, no animation |
| **Reduced-motion** | Animation paused; static muted color |

---

## Compound rules

- All three variants can be static or animated.
- No hover/focus/disabled states — skeleton is removed from DOM when content loads.
- Dark mode: shimmer mid-color adjusts via T1 surface tokens.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] Animation vs static documented
- [x] No interactive states — display-only noted
- [x] Dark mode compound rule documented
- [x] Reduced-motion compound rule documented
