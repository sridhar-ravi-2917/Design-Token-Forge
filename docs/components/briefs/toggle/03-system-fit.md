<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Toggle (Switch) — System Fit & Cross-Component Contracts

> Gate 0 file — retroactively completed. Token names verified against toggle.tokens.css.

---

## 1. Token inheritance

| Token | Source | This component uses it for |
|-------|--------|---------------------------|
| `--focus-ring-width` | global | Focus ring width on outer `<button>` |
| `--focus-ring-offset` | global | Focus ring offset from track edge |
| `--focus-ring-color` | global | Focus ring color (brand-500 by default) |
| `--disabled-opacity` | global | Opacity on `[data-disabled]` root element |
| `--motion-duration-fast` | global | Thumb travel + track bg transition (200ms) |
| `--motion-duration-base` | global | Full switch transition duration reference |
| `--motion-easing-standard` | global | Easing for all transitions |
| `--shadow-sm` | global | Thumb default drop-shadow |
| `--shadow-md` | global | Thumb pressed drop-shadow (heavier) |
| `--radius-full` | global | Track + thumb border-radius (pill/circle) |
| `--color-brand-500` | T1 color | Checked track fill (via `--switch-track-bg-on`) |

---

## 2. Height ladder participation

- [x] The outer `<button>` participates in the tap-target height ladder (min 44px)
- (n/a) The **track** does NOT participate — it has its own smaller height per density

The toggle is not a full-height interactive surface like button/input/select. The track is purely visual. Only the `min-height` on `<button>` must meet the height ladder for tap-target compliance.

---

## 3. Sibling components that must visually align

| Sibling | What must align | How verified |
|---------|----------------|-------------|
| Button | Tap target height at same size | `min-height` on outer `<button>` matches `--btn-height-{size}` |
| Input | Vertical alignment when placed in a form row | Both use `vertical-align: middle` |
| Checkbox | Track/box size visual weight at same size | Not formally linked — both independently calibrated |
| Radio | Same as checkbox | Same |

---

## 4. Token naming consistency

- Prefix: `--switch-` (public) / `--_sw-` (internal switching vars)
- Size variants: `--switch-track-w-{size}`, `--switch-track-h-{size}`, `--switch-thumb-size-{size}`
- Internal vars: `--_sw-track-w`, `--_sw-track-h`, `--_sw-thumb-size`, `--_sw-travel`, `--_sw-border-w`, `--_sw-track-bg-off`, `--_sw-track-bg-on`, `--_sw-track-border-off`, `--_sw-track-border-on`
- State encoding: internal vars updated by `[aria-checked="true"]`, `[data-disabled]`, `[data-loading]`, `.switch:hover`, `.switch:active` selectors
- No public tokens reference internal `--_sw-` vars — one-way dependency

---

## 5. What this component must NOT break in others

| If this primitive changes | Components affected | Regression test needed |
|--------------------------|-------------------|----------------------|
| `--color-brand-500` | toggle (checked fill), button, badge, alert | Visual snapshot + contrast audit |
| `--shadow-sm` / `--shadow-md` | toggle thumb shadow, card, modal | Visual snapshot |
| `--radius-full` | toggle track + thumb, button pill, badge | Visual snapshot |
| `--motion-duration-fast` | toggle thumb travel, button ripple | Playwright animation test |
| `--disabled-opacity` | toggle, button, input, select, checkbox, radio | All disabled states |

---

## 6. a11y contracts (WCAG 2.1 AA minimum)

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target (WCAG 2.5.5) | 44×44px | `min-height: var(--switch-min-tap-target)` on `<button>` |
| Focus visible (WCAG 2.4.7) | 2px solid ring, 2px offset | `:focus-visible` ring on `<button>` |
| Role attribute | `role="switch"` | In HTML markup spec |
| State announcement | `aria-checked="true/false"` | Updated via JS on click |
| Disabled state | `disabled` attribute + `data-disabled` | CSS pointer-events:none + opacity |
| Color-only state (WCAG 1.4.1) | Not color-only — thumb position also changes | Thumb travel communicates checked state |
| Contrast — label text | 4.5:1 minimum | `--switch-label-color` → `--color-ct-default` |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared (outer button = yes, track = no)
- [x] Sibling alignment requirements listed
- [x] Token naming conventions verified (`--switch-` public, `--_sw-` internal)
- [x] Primitive-change blast radius documented
- [x] WCAG AA contracts listed with enforcement method
