<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# DatePicker — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.datepicker                   popover wrapper (role="dialog" or inline)
├── .datepicker__header       month/year nav row
│   ├── .datepicker__nav-prev  ← previous button
│   ├── .datepicker__title     "June 2026" label
│   └── .datepicker__nav-next  → next button
├── .datepicker__grid          7-col day grid (role="grid")
│   ├── .datepicker__weekday   "Mo Tu We …" header row
│   └── .datepicker__day       individual day cell (role="gridcell")
│       └─ data-today, data-selected, data-in-range, data-range-start/-end
│          data-disabled, data-outside-month
├── .datepicker__footer       optional action row (Today / Clear)
└── .datepicker__input-row    optional text input trigger (inline variant)
```

---

## Edge cases

1. **Range selection** — `data-range="true"` → two selected endpoints + filled range zone. Range start/end get distinct pill corners; middle cells get no horizontal border-radius.
2. **Outside-month days** — `data-outside-month` cells are dimmed but optionally still clickable (controlled by `data-show-outside-month`).
3. **Disabled dates** — `data-disabled` on day cells (weekends, booked dates). Must not receive focus, not receive hover styling.
4. **Month/year panel** — secondary view for fast navigation. Clicking `.datepicker__title` swaps the day grid for a 12-month or year-decade panel.
5. **Keyboard navigation** — arrow keys move focus between day cells; Enter selects; PageUp/PageDown move month; Home/End jump to row start/end.
6. **Today indicator** — `data-today` renders a 2px border ring, not a filled bg, so today is distinguishable even when selected.

---

## Reference systems

| System | Pattern |
|--------|---------|
| React DayPicker | Grid-based accessible calendar with range support, locale, disabled-matcher |
| Material Design DatePicker | Modal dialog with day/year selection, text input trigger, and OK/Cancel footer |
| Flatpickr | Inline or popup calendar, range mode, time picker addon |
