<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# KBD — State × Variant Matrix

> KBD is display-only by default. Interactive states only apply in very specific contexts (e.g. a "press to trigger shortcut" button).

---

## State × Variant Matrix

| State | filled (default) | outlined | ghost |
|-------|-----------------|---------|-------|
| **Default** | bg=surface-base-cm-bg, border, bevel shadow | transparent, border visible | transparent, no border |
| **Hover** | (n/a — display) | (n/a) | (n/a) |
| **Active (keycap press)** | bevel shadow removed (pressed key look) | — | — |
| **Focus-visible** | (n/a — not focusable) | — | — |
| **Disabled** | (n/a — display only) | — | — |

### Separator (`.kbd__sep`) appearance
- Not a key cap — plain text, inherits surrounding text color
- Default: "+" between keys in a combo

---

## Compound rules

- `data-variant` and `data-size` can combine freely.
- The `:active` pressed state (bevel removal) is optional — only meaningful for interactive key caps.
- KBD components in text do NOT respond to keyboard navigation.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] No interactive states by default — display-only noted
- [x] Optional pressed state documented
- [x] Separator element documented
- [x] Compound rules noted
