# Sravani B — Portfolio

Personal portfolio site for Sravani Brahamma Routhu, Data Engineer / Data Analyst. Built with Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## For a new Claude Code session

**Start here, in this order:**

1. [`CLAUDE.md`](./CLAUDE.md) — repository-specific instructions, hard rules, and things to avoid. Read this first, always.
2. [`docs/SESSION_HANDOFF.md`](./docs/SESSION_HANDOFF.md) — what was being worked on right before the last context handoff, and the recommended next step.
3. [`docs/PROJECT_CONTEXT.md`](./docs/PROJECT_CONTEXT.md) — the full narrative: what this project is, every design decision made and why, what was tried and rejected.
4. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — folder structure, component hierarchy, state management, styling conventions.
5. [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — color palette, typography, animation inventory, icon conventions.
6. [`docs/TODO.md`](./docs/TODO.md) — prioritized checklist of what's actually pending right now.

These six documents together are written to be a complete substitute for prior conversation history — treat them as authoritative context, not just a suggestion of where to look.

## Commands

```bash
npm install
npm run dev       # start the dev server (localhost:5173, or next available port)
npm run build     # production build
npm run lint      # eslint
npm run deploy    # build + publish to GitHub Pages
```

## Verifying changes

There are no automated tests. This project is verified manually, live, in a real browser — the person requesting changes reviews everything in their own Cursor browser session. If you have access to an automated browser-preview tool, be aware it has a documented, recurring quirk (see `CLAUDE.md`) where it can't reliably confirm Framer-Motion-driven animations or simulated clicks — don't over-rely on it for anything beyond "does this compile without errors."
