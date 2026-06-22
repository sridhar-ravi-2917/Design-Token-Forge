<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Radio — System Fit & Cross-Component Contracts

> Gate 0 file — retroactively completed. Token names verified against radio.tokens.css.

---

## 1. Token inheritance

| Token | Source | This component uses it for |
|-------|--------|---------------------------|
| `--focus-ring-width` | global | Focus ring width (2px) |
| `--focus-ring-offset` | global | Focus ring offset from circle edge |
| `--focus-ring-color` | global | Focus ring color (brand-500) |
| `--focus-ring-color-invalid` | global | Focus ring color when invalid (danger-500) |
| `--disabled-opacity` | global | Opacity on `[data-disabled]` root element (0.45) |
| `--motion-duration-fast` | global | Transition: border-color, dot scale (150–200ms) |
| `--motion-easing-standard` | global | Transition easing |
| `--color-brand-500` | T1 color | Checked ring fill + dot (via `--radio-bg-checked`, `--radio-dot-color`) |
| `--color-danger-500` | T1 color | Invalid border (via `--radio-border-color-invalid`) |
| `--color-fixed-white` | T0 fixed | Dot color on filled-checked variant |

---

## 2. Height ladder participation

- [x] The `<label>` root element participates in tap-target height: `min-height: 44px`
- (n/a) Circle is a visual sub-element — uses same size ladder as checkbox box, not the full component height

The radio circle and checkbox box use **identical size values** at every density level. This parity is a LOCKED system contract — both controls must feel the same visual weight when placed alongside each other in a form.

---

## 3. Sibling components that must visually align

| Sibling | What must align | How verified |
|---------|----------------|-------------|
| Checkbox | Circle/box size at same density (LOCKED contract) | `radio-circle-size-{size}` === `checkbox-box-size-{size}` |
| Checkbox | Border width (2px) at all sizes | Both hardcoded to 2px — must be co-updated |
| Checkbox | Label font-size at same density | `--radio-label-font-size-{size}` matches `--checkbox-label-font-size-{size}` |
| Input | Label font-size alignment in form rows | Same font-size ladder |
| Button | Min tap-target height | Both meet 44px |

---

## 4. Token naming consistency

- Prefix: `--radio-` (public) / `--_r-` (internal switching vars)
- Size variants: `--radio-circle-size-{size}`, `--radio-dot-size-{size}`, `--radio-label-font-size-{size}`, `--radio-gap-{size}`
- State variants: encoded via CSS pseudo-classes (`:checked`, `[data-invalid]`, `[data-disabled]`) — internal `--_r-` vars set by these selectors
- Group tokens: `--radio-group-gap-{size}` for vertical and horizontal layouts
- Surface tokens: `--radio-bg-unchecked`, `--radio-bg-checked`, `--radio-border-color`, `--radio-border-color-checked`, `--radio-border-color-invalid`, `--radio-dot-color`

---

## 5. What this component must NOT break in others

| If this primitive changes | Components affected | Regression test needed |
|--------------------------|-------------------|----------------------|
| `--color-brand-500` | radio checked fill, checkbox checked fill, button, badge | Visual snapshot + contrast |
| `--color-danger-500` | radio invalid, checkbox invalid, input invalid | Visual snapshot |
| `--disabled-opacity` | radio, checkbox, toggle, button, input, select | All disabled states |
| `--focus-ring-color-invalid` | radio, checkbox, input, textarea, select | Invalid focus ring color |
| Checkbox box size ladder | Radio circle sizes (parity contract) | Must be updated together — co-change required |

---

## 6. a11y contracts (WCAG 2.1 AA minimum)

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target (WCAG 2.5.5) | 44×44px for the entire `<label>` | `min-height` on `<label>` |
| Focus visible (WCAG 2.4.7) | 2px solid ring, 2px offset | `:focus-visible` on hidden input, or `:focus-within` on label |
| Role / semantics | Native `<input type="radio">` — no extra role needed | Preserved in DOM |
| Group semantics | `<fieldset>` + `<legend>` required for grouped options | HTML markup spec |
| Mutual exclusion | Browser-native for same-`name` inputs | No extra JS needed |
| Arrow key navigation | Browser-native within `<fieldset>` | Do NOT intercept arrow keys |
| Disabled state | `disabled` attribute on input (removes from tab order) | CSS `[disabled]` hook |
| Contrast — label text | 4.5:1 minimum | `--radio-label-color` → `--color-ct-default` |
| Contrast — dot on fill | White dot on brand-500 (filled variant) — minimum 3:1 | Auto-AA on-component verification |
| Invalid state visible | Border change (not color-only) | Border color + ring together signal error |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared (label tap-target = yes, circle = no)
- [x] Sibling alignment requirements listed (parity with checkbox locked)
- [x] Token naming conventions verified (`--radio-` public, `--_r-` internal)
- [x] Primitive-change blast radius documented
- [x] WCAG AA contracts listed with enforcement method
- [x] Group wrapper (`fieldset`/`legend`) a11y requirements listed
