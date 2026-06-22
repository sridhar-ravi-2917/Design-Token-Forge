<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Radio — Mathematical Contracts

> Gate 0 file — retroactively completed. Values confirmed against radio.tokens.css.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

The radio `<label>` participates in height alignment (tap-target) when placed in form rows alongside inputs. The **circle** itself is independently sized — smaller than the full component height, calibrated to match checkbox box sizes at each density.

| Size   | Min tap-target | Circle size | Dot size | Base font-size | Dot:Circle ratio |
|--------|---------------:|------------:|---------:|---------------:|-----------------:|
| micro  | 44px           | 14px        | 6px      | 10px           | 0.43×            |
| tiny   | 44px           | 16px        | 7px      | 11px           | 0.44×            |
| small  | 44px           | 18px        | 8px      | 12px           | 0.44×            |
| base   | 44px           | 20px        | 9px      | 13px           | 0.45×            |
| medium | 44px           | 22px        | 10px     | 14px           | 0.45×            |
| large  | 44px           | 24px        | 11px     | 14px           | 0.46×            |
| big    | 44px           | 28px        | 13px     | 16px           | 0.46×            |
| huge   | 44px           | 32px        | 15px     | 18px           | 0.47×            |
| mega   | 44px           | 36px        | 17px     | 20px           | 0.47×            |
| ultra  | 44px           | 40px        | 19px     | 24px           | 0.48×            |

> Circle sizes are IDENTICAL to checkbox box sizes — this is intentional. Both controls must feel the same visual weight at the same density level.

---

## 2. Component-specific ratio contracts

### Dot size : Circle size ratio
```
dot-size(size) ≈ circle-size(size) × 0.44–0.48
```
Justification: At 0.44×, the dot is comfortably inset with ~3px gap from the ring edge at all sizes. Smaller feels like an asterisk; larger fills the ring and loses the "selected inside unselected" visual metaphor.

### Circle-to-dot gap (inset from ring inner edge)
```
gap = (circle-size - dot-size) / 2
```
At base: `(20 - 9) / 2 = 5.5px gap`. At micro: `(14 - 6) / 2 = 4px gap`. This is consistent and intentional.

### Height : Font-size ratio
```
circle-size(size) ≈ font-size(size) × 1.5–1.67
```
Same calibration as checkbox — the circle is ~1.5× the font-size at each density level so the control feels proportioned to its label text.

### Padding-inline ratio
```
gap between circle and label text: --radio-gap-{size}
gap(size) ≈ circle-size(size) × 0.4
```
Consistent with checkbox gap formula for visual coherence between form controls.

### Border-width rule
```
--radio-border-width: 2px (all sizes, all states)
```
Consistent with `--checkbox-box-border-width: 2px` — form controls share border weight.

---

## 3. Derived value table

| Size   | Circle | Dot  | Inset gap | Group gap (vertical) | Min tap |
|--------|-------:|-----:|----------:|--------------------:|--------:|
| micro  | 14px   | 6px  | 4.0px     | 8px                 | 44px    |
| tiny   | 16px   | 7px  | 4.5px     | 8px                 | 44px    |
| small  | 18px   | 8px  | 5.0px     | 8px                 | 44px    |
| base   | 20px   | 9px  | 5.5px     | 10px                | 44px    |
| medium | 22px   | 10px | 6.0px     | 10px                | 44px    |
| large  | 24px   | 11px | 6.5px     | 12px                | 44px    |
| big    | 28px   | 13px | 7.5px     | 14px                | 44px    |
| huge   | 32px   | 15px | 8.5px     | 16px                | 44px    |
| mega   | 36px   | 17px | 9.5px     | 20px                | 44px    |
| ultra  | 40px   | 19px | 10.5px    | 24px                | 44px    |

---

## 4. Parity contracts with Checkbox

| Property | Checkbox value | Radio value | Must match? |
|----------|----------------|-------------|-------------|
| Box/circle size-{size} | 14→40px | 14→40px | ✅ exact match |
| Border width | 2px | 2px | ✅ exact match |
| Label font-size-{size} | same ladder | same ladder | ✅ exact match |
| Gap (circle/box → label) | ~40% of size | ~40% of size | ✅ same formula |
| Min tap target | 44px | 44px | ✅ exact match |

These parity contracts are LOCKED. If checkbox sizes change, radio sizes must change in the same commit.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values sourced from system source of truth (`button.tokens.css`)
- [x] Circle size ladder documented and sourced from `radio.tokens.css`
- [x] Dot size ladder documented and sourced from `radio.tokens.css`
- [x] All ratios stated as formulas first, then values derived
- [x] Derived value table complete — no blank cells
- [x] Dot : circle ratio documented (~0.44–0.48×)
- [x] Inset gap formula documented (`(circle - dot) / 2`)
- [x] Parity with checkbox sizes locked and documented
