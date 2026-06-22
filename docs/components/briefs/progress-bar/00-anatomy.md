<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Progress Bar — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.progress-bar                wrapper  (role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax)
└─ .progress-bar__track      full-width track
   ├─ .progress-bar__fill    value bar (width = % complete)
   └─ .progress-bar__buffer  optional buffer overlay (e.g. video buffered range)
└─ .progress-bar__label      optional percentage/value label
└─ .progress-bar__helper     optional secondary text
```

---

## Edge cases

1. **Indeterminate state** — `data-indeterminate` → fill animates looping sweep; `aria-valuenow` removed.
2. **Buffer bar** — `.progress-bar__buffer` overlays track at a higher opacity than fill to show buffered range (video use-case).
3. **Striped / animated fill** — `data-striped` adds diagonal stripe pattern on fill; `data-animated` pulses stripes during active progress.
4. **Zero and 100%** — at 0% fill has zero width. At 100% fill equals track width. Border-radius must not leave orphaned pill caps.
5. **Tall label-only** — sizes `huge/mega/ultra` expose font-size in the label zone; track height still independent of font-size.
6. **Overflow hidden on track** — track clips fill + buffer to its border-radius regardless of fill overshooting.

---

## Reference systems

| System | Pattern |
|--------|---------|
| HTML `<progress>` element | Native `value` + `max` attrs; pseudo-element `::-webkit-progress-value` for theming |
| Material Design LinearProgress | 4dp track, determinate + indeterminate, buffer mode |
| Atlassian Progress Bar | "subtle" and "default" tracks, no indeterminate |
