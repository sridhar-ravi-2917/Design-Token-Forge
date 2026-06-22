<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Split Button — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-width` | global | Ring on wrapper |
| `--focus-ring-offset` | global | Ring offset |
| `--disabled-opacity` | global | Wrapper disabled opacity |
| `--motion-duration-fast` | global | Zone bg transitions |
| `--color-brand-500` | T1 | Filled primary background |

---

## 2. Height ladder participation

- [x] This component MUST match the cross-component height ladder
- (n/a) Display-only path does not apply

---

## 3. Sibling components that must visually align

| Sibling | What must align |
|---------|----------------|
| Button | Height at same size — must sit in same toolbar |
| Icon-button | Height at same size |
| Menu-button | Height at same size |

---

## 4. Token naming consistency

- Prefix: `--split-btn-` (public) / `--_sbtn-` (internal)
- Zone tokens: `--split-btn-action-*`, `--split-btn-toggle-*`
- Shared surface tokens alias from button token system

---

## 5. Critical a11y contract: focus ring on wrapper

The wrapper div has `overflow:hidden` to clip inner button corners into the shared border-radius. If a `:focus-visible` ring is placed on either inner `<button>`, it will be clipped. The focus ring MUST be placed on the wrapper via:
```css
.split-btn:has(.split-btn__action:focus-visible),
.split-btn:has(.split-btn__toggle:focus-visible) {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

---

## 6. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target | 44px height | `min-height` |
| Focus visible | Ring on wrapper | `:has(:focus-visible)` on wrapper |
| Action label | Visible text label | Markup |
| Toggle label | `aria-label="More options"` | Markup contract |
| Expanded state | `aria-expanded` on toggle | JS consumer |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared
- [x] Focus ring on wrapper — critical decision documented
- [x] WCAG AA contracts listed
- [x] `aria-label` on toggle documented
