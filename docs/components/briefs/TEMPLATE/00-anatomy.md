<!-- status: draft -->
<!-- last-verified: 2026-06-18 -->

# {ComponentName} — Anatomy Study

> Gate 0 file. Must be completed before any spec, tokens, or CSS is written.
> Minimum: study 3 real design systems. Fill every section. Do not leave placeholders.

---

## 1. What this component IS (one sentence, concrete)

<!-- e.g. "A pressable control that triggers a single discrete action, distinct from links which navigate." -->

---

## 2. Minimum viable anatomy (elements that can NEVER be removed)

<!-- List every structural element that must always be present.
     e.g. for button: root element, label slot
     e.g. for input:  root wrapper, native input, label -->

| Element | Role | Always present? |
|---------|------|-----------------|
|         |      | yes             |

---

## 3. Maximum anatomy (slots that are optional)

<!-- Every optional slot the component can accept.
     e.g. for button: leading icon, trailing icon, loading spinner, badge -->

| Slot | Present when | Notes |
|------|-------------|-------|
|      |             |       |

---

## 4. Real-world edge cases (what breaks naïve implementations)

<!-- These are the cases that cause rework if not studied first.
     Think: what does a designer do in practice that a simple impl can't handle? -->

- [ ] Very long label (wrapping vs truncation — which is correct?)
- [ ] Icon-only (no label) — does padding change? Does accessibility need aria-label?
- [ ] Nested inside a tight container (overflow behaviour)
- [ ] Used in a form row next to other components (height alignment)
- [ ] Disabled while loading
- [ ] RTL layout — does icon position flip?
- [ ] Custom: <!-- add component-specific cases -->

---

## 5. What designers customize most in practice

<!-- Order by frequency. These must be exposed as CSS custom properties.
     Look at real Figma files, design system usage reports, or just ask. -->

1.
2.
3.
4.
5.

---

## 6. Reference system study

### Material Design 3
- Component URL:
- Key decisions different from our approach:
- Worth borrowing:

### Radix UI / shadcn
- Component URL:
- Key decisions different from our approach:
- Worth borrowing:

### Apple HIG
- Component URL:
- Key decisions different from our approach:
- Worth borrowing:

### (Optional 4th system — e.g. Ant, Spectrum, Fluent)
- System:
- Component URL:
- Key decisions:

---

## 7. Decision: What makes this component feel "right"

<!-- Aesthetic contracts — not pixel values, but the RULES.
     e.g. "The component height must feel proportional to its font size — never taller than 3× the cap-height."
     e.g. "Icon and label gap must feel like a breath, not a chasm — approximately 0.5× the icon size."
     These become the math contracts in 01-math.md -->

-
-
-

---

## ✅ Anatomy review checklist (must all be checked before Gate 0 passes)

- [ ] All mandatory anatomy elements listed
- [ ] All optional slots identified
- [ ] At least 5 edge cases documented
- [ ] Top 5 designer customizations listed
- [ ] At least 3 reference systems studied
- [ ] Aesthetic rules written in plain English (become math in 01-math.md)
