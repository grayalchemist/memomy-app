# MeMomy Design System

Source of truth for tokens, type, spacing, motion, and component guidelines.
All tokens live in [`app/globals.css`](../app/globals.css). Methodology: OKLCH
perceptual scales (hue + chroma held, lightness varied; chroma reduced at
extremes), plum-tinted neutrals, primitive → semantic token hierarchy, WCAG AA
contrast targets.

## Color

### Primitive ramps (in `@theme`)
- **Plum** `--color-plum-50…950` (hue ≈300) — primary brand scale.
- **Emerald** `--color-emerald-50…700` (hue ≈165) — accent / success.
- **Gold** `--color-gold-300…600` (hue ≈80) — highlight / warning.
- **Neutral** `--color-neutral-50…950` (hue 300, chroma 0.004–0.015) — plum-tinted grays.
- **Sapphire** `--color-sapphire-500/600` (hue ≈250) — info / Doctor.
- **Ruby** `--color-ruby-500/600` (hue ≈25) — destructive.

### Semantic layer (light / dark, in `:root` / `.dark`)
| Token | Light | Dark | Maps to |
|---|---|---|---|
| `--background` | near-white plum tint | deep plum (0.15 L) | page surface |
| `--foreground` | deep plum ink (0.205 L) | near-white (0.965 L) | body text |
| `--foreground-secondary` | mid neutral | mid-light neutral | sub-headings |
| `--card` / `--popover` | pure-ish | 0.19 / 0.21 L surfaces | elevated content |
| `--primary` / `--primary-foreground` | plum-500 / white | plum-400 / dark | brand action |
| `--accent` / `--accent-foreground` | emerald-500 | emerald-400 | forward action |
| `--muted` / `--muted-foreground` | neutral-100 / neutral-600 | 0.24 L / 0.68 L | quiet surfaces / hints |
| `--success` | emerald-500 | emerald-400 | positive state |
| `--warning` / `--warning-foreground` | gold-500 / dark-gold | gold-400 / ink | caution |
| `--info` / `--info-foreground` | sapphire-500 | sapphire-lighter | Doctor / clinical-trust |
| `--coach` / `--coach-foreground` | emerald-600 | emerald-400 | Health Coach / wellness |
| `--destructive` / `--destructive-foreground` | ruby-500 | ruby-lighter | danger / crisis |
| `--border` / `--input` / `--ring` | neutral-200 | white@8% / 12% | hairlines + focus |

### Legacy token bridges
`--color-text-primary`, `--color-text-secondary`, `--color-text-muted`,
`--color-bg-muted`, `--color-bg-base`, `--color-info`, `--color-coach`,
`--color-health-coach`, `--color-primary-light`, `--color-primary-dark` are
aliased in `@theme inline` so existing classnames (`text-text-primary`,
`bg-bg-muted`, `bg-health-coach`, …) resolve to the new system without 125 file
edits. New code should use the canonical shadcn names (`text-foreground`,
`bg-muted`, …).

### Gradients (utilities, surfaces only — never text)
`.bg-gradient-brand` (plum 500→600) · `.bg-gradient-brand-soft` ·
`.bg-gradient-accent` (emerald 400→600) · `.bg-gradient-spectrum` (plum→emerald,
use sparingly) · `.bg-gradient-hero` (radial plum+emerald orbs, hero only).

### Glass
`.bg-glass` — `backdrop-blur(16px) saturate(160%)` + 72% card. Use on floating
bars (booking confirm, bottom sheets) and over `bg-gradient-hero`.

## Type

Single family **Manrope** (`--font-sans` / `--font-heading`). `tabular-nums` on
all numeric/data elements.

| Token | Size / weight | Use |
|---|---|---|
| Display | text-3xl/4xl, weight 800, tracking -0.02em | hero / page title |
| H2 | text-xl/2xl, weight 700 | section heads |
| H3 | text-lg, weight 600 | card titles |
| Body | text-sm/base, weight 400–500 | body copy |
| Small / label | text-xs/sm, weight 500–600, tracking 0.02em | eyebrows, labels |
| Numeric | text-sm/base + `tabular-nums` | weeks, stats, counts |

## Spacing & layout
- Mobile-first, `max-w-md` phone shell with `shadow-2xl` (see `app/(main)/layout.tsx`).
- `pb-safe` on the BottomNav for the iOS home indicator.
- Spacing follows Tailwind's default scale; no custom ramp needed.

## Radius
`--radius: 0.75rem` (base). Derived: sm 0.45 · md 0.6 · lg 0.75 · xl 1.05 · 2xl
1.35 · 3xl 1.65 · 4xl 1.95 rem. **One scale across the product** (shape-lock).

## Elevation
Soft plum-tinted shadow scale `--shadow-2xs…2xl` + `--shadow-glow` (plum halo
for a single emphasis element per screen). Dark mode gets depth from surface
lightness, not shadow — keep shadows subtle in dark.

## Motion
- **Easing:** `--ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)` (expo out). No
  bounce/elastic, no overshoot.
- **Entrance:** `.animate-fade-up` (0.6s) / `.animate-fade-in` (0.5s) on key
  cards, staggered via inline `style={{ animationDelay }}`.
- **Ambient:** `.animate-float` (hero orbs), `.animate-shimmer` (loading
  gradients). Both gate behind `prefers-reduced-motion`.
- Sheet / Select / Popover use tw-animate-css `animate-in/out` + `slide-in-from-*`.

## Component guidelines
- **Card:** hairline `border-border` + `shadow-sm`, rounded-xl. `glass` variant
  for floating overlays. No heavy borders.
- **Button:** default = solid plum with subtle gradient + soft shadow; `gradient`
  variant for the single primary CTA per screen; `ghost`/`outline` for secondary.
  One primary CTA per screen.
- **Badge:** severity variants `emergency` (destructive), `booking` (info/coach),
  `monitor` (muted/warning) — replaces inline severity pills.
- **Stat tile / progress ring:** tabular-nums, restrained; one accent only.
- **BottomNav:** glass surface, pill active indicator, `pb-safe`.
- **Empty state:** single line of copy + one CTA, never an illustration cliché.

## Accessibility
- Contrast targets: body text 4.5:1 (AA), large/UI 3:1, placeholder 4.5:1.
- Focus visible: `ring` plum, 2px offset. Never remove focus outlines.
- Touch targets ≥ 44px. Crisis buttons never gated behind gestures.
- `prefers-reduced-motion` honored globally (see `globals.css`).
- All color meaning has a non-color affordance (icon + label), not color alone.

## AsaDoc labeling (non-negotiable)
- **Doctor** (EU-licensed) → `info`/sapphire treatment, license visibly shown.
- **Health Coach** (Iran-licensed) → `coach`/emerald treatment + disclaimer:
  "lifestyle/wellness only, no clinical advice".

## Crisis (non-negotiable)
On any psychological check-in distress path, crisis numbers surface first and
unambiguously (DE 0800 111 0 111 · SE 90101 · NL 113 · UK 116 123 · FR 3114).
Crisis UI uses `destructive`; nothing competes with it on the same surface.
