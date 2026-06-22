<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Menu Button — Anatomy Study

> Gate 0 file — retroactively completed after implementation.

---

## 1. What this component IS (one sentence, concrete)

A single button that exposes a dropdown menu on click, combining a visible label/icon with a chevron affordance in one unified interactive zone — used when one action triggers a menu of choices.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.menu-btn` (`<button>`) | Root interactive element | yes |
| Label text or leading icon | Action affordance | yes (at least one) |
| Chevron icon | Signals dropdown availability | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.menu-btn__icon-start` | Leading icon | Before label |
| Dropdown menu | On activation | External composition |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Single focusable element** — unlike split-button, menu-button is ONE button. The entire surface including the chevron is the tap target.
- [x] **Chevron must NOT be a separate `<button>`** — this is the key distinction from split-button. A naïve approach puts the chevron in a separate zone, breaking keyboard semantics.
- [x] **Open/close state** — chevron rotates 180° when menu is open. This is a CSS transform triggered by `aria-expanded="true"` — no JS class needed.
- [x] **Menu button without menu** — if the dropdown JS fails, the button must still be operable (degrade gracefully).
- [x] **Long label** — chevron must stay right-aligned regardless of label width. Use `display: flex; justify-content: space-between` or `margin-inline-start: auto` on chevron.

---

## 5. What designers customize most in practice

1. **Variant + role** — same as button
2. **Size** — same density ladder
3. **Chevron size** — scales with icon-size token
4. **Menu direction** — not a button token; external dropdown composition

---

## 6. Reference system study

### Material Design 3
- No direct equivalent. Closest is `DropdownButton` in other systems.

### Radix UI
- `DropdownMenu.Trigger` composed with a `Button` — single clickable area. Same approach.

### Ant Design
- `Dropdown` + `Button` — same single-zone pattern we use.
- Worth borrowing: `aria-haspopup="menu"` + `aria-expanded` — adopted.

---

## 7. Decision: What makes this component feel "right"

- **Chevron is part of the button, not separate** — clicking anywhere on the button opens the menu.
- **Chevron rotates on open** — `transform: rotate(180deg)` on `[aria-expanded="true"]` is the universal signal.
- **Chevron gap matches button icon gap** — same `--menu-btn-gap-{size}` token as `--btn-icon-gap-{size}`.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
