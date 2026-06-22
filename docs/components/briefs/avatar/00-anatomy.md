<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Avatar — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A fixed-size circular (or squircle/rounded-square) container that displays a person's photo, initials, or icon fallback.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.avatar` (wrapper) | Root — carries size/shape attributes | yes |
| Content slot (image / initials / icon) | The actual representation | yes (one of three) |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `<img>` inside wrapper | Photo mode | `object-fit:cover` fills the circle |
| Initials text | No photo available | JS derives from name |
| Icon fallback | Generic user | Default state |
| Status badge / dot | `data-status` | Online/away/busy indicator, positioned absolute |
| `.avatar-group` wrapper | Multiple avatars | Controls overlap offset |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Image load failure** — `<img>` `onerror` must trigger fallback to initials or icon. CSS cannot detect this; requires JS.
- [x] **Long initials** — names like "WW" or "MWM" can overflow a small avatar. Font-size must be auto-scaled to size.
- [x] **Group overlap** — avatars in a group use negative margin to overlap. Border is required to separate them visually.
- [x] **Non-square image sources** — portrait or landscape images must be `object-fit:cover; object-position:center top` to focus on the face.
- [x] **Interactive avatar** — if the avatar is a button/link (e.g. profile menu trigger), it needs `role="button"`, `tabindex`, and focus ring.

---

## 5. What designers customize most in practice

1. **Size** — via `data-size`
2. **Shape** — circle vs squircle vs rounded-square
3. **Semantic color** — via role tokens (brand/neutral/etc.) for initials/icon mode
4. **Group spacing** — overlap offset in avatar groups
5. **Status indicator** — presence/online-state dot

---

## 6. Reference system study

### GitHub Primer
- `Avatar` — simple circular image. We extend with initials/icon fallback, sizes, shape variants.

### Radix Themes
- Avatar with fallback — same image→initials fallback pattern.

### Atlassian Design System
- Avatar. Sizes: xsmall (16px) through xlarge (128px). Our ladder (20–72px) covers similar range.
- Worth borrowing: Presence/status indicator compositing — adopted as status badge slot.

---

## 7. Decision: What makes this component feel "right"

- **Circle is the default** — universally associated with profile photos.
- **Initials background uses semantic role color** — brand/neutral/info avatars feel intentional.
- **Group overlap = 25% of avatar size** — consistent visual density across sizes.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
