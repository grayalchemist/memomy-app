# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `memomy-app/` directory (the actual Next.js app root):

- **Development server**: `npm run dev` — starts Turbopack dev server at localhost:3000
- **Build**: `npm run build`
- **Lint**: `npm run lint`

No test runner is configured yet; T-102-04 in the backlog tracks adding integration tests.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ASADOC_MODE=mock   # set to "live" when AsaDoc API is ready
```

Database: run the two SQL migration files in order via the Supabase dashboard SQL editor — no Supabase CLI config is present. Path alias `@/*` maps to the project root.

## Project Structure & Architecture

MeMomy is a PWA for Iranian diaspora women covering the pregnancy journey, deeply integrated with AsaDoc (telehealth) for Farsi-speaking specialists.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · shadcn/ui · Tailwind CSS v4 · Supabase (Auth + PostgreSQL)

> **Important:** See `AGENTS.md` — Next.js 16 has breaking changes vs. training data. Don't assume API shape from prior knowledge.

### Route Layout

Route groups separate auth from the authenticated experience:

- `app/(auth)/` — unauthenticated pages (login, signup), fully client-side forms, no shared nav
- `app/(main)/` — authenticated routes; `layout.tsx` wraps all children with `BottomNav` (4 tabs: Home/Calendar/Wellbeing/Profile)
- `app/auth/callback/` and `app/auth/signout/` — Route Handlers for Supabase OAuth code exchange and sign-out
- `app/actions/` — Server Actions for all mutations (`booking.ts`, `checkin.ts`, `profile.ts`)

### Server / Client Component Convention

Every `(main)` route follows a strict split:

1. `page.tsx` — async Server Component: authenticates user, fetches from Supabase, redirects to `/login` if no session, passes typed props down
2. `*Client.tsx` (e.g. `DashboardClient.tsx`, `GuideClient.tsx`) — `"use client"` leaf: receives pre-fetched data as props, handles interactivity with `useState`

Server Actions in `app/actions/` use `revalidatePath()` + the caller calls `router.refresh()` to re-sync client state after mutations. There is no global state library — all persistent state lives in Supabase.

### Key Libraries

- `lib/timeline/utils.ts` — `getTimelineState(stage, dueDate)` is the central date-math function. It derives the current week, trimester label, progress percent, and week-specific content from the stored `stage` + `due_date` columns. All 40 pregnancy weeks and 12 postpartum weeks have authored content in `lib/timeline/data.ts`.
- `lib/warning-signs/data.ts` — `getWarningSigns(stage)` returns stage-aware warning signs. Each sign has `severity: "emergency" | "booking" | "monitor"`. Emergency signs always surface a "Call 911" button first, then AsaDoc booking.
- `lib/asadoc/index.ts` — AsaDoc abstraction. In `mock` mode (default) returns hardcoded specialists; `live` mode calls the real API (not yet implemented). Exports: `getSpecialists()`, `getSpecialist()`, `getAvailability()`.
- `utils/supabase/client.ts` / `server.ts` — Supabase clients scoped to browser vs. server boundaries. `middleware.ts` refreshes the session cookie on every non-static request.
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge).

## Backlog & Task Tracking

The `backlog/` directory is the single source of truth for all product work:

- `backlog/EPICS.md` — high-level themes and their status
- `backlog/BACKLOG.md` — all user stories and tasks with `[TODO]` / `[IN PROGRESS]` / `[DONE]` / `[BLOCKED]` status
- `backlog/BUGS.md` — all bugs, open and fixed
- `backlog/ARCHIVE.md` — deprioritized or ruled-out items with reasons (nothing is ever deleted)

**When working with Claude Code:**
- Read `backlog/BACKLOG.md` at the start of any feature work to understand current state
- Mark tasks `[DONE]` as they are completed
- Log new bugs in `backlog/BUGS.md` immediately when found
- Move deprioritized items to `backlog/ARCHIVE.md` with a reason — never delete them
- When the user mentions a new feature idea, add it to `ARCHIVE.md` under "Ideas Considered But Not Yet Scoped" first

## Rules & Conventions

- **Next.js 16 Conventions**: Follow breaking changes and modern conventions (note the deprecation of `middleware` in favor of `proxy` in the current build output). Read `node_modules/next/dist/docs/` for specific API changes compared to older versions.
- **Privacy & GDPR Compliance**: All features must strictly adhere to GDPR Article 9. Pregnancy/mood data is special-category health data. Explicitly, DO NOT implement advertising SDKs, Google Analytics, non-EU data transfers, diagnostic claims, automated risk scoring, or any form of AI medical chatbot.
- **AsaDoc Labeling Guidelines**: In the AsaDoc integration, ensure strict differentiation:
  - EU-licensed doctors must be labeled "Doctor" with their license clearly visible.
  - Iran-licensed practitioners must be labeled "Health Coach" and must display a disclaimer: "lifestyle/wellness only, no clinical advice".
- **Design Decisions**: Rely on Purple Primary (`#7C5CBF`) and Teal Accent (`#4DB6AC`). Avoid stereotypical or clichéd tropes (i.e. keep away from pink colors, generic baby motifs, or explicitly clinical imagery). Use Lora for headers and Raleway for body. Mobile-first layout: `max-w-md` container, `pb-safe` on BottomNav for iOS home indicator.
- **Crisis Information**: The system must prioritize crisis intervention over generalized warnings. Hardcoded regional resources (e.g. DE 0800 111 0 111, SE 90101, UK 116 123) should be surfaced actively without ambiguity in any psychological check-in workflows. Check-in scores below 5 trigger `/check-in/escalation`.
