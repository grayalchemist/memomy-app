# MeMomy Brand Guide

> A calm, private companion for the pregnancy journey — built for Iranian-diaspora
> women navigating European healthcare. Design SERVES the product: it must feel
> trustworthy, warm, and premium, never clinical, never cliché.

## Identity

**Name:** MeMomy (مه‌مامی) — a portmanteau of "me" + "momy" (maternal). Friendly,
> first-person, human.

**Positioning:** The culturally-competent pregnancy companion that connects
> diaspora women to Farsi-speaking specialists (via AsaDoc). Not a medical
> device — a guide and a bridge.

**Wordmark direction:** Set "MeMomy" in Manrope, weight 700–800, tight tracking
> (-0.02em), plum-500. The lowercase "m…m" symmetry is the signature; keep it
> solid color, no gradient fill, no decorative flourish. Optional: a small
> emerald dot accent on the final "y" as a period — a quiet "you're here" mark.
> Do **not** render the wordmark in gradient text (AI-tell).

## Voice

- **Calm, clear, never alarmist.** Even warning signs read as guidance, not panic.
- **Plain language.** Short sentences. No jargon, no marketing superlatives.
- **First-person warm.** "You" / "your" — never "the patient."
- **Honest about limits.** Always distinguish **Doctor** (EU-licensed, clinical)
  from **Health Coach** (Iran-licensed, lifestyle/wellness only). Never imply
  diagnosis or automated risk scoring.
- **Crisis-first.** When someone is in distress, the crisis number comes before
  anything else — no ambiguity.

## Palette story — Deep Jewel Tones

Jewels suggest something precious, held, kept safe — the emotional core of the
product. The palette is deliberately *not* the default wellness pink or the
default AI purple-glow:

| Role | Token | Light | Dark | Meaning |
|---|---|---|---|---|
| Primary | `primary` (plum) | `#7B4BC0`-ish | lighter plum | The brand. Trust, depth, calm authority. |
| Accent | `accent` (emerald) | emerald-500 | emerald-400 | Vitality, growth, the journey forward. |
| Highlight | `warning`/`--gradient-*` (gold) | gold-500 | gold-400 | Warmth, emphasis, the human touch. |
| Surfaces | plum-tinted neutrals | warm near-white | deep plum-tinted dark | Depth without shadow-inflation. |

**Composition (60-30-10):** 60% neutral surface · 30% primary plum · 10% emerald
or gold accent. One accent per surface — never combine emerald and gold on the
same card.

## Do / Don't

### Do
- Use plum as the dominant brand color; emerald for forward/action states; gold
  sparingly for emphasis only.
- Pair the wordmark with Manrope; tabular figures for any number/week/stat.
- Keep one corner-radius scale (base `0.75rem`) across the whole product.
- Respect `prefers-reduced-motion`; keep motion to smooth ease-out reveals.

### Don't
- **No pink.** No baby motifs, no strollers, no pastel nurseries.
- **No clinical clipart** — no stethoscopes, no syringes, no hospital scrubs.
- **No AI purple/blue glow** (the "LILA" default). Plum is intentional and
  saturated; do not smear it into a violet→blue gradient haze.
- **No cream / `#f5f1ea` / `#fbf8f1`** warm-paper backgrounds — that is the
  saturated 2026 AI default. Our neutrals are *plum-tinted*, not cream.
- **No gradient text** on headings or metrics — solid colors only.
- **No diagnostic claims, no risk scoring, no medical chatbot.** (GDPR Art. 9 /
  product constraint — see CLAUDE.md.)
- **No advertising SDKs, no Google Analytics, no data outside the EEA.**

## Typography

Single family: **Manrope** (warm geometric). Display weight 700–800 for
headlines, 500–600 for sub-heads, 400–500 for body, with `tabular-nums` on
stats. No second family, no serif. This keeps the product coherent and fast.

## Application across the journey

The system adapts by *content*, not by *ornament*, to the three stages:
- **TTC** — emerald-forward (growth, trying, forward-looking).
- **Pregnant** — plum-forward (the brand core, week-by-week).
- **Postpartum** — warm gold accents return gently (recovery, care, softness).

The color shift is semantic (which accent leads), never themed illustration.
