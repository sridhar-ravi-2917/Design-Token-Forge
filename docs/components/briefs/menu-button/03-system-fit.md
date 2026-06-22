<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Menu Button — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

Same set as Button. Additional token: `--menu-btn-chevron-size-{size}`.

| Token | Source | Used for |
|-------|--------|---------|
| `--focus-ring-width` | global | Focus ring width |
| `--focus-ring-offset` | global | Focus ring offset |
| `--disabled-opacity` | global | Disabled opacity |
| `--motion-duration-fast` | global | Bg + chevron rotation transitions |
| `--color-brand-500` | T1 | Filled primary background |

---

## 2. Height ladder participation

- [x] This component MUST match the cross-component height ladder
- (n/a) Display-only path does not apply

---

## 3. Sibling alignment

| Sibling | What must align |
|---------|----------------|
| Button | Height at same size |
| Icon-button | Height at same size |
| Split-button | Height at same size |

---

## 4. Token naming consistency

- Prefix: `--menu-btn-` (public) / `--_mbtn-` (internal)
- Same role/variant switching pattern as button

---

## 5. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Min tap target | 44px height | `min-height` |
| Focus visible | 2px ring on `<button>` | `:focus-visible` — no overflow complication |
| Role | `<button>` + `aria-haspopup="menu"` | Markup |
| Expanded state | `aria-expanded="true/false"` | JS consumer |
| Chevron rotation | CSS transform on `[aria-expanded="true"]` | No JS class |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] All global token contracts listed
- [x] Height ladder participation declared
- [x] Sibling alignment requirements listed
- [x] Focus ring simpler than split-button — single `<button>`, no overflow:hidden
- [x] WCAG AA contracts listed
