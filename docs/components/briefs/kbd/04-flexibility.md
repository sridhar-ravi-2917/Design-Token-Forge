<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# KBD — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--surface-base-cm-bg` (neutral surface) is the background — rebrand does not directly affect KBD. Intentional: KBD is a neutral annotation. If brand-colored KBD is needed, override `--kbd-bg` directly. ✅

## Use-case 2: Global shape reset
```css
--kbd-radius-base: 0;
```
Chain: → `border-radius` ✅

## Use-case 3: Monospace font
```css
.kbd { font-family: var(--font-family-mono); }
```
Chain: → key labels render in monospace ✅. Commonly used for code-documentation sites.

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → `--surface-base-cm-bg` / `--surface-base-outline` update → bg/border/bevel auto-adjust ✅. No dark block needed.

## Use-case 5: Minimal ghost style
```html
<kbd class="kbd" data-variant="ghost" data-size="small">Esc</kbd>
```
Chain: no bg, no border, no shadow — just the key label text ✅. Useful in dense tables.

## Use-case 6: Sized to match body text
```css
/* Inline KBD should match surrounding copy */
p .kbd { font-size: 0.9em; }
```
Chain: → font-size scales with parent → key label readable in context ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand — intentionally neutral, direct override documented
- [x] Shape reset traced
- [x] Dark mode — NO dark block needed
- [x] Monospace font override documented
- [x] Ghost variant use-case traced
- [x] Em-based sizing in prose context documented
