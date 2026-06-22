<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Alert — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A full-width (or container-width) status banner that communicates important information — error, warning, success, or info — with an icon, message text, optional title, optional close button, and optional leading accent bar.

---

## 2. Minimum viable anatomy

| Element | Role | Always present? |
|---------|------|-----------------|
| `.alert` (wrapper, `role="alert"` or `role="status"`) | Root | yes |
| `.alert__content` | Message text wrapper | yes |
| `.alert__body` | The message itself | yes |

---

## 3. Maximum anatomy (optional slots)

| Slot | Present when |
|------|-------------|
| `.alert__icon` | Leading status glyph (check, warning, info, error) |
| `.alert__title` | Bold heading above body text |
| `.alert__close` | Dismiss button (×) |
| `.alert__accent` | Left-edge colored bar (`data-accent` present) |

---

## 4. Real-world edge cases

- [x] **`role="alert"` vs `role="status"`** — `role="alert"` is live-assertive (interrupts screen reader immediately). `role="status"` is polite. Danger/error = `alert`; info/success = `status`.
- [x] **Auto-dismiss timing** — toast-like alerts that auto-dismiss after N seconds must NOT use `role="alert"` as it would re-announce on dismiss. Use `role="status"` + a progress bar.
- [x] **Multiline body** — alert body can be several sentences. Must not clip; height is content-driven.
- [x] **No icon** — some product contexts hide the icon for minimal alerts. CSS must handle `icon=false` gracefully (content fills the gap).
- [x] **Action links in body** — "Click here to retry" links inside `.alert__body` need contrast against the alert's background, not just against white. `--alert-{role}-link-color` token exists for this.
- [x] **Dismissing animation** — when close is clicked, the alert transitions out (opacity+height). Must not cause layout jump. Use `height:0` + `overflow:hidden` transition.

---

## 5. What designers customize most in practice

1. **Role** — danger / warning / success / info / neutral
2. **Variant** — soft (default) / filled / outlined
3. **Presence of title** — with vs without heading
4. **Close button** — dismissible vs permanent
5. **Accent bar** — with vs without left-edge accent

---

## 6. Reference system study

### Material Design 3
- No direct Alert component. Uses Snackbar for ephemeral, Banner for persistent. Our alert covers the persistent banner use-case.

### GitHub Primer / Flash
- `Flash` component. Danger/warning/success/info roles. Our role set matches.
- Worth borrowing: inline action links in body — adopted via `--alert-{role}-link-color`.

### Atlassian Design System
- `Banner` / `Flag`. Full-width vs inline. Our alert is inline (contained in a layout column). Full-width is consumer responsibility.

---

## 7. Decision: What makes this component feel "right"

- **Icon is strongly recommended** — color alone is not sufficient for role communication. Icon + color = accessible.
- **Soft variant by default** — tinted container feel. Filled is high-urgency (danger only). Outlined is low-key.
- **Accent bar reinforces role** — a 4px left-border in role color is additional emphasis without the weight of a filled background.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
