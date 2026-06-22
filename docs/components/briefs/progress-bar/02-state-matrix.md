<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Bar — State × Variant Matrix

---

## State × Variant Matrix

| State | filled (default) | outlined | soft |
|-------|-----------------|----------|------|
| **Default** | solid role fill, thin track bg | fill with outline on track | tinted track + fill |
| **Indeterminate** | fill animates sweep, no value | same | same |
| **Disabled** | reduced opacity | same | same |

### Role × Fill color mapping
| Role | Fill color | Soft track | Outlined border |
|------|-----------|-----------|----------------|
| brand | brand-500 | brand-container-bg | brand-500 |
| danger | danger-500 | danger-container-bg | danger-500 |
| success | success-500 | success-container-bg | success-500 |
| warning | warning-400 | warning-container-bg | warning-400 |
| info | info-500 | info-container-bg | info-500 |
| neutral | neutral-500 | surface-base-cm-bg | neutral-400 |

---

## Compound rules

- Buffer bar renders on top of track (same bg tone, slightly higher opacity than track) UNDER the fill bar.
- Indeterminate removes `aria-valuenow` from DOM — JS contract.
- `data-striped` adds diagonal repeating gradient on fill. `data-animated` animates stripe scroll.
- At 0% fill: width 0, no overflow cap visible. At 100%: fill exactly clips to track edge.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] All 6 roles documented
- [x] Indeterminate state documented
- [x] Disabled state documented
- [x] Buffer bar compound rule documented
- [x] Striped compound rule documented
