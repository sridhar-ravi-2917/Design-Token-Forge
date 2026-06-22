<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Slider — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A drag-to-set-value control consisting of a horizontal track with a sliding thumb; used for continuous value selection within a defined range (e.g. volume, brightness, price range).

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.slider` (wrapper) | Root — carries size/state attributes | yes |
| `.slider__track` | The rail — shows full range | yes |
| `.slider__fill` | The filled portion — shows current value position | yes |
| `.slider__thumb` | The draggable indicator | yes |
| `<input type="range">` | Native semantics + keyboard support | yes (hidden) |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.slider__label` | When label shown | |
| `.slider__value-display` | When value label shown | Renders current value |
| `.slider__min-label` | When range labels shown | |
| `.slider__max-label` | When range labels shown | |
| `.slider__marks` | When step marks shown | Visual tick marks on track |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Native `<input type="range">` must remain in DOM** — visually hidden but present. It provides keyboard (arrow keys) and screen reader support. Do NOT use `display:none`.
- [x] **Thumb tap target vs visual size** — at `micro`, the thumb is 10px wide (very small). The tap target must be padded to 44px via `min-width`/`min-height` on the thumb.
- [x] **Fill width calculation** — fill width = `(value - min) / (max - min) × 100%`. This is JS-driven; CSS alone cannot calculate this without a `--value` custom property.
- [x] **Thumb at range extremes** — thumb at value=0 must not overflow the track left edge; at value=max must not overflow right edge. Use `calc()` with half-thumb-width offset.
- [x] **RTL direction** — fill goes right-to-left in RTL. The range input behaves differently in RTL browsers.
- [x] **Discrete steps** — when `step` attribute is set, thumb snaps. Visual marks must align with snap points.

---

## 5. What designers customize most in practice

1. **Track color / fill color** (`--slider-track-bg`, `--slider-fill-bg`) — brand accent fill
2. **Track height** (`--slider-track-h-{size}`) — thin vs thick rail
3. **Thumb size** (`--slider-thumb-w-{size}`) — dot vs large handle
4. **Thumb shape** — pill vs circle (both `border-radius: 9999px` but width=height for circle)
5. **Size** (`data-size`) — density

---

## 6. Reference system study

### Material Design 3
- Slider with continuous + discrete. Track has active fill. Our approach same.
- Worth borrowing: Thumb value label (tooltip on thumb) — our `--slider-value-display` slot.

### Radix UI / shadcn
- `Slider` with `SliderTrack`, `SliderRange` (fill), `SliderThumb`. Same decomposition.
- Worth borrowing: Hidden `<input>` for form submission value.

### Apple HIG
- iOS UISlider — thumb always circular. Our thumb is also circular by default (pill shape is a variant).
- Worth borrowing: Thumb shadow for depth — adopted (`--slider-thumb-shadow`).

---

## 7. Decision: What makes this component feel "right"

- **Track height must feel intentional** — at base (6px), the track is visible but not dominant. At huge+ (18–32px), it becomes a statement element.
- **Thumb shadow lifts it off the track** — without shadow, the thumb blends into the fill.
- **Fill color should be the same as button fill at same role** — slider fill and button/toggle feel cohesive.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed (hidden native input included)
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
