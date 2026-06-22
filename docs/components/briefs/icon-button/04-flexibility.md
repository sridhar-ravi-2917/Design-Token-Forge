<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Icon Button — Designer Flexibility Test

---

## Use-case 1: Full rebrand
```css
--color-brand-500: hsl(175, 80%, 40%);
```
Chain: → `--icon-btn-bg` → `--_ibtn-bg` → background ✅

## Use-case 2: Global shape reset
```css
--radius-md: 0;
```
Chain: → `--icon-btn-radius-base` → `border-radius` ✅

## Use-case 3: Density override
```css
--icon-btn-height-base: var(--icon-btn-height-medium);
```
Chain: → `--_ibtn-size` → width and height recompute; padding auto-derives ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark overrides brand tokens → component inherits ✅. No dark block needed.

## Use-case 5: Custom role
```css
.my-icon-btn { --icon-btn-bg: var(--color-success-500); --icon-btn-color: white; }
```
Chain: → `--_ibtn-bg` in filled variant ✅. Hover/pressed need explicit overrides.

## Use-case 6: Circle (fully rounded) icon button
```css
[data-rounded] { --icon-btn-radius: var(--radius-full); }
```
Chain: → `border-radius: 9999px` → perfect circle ✅. Focus ring follows border-radius.

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand use-case fully traced — no gaps
- [x] Shape reset use-case fully traced — no gaps
- [x] Density override use-case fully traced — no gaps
- [x] Dark mode — NO component-level dark block needed
- [x] Custom role — hover/pressed limitation documented
- [x] Circle icon button use-case traced — no gaps
