<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Ring — State × Variant Matrix

---

## State × Variant Matrix

| State | filled (default) | outlined | soft |
|-------|-----------------|----------|------|
| **Default** | solid role arc, tinted track | arc with outlined track | tinted track + role arc |
| **Indeterminate** | arc animates rotating sweep | same | same |
| **Disabled** | reduced opacity | same | same |

### Role × Fill color mapping
| Role | Arc color | Soft track | Outlined track border |
|------|----------|-----------|----------------------|
| brand | brand-500 | brand-container-bg | brand-500 |
| danger | danger-500 | danger-container-bg | danger-500 |
| success | success-500 | success-container-bg | success-500 |
| warning | warning-400 | warning-container-bg | warning-400 |
| info | info-500 | info-container-bg | info-500 |
| neutral | neutral-500 | surface-base-cm-bg | neutral-400 |

---

## Compound rules

- SVG fill arc driven by CSS custom property `--progress` (0–100%). JS sets this via `style` attribute.
- `data-indeterminate` → fill arc has fixed partial length + rotate animation. `aria-valuenow` removed.
- `--ring-direction: reverse` flips fill direction for RTL layouts.
- Centered label font-size must not exceed ring inner diameter (`diameter - 2 × stroke - 4px`).

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] All 6 roles documented
- [x] Indeterminate state documented
- [x] Disabled state documented
- [x] RTL direction compound rule documented
