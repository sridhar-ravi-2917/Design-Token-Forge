<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Input — Anatomy Study

> Gate 0 file — retroactively completed after implementation.

---

## 1. What this component IS (one sentence, concrete)

A single-line text field that accepts free-form user input, with optional leading/trailing affordances (icons, prefix text, suffix text) and supporting label and helper-text slots.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.input` (wrapper `<div>`) | Root — carries variant/state data attributes | yes |
| `<input type="text">` | Native field — keyboard, paste, form submission | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.input__label` | When label is shown | Floats above or sits outside the field |
| `.input__prefix-icon` | When a leading icon is needed | e.g. search icon |
| `.input__prefix-text` | When a currency/unit prefix is shown | e.g. "$" |
| `.input__suffix-icon` | When a trailing icon is needed | e.g. calendar, eye |
| `.input__suffix-text` | When a unit suffix is shown | e.g. "kg", ".com" |
| `.input__clear-btn` | When clearable | Icon button inside the field |
| `.input__helper` | Hint/error text below the field | |
| `.input__char-count` | Character counter | |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Label inside vs outside** — floating label (moves out of field on focus/filled) requires the wrapper to handle both states. A separate external label is simpler and preferred for a11y.
- [x] **Prefix/suffix width shifts field** — a leading icon reduces `padding-inline-start` of the `<input>` by the icon width. A naïve CSS-only approach clips text under the icon.
- [x] **Placeholder vs label** — placeholder is NOT a substitute for a label (WCAG 3.3.2). Both must coexist in practice.
- [x] **Readonly vs disabled** — readonly: user can read and copy but not edit, field participates in form submission. Disabled: user cannot interact, not submitted. Must be visually distinct.
- [x] **Invalid state** — must show error color on border AND helper text color. Color alone is WCAG 1.4.1 fail — combine with an icon or text.
- [x] **Autofill styles** — browser autofill sets `background-color` and `color` overriding component tokens. Use `box-shadow` trick: `box-shadow: 0 0 0 1000px white inset` to override autofill bg.
- [x] **RTL** — prefix icon goes on the right (logical `padding-inline-start` switches). Use logical properties throughout.

---

## 5. What designers customize most in practice

1. **Variant** (`outline/filled/underline`) — field visual framing
2. **Size** (`data-size`) — density
3. **Prefix/suffix** — contextual affordances
4. **Invalid state color** — error red matching brand system
5. **Border radius** — product personality

---

## 6. Reference system study

### Material Design 3
- Filled + Outlined variants. Floating label pattern.
- Worth borrowing: Underline variant (text field only bottom border). Our `underline` variant is inspired by this.

### Radix UI / shadcn
- Simple `<input>` with border, padding, radius tokens — no prefix/suffix slots in base component. Our approach adds them.
- Worth borrowing: `data-invalid` attribute approach — adopted.

### GitHub Primer
- `TextInput` with `leadingVisual` / `trailingVisual` slots — matches our prefix/suffix slots.
- Worth borrowing: Size token approach (small/medium/large) — we use 10-step density.

---

## 7. Decision: What makes this component feel "right"

- **Height matches button at same size** — so form rows with inputs and submit buttons align.
- **Padding-inline-start of the `<input>` adjusts for prefix/suffix content** — no overlap.
- **Border thickness 1px** — 2px is too heavy for a text field; 1px reads as crisp.
- **Underline variant border-radius is 0** — underline fields feel like document fields, not form fields.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified (7 slots)
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
