# Xyle Hosting - Static Website

## Project Overview
A static website for Xyle Hosting (formerly Surf Hosting), a provider of hosting services including Minecraft hosting, VPS, dedicated servers, and website hosting. The site was originally built with Webflow and exported as static HTML/CSS/JS files.

## Tech Stack
- **Frontend**: Plain HTML5, CSS, JavaScript (no build step)
- **Design**: Exported from Webflow, heavily customized
- **Animations**: Lottie (some JSON files may be 403 from Webflow CDN)
- **Fonts**: Space Grotesk, IBM Plex Mono (Google Fonts via WebFont.js)
- **External services**: billing.xyle.host, panel.xyle.host, status.xyle.host, discord.gg/xylehosting

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
├── category/
│   ├── discord-bot.html        # Discord bot hosting plans
│   ├── essential-vps.html      # VPS hosting plans
│   ├── minecraft.html          # Minecraft hosting plans
│   └── web-hosting.html        # Web hosting plans
└── server.py                   # Optional no-cache server (unused)
```

## Branding
- **Logo**: Inline SVG — dark blue (#1a2eb8) rounded square with white X cross + "Xyle" (#1a2eb8) + "Hosting" (#3959ff) text
  - Footer logo: same SVG icon (#3959ff) + white text
  - Fully self-hosted, no CDN dependency
- **Primary blue**: #3959ff | **Dark blue**: #1a2eb8 | **Dark navy**: #0d1b2a
- **Discord**: discord.gg/xylehosting

## Key Implementation Notes
- `custom.css` included on all pages — handles logo sizing and mobile responsiveness
- Webflow CSS loaded from CDN: `surf-hosting.webflow.b4719a4e3.min.css` (NOT renamed)
- Webflow CDN blocks some assets (403) — specifically SVGs with IDs like `661bfcfd7a14900ef3a20f5[3-6]` and `661bfcfd7a14900ef3a20f5[0,4]`. These are replaced with inline SVGs in custom pages.
- Working CDN assets: IDs starting `6620...` (social icons), `661bfcfd7a14900ef3a20f[1-2]...` (Boxicons), `661bfcfd7a14900ef3a20f0b/...` (category/plan icons)
- Custom pages (blog, datacenter, company): light theme (#f0f4ff cards) with dark text to match Webflow's overall light design
- Promo banner removed from all pages
- `data-w-id` on navbar div needed for Webflow JS to properly initialize nav interactions

## Development
- Served via Python's built-in HTTP server on port 5000
- Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
- Deployment target: static
- Public directory: `.` (project root)
