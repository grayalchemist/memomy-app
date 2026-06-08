# MeMomy — Backlog System

This directory is the single source of truth for all product work.

## Files

| File | Purpose |
|------|---------|
| `EPICS.md` | High-level themes. Each epic owns a set of user stories. |
| `BACKLOG.md` | All user stories and tasks with status tags. |
| `BUGS.md` | All bugs found, open and fixed. |
| `ARCHIVE.md` | Everything deprioritized, replaced, or ruled out — with reasons. |

## Status Tags

| Tag | Meaning |
|-----|---------|
| `[TODO]` | Not started |
| `[IN PROGRESS]` | Actively being worked on |
| `[DONE]` | Shipped |
| `[BLOCKED]` | Cannot proceed — note the blocker inline |
| `[WONT DO]` | Decided against — move to ARCHIVE.md with reason |

## Priority Levels

| Level | Meaning |
|-------|---------|
| `P0` | Must ship before beta. Blocker. |
| `P1` | Next to build after P0s are done. |
| `P2` | Planned — scoped but not urgent. |
| `P3` | Nice-to-have — low priority. |

## ID Scheme

- `EP-##` — Epic
- `US-###` — User Story (first digit = epic number)
- `T-###-##` — Task (first digits = story, last = sequence)
- `BUG-###` — Bug

## Rules

1. **Never delete anything.** Move to ARCHIVE.md with a reason and date.
2. **One source of truth.** If a decision is made in conversation, update these files.
3. **I (Claude) update these files automatically** as we build features together.
4. **Add new ideas to ARCHIVE.md first** under "Ideas Considered But Not Yet Scoped" — this prevents scope creep while preserving the idea.
5. **Bugs get logged the moment they're found**, even if they're fixed immediately.

## How Claude Uses This

At the start of any work session, I read BACKLOG.md to understand current state.
As we complete tasks, I mark them `[DONE]`.
If you mention a new feature idea, I add it to ARCHIVE.md as an idea and ask if you want to promote it to the backlog.
If you deprioritize something, I move it to ARCHIVE.md with your stated reason.
