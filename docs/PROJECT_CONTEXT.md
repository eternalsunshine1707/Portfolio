# Project Context

Full narrative of what this project is, how it got to its current state, and every meaningful decision made along the way. Read this if `CLAUDE.md`'s summary isn't enough context to act confidently.

## What this is

A personal portfolio site for **Sravani Brahamma Routhu** — a Data Engineer / Data Analyst with 8+ years of experience (AWS Certified Data Engineer Associate), currently job-searching for full-time Data Engineering / Data Analytics roles. She is based in Ashburn, VA. Resume highlights (all pulled from her actual resume, stored at `public/Sravani_B_Resume.pdf`):

- Roles: Tidel Enterprise Inc (Data Analyst, current), Drunix Solutions (Software Developer - Data), The George Washington University (Student Data Analyst), DXC Technology (Data Engineer, 5+ years — the deepest role, on Zurich Insurance Group's "Titian" platform)
- Key metrics she wants surfaced: 1M+ records processed daily, 35% pipeline runtime reduction, ~$7,500/month saved, 50M+ rows optimized, 99%+ data reliability, 10+ production pipelines deployed, 8+ years experience
- Certifications: AWS Certified Data Engineer Associate (badge: `public/AWSDataEngineer.png`) and a Databricks Certified Data Engineer Associate cert she's currently studying for ("on deck," badge: `public/Databricks.png`)
- Education: MS Computer Science, George Washington University; BTech Information Technology, Kakatiya Institute of Technology & Science
- Two personal side projects highlighted: Flight Delay Intelligence (AWS/dbt/Athena pipeline on BTS flight data), YouTube Trends Analytics (AWS Medallion architecture across 10 regions)

## Why the site looks the way it does — the design journey

The user is not iterating from a spec; she's iterating by **pointing at other developers' portfolios and asking for specific pieces**. This produced a long back-and-forth where things were built, shown to be wrong, and corrected. Understanding *why* the current state looks the way it does requires knowing what was tried and rejected.

### Reference sites and what was actually borrowed from each

1. **`shivypatel.com`** (GitHub: `shivy02/portfolio-website`, Next.js/Tailwind/Framer Motion) — the primary inspiration. We fetched real source files from this repo multiple times rather than guessing:
   - `src/components/ui/hero-constellation.tsx` → ported almost verbatim into `GlobalBackground.tsx` (see below)
   - `src/components/ui/logo-animation.tsx` (his `AnimatedLogo`, a hand-signature SVG path with a stroke-dashoffset draw-in) → the exact path data was reused for `Header.tsx`'s logo, but recolored and re-timed
   - `src/components/ui/shimmer-border.tsx` (his `ShimmerBorder`, actually the well-known Magic UI "shiny border" pattern) → ported into `Hero.tsx`'s `ViewWorkButton` and generalized into `Dashboard.tsx`'s `CardShimmerBorder`
   - `src/components/home/dashboard.tsx` → inspired the entire new `Dashboard.tsx` section (cards: cert badge, "Scratch Me," "Last Played" Spotify widget, tools marquee, etc.) — adapted with her own content rather than copied verbatim
   - `src/components/home/projects.tsx` → **referenced but not yet implemented** (Projects restyle is still pending — see `docs/TODO.md`)
2. **`adotey-portfolio.vercel.app`** (Christian Adotey) — supplied via a screenshot, not fetched source. Gave us the **typography direction**: Playfair Display serif for headings, a white/gray two-tone palette on a near-black background. This screenshot is also where the "Photo 1 placeholder" dark-brown color family (`#3a2f2f` → `#1c1616`) originated — she referenced "the color in Engineer" (his secondary heading color) repeatedly as a reference point even after we'd moved past using it directly.
3. **`radnaabazar.com`** — this site was **never actually accessible** to Claude (browser tool blocked the domain, WebFetch got repeated `500` errors). Everything we know about it came from screenshots the user pasted: a violet/gold glowing avatar ring, an impact-metrics row ("2 Years / 35 Projects / 20 Deployed"), a Professional/Personal toggle (not implemented), a "Scratch Me"-adjacent card style, and — most influential — the **year-by-year "journey report" timeline with narrative paragraphs instead of bullet points**, which is the direct model for the still-pending Experience section rewrite.

### The color journey (important — don't re-suggest any of these)

The accent color went through many iterations before landing on the final choice:

1. **Green `#6bab8a`** — the original color, inherited from before this session started (visible in `tailwind.config.js`'s `cyan` palette override, which maps all cyan shades to this hex — a leftover naming mismatch, harmless).
2. **Violet-to-gold gradient (`#7b61ff` → `#ffc414`)** on the name — copied from `shivypatel.com`'s `BackgroundGradient` component (the glow around his profile photo). **Rejected**: rendered as an unwanted "rainbow" effect on text.
3. **Solid gray `#a3a3a3`** — quick fix for the rainbow problem. **Rejected**: too flat/boring, "doesn't match Christian Adotey's palette" in her view.
4. **Peach `#fbe0c4`** (and a round of 3 lighter/darker peach alternatives shown as swatches) — user picked this from swatches. Used briefly across name, logo, section headings, and all "green" accent spots (nav hover states, etc.)
5. **Dark chocolate `#3a2f2f`** — user asked to swap peach for "something more chocolatey," referencing the Hero image-box placeholder color. Applied everywhere. **Rejected within the same session**: too dark to read against the navy background (both she and Claude flagged this independently before it even shipped).
6. **Beige `#c9b694`** — final answer. Shown as one of 5 swatches (`#EDE4D3`, `#E3D5B8`, `#D4C09E`, `#C9B694`, `#B9A480` — she picked the 4th, `#C9B694`). **This is the current, settled accent color.** It's used for: the name span in `Hero.tsx`, the logo stroke in `Header.tsx`, all metric numbers, section H1 headings (`ABOUT ME`/`WORK EXPERIENCE`/etc. — though About Me's own section is now unused, the class pattern `text-4xl lg:text-5xl font-bold text-[#c9b694] mb-16 text-center` is shared across `Experience.tsx`, `Education.tsx`, `Skills.tsx` [unused], `Projects.tsx`, `Contact.tsx`), the curtain overlay strip color, hover-glow effects, card borders, the shimmer-border hover animation, and the fullscreen modal backgrounds in `Dashboard.tsx`.

Do not suggest reverting to any of steps 1–5, and don't propose a *second* accent color without being asked — restraint (2-3 tones total: navy background, white/gray text, one beige accent) is a deliberate, hard-won decision.

### The curtain intro animation

Modeled after a green curtain-drop effect the user saw on `radnaabazar.com` (from a screenshot). Iterations:
- Original green strips → recolored to off-white `#f5f3ee` (per user request: "not green, use the color of the word 'Software' from Adotey's screenshot," i.e., white) → recolored again to the final beige `#c9b694` once that became the site's accent color.
- Direction was initially wrong (strips shrunk from a `scaleY` transform anchored at `top`, which visually reveals bottom-to-top) — corrected to a `translateY(0%) → translateY(100%)` slide, which properly reveals top-to-bottom, matching "a curtain physically falling."
- Speed was tuned twice: too fast initially (`0.9s` per strip, `0.045s` stagger) → slowed to the current `2.6s` per strip with `0.09s` stagger.
- Currently plays: (a) once on page load, (b) again every time a nav link is clicked (`Header.tsx`'s `scrollToSection` dispatches a `window` custom event `portfolio:curtain` that `CurtainOverlay.tsx` listens for and uses to bump a `key` prop, remounting and replaying the strip animation).
- **Not yet built**: a sound effect tied to the curtain (user explicitly wants this — "the sound should be there until the curtain totally falls off, even while switching between tabs"). Also not yet built: a **separate**, more elaborate transition specifically for nav-link clicks (distinct from the landing curtain) — a navy→beige wipe from bottom-to-top immediately followed by a beige→navy curtain-fall top-to-bottom, roughly matching the existing curtain's timing. See `docs/TODO.md`.

### The background particle system

`GlobalBackground.tsx` is a near-verbatim port of `shivypatel.com`'s `HeroConstellation`/`AnimatedDots` canvas component: 300 dots on desktop / 75 on mobile (his exact numbers, taken from his `hero.tsx` usage — his component defaults were higher but he overrode them down to these values), drifting at `0.15 + random*0.3` speed, mouse-repulsion radius 160px with force 0.35 and 0.97 damping, vignette darkening toward the edges, opacity pulsing via a per-dot sine phase. It's mounted once at the `App.tsx` root as a `fixed inset-0` layer (behind `z-10` content), so it's genuinely global — it doesn't stop at the Hero section, it's visible behind every section as you scroll. Dot size and opacity were tuned down once (were too large/bright at one point) then confirmed correct.

### The Header logo

**Not** a literal letter "S" (that was an early misunderstanding, then corrected). It's the exact SVG path data of Shivy Patel's own hand-drawn signature, fetched from his `logo-animation.tsx`, recolored to the site's beige accent, and re-implemented with a continuous plain-CSS `@keyframes logoDraw` loop (`stroke-dashoffset` 2800 → 0 → 2800, i.e., draws in then draws back out, repeating) rather than his click-triggered one-shot version — the user wanted it "animating throughout the entire time," not just on click. Speed was tuned from an initial `3.5s` (too fast) up to `13s` (final).

### Metrics row (Hero)

Final six metrics, in display order: **8+ Years of Experience, 1M+ Records Processed Daily, 35% Pipeline Runtime Reduction, $7.5K Saved Monthly, 50M+ Rows Optimized, 99%+ Data Reliability.** A 7th metric, "10+ Production Pipelines Deployed," was explicitly cut (user felt it was underwhelming compared to "8+ years"). "Years of Experience" was later added back in as the *first* item in the list (not appended at the end) per explicit instruction.

Behavior: numbers count up via `requestAnimationFrame` from 0 to their target over ~1.4s. The very first play is deliberately delayed by `CURTAIN_TOTAL_MS` (imported from `CurtainOverlay.tsx`, ~3.5s) so the count-up doesn't finish invisibly *underneath* the still-falling landing curtain — this was a real bug, confirmed and fixed. Interaction changed from **click**-to-highlight to **hover**-to-highlight (explicit correction — "not click when I just hover"): hovering one metric scales/brightens it and dims the other five; the underline accent bar and white (vs. beige) number color reinforce the highlighted state.

### The Dashboard section (entirely new, replaces About Me + Skills)

Both the old `About.tsx` and `Skills.tsx` sections were **explicitly removed** from the render tree (`App.tsx`) — their content was absorbed into new Dashboard cards instead:
- **"Why This?" card** — expands to fullscreen on click, shows the *exact* paragraph text that used to live in `About.tsx` (verbatim, including the specific bolded phrases: "pseudo-perfectionist," "Crafting pipelines," "optimizing data flows," and "int i = 10;" — these were originally styled with a cyan `.highlight` CSS class from an old color era; now they're just rendered `font-bold` in the same beige-on-beige-modal text color, no separate color).
- **Tools & Skills marquee** — replaces the old tag-cloud `Skills.tsx` entirely. Two rows of real brand-colored logos (via `react-icons/si`) scrolling in opposite directions, looping seamlessly (`[...row, ...row]` duplication + CSS `translateX(-50%)` keyframe). AWS, Tableau, and dbt have no available icon in this package and render as bordered text badges instead (see `CLAUDE.md`'s icon-verification note).
- **Two certification cards** — "AWS Certified" (badge: `AWSDataEngineer.png`, her already-completed cert) and "On Deck" (badge: `Databricks.png`, in progress). Both use a light cream card background (`#f3ede1`) rather than the site's usual dark card, specifically because both badge PNGs have a baked-in white background — putting them on a light card plus `mix-blend-mode: multiply` on the `<img>` makes the white disappear into the card instead of showing as a visible seam. This was arrived at after first trying to force the images onto dark cards, which made the white background starkly visible — a real, confirmed-and-fixed issue.
- **Scratch Me card** — a real canvas-based scratch-to-reveal (not a click-to-reveal shortcut), using `globalCompositeOperation = 'destination-out'` to erase a brown (`#3a2f2f`) cover layer as the user drags, revealing one of four personal quotes on a random solid-color background each time. Quotes (exact text, do not paraphrase):
  1. "Hey there, whatever is meant for you will cross seven oceans & find you. Trust the journey bro!" (bg `#2d5f6b`)
  2. "దేవుడు నిన్ను రాణి చేయాలనుకుంటే, నీకు కిరీటం ఇవ్వడు - యుద్ధాన్ని ఇస్తాడు" (bg `#6b3f2d`, rendered in **Noto Sans Telugu**, the only quote not in the fun/quirky font)
  3. "It's You Vs You. And one of You has to die!" (bg `#4a2d6b`)
  4. "God is love!" (bg `#6b2d4a`)

  All four (except the Telugu one) render in **Baloo 2** (a rounded, "fun/quirky" Google Font — deliberately different from the site's usual Inter/Playfair Display, per explicit request). A `ResizeObserver` repaints the canvas cover whenever the card's actual layout size settles — without this, the canvas was sized to a stale/smaller measurement taken before the CSS Grid finished laying out the card, leaving a visible strip of the quote's background peeking out uncovered. This was a real, confirmed bug, now fixed.
- **"Currently Listening" card** — static (not a live Spotify API integration — explicitly chosen over the live-integration alternative when offered the choice), shows "If You Love Her" by **Forest Blakk** (corrected from her spoken "Forest Black" via web search — that's the real artist name spelling), full-bleed `ForestBlakk.png` album art with a `Spotify.png` logo badge overlaid.
- **"Currently Reading" card** — shows `magic.png` (cover of *The Magic* by Rhonda Byrne, per the filename/user confirmation), full-bleed cover art, click expands fullscreen via the same `ExpandModal` component (with the cover image also shown large at the top of the modal). Does **not** say "Click to read more" (explicitly asked to be removed from this card specifically, while being kept on the "Why This?" card).

**Grid layout**: this went through several broken iterations before landing on an explicit, hand-computed bento grid (`grid-cols-2 lg:grid-cols-4 auto-rows-[130px]`, verified by computed-style inspection to tile with zero gaps: top row is four `row-span-2` cards at 280px each; second row is a 1-col + 3-col pair that together fill the width exactly; the tools marquee spans the full 4 columns at `row-span-2`). Earlier attempts used inconsistent `min-h`/fixed-`h` values per card without accounting for CSS Grid's row-height-matches-tallest-sibling behavior, producing large visually-obvious empty gaps — this was the single biggest point of user frustration in the session ("what the fuck is that alignment"). **As of the last exchange in this session, the corrected grid math was verified numerically (via computed `getBoundingClientRect()` on every grid child) but not yet visually confirmed by the user** — this is the first thing to check in a new session if picking this back up.

### Header nav & scroll behavior

Nav items, final order: **Home, Projects, Experience, Education, Contact** (no "About Me," no "Skills," no separate "Dashboard" link — Dashboard has no nav entry of its own, it's just part of the page flow between Hero and Projects). "Contact" was removed from the nav once, then explicitly re-added later in the same session — don't remove it again without being asked.

Header hides on scroll-down and reveals on scroll-up (a `lastY` ref tracked in a scroll listener, toggling a `headerVisible` state that drives a CSS `transform: translateY()` transition) — this was an explicit request, not present originally.

### Section order (current, in `App.tsx`)

```
Header → Hero → Dashboard → Projects → Experience → Education → Contact
```
About Me and Skills are gone entirely (content absorbed elsewhere, see above).

### Contact section simplification

The entire `<form>` (name/email/subject/message fields, EmailJS submit handler) was deleted — the user wants **no contact form at all**, just link cards. The "Location" card was also removed. What remains: Email, LinkedIn, GitHub link-cards only, plus the existing `ContactNetworkCanvas.tsx` background effect (untouched) and the "Open to Opportunities" status badge (untouched). The `@emailjs/browser` dependency is still installed but now unused — fine to leave, fine to remove later, not urgent.

## Genuinely still pending (the "four" the user refers to repeatedly)

These were explicitly acknowledged as not-yet-started by the end of this session — see `docs/TODO.md` for the actionable checklist:

1. **Projects section restyle** — currently still the *original*, untouched single-column alternating-side layout with Unsplash stock photos and category tag pills ("Machine Learning," "Data Analytics," etc.). Needs: 2-projects-per-row grid (matching `shivypatel.com`'s `projects.tsx` layout, which was fetched and described but not yet implemented), remove the category tag labels, keep the "View Source" link and all existing project content/copy, add the `CardShimmerBorder` rotating-gold-light hover effect (same component already built for `Dashboard.tsx`, just needs to be applied here too), add a per-card hover animation, add a scroll-triggered entrance animation for the section.
2. **Experience section rewrite** — currently still the *original* bullet-point/expand-collapse layout (see `Experience.tsx` as of this session's end — completely unmodified). Needs: keep the left-side company-logo timeline as-is; on the right, replace the bulleted "Responsibilities" dropdown with a genuine, humanized narrative paragraph per role (modeled on `radnaabazar.com`'s year-by-year "journey report" writing style — not too long, not too short, personal tone, not AI-sounding); a header block above each paragraph showing Company / Location / Position / Date range; remove the "Responsibilities" button/heading entirely; a light/dot animation that travels down the timeline's vertical line as the user scrolls (the existing `progressHeight`-driven fill bar is a start but not what was asked for — she wants a visible traveling dot with a light trail, not just a filling bar); no photos attached (unlike Radnaabazar's version, which included photo grids — explicitly declined for this site).
3. **New nav-transition effect + curtain sound** — a two-phase transition specifically for nav-link clicks (distinct from the existing landing-page curtain): first a navy→beige wipe animating bottom-to-top, immediately followed by a beige→navy curtain-fall top-to-bottom, timed similarly to the existing curtain (~2.6s range). Plus: a sound effect that plays for the full duration of *every* curtain/transition instance (landing and nav-clicks alike) — user is aware the very first landing-page instance may not be able to autoplay audio due to browser autoplay restrictions (requires prior user interaction) and has said to proceed anyway understanding that limitation.
4. Originally there was a 4th item (the "Currently Reading" card's actual book content) which has since been resolved (`magic.png` + title/author were provided and wired in) — if the user says "the four things" again, they most likely now mean items 1–3 above plus whatever the most recent request was; check `docs/SESSION_HANDOFF.md` for the latest state before assuming.

## Known issues / rough edges (non-blocking, no action needed unless asked)

- `About.tsx` and `Skills.tsx` still exist as files, unimported — harmless dead code.
- `@emailjs/browser` dependency unused after the Contact form removal — harmless.
- `tailwind.config.js`'s `cyan` color palette is named "cyan" but every shade maps to the old green `#6bab8a` — a leftover naming artifact from before this session, harmless but confusing if you go looking for "the accent color" there (it's not; the accent color is the beige literal `#c9b694` hardcoded via Tailwind arbitrary-value classes throughout, not a theme token).
- Several older components (`Experience.tsx`, `Education.tsx`, `About.tsx`) reference images via bare relative (`./Foo.png`) or bare absolute (`/Foo.png`) paths rather than `import.meta.env.BASE_URL`. These currently happen to still resolve correctly in dev (Vite dev server serves `public/` at the root regardless of the configured `base`, so bare paths are forgiving in `npm run dev` but would break in a production build under `/Portfolio/`). Not yet audited/fixed project-wide — flagged here so a production build issue doesn't come as a surprise.

## Future improvement ideas raised but not committed to

- Additional Dashboard cards suggested but not built: a live GitHub contribution heatmap, an "Available/Away" status badge (like `shivypatel.com`'s hero), a coding-stats ticker. None of these were greenlit — don't build them without being asked, just know they were floated as options.
- A live Spotify API integration was offered as an alternative to the static "Currently Listening" card and explicitly declined in favor of the static version — don't propose switching to live integration unless asked.
