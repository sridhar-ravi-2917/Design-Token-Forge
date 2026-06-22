<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# File Upload — Designer Flexibility Test

---

## Use-case 1: Full rebrand
Chain: `--color-brand-500` → `--brand-component-bg-default` → filled bg / drag-over tint ✅

## Use-case 2: Global shape reset
```css
--file-upload-radius-base: 0;
```
Chain: → `border-radius` on `.file-upload__dropzone` ✅

## Use-case 3: Compact button-only trigger
```html
<div class="file-upload" data-mode="button" data-variant="outlined" data-size="base">
  <button class="file-upload__btn-only" aria-label="Upload files">
    Upload
  </button>
  <input type="file" hidden multiple>
</div>
```
Chain: `data-mode="button"` → single-button layout, 36px height matches `.btn[data-size="base"]` ✅

## Use-case 4: Dark mode (automatic)
Chain: T1 dark → container + component bg tokens update → dropzone bg, drag-over tint, error colors all adapt ✅. No dark block needed.

## Use-case 5: Error state after failed upload
```html
<div class="file-upload" data-variant="outlined" data-mode="dropzone" data-size="base">
  <div class="file-upload__dropzone" data-error="File type not supported">
    ...
  </div>
  <ul class="file-upload__file-list">
    <li class="file-upload__file-item" data-state="error">
      <span class="file-upload__file-name">document.exe</span>
      <span class="file-upload__file-error">File type not allowed</span>
      <button class="file-upload__file-remove" aria-label="Remove document.exe">×</button>
    </li>
  </ul>
</div>
```
Chain: `data-state="error"` → danger-colored item; `data-error` → error outline on dropzone ✅

## Use-case 6: Success role — after successful upload
```html
<div class="file-upload" data-role="success" data-variant="soft">
```
Chain: `data-role="success"` → success container bg on dropzone; success accent ✅

---

## ✅ Flexibility review checklist (must all be checked before Gate 0 passes)

- [x] Rebrand traced
- [x] Shape reset traced
- [x] Compact button-only mode documented
- [x] Dark mode — NO dark block needed
- [x] Error state documented
- [x] Success role use-case documented
