<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Icon Button — Anatomy Study

> Gate 0 file — retroactively completed after implementation.

---

## 1. What this component IS (one sentence, concrete)

A compact pressable control that carries a single icon with no visible text label, used where space is constrained (toolbars, table actions, floating actions) or the icon is universally understood.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.icon-btn` (`<button>`) | Root interactive element | yes |
| Icon (SVG or `<img>`) | The action affordance | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| Tooltip | Always recommended | Not part of component — composed externally via `data-tip` |
| Badge | Count overlay | Absolute-positioned top-right corner |
| `.icon-btn__spinner` | `data-loading="true"` | Replaces icon during async state |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Accessibility without visible label** — MUST have `aria-label` or `aria-labelledby`. A missing label is a WCAG 1.1.1 failure. CSS cannot enforce this — it is a markup contract.
- [x] **Square at every size** — padding-inline must equal `(height - icon-size) / 2`. Any mismatch produces a non-square button that looks "off" in toolbars where all icon buttons should be the same width.
- [x] **Icon size vs button size** — icon at 100% of button height is too large (no breathing room). Icon at 50% of height is the target.
- [x] **Focus ring on small sizes** — at `micro` (24px), a 2px ring with 2px offset produces a 28px ring. This must not be clipped by a parent `overflow: hidden`.
- [x] **Loading state without label** — spinner is same size as icon. Width does not change.
- [x] **Tooltip delay** — icon-only buttons MUST have a tooltip. The tooltip is not rendered by this component — the consumer composes it externally.

---

## 5. What designers customize most in practice

1. **Size** (`data-size`) — toolbar density
2. **Variant** (`data-variant="filled/outlined/ghost"`) — prominence level
3. **Role** (`data-role="danger/neutral"`) — semantic color
4. **Rounded** (`data-rounded`) — pill/circle shape
5. **Icon** — the SVG content itself (not a token concern)

---

## 6. Reference system study

### Material Design 3
- IconButton — 4 variants (filled, filled tonal, outlined, standard). Our system: same 3 variants as button.
- Worth borrowing: Square tap target at all sizes — adopted.

### Radix UI / shadcn
- `Button` with `size="icon"` — no separate component. We maintain a separate component because icon-button has distinct padding math (square, not rectangular).
- Worth borrowing: Tooltip always paired — documented as markup contract.

### GitHub Primer
- `IconButton` is a distinct component — validates our approach.
- Worth borrowing: `aria-label` enforcement at the component contract level.

---

## 7. Decision: What makes this component feel "right"

- **Must be a square** — width = height at every density. Any asymmetry in a toolbar is visually jarring.
- **Icon at ~50% of height** — breathing room between icon edge and button edge is half the remaining space.
- **Same height as Button at the same size** — they must sit side-by-side in toolbars without height mismatch.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
