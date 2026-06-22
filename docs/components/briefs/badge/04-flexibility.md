<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Badge — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → `--badge-filled-bg` → badge fill ✅

## Use-case 2: Global shape reset
```css
--badge-radius-base: 0;
```
Chain: → `border-radius` on `.badge[data-size="base"]` ✅. Or use `data-shape="square"` globally.

## Use-case 3: Danger notification count on icon-button
```html
<div style="position:relative; display:inline-flex;">
  <button class="icon-btn" data-size="base">🔔</button>
  <span class="badge" data-role="danger" data-variant="filled" data-size="micro"
        style="position:absolute; top:-4px; right:-4px;">3</span>
</div>
```
Chain: badge overlays icon-button ✅. `micro` (16px) does not obscure the icon.

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → semantic role tokens update → filled/soft/outlined bgs and borders auto-adjust ✅. No dark block needed.

## Use-case 5: Removable tag (interactive badge)
```html
<span class="badge" data-variant="soft" data-role="neutral" data-interactive>
  Design
  <button class="badge__remove" aria-label="Remove Design tag">×</button>
</span>
```
Chain: `data-interactive` enables hover state; close button is a separate `<button>` inside ✅

## Use-case 6: Custom "beta" badge
```css
.badge-beta {
  --brand-component-bg-default: hsl(260, 80%, 55%);
  --brand-on-component: white;
}
```
Chain: → filled bg and fg override for a custom "Beta" badge color ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced
- [x] Overlay on icon-button use-case documented
- [x] Dark mode — NO dark block needed
- [x] Removable tag use-case traced
- [x] Custom color override traced
