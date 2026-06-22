<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Select — Anatomy Study

---

## 1. What this component IS (one sentence, concrete)

A single-selection dropdown control that presents a trigger field (visually similar to a text input) which opens a native or custom option list on click.

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

| Element | Role | Always present? |
|---------|------|-----------------|
| `.select` (wrapper `<div>`) | Root — carries variant/state data attributes | yes |
| `<select>` (or custom trigger) | Native field or ARIA button | yes |
| Chevron icon | Signals dropdown availability | yes |

---

## 3. Maximum anatomy (slots that are optional)

| Slot | Present when | Notes |
|------|-------------|-------|
| `.select__label` | When label shown | |
| `.select__prefix-icon` | Leading icon inside the field | e.g. flag for country select |
| `.select__helper` | Hint/error text | |
| Custom option list | Custom dropdown | External composition |

---

## 4. Real-world edge cases (what breaks naïve implementations)

- [x] **Native `<select>` styling limits** — native `<select>` cannot be fully styled. For custom options, a custom dropdown (listbox pattern) is needed. This component provides the trigger; the listbox is composed externally.
- [x] **Chevron must NOT be clipped** — chevron is part of the trigger visual. With `overflow:hidden` on the wrapper, the chevron stays visible via right padding that accounts for its width.
- [x] **Width = parent** — select fields typically fill their container width (unlike buttons which are content-sized). The wrapper must be `width: 100%` by default.
- [x] **Disabled vs readonly** — same as input. Disabled: cannot interact, not submitted. Readonly: less common for select but valid.
- [x] **Invalid state** — error border + helper text, not color only. `aria-invalid` on the `<select>`.
- [x] **Chevron rotation on open** — same as menu-button: `aria-expanded="true"` → `rotate(180deg)`.

---

## 5. What designers customize most in practice

1. **Variant** (`outline/filled`) — field framing
2. **Size** — density
3. **Prefix icon** — for selects with visual context (country, language)
4. **Invalid state** — error styling
5. **Width** — full-width vs auto

---

## 6. Reference system study

### Material Design 3
- Select / Dropdown. Filled + Outlined. Same two variants we use.
- Worth borrowing: Chevron as part of the trailing affordance — adopted.

### Radix UI / shadcn
- `Select` with `SelectTrigger` (styled like input) + `SelectContent` (dropdown).
- Worth borrowing: Trigger matches input dimensions exactly — adopted.

### GitHub Primer
- `Select` as styled `<select>` — simple approach. Our approach same for native; custom listbox external.

---

## 7. Decision: What makes this component feel "right"

- **Trigger must look exactly like input** at the same size and variant — so form rows with mixed inputs and selects are visually consistent.
- **Chevron is trailing, not floating** — it sits in the trailing padding zone, does not overlap text.
- **Width: 100% by default** — select fields in forms expand to their container.

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [x] All mandatory anatomy elements listed
- [x] All optional slots identified
- [x] At least 5 edge cases documented
- [x] Top 5 designer customizations listed
- [x] At least 3 reference systems studied
- [x] Aesthetic rules written in plain English
