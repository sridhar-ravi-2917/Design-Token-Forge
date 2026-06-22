<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Badge — State × Variant Matrix

---

## State × Variant Matrix

| State | filled | outlined | soft | dot |
|-------|--------|---------|------|-----|
| **Default** | solid bg, white fg | transparent bg, brand border | tinted bg, brand fg | solid color disc |
| **Hover** (interactive) | bg-hover | container-bg tint | container-hover | bg-hover |
| **Disabled** | opacity=0.45 | opacity=0.45 | opacity=0.45 | opacity=0.45 |

> Badges are display-only in most contexts. Hover/disabled only apply when badge is clickable (e.g. removable tag, filterable label).

### Role × Variant combinations
| Role | filled bg | soft bg | outlined border |
|------|----------|---------|----------------|
| brand (default) | brand-500 | brand-100 | brand-500 |
| danger | danger-500 | danger-100 | danger-500 |
| success | success-500 | success-100 | success-500 |
| warning | warning-400 | warning-100 | warning-400 |
| info | info-500 | info-100 | info-500 |
| neutral | neutral-500 | neutral-100 | neutral-400 |

### Shape variants (via data-shape)
| Value | Radius |
|-------|--------|
| (default / pill) | `radius-full` |
| `rounded` | `radius-md` |
| `square` | `radius-xs` |

---

## Compound rules

- All roles work with all variants.
- Dot variant ignores text content, renders as a small circle.
- Interactive hover only applies when `data-interactive` or `<button>`/`<a>` wrapper used.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 4 variants documented
- [x] All 6 roles documented
- [x] Hover state scoped to interactive badges
- [x] Disabled state documented
- [x] Shape variants documented
- [x] Compound rules (role × variant matrix) documented
