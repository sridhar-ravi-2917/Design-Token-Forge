<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# File Upload — Anatomy Review

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] Parts enumerated
- [x] Edge cases documented (min 4)
- [x] 3 reference systems listed

---

## Component parts

```
.file-upload                       outer wrapper
├── .file-upload__dropzone         dashed drop target (data-mode="dropzone")
│   ├── .file-upload__icon         upload icon
│   ├── .file-upload__title        "Drag files here"
│   ├── .file-upload__description  helper text / file-type hint
│   └── .file-upload__btn-row      "Browse" button row
│       └── <button>               triggers <input type="file">
├── .file-upload__btn-only         compact single-button mode (data-mode="button")
│   └── <button>
├── .file-upload__file-list        file list (added after selection)
│   └── .file-upload__file-item    per-file row (name, size, remove)
│       ├── .file-upload__file-icon
│       ├── .file-upload__file-name
│       ├── .file-upload__file-size
│       └── .file-upload__file-remove (× button)
└── <input type="file" hidden>     native input
```

---

## Edge cases

1. **Drag-over state** — `data-drag-over` → dashed border switches to solid; bg tints to role-container color.
2. **File type validation** — `accept` attribute on hidden `<input>`. CSS shows `data-invalid-type` error state on item row (red badge). Validation is JS/browser, not CSS.
3. **Max file count / max size** — `data-error` on `.file-upload` triggers error border + error bg on dropzone. Error message rendered in `.file-upload__file-item[data-state="error"]`.
4. **Button-only mode** — `data-mode="button"` renders a single button, no dropzone. Shares the height ladder with button component.
5. **File item removal** — `data-removing` → item row fades and collapses before DOM removal (matches toast/alert dismiss animation).
6. **Disabled** — `data-disabled` on wrapper disables both dropzone and button; native input gets `disabled` attr. CSS dims opacity.

---

## Reference systems

| System | Pattern |
|--------|---------|
| Dropzone.js | Dashed rect with drag-over glow; file list with remove/retry |
| Radix UI + React-Dropzone | Accessible drag target with `onDrop`, `onDragOver`; ARIA live region for file additions |
| Atlassian MediaPicker | Two modes (compact button / expanded dropzone), inline file list with progress per file |
