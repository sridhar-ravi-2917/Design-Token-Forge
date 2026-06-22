<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Menu Button — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--menu-btn-bg` → `--_mbtn-bg` → background ✅

## Use-case 2: Global shape reset
```css
--radius-md: 0;
```
Chain: → `--menu-btn-radius-base` → `border-radius` ✅

## Use-case 3: Density override
```css
--menu-btn-height-base: var(--menu-btn-height-medium);
--menu-btn-font-size-base: var(--menu-btn-font-size-medium);
```
Chain: → internal `--_mbtn-*` vars recompute ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → component tokens inherit ✅. No dark block needed.

## Use-case 5: Custom role
```css
.my-danger-menu { --menu-btn-bg: var(--color-danger-500); }
```
Chain: → filled bg changes ✅. Hover/pressed need explicit overrides.

## Use-case 6: Hide chevron (label-only variation)
```css
.menu-btn__chevron { display: none; }
```
Chain: chevron hides; label fills available width ✅. Button still functions as a menu trigger.

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand use-case traced — no gaps
- [x] Shape reset traced — no gaps
- [x] Density override traced — no gaps
- [x] Dark mode — NO component-level dark block needed
- [x] Custom role — limitation documented
- [x] Chevron hide use-case traced — no gaps
