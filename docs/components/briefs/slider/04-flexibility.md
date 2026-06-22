<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Slider — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--slider-fill-bg` → track fill ✅

## Use-case 2: Global shape reset
```css
--radius-full: 0px;
```
Chain: → `--slider-track-radius` / `--slider-thumb-radius` → square track + square thumb ✅

## Use-case 3: Thick "statement" track
```css
--slider-track-h-base: var(--slider-track-h-huge);
--slider-thumb-w-base: var(--slider-thumb-w-huge);
--slider-thumb-h-base: var(--slider-thumb-h-huge);
```
Chain: → track height + thumb size grow in step ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → neutral tokens update → track bg dims ✅. Fill color (brand-500) adjusts per T1 dark palette. No dark block needed.

## Use-case 5: Danger range (e.g. volume warning)
```html
<div class="slider" data-role="danger" data-size="base">
```
Chain: `--color-danger-500` → `--slider-fill-bg` → fill turns red ✅

## Use-case 6: Minimal (no fill)
```css
.slider--no-fill .slider__fill { display: none; }
```
Chain: fill element hidden; thumb still draggable ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced — no gaps
- [x] Thick track override traced
- [x] Dark mode — NO dark block needed
- [x] Role switching (danger) traced
- [x] No-fill variant use-case documented
