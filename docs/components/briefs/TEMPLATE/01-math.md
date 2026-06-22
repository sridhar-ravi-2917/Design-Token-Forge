<!-- status: draft -->
<!-- last-verified: 2026-06-18 -->

# {ComponentName} — Mathematical Contracts

> Gate 0 file. These contracts are LOCKED before tokens.css is written.
> Every value in tokens.css must be derivable from these contracts.
> If a value can't be explained by a contract here, it's arbitrary and will cause rework.

---

## 1. The cross-component height ladder (SYSTEM CONTRACT — do not deviate)

This is shared across all interactive components (button, input, select, toggle, etc.).
Every component at the same `data-size` must be the same height.

| Size  | Height | Base font-size |
|-------|--------|----------------|
| micro |        |                |
| tiny  |        |                |
| small |        |                |
| base  |        |                |
| medium|        |                |
| large |        |                |
| big   |        |                |
| huge  |        |                |
| mega  |        |                |
| ultra |        |                |

> Source of truth: check `packages/components/src/button/button.tokens.css` height values.
> This component's heights at each size MUST match these exactly.

---

## 2. Component-specific ratio contracts

<!-- For each ratio, write the formula FIRST, then derive the values.
     Never write the values first and reverse-engineer the formula.
     Format: property = f(other-property) × ratio -->

### Height : Font-size ratio
```
height(size) = font-size(size) × {ratio}
```
Justification: <!-- why this ratio feels right -->

### Padding-inline : Height ratio  
```
padding-inline(size) = height(size) × {ratio}
```
Justification:

### Icon size : Font-size ratio
```
icon-size(size) = font-size(size) × {ratio}
```
Justification:

### Gap (icon → label) : Icon-size ratio
```
gap(size) = icon-size(size) × {ratio}
```
Justification:

### Border-radius rule
```
default radius  = height(size) × {ratio}   (capped at {max}px)
pill radius     = height(size) / 2          (always)
sharp radius    = 0                         (always)
```
Justification:

### Icon-only symmetric padding
```
When icon-only (no label): padding-inline = (height - icon-size) / 2
```
This ensures the component becomes a perfect square. Verify at each size.

---

## 3. State-layer opacity contracts (SYSTEM CONTRACT)

These are shared system-wide. This component MUST use these values.

| State       | Overlay opacity | Mechanism |
|-------------|----------------|-----------|
| hover       | 8%             | bg tint on icon/label zone |
| pressed     | 12%            | bg tint on icon/label zone |
| focus-ring  | —              | 2px solid, 2px offset, system focus color |
| disabled    | 40%            | opacity on the whole component |
| loading     | per-component  | define here |

---

## 4. Motion contracts (SYSTEM CONTRACT)

| Transition | Duration | Easing |
|-----------|---------|--------|
| color/bg changes | `var(--motion-duration-fast)` = 100ms | ease-out |
| size/height changes | `var(--motion-duration-base)` = 200ms | ease-in-out |
| focus ring appear | `var(--motion-duration-fast)` | ease-out |
| loading spinner | — | linear loop |

---

## 5. Tap target contract (SYSTEM CONTRACT)

- All interactive components: `min-height: 44px` at `base` size and above
- At `micro`, `tiny`, `small`: documented exception (intentional small-density)
- Wrapper approach vs padding approach: <!-- which does this component use? -->

---

## 6. Derived value table (fill this AFTER contracts are locked)

<!-- Once all ratios are defined, derive the actual pixel values here.
     This table becomes the source of truth for tokens.css.
     Never open tokens.css until this table is complete. -->

| Size   | height | font-size | padding-inline | icon-size | gap | radius |
|--------|--------|-----------|----------------|-----------|-----|--------|
| micro  |        |           |                |           |     |        |
| tiny   |        |           |                |           |     |        |
| small  |        |           |                |           |     |        |
| base   |        |           |                |           |     |        |
| medium |        |           |                |           |     |        |
| large  |        |           |                |           |     |        |
| big    |        |           |                |           |     |        |
| huge   |        |           |                |           |     |        |
| mega   |        |           |                |           |     |        |
| ultra  |        |           |                |           |     |        |

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [ ] Height ladder matches system-wide cross-component ladder exactly
- [ ] Every ratio has a justification (not arbitrary)
- [ ] Icon-only padding formula defined
- [ ] State-layer opacities use system contracts (not custom values)
- [ ] Motion uses system duration tokens (not hardcoded ms)
- [ ] Tap target rule declared
- [ ] Derived value table fully populated — no empty cells
