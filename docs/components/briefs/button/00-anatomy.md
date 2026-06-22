<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Button — Anatomy Study

> Gate 0 file — retroactively completed after implementation.

---

## 1. What this component IS (one sentence, concrete)

A pressable control that triggers a single discrete action immediately on click, distinct from links (which navigate) and toggles (which switch state).

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.btn` (`<button>`) | Root interactive element | yes |
| Label text or icon | Communicates the action | yes (at least one of label/icon) |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.btn__icon-start` | Leading icon requested | Precedes label |
| `.btn__icon-end` | Trailing icon requested | Follows label |
| `.btn__spinner` | `data-loading="true"` | Replaces or overlays label during async action |
| `.btn__badge` | Badge count overlay | Absolute-positioned top-right |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Icon-only button** — when there is no label, `padding-inline` must collapse to symmetric value so the button becomes a near-square. A naïve implementation keeps label padding and produces a lopsided icon button.
- [x] **Very long label** — button must NOT stretch its container. `max-width` or `overflow: hidden` with truncation must be considered.
- [x] **Loading state** — spinner replaces or overlays the label. Width must not collapse (flash of layout shift). Width is fixed or min-width matches loaded state.
- [x] **Disabled while loading** — both states can coexist: `data-loading data-disabled`. Visually: loading animation stops; opacity applied.
- [x] **Role variant colors** — `data-role="danger"` changes fill/border color without changing the variant class. Separate token override layer.
- [x] **Full-width button** — `data-full-width` or a wrapping utility class. Width must respond to container without breaking internal centering.
- [x] **Focus ring on pill shape** — `border-radius: var(--radius-full)` button needs focus ring with matching curvature (achieved by `outline` which follows border-radius naturally).

---

## 5. What designers customize most in practice

1. **Role color** (`data-role="primary/danger/brand/neutral"`) — changes which palette the fill comes from
2. **Variant** (`data-variant="filled/outlined/ghost"`) — changes surface treatment
3. **Size** (`data-size="base/large/…"`) — density control
4. **Rounded/pill shape** (`data-rounded`) — full pill border-radius override
5. **Loading state** — async action feedback

---

## 6. Reference system study

### Material Design 3
- Filled, Outlined, Text, Elevated, Tonal — 5 variants. We use 3 (filled/outlined/ghost) which maps cleanly.
- Worth borrowing: `data-role` as orthogonal to variant (semantic color × surface treatment).

### Radix UI / shadcn
- Single `<button>` with `variant` and `size` props — identical to our `data-variant` + `data-size`.
- Worth borrowing: ghost variant = no bg + no border, only text color — adopted.

### GitHub Primer
- Button has `variant="primary/secondary/danger/invisible"`. Danger is a role, not a variant — matches our `data-role` separation.
- Worth borrowing: loading spinner pattern — spinner takes position of icon or overlays.

---

## 7. Decision: What makes this component feel "right"

- **Padding-x ≈ 0.28–0.44× height** — enough horizontal room so the label isn't cramped; not so wide it looks like a banner.
- **Font weight medium (500)** — lighter reads as a label, heavier reads as a heading. Medium is the interactive sweet spot.
- **Border radius scales with size** — small buttons use tighter corners; large buttons use larger corners so they don't look rectangular.
- **Icon size ≈ 0.5× height** — icon must feel balanced against the text; larger icons overwhelm the label.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
