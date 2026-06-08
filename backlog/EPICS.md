# MeMomy — Epics

Epics are large bodies of work. Each epic links to stories in BACKLOG.md.
Status: `ACTIVE` | `PLANNED` | `ON HOLD` | `DONE` | `ARCHIVED`

---

## EP-01 · Foundation & Infrastructure
**Status:** ACTIVE
**Goal:** Repo, CI/CD, hosting, secrets, auth — everything needed before any user-facing feature ships.
**Constraints:** EU data residency (Supabase Frankfurt), GDPR-ready from day one, under €100/month infra.

---

## EP-02 · Authentication & Onboarding
**Status:** ACTIVE
**Goal:** User can sign up, verify email, choose their journey stage (TTC / Pregnant / Postpartum), and land on the right experience.
**Constraints:** Stage selection gates all downstream features. GDPR consent must be captured at signup.

---

## EP-03 · Pregnancy Journey Dashboard
**Status:** ACTIVE
**Goal:** Week-by-week dashboard for all three stages (TTC / Pregnant weeks 1–42 / Postpartum weeks 1–52). Core content surface of the app.
**Constraints:** Content (42 + 52 + TTC weeks) is the highest non-technical risk — must be commissioned and expert-reviewed.

---

## EP-04 · Profile & Account Management
**Status:** ACTIVE
**Goal:** User can view and edit profile (stage, due date, email), switch stages, and delete their account.
**Constraints:** Stage switching must be seamless. Account deletion = hard GDPR delete (no soft-delete workaround).

---

## EP-05 · Mood Check-ins
**Status:** ACTIVE
**Goal:** Daily mood logging with non-diagnostic output. Low/concerning moods surface a booking prompt or crisis resource — never a diagnosis.
**Constraints:** No automated risk scoring. No clinical claims. Crisis resources must be country-aware.

---

## EP-06 · Warning Signs Module
**Status:** ACTIVE
**Goal:** Stage-aware symptom education (TTC / Pregnant / Postpartum). Escalation path is always: emergency services first, then AsaDoc booking. Keyword search. 30–40 items total.
**Constraints:** No diagnostic language. Education only. Emergency number always shown first.

---

## EP-07 · AsaDoc Specialist Booking
**Status:** ACTIVE
**Goal:** User can browse and book Farsi-speaking specialists via AsaDoc. EU-licensed = "Doctor", Iran-licensed = "Health Coach" with disclaimer.
**Constraints:** Two integration modes: API (preferred) and deep link (fallback). Controlled by `ASADOC_MODE` env var.

---

## EP-08 · Trackers
**Status:** ACTIVE
**Goal:** Passive data-collection tools. No interpretation output.
- Kick counter (enabled at pregnant week ≥ 20)
- Contraction timer (enabled at pregnant week ≥ 36)

**Constraints:** Passive only — count/time, never interpret. No "you should go to hospital" output.

---

## EP-09 · TTC Cycle Logging
**Status:** ACTIVE
**Goal:** User logs period start date → app calculates current cycle phase → shows phase-appropriate content. 4 phases: menstruation / follicular / ovulation / luteal.
**Constraints:** No fertility predictions, no conception probability claims.

---

## EP-10 · GDPR & Privacy Controls
**Status:** ACTIVE
**Goal:** Full GDPR Article 9 compliance: data export, deletion, consent log, cookie-free analytics.
**Constraints:** Pregnancy and mood data are special-category. Must be handled at every data layer (DB, storage, logs).

---

## EP-11 · Content Production
**Status:** ACTIVE
**Goal:** All week-by-week content written, reviewed by a medical professional, and loaded into the CMS/DB before launch.
**Constraints:** 42 pregnant weeks + 52 postpartum weeks + TTC content. Biggest non-technical launch blocker.

---

## EP-12 · Notifications & Reminders
**Status:** PLANNED
**Goal:** Push/email reminders for mood check-ins, upcoming appointments, weekly milestone.
**Constraints:** GDPR consent required per notification type. No marketing without explicit opt-in.

---

## EP-13 · Monetization & Subscriptions
**Status:** PLANNED
**Goal:** Stripe subscription (freemium or tiered). EU payment methods: SEPA, iDEAL, Klarna.
**Constraints:** Free tier must not be a dark pattern. Billing UI must be clear on trial/cancellation terms.

---

## EP-14 · Postpartum Experience
**Status:** PLANNED
**Goal:** Dedicated postpartum dashboard (weeks 1–52), recovery tracking, baby milestone logging.
**Constraints:** Mood tracking in postpartum must escalate PPD resources correctly by country.

---

## EP-15 · Community & Support
**Status:** PLANNED
**Goal:** Safe space for Iranian diaspora women to connect (moderated forum or peer support).
**Constraints:** High moderation cost. Health misinformation risk. Needs legal review before scoping.

---

## EP-16 · React Native Migration
**Status:** PLANNED
**Goal:** Port PWA to React Native for native iOS/Android distribution.
**Constraints:** Phase 2 only. Do not let Phase 1 architecture decisions block this path.

---

> See ARCHIVE.md for epics that were considered and deprioritized with their reasons.
