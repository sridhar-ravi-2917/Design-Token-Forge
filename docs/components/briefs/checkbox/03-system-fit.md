<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Checkbox — System Fit & Cross-Component Contracts

> Gate 0 file — retroactively completed. Token names verified against checkbox.tokens.css.

---

## 1. Token inheritance

| Token | Source | This component uses it for |
|-------|--------|---------------------------|
| `--focus-ring-width` | global | Focus ring width (2px) |
| `--focus-ring-offset` | global | Focus ring offset from box edge |
| `--focus-ring-color` | global | Focus ring color (brand-500) |
| `--focus-ring-color-invalid` | global | Focus ring color when invalid (danger-500) |
| `--disabled-opacity` | global | Opacity on `[data-disabled]` root element (0.45) |
| `--motion-duration-fast` | global | Transition: border-color, background (200ms) |
| `--motion-easing-standard` | global | Transition easing |
| `--radius-sm` | global | Default box border-radius (~4px — "classic checkbox" feel) |
| `--color-brand-500` | T1 color | Checked fill (via `--checkbox-bg-checked`) |
| `--color-danger-500` | T1 color | Invalid border (via `--checkbox-border-color-invalid`) |

---

## 2. Height ladder participation

- [x] The `<label>` root element participates in tap-target height: `min-height: 44px`
- (n/a) The **box** does NOT match the full component height — it is independently sized per density

The checkbox is not a full-height bar like button/input. The tap target comes from `min-height` on the label; the box size follows the `--checkbox-box-size-{size}` independent ladder.

---

## 3. Sibling components that must visually align

| Sibling | What must align | How verified |
|---------|----------------|-------------|
| Radio | Box/circle size at same density | Both `checkbox-box-size-{size}` and `radio-circle-size-{size}` use the same value ladder (14→40px) |
| Toggle | Visual weight of track vs box at same density | Not formally linked — visually calibrated |
| Input | Label font-size at same density | `--checkbox-label-font-size-{size}` must match input label font-size |
| Button | Min tap-target height | Both must meet 44px |

---

## 4. Token naming consistency

- Prefix: `--checkbox-` (public) / `--_cb-` (internal switching vars)
- Size variants: `--checkbox-box-size-{size}`, `--checkbox-label-font-size-{size}`, `--checkbox-gap-{size}`
- State variants: encoded via CSS pseudo-classes (`:checked`, `:indeterminate`, `[data-indeterminate]`, `[data-invalid]`, `[data-disabled]`) — internal `--_cb-` vars set by these selectors
- Surface tokens: `--checkbox-bg-unchecked`, `--checkbox-bg-checked`, `--checkbox-border-color`, `--checkbox-border-color-checked`, `--checkbox-border-color-invalid`

---

## 5. What this component must NOT break in others

| If this primitive changes | Components affected | Regression test needed |
|--------------------------|-------------------|----------------------|
| `--color-brand-500` | checkbox checked fill, radio checked fill, button, badge | Visual snapshot + contrast |
| `--color-danger-500` | checkbox invalid, radio invalid, input invalid | Visual snapshot |
| `--radius-sm` | checkbox box, button (when radius-sm used), card corners | Visual snapshot |
| `--disabled-opacity` | checkbox, radio, toggle, button, input, select | All disabled states |
| `--focus-ring-color-invalid` | checkbox, radio, input, textarea, select | Invalid focus ring color |

---

## 6. a11y contracts (WCAG 2.1 AA minimum)

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target (WCAG 2.5.5) | 44×44px for the entire `<label>` | `min-height` on `<label>` |
| Focus visible (WCAG 2.4.7) | 2px solid ring, 2px offset | `:focus-visible` on hidden input, or `:focus-within` on label |
| Role / semantics | Native `<input type="checkbox">` — no extra role needed | Preserved in DOM |
| Indeterminate announcement | `aria-checked="mixed"` set by JS when `input.indeterminate = true` | JS consumer responsibility |
| Disabled state | `disabled` attribute on input (removes from tab order) | `[disabled]` CSS hook + JS |
| Contrast — label text | 4.5:1 minimum | `--checkbox-label-color` → `--color-ct-default` |
| Contrast — check icon | White on brand-500 minimum 3:1 | Auto-AA on-component verification |
| Invalid state visible | Border change + not color-only | Border weight change AND color change together |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared (label tap-target = yes, box = no)
- [x] Sibling alignment requirements listed (radio box matches checkbox box sizes)
- [x] Token naming conventions verified (`--checkbox-` public, `--_cb-` internal)
- [x] Primitive-change blast radius documented
- [x] WCAG AA contracts listed with enforcement method
