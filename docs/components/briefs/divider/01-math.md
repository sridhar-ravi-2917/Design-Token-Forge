<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Divider — Mathematical Contracts

> Values sourced from divider.tokens.css.

---

## 1. Spacing ladder (block margin above + below)

| Size   | Spacing (margin-block each side) |
|--------|--------------------------------:|
| micro  | 2px                              |
| tiny   | 4px                              |
| small  | 6px                              |
| base   | 8px                              |
| medium | 10px                             |
| large  | 12px                             |
| big    | 14px                             |
| huge   | 16px                             |
| mega   | 20px                             |
| ultra  | 24px                             |

---

## 2. Fixed dimensions

| Property | Value |
|---------|------:|
| Thickness (`--div-thickness`) | 1px |
| Default style | solid |
| Default indent-start | 0px |
| Default indent-end | 0px |

---

## 3. Ratio contracts

### Derived value table
Shown in the spacing table above.

### Height : Font-size ratio
N/A — divider is a 1px line with no intrinsic text. The label (if present) inherits the page context.

### Padding-inline ratio
N/A — divider has no padding-inline (it is a line, not a container). The `--div-indent-*` tokens set how far the line is inset from its container edges.

### Label typography
```
label-font-size: var(--font-size-xs)
label-font-weight: var(--font-weight-medium)
label-gap: var(--spacing-8)
```
Fixed at XS size regardless of divider density — label is always a small annotation.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Spacing ladder from source documented
- [x] Fixed thickness documented
- [x] Non-participation in height ladder noted
- [x] Label typography values documented
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted (indent tokens instead)
