<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Slider — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--color-brand-500` | T1 | Default fill color |
| `--radius-full` | global | Track and thumb radius |
| `--shadow-sm` / `--shadow-md` | global | Thumb elevation |
| `--disabled-opacity` | global | Disabled state |
| `--focus-ring-color` | global | Focus outline color |

---

## 2. Height ladder participation

- (n/a) Slider does not participate in the cross-component height ladder (no `--slider-height-{size}`)
- [x] Slider uses its own TWO-dimensional size system: `--slider-track-h-{size}` × `--slider-thumb-w-{size}`

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Toggle | Visual weight of the "track" at `base` size: toggle track is 20×12px, slider track is 120×6px — same track height aesthetic language |
| Button | Fill color at same role — slider fill and button bg should feel like same brand color |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Role | `role="slider"` or native `<input type="range">` | HTML |
| Value | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | JS consumer |
| Label | `aria-label` or `<label for>` | Markup contract |
| Keyboard | Arrow keys change value | Native `<input>` or JS |
| Tap target | min 44×44px | CSS on thumb / native input |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Non-participation in height ladder explicitly noted
- [x] Own sizing system documented
- [x] Sibling cohesion contracts listed
- [x] WCAG AA keyboard + label contracts listed
