<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Split Button — Designer Flexibility Test

---

## Use-case 1: Full rebrand
```css
--color-brand-500: hsl(175, 80%, 40%);
```
Chain: → `--split-btn-bg` → `--_sbtn-bg` (action and toggle share same surface) → bg ✅

## Use-case 2: Global shape reset
```css
--radius-md: 0;
```
Chain: → `--split-btn-radius` → wrapper `border-radius` ✅. Inner buttons have radius-0 on all internal edges always.

## Use-case 3: Density override
```css
--split-btn-height-base: var(--split-btn-height-medium);
```
Chain: → wrapper height + action/toggle internal sizes recompute ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark overrides → component tokens inherit ✅. No dark block needed.

## Use-case 5: Custom role (danger)
```css
[data-role="danger"] { --split-btn-bg: var(--color-danger-500); }
```
Chain: → both zones pick up danger fill ✅. Divider color derives from fill.

## Use-case 6: Custom toggle-zone width
```css
--split-btn-toggle-w-base: 40px;
```
Chain: → toggle zone width recomputes; action zone fills remainder ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand use-case traced — no gaps
- [x] Shape reset traced — wrapper radius only; inner edges always square
- [x] Density override traced — no gaps
- [x] Dark mode — NO component-level dark block needed
- [x] Custom role traced — no gaps
- [x] Toggle-zone width customization traced — no gaps
