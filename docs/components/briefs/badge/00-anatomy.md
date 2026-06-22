<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Badge — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A compact, pill-shaped label that communicates status, count, or category using color and short text — never wraps, never exceeds ~3 words.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.badge` | Root — carries variant/role/size | yes |
| Label text (or count) | The actual message | yes (except dot variant) |

---

## 3. Maximum anatomy (optional slots)

| Slot | Present when |
|------|-------------|
| `.badge__icon` | Leading icon before label |
| `.badge__dot` | Dot variant — no text, pure color indicator |
| `.badge__count` | Numeric count (e.g. "99+") |

---

## 4. Real-world edge cases

- [x] **"99+" overflow** — when count exceeds display cap, must show truncated value (not overflow the badge). `max-width` or fixed count-cap logic in JS.
- [x] **Dot variant has no text** — must maintain minimum width/height as a square (becomes a circle). `min-width = height`.
- [x] **Badge on icon-button** — commonly positioned absolute at top-right corner of an icon-button. Must not be clipped by `overflow:hidden` on the parent button. Uses `position:absolute; top:-N; right:-N`.
- [x] **Long label** — "Requires attention" is too long. CSS must truncate with `max-width` + `overflow:hidden`. Single-line always.
- [x] **Inline vs overlay placement** — inline badge sits in flow; overlay badge is absolute-positioned on a parent. Both modes are CSS consumer responsibility; the component must support both.

---

## 5. What designers customize most in practice

1. **Role** — brand / danger / success / warning / info / neutral
2. **Variant** — filled / outlined / soft / dot
3. **Size** — micro (notification dot) through large (tag label)
4. **Leading icon** — small status icon
5. **Shape** — pill (default) vs rounded vs square

---

## 6. Reference system study

### GitHub Primer
- `Label` / `CounterLabel`. Outlined and filled modes. Our outlined + filled variants match.

### Material Design 3
- Badge. Numeric badge on icons. Our dot + count variants match.

### Atlassian Design System
- `Badge` / `Tag`. Soft-fill tinted approach. Our soft variant matches.

---

## 7. Decision: What makes this component feel "right"

- **Height : font-size ratio ≈ 2.0–2.2×** — badges are compact; more padding than that makes them look like buttons.
- **Pill shape is the default** — `border-radius: 9999px`. Square / rounded are opt-in.
- **Dot variant = square container → circle** via `border-radius:full`. No text.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots (icon, dot, count) identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
