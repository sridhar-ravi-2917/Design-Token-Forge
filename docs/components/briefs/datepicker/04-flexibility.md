<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# DatePicker — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → `--datepicker-selected-bg` → selected day fill ✅

## Use-case 2: Square day cells
```css
--datepicker-day-radius: 0;
```
Chain: → `border-radius` on each `.datepicker__day` cell ✅ (removes default pill)

## Use-case 3: Inline calendar for availability booking
```html
<div class="datepicker" data-mode="inline" data-range="true" data-size="base">
  <div class="datepicker__header">...</div>
  <div class="datepicker__grid">...</div>
</div>
```
Chain: `data-mode="inline"` → always visible, no shadow elevation; `data-range="true"` → range selection mode ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → brand fill + container bg tokens update → selected day, hover, range zone all adapt ✅. No dark block needed.

## Use-case 5: Danger role — blocked date range
```html
<div class="datepicker" data-role="danger">
```
Chain: `data-role="danger"` → selected day uses danger-500 fill; hover uses danger container bg ✅

## Use-case 6: Compact (micro) embedded in a table cell
```html
<div class="datepicker" data-size="micro">
```
Chain: `micro` → 16px day cells; 10px font; minimal popover; fits in 7 × 16 = 112px wide calendar ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced
- [x] Shape reset (square cells) traced
- [x] Inline range mode use-case documented
- [x] Dark mode — NO dark block needed
- [x] Danger role use-case documented
- [x] Compact micro use-case documented
