<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Select — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--select-focus-border` → focus/open border ✅

## Use-case 2: Global shape reset
```css
--radius-DEFAULT: 0;
```
Chain: → `--select-radius-base` → `border-radius` ✅

## Use-case 3: Density override
```css
--select-height-base: var(--select-height-medium);
```
Chain: → wrapper height + chevron vertical centering recompute ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → neutral tokens → borders/bgs update ✅. No dark block needed.

## Use-case 5: Custom invalid color
```css
--color-danger-500: hsl(0, 90%, 45%);
```
Chain: → `--select-invalid-border-color` → `[data-invalid]` border ✅

## Use-case 6: Custom chevron icon
```css
.select__chevron { display: none; }
/* Replace with custom icon element in slot */
```
Chain: hide default chevron; custom icon inherits color via `currentColor` ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — no gaps
- [x] Shape reset traced — no gaps
- [x] Density override traced — no gaps
- [x] Dark mode — NO dark block needed
- [x] Custom invalid color — propagates correctly
- [x] Custom chevron icon use-case traced — no gaps
