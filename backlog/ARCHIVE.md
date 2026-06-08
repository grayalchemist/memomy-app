# MeMomy — Archive

This file is permanent. Nothing is deleted — only moved here with a reason.

Use this when:
- A story or epic is deprioritized (reason: why + when decision was made)
- A feature is replaced by a different approach (reason: what replaced it)
- A feature is ruled out entirely (reason: GDPR risk, scope, cost, etc.)

Format:
```
## [Original ID] · Original title
**Archived:** YYYY-MM-DD
**Reason:** Why it was removed from the active backlog.
**Could be revisited if:** Conditions under which it becomes relevant again.
[Original content below]
```

---

## Ideas Considered But Not Yet Scoped

These were mentioned during early planning but not added to the backlog yet.
They live here so they aren't forgotten.

### IDEA-001 · AI chatbot / Q&A assistant
**Considered:** 2026-06-07
**Decision:** Ruled out for Phase 1 and Phase 2.
**Reason:** GDPR Article 9 risk — an AI processing special-category health data (pregnancy, mood) without a clinical framework creates liability. Also contradicts the no-diagnostic-claims constraint. Any AI feature would require a medical device software (MDSW) compliance review under EU MDR.
**Could be revisited if:** A MDSW-compliant framework is established, legal review is completed, and the product has sufficient revenue to absorb the compliance cost.

### IDEA-002 · Automated risk scoring for mood
**Considered:** 2026-06-07
**Decision:** Ruled out permanently.
**Reason:** Automated risk scoring (e.g. "your score suggests mild depression") constitutes a clinical assessment under EU MDR and would require CE marking as a medical device. Any appearance of automated diagnosis is also a brand and trust risk.
**Could be revisited if:** Never — this is a hard constraint, not a prioritization decision.

### IDEA-003 · Community forum / peer support
**Considered:** 2026-06-07
**Decision:** Moved to EP-15 (PLANNED, not scoped).
**Reason:** High moderation cost, health misinformation risk, and potential liability if users give each other clinical advice. Needs legal review before any design work begins.
**Could be revisited if:** Phase 1 reaches stable revenue, a moderation strategy is defined, and legal review is completed.

### IDEA-004 · Google Analytics integration
**Considered:** 2026-06-07
**Decision:** Ruled out permanently.
**Reason:** Google Analytics processes data outside the EEA and sets cookies. Both violate GDPR requirements for this app (special-category health data, EU data residency). Replaced by Plausible Analytics (EU, cookieless).
**Could be revisited if:** Never — hard GDPR constraint.

---

> Active epics and stories are in EPICS.md and BACKLOG.md.
