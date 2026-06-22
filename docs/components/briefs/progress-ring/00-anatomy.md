<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Ring — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.progress-ring              wrapper  (role="progressbar")
└─ <svg>
   ├─ <circle class="ring-track">   full-circle track path
   └─ <circle class="ring-fill">    value arc (stroke-dasharray driven)
└─ .progress-ring__label           centered value text or icon (optional)
└─ .progress-ring__helper          external row below ring (optional)
```

---

## Edge cases

1. **Indeterminate state** — `data-indeterminate` → fill arc animates rotating sweep. `aria-valuenow` removed.
2. **Centered label overflow** — `.progress-ring__label` renders inside the ring. Large font at tiny sizes will overflow. Label font-size must scale with ring diameter.
3. **Stroke width vs diameter ratio** — very thin strokes (micro: 2px on 16px ring) become nearly invisible. Stroke width caps at ~7px to prevent fill consuming > 30% of diameter.
4. **RTL rotation direction** — `--ring-direction: normal` (default). In RTL layouts, `--ring-direction: reverse` allows fill to progress right-to-left.
5. **100% cap** — at 100% fill, arc should close completely. Off-by-one in dasharray math can leave a gap.
6. **External helper row** — `.progress-ring__helper` aligns horizontally below ring and external label when both present.

---

## Reference systems

| System | Pattern |
|--------|---------|
| Material Design CircularProgress | SVG stroke-dasharray, determinate + indeterminate |
| Radix UI Progress | Accessible `role="progressbar"`, no built-in ring but same ARIA contract |
| Ant Design Progress (circle) | Supports trail/stroke with gradient, multiple sizes, success/failure icons |
