<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Tooltip — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.tooltip                     wrapper  (role="tooltip", aria-hidden="true")
├── .tooltip__arrow          directional caret
├── .tooltip__icon           optional leading icon
├── .tooltip__title          optional bold label
└── .tooltip__body           main text
```

Trigger: any element with `aria-describedby="[tooltip-id]"` or `data-tip="..."`.

---

## Edge cases

1. **Arrow direction** — 4 placement values (top/right/bottom/left). Arrow offset token ensures caret aligns to trigger center even on short tooltips.
2. **Rich content** — optional `.tooltip__title` + `.tooltip__body` enables two-line tooltip. Single-text tooltip only uses `.tooltip__body`.
3. **Max-width clamp** — per-size max-width (180/240/320px) prevents wrapping on very long strings. Exceeding max-width wraps text but never truncates.
4. **Enter animation** — `tooltip-enter` keyframe with scale + opacity. `prefers-reduced-motion` should suppress scale.
5. **Pointer events disabled** — `pointer-events: none` on `.tooltip` itself — only the trigger receives events.
6. **Danger/warning variant** — semantic variants (danger, warning, info, success) use filled role bg for urgency differentiation (e.g. validation error inline).

---

## Reference systems

| System | Pattern |
|--------|---------|
| Radix UI Tooltip | Portal-based, `TooltipContent` with side/sideOffset props, collision-aware |
| Material Design 3 | Single-line plain or rich tooltip, no arrow option, 500ms delay |
| GitHub Tooltip | CSS-only `data-tip::before/after` pseudo-element pattern |
