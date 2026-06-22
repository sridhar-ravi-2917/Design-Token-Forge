<!-- status: complete -->
<!-- last-verified: 2026-06-22 -->

# Slider — Mathematical Contracts

> Values sourced from slider.tokens.css. Slider does NOT participate in the button/input height ladder — it uses its own track height + thumb width ladders.

---

## 1. Track height ladder

| Size   | Track height | Thumb width = height |
|--------|------------:|--------------------:|
| micro  | 2px          | 10px                |
| tiny   | 3px          | 12px                |
| small  | 4px          | 14px                |
| base   | 6px          | 18px                |
| medium | 8px          | 20px                |
| large  | 10px         | 24px                |
| big    | 14px         | 28px                |
| huge   | 18px         | 32px                |
| mega   | 24px         | 40px                |
| ultra  | 32px         | 48px                |

---

## 2. Ratio contracts

### Thumb width : Track height ratio
```
ratio(size) = thumb-w(size) / track-h(size)
```
| Size | Ratio |
|------|------:|
| micro | 5.0× |
| tiny  | 4.0× |
| small | 3.5× |
| base  | 3.0× |
| medium | 2.5× |
| large  | 2.4× |
| big    | 2.0× |
| huge   | 1.8× |
| mega   | 1.7× |
| ultra  | 1.5× |

Thumb is always larger than the track — ratio decreases as size grows (thick tracks look proportionally better with relatively smaller thumbs).

### Derived value table
Already shown in the track height table above.

### Height : Font-size ratio
N/A — slider has no text in the interactive zone. The optional label/value row inherits the page font size.

### Padding-inline ratio
N/A — slider does not have padding-inline on its track (the thumb overhangs the track edges; padding is managed via track min-width and thumb offset).

---

## 3. Thumb tap-target contract
```
min-tap-target = max(thumb-w, 44px)   /* WCAG 2.5.5 Level AA */
```
At `micro`/`tiny`/`small` the visual thumb is smaller than 44px. The tap target is padded via the hidden `<input type="range">` overlay.

---

## ✅ Math review checklist (must all be checked before Gate 0 passes)

- [x] Track height ladder documented from source
- [x] Thumb width ladder documented from source
- [x] Thumb:track ratio computed for every size
- [x] Non-participation in cross-component height ladder noted explicitly
- [x] Tap-target minimum documented
- [x] Derived value table complete
- [x] Height : Font-size ratio — N/A noted
- [x] Padding-inline ratio — N/A noted
