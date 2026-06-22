<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# KBD — System Fit & Cross-Component Contracts

---

## 1. Token inheritance

| Token | Source | Used for |
|-------|--------|---------|
| `--surface-base-cm-bg` | T1 semantic | Filled variant background |
| `--surface-base-outline` | T1 semantic | Border + bevel shadow color |
| `--surface-base-ct-default` | T1 semantic | Key label text color |
| `--radius-xs` … `--radius-lg` | global | Border-radius per size |
| `--font-size-{N}` | global | Font size per size |

---

## 2. Height ladder participation

- (n/a) KBD does NOT participate in the cross-component height ladder
- [x] KBD uses its own annotation-scale height system (`--kbd-height-{size}`)
- [x] KBD heights are intentionally SMALLER than button heights at same size name — KBD is an inline annotation, not an interactive control

---

## 3. Sibling alignment

| Sibling | Alignment contract |
|---------|-------------------|
| Badge | Both are inline, pill-shaped annotations. `kbd` differs via the bottom bevel shadow — this is the only visual distinction from a badge |
| Button | At same size, KBD is 40–50% shorter than a button — intentional |
| Tooltip | KBD in tooltip body renders at `small` size to not overwhelm tooltip text |

---

## 4. a11y contracts

| Requirement | Value | How enforced |
|------------|-------|-------------|
| Semantic element | `<kbd>` HTML element | HTML |
| Combo structure | `<kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>` nested | HTML (spec pattern) |
| Screen reader | `<kbd>` is announced as keyboard input | Browser default |

---

## ✅ System-fit review checklist (must all be checked before Gate 0 passes)

- [x] Token inheritance documented
- [x] Non-participation in height ladder noted
- [x] Smaller than button at same size — noted as intentional
- [x] Badge visual distinction documented
- [x] a11y via native `<kbd>` element documented
