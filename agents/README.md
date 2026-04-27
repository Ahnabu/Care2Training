# Cursor agents: how we work in this repo

## Goal
Enable fast, consistent UI delivery by giving agents clear context, patterns, and “definition of done”.

## Where to look first
- `docs/00-overview.md`
- `docs/01-page-inventory.md`
- `docs/02-design-system.md`
- `docs/06-release-plan.md`

## Workflow conventions
- Keep changes small and reviewable (foundation → pages → polish)
- Prefer reusable sections over page-specific one-offs
- No hard-coded brand colors in components; use tokens
- Validate responsiveness and keyboard navigation per page

## Prompts & runbooks
- `agents/prompts/`: copy/paste prompts to assign clear tasks
- `agents/runbooks/`: step-by-step playbooks agents should follow

