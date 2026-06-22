<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Card — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → selected state border → brand-colored card selection ✅. Card background uses neutral surface, unaffected by brand rebrand.

## Use-case 2: Global shape reset
```css
--card-radius-base: 0;
```
Chain: → `border-radius` on `.card[data-size="base"]` ✅

## Use-case 3: Custom padding density
```css
--card-padding-base: var(--spacing-24);
```
Chain: → body padding increases → more airy card at base size ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--surface-base-cm-bg` / `--surface-base-outline` update → card bg/border adjust ✅. No dark block needed.

## Use-case 5: Tighter header
```css
.my-compact-card { --card-header-padding-base: var(--spacing-8); }
```
Chain: → header zone compresses ✅. Body padding unchanged.

## Use-case 6: Custom media aspect ratio
```css
.card__media { aspect-ratio: 4/3; }
```
Chain: → media container changes from 16/9 to 4/3 → image reflows ✅

## Use-case 7: Horizontal layout
```html
<div class="card" data-direction="horizontal" data-size="base">
```
Chain: `data-direction="horizontal"` triggers flex-row layout, media left, content right ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — affects selected state, not bg
- [x] Shape reset traced
- [x] Custom padding traced
- [x] Dark mode — NO dark block needed
- [x] Tighter header override traced
- [x] Media aspect ratio override traced
- [x] Horizontal layout use-case traced
