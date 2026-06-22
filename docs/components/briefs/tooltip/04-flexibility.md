<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Tooltip — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--surface-base-ct-default` (dark tooltip text bg) — rebrand doesn't change default tooltip since it uses surface tokens, not brand role ✅. Brand-role tooltip: designer sets `data-variant="brand"` and adds `--tooltip-brand-bg`.

## Use-case 2: Global shape reset
```css
--tooltip-radius: 0;
```
Chain: → `border-radius` on `.tooltip` ✅

## Use-case 3: Validation error tooltip
```html
<input id="email" aria-describedby="email-tip" aria-invalid="true">
<div class="tooltip" id="email-tip" data-variant="danger" data-placement="bottom" data-size="base" role="tooltip">
  Enter a valid email address
</div>
```
Chain: `data-variant="danger"` → `--tooltip-danger-bg` → danger-500 fill ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--surface-base-ct-default` shifts; default tooltip (dark bg / light text) automatically adapts in dark themes since it uses surface tokens ✅. No dark block needed.

## Use-case 5: Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  .tooltip { --tooltip-enter-scale: 1; transition: none; }
}
```
Chain: scale + transition suppressed ✅

## Use-case 6: Rich tooltip with title
```html
<div class="tooltip" role="tooltip" data-size="large" data-placement="top">
  <p class="tooltip__title">Keyboard shortcut</p>
  <p class="tooltip__body">⌘ + K opens command palette</p>
</div>
```
Chain: `.tooltip__title` → semibold, `.tooltip__body` → normal weight ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand behavior documented (surface tokens, not brand role)
- [x] Shape reset traced
- [x] Validation error use-case traced
- [x] Dark mode — NO dark block needed
- [x] Reduced motion use-case documented
- [x] Rich tooltip use-case documented
