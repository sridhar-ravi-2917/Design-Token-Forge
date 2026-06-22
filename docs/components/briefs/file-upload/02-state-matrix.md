<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# File Upload — State × Variant Matrix

---

## State × Variant Matrix

| State | outlined (default) | filled | soft |
|-------|-------------------|--------|------|
| **Idle** | dashed outline, neutral bg | solid filled bg | tinted container bg |
| **Drag-over** | solid outline, role tint | deeper fill | deeper soft tint |
| **Error** | dashed red outline, error bg | red fill | red soft tint |
| **Disabled** | dim opacity, no drop target | same | same |
| **Loading** | no change on zone; file item shows progress | same | same |

### Mode × Variant matrix
| Mode | Variants |
|------|----------|
| `data-mode="dropzone"` (default) | outlined, filled, soft |
| `data-mode="button"` | outlined, filled, soft — in button-only layout |

### Roles
| Role | Accent color |
|------|-------------|
| brand (default) | brand-500 |
| danger | danger-500 |
| success | success-500 |
| warning | warning-400 |
| info | info-500 |
| neutral | neutral-500 |

---

## Compound rules

- Drag-over: `data-drag-over` on `.file-upload__dropzone` triggers CSS state change. JS manages attribute.
- Error: `data-error` on wrapper OR `data-state="error"` on `.file-upload__file-item`.
- File items use a separate `.file-upload__file-item` component style — not subject to variant.
- File removal: `data-removing` on item → opacity + height collapse transition.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] All 3 variants documented
- [x] All 6 roles documented
- [x] Drag-over state documented
- [x] Error state documented
- [x] Disabled state documented
- [x] Both modes (dropzone/button) covered
