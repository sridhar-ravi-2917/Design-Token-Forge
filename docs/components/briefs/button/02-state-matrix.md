<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Button — State × Variant Matrix

> Gate 0 file — retroactively completed. Confirmed against button.css.

---

## State × Variant Matrix

Roles: primary (brand-500 fill), danger (danger-500 fill), brand (same as primary by default), neutral (neutral-700 fill)

| State | Filled | Outlined | Ghost |
|-------|--------|---------|-------|
| **Default** | bg=role-500, color=on-component, border=none | bg=transparent, border=role-500, color=role-500 | bg=transparent, border=none, color=role-600 |
| **Hover** | bg=role-600 | bg=role-50, border=role-600 | bg=role-50 |
| **Pressed/Active** | bg=role-700 | bg=role-100, border=role-700 | bg=role-100 |
| **Focus-visible** | +2px ring (role-500, 2px offset) | +2px ring (role-500, 2px offset) | +2px ring (role-500, 2px offset) |
| **Disabled** | opacity=0.45, no pointer events | opacity=0.45 | opacity=0.45 |
| **Loading** | spinner shows, label visible (or hidden), no interaction | same | same |

---

## Compounding rules

1. **Disabled + loading** → disabled wins. No spinner animation.
2. **Hover + focus-visible** → both apply — hover bg + focus ring simultaneously.
3. **Loading + focus-visible** → both apply — spinner + focus ring.
4. **Role change** → only fill/border/text color changes. All state behavior identical across roles.
5. **Rounded modifier** → only border-radius changes. No state behavior difference.

---

## Visual change summary per state

| State | Primary change | Secondary change |
|-------|---------------|-----------------|
| hover | bg/border shifts 1 step darker | cursor: pointer |
| pressed | bg/border shifts 2 steps darker | slight scale or shadow change (if motion enabled) |
| focus-visible | 2px ring, role-500, 2px offset | ring follows border-radius curve |
| disabled | 0.45 opacity on root | no pointer events |
| loading | spinner element appears | label may dim; button width locked |

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Every (state × variant) cell filled — no blanks
- [x] Compounding rules defined for all multi-state cases
- [x] Focus ring tied to global tokens
- [x] Role × variant matrix is orthogonal (roles don't add new variants)
- [x] Disabled uses opacity-only (WCAG 1.4.3 exempt)
