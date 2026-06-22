<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# DatePicker — State × Variant Matrix

---

## State × Variant Matrix (day cells)

| Day state | Default | Today | Selected | In-range | Range start/end |
|-----------|---------|-------|----------|----------|----------------|
| **Idle** | subtle bg on hover | 2px brand border | brand fill | brand tint | brand fill (pill) |
| **Hover** | container bg | same + hover | hover fill | hover tint | hover fill |
| **Pressed** | deeper fill | same | pressed fill | pressed tint | pressed fill |
| **Disabled** | dim opacity, no hover | same | — | — | — |
| **Outside-month** | muted text, optional hide | — | — | — | — |

### Popover variant matrix
| Component state | Default popover | Inline |
|----------------|----------------|--------|
| Closed | hidden | always visible |
| Open | elevated popover (shadow-lg) | same placement |
| Focused (keyboard) | visible focus on active day | same |

---

## Compound rules

- Range selection: start/end cells get `--datepicker-day-radius` pill caps on their outer edge; `--datepicker-range-radius: 0px` on inner cells (flat caps).
- Today + selected: today indicator (border ring) rendered UNDER the selected fill.
- Disabled + outside-month: can combine — cells outside month that are also disabled must still be dimmed.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Day cell states documented (idle/hover/pressed/disabled/outside-month)
- [x] Popover variant states documented
- [x] Range selection compound rule documented
- [x] Today + selected compound rule documented
