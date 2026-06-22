<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Alert — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-container-bg` / `--brand-component-bg-default` → soft/filled bg ✅

## Use-case 2: Global shape reset
```css
--alert-radius: 0;
```
Chain: → `border-radius` on `.alert` ✅

## Use-case 3: Permanent danger error (no close)
```html
<div class="alert" data-role="danger" data-variant="filled" data-size="base">
  <span class="alert__icon" aria-hidden="true">⚠</span>
  <div class="alert__content">
    <p class="alert__body">Your session expired. Please log in again.</p>
  </div>
</div>
```
Chain: no `.alert__close` → no close button renders; filled danger bg ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → container + component bg tokens update → all role colors shift ✅. No dark block needed.

## Use-case 5: Success with accent bar
```html
<div class="alert" data-role="success" data-variant="soft" data-accent data-size="base">
```
Chain: `data-accent` → 4px left bar in success-500 ✅

## Use-case 6: Inline action link
```html
<div class="alert" data-role="warning" data-size="base">
  <div class="alert__content">
    <p class="alert__body">Your storage is almost full.
      <a href="/upgrade" class="alert__link">Upgrade plan</a>
    </p>
  </div>
</div>
```
Chain: `.alert__link` inherits `--alert-warning-link-color` → contrast-correct link color on warning bg ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced
- [x] Permanent (no-close) use-case documented
- [x] Dark mode — NO dark block needed
- [x] Accent bar use-case traced
- [x] Inline link color token use-case traced
