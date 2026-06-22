<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Toast — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → `--toast-brand-filled-bg` → filled bg ✅

## Use-case 2: Global shape reset
```css
--toast-radius: 0;
```
Chain: → `border-radius` on `.toast` ✅

## Use-case 3: Success with accent bar
```html
<div class="toast" data-role="success" data-variant="soft" data-accent data-size="base">
  <span class="toast__icon" aria-hidden="true">✓</span>
  <div class="toast__content">
    <p class="toast__body">Changes saved.</p>
  </div>
</div>
```
Chain: `data-accent` → 4px left bar in success-500 ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → container + component bg tokens update → all role colors shift ✅. No dark block needed.

## Use-case 5: Persistent danger (close required)
```html
<div class="toast" data-role="danger" data-variant="filled" data-persistent data-size="base">
  <div class="toast__content">
    <p class="toast__title">Auth token expired</p>
    <p class="toast__body">Please sign in again.</p>
  </div>
  <button class="toast__close" aria-label="Dismiss">×</button>
</div>
```
Chain: `data-persistent` → no timer; close is mandatory ✅

## Use-case 6: Action link
```html
<div class="toast" data-role="info" data-size="base">
  <div class="toast__content">
    <p class="toast__body">Update available.</p>
  </div>
  <button class="toast__action">Reload</button>
</div>
```
Chain: `.toast__action` → styled as inline action, role-colored ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced
- [x] Accent bar use-case documented
- [x] Dark mode — NO dark block needed
- [x] Persistent use-case documented
- [x] Action link use-case documented
