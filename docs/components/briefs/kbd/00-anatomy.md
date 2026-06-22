<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# KBD — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A styled key-cap element that displays a keyboard key name or symbol, used in documentation, shortcut hints, and keyboard-shortcut UIs.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `<kbd class="kbd">` | Root — the key cap element | yes |
| Key label text | The key name (e.g. "Ctrl", "⌘", "Enter") | yes |

---

## 3. Maximum anatomy (optional)

| Slot | Present when |
|------|-------------|
| `.kbd-combo` wrapper | Multi-key shortcut (e.g. Ctrl + S) |
| `.kbd__sep` | Separator between keys in a combo ("+", "then") |

---

## 4. Real-world edge cases

- [x] **Minimum width** — single-character keys ("A", "S") need a minimum width to look like a real key, not a stretched pill. `min-width = height`.
- [x] **Symbol keys** — "⌘", "⌥", "⇧" are Unicode characters. Must render at the same font size as text keys, not larger (some fonts render Unicode symbols larger).
- [x] **Key combinations** — Ctrl+S is THREE elements: `<kbd>`, `<span class="kbd__sep">+</span>`, `<kbd>`. The separator must NOT be a key cap.
- [x] **Bottom shadow / bevel** — the distinctive "keycap" look comes from `box-shadow: 0 1px 0 0 <border-color>`. Without this, a `kbd` looks like a badge.
- [x] **Inline in running text** — `kbd` appears inside paragraphs. It must have `vertical-align: baseline` (or `middle`) to not disturb line height.

---

## 5. What designers customize most in practice

1. **Variant** — filled (default) / outlined / ghost
2. **Size** — match the surrounding text density
3. **Shadow** — keep/remove keycap bevel
4. **Separator character** — "+" vs "," vs "→"
5. **Font weight** — semibold for clarity in dense text

---

## 6. Reference system study

### GitHub Primer
- `<kbd>` native HTML element styled. Bottom shadow bevel is standard. Adopted.

### Tailwind UI
- KBD component. Same filled key-cap approach.

### Apple HIG
- `⌘K` notation in menus. Same pattern — small caps, key-cap visuals.

---

## 7. Decision: What makes this component feel "right"

- **The bottom shadow (bevel) is required** — it is the visual cue that distinguishes a key from a badge.
- **Monospace or slightly condensed font** — key labels like "PgUp" look better in a condensed face.
- **Min-width = height** — prevents narrow single-char keys from looking squished.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots (combo, separator) identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
