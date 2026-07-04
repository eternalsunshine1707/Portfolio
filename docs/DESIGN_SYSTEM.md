# Design System

## Color palette (exactly three tones — see `docs/PROJECT_CONTEXT.md` for the full rejected-alternatives history)

| Role | Value | Where used |
|---|---|---|
| Background | `oklch(12.964% 0.02739 261.707)` | Set as the base fill in `GlobalBackground.tsx`'s canvas wrapper. A very dark, slightly blue-tinted near-black. |
| Page/body fallback background | `#050505` | `index.css` on `html, body, #root`, and `tailwind.config.js`'s `dark.950` token — used behind-the-scenes as a fallback/base, distinct from the canvas layer's oklch value above. |
| Primary text | white (`text-white`) | Headings' base color before the global Playfair rule tints them, body copy, card titles. |
| Secondary text | `text-gray-300` / `text-gray-400` | Body paragraphs, card captions, muted labels. |
| **Accent (the one and only)** | **`#c9b694`** | Name span, logo stroke, section H1s, metric numbers, hover glows, card borders/shimmer, curtain strips, modal backgrounds. Always written as a literal Tailwind arbitrary-value hex (`text-[#c9b694]`, `bg-[#c9b694]`, `border-[#c9b694]`, `stroke="#c9b694"`, `background: '#c9b694'` inline) — there is no theme token for it. |

Do not introduce a second accent color or a gradient without an explicit request — this was arrived at only after 5 rejected alternatives (green, violet-gold gradient, gray, peach, dark chocolate — full history in `docs/PROJECT_CONTEXT.md`).

**Secondary card-specific colors** (not part of the 3-tone system, but established and intentional):
- Cert card background: `#f3ede1` (light cream — specifically chosen so `mix-blend-mode: multiply` on the cert badge PNGs, which have baked-in white backgrounds, hides the white seam)
- Cert card text: `#6b5842` (dark brown, readable against the cream)
- Scratch Me quote backgrounds (4 distinct, one per quote, randomly assigned): `#2d5f6b` (teal), `#6b3f2d` (rust brown), `#4a2d6b` (purple), `#6b2d4a` (maroon)
- Scratch canvas cover color: `#3a2f2f` (the "Photo 1 placeholder" dark brown — see `docs/PROJECT_CONTEXT.md`)

## Typography

- **Headings** (`h1`, `h2`, `h3`, globally, via a CSS rule in `index.css`): **Playfair Display** serif, weights 400/600/700/900 loaded.
- **Body/UI default**: **Inter**, weights 400/500/600/700 loaded.
- **Scratch Me quotes** (fun/quirky, deliberately different from the rest of the site): **Baloo 2**, weights 600/700 — used for 3 of the 4 quotes.
- **The one Telugu quote**: **Noto Sans Telugu**, weights 600/700 — the only quote in a non-Latin script, needs its own font for correct glyph rendering.

All four fonts are loaded via a single `<link>` in `index.html`'s `<head>` (Google Fonts, one combined URL). No self-hosted fonts, no `next/font`-style optimization (this isn't Next.js) — just the standard Google Fonts CDN link.

## Spacing

No custom spacing scale — standard Tailwind spacing throughout (`p-4`, `p-5`, `gap-5`, `mb-16`, etc.). Section-level vertical rhythm convention: `py-24` on most `<section>` elements. The Dashboard grid specifically uses a fixed `auto-rows-[130px]` unit (see below) rather than Tailwind's default spacing scale, because its bento layout requires precise row-height arithmetic.

## Responsive breakpoints

Standard Tailwind breakpoints only (`sm:`, `lg:` are the two actually used in this codebase — `md:` and `xl:` appear occasionally but aren't a deliberate system, just ad hoc). Typical pattern: single-column/stacked on mobile, expanding to a 2- or 3-column layout at `sm:`/`lg:`. The Dashboard grid is the most deliberate responsive example: `grid-cols-2 lg:grid-cols-4` (2 columns until desktop, then 4), with individual cards' `col-span`/`row-span` values also changing at the `lg:` breakpoint to keep the tiling gap-free at both sizes (check `Dashboard.tsx`'s current card `className`s for the exact per-breakpoint spans before adding a new card).

## Animations — the full inventory (all defined as global `@keyframes` in `src/index.css`, referenced via inline `style={{ animation: ... }}`)

| Keyframe | Used by | What it does |
|---|---|---|
| `curtainFall` | `CurtainOverlay.tsx` | Each vertical strip: `translateY(0%)` → `translateY(100%)`, staggered per-strip, so the covering strip slides down and off-screen, revealing the page top-first. |
| `logoDraw` | `Header.tsx` | `stroke-dashoffset`: 2800 → 0 → 2800 (draws the signature in, then back out), looping continuously, 13s duration. |
| `shimmerSlide` + `spinAround` | `Hero.tsx`'s `ViewWorkButton`, `Dashboard.tsx`'s `CardShimmerBorder` | The two-part Magic UI "shiny border" technique: an inner square slides horizontally (`shimmerSlide`) while a conic-gradient light rotates in stages (`spinAround`); combined, the light appears to travel around all four sides of a masked border ring. |
| `marqueeLeft` / `marqueeRight` | `Dashboard.tsx`'s `ToolsMarquee` | Two rows of duplicated (`[...row, ...row]`) tool logos, one scrolling left, one scrolling right, via `translateX(-50%)`, looping seamlessly. |
| `marchingAnts` | Hero.tsx's image-box border (SVG `stroke-dasharray`/`stroke-dashoffset`) | Dashes appear to travel around the image box's own edge, sitting just outside the box (an enlarged SVG overlay, `-inset-3`, not a separate rotated shape — an earlier version that used a separate rotated square was explicitly rejected as "looking like a second box"). |
| `spinBorder` | Earlier iteration of the button hover light | Superseded by the `shimmerSlide`/`spinAround` pair above once the real Magic UI technique was fetched — may still be referenced in unused/dead code paths, prefer the shimmer pair for anything new. |
| `gridScroll` | (legacy, predates this session) | Was used by an older background-grid effect; may be dead code post-`GlobalBackground` rewrite — check before assuming it's live. |

## Reusable UI components (all Dashboard-local currently — see `docs/ARCHITECTURE.md`)

- `HoverGlow` — cursor-following radial gradient, CSS custom properties updated on `onMouseMove`.
- `CardShimmerBorder` — the gold traveling-light border, shown on `group-hover`.
- `CardEffects` — thin wrapper rendering both of the above together; apply this (or copy the pattern) to any new card that should get the standard hover treatment.
- `ExpandModal` — fullscreen click-to-expand modal, fixed height, beige background, word-by-word typewriter text reveal, hidden-scrollbar safety net.
- `TextBadge` — bordered text-only fallback for brand logos with no available icon.

## Icons

- **Generic UI icons** (chevrons, close buttons, arrows, mail/map/refresh icons, nav icons): `lucide-react`.
- **Brand/tool logos** (Dashboard's tools marquee): `react-icons/si` (Simple Icons), each explicitly given its real brand hex color via a `color` prop — **do not** apply the site's beige accent color to these, they're deliberately shown in their authentic brand colors per explicit user request ("the logos are in the original colors" — this was a correction from an earlier beige-tinted version).
- **Known missing icons in the installed `react-icons` version**: `SiAmazonaws`, `SiTableau`, `SiDbt` do not exist and will crash the app if imported — see `CLAUDE.md`'s critical warning. These three currently render via the `TextBadge` fallback instead.

## Accessibility notes

No formal accessibility audit has been done this session. Known gaps to be aware of (not yet flagged by the user, but worth knowing):
- Several decorative/interactive `<div>`s (Dashboard cards, the Scratch Me canvas) use `onClick`/`onMouseMove` without `role`/`tabIndex`/keyboard equivalents — Framer Motion's `whileHover`/`whileTap` do add a `tabindex="0"` automatically in some cases (observed in DOM inspection during this session) but this hasn't been deliberately audited.
- Color contrast of the beige accent (`#c9b694`) against the dark navy background is good (light-on-dark); contrast of the cert-card dark brown text (`#6b5842`) against the cream card background (`#f3ede1`) has not been formally checked but reads fine visually.
- The curtain overlay and background particle canvas are purely decorative (`pointer-events: none` where appropriate) and shouldn't interfere with screen readers, but haven't been explicitly tested with one.
