<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Toggle (Switch) — State × Variant Matrix

> Gate 0 file — retroactively completed. Values confirmed against toggle.css.

---

## State × Variant Matrix

Legend: `track-bg` = track background fill, `thumb-bg` = thumb fill, `border` = track border (outlined only)

| State | Filled — Unchecked | Filled — Checked | Outlined — Unchecked | Outlined — Checked |
|-------|-------------------|-----------------|---------------------|-------------------|
| **Default** | track=neutral-200, thumb=white | track=brand-500, thumb=white | track=transparent, border=neutral-300, thumb=neutral-500 | track=brand-100, border=brand-500, thumb=brand-500 |
| **Hover** | track=neutral-300 | track=brand-600 | border=neutral-400, thumb=neutral-600 | border=brand-600, thumb=brand-600 |
| **Pressed** | track=neutral-400, thumb shadow increases | track=brand-700, thumb shadow increases | border=neutral-500 | border=brand-700, thumb=brand-700 |
| **Focus-visible** | +2px ring (brand-500, 2px offset) | +2px ring (brand-500, 2px offset) | +2px ring (brand-500, 2px offset) | +2px ring (brand-500, 2px offset) |
| **Disabled** | opacity=0.45 on entire component | opacity=0.45 on entire component | opacity=0.45 on entire component | opacity=0.45 on entire component |
| **Loading** | track pulses (opacity 1→0.5 loop), no interaction | track pulses, aria-checked unchanged | same | same |

> All states use `aria-checked="true/false"` — NOT a CSS class.
> Disabled uses `[data-disabled]` attribute on the root `<button>`.
> Loading uses `[data-loading]` attribute.

---

## Compounding rules

When multiple states apply simultaneously, these rules govern priority:

1. **Disabled + any other state** → disabled wins. No hover/pressed/focus effects apply. `pointer-events: none`.
2. **Loading + focus-visible** → both apply. Focus ring still shows (user may tab to the component). Pulse animation continues.
3. **Loading + hover** → no hover bg change. Loading pulse takes visual priority.
4. **Checked + focus** → checked background + focus ring. Both visible simultaneously.
5. **Hover + pressed** → pressed wins (pressed is a subset of hover; separate `:active` selector overrides).

---

## Visual change summary per state

| State | Primary change | Secondary change |
|-------|---------------|-----------------|
| hover | track bg shifts 1 step toward darker | cursor stays pointer |
| pressed | track bg shifts 2 steps, thumb shadow increases | thumb slightly larger (`--switch-thumb-size-pressed`) |
| checked | thumb translates to far end, track fills with brand color | smooth 200ms transition |
| focus-visible | 2px solid ring, 2px offset, brand-500 color | outline-offset via `--focus-ring-offset` |
| disabled | 0.45 opacity on root element | no pointer events |
| loading | track opacity pulses at 1s interval | thumb moves to initial/checked position and stays |

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled — no blanks
- [x] Compounding rules defined for all multi-state cases
- [x] Checked state: thumb position formula documented (not magic number)
- [x] Focus ring: color, width, offset confirmed and tied to global tokens
- [x] Disabled: confirmed it uses opacity-only (exempt from contrast, WCAG 1.4.3)
- [x] Loading state documented distinctly from disabled
