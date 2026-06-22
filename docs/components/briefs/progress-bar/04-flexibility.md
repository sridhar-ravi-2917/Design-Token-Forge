<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Bar — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → `--progress-brand-fill` → fill color ✅

## Use-case 2: Square track (no pill)
```css
--progress-radius-base: 0;
```
or use `data-rounded="false"` to apply `--progress-radius-square: 0px` ✅

## Use-case 3: Thin loader line in page header
```html
<div class="progress-bar" data-size="micro" data-role="brand" data-indeterminate
  role="progressbar" aria-label="Loading" aria-busy="true">
  <div class="progress-bar__track">
    <div class="progress-bar__fill"></div>
  </div>
</div>
```
Chain: `micro` → 2px track; brand fill; indeterminate sweep animation ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → all role fill + track tokens update → all 6 roles adapt ✅. No dark block needed.

## Use-case 5: Danger upload error
```html
<div class="progress-bar" data-role="danger" data-variant="soft" data-size="large" data-size="medium"
  role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar__track"><div class="progress-bar__fill" style="width:40%"></div></div>
  <span class="progress-bar__label">Upload failed at 40%</span>
</div>
```
Chain: `data-role="danger"` → danger fill + soft track ✅

## Use-case 6: Buffer bar (video)
```html
<div class="progress-bar" data-size="small" data-role="brand">
  <div class="progress-bar__track">
    <div class="progress-bar__buffer" style="width:70%"></div>
    <div class="progress-bar__fill" style="width:40%"></div>
  </div>
</div>
```
Chain: `.progress-bar__buffer` renders under fill; buffered range visible ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced
- [x] Shape reset (square) traced
- [x] Thin loader use-case (micro) documented
- [x] Dark mode — NO dark block needed
- [x] Error state use-case documented
- [x] Buffer bar use-case documented
