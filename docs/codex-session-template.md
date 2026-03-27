# Codex Session Template

Use this template to run any backlog item as a focused Codex session.

## Copy-Paste Prompt

You are continuing the Wild Washington release backlog.

Session:
[Replace with the session title from `docs/release-backlog.md`]

Goal:
[Replace with the session goal]

Scope:
- Stay within this session's deliverables and acceptance criteria.
- Review the current repo state first.
- Do not overwrite unrelated uncommitted changes.
- Prefer reusable design and architecture choices over one-off fixes.

Working expectations:
- Make the scoped changes end-to-end.
- Verify with `npm run lint`, `npm run build`, and any relevant tests.
- If you add or change architecture, update docs.
- Summarize what changed, what was verified, and any follow-up items left for the next session.

Reference:
- `docs/release-backlog.md`

## Handoff Format

At the end of the session, include:

- What was completed
- What remains in this session, if anything
- Risks or tradeoffs introduced
- Recommended next session
