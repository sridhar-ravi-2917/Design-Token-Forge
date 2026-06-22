<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Split Button — Anatomy Study

> Gate 0 file — retroactively completed after implementation.

---

## 1. What this component IS (one sentence, concrete)

A compound button with two adjacent zones sharing a single visual container: a primary action zone (left) and a dropdown-trigger zone (right), separated by a divider — used when a single primary action has secondary alternatives.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.split-btn` (wrapper `<div>`) | Container holding both zones; carries `overflow:hidden` for corner clipping | yes |
| `.split-btn__action` (`<button>`) | Primary action zone — carries the label | yes |
| `.split-btn__toggle` (`<button>`) | Dropdown-trigger zone — carries the chevron icon | yes |
| `.split-btn__divider` | Visual separator between the two zones | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| Leading icon in action zone | When action has an icon | Mirrors button's icon-start slot |
| Dropdown menu | When `.split-btn__toggle` is activated | External composition — not part of this component |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Focus ring placement** — the wrapper has `overflow:hidden` to clip inner zone corners. A focus ring on an inner `<button>` would be clipped. Fix: focus ring goes on the WRAPPER via `.split-btn:has(:focus-visible)` — never on the inner zones with negative offset.
- [x] **Two separate focusable elements** — keyboard users Tab to the action zone, then again to the dropdown zone. Both must show distinct focus rings.
- [x] **Disabled whole component** — `data-disabled` on the wrapper applies opacity and `pointer-events:none` to BOTH inner buttons. Do not disable each button individually.
- [x] **Divider visibility** — the divider between zones must remain visible in all variants and at all role colors. Its color is derived from the fill or border color, slightly offset.
- [x] **Loading state** — typically applied only to the action zone (the primary action is loading). The dropdown toggle remains interactive during loading to allow action change.
- [x] **RTL** — action zone and dropdown zone swap sides in `dir="rtl"`. Divider position flips.

---

## 5. What designers customize most in practice

1. **Variant + role** — same as button (filled/outlined/ghost × primary/danger/neutral)
2. **Size** — same density ladder as button
3. **Action zone label** — the primary action text
4. **Dropdown menu content** — external composition
5. **Rounded shape** — `data-rounded` applies full pill radius to both outer corners only

---

## 6. Reference system study

### Material Design 3
- No split button in M3. The closest is a `ButtonGroup`. Our approach is a compound component, not a group.

### GitHub Primer
- `SplitButton` exists — action + dropdown in a single border-unified container.
- Worth borrowing: single `overflow:hidden` container + inner border-radius: 0 for middle edges — adopted.

### Ant Design
- `Button.Group` with `type="split"`. Similar pattern.
- Worth borrowing: Focus-ring-on-wrapper pattern when inner zones have overflow:hidden.

---

## 7. Decision: What makes this component feel "right"

- **Single visual container** — both zones share one border and one border-radius. They must NOT look like two separate buttons.
- **Divider is a visual breath, not a wall** — 1px, 60–70% opacity of the border color.
- **Focus ring belongs on the wrapper** — never clip a focus ring with overflow:hidden.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed (including overflow:hidden wrapper)
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
