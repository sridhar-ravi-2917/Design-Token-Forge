<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Checkbox — Anatomy Study

> Gate 0 file — retroactively completed after implementation. All decisions
> reflect what was built and why.

---

## 1. What this component IS (one sentence, concrete)

A binary (or tri-state) selection control that lets a user independently toggle a single option; unlike radio buttons, multiple checkboxes can be selected simultaneously and each is independent.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.checkbox` (`<label>`) | Root wrapper — connects click area to the native input | yes |
| `.checkbox__control` (`<input type="checkbox">`) | Actual form field — hidden visually but present in DOM for semantics/form submission | yes |
| `.checkbox__box` (`<span>`) | Styled visual indicator that replaces the native checkbox appearance | yes |
| `.checkbox__check` (SVG `<polyline>`) | Checkmark icon — shown when `checked` | yes (hidden unless checked) |
| `.checkbox__dash` (SVG `<line>`) | Dash icon — shown when `indeterminate` | yes (hidden unless indeterminate) |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.checkbox__label` (`<span>`) | When label text is shown | Optional — checkbox can be used icon-only |
| Description / hint text | Composed externally by the form row | Not part of the checkbox component itself |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Native input must remain in DOM** — visually hidden via `clip` + `position:absolute + `opacity:0`, NOT `display:none`. `display:none` removes it from the accessibility tree; focus and keyboard navigation break.
- [x] **Indeterminate state is JS-only** — CSS `:indeterminate` pseudo-class works, but `input.indeterminate` is not reflected by the HTML `indeterminate` attribute. JS must set `el.indeterminate = true` AND add `data-indeterminate` attribute for CSS hooks.
- [x] **SVG icon sizing** — the check/dash SVGs must scale with the box. Using `width/height: 100%` on the SVG with `viewBox="0 0 16 16"` and `stroke-width` as a token ensures proportional scaling.
- [x] **Long label text wrapping** — label wraps to multiple lines. The `.checkbox` root is `inline-flex align-items: flex-start` so the box stays top-aligned (not centered) with multi-line labels. At single-line, it looks centered due to matching heights.
- [x] **Invalid (error) state** — form validation requires a visual error indicator. This MUST be a distinct state (not just a color change on focus) — uses red border + error fill variant.
- [x] **Click area vs visual area** — the entire `<label>` is clickable. The tap target is the full label width, not just the box. This is the correct behavior per WCAG 2.5.5.
- [x] **RTL layout** — box appears on the left by default (in LTR). In RTL, the box should appear on the right. The `<label>` uses logical `flex-direction` — box order is HTML source order, which flips naturally in RTL with `flex-direction: row-reverse` or logical property.

---

## 5. What designers customize most in practice

1. **Checked fill color** (`--checkbox-bg-checked`) — the brand accent inside the box when checked
2. **Box size** (`--checkbox-box-size-{size}`) — density-appropriate selection indicator size
3. **Border color / width** (`--checkbox-border-color`, `--checkbox-box-border-width`) — how prominent the unchecked state feels
4. **Border radius** (`--checkbox-box-radius`) — square (0), slightly rounded (4px), or circular (9999px) — product personality
5. **Error state color** (`--checkbox-border-color-invalid`) — brand/system-specific red tone

---

## 6. Reference system study

### Material Design 3
- Component: Checkbox — https://m3.material.io/components/checkbox
- Key decisions: M3 uses a filled bg for checked state with white checkmark — same as our filled variant. M3 does not use SVG; it uses a Material Icon font icon. We chose inline SVG for portability.
- Worth borrowing: Ripple on the tap target (not adopted — not part of our motion system).

### Radix UI / shadcn
- Component: Checkbox — https://www.radix-ui.com/docs/primitives/components/checkbox
- Key decisions: Radix hides the native input and uses `role="checkbox"` on a `<button>`. We chose to keep the native `<input>` visually hidden — better for form submission without JS and screen reader compat.
- Worth borrowing: `data-state="checked/unchecked/indeterminate"` attribute pattern — our equivalent is `aria-checked` on the native input + CSS `:checked`, `:indeterminate` pseudo-classes.

### Apple HIG / macOS NSButton (checkbox style)
- Component: Toggles — https://developer.apple.com/design/human-interface-guidelines/toggles
- Key decisions: Apple checkboxes are always `radius-sm` (slightly rounded, not circular) — matches our default `--checkbox-box-radius: var(--radius-sm)`.
- Worth borrowing: The box background in checked state is ALWAYS filled (even in outlined variant in Apple's system). We use filled bg for checked in both variants — same decision.

---

## 7. Decision: What makes this component feel "right"

- **Box must be a square** — a non-square checkbox box looks broken. Width and height must always be equal (the `--checkbox-box-size-{size}` token is a single value applied to both dimensions).
- **Checked fill must contrast sharply with the box background** — white checkmark on brand fill, not a subtle tint.
- **Indeterminate must be visually distinct from both unchecked and checked** — the dash (not a check, not empty) is the universal signal.
- **Box size ~1.4× font-size** — slightly larger than the text cap-height feels balanced; much larger feels like a UI element from a different scale.
- **Stroke width on the SVG must scale proportionally** — hardcoded `stroke-width="2"` in the SVG works at base (20px box) but looks too thin at micro and too heavy at ultra. Use `stroke-width: var(--checkbox-check-stroke)` token.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English (become math in 01-math.md)
