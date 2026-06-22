<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Toggle (Switch) — Anatomy Study

> Gate 0 file — retroactively completed after implementation. All decisions
> reflect what was built and why.

---

## 1. What this component IS (one sentence, concrete)

A binary state control rendered as a sliding thumb on a pill-shaped track; used exclusively for immediately-applied on/off settings — NOT for form submissions or multi-choice selection.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.switch` (`<button role="switch">`) | Root interactive element, carries `aria-checked` | yes |
| `.switch__track` | Visual rail — shows off/on fill and border | yes |
| `.switch__thumb` | Sliding circular indicator — communicates state via position | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.switch-label` wrapper (`<label>`) | When a text label is shown | Wraps both the `<button>` and the text span |
| `.switch-label__text` | When label text is present | Receives `--switch-label-font-size`, `--switch-label-color` |
| Loading state pulse | `data-loading="true"` | Track pulses via `switch-pulse` keyframe — no spinner slot needed |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Long label text** — label sits adjacent to track; it wraps independently. Track size never changes due to label length. The `<label>` wrapper uses `inline-flex` so they sit side-by-side.
- [x] **Tap target vs visible size** — track at `micro` (16px tall) is far below 44px. The `<button>` carries `min-height: var(--switch-min-tap-target)` (44px) so the invisible tap area is correct even when the track appears small.
- [x] **Thumb travel formula** — thumb must travel exactly `track-width − track-height` pixels when checked. This must be computed at every size or the thumb overshoots/undershoots the rail edge.
- [x] **Thumb inset** — thumb is inset `(track-height − thumb-size) / 2` from the track edges. A naïve `top:0` makes the thumb protrude.
- [x] **Outline variant border width** — the border eats into the track interior, so the thumb's inset must account for `border-width` when outline variant is active. Internal var `--_sw-border-w` handles this.
- [x] **Disabled vs loading** — both show reduced interactivity but loading adds the pulse animation. `data-disabled` uses opacity; `data-loading` adds `animation`.
- [x] **RTL layout** — thumb starts on the right in RTL languages when `aria-checked="false"`. The translate uses `logical` direction. Implemented via `[dir="rtl"]` selector reversing `translateX` sign.
- [x] **Focus ring on a compound element** — the focus ring sits on the outer `<button>`, not on the inner track/thumb. Offset must clear the track boundary.

---

## 5. What designers customize most in practice

1. **Track color when checked** (`--switch-track-bg-on`) — the "active" brand color
2. **Track color when unchecked** (`--switch-track-bg-off`) — neutral muted fill
3. **Track size** — width and height via density size selector
4. **Border radius** — `--switch-track-radius` for track, `--switch-thumb-radius` for thumb (full = circle, none = square novelty)
5. **Thumb shadow** — `--switch-thumb-shadow` for depth; removing it flattens the look

---

## 6. Reference system study

### Material Design 3
- Component: Switch — https://m3.material.io/components/switch
- Key decisions: M3 allows an icon inside the thumb (check/cross). We chose NOT to include this — it adds complexity without enough benefit in our component set.
- Worth borrowing: The 3-step checked animation (thumb expands on press, thumb travels, thumb contracts) — captured in our `--switch-thumb-size-pressed` token.

### Radix UI / shadcn
- Component: Switch — https://www.radix-ui.com/docs/primitives/components/switch
- Key decisions: Radix renders as `<button role="switch">` with a `<span>` thumb inside a `<span>` track — identical to our structure.
- Worth borrowing: The `aria-checked` state handling pattern; our implementation mirrors it exactly.

### Apple HIG / iOS UISwitch
- Component: Toggle — https://developer.apple.com/design/human-interface-guidelines/toggles
- Key decisions: Apple uses green for "on" universally. Our system uses brand-500 for "on", not a semantic color — this is intentional for product theming.
- Worth borrowing: Thumb inset rule (thumb slightly smaller than track height, centered), shadow on thumb for depth — both adopted.

### GitHub Primer
- System: GitHub Primer Design System
- Key decisions: Primer does not include a Switch — uses `<input type="checkbox">` styled as toggle. We chose the `<button role="switch">` pattern for better semantic clarity and composability.
- Key decisions: Confirms our thumb-travel formula approach is correct.

---

## 7. Decision: What makes this component feel "right"

- **Thumb must be a true circle** — `border-radius: 9999px` on the thumb. Square or oval thumbs feel broken.
- **Track width ≈ 1.75× height** — narrower feels like a pill badge, wider feels like a progress bar. This ratio is maintained across all sizes.
- **Thumb travel must be exact** — `translateX(track-width − track-height)` when checked. Any overshoot/undershoot is immediately visible.
- **Thumb has a shadow** — `box-shadow: var(--shadow-sm)` creates the "raised button on a surface" feel. Without it the thumb reads as a flat dot.
- **Transition must feel springy but not slow** — `250ms ease` for the track bg color, `200ms ease` for the thumb travel.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English (become math in 01-math.md)
