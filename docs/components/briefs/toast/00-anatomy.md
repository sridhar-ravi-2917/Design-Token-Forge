<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Toast — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.toast                       wrapper  (role="status" | "alert")
├── .toast__icon             role-colored icon (optional)
├── .toast__content          text block
│   ├── .toast__title        bold summary line (optional)
│   └── .toast__body         message text
├── .toast__action           action link / button (optional)
├── .toast__close            dismiss × button (optional)
└── .toast__accent           left accent bar (optional, data-accent)
```

---

## Edge cases

1. **Auto-dismiss timing** — toast typically auto-dismisses after 4–6 s. ARIA live region keeps announcement even after visual removal.
2. **Action button** — optional `.toast__action` within toast. Must be keyboard reachable; click must also dismiss (or use explicit close).
3. **Stacked toasts** — multiple toasts queue vertically in a portal container. Each is a separate `.toast`. Stacking direction (top vs bottom) and max count handled by JS, not CSS.
4. **No icon / no title** — body-only toast with no icon renders `.toast__content` flush. Layout must not break.
5. **Persistent toast** — `data-persistent` → no auto-dismiss timer, close button is mandatory.
6. **Rich content** — `.toast__body` may contain a link. Link inherits `--toast-{role}-link-color`.

---

## Reference systems

| System | Pattern |
|--------|---------|
| Radix UI Toast | Ephemeral overlays with `role="status"` + SwipeDown to dismiss |
| Material Design Snackbar | Single-line message, action, auto-dismiss, bottom-center placement |
| Atlassian Flag | Multi-line with title, optional actions, stacked queue, role="alert" for errors |
