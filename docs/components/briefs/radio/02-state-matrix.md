<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Radio — State × Variant Matrix

> Gate 0 file — retroactively completed. Values confirmed against radio.css.

---

## State × Variant Matrix

Legend:
- `ring-bg` = `.radio__circle` background fill
- `ring-border` = `.radio__circle` border color
- `dot` = `.radio__dot` fill color (visible only when checked)

| State | Filled — Unchecked | Filled — Checked | Outlined — Unchecked | Outlined — Checked |
|-------|-------------------|-----------------|---------------------|-------------------|
| **Default** | ring-bg=white, border=neutral-300, dot hidden | ring-bg=brand-500, border=brand-500, dot=white | ring-bg=transparent, border=neutral-400, dot hidden | ring-bg=brand-100, border=brand-500, dot=brand-500 |
| **Hover** | border=neutral-400, ring-bg=neutral-50 | ring-bg=brand-600, border=brand-600 | border=neutral-500 | ring-bg=brand-200, border=brand-600 |
| **Pressed** | ring-bg=neutral-100, border=neutral-500 | ring-bg=brand-700, border=brand-700 | ring-bg=neutral-50, border=neutral-600 | ring-bg=brand-300, border=brand-700 |
| **Focus-visible** | +2px ring, 2px offset, brand-500 | +2px ring on checked state | +2px ring, 2px offset, brand-500 | +2px ring on checked state |
| **Disabled** | opacity=0.45 on root `<label>` | opacity=0.45 | opacity=0.45 | opacity=0.45 |
| **Invalid** | border=danger-500, ring-bg=danger-50 | border=danger-500, ring-bg=danger-500, dot=white | border=danger-500 | border=danger-500, ring-bg=danger-100 |

> There is no "indeterminate" state for radio — radio buttons are strictly binary within a group.
> The group's invalid state (`[data-invalid]` on `.radio-group`) applies to all child `.radio` elements.

---

## Compounding rules

When multiple states apply simultaneously:

1. **Disabled + any other state** → disabled (opacity=0.45) wins unconditionally. `pointer-events: none`. No hover or pressed effects.
2. **Invalid + hover** → invalid border shifts 1 step darker on hover. Both invalid color AND hover interaction visible.
3. **Invalid + focus-visible** → focus ring uses `--focus-ring-color-invalid` (danger-500). The ring + red border together signal the error.
4. **Checked + hover** → hover bg darkens further (brand-600). The dot remains visible inside.
5. **Group invalid** → all `.radio` children get invalid styling via `.radio-group[data-invalid] .radio` selector cascade.

---

## Visual change summary per state

| State | Primary change | Secondary change |
|-------|---------------|-----------------|
| hover | Border darkens 1 step; unchecked bg gets subtle tint | cursor=pointer |
| pressed | Ring bg darkens (checked: deeper brand; unchecked: neutral tint) | no scale/transform |
| checked | Dot appears (scale from 0 → full size, 150ms); ring fills brand color | smooth CSS transition |
| focus-visible | 2px ring, 2px offset, brand-500 (or danger-500 if invalid) | Appears on outer `<label>` via `:focus-within` |
| disabled | 0.45 opacity on entire `<label>` | no pointer events |
| invalid | Border turns danger-500; unchecked ring-bg gets danger tint | error focus ring color |

---

## Group layout states

The `.radio-group` wrapper adds layout behavior:

| Attribute | Effect |
|-----------|--------|
| `data-direction="vertical"` (default) | Items stack vertically with `gap: var(--radio-group-gap-{size})` |
| `data-direction="horizontal"` | Items flow horizontally with `flex-wrap: wrap` |
| `data-invalid` | Applies invalid styling to all child `.radio` elements |

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled — no blanks
- [x] No indeterminate state — confirmed correct (radio buttons cannot be indeterminate)
- [x] Compounding rules defined for all multi-state cases
- [x] Invalid state documented — applied at group level AND individual level
- [x] Focus ring: tied to global tokens; uses danger color when invalid
- [x] Disabled: confirmed opacity-only (WCAG 1.4.3 exempt)
- [x] Group layout states documented
