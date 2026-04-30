---
name: axon-neuro
description: Project rules, repo/deploy targets, brand, and stack for the Axon Neuro public website. Use whenever working in C:\Users\sumlu\axon neuro to confirm the right repo, the right Vercel project, the right brand tokens, and to avoid cross-contaminating other projects on this machine.
---

# Axon Neuro — Project Skill

Read this file fully before any git, npm, pnpm, or vercel command. It exists because Louie runs multiple Claude Code / Codex sessions in parallel on different projects on the same PC, and pushing to the wrong repo or deploying to the wrong Vercel project would be expensive to untangle.

## The only paths that matter

- **Local working dir**: `C:\Users\sumlu\axon neuro`
- **GitHub remote**: `github.com/zotex12/axon-neuro` (origin, branch `main`)
- **Vercel project**: `vercel.com/sumlui12-1057s-projects/axon-neuro`
- **Production domain**: `axonneuro.co.uk` (Hostinger DNS → Vercel)
- **Preview domain**: `axon-neuro.vercel.app`

Do not edit, create, or delete anything outside `C:\Users\sumlu\axon neuro`.

## Pre-flight checks (run before any commit / push / deploy)

1. `pwd` (or `cd`) must show `C:\Users\sumlu\axon neuro` or a subfolder of it.
2. `git remote -v` must show `origin` pointing at `github.com/zotex12/axon-neuro`.
3. If either check fails, **stop and ask** — do not proceed.

## Stack

- Next.js (App Router), Tailwind, Framer Motion
- Vercel (CI + hosting), Hostinger (DNS only)

## Brand

- Background: white `#FFFFFF`
- Primary: green `#055000`
- Logo lives in `/public`
- Look-and-feel reference: arbor-neuro.com (do not copy assets/copy)

## Conventions

- Section components under `components/sections/`, one section per file, composed in `app/page.tsx`.
- Animations via Framer Motion `whileInView` + `viewport={{ once: true }}`.
- Real `<button>`/`<a>` elements with proper `aria-*`. Keyboard support is non-negotiable.
- Mobile-first; verify at 375 / 768 / 1280px.
- No new dependencies without justification.
- No secrets in this repo. The portal/Supabase belongs in a different repo.

## Out of scope for this repo

- Staff portal at `portal.axonneuro.co.uk` — separate repo, Next.js + Supabase
- Email setup (Google Workspace) — admin task
- Internal ops (Drive / Sheets / Forms) — not code

## Standard work loop

1. Read `CLAUDE.md` at the project root for current progress + open items.
2. Read this SKILL.md (you are here) for guardrails.
3. Confirm pre-flight checks above.
4. Do the change.
5. Update `CLAUDE.md` progress tracker.
6. Commit with a clear message, push `origin main`.
