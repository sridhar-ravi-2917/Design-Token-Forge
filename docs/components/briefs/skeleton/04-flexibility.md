<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Skeleton — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--surface-base-outline` (neutral surface token) → `--skel-bg` → skeleton fill ✅. Rebrand affects neutral surface palette.

## Use-case 2: Custom shimmer color
```css
.skeleton {
  --skel-shimmer-via: rgba(255, 220, 100, 0.4);
}
```
Chain: → shimmer mid-color → warm gold shimmer ✅

## Use-case 3: No animation
```html
<div class="skeleton" data-animated="false" data-size="base"></div>
```
Chain: → animation-name: none → static flat placeholder ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--surface-base-outline` updates → skeleton bg updates ✅. Shimmer via token also darkens. No dark block needed.

## Use-case 5: Card placeholder composition
```html
<div class="card p-4">
  <div class="skeleton" data-variant="circle" data-size="large"></div>
  <div class="skeleton" data-variant="text" data-size="base" style="width:70%"></div>
  <div class="skeleton" data-variant="text" data-size="small"></div>
</div>
```
Chain: three skeletons compose a card placeholder; sizes match real content dimensions ✅

## Use-case 6: Faster shimmer for high-activity states
```css
.skeleton { --skel-shimmer-duration: 0.8s; }
```
Chain: → animation-duration → faster sweep ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — via surface token, not hardcoded
- [x] Custom shimmer color override traced
- [x] Static mode traced
- [x] Dark mode — NO dark block needed
- [x] Card composition use-case documented
- [x] Animation speed override traced
