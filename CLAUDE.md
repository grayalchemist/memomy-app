# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure & Architecture

MeMomy is a PWA for Iranian diaspora women covering the pregnancy journey, deeply integrated with AsaDoc (telehealth) for Farsi-speaking specialists. 

**Stack:** Next.js 16 (App Router), shadcn/ui, Tailwind CSS v4, Supabase (for Auth/PostgreSQL).

- `app/`: Next.js App Router root. Use Server Components by default; keep `'use client'` components at the leaf level whenever possible. It contains route groups like `(auth)` for auth flows and `(main)` for authenticated dashboard experiences. 
- `components/`: UI and shared components, largely derived from shadcn/ui primitives.
- `lib/asadoc/`: Core abstraction for the AsaDoc integration. Modeled so `ASADOC_MODE` env var handles switching between mock behavior and real API interactions when implemented.
- `utils/supabase/`: Supabase clients instantiated for server vs. client boundaries.

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
- **Design Decisions**: Rely on Purple Primary (`#7C5CBF`) and Teal Accent (`#4DB6AC`). Avoid stereotypical or clichéd tropes (i.e. keep away from pink colors, generic baby motifs, or explicitly clinical imagery). Use Lora for headers and Raleway for body.
- **Crisis Information**: The system must prioritize crisis intervention over generalized warnings. Hardcoded regional resources (e.g. DE 0800 111 0 111, SE 90101, UK 116 123) should be surfaced actively without ambiguity in any psychological check-in workflows.