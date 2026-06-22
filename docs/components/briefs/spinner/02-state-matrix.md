<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Spinner — State × Variant Matrix

> Spinner has no interactive states. It is a display-only animation component.

---

## State × Variant Matrix

| Variant | Appearance |
|---------|-----------|
| **ring** (default) | Full faint track circle + rotating colored arc |
| **dots** | Three dots with staggered scale/opacity pulse |

### Role (data-role) — affects arc color
| Role | Arc color |
|------|----------|
| brand (default) | brand-500 |
| danger | danger-500 |
| success | success-500 |
| warning | warning-400 |
| info | info-500 |
| neutral | neutral-500 |

Track color = always the arc color at ~10% opacity.

### Loading state
No "complete" or "error" visual — spinner is purely indeterminate. Caller is responsible for removing it when loading ends.

---

## Compound rules

- `data-variant="dots"` and `data-size` can combine freely.
- `data-role` works on both variants.
- `@media (prefers-reduced-motion: reduce)` → animation paused or replaced with a slower pulse.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] No interactive states — display-only noted explicitly
- [x] Both variants documented
- [x] All 6 roles documented
- [x] Track color relationship to arc color documented
- [x] Reduced-motion compound rule documented
