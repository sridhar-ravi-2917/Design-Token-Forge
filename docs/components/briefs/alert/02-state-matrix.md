<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Alert — State × Variant Matrix

---

## State × Variant Matrix

| State | soft (default) | filled | outlined |
|-------|---------------|--------|---------|
| **Default** | tinted bg, role border | solid role bg, white fg | transparent bg, role border |
| **Dismissing** | opacity fades + height collapses | same | same |

### Role × Variant surface mapping
| Role | Soft bg | Filled bg | Outlined border | Icon/Accent color |
|------|---------|----------|----------------|------------------|
| brand | brand-container-bg | brand-500 | brand-500 | brand-500 |
| danger | danger-container-bg | danger-500 | danger-500 | danger-500 |
| success | success-container-bg | success-500 | success-500 | success-500 |
| warning | warning-container-bg | warning-400 | warning-400 | warning-400 |
| info | info-container-bg | info-500 | info-500 | info-500 |
| neutral | surface-base-cm-bg | neutral-600 | neutral-400 | neutral-500 |

### data-variant "default" (alias for soft)
`data-variant` not set = same as `data-variant="soft"`. Both resolve to the soft container style.

---

## Compound rules

- All 6 roles work with all 3 variants.
- `data-accent` can be added to any variant/role to show the left accent bar.
- Dismissing state: triggered by close button click → CSS transition `opacity 0 + height 0 + overflow hidden`.
- `role="alert"` (assertive) vs `role="status"` (polite) is set based on role semantic:
  - danger/error → `role="alert"`
  - info/success/warning/neutral → `role="status"`

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] All 6 roles documented
- [x] Dismissing state documented
- [x] Accent bar compound rule documented
- [x] ARIA role compound rule documented
