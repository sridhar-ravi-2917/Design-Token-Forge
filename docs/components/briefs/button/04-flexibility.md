<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Button — Designer Flexibility Test

---

## Use-case 1: Full rebrand

```css
--color-brand-500: hsl(175, 80%, 40%);
```
Chain: `--color-brand-500` → `--btn-bg` → `--_btn-bg` → `background-color` ✅

---

## Use-case 2: Global shape reset

```css
--radius-md: 0; --radius-DEFAULT: 0;
```
Chain: `--radius-md` → `--btn-radius-base` → `border-radius` ✅

---

## Use-case 3: Density override

```css
--btn-height-base: var(--btn-height-medium);
--btn-font-size-base: var(--btn-font-size-medium);
--btn-padding-x-base: var(--btn-padding-x-medium);
```
Chain: all three internal `--_btn-*` vars recompute via `[data-size="base"]` selector ✅

---

## Use-case 4: Dark mode (automatic)

Chain: `[data-theme="dark"]` → `--color-brand-500` updates → `--btn-bg` → internal var → rendered bg ✅
No component-level dark block needed.

---

## Use-case 5: Custom role

```css
.my-purple-btn { --btn-bg: hsl(270,80%,50%); --btn-color: white; }
```
Chain: `--btn-bg` overridden → `--_btn-bg` picks it up → background ✅
⚠️ Hover/pressed need explicit override (`--btn-bg-hover`, `--btn-bg-pressed`).

---

## Use-case 6: Full-width layout

```css
.my-full-btn { width: 100%; }
```
Chain: `width: 100%` on root → internal layout is flex with `justify-content: center` → label stays centered ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand use-case fully traced — no gaps
- [x] Shape reset use-case fully traced — no gaps
- [x] Density override use-case fully traced — no gaps
- [x] Dark mode use-case — NO component-level dark block needed
- [x] Custom role use-case — hover/pressed limitation documented
- [x] Component-specific use-case (full-width) traced — no gaps
- [x] Any gaps found: hover/pressed custom role requires extra tokens (documented)
