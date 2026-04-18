# Xyle Hosting - Static Website

## Project Overview
A static website for Xyle Hosting (formerly Surf Hosting), a provider of hosting services including Minecraft hosting, VPS, dedicated servers, and website hosting. The site was originally built with Webflow and exported as static HTML/CSS/JS files.

## Tech Stack
- **Frontend**: Plain HTML5, CSS, JavaScript (no build step)
- **Design**: Exported from Webflow, heavily customized
- **Animations**: Lottie
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
├── category/
│   ├── discord-bot.html        # Discord bot hosting plans
│   ├── essential-vps.html      # VPS hosting plans
│   ├── minecraft.html          # Minecraft hosting plans
│   └── web-hosting.html        # Web hosting plans
└── server.py                   # Optional no-cache server (unused)
```

## Branding
- **Logo**: Dark blue (#1a2eb8) pill with white "X" box + "XyleHosting" in white text
  - The pill design was chosen to guarantee visibility on both light and dark nav backgrounds
  - Footer logo: separate span-based design (white text on dark footer bg)
- **Primary blue**: #3959ff | **Dark blue**: #1a2eb8 | **Dark navy**: #0d1b2a
- **Discord**: discord.gg/xylehosting

## Key Implementation Notes
- Webflow CSS loaded from CDN: `surf-hosting.webflow.b4719a4e3.min.css` (NOT renamed)
- Webflow CSS injects `color` inheritance on `.w-nav-brand` — nav logo MUST use background-based design (pill) to be visible; plain text spans get overridden
- Custom pages (blog, datacenter): use Webflow CSS classes but inline styles for custom sections
- `data-w-id` on navbar div needed for Webflow JS to properly initialize nav interactions
- Body background: light gray (Webflow default) — white/transparent text invisible; use dark solid backgrounds

## Development
- Served via Python's built-in HTTP server on port 5000
- Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
- Deployment target: static
- Public directory: `.` (project root)
