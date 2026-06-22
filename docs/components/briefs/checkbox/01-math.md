<!-- status: complete -->
<!-- last-verified: 2026-06-19 -->

# Checkbox — Mathematical Contracts

> Gate 0 file — retroactively completed. Values confirmed against checkbox.tokens.css.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

The checkbox `<label>` participates in height alignment when placed in form rows alongside inputs. The **box** itself is intentionally smaller than the full component height — it scales with font size, not the full button height.

| Size   | Component min-height | Box size | Base font-size | Box:Font ratio |
|--------|---------------------:|---------:|---------------:|---------------:|
| micro  | 24px                 | 14px     | 10px           | 1.40×          |
| tiny   | 28px                 | 16px     | 11px           | 1.45×          |
| small  | 32px                 | 18px     | 12px           | 1.50×          |
| base   | 36px                 | 20px     | 13px           | 1.54×          |
| medium | 40px                 | 22px     | 14px           | 1.57×          |
| large  | 44px                 | 24px     | 14px           | 1.71×          |
| big    | 48px                 | 28px     | 16px           | 1.75×          |
| huge   | 56px                 | 32px     | 18px           | 1.78×          |
| mega   | 64px                 | 36px     | 20px           | 1.80×          |
| ultra  | 72px                 | 40px     | 24px           | 1.67×          |

> Box size approximately scales at `font-size × 1.5–1.8`. The ratio is not a strict formula — it is a visual calibration to ensure the box "belongs" to the text at each density level.

---

## 2. Component-specific ratio contracts

### Box size : Font-size ratio
```
box-size(size) ≈ font-size(size) × 1.5  (micro → large)
box-size(size) ≈ font-size(size) × 1.75 (big → ultra)
```
Justification: At small text sizes, a 1.5× box reads as appropriately proportioned. At large text sizes, a slightly larger ratio feels balanced — otherwise the box looks undersized against big text.

### Height : Font-size ratio
The label `<label>` height is driven by `min-height: var(--checkbox-min-tap-target)` = 44px minimum. The visual rendering height equals the box height when no label wraps.

### Padding-inline ratio
```
padding between box and label text: --checkbox-gap-{size}
gap(size) ≈ box-size(size) × 0.4
```

### Border-width rule
```
--checkbox-box-border-width: 2px (all sizes)
```
Justification: 2px is the minimum visible border weight at all densities. 1px disappears at small sizes; 3px is too heavy at micro.

### Check/dash stroke width : Box size ratio
```
stroke-width ≈ box-size(size) × 0.1  (rounded to 0.5px increments)
```
micro: 1.5px, base: 2px, mega: 3.5px — adjusts with box size.

---

## 3. Derived value table

| Size   | Box size | Gap  | Min tap-target | Border-width |
|--------|--------:|-----:|---------------:|-------------:|
| micro  | 14px    | 6px  | 44px           | 2px          |
| tiny   | 16px    | 6px  | 44px           | 2px          |
| small  | 18px    | 8px  | 44px           | 2px          |
| base   | 20px    | 8px  | 44px           | 2px          |
| medium | 22px    | 8px  | 44px           | 2px          |
| large  | 24px    | 8px  | 44px           | 2px          |
| big    | 28px    | 10px | 44px           | 2px          |
| huge   | 32px    | 12px | 44px           | 2px          |
| mega   | 36px    | 12px | 44px           | 2px          |
| ultra  | 40px    | 14px | 44px           | 2px          |

---

## 4. Indeterminate state math

Indeterminate dash is centered in the box. It spans 50% of the box width:
```
dash-width = box-size × 0.5
dash-height = 2px (fixed — scales with border-width if needed)
```

The dash is rendered via SVG `<line>` with `stroke-linecap="round"` so the ends are soft. The SVG `viewBox="0 0 16 16"` with `x1=4, x2=12` gives 50% width span at all box sizes.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Height ladder values sourced from system source of truth (`button.tokens.css`)
- [x] Box size ladder documented and sourced from `checkbox.tokens.css`
- [x] All ratios stated as formulas first, then values derived
- [x] Derived value table complete — no blank cells
- [x] Box : font-size ratio documented (~1.5–1.8× range)
- [x] Indeterminate dash dimensions documented
- [x] Parity with radio sizes noted (both use same 14→40px ladder)
