# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Calm, warm minimalism: one white card on a warm off-white page, a single deep teal accent reserved for money figures, tabular numerals as the hero — Stripe/Linear restraint with hospitality warmth.

## Colors

- `--color-bg`: **#F7F6F3**
- `--color-surface`: **#FFFFFF**
- `--color-surfaceSubtle`: **#FAF9F7**
- `--color-fg`: **#1A1917**
- `--color-fgMuted`: **#78716C**
- `--color-muted`: **#78716C**
- `--color-border`: **#E6E3DE**
- `--color-borderStrong`: **#D6D2CB**
- `--color-accent`: **#0F766E**
- `--color-accentHover`: **#115E59**
- `--color-accentActive`: **#134E4A**
- `--color-accentContrast`: **#FFFFFF**
- `--color-accentTint`: **#EFFAF7**
- `--color-accentRing`: **rgba(15,118,110,0.28)**
- `--color-danger`: **#B42318**
- `--color-dangerBorder`: **#E8B4AE**
- `--color-dangerTint`: **#FEF3F2**
- `--color-success`: **#15803D**
- `--color-focusRing`: **rgba(15,118,110,0.28)**
- `--color-disabledBg`: **#EFEDE9**
- `--color-disabledFg`: **#A8A29E**
- `--color-disabledBorder`: **#E6E3DE**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `font_family_mono`: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace
- `heading_weight`: 600
- `body_weight`: 400
- `label_weight`: 500
- `figure_weight`: 600
- `size_display`: 32px
- `size_h1`: 20px
- `size_figure`: 26px
- `size_body`: 15px
- `size_label`: 13px
- `size_small`: 12px
- `line_height_tight`: 1.2
- `line_height_body`: 1.5
- `numeric_style`: font-variant-numeric: tabular-nums lining-nums; money values right-aligned and never truncated

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

Base: display inline-flex, align-items center, justify-content center, gap 8px, min-height 44px (44px tap target on all viewports), padding 12px 20px, radius md (10px), font 15px/500, letter-spacing 0.01em, transition 120ms ease-out on background/color/border/box-shadow, cursor pointer. Variants: primary = bg accent #0F766E, fg accentContrast #FFFFFF, no border. secondary = bg surface #FFFFFF, fg fg #1A1917, border 1px solid borderStrong #D6D2CB. ghost = transparent bg, fg fgMuted #78716C, border none, padding 12px 12px. States (all variants): default as above; hover = primary bg accentHover #115E59, secondary bg surfaceSubtle #FAF9F7 + border accent #0F766E, ghost bg surfaceSubtle; active = primary bg accentActive #134E4A with transform translateY(1px) and no shadow, secondary bg #F1EFEB; focus-visible = 2px solid accentRing outline with 2px offset (never remove the focus ring; also works via keyboard only); disabled = bg disabledBg #EFEDE9, fg disabledFg #A8A29E, border disabledBorder #E6E3DE, cursor not-allowed, no hover/active change, opacity NOT reduced (contrast stays legible). IMPLEMENTATION RULE (AC-09): the app has no submit button and no reset button unless the function is really wired up — a rendered Button must always perform the action its label promises. If nothing is implemented, render no Button at all. Labels are verbs in sentence case ('Clear all fields').

### Input / MoneyField

Vertical group: label (13px/500 fg), 6px gap, then the control, then optional helper/error line (12px). Control: full width of the card column, min-height 44px, padding 10px 12px, radius md (10px), border 1px solid border #E6E3DE, bg surface #FFFFFF, fg #1A1917, font 15px/400 with tabular-nums, text-align left. European input affordance: type="text" with inputMode="decimal" so a comma is accepted; a fixed, non-interactive unit suffix ('€' or '%') sits right-aligned inside the field in fgMuted — it is a Unit Affordance, never a decorative pseudo-control. Placeholder: '#78716C' in fgMuted, real example values ('0,00', '10', '1'). States: hover = border borderStrong #D6D2CB; focus = border accent #0F766E + box-shadow 0 0 0 3px accentRing; filled-valid = border #E6E3DE; invalid = border 1px solid danger #B42318 + bg dangerTint #FEF3F2 + aria-invalid="true"; disabled = bg disabledBg #EFEDE9, fg disabledFg, cursor not-allowed. No spinners/native number steppers (they look operable but behave inconsistently — hide them).

### FieldError

Shown directly under the offending field, above the results. Row: 4px gap, warning glyph 14px in danger #B42318 + text 12px/400 danger. Text names the field explicitly: 'Bill amount must be a number of 0 or more.' / 'Tip percentage must be a number of 0 or more.' / 'Number of people must be a whole number of at least 1.' role="alert", aria-live="polite", associated to the input via aria-describedby. Reserve the line height so appearing/disappearing never shifts the layout (no jump). Appears only after first interaction with that field (touched) or after a submit attempt — never on initial, untouched render (AC-05). When input becomes valid the block unmounts immediately.

### CalculatorCard

The one page's only surface: bg surface #FFFFFF, radius lg (16px), border 1px solid border #E6E3DE, box-shadow 0 1px 2px rgba(26,25,23,0.04), 0 8px 24px rgba(26,25,23,0.05), padding 24px (mobile) / 32px (>=640px). Inside: h1 20px/600 'Tip calculator' + one-line 13px fgMuted subtitle ('Bill, tip and number of people — results update as you type'), 24px gap, then the three field groups at 16px vertical rhythm, 24px gap, divider 1px border, then the results. Single column at every width — no side-by-side form/results.

### ResultRow

Row: label left (15px/400 fgMuted, e.g. 'Tip'), value right (26px/600 fg, font-variant-numeric tabular-nums, letter-spacing -0.01em, currency as an inline suffix '€' at 15px/500 fgMuted with 4px space). Money format is German: thousands '.', decimals ',', always exactly two decimals ('10,00 €'), never rounded inside the row. Rows stacked with 12px gap, 16px vertical padding, 1px border between rows. Emphasis row 'Per person' = bg accentTint #EFFAF7, radius md, padding 12px 16px, accent-tinted label fg #115E59, value in accent #0F766E, so the headline number is unmistakable. Values are real text in the DOM (selectable, screen-reader readable), never an image or a disabled input.

### ResultPanel

Aggregate of three ResultRows plus heading 'Results' (13px/500 uppercase letter-spacing 0.04em fgMuted). Borderless container inside the card, no nested card-in-card. If there is no valid result yet, the panel renders neutral zero placeholders '0,00 €' in fgMuted — the layout keeps its height so nothing jumps when numbers start changing. In an invalid state the panel is replaced by a muted single-line notice (13px fgMuted) such as 'Fix the highlighted field to see results.' — never a coloured money value, never a stale figure (AC-04/AC-06).

### StatusLine

Optional 13px fgMuted line under the results for live feedback ('Updates as you type'). Pure text, no icon, no spinner, no timer bar. Only rendered if it carries real information; no decorative chrome anywhere on the page (AC-09).

## Layout Principles

- Single page, single column, no navigation, no routing, no sidebar — exactly one focal surface (the CalculatorCard) centred on the page.
- Page container: max-width 480px (form column never wider than 480px), horizontally centred with padding 24px left/right; the card is vertically centred with min-height 100dvh and 32px vertical breathing room.
- Vertical rhythm: 4/8/12/16/24/32/48px only. 16px between form fields, 24px between blocks, 32-48px around the card.
- Breakpoints: base 0-639px (single column, card padding 24px), >=640px (card padding 32px, same single column, more outer whitespace). No layout switch, no multi-column form — the app stays usable down to 320px width.
- Money is the typographic hero: values 26px/600 tabular numerals, right-aligned in their row; body copy stays 15px and never competes with them.
- Contrast rules: fg #1A1917 on surface #FFFFFF (~15:1) and fgMuted #78716C on surface (~4.8:1) both pass WCAG AA; accent #0F766E on white (~4.9:1) is safe for text; danger #B42318 on dangerTint passes AA. Never signal state by colour alone — an invalid field also carries a named error text and aria-invalid.
- States are always visible: hover, focus-visible (2px accent ring, never removed), active and disabled must be distinguishable in a black-and-white screenshot; no invisible or fake controls.
- Reserve height for error lines and the results panel so live re-calculation never causes layout shift.
- All interactive targets are at least 44x44px and have a visible label — no icon-only control, no native spinner, no non-functional slider.
