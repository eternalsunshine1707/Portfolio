# CLAUDE.md — Instructions for Claude Code on this repository

This file is read automatically at the start of every session. It overrides default behavior — follow it exactly.

## Project overview

This is **Sravani B's personal portfolio website** — a data engineer / data analyst (8+ years experience) building a distinctive, animation-heavy single-page site to stand out in a full-time job search. The user is **not a professional designer** — she is iterating by pointing at reference portfolios she likes (mainly `shivypatel.com` and its GitHub source `shivy02/portfolio-website`, plus `adotey-portfolio.vercel.app` and `radnaabazar.com`) and asking for specific pieces to be replicated or adapted. She reviews everything live in her own Cursor browser (not in any automated tool) and gives very specific, often voice-dictated feedback.

Full narrative context, every design decision, and the reasoning behind them: see `docs/PROJECT_CONTEXT.md`. Current work-in-progress state: see `docs/SESSION_HANDOFF.md`. Prioritized remaining work: see `docs/TODO.md`.

## Tech stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3** for styling (utility classes, plus a handful of global keyframes/utilities in `src/index.css`)
- **Framer Motion 11** for component-level animation (entrance transitions, hover/tap gestures, `whileInView`)
- **lucide-react** for generic UI icons
- **react-icons** (`react-icons/si` — Simple Icons) for brand/tool logos in the Dashboard's tools marquee
- **react-intersection-observer** for scroll-triggered reveals (used in a few older sections; newer components use Framer Motion's own `useInView`/`whileInView` instead — both patterns currently coexist, that's fine, don't "unify" them unless asked)
- **@emailjs/browser** — installed but **no longer used** (the contact form was removed; the dependency and any leftover references can be pruned later, not urgent)
- Deployed via **gh-pages** (`npm run deploy`) to a GitHub Pages project site

## Critical build fact — read this before touching any asset path

`vite.config.ts` sets `base: "/Portfolio/"`. This app is **not** served from the domain root. Any reference to a file in `public/` **must** be prefixed with the Vite base URL, never a bare absolute path:

```tsx
// WRONG — resolves to domain root, 404s in production and in this specific dev setup
<img src="/Databricks.png" />

// RIGHT
const BASE = import.meta.env.BASE_URL;
<img src={`${BASE}Databricks.png`} />
```

This exact bug (bare `/Databricks.png`) caused a real, confirmed-broken image earlier in the project. `Dashboard.tsx` already does this correctly — copy that pattern for any new component that references `public/` assets. Some older components (`Experience.tsx`, `About.tsx`) still use bare `./relative` paths or bare `/absolute` paths inherited from before this was understood — leave them unless you're specifically asked to fix them, but never introduce a new bare-absolute-path reference.

## Commands

```
npm run dev       # Vite dev server, default port 5173 (falls back to 5174+ if busy)
npm run build     # production build
npm run lint      # eslint
npm run preview   # preview a production build locally
npm run deploy    # build + publish to gh-pages
```

There are no automated tests in this project. Verification is manual, in the user's own browser.

## Folder structure

```
src/
  components/       # one file per section/feature, flat (no subfolders)
  App.tsx           # top-level composition — section order lives here
  index.css         # Tailwind directives + all global @keyframes + a few utility classes
  main.tsx
public/             # images, the resume PDF, certification badges — see docs/DESIGN_SYSTEM.md for the asset inventory
docs/               # this handoff documentation (PROJECT_CONTEXT, SESSION_HANDOFF, ARCHITECTURE, DESIGN_SYSTEM, TODO)
```

No routing library — this is a single scrolling page with `id`-anchored sections and smooth-scroll nav (see `Header.tsx`).

## Design principles (hard-won this session — do not relitigate these)

1. **Color palette is exactly three tones.** Dark navy background (`oklch(12.964% 0.02739 261.707)`, set in `GlobalBackground.tsx`), white/gray for primary/secondary text, and **one** beige accent (`#c9b694`) for the name, logo, hover glows, metric numbers, section headings, and card borders. The user explicitly rejected a violet-gold gradient, plain gray, peach, and dark chocolate before landing on `#c9b694` — do not reintroduce a second accent color or a gradient without being asked. Full color history in `docs/PROJECT_CONTEXT.md`.
2. **Every animation technique on this site was reverse-engineered from a real reference site's actual source code, not invented from scratch.** Before building a new animated effect the user references from another site, fetch the actual source (via WebFetch on the raw GitHub URL if it's `shivy02/portfolio-website`) rather than guessing at a CSS technique that "looks similar." Guessing has produced visibly wrong results multiple times this session (the button shimmer, the marching-ants border, the logo).
3. **The curtain intro animation falls top-to-bottom** (strips slide down and off-screen, revealing the page from the top down), not bottom-to-top and not a scale/fade. This was an explicit, twice-repeated correction. See `CurtainOverlay.tsx`.
4. **Never guess at a brand icon name in `react-icons/si` — verify it exists first.** `SiAmazonaws`, `SiTableau`, and `SiDbt` do **not** exist in this package version and their import crashed the entire app (a blank white page) for a full round of user testing before it was caught. Verify with a quick Node check (`node -e "const si=require('react-icons/si'); console.log(!!si.SiWhatever)"`) before adding any new icon import. AWS, Tableau, and dbt currently render as plain text badges (`TextBadge` component in `Dashboard.tsx`) instead of icons — that's the deliberate workaround, not a bug to "fix" by finding the icon.

## Component patterns to follow

- **Hover shimmer border**: any card/button that should get the signature "traveling gold light" hover effect uses the exact masked-border + `shimmerSlide`/`spinAround` keyframe technique (ported from `shivypatel.com`'s `ShimmerBorder` component). See `CardShimmerBorder` in `Dashboard.tsx` or the inline version in `Hero.tsx`'s `ViewWorkButton`. Don't reinvent this with a `conic-gradient` + `rotate` shortcut — an earlier, simpler version of this was explicitly rejected as "not visible enough."
- **Cursor-following radial glow**: a second, complementary hover effect (`HoverGlow` in `Dashboard.tsx`, inline in `Hero.tsx`) — a `radial-gradient` positioned via CSS custom properties (`--mx`/`--my`) updated on `onMouseMove`. Cheap to add alongside the shimmer border; both are currently applied together on every Dashboard card via a `CardEffects` wrapper.
- **Fullscreen expand-on-click modals**: `ExpandModal` in `Dashboard.tsx` is the shared pattern — fixed height (`height: 'min(85vh, 700px)'`, **never `max-height` alone**, which lets the box visibly grow as a typewriter effect reveals text), beige background, word-by-word typewriter reveal via `setInterval`, hidden scrollbar (`.scrollbar-hide` utility class) as a safety net if content still overflows. Reuse this component for any new "click card to read more" feature rather than writing a new modal.
- **Bento/masonry dashboard grid**: `Dashboard.tsx`'s card grid uses an explicit `grid-cols-2 lg:grid-cols-4 auto-rows-[130px]` with each card given a manually-computed `row-span`/`col-span` so the total area tiles perfectly with zero gaps. If you add or remove a card, **redo the span arithmetic** (rows × cols must multiply out evenly) — don't just drop a card in and hope CSS Grid auto-packs it nicely; it won't, and this exact mistake ("what the fuck is that alignment") was a major friction point this session.
- **Count-up numbers**: `CountUpMetric` in `Hero.tsx` — animates via `requestAnimationFrame`, gated so the *first* play doesn't start until `CURTAIN_TOTAL_MS` (exported from `CurtainOverlay.tsx`) has elapsed, so the numbers aren't already-counted by the time the landing curtain lifts. Subsequent hover-triggered replays are instant. If you touch this, preserve the one-time-delay-then-instant behavior.

## Voice-dictated feedback — read carefully

The user's messages come through voice-to-text and often contain transcription errors. Established corrections you should already know, so you don't need to re-derive them:
- "Photo one placeholder" / "Photo 1" = a specific dark-brown gradient (`#3a2f2f` → `#1c1616`) shown in an early Hero mockup — referenced repeatedly as a color-family anchor.
- "Last plate" = "Last Played" (a Spotify now-playing widget on `shivypatel.com`'s dashboard).
- "Forest Black" = the artist **Forest Blakk** (confirmed via web search) — the song is "If You Love Her."
- "Shiv's portfolio" / "Ship's portfolio" / "Chef's portfolio" = `shivypatel.com`.
- "beach color" / "beige" — she means the beige accent `#c9b694` consistently; "beach" is a mis-transcription of "beige," not a literal request for a beach theme.
- When she says "give me shades and I'll pick," always use the `mcp__visualize__show_widget` tool to render actual color swatches (plain divs, no labels) — do not describe colors in text. She has explicitly asked for swatches-only output (no accompanying text) multiple times.

## Things to avoid

- Don't touch `About.tsx` or `Skills.tsx` — they still exist as files but are **intentionally unused** (not imported in `App.tsx`). Their content was absorbed into `Dashboard.tsx`'s "Why This?" card and the tools marquee respectively. Don't re-add them to the render tree, and don't delete the files either unless asked (harmless dead code for now).
- Don't add a second accent color, a gradient background, or extra decorative sections without being asked — the user has repeatedly pulled the design back toward restraint after over-decorating.
- Don't mark a large multi-part request as "done" without actually verifying render — see the note on tooling limitations below.
- Don't skip the "list what I'm about to do and wait for approval" step on large, multi-part requests. This user explicitly and repeatedly asks for a plan/checklist before implementation on anything nontrivial, and gets frustrated if that step is skipped.
- Don't use `--no-verify`, force-push, or any destructive git operation without explicit request (standard policy, doubly true here given how much manual verification this project needs).

## A known tooling limitation (not a code bug — don't chase this)

Whatever automated browser-preview tool is available in your session may intermittently report `document.hidden === true` for its own preview tab. When that happens: Framer Motion's `requestAnimationFrame`-driven animations freeze at their initial state (things silently fail to animate in), and simulated `.click()` calls on Framer Motion gesture-wrapped elements (`motion.div` with `whileHover`/`whileTap`) may not register at all — even though the exact same interaction works fine in the user's real, focused Cursor browser. Plain CSS `@keyframes` animations are unaffected (they're compositor-driven, not JS/rAF-driven).

**When you hit this**: don't spend excessive tool calls trying to force it to work. Verify what you *can* verify — no console errors, correct DOM structure, correct computed styles/attributes, correct grid math — and then explicitly ask the user to confirm the interactive/animated behavior in their own browser. This has happened repeatedly and burning many turns re-testing the same click never resolved it; a fresh page navigation sometimes clears it, sometimes doesn't.

## General workflow for this repository

1. For any request that touches more than one file or is ambiguous in scope, restate your understanding as a numbered list and get explicit confirmation before editing (see "Things to avoid" above).
2. After editing, do a compile/error sanity check (`preview_console_logs` for errors, check `root` DOM content isn't empty) before claiming something works. Distinguish stale HMR-churn errors (old timestamps in the stack trace) from genuinely fresh errors (check the `?t=` cache-busting timestamp in the file URL against your most recent edit).
3. When a request involves colors, always show swatches via the visualize tool rather than describing hex codes in prose, unless the user has already given you an exact hex value to use.
4. When replicating a specific effect from a specific reference site, fetch that site's actual source first (see design principle #2 above) rather than approximating.
5. Keep responses to the user *concrete*: what was done, what's confirmed working, what still needs their eyes. Don't pad with restated context they already know.
