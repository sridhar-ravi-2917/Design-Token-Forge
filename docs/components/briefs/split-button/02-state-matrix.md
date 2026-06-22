<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Split Button — State × Variant Matrix

---

## State × Variant Matrix

Each zone (action, toggle) has its own interactive states. The wrapper carries disabled/loading states.

| State | Action zone | Toggle zone | Notes |
|-------|------------|------------|-------|
| **Default** | Same as button filled/outlined/ghost | Same surface, chevron icon | Both share the same surface style |
| **Hover — action** | action bg darkens 1 step | toggle unchanged | Hover applies only to the hovered zone |
| **Hover — toggle** | action unchanged | toggle bg darkens 1 step | |
| **Pressed — action** | action bg darkens 2 steps | unchanged | |
| **Pressed — toggle** | unchanged | toggle bg darkens 2 steps | |
| **Focus-visible** | Ring on WRAPPER (`:has(:focus-visible)`) | Same wrapper ring | Ring never goes on inner zones |
| **Disabled** | `data-disabled` on wrapper → opacity=0.45 on both | Same | Wrapper disables both zones |
| **Loading** | spinner in action zone | toggle remains interactive | Only action zone shows loading |

---

## Compounding rules

1. **Disabled beats all** — wrapper `[data-disabled]` overrides all inner zone states.
2. **Two focus rings** — when action zone is focused, then Tab moves to toggle zone — each gets its own ring via `.split-btn:has(.split-btn__action:focus-visible)` and `.split-btn:has(.split-btn__toggle:focus-visible)`.
3. **Loading + hover on toggle** — toggle hover still applies while action is loading.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every cell filled — action and toggle zones documented separately
- [x] Focus ring on WRAPPER (not inner zones) — critical decision documented
- [x] Disabled applies to wrapper and propagates to both zones
- [x] Compounding rules defined
- [x] Disabled uses opacity-only
