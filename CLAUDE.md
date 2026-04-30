# CLAUDE.md — Axon Neuro Public Website

Guidance for Claude Code (and any other AI coding agent) working in this repo.
**Scope: this repo only. Do not modify anything outside `C:\Users\sumlu\axon neuro`.**

---

## Project

- **Repo**: github.com/zotex12/axon-neuro
- **Vercel**: vercel.com/sumlui12-1057s-projects/axon-neuro
- **Live**: https://axonneuro.co.uk (preview: axon-neuro.vercel.app)
- **Purpose**: Public-facing marketing site for Axon Neuro Ltd — a neuro-rehabilitation reablement service in England.
- **Out of scope for this repo**: the staff portal (planned separately at `portal.axonneuro.co.uk`, separate repo, Next.js + Supabase). Do not add portal code, auth, or DB logic here.

## Guardrails (read before any commit/push/deploy)

- Project skill: `C:\Users\sumlu\axon neuro\.claude\skills\axon-neuro\SKILL.md` — read it.
- The **only** GitHub remote for this project: `github.com/zotex12/axon-neuro`
- The **only** Vercel project for this project: `vercel.com/sumlui12-1057s-projects/axon-neuro`
- Multiple Claude Code / Codex sessions may be running on this machine at the same time. Always verify cwd and git remote before any push.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion (animations)
- Vercel (hosting + CI)
- Hostinger (DNS only, pointed at Vercel)

## Brand

- Background: white (`#FFFFFF`)
- Primary: green `#055000`
- Typography & spacing: see existing components — do not introduce new tokens without updating this file
- Logo: `/public/logo.*` (cropped, do not re-process)
- Design reference: arbor-neuro.com (look-and-feel only, not copy)

## Conventions

- Section components live under `src/components/` (flat — no `sections/` subfolder).
- One section per file. Composed in `src/app/page.tsx`.
- Animations: Framer Motion, prefer `whileInView` with `viewport={{ once: true }}`, ~0.25–0.5s easing.
- Accessibility: interactive elements must be real buttons/links with proper `aria-*`. Keyboard support is non-negotiable.
- No new dependencies without justification.
- Mobile-first. Test at 375px, 768px, 1280px before declaring done.

## Commands

```
npm install        # install
npm run dev        # local dev (http://localhost:3000)
npm run build      # production build
npm run lint       # lint
git push           # auto-deploys via Vercel
```

## Deployment

- Push to `main` → Vercel auto-deploys to production.
- Preview deployments are created for branches/PRs automatically.
- DNS managed in Hostinger; do not change DNS from code.

---

## Progress Tracker

### Done

- [x] Repo + Vercel + custom domain wired up
- [x] Hero section
- [x] What We Do section
- [x] Who We Support section
- [x] How It Works section
- [x] UK map with pulsing dots (Birmingham / Coventry / Warwickshire)
- [x] Contact form
- [x] Header + Footer
- [x] Framer Motion scroll animations across sections
- [x] Logo placed in `/public`
- [x] Brand colours applied (white / #055000)
- [x] FAQ section (8 items, accessible accordion, above contact form)
- [x] Flattened GB map outline (orthographic, no perspective skew)
- [x] Favicon (App Router icon.png convention)

### In progress


### Backlog (public site)

- [ ] Real testimonials / case studies section (pending first clients)
- [ ] Referral landing page (separate route) for case managers / NHS CHC
- [ ] Pricing / fee schedule page or modal (sourced from Business Plan)
- [ ] SEO: metadata per route, OG images, sitemap.xml, robots.txt
- [ ] Analytics (provider TBD — Plausible or Vercel Analytics)
- [ ] Accessibility audit (axe / Lighthouse)
- [ ] Cookie banner (only if non-essential cookies are added)
- [ ] Privacy policy + terms pages (link from footer)

### Out of scope (lives elsewhere)

- Staff portal at portal.axonneuro.co.uk → separate repo
- Supabase schema, auth, RLS → portal repo
- Email setup (Google Workspace) → infra/admin task, not code
- Internal ops on Google Drive/Sheets/Forms → not code

---

## Decisions Log

- **Public site and staff portal are separate apps**, not a monorepo. Keeps deploys and concerns clean.
- **Supabase chosen for portal backend** (auth + RLS + Postgres). Not relevant to this repo.
- **Framer Motion for animation** rather than CSS-only — consistent motion language across sections.
- **No CMS** for now. Copy lives in components. Revisit if non-technical users need to edit.

---

## Working Notes for AI Agents

- Always read this file and the project skill (`.claude/skills/axon-neuro/SKILL.md`) before making changes.
- Update the **Progress Tracker** in the same commit when completing or starting a tracked item.
- If you introduce a new convention (folder, library, pattern), add it under **Conventions** in the same PR.
- Never commit secrets. There are none in this repo today — keep it that way; portal/API keys belong in the portal repo's Vercel env vars.
- If asked to add anything portal-related, stop and clarify — it goes in the other repo.
