# Xyle Hosting - Static Website

## Project Overview
A static website for Xyle Hosting (XyleHosting Pvt Ltd), a provider of hosting services including Minecraft hosting, VPS, dedicated servers, web hosting, and Discord bot hosting. The site was originally built with Webflow and exported as static HTML/CSS/JS files.

## Tech Stack
- **Frontend**: Plain HTML5, CSS, JavaScript (no build step)
- **Design**: Exported from Webflow, heavily customized
- **Animations**: Lottie (some JSON files may be 403 from Webflow CDN)
- **Fonts**: Space Grotesk, IBM Plex Mono (Google Fonts via WebFont.js)
- **External services**: billing.xyle.host, panel.xyle.host, status.xyle.host, discord.gg/xylehosting
- **Social**: Instagram @pushkar_xyle

## Project Structure
```
.
├── index.html                  # Main landing page
├── products.html               # Product lineup overview
├── server-marketplace.html     # Dedicated servers marketplace
├── company.html                # About Us page (custom)
├── blog.html                   # Blog listing page (custom)
├── datacenter.html             # Data Centers page (custom)
├── custom.css                  # Global custom styles (logo, responsive)
├── sitemap.xml                 # Full sitemap (10 URLs, auto-generated)
├── robots.txt                  # SEO robots file
└── category/
    ├── discord-bot.html        # Discord bot hosting plans
    ├── essential-vps.html      # VPS hosting plans
    ├── minecraft.html          # Minecraft hosting plans
    ├── web-hosting.html        # Web hosting plans
    ├── plans.css               # Shared plan card styles (xp-card, xp-chip, etc.)
    └── plans.js                # Shared plan JS: chip SVGs, icons, location filters
```

## Branding
- **Logo**: Inline SVG — dark blue (#1a2eb8) rounded square with white X cross + "Xyle" (#1a2eb8) + "Hosting" (#3959ff) text
  - Footer logo: same SVG icon (#3959ff) + white text
  - Fully self-hosted, no CDN dependency
- **Primary blue**: #3959ff | **Dark blue**: #1a2eb8 | **Dark navy**: #0d1b2a
- **Discord**: discord.gg/xylehosting | **Instagram**: @pushkar_xyle

## Key Implementation Notes
- `custom.css` + `category/plans.css` included on all pages — handles logo sizing, mobile responsiveness, and plan card styles
- Webflow CSS loaded from CDN: `surf-hosting.webflow.b4719a4e3.min.css` (NOT renamed)
- Webflow CDN blocks some assets (403) — specifically SVGs with IDs like `661bfcfd7a14900ef3a20f5[3-6]`. These are replaced with inline SVGs in custom pages.
- Working CDN assets: IDs starting `6620...` (social icons), `661bfcfd7a14900ef3a20f[1-2]...` (Boxicons), `661bfcfd7a14900ef3a20f0b/...` (category/plan icons)
- Custom pages (blog, datacenter, company): light theme (#f0f4ff cards) with dark text to match Webflow's overall light design
- Promo banner removed from all pages
- **CRITICAL**: Do NOT use `style="opacity:0"` on `.content` divs in custom pages — Webflow's IX2 animation won't trigger on non-CMS pages, leaving content invisible. Remove the inline opacity style instead.
- **CRITICAL**: Custom sections inserted into index.html must NOT use Webflow's `class="content"` or `class="section"` wrappers — they will be constrained by Webflow's 2-column grid. Use standalone inline-styled sections instead.

## Plan Pages (Minecraft + VPS + Web + Discord Bot)
- Shared system: `category/plans.css` + `category/plans.js` — all reusable filter UI
- **CPU Chip illustrations**: JS-generated inline SVGs injected into `.xp-chip[data-brand][data-model]` divs
  - Brands: `intel` (blue #0071C5), `amd` (red #ED1C24), `kvm` (dark blue #1a2eb8), `nvme` (purple #7c3aed), `storage` (slate #334155), `offer` (amber #d97706), `web` (green #059669), `discord` (purple #5865F2)
  - Each chip shows brand label, sub-category, and specific model text
- **Feature icons**: Hardware-specific inline SVGs injected via `data-icon` attribute (cpu/ram/ssd/hdd/vcpu/bandwidth/ip/ddos/backup/db/splits/support/check)
- **Location filter**: Real flag images from `flagcdn.com` (22x16 for buttons, 16x12 for inline card tags)
- **Locations**: India (in), Singapore (sg), Germany (de), Nepal (np) only
- **Minecraft plans**: Intel ($3.99–$22.99 × 5 tiers), Ryzen ($8.99–$39.99 × 4 tiers), Offers (3 deals)
- **VPS plans**: KVM ($4.99–$84.99 × 6 tiers), NVMe Ryzen ($19.99–$99.99 × 4 tiers), Storage ($14.99–$39.99 × 3 tiers)
- **Web Hosting plans**: Starter ($3.99), Deluxe ($4.99), Business ($7.99)
- **Discord Bot plans**: 512MB ($4.50/qtr), 1GB ($9/qtr)
- Color theme: blues (#1a2eb8/#3959ff), no dark/black backgrounds — light card design throughout

## SEO
- All 10 pages have: keyword-rich `<title>` + `<meta description>`, Open Graph + Twitter cards, canonical URLs, robots meta, JSON-LD structured data
- `index.html`: Organization + WebSite + ItemList JSON-LD schemas
- Category pages: Product schema per plan
- `sitemap.xml`: 10 URLs with lastmod and priority
- `robots.txt`: Allows all, points to sitemap

## Development
- Served via Python's built-in HTTP server on port 5000
- Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
- Deployment target: static
- Public directory: `.` (project root)
