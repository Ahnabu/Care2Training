# Cursor agents: how we work in this repo

## Goal
Enable fast, consistent UI delivery by giving agents clear context, patterns, and "definition of done".

## Where to look first
- `docs/00-overview.md`
- `docs/01-page-inventory.md`
- `docs/02-design-system.md`
- `docs/06-release-plan.md`

## Workflow conventions
- Keep changes small and reviewable (foundation → pages → polish)
- Prefer reusable sections over page-specific one-offs
- Make changes "atomic" (small, isolated diffs), keep behavior "consistent" across pages, and avoid unintended side-effects (ACID-like hygiene).
- Enforce design/color consistency: no hard-coded brand colors (or random spacing) in components; use tokens and shared layout primitives.
- Ensure code reusability: components should be props-driven, focused, and reusable across multiple routes.
- Move duplicated marketing copy / repeated UI text into data/lib: prefer `frontend/src/content/` for TS data and import it from components/pages.
- Validate responsiveness and keyboard navigation per page

## Prompts & runbooks
- `agents/prompts/`: copy/paste prompts to assign clear tasks
- `agents/runbooks/`: step-by-step playbooks agents should follow

