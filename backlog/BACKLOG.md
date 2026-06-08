# MeMomy — Backlog

## How to read this file

- **Status tags:** `[TODO]` `[IN PROGRESS]` `[DONE]` `[BLOCKED]` `[WONT DO]`
- **Priority:** `P0` = must ship before beta · `P1` = next sprint · `P2` = planned · `P3` = nice-to-have
- **IDs:** `US-###` = User Story · `T-###` = Task · Format: Epic prefix (e.g. EP-01)
- When something is deprioritized or replaced, move it to ARCHIVE.md with a reason — never delete.

---

## EP-01 · Foundation & Infrastructure

### US-101 · Project scaffold is production-ready
> As a developer, I need the repo, CI/CD, hosting, and secrets configured so I can ship features without infra blockers.

**Priority:** P0 | **Status:** `[IN PROGRESS]`

- `[DONE]` T-101-01 · Init Next.js 15 (App Router) project
- `[DONE]` T-101-02 · Configure shadcn/ui + Tailwind CSS v4
- `[DONE]` T-101-03 · Set up Supabase project in eu-west-1 (Frankfurt)
- `[TODO]` T-101-04 · Configure Doppler for secrets management
- `[TODO]` T-101-05 · Set up Coolify on Hetzner Nuremberg
- `[TODO]` T-101-06 · Configure CI/CD pipeline (GitHub Actions → Coolify)
- `[TODO]` T-101-07 · Set up Sentry EU (de.sentry.io) for error tracking
- `[TODO]` T-101-08 · Configure Plausible Analytics (EU, cookieless)
- `[TODO]` T-101-09 · Set up Resend for transactional email
- `[TODO]` T-101-10 · PWA manifest + service worker baseline

### US-102 · AsaDoc integration layer is abstracted
> As a developer, I need a single integration point for AsaDoc so I can switch between API and deep link mode without touching UI code.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-102-01 · Create `/lib/asadoc/index.ts` abstraction layer
- `[TODO]` T-102-02 · Implement API path (Path A) with feature flag `ASADOC_MODE=api`
- `[TODO]` T-102-03 · Implement deep link path (Path B) fallback `ASADOC_MODE=deeplink`
- `[TODO]` T-102-04 · Write integration tests for both paths

---

## EP-02 · Authentication & Onboarding

### US-201 · User can create an account
> As a new user, I want to sign up with email and password so I can access my personal pregnancy journey.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-201-01 · Email + password sign-up with Supabase Auth
- `[TODO]` T-201-02 · Email verification flow
- `[TODO]` T-201-03 · GDPR consent capture at sign-up (checkbox + consent log stored in DB)
- `[TODO]` T-201-04 · Privacy policy and Terms pages (required before consent checkbox)

### US-202 · User can sign in and sign out
> As a returning user, I want to sign in and have my session persist across visits.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-202-01 · Sign-in form with Supabase session handling
- `[TODO]` T-202-02 · Persistent session (remember me)
- `[TODO]` T-202-03 · Sign-out that clears session completely
- `[TODO]` T-202-04 · Password reset via email

### US-203 · User chooses their journey stage at onboarding
> As a new user, I want to select whether I'm TTC, pregnant, or postpartum so the app shows me the right experience.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-203-01 · Stage selection screen (TTC / Pregnant / Postpartum) shown after sign-up
- `[TODO]` T-203-02 · For Pregnant: due date or LMP input → calculate current week
- `[TODO]` T-203-03 · For Postpartum: birth date input → calculate postpartum week
- `[TODO]` T-203-04 · Store stage + dates in user profile (Supabase)
- `[TODO]` T-203-05 · Redirect to correct dashboard based on stage

---

## EP-03 · Pregnancy Journey Dashboard

### US-301 · Pregnant user sees their current week dashboard
> As a pregnant user, I want to see week-specific content for my current week so I know what to expect.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-301-01 · Current week calculation from due date/LMP
- `[TODO]` T-301-02 · Week card component (week number, trimester, key milestone)
- `[TODO]` T-301-03 · Baby size/development content block (week-specific, expert-reviewed content)
- `[TODO]` T-301-04 · What to expect this week content block
- `[TODO]` T-301-05 · Week navigation (previous weeks visible, future weeks locked)

### US-302 · Postpartum user sees their recovery week dashboard
> As a postpartum user, I want to see week-specific recovery content so I know what's normal.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-302-01 · Postpartum week calculation from birth date
- `[TODO]` T-302-02 · Recovery milestone content block (week-specific)
- `[TODO]` T-302-03 · Baby development content block (week-specific)

### US-303 · TTC user sees phase-appropriate dashboard
> As a TTC user, I want to see content relevant to my current cycle phase so I feel supported.

**Priority:** P1 | **Status:** `[TODO]`

- `[TODO]` T-303-01 · Current phase calculation from logged period start date
- `[TODO]` T-303-02 · Phase content block (menstruation / follicular / ovulation / luteal)
- `[TODO]` T-303-03 · Cycle progress visualization (no predictions, just phase awareness)

---

## EP-04 · Profile & Account Management

### US-401 · User can view and edit their profile
> As a user, I want to see and update my profile information so my experience stays accurate.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-401-01 · Profile page showing: journey stage, due date, email
- `[TODO]` T-401-02 · Edit due date / birth date (recalculates current week immediately)
- `[TODO]` T-401-03 · Edit email with re-verification
- `[TODO]` T-401-04 · Change password flow

### US-402 · User can switch journey stage
> As a user, my situation may change — I want to switch from TTC to Pregnant, or Pregnant to Postpartum, from within the app.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-402-01 · Stage switch UI on profile page with confirmation dialog
- `[TODO]` T-402-02 · On switch: prompt for new dates (due date if Pregnant, birth date if Postpartum)
- `[TODO]` T-402-03 · On switch: redirect to new stage dashboard
- `[TODO]` T-402-04 · Preserve historical data from previous stage (do not delete)

### US-403 · User can delete their account (GDPR)
> As a user, I want to permanently delete my account and all my data in compliance with GDPR Article 17.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-403-01 · Account deletion button on profile page with confirmation dialog
- `[TODO]` T-403-02 · Hard delete: all user rows across all tables (no soft-delete)
- `[TODO]` T-403-03 · Hard delete: all files in Supabase Storage
- `[TODO]` T-403-04 · Confirmation email sent after deletion
- `[TODO]` T-403-05 · Session invalidated and user redirected to landing page

---

## EP-05 · Mood Check-ins

### US-501 · User can log their daily mood
> As a user, I want to log how I'm feeling today so I can track my emotional wellbeing over time.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-501-01 · Mood check-in UI (scale or emoji-based, non-clinical language)
- `[TODO]` T-501-02 · Optional free-text note field
- `[TODO]` T-501-03 · Store mood entry in Supabase (encrypted, special-category handling)
- `[TODO]` T-501-04 · One check-in per day enforced (edit allowed same day)

### US-502 · Low mood surfaces appropriate support — never a diagnosis
> As a user who logs a low mood, I want to be offered support options, not a clinical assessment.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-502-01 · Define mood threshold that triggers escalation UI (e.g. lowest 1–2 options)
- `[TODO]` T-502-02 · Escalation UI: "Would you like to speak with a specialist?" → AsaDoc booking
- `[TODO]` T-502-03 · Crisis resource shown if user dismisses booking prompt
- `[TODO]` T-502-04 · Crisis resources are country-aware (detect from profile or browser locale)
- `[TODO]` T-502-05 · No text anywhere implies diagnosis, scoring, or clinical assessment

### US-503 · User can view their mood history
> As a user, I want to see my past mood logs so I can notice patterns myself.

**Priority:** P1 | **Status:** `[TODO]`

- `[TODO]` T-503-01 · Mood history list (last 30 days)
- `[TODO]` T-503-02 · Simple visual (bar or dot chart — no trend lines that imply analysis)
- `[TODO]` T-503-03 · Export mood data as part of GDPR data export

---

## EP-06 · Warning Signs Module

### US-601 · User can browse warning signs for their stage
> As a user, I want to know which symptoms to watch for in my current stage so I can act quickly if needed.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-601-01 · Warning signs list component (stage-aware: TTC / Pregnant / Postpartum)
- `[TODO]` T-601-02 · Keyword filter/search across all items
- `[TODO]` T-601-03 · Each item: symptom name, plain-language description, escalation path
- `[TODO]` T-601-04 · Escalation path always starts: "Call emergency services" → then AsaDoc
- `[TODO]` T-601-05 · 30–40 items total across all stages (content to be expert-reviewed)
- `[TODO]` T-601-06 · No diagnostic language in any item copy

---

## EP-07 · AsaDoc Specialist Booking

### US-701 · User can browse available specialists
> As a user, I want to see available Farsi-speaking specialists so I can choose the right one for my needs.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-701-01 · Specialist listing UI (name, type label, specialty, availability)
- `[TODO]` T-701-02 · EU-licensed → labeled "Doctor" with license number visible
- `[TODO]` T-701-03 · Iran-licensed → labeled "Health Coach" with disclaimer: lifestyle/wellness only
- `[TODO]` T-701-04 · Filter by specialty / type

### US-702 · User can book an appointment
> As a user, I want to book a session with a specialist without leaving the app.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-702-01 · Booking flow (API path): in-app calendar + confirmation
- `[TODO]` T-702-02 · Booking flow (deep link path): hand-off to AsaDoc with pre-filled context
- `[TODO]` T-702-03 · Booking confirmation shown in-app
- `[TODO]` T-702-04 · Upcoming appointments visible in dashboard or profile

---

## EP-08 · Trackers

### US-801 · Pregnant user (≥ week 20) can use the kick counter
> As a pregnant user, I want to count baby kicks so I can track fetal movement — the app just counts, it never tells me what the count means.

**Priority:** P1 | **Status:** `[TODO]`

- `[TODO]` T-801-01 · Kick counter UI: large tap target, session timer, count display
- `[TODO]` T-801-02 · Feature gated: only visible at pregnant week ≥ 20
- `[TODO]` T-801-03 · Session saved with timestamp and count (no interpretation stored or shown)
- `[TODO]` T-801-04 · History: list of past sessions (date, count, duration)
- `[TODO]` T-801-05 · Copy: no language suggesting what count is "normal" or "concerning"

### US-802 · Pregnant user (≥ week 36) can use the contraction timer
> As a pregnant user, I want to time my contractions so I have accurate data to share with my care team.

**Priority:** P1 | **Status:** `[TODO]`

- `[TODO]` T-802-01 · Contraction timer UI: start/stop button, duration display, interval between contractions
- `[TODO]` T-802-02 · Feature gated: only visible at pregnant week ≥ 36
- `[TODO]` T-802-03 · Session saved with contraction list (start time, duration)
- `[TODO]` T-802-04 · No language suggesting when user should go to hospital

---

## EP-09 · TTC Cycle Logging

### US-901 · TTC user can log their period start date
> As a TTC user, I want to log when my period starts so the app can show me my current cycle phase.

**Priority:** P1 | **Status:** `[TODO]`

- `[TODO]` T-901-01 · Period start date log UI (calendar picker)
- `[TODO]` T-901-02 · Calculate current phase from logged date (menstruation / follicular / ovulation / luteal)
- `[TODO]` T-901-03 · Phase shown on TTC dashboard with phase-appropriate content
- `[TODO]` T-901-04 · Cycle history: list of logged cycles
- `[TODO]` T-901-05 · No fertility predictions, no conception probability, no "fertile window" claims

---

## EP-10 · GDPR & Privacy Controls

### US-1001 · User can export all their data
> As a user, I want to download a copy of all my personal data in compliance with GDPR Article 20.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-1001-01 · Data export endpoint: collects all user rows (profile, mood, kicks, contractions, cycles)
- `[TODO]` T-1001-02 · Export format: JSON file download
- `[TODO]` T-1001-03 · Export available from profile/privacy settings page
- `[TODO]` T-1001-04 · Audit log entry created when export is requested

### US-1002 · Consent log is maintained
> As a user, I want a record of what I consented to and when, and the ability to review it.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-1002-01 · Consent log table in Supabase (user_id, consent_type, timestamp, version)
- `[TODO]` T-1002-02 · Consent captured at sign-up stored immediately
- `[TODO]` T-1002-03 · Privacy settings page shows consent history
- `[TODO]` T-1002-04 · Consent version bumped when privacy policy changes (re-consent flow)

### US-1003 · App uses no advertising or cross-site tracking
> As a user, I want confidence that my health data is not shared with advertisers or third parties.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-1003-01 · Plausible Analytics configured (no cookies, no cross-site tracking)
- `[TODO]` T-1003-02 · No Google Analytics, Facebook Pixel, or any ad SDK
- `[TODO]` T-1003-03 · CSP headers block third-party script injection
- `[TODO]` T-1003-04 · Privacy policy accurately reflects data flows

---

## EP-11 · Content Production

### US-1101 · All week-by-week content is written and expert-reviewed
> As the product owner, I need all weekly content ready before launch so users get accurate, safe information.

**Priority:** P0 | **Status:** `[TODO]`

- `[TODO]` T-1101-01 · Commission content writer familiar with prenatal/postnatal topics
- `[TODO]` T-1101-02 · Write TTC content (phase-based, 4 content sets)
- `[TODO]` T-1101-03 · Write pregnant week content (weeks 1–42, 42 content sets)
- `[TODO]` T-1101-04 · Write postpartum week content (weeks 1–52, 52 content sets)
- `[TODO]` T-1101-05 · Medical expert review of all content before loading to production
- `[TODO]` T-1101-06 · Warning signs copy (30–40 items) written and reviewed
- `[TODO]` T-1101-07 · Crisis resource list verified and up to date per country (DE, SE, NL, UK, FR, other EU)
- `[TODO]` T-1101-08 · Content loaded into DB via seeding script or CMS

---

> See BUGS.md for active bugs.
> See ARCHIVE.md for deprioritized stories and tasks.
