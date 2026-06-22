<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# File Upload — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--{role}-component-bg-default` | T1 semantic | Filled bg per role |
| `--{role}-container-bg` | T1 semantic | Soft/tinted bg |
| `--radius-sm/md/DEFAULT/md-lg/lg/xl` | global | Corner radius per size |
| `--spacing-{N}` | global | Heights and padding values |
| `--font-size-{N}` | global | Label font per size |

---

## 2. Height ladder participation

- [x] Button mode (`data-mode="button"`) participates in the cross-component interactive height ladder
- [x] `--file-upload-btn-height-{size}` values match button component exactly
- (n/a) Dropzone mode height is content-driven (min-height only) — NOT in the height ladder

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Button | Button-only mode reuses the exact height ladder. `.file-upload[data-mode="button"]` visually matches a `.btn`. |
| Input | File upload input is a specialised input — same size ladder, same focus ring pattern. |
| Progress bar | Per-file upload progress uses `.file-upload__file-item` with an embedded progress bar at `micro`/`tiny` size. |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Focus management | Button/trigger is focusable; dropzone is NOT focusable (mouse/touch only) | HTML contract |
| File list announcements | `role="log"` on file list for screen reader updates | Markup contract |
| Remove button | `aria-label="Remove {filename}"` | Markup contract |
| Drag-over | `aria-live="polite"` region announces accepted/rejected | JS contract |
| Native fallback | Hidden `<input type="file">` always present — keyboard accessible via button | HTML |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Button mode height ladder participation noted
- [x] Dropzone non-participation in height ladder noted
- [x] Button/input sibling contracts documented
- [x] a11y ARIA contracts documented
