<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Input — Designer Flexibility Test

---

## Use-case 1: Full rebrand
```css
--color-brand-500: hsl(175, 80%, 40%);
```
Chain: → `--input-focus-border-color` → `:focus-within` border ✅

## Use-case 2: Global shape reset
```css
--radius-DEFAULT: 0;
```
Chain: → `--input-radius-base` → `border-radius` ✅. Underline variant unaffected (border-radius is 0 by design).

## Use-case 3: Density override
```css
--input-height-base: var(--input-height-medium);
--input-font-size-base: var(--input-font-size-medium);
--input-padding-x-base: var(--input-padding-x-medium);
```
Chain: all three internal `--_inp-*` vars recompute ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--color-neutral-300` lightens → border auto-updates ✅. No dark block needed.

## Use-case 5: Custom danger color
```css
--color-danger-500: hsl(0, 80%, 50%);
```
Chain: → `--input-invalid-border-color` → `[data-invalid]` border ✅

## Use-case 6: Remove all border-radius (underline variant everywhere)
```css
[data-variant="outline"] { --input-radius-base: 0; }
```
Chain: → `border-radius: 0` ✅. Valid design choice for document-style forms.

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — focus border updates ✅
- [x] Shape reset traced — underline variant intentionally unaffected
- [x] Density override traced — no gaps
- [x] Dark mode — NO component dark block needed
- [x] Custom danger color — propagates to invalid state
- [x] Underline-everywhere use-case traced — no gaps
