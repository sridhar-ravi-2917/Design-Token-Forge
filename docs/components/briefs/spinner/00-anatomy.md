<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Spinner — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A rotating animation that signals an indeterminate loading or processing state, available as a ring arc or a three-dot pulse.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.spinner` (wrapper, `role="status"`) | Root — owns accessible label | yes |
| `.spinner__track` | Background ring (faint full circle) | yes (ring variant) |
| `.spinner__arc` | Animated indicator (rotating arc or dots) | yes |

---

## 3. Maximum anatomy (optional)

| Slot | Present when |
|------|-------------|
| `.spinner__label` | When `data-label` or slot text provided |
| `.spinner__dot × 3` | `data-variant="dots"` |

---

## 4. Real-world edge cases

- [x] **Screen reader label** — `role="status"` + `aria-label="Loading"` is required. The visual animation conveys nothing to screen readers.
- [x] **Inline vs block context** — when placed inline in a button, the spinner must be the same height as the button's line-height/icon size. `data-size` must match the parent context.
- [x] **Track vs arc color** — track is always a very faint version of the arc color (≈10% opacity). Avoid separate track color tokens that diverge.
- [x] **Reduced motion** — `@media (prefers-reduced-motion: reduce)` must change the animation. Acceptable: slower pulse instead of spin, or a static arc.
- [x] **Centering in fill containers** — spinner is commonly placed inside a loading overlay. Must support `margin:auto` centering.

---

## 5. What designers customize most in practice

1. **Size** (`data-size`) — inline vs overlay
2. **Role** (`data-role`) — brand/neutral/white (on dark overlays)
3. **Variant** (`data-variant`) — ring vs dots
4. **Animation speed** — via `--spin-duration` override
5. **Label text** — "Loading..." or custom message

---

## 6. Reference system study

### Material Design 3
- CircularProgressIndicator. Four-color variant unique to MD3. Our version uses single arc color.

### GitHub Primer
- `Spinner` — single ring with spinning arc. Matches our ring variant.

### Tailwind UI / Heroicons
- Spinning SVG icon. We use CSS animation for zero-DOM-cost, same visual result.

---

## 7. Decision: What makes this component feel "right"

- **Track is required** — a spinning arc without a track looks incomplete, like a broken donut.
- **Arc covers 270° (¾ circle)** — enough visual weight to read as a spinner at all sizes.
- **Dots variant at small sizes** — ring becomes thin to the point of invisibility at `micro`/`tiny`; dots variant reads better.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
