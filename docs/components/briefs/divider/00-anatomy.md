<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Divider — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A single-line visual separator that partitions UI sections horizontally or vertically, with optional centered label text.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.divider` (or `<hr class="divider">`) | The separator line | yes |

---

## 3. Maximum anatomy (optional)

| Slot | Present when |
|------|-------------|
| `.divider__label` | Optional center label (e.g. "or", "2024") |

---

## 4. Real-world edge cases

- [x] **Semantic HTML** — use `<hr>` for content dividers (semantic separation). Use `<div class="divider" role="separator">` for purely visual dividers. Both must look identical.
- [x] **Vertical divider** — `data-direction="vertical"` must produce a 1px vertical line. Flexbox siblings need `align-self:stretch` or explicit height.
- [x] **Label + line alignment** — the label must be centered with equal-length lines on each side. A flex + `::before`/`::after` or two `<span>` lines approach works. Lines must be equal width regardless of label length.
- [x] **Inset divider** — `--div-indent-start` / `--div-indent-end` allow indented dividers (e.g. in a list where items have a leading avatar — the divider should not span the avatar column).
- [x] **In flex/grid containers** — a horizontal `<hr>` inside a `display:flex; flex-direction:row` container collapses to 0 width. Must use `width:100%` and `flex:none` or be in a block context.

---

## 5. What designers customize most in practice

1. **Color** — subtle vs strong (muted vs prominent)
2. **Thickness** — 1px default vs 2px for major section breaks
3. **Style** — solid / dashed / dotted
4. **Label** — section heading text embedded in the line
5. **Spacing** — block margin above and below

---

## 6. Reference system study

### Material Design 3
- Divider. Full-width and inset variants. Our `--div-indent-*` implements inset.

### GitHub Primer
- `<hr>` with minimal styling. We extend with label slot and variants.

### Atlassian Design System
- Divider with label text. Same pattern — adopted.

---

## 7. Decision: What makes this component feel "right"

- **Color is always a border token, never a surface token** — dividers separate, they don't fill.
- **Default thickness is 1px** — anything thicker should be an explicit design decision, not a default.
- **Label should feel lighter than the surrounding text** — `--div-label-color: --color-text-muted`.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] Optional label slot identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
