<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Textarea — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A multi-line text input field where users type longer-form content, with the same variant/state system as Input but with variable height determined by content or an explicit row count.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.textarea` (wrapper `<div>`) | Root — carries variant/state attributes | yes |
| `<textarea>` | Native field | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.textarea__label` | When label shown | Same as input |
| `.textarea__helper` | Hint/error text | Same as input |
| `.textarea__char-count` | Character counter | Bottom-right aligned |
| Resize handle | `resize: vertical` | Native browser — not styled separately |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Height is variable** — unlike input, there is no fixed height. The `rows` attribute or `min-height` token sets the minimum. Auto-grow requires JS.
- [x] **Resize handle overlaps helper text** — if resize is enabled, the native handle sits in the bottom-right and may collide with char-count. Either disable resize or position char-count above it.
- [x] **Font-family must be explicitly set** — `<textarea>` defaults to `monospace` in some browsers. Always set `font-family: inherit`.
- [x] **Scrollbar appearance** — when content exceeds height, scrollbar appears. Style with `::-webkit-scrollbar` if needed, or leave browser default.
- [x] **Invalid state** — same as input — border + helper text, not color only.
- [x] **Readonly** — same as input — distinct from disabled.

---

## 5. What designers customize most in practice

1. **Min-height / rows** — minimum visible lines of text
2. **Variant** (`outline/filled`) — no underline variant (multi-line fields always need a full border)
3. **Resize behavior** — `none/vertical/both`
4. **Invalid state styling**
5. **Size** — density (font-size + padding)

---

## 6. Reference system study

### Material Design 3
- Filled + Outlined. No underline for textarea. Same decision — we exclude underline for textarea.
- Worth borrowing: min-height as a rows-equivalent token.

### Radix UI / shadcn
- `<Textarea>` with same variant system as Input.
- Worth borrowing: Shared token set with input.

### GitHub Primer
- `Textarea` is styled `<textarea>` — same variant approach.
- Worth borrowing: Auto-resize via JS `oninput` — documented as consumer responsibility.

---

## 7. Decision: What makes this component feel "right"

- **No underline variant** — multi-line fields need a complete border for legibility.
- **resize: vertical only** — horizontal resize breaks layout. Vertical resize is user-friendly.
- **Min-height = 3 rows worth** — a 1-row textarea looks like a confused input.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
