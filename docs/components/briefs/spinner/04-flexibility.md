<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Spinner — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--spin-arc-color` → arc color ✅

## Use-case 2: White spinner (on dark overlays)
```html
<div class="spinner" data-role="neutral" style="--neutral-500: white;">
```
Or override directly:
```css
.my-overlay .spinner { --spin-arc-color: white; }
```
Chain: arc and track (10% of arc) turn white ✅

## Use-case 3: Slow/fast animation
```css
.spinner { --spin-duration: 2s; }  /* slow */
.spinner { --spin-duration: 0.6s; } /* fast */
```
Chain: → `animation-duration` on `.spinner__arc` ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → brand-500 updates → arc color shifts ✅. No dark block needed.

## Use-case 5: Dots variant in button
```html
<button class="btn" data-size="base">
  <span class="spinner" data-variant="dots" data-size="small"></span>
  Saving…
</button>
```
Chain: small dots spinner (16px) fits inline inside base button (36px) ✅

## Use-case 6: Size matched to button
```css
/* Auto-size spinner inside .btn */
.btn .spinner { --spin-size: 1em; }
```
Chain: `1em` inherits button font-size → spinner proportionally matches button density ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] White-on-dark override documented
- [x] Animation speed override traced
- [x] Dark mode — NO dark block needed
- [x] Inline button use-case traced
- [x] Auto-size via `em` approach documented
