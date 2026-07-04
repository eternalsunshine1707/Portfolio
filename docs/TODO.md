# TODO

Prioritized. Items 1-3 are the explicitly-requested "four pending things" (the 4th, Currently Reading content, is already resolved — see `docs/PROJECT_CONTEXT.md`). Everything below that is lower-priority / not-yet-approved.

## In progress / next up

- [ ] **1. Experience section rewrite** (`src/components/Experience.tsx`)
  - [ ] Keep the left-side company-logo timeline exactly as-is
  - [ ] Write a genuine narrative paragraph per role, replacing the bulleted `responsibilities` arrays — humanized tone, not AI-sounding, "not too long, not too short" (model: `radnaabazar.com`'s year-by-year journey-report writing style, described in `docs/PROJECT_CONTEXT.md`)
  - [ ] Add a header block above each paragraph: Company / Location / Position / Date range (data already exists in `timelineData`)
  - [ ] Remove the "Responsibilities" toggle button, `ChevronDown` import, and the expand/collapse state entirely — static reveal now
  - [ ] Add a light + dot that travels down the vertical timeline line as the user scrolls (there's an existing `progressHeight` scroll-linked fill bar — decide whether to enhance it with a glowing dot at its leading edge, or build a separate effect; re-read the exact wording of the original request before assuming which)
  - [ ] Do not add photos to the entries (explicitly declined, unlike the Radnaabazar reference which had them)

- [ ] **2. Projects section restyle** (`src/components/Projects.tsx`)
  - [ ] 2-projects-per-row grid layout (reference: `shivypatel.com`'s `src/components/home/projects.tsx` — fetch it again if needed, described but not implemented this session)
  - [ ] Keep every project's existing content verbatim (title, description, tech tags, GitHub "View Source" link) — do not shorten
  - [ ] Remove the `category` tag pill shown on each card top ("Machine Learning," "Data Analytics," "Systems Programming")
  - [ ] Add the gold shimmer-border hover effect (copy `CardShimmerBorder` pattern from `Dashboard.tsx`)
  - [ ] Add a per-card hover animation (beyond the shimmer border — the user asked for "some animation for when hover on each project card," implying something in addition)
  - [ ] Add a scroll-triggered entrance animation when the section comes into view

- [ ] **3. New nav-transition effect + curtain sound**
  - [ ] Build a two-phase transition, distinct from the existing landing curtain, triggered specifically on nav-link clicks: navy→beige wipe animating bottom-to-top, immediately followed by beige→navy curtain-fall top-to-bottom (reuse/adapt `CurtainOverlay.tsx`'s existing strip mechanism for the second phase; the first phase is new)
  - [ ] Roughly match the existing curtain's total duration (~2.6s range) for a consistent feel
  - [ ] Add a sound effect that plays for the full duration of every curtain/transition instance — both the landing-page one and nav-triggered ones
  - [ ] Understand and accept that the very first landing-page instance may be silently blocked by browser autoplay policy (no prior user interaction yet) — proceed anyway, this was explicitly acknowledged and accepted by the user
  - [ ] You'll need an actual audio asset — none exists in `public/` yet; ask the user for one (or a description of the desired sound) if not otherwise specified

## Verification checklist for each item above

Given the tooling limitation described in `CLAUDE.md`/`docs/SESSION_HANDOFF.md`, after each item:
- [ ] No console errors (check the error's file timestamp isn't stale HMR churn)
- [ ] Correct DOM structure / computed styles where checkable without live animation
- [ ] Explicitly tell the user what needs their own-browser confirmation, rather than claiming full success

## Not yet approved — do not build without asking first

- [ ] GitHub contribution heatmap Dashboard card
- [ ] "Available / Away" status badge (like `shivypatel.com`'s hero)
- [ ] Coding-stats ticker card
- [ ] Live Spotify API integration (explicitly declined in favor of the current static card)
- [ ] Any second accent color or gradient

## Housekeeping (low priority, no urgency, don't do speculatively)

- [ ] `About.tsx` and `Skills.tsx` are dead code (not imported) — could be deleted once the team is confident nothing will need to reference their content again
- [ ] `@emailjs/browser` dependency is unused after the Contact form removal — could be removed from `package.json`
- [ ] Audit `Experience.tsx`/`Education.tsx`/`About.tsx` for bare `/Foo.png` or `./Foo.png` image paths that should use `import.meta.env.BASE_URL` for production-build correctness (see the critical note in `CLAUDE.md`) — these currently work in `npm run dev` but may not survive a production build under the `/Portfolio/` base path
- [ ] `tailwind.config.js`'s `cyan` palette is a confusing leftover name (all shades map to the old, no-longer-used green `#6bab8a`) — could be cleaned up or removed
