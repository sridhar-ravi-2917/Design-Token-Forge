<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Textarea — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--textarea-focus-border-color` → `:focus-within` border ✅

## Use-case 2: Global shape reset
```css
--radius-DEFAULT: 0;
```
Chain: → `--textarea-radius-base` → `border-radius` ✅

## Use-case 3: Density override
```css
--textarea-font-size-base: var(--textarea-font-size-medium);
--textarea-padding-x-base: var(--textarea-padding-x-medium);
```
Chain: font-size and padding recompute ✅. Min-height does not auto-adjust — must override separately if desired.

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → neutral tokens update → border/bg auto-update ✅. No dark block needed.

## Use-case 5: Fixed height (no resize)
```css
.my-fixed-ta { --textarea-resize: none; height: 120px; }
```
Chain: resize disabled, height fixed ✅

## Use-case 6: Auto-grow textarea
```js
ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; });
```
Chain: JS updates `height` → component styles allow (no fixed height constraint) ✅. Token `--textarea-min-height-{size}` still enforced.

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced — no gaps
- [x] Density override traced — min-height limitation documented
- [x] Dark mode — NO dark block needed
- [x] Fixed height use-case traced — no gaps
- [x] Auto-grow JS pattern documented as consumer responsibility
