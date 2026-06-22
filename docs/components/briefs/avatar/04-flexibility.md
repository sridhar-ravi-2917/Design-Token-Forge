<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Avatar — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-container-bg` → initials bg for brand-role avatars ✅

## Use-case 2: Global shape reset (square all avatars)
```css
--avatar-radius-base: 0;   /* or any density */
```
Chain: → `border-radius` on `.avatar[data-size="base"]` ✅

## Use-case 3: Custom role color
```css
.avatar[data-role="brand"] {
  --brand-container-bg: hsl(271, 76%, 90%);
  --brand-content-default: hsl(271, 76%, 20%);
}
```
Chain: → initials bg/fg ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → semantic tokens update → initials backgrounds invert ✅. No dark block needed. Photo mode unaffected.

## Use-case 5: Avatar with status dot
```html
<div class="avatar" data-size="base">
  <img src="..." alt="Jane">
  <span class="avatar__status" data-status="online"></span>
</div>
```
Chain: `.avatar__status[data-status="online"]` → green dot ✅

## Use-case 6: Dense avatar group
```css
--avatar-group-offset-base: calc(var(--spacing-32) * -0.4);
```
Chain: overlap increases from 25% to 40% ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced — no gaps
- [x] Custom role color override traced
- [x] Dark mode — NO dark block needed
- [x] Status dot composition traced
- [x] Group offset customization traced
