<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Badge — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--brand-component-bg-default` | T1 semantic | Filled bg default |
| `--brand-on-component` | T1 semantic | Filled text color |
| `--brand-container-bg` | T1 semantic | Soft bg |
| `--brand-content-default` | T1 semantic | Outlined + soft fg |
| `--radius-full` | global | Pill shape |
| `--font-size-{N}` | global | Font per size |
| `--disabled-opacity` | global | Disabled state |

---

## 2. Height ladder participation

- (n/a) Badge does NOT participate in the cross-component button/input height ladder
- [x] Badge uses its own compact annotation-scale: `--badge-height-{size}` (16–48px)
- [x] Badge heights are intentionally smaller than button heights at the same size name

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| KBD | Both are inline annotations. Badge is color-filled; KBD is neutral key-cap. Same height range. |
| Button | Badge placed inside a button (e.g. count chip in a menu item) must use `micro` or `tiny` size inside a `base` button |
| Avatar | Numeric count badge overlaid on avatar uses `micro` size (16px) with `position:absolute; top:-4px; right:-4px` |
| Icon-button | Badge overlay on icon-button — same positioning contract as avatar |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Semantic | `<span>` for display; `<button>` if removable | Markup contract |
| Color alone | Role color must not be the ONLY differentiator — include text label | Design contract |
| Count overflow | "99+" or "9+" — screen reader should announce "99 or more" | JS consumer `aria-label` |
| Dot badge | Must have `aria-label` (e.g. "3 unread") — invisible text otherwise | Markup contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Smaller-than-button size contract documented
- [x] Sibling placement contracts documented
- [x] a11y contracts (color-alone + dot aria-label) documented
