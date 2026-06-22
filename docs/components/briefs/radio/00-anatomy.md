<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Radio — Anatomy Study

> Gate 0 file — retroactively completed after implementation. All decisions
> reflect what was built and why.

---

## 1. What this component IS (one sentence, concrete)

A single-selection control used exclusively in groups where exactly one option must be chosen; unlike checkboxes, radio buttons are mutually exclusive within a named group and cannot be individually unchecked by clicking.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.radio` (`<label>`) | Root wrapper — connects click area to the native input | yes |
| `.radio__control` (`<input type="radio">`) | Actual form field — hidden visually but present in DOM for semantics, form submission, and keyboard nav | yes |
| `.radio__circle` (`<span>`) | Styled visual indicator — the outer ring | yes |
| `.radio__dot` (`<span>`) | Inner filled dot — appears when checked | yes (hidden unless checked) |

**Optional group wrapper:**

| Element | Role | Always present? |
|---------|------|-----------------|
| `.radio-group` (`<fieldset>`) | Semantic grouping of related radio options | no — required for groups, omit for single standalone |
| `.radio-group__legend` (`<legend>`) | Group label (required for screen readers when group is used) | yes when `.radio-group` is present |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.radio__label` (`<span>`) | When label text is shown | Optional — radio can be label-only for icon grids |
| `.radio-group` with `data-direction="horizontal"` | When options flow horizontally | Controlled by `data-direction` attribute on the group |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Native input must remain in DOM** — visually hidden via `clip` + `opacity:0`, NOT `display:none`. Removing it from the DOM loses form submission, keyboard navigation between radio options (arrow keys), and group semantics.
- [x] **Arrow key navigation is browser-native** — within a `<fieldset>` with the same `name`, arrow keys cycle between radio inputs automatically. Our component must NOT intercept arrow keys or add `tabindex` to the visual elements.
- [x] **Can NOT be "unselected"** — once a radio in a group is checked, it cannot be unchecked by clicking it again (browser behavior). If "clear" is needed, use a checkbox or an explicit "None" radio option.
- [x] **Dot size vs circle size at all densities** — the dot must always be centered inside the circle with a visible gap between them. A naïve `dot = circle / 2` produces too large a dot at small sizes and too small at large sizes.
- [x] **Invalid state in a group** — the `data-invalid` attribute should go on the `<fieldset>`, not on individual `<label>` elements. CSS selects `.radio[data-invalid]` or `.radio-group[data-invalid] .radio` for invalid styling.
- [x] **RTL layout** — circle appears on left by default (LTR). In RTL, the natural flex layout places it on the right with correct `dir="rtl"` propagation.
- [x] **Long label wrapping** — same as checkbox: `<label>` is `inline-flex align-items: flex-start`. Circle stays top-aligned when label wraps.

---

## 5. What designers customize most in practice

1. **Checked dot color** (`--radio-dot-color`) — the brand accent that fills the center dot
2. **Circle border color** (`--radio-border-color-checked`) — ring color when selected
3. **Circle size** (`--radio-circle-size-{size}`) — density-appropriate control size
4. **Dot size ratio** (`--radio-dot-size-{size}`) — relative size of inner dot to circle
5. **Group direction** (`data-direction="horizontal"`) — horizontal vs vertical layout

---

## 6. Reference system study

### Material Design 3
- Component: Radio button — https://m3.material.io/components/radio-button
- Key decisions: M3 uses a 20dp outer circle with a 10dp inner dot. The dot is 50% of the circle. Our approach uses a slightly smaller dot (~40% of circle) at small sizes to maintain visual spacing.
- Worth borrowing: The ripple on the tap-target (not adopted in our system). The 2dp gap between outer ring and inner dot — confirmed as the correct "breathing room" pattern.

### Radix UI / shadcn
- Component: Radio Group — https://www.radix-ui.com/docs/primitives/components/radio-group
- Key decisions: Radix uses `role="radiogroup"` on the group wrapper and `role="radio"` on each item (rendered as `<button>`). We keep the native `<input type="radio">` — better for form submission without JS.
- Worth borrowing: `data-state="checked/unchecked"` attribute — our equivalent is `:checked` CSS pseudo-class on the native input.

### Apple HIG / iOS UIRadioButton
- Component: Toggles & Radio — https://developer.apple.com/design/human-interface-guidelines/toggles
- Key decisions: Apple radio buttons are always perfectly circular with a centered dot. The outer ring disappears (becomes filled) when checked — different from our approach where the ring stays visible with the dot inside.
- Worth borrowing: The dot centering technique — CSS `margin: auto` inside a flex container.

### Windows Fluent UI
- System: Microsoft Fluent Design
- Key decisions: Fluent uses a 20×20px circle at all sizes (no density system). Our density-aware approach with 10 sizes is more flexible.
- Worth borrowing: The `border-width: 2px` for unchecked ring consistent with checkboxes — we match this.

---

## 7. Decision: What makes this component feel "right"

- **The circle must be a perfect circle** — `border-radius: 9999px` (or 50%) on both the outer circle and inner dot. Oval shapes look broken.
- **Dot must NOT touch the inner edge of the ring** — minimum 3px gap between dot edge and ring inner edge. Less feels suffocating; more feels disconnected.
- **Ring border must be 2px** — 1px ring disappears on low-DPI; 3px ring is too heavy at small sizes. 2px is consistent with checkbox border-width for visual coherence between form controls.
- **Checked state must show BOTH the filled dot AND a colored ring** — ring disappearing into fill (Apple style) works for Apple's brand, but our system needs the ring to stay visible since the ring IS the selection indicator in the outlined variant.
- **Group spacing must breathe** — items in a vertical group need `gap: 8-16px` depending on density, not just default `margin`.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed (including `fieldset`/`legend` group)
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English (become math in 01-math.md)
