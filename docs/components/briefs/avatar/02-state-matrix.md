<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Avatar — State × Variant Matrix

> Avatar is primarily a display component. Interactive state (hover/focus) only applies when used as a button trigger.

---

## State × Variant Matrix

| State | Display (default) | Interactive (data-interactive) |
|-------|------------------|-------------------------------|
| **Default** | No state styling | - |
| **Hover** | (n/a — display) | bg slightly darkens (hover overlay) |
| **Focus-visible** | (n/a — display) | 2px brand outline |
| **Disabled** | (n/a — avatar never disabled) | (n/a) |

### Shape variants (data-shape)
| Value | Radius |
|-------|--------|
| (default / circle) | `radius-full` |
| `squircle` | 25% |
| `rounded-square` | `radius-lg` |

### Content modes (not variants — determined by available data)
| Mode | What renders |
|------|-------------|
| Photo | `<img>` fills container |
| Initials | 1–2 letter text, semantic bg color |
| Icon | Generic user icon, neutral bg |

### Role (data-role) — affects initials/icon bg
| Role | Background | Foreground |
|------|-----------|-----------|
| brand | brand-container-bg | brand-content |
| info | info-container-bg | info-content |
| success | success-container-bg | success-content |
| warning | warning-container-bg | warning-content |
| danger | danger-container-bg | danger-content |
| neutral | surface-base-cm-bg | surface-base-ct |

---

## Compound rules

- Photo mode hides the initials/icon entirely.
- On image load error: JS switches to initials mode, then icon mode if no initials available.
- Interactive hover/focus ONLY applies when `data-interactive` or used as `<button>`/`<a>`.

---

## ✅ State-matrix review checklist (must all be checked before Gate 0 passes)

- [x] Display vs interactive modes distinguished
- [x] All 3 shape variants documented
- [x] All 3 content modes documented
- [x] All 6 roles documented
- [x] Compound rules (image error fallback) documented
