<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Divider — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-border` is a T1 semantic border token — rebrand updates it. Divider line color updates automatically ✅.

## Use-case 2: Custom dashed style
```css
.section-divider { --div-style: dashed; --div-color: var(--color-border-subtle); }
```
Chain: → `border-style: dashed` → lighter dashed separator ✅

## Use-case 3: Inset divider (list with leading icon)
```css
.list-divider { --div-indent-start: 48px; }
```
Chain: → margin-inline-start on the line → divider starts 48px from left edge ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--color-border` / `--color-text-muted` update → line and label color adjust ✅. No dark block needed.

## Use-case 5: Labeled section break
```html
<div class="divider" data-size="large">
  <span class="divider__label">OR</span>
</div>
```
Chain: label flanked by equal lines; label inherits `--div-label-color` (muted) ✅

## Use-case 6: Vertical divider in toolbar
```html
<div class="divider" data-direction="vertical" data-size="small" style="height:24px"></div>
```
Chain: `data-direction="vertical"` → vertical 1px line; height set by consumer context ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced — via border semantic token
- [x] Dashed style override traced
- [x] Inset/indent override traced
- [x] Dark mode — NO dark block needed
- [x] Labeled divider use-case traced
- [x] Vertical toolbar divider use-case traced
