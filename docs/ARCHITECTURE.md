# Architecture

## Folder structure

```
Portfolio/
├── public/                    # static assets, served at Vite's configured base ("/Portfolio/")
│   ├── Sravani_B_Resume.pdf
│   ├── AWSDataEngineer.png    # AWS Certified Data Engineer Associate badge
│   ├── Databricks.png         # Databricks cert badge (in-progress cert, has a white bg baked in)
│   ├── ForestBlakk.png        # album art for the Currently Listening card
│   ├── Spotify.png            # Spotify logo icon
│   ├── magic.png              # "The Magic" book cover, Currently Reading card
│   ├── DXC.png, Tidel.jpeg, Drunix.jpeg, GWU.jpg, KITSW_OfficiaLogo.png,
│   │   Aditya_Birla_Group_Logo.png, CISC.png  # company/school logos used in Experience & Projects
│   ├── Kutty1.jpeg … Kutty7.JPG   # personal photos, used by the (now-unused) About.tsx slideshow
│   └── ProjectImage2.png, ProjectImage3.png   # currently unused project imagery
├── src/
│   ├── main.tsx               # ReactDOM root render
│   ├── App.tsx                # section composition/order — see Component Hierarchy below
│   ├── index.css              # Tailwind directives + ALL global @keyframes + a few utility classes
│   └── components/            # flat, one file per section/feature — no subfolders
│       ├── GlobalBackground.tsx    # fixed full-page canvas particle system, mounted once at App root
│       ├── CurtainOverlay.tsx      # fixed full-page curtain-drop intro/transition, mounted once at App root
│       ├── Header.tsx              # fixed nav bar, signature-draw logo, scroll-hide/reveal
│       ├── Hero.tsx                 # landing content: name, bio, social links, CTA button, metrics row, image box
│       ├── Dashboard.tsx            # NEW bento-grid section: certs, Scratch Me, Spotify, Reading, Why This, tools marquee
│       ├── Projects.tsx             # project showcase (currently unmodified from original — pending restyle)
│       ├── Experience.tsx           # work history timeline (currently unmodified from original — pending rewrite)
│       ├── Education.tsx            # education timeline (untouched this session)
│       ├── Contact.tsx              # simplified: Email/LinkedIn/GitHub cards only, no form
│       ├── ContactNetworkCanvas.tsx # decorative canvas background specifically for Contact (untouched)
│       ├── About.tsx                # UNUSED — not imported in App.tsx; content absorbed into Dashboard's "Why This?" card
│       └── Skills.tsx               # UNUSED — not imported in App.tsx; content absorbed into Dashboard's tools marquee
├── docs/                       # this handoff documentation
├── vite.config.ts              # base: "/Portfolio/" — see the critical asset-path note in CLAUDE.md
├── tailwind.config.js          # content globs, a legacy "cyan" palette (all shades = old green, unused now), one custom keyframe (open-badge-glow, used by Contact's status badge)
├── postcss.config.js
└── package.json
```

## Component hierarchy (render tree, top to bottom)

```
App
├── GlobalBackground        (fixed, z-0, behind everything — canvas particle system)
├── CurtainOverlay          (fixed, z-[9999], full-page curtain strips)
└── div.relative.z-10       (all real page content, layered above the background)
    ├── Header              (fixed, z-50, its own layer above scroll content)
    ├── Hero                 id="home"
    ├── Dashboard            (no id / no nav anchor — just page flow)
    ├── Projects             id="projects"
    ├── Experience           id="experience"
    ├── Education            id="education"
    └── Contact              id="contact"
```

Notes:
- `About` and `Skills` are **not** in this tree. They exist as files but are dead code.
- There is no id on the Dashboard section and no nav link to it — it's reached purely by scrolling from Hero into Projects.
- `GlobalBackground` and `CurtainOverlay` are siblings of the content wrapper, not children of it, specifically so they can use `position: fixed` and cover the whole viewport regardless of scroll position or content height.

## Routing

None. This is a single-page, single-route site. "Navigation" is implemented as smooth-scroll-to-`id` (see `Header.tsx`'s `scrollToSection`, which calls `element.getBoundingClientRect()` + `window.scrollTo({ top, behavior: 'smooth' })` with an 80px offset for the fixed header height) plus a `window.dispatchEvent(new CustomEvent('portfolio:curtain'))` to replay the curtain animation on every nav click.

## State management

No global state library (no Redux/Zustand/Context providers for app state). Every component manages its own local state via `useState`/`useRef`. The only cross-component communication mechanism is:

- **`window` custom events** — `CurtainOverlay.tsx` listens for a `'portfolio:curtain'` event (dispatched by `Header.tsx` on nav click) to replay itself. This is a deliberately simple pub/sub for one specific cross-cutting concern (any component, anywhere, can trigger the curtain by dispatching this event) — extend this pattern if the new nav-transition effect needs similar cross-component triggering, rather than introducing Context/a state library for it.
- **A shared exported constant** — `CurtainOverlay.tsx` exports `CURTAIN_TOTAL_MS`, imported by `Hero.tsx` to gate the metrics count-up timing. This is the only cross-file constant-sharing in the codebase; follow this pattern (export a `const` from the "owning" component) rather than introducing a shared config file, if a similar cross-cutting timing value is needed for the new transition effect.

## Styling system

- **Tailwind utility classes** are the primary styling mechanism, used inline in JSX almost everywhere.
- **Arbitrary value syntax** (`text-[#c9b694]`, `h-[260px]`, `auto-rows-[130px]`) is used liberally and is the *normal* way colors/sizes are expressed in this codebase — there is no Tailwind theme token for the beige accent color; it's a literal hex repeated via arbitrary-value classes in every file that needs it. If asked to change the accent color again, expect to need a project-wide find-and-replace across every component (this has literally happened via `replace_all` string edits multiple times this session — see `docs/PROJECT_CONTEXT.md`'s color journey).
- **Inline `style` props** are used for anything Tailwind's utility classes can't express cleanly: CSS custom properties (`--mx`/`--my` for cursor-tracking glows), `mixBlendMode`, dynamic `background` values (per-quote colors in Scratch Me, per-metric computed opacity), and `WebkitMask`/`maskComposite` (the shimmer-border technique, which relies on mask compositing not exposable via Tailwind).
- **Global CSS** (`src/index.css`) holds only: the three `@tailwind` directives, a global `h1,h2,h3 { font-family: 'Playfair Display' }` rule, a handful of legacy utility classes/keyframes from before this session (`.portrait-container`, `.floating-image`, `.highlight`, `.animate-shimmer`, `.matrix-rain` — some now unused after the About/Skills removal, harmless to leave), and **every `@keyframes` block used anywhere in the app** (curtain fall, logo draw, shimmer slide/spin, marquee left/right, marching ants, spin border, grid scroll). New animations should follow this pattern: define the `@keyframes` in `index.css`, reference it via an inline `style={{ animation: '...' }}` in the component (this codebase does **not** define custom keyframes in `tailwind.config.js`'s theme — the one exception, `open-badge-glow`, predates this session and is a Tailwind-registered animation class instead; don't feel obligated to match that pattern for new work, the `index.css` + inline-style approach is the established convention now).
- **Fonts** loaded via a single Google Fonts `<link>` in `index.html`: Inter (body/UI default), Playfair Display (all `h1`/`h2`/`h3`, globally, via the CSS rule above), Baloo 2 (fun/quirky — used only for 3 of the 4 Scratch Me quotes), Noto Sans Telugu (the one Telugu-script quote).

## Reusable utilities / shared components

There is no separate `src/components/ui/` folder of generic primitives — shared visual patterns are currently duplicated as needed or extracted as local sub-components within the file that first needed them:

- `HoverGlow`, `CardShimmerBorder`, `CardEffects` (combines both), `CertCard`, `ScratchCard`, `ToolsMarquee`, `ExpandModal` — all defined and only used within `Dashboard.tsx`. If a future section (e.g., the Projects restyle) needs the shimmer-border hover effect, the current convention is to **copy the pattern** into that file (as was done going from `Hero.tsx`'s inline version to `Dashboard.tsx`'s extracted `CardShimmerBorder`), not to import cross-file from `Dashboard.tsx`. If this duplication becomes a real maintenance problem, consider extracting to a shared `src/components/ui/ShimmerBorder.tsx` — but that refactor has not been requested and shouldn't be done speculatively.
- `TextBadge` — small fallback component in `Dashboard.tsx` for brand logos with no available icon (AWS, Tableau, dbt).

## Design patterns used

- **Section-per-file, composed in `App.tsx`** — no nesting, no layout wrapper components beyond the two fixed global layers.
- **Local sub-components colocated in the same file** as their only consumer (see Dashboard's internal components above) rather than one-component-per-file dogma.
- **Data-driven rendering** — `Experience.tsx`'s `timelineData`, `Projects.tsx`'s `projects`, `Dashboard.tsx`'s `QUOTES`/`TOOLS_ROW_1`/`TOOLS_ROW_2` are all plain arrays mapped over in JSX; this is the established convention for adding more items to any of these lists.
- **Effort-gated first-play, instant-replay animations** — the metrics count-up (`Hero.tsx`) and the pattern is worth reusing for the new curtain sound/transition if it needs similar "don't double-trigger on repeat" logic.
- **Direct DOM measurement + `ResizeObserver`** for canvas-based effects (`Dashboard.tsx`'s `ScratchCard`) rather than relying on React state for pixel-perfect sizing — canvases don't participate in React's virtual DOM sizing, so this is the correct pattern to reuse for any future canvas-based effect.
