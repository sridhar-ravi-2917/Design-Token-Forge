<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Skeleton — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A muted placeholder shape that mimics the layout of content that has not yet loaded, with an optional shimmer animation to signal activity.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.skeleton` | Root — carries variant/size; the placeholder shape | yes |
| `::after` (shimmer band) | Animated highlight that sweeps across | yes (when animation on) |

---

## 3. Maximum anatomy (optional)

| Slot | Present when |
|------|-------------|
| Multiple `.skeleton` stacked | Text-line skeletons (paragraph placeholder) |
| `.skeleton-group` wrapper | Container for composing a card/list placeholder |

---

## 4. Real-world edge cases

- [x] **Width must be set externally** — skeleton shapes fill available width by default. A line skeleton for a heading needs an explicit `width: 60%` set on the element.
- [x] **Circle skeleton must be square** — `data-variant="circle"` needs `width = height` enforced via the token ladder.
- [x] **Shimmer on dark backgrounds** — `--skel-shimmer-via: rgba(255,255,255,0.45)` is too bright on dark themes. T1 dark mode must use a darker shimmer mid-color.
- [x] **Reduced motion** — shimmer animation must stop. Content should still render as a static muted shape (not invisible).
- [x] **Composition with real content** — skeleton must be the same size as the content it replaces (same height as a button, same font-size-based height as a text line).

---

## 5. What designers customize most in practice

1. **Variant** — text / rect / circle
2. **Height/size** — to match the real content
3. **Width** — per-element, often percentage
4. **Animation on/off** — `data-animated="false"` for static placeholder
5. **Composition** — stacking multiple skeletons into a mock card

---

## 6. Reference system study

### Material Design 3
- Skeleton. Three shapes: text, rectangular, circular. Matches our three variants exactly.
- Worth borrowing: `animation-delay` stagger across multiple text lines — not yet in tokens, consumer responsibility.

### GitHub Primer
- No dedicated skeleton; uses CSS-only shimmer pattern. Our pattern same.

### Tailwind UI
- Skeleton placeholder — same muted gray + shimmer approach.

---

## 7. Decision: What makes this component feel "right"

- **Same dimensions as the real content** — a skeleton that is taller/shorter than the real content causes layout shift when content loads.
- **Shimmer direction always LTR** — even in RTL layouts, the shimmer goes left→right (it reads as "light passing over", not directional content).
- **No border-radius on text variant** — thin text skeletons (8–16px) look fine with slight rounding; they should NOT be pill-shaped (that would look like badges).

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
