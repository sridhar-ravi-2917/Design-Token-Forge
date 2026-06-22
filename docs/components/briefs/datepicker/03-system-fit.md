<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# DatePicker — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--brand-component-bg-default` | T1 semantic | Selected day fill |
| `--brand-component-bg-hover` | T1 semantic | Selected hover fill |
| `--brand-component-bg-pressed` | T1 semantic | Selected pressed fill |
| `--brand-on-component` | T1 semantic | Text on selected day |
| `--brand-container-bg` | T1 semantic | Range mid-zone bg + day hover |
| `--radius-full` | global | Day cell pill shape (default) |
| `--radius-lg` | global | Popover container radius |
| `--shadow-lg` | global | Popover elevation |
| `--spacing-{N}` | global | Day cell sizes |
| `--font-size-{N}` | global | Day cell and header fonts |

---

## 2. Height ladder participation

- (n/a) DatePicker does NOT participate in the cross-component interactive height ladder
- [x] DatePicker uses its own 10-step day-cell size ladder (16px–80px)
- [x] Header row heights parallel the button heights at matching sizes (base = 36px, large = 48px)

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Input | Text input trigger for the datepicker reuses `.input` component at matching density |
| Button (footer) | "Today" and "Clear" buttons in footer use `small` size button |
| Popover | DatePicker popup follows same z-index and shadow conventions as `.tooltip` / `.menu-button` |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Calendar role | `role="grid"` on day grid | HTML |
| Gridcell | `role="gridcell"` on each day | HTML |
| Selected | `aria-selected="true"` | JS-driven |
| Disabled | `aria-disabled="true"` on cells; `disabled` on footer buttons | HTML |
| Today | `aria-label="Today, {date}"` | JS-driven |
| Keyboard navigation | Arrow keys navigate cells; Enter selects | JS contract |
| Live announcements | `aria-live="polite"` on month/year title | Markup contract |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in interactive height ladder noted
- [x] Own day-cell size ladder documented
- [x] Input/button sibling contracts documented
- [x] a11y ARIA grid contracts documented
