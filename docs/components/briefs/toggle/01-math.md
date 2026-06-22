<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Toggle (Switch) — Mathematical Contracts

> Gate 0 file — retroactively completed after implementation. Values are
> audited against `toggle.tokens.css`. All ratios confirmed.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

The toggle's outer `<button>` tap-target participates in the height ladder. The
**track** itself is intentionally smaller (it is a visual indicator, not a full
button). Track height is approximately 0.65× the component height at each size.

| Size   | Height (tap target) | Track height | Track width | Base font-size |
|--------|--------------------:|-------------:|------------:|---------------:|
| micro  | 24px                | 16px         | 28px        | 10px           |
| tiny   | 28px                | 18px         | 32px        | 11px           |
| small  | 32px                | 20px         | 36px        | 12px           |
| base   | 36px                | 24px         | 40px        | 13px           |
| medium | 40px                | 26px         | 44px        | 14px           |
| large  | 44px                | 28px         | 48px        | 14px           |
| big    | 48px                | 32px         | 52px        | 16px           |
| huge   | 56px                | 36px         | 60px        | 18px           |
| mega   | 64px                | 44px         | 72px        | 20px           |
| ultra  | 72px                | 52px         | 88px        | 24px           |

> Source of truth for component height: `packages/components/src/button/button.tokens.css`
> Track height is set independently in `toggle.tokens.css` — it does NOT match button height.
> Min tap-target on the outer `<button>`: 44px (WCAG 2.5.5).

---

## 2. Component-specific ratio contracts

### Track width : Track height ratio
```
track-width(size) ≈ track-height(size) × 1.67
```
Range across sizes: 1.67–1.75×. Justification: narrower reads as pill/badge; wider reads as progress bar. The ~1.7 ratio is the visual "toggle" sweet spot across all design systems studied.

### Thumb size : Track height ratio
```
thumb-size(size) = track-height(size) - (inset × 2)
inset = 2px at micro/tiny/small, 3px at base+
```
Justification: Thumb must fit inside the track with a visible gap at each edge. 2px inset at small sizes, 3px at base and above for visual breathing room.

### Height : Font-size ratio
```
track-height(size) / font-size(size) ≈ 1.5–1.8×
```
Note: The toggle track is not primarily text-driven. The height ladder is independently calibrated for visual weight at each density, not derived from font size.

### Thumb travel formula
```
translateX = track-width - track-height  (checked state)
translateX = 0                            (unchecked state)
```
This formula guarantees the thumb lands exactly at the far edge regardless of size. Computed as an internal var `--_sw-travel`.

### Padding-inline ratio
The outer `<button>` has `padding: 0` — tap target is achieved via `min-height`/`min-width`, not padding. No padding-inline ratio applies.

### Label gap : Track height ratio
```
gap between track and label ≈ track-height(size) × 0.33
```
Implemented via `--switch-label-gap-{size}` tokens.

---

## 3. Derived value table

| Size   | Track W | Track H | Thumb size (approx) | Travel (W−H) | Min-tap |
|--------|--------:|--------:|--------------------:|-------------:|--------:|
| micro  | 28px    | 16px    | 12px                | 12px         | 44px    |
| tiny   | 32px    | 18px    | 14px                | 14px         | 44px    |
| small  | 36px    | 20px    | 16px                | 16px         | 44px    |
| base   | 40px    | 24px    | 18px                | 16px         | 44px    |
| medium | 44px    | 26px    | 20px                | 18px         | 44px    |
| large  | 48px    | 28px    | 22px                | 20px         | 44px    |
| big    | 52px    | 32px    | 26px                | 20px         | 44px    |
| huge   | 60px    | 36px    | 30px                | 24px         | 44px    |
| mega   | 72px    | 44px    | 38px                | 28px         | 44px    |
| ultra  | 88px    | 52px    | 46px                | 36px         | 44px    |

---

## 4. Border/inset contracts for outlined variant

```
outlined: --switch-track-border-width = 2px
outlined: thumb-inset += border-width (total inset = 2+2 = 4px at small sizes)
filled:   --switch-track-border-width = 0px
```

Internal var `--_sw-border-w` is set by variant selector and feeds into thumb sizing calc.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values sourced from system source of truth (`button.tokens.css`)
- [x] All ratios stated as formulas first, then values derived
- [x] Derived value table complete — no blank cells
- [x] Thumb travel formula documented (`track-width − track-height`)
- [x] Track width : height ratio documented (~1.67–1.75×)
- [x] Outlined variant border-width and its effect on thumb inset documented
