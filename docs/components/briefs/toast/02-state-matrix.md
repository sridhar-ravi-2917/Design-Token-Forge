<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Toast — State × Variant Matrix

---

## State × Variant Matrix

| State | soft (default) | filled | outlined |
|-------|---------------|--------|---------|
| **Default** | tinted bg, role border | solid role bg, white fg | transparent bg, role border |
| **Dismissing** | opacity + height → 0 | same | same |
| **Persistent** | no auto-dismiss, close required | same | same |

### Role × Variant surface mapping
| Role | Soft bg | Filled bg | Outlined border | Accent color |
|------|---------|----------|----------------|-------------|
| brand | brand-container-bg | brand-500 | brand-500 | brand-500 |
| danger | danger-container-bg | danger-500 | danger-500 | danger-500 |
| success | success-container-bg | success-500 | success-500 | success-500 |
| warning | warning-container-bg | warning-400 | warning-400 | warning-400 |
| info | info-container-bg | info-500 | info-500 | info-500 |
| neutral | surface-base-cm-bg | neutral-600 | neutral-400 | neutral-500 |

---

## Compound rules

- `data-persistent` + no `.toast__close` is invalid — close is mandatory when persistent.
- `data-accent` on any variant/role shows the left bar.
- ARIA live region: `role="status"` (polite) for info/success/warning/neutral, `role="alert"` (assertive) for danger.
- Stacking z-index managed by portal JS, not CSS.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] All 6 roles documented
- [x] Dismissing state documented
- [x] Persistent state documented
- [x] Compound ARIA rule documented
