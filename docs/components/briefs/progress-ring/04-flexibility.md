<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Ring — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → `--ring-brand-fill` → arc color ✅

## Use-case 2: Square track linecap
```css
--ring-stroke-linecap: square;
```
Chain: → SVG `stroke-linecap` attribute ✅ (flat ends instead of rounded)

## Use-case 3: Upload progress indicator (large)
```html
<div class="progress-ring" data-size="large" data-role="brand"
  role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"
  aria-label="Upload progress">
  <svg>...</svg>
  <span class="progress-ring__label">65%</span>
</div>
```
Chain: `large` → 48px diameter; brand arc fills to 65%; centered label ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → role arc + track tokens update → all 6 roles adapt ✅. No dark block needed.

## Use-case 5: Indeterminate file loading
```html
<div class="progress-ring" data-size="medium" data-role="neutral" data-indeterminate
  role="progressbar" aria-label="Loading" aria-busy="true">
  <svg>...</svg>
</div>
```
Chain: `data-indeterminate` → rotating arc animation; `aria-valuenow` removed ✅

## Use-case 6: RTL layout (right-to-left progress)
```css
.progress-ring {
  --ring-direction: reverse;
}
```
Chain: arc fills clockwise from top in LTR, counter-clockwise in RTL ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced
- [x] Linecap override documented
- [x] Upload progress large size use-case documented
- [x] Dark mode — NO dark block needed
- [x] Indeterminate use-case documented
- [x] RTL direction use-case documented
