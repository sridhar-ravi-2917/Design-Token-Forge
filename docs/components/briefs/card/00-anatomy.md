<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Card — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A surface container that groups related content and optional actions into a visually bounded unit, supporting image/media, header, body, and footer zones.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.card` | Root — carries variant/direction/state | yes |
| `.card__body` | Main content area | yes (all other zones are optional) |

---

## 3. Maximum anatomy (optional slots)

| Slot | Present when |
|------|-------------|
| `.card__media` | Hero image/video at top (vertical) or side (horizontal) |
| `.card__header` | Structured meta row: avatar + title-group + action button |
| `.card__title` | Primary heading inside `.card__header` |
| `.card__subtitle` | Secondary line inside `.card__header` |
| `.card__header-action` | Trailing action (menu, close) in header |
| `.card__footer` | Action bar at the bottom |
| `.card__actions` | Button group inside footer |

---

## 4. Real-world edge cases

- [x] **Card in a grid vs standalone** — card's width is always set by the parent grid. Never fixed-width in tokens — `width: 100%` default.
- [x] **Interactive card** — `data-interactive` enables hover shadow lift and cursor:pointer. The entire card surface must be clickable but ONLY one element should be the actual `<a>` (stretch-link pattern).
- [x] **Media aspect ratio** — hero images need a fixed aspect ratio to prevent layout shift. `aspect-ratio: 16/9` is the default. Must be overrideable.
- [x] **Selected state** — `data-selected="true"` shows a brand-color border. Must not conflict with `raised` or `outlined` variant borders.
- [x] **Overflow with media** — `.card__media img` must be `object-fit:cover` and constrained by the card's border-radius at the top corners.
- [x] **Horizontal layout** — media moves to the left side; content (header+body+footer) stack on the right. Media width is fixed (e.g. 200px or 40%) — must be configurable.

---

## 5. What designers customize most in practice

1. **Variant** — raised (shadow), outlined (border), flat, ghost
2. **Padding** — body and header padding per density
3. **Media presence and aspect ratio**
4. **Interactive hover behavior** (shadow lift amount)
5. **Selected state border color** (branding)

---

## 6. Reference system study

### Material Design 3
- Card: Elevated / Filled / Outlined. Maps to our raised/flat/outlined. Ghost is our extension.
- Worth borrowing: `data-interactive` hover state lift — adopted.

### GitHub Primer
- `Box` / `BorderBox` — similar container. No variants but solid border pattern.

### Atlassian Design System
- Card with header/body/footer. Horizontal layout supported — adopted.

---

## 7. Decision: What makes this component feel "right"

- **Shadow must be subtle on raised variant** — `shadow-sm` at rest. `shadow-md` on hover. Cards that cast heavy shadows at rest feel "floating" rather than "structured".
- **Radius scales with padding** — larger cards (mega/ultra) get larger radius to avoid looking like rounded rectangles.
- **Header-body-footer separation is visual, not structural** — no `<hr>` between zones; spacing alone creates the visual boundary.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
