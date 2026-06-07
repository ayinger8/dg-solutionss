# Design System: DG Solutions

> Single source of truth for Google Stitch screen generation.
> Encodes the premium, trust-forward aesthetic of DG Solutions — a Mexican SMB digital agency.

---

## 1. Visual Theme & Atmosphere

A warm, structurally confident interface that balances approachability with premium craft. The atmosphere reads like a well-lit modern consultancy: generous whitespace, a bold purple identity that anchors every section, and motion that feels intentional rather than decorative.

- **Density:** 4 — Daily App Balanced. Sections breathe heavily but are information-complete.
- **Variance:** 7 — Offset Asymmetric. Zigzag layouts, staggered grids, and alternating content rhythms break monotony without chaos.
- **Motion:** 6 — Fluid CSS. Spring-physics fade-ups on scroll, subtle hover depth, CSS grid accordion expansion. No cinematic hijacks.

The primary surface is near-white with a whisper of lavender (`#FDFCFF`). The hero uses a soft purple gradient with animated wave blobs. Sections alternate between white and pale gradient backgrounds to create visual chapters. Typography is exclusively Geist Sans — sharp, modern, and completely legible at any weight.

The brand personality: **organized, honest, Mexican**. No tech-bro energy. No cold B2B distance. Every word and layout choice signals that this team understands small businesses and speaks their language.

---

## 2. Color Palette & Roles

### Primary Brand
- **Deep Violet** (`#4D2FBF`) — Primary interactive: buttons, active states, links, focus rings
- **Violet Hover** (`#4327A8`) — Hover state for primary elements only
- **Soft Violet** (`#7B5CE5`) — Accent highlights, icon fills, gradient endpoints
- **Ink Violet** (`#1A1560`) — Dark backgrounds (CTABanner, deep sections), display text contrast
- **Logo Violet** (`#5F24D6`) — Logo wordmark only — do not reuse

### Background Surfaces
- **Canvas** (`#EDE8FF`) — Page-level background. Subtle lavender, not pure white.
- **Pure Surface** (`#FDFCFF`) — Card fills, form containers, section panels. Near-white with a whisper of violet.
- **Muted Lavender** (`#F5F0FF`) — Hover states, tag backgrounds, muted icon containers
- **Lavender Border** (`#DDD2FF`) — Card borders, dividers, input borders
- **Section Divider** (`#ECE4FF`) — Lightweight structural lines between sections

### Hero Gradients (wave animation only)
- `#DDD2FF` → `#CFC4FF` → `#E5DEFF` → `#F4EEFF` — Used exclusively in the Hero section linear gradient background

### Status Colors (never use as primary accent)
- **Teal Success** (`#3ABFA8`) — Success states, green badges, "live" indicators, positive metrics
- **Teal Background** (`#ECFDF5`) — Success badge fills
- **Teal Border** (`#D1FAE5`) — Success card outlines
- **Electric Blue** (`#5B7CFA`) — Secondary feature accent (Solutions: "Ahorra tiempo")
- **Blue Background** (`#EEF2FF`) — Blue feature card fills
- **Blue Border** (`#D8E1FF`) — Blue card outlines
- **Warm Orange** (`#F2605A`) — Tertiary feature accent (Solutions: "Haz que te encuentren")
- **Orange Background** (`#FFF1EF`) — Orange feature card fills
- **Orange Border** (`#FFD4CF`) — Orange card outlines
- **Amber Popular** (`#FFC533`) — "★ Popular" badge on pricing only

### Text Scale
- **Ink** (`#111318`) — Primary headings, critical UI text
- **Body Charcoal** (`#3B3F52`) — Body copy, paragraphs
- **Muted Steel** (`#666C80`) — Secondary descriptions, metadata
- **Whisper** (`#969DB2`) — Placeholder text, disabled states
- **Ghost** (`#C8CDD8`) — Purely decorative dividers, faint borders

### Banned Colors
- Pure black (`#000000`) — use Ink (`#111318`) instead
- Pure white (`#FFFFFF`) — use Pure Surface (`#FDFCFF`) for cards
- Any neon purple, electric violet, or glow-in-the-dark accent
- Warm beige/cream families (`#f5f1ea`, `#fbf8f1`) — wrong brand temperature

---

## 3. Typography Rules

**Primary Font:** `Geist Sans` — Modern geometric grotesque. Sharp at display sizes, readable at body. The only permitted typeface family for this project.

**Monospace Font:** `Geist Mono` — Reserved for code snippets, numeric data (pricing, metrics), and metadata timestamps.

### Scale

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Display / Hero H1 | `52px` → `76px` → `96px` (mobile → tablet → desktop) | Black (900) | `-0.06em` | `0.92` |
| Section H2 | `38px` → `52px` → `56px` | Black (900) | `-0.055em` | `1.08` |
| Card H3 | `24px` → `32px` → `40px` | Black (900) | `-0.04em` | `1.2` |
| Eyebrow Label | `10px` → `12px` | Black (900) | `+0.22em` | — |
| Body Large | `18px` → `19px` | Regular (400) | `0` | `1.7` |
| Body Base | `15px` → `16px` | Medium (500) | `0` | `1.75` |
| Caption / Meta | `11px` → `13px` | Bold (700) | `+0.08em` | — |
| Button | `14px` → `16px` | Black (900) | `0` | — |

### Rules
- H1 must never exceed 3 lines. Use wider containers (`max-w-[780px]`) before reducing size.
- Body text maximum `65ch` line length.
- Eyebrow labels are always `UPPERCASE` with `tracking-[0.22em]` — never title case.
- Weight hierarchy drives importance. Never use size alone to communicate hierarchy.
- No italic display text. No mixed-family emphasis (no serif word inside sans headline).

### Banned Typography
- `Inter`, `Roboto`, `Arial`, `Open Sans`, `Helvetica` — too generic
- `Fraunces`, `Instrument_Serif`, `Georgia` — wrong brand tone
- Gradient text on large headings (legibility failure at scale)
- `font-display: block` without explicit size constraints

---

## 4. Component Stylings

### Buttons

**Primary (`btn-primary`):**
- Shape: `rounded-full` pill
- Fill: Deep Violet (`#4D2FBF`) → Violet Hover (`#4327A8`) on hover
- Text: White, `font-black`, `text-[14px]`
- Padding: `px-7 py-3.5` standard; `px-9 py-[1.1rem]` for hero-scale
- Transition: `transform 160ms ease-out, background-color 160ms ease-out, box-shadow 200ms ease-out` — never `transition-all`
- Hover: `scale(1.03)` + `shadow-[0_8px_24px_rgba(107,33,168,.3)]`
- Active: `scale(0.97)` with `transition-duration: 80ms` — tactile press
- Trailing icon: Wrapped in `h-7 w-7 rounded-full bg-black/10 flex items-center justify-center` — button-in-button pattern
- Focus: `outline: 2px solid #4D2FBF; outline-offset: 3px; border-radius: 4px`

**Secondary (`btn-secondary`):**
- Shape: `rounded-full` pill
- Fill: `bg-white/60 backdrop-blur-sm` with `border border-primary/30`
- Text: Deep Violet (`#4D2FBF`), `font-bold`, `text-[16px]`
- Hover: `bg-white scale(1.03)`
- Active: `scale(0.97)`

**Ghost / Inline CTA:**
- No background, no border
- Text in accent color with `transition-opacity hover:opacity-75`
- Trailing arrow in `h-6 w-6 rounded-full bg-current/10` wrapper

**Banner CTA (on dark backgrounds):**
- Fill: Pure white (`#FFFFFF`)
- Text: Ink Violet (`#1A1560`)
- Hover: `bg-white/90 scale(1.03)`
- Same button-in-button trailing icon pattern

### Cards (`card-premium`)

- Shape: `rounded-[28px]`
- Fill: Pure Surface (`#FDFCFF`)
- Border: Lavender Border (`#DDD2FF`)
- Shadow: `0 8px 40px rgba(107,33,168,.07)` — tinted to brand hue, never pure black
- Padding: `p-10` standard
- Hover: Framer Motion `whileHover={{ y: -6 }}` — never CSS `:hover` translate (fires on touch)
- Tap: Framer Motion `whileTap={{ scale: 0.98 }}`

**Feature Cards (Problem section):**
- Background: `{colorBg}33` (8-digit hex with alpha — 20% opacity)
- Border: `{colorBg}88` (53% opacity)
- No CSS hover state — use Framer Motion `whileHover/whileTap` exclusively

**Pricing Cards:**
- Standard: card-premium styling
- Popular/Gradient: `bg-gradient-to-br from-violet-500 to-blue-500` with `shadow-[0_28px_70px_rgba(107,33,168,.25)]`
- Both: `whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}`
- Duration: `0.5s` entrance, `index * 0.09s` stagger delay

### Inputs / Forms

- Label: Above input, `text-[13px] font-black text-Ink`, `mb-1.5`
- Input: `rounded-2xl border border-[#DDD2FF] bg-[#FDFCFF] px-5 py-3.5`
- Transition: `transition duration-200` (NOT `transition-all`)
- Focus: `border-[#7B5CE5] shadow-[0_0_0_4px_rgba(124,58,237,.12)] bg-white`
- Placeholder: Ghost (`#C8CDD8`)
- Error text: Below input, `text-[12px] text-[#F2605A]`
- No floating labels — label always above, always visible

### Submit Button
- `motion.button` with `whileTap={{ scale: 0.97 }}`
- Same styling as `btn-primary` with `w-full justify-center`

### FAQ Accordion

- Outer div: `rounded-[20px] border` — border color transitions with inline style `transition: border-color 150ms ease, box-shadow 150ms ease`
- Open state: `border-[#DDD2FF] bg-[#FDFCFF] shadow-[0_8px_32px_rgba(107,33,168,.08)]`
- Closed state: `border-[#ECE4FF] bg-white`
- Expansion: CSS `grid-template-rows: 0fr → 1fr` (200ms ease-out) — never Framer Motion `height: "auto"`
- Chevron: `transition: transform 200ms ease-out, background-color 150ms ease, color 150ms ease`
- Content opacity: `150ms ease-out` fade linked to open state

### Navigation

- Desktop: Fixed full-width, transitions from `bg-white/80 backdrop-blur-sm` to `bg-white/97 shadow backdrop-blur-md` on scroll
- Transition: `background-color 300ms ease, box-shadow 300ms ease` — not `transition-all`
- Mobile menu: CSS `grid-template-rows: 0fr → 1fr` (220ms ease-out) + inner div `opacity 150ms ease-out`
- Mobile hamburger: Icon swap (menu ↔ x) — morph animation recommended for future iteration
- Nav links: `text-[12.5px] font-bold uppercase tracking-[0.1em]` with `transition-colors hover:text-primary`

### Scroll-to-Top Button

- `motion.button` with `AnimatePresence` for enter/exit
- Enter: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`
- `whileTap={{ scale: 0.9 }}`
- Appears at `scrollY > 500px`

---

## 5. Layout Principles

### Containment
- Maximum content width: `max-w-[1400px] mx-auto`
- All sections use consistent horizontal padding: `px-6 md:px-12 lg:px-20`
- Cards grid max-width: `max-w-[1200px]`

### Section Spacing
- Minimum section padding: `py-24` for standard sections
- Hero: `min-h-[100dvh]` — never `h-screen`
- CTA Banner: `py-12` outer + `py-20` inner rounded container
- Integrations strip: `py-10` (compact — decorative)

### Grid Patterns
- **Problem Section:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- **Solutions:** First 2 items zigzag (`lg:grid-cols-2`), last 2 items `md:grid-cols-2` card grid
- **Pricing:** `md:grid-cols-3 gap-6` with `max-w-[1200px]`
- **Testimonials:** `md:grid-cols-3 gap-6`
- **Contact:** `lg:grid-cols-2 gap-16`
- Forbidden: 3 equal-width feature cards as the only layout option
- Always use CSS Grid — never `w-[calc(33%-1rem)]` flexbox hacks

### Z-Index Layers
- `z-50` — Fixed header only
- `z-10` — Sticky section elements, gradient overlays
- `z-0` — Default content flow
- No arbitrary `z-[9999]` values

---

## 6. Motion & Interaction

### Core Animation Preset (`fadeUp`)
```
initial: { opacity: 0, y: 20 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, amount: 0.15 }
transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
```
Use on every section header and major content block. Never skip this — static appearance reads as unfinished.

### Stagger Patterns
- Problem cards: `i * 0.08s` delay
- Testimonial cards: `i * 0.07s` delay
- Pricing cards: `i * 0.09s` delay
- Navigation mobile links: `i * 0.05s` delay (when implementing morph menu)

### Spring Physics
- `MotionConfig reducedMotion="user"` wraps the entire page — all animations auto-disable for `prefers-reduced-motion`
- Spring hover on cards: `whileHover={{ y: -6 }}` with default Framer spring
- Press feedback: `whileTap={{ scale: 0.97 }}` on all interactive elements

### CSS Accordion Expansion
```css
/* Compositor-safe — no layout reflow */
grid-template-rows: 0fr → 1fr
transition: grid-template-rows 200ms ease-out
```
Inner element: `overflow: hidden; min-height: 0`
Never use Framer Motion `height: "auto"` — triggers layout reflow.

### Marquee (Integrations Strip)
```css
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
animation: marquee 28s linear infinite
```
Paused via `animation: none` in `@media (prefers-reduced-motion: reduce)`.

### Hero Wave Blobs
- 5 layered divs with `border-radius: 50%` and `position: absolute`
- Custom `waveA / waveB / waveC` keyframes with `translateX + scaleY`
- `floatA / floatB` for floating hero cards
- All paused in `prefers-reduced-motion`

### Banned Motion Patterns
- `transition: all` — always specify exact properties
- `height: "auto"` in Framer Motion — use CSS grid-rows trick
- `window.addEventListener('scroll')` for reveal animations — use `whileInView` or IntersectionObserver
- CSS `:hover` transforms on cards (fires on mobile tap) — use Framer `whileHover`
- `linear` or `ease-in-out` easing — always use `ease-out` or custom bezier
- Animations over 300ms for UI interactions (marketing sections can exceed this)

---

## 7. Anti-Patterns (Banned)

### Typography
- No `Inter`, `Roboto`, `Arial`, `Open Sans`
- No `Fraunces`, `Instrument_Serif`, `Georgia`, `Garamond` for this brand
- No gradient text on large headings
- No italic display text
- No mixed font families in a single heading

### Color
- No pure black `#000000`
- No neon purple glows or outer box shadows in accent color
- No warm beige/cream backgrounds (`#f5f1ea` family)
- No oversaturated accents (saturation > 80%)
- No warm-gray / cool-gray fluctuation within the same page

### Layout
- No `h-screen` — always `min-h-[100dvh]`
- No `transition-all` — always specify properties
- No centered hero (Variance > 4 — use left-aligned or split)
- No 3-column equal-card feature rows as sole layout
- No `z-[9999]` or arbitrary z-index values
- No `calc()` flexbox percentage hacks

### Copy (AI Clichés — Banned Words)
- "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionary", "Game-changer"
- "Empower", "Transform your business", "Take your business to the next level"
- "Estado del arte", "Soluciones de vanguardia"
- Generic placeholder names: "Juan García", "Empresa ABC", "Cliente satisfecho"
- Fake round numbers: "99.99% uptime", "50% faster", "10x growth"
- Filler UI text: "Scroll to explore", "Swipe down", bouncing chevrons

### Components
- No generic circular spinners — use skeletal loaders
- No floating labels on inputs — label always above
- No custom mouse cursors
- No outer neon glow box-shadows on buttons
- No CSS `:hover` transforms on mobile-visible cards (use Framer `whileHover`)
- No `transition-all duration-300` — always specify exact CSS properties

### Images
- No broken Unsplash links — use `/IMAGES/` local assets or `picsum.photos/seed/{keyword}`
- No `null` image sources without graceful `ImagePlaceholder` fallback
- No unconstrained `<img>` — always Next.js `<Image>` with explicit `width/height` or `fill`

---

## 8. Brand Voice (Copy Guidelines for Stitch)

**Tone:** Warm, direct, honest. Speaks like a trusted friend who happens to know about tech — not a salesperson.

**Mexican SMB Context:**
- Use MXN currency notation (`$599 MXN/año`, not `$599/yr`)
- Reference real Mexican cities and contexts (Mazatlán, Sinaloa, CDMX, Culiacán)
- "Asesoría" not "consultoría" — closer to the way Mexicans speak
- "Negocio" not "empresa" for small businesses
- "Gratis" prominently — it removes the main conversion barrier

**CTA Language:**
- Primary: "Solicitar Asesoría Gratis" / "Agendar asesoría gratis"
- WhatsApp CTAs: "Escríbenos por WhatsApp"
- Pricing: "Ver detalle" / "Ver precios"
- Never: "Start for free", "Try now", "Get started" — translate with cultural fit

**Section Copy Pattern:**
```
[Eyebrow — category label in UPPERCASE]
[H2 — direct, confident, benefit-led]
[Subtext — 1-2 sentences explaining the human problem being solved]
```

---

*Generated by Stitch Design Taste skill · DG Solutions v4 · 2026-06-06*
