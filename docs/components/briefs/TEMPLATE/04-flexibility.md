<!-- status: draft -->
<!-- last-verified: 2026-06-18 -->

# {ComponentName} — Designer Flexibility Test

> Gate 0 file. Five use-cases that MUST work through CSS custom properties alone.
> Verify each one on paper (trace through the token chain) before writing code.
> If any use-case fails the paper trace, the token architecture is insufficient.

---

## Instructions

For each use-case below:
1. List which CSS custom properties the designer overrides
2. Trace which internal `--_` vars recalculate
3. State the visible result
4. Mark ✅ if the chain works, ❌ if a gap exists

If ❌ → add the missing token(s) to `01-math.md` and the spec before proceeding.

---

## Use-case 1: Full rebrand

A product switches its brand color from blue to teal. No component CSS changes.

```css
/* Designer override (on :root or a scoped container) */
--color-brand-500: hsl(175, 80%, 40%);
/* + all other brand steps regenerated */
```

Chain trace:
- `--color-brand-500` →
- `--{prefix}-bg` →
- `--_{prefix}-bg` (internal) →
- rendered background

✅ / ❌ — gaps:

---

## Use-case 2: Global shape reset (all components become sharp)

A brand wants zero border radius everywhere. One token override.

```css
--radius-md: 0;
--radius-sm: 0;
/* etc. */
```

Chain trace:
- `--radius-md` →
- `--{prefix}-radius-{size}` →
- `border-radius` on element

✅ / ❌ — gaps:

---

## Use-case 3: Density override (make base feel larger)

A product targeting desktop professionals wants the `base` size to feel like `medium`.

```css
/* On a scoped container */
--{prefix}-height-base: var(--{prefix}-height-medium);
--{prefix}-font-size-base: var(--{prefix}-font-size-medium);
--{prefix}-padding-inline-base: var(--{prefix}-padding-inline-medium);
```

Chain trace:
- Do ALL visual properties recompute from height/font-size? Or are some hardcoded?

✅ / ❌ — gaps (list any hardcoded values that don't respond):

---

## Use-case 4: Dark mode (automatic, no extra rules)

System switches to `[data-theme="dark"]` on the root. No component overrides needed.

Chain trace:
- `[data-theme="dark"]` on root →
- `--color-brand-500` changes (token system handles) →
- `--{prefix}-bg` → `--_{prefix}-bg` →
- component renders in dark palette

✅ / ❌ — does the component need its OWN `[data-theme="dark"]` block?
(Answer should be NO — token system handles it. If YES, that's a gap.)

---

## Use-case 5: Custom role (new semantic color)

A product wants a "purple" variant without modifying DTF source.

```css
/* On the component instance or a scoped container */
.my-purple-{comp} {
  --{prefix}-bg:     hsl(270, 80%, 50%);
  --{prefix}-color:  white;
  --{prefix}-border: hsl(270, 80%, 45%);
}
```

Chain trace:
- `--{prefix}-bg` overridden →
- `--_{prefix}-bg` picks it up →
- hover/pressed states: do they auto-derive from `--{prefix}-bg`? Or hardcoded steps?

✅ / ❌ — can hover/pressed be derived without extra overrides?

---

## Use-case 6: Component-specific (add one unique to this component)

<!-- e.g. for input: "show/hide the label slot via a CSS variable" -->
<!-- e.g. for toggle: "change track width while keeping thumb proportional" -->

Use-case:

```css
/* Override: */
```

Chain trace:

✅ / ❌ — gaps:

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [ ] Rebrand use-case fully traced — no gaps
- [ ] Shape reset use-case fully traced — no gaps
- [ ] Density override use-case fully traced — no gaps
- [ ] Dark mode use-case fully traced — confirms NO component-level dark block needed
- [ ] Custom role use-case fully traced — hover/pressed auto-derive or documented limitation
- [ ] Component-specific use-case added and traced
- [ ] Any gaps found have been added as new tokens in `01-math.md`
