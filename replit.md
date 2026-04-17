# Xyle Hosting - Static Website

## Project Overview
A static website for Xyle Hosting (formerly Surf Hosting), a provider of hosting services including Minecraft hosting, VPS, dedicated servers, and website hosting. The site was originally built with Webflow and exported as static HTML/CSS/JS files.

## Tech Stack
- **Frontend**: Plain HTML5, CSS, JavaScript (no build step)
- **Design**: Exported from Webflow
- **Animations**: Lottie
- **Fonts**: Space Grotesk, IBM Plex Mono (Google Fonts)
- **External services**: billing.xyle.host, panel.xyle.host, status.xyle.host

## Project Structure
```
.
├── index.html                  # Main landing page
├── products.html               # Product lineup overview
├── server-marketplace.html     # Dedicated servers marketplace
├── company.html                # About Us page
├── category/
│   ├── discord-bot.html        # Discord bot hosting plans
│   ├── essential-vps.html      # VPS hosting plans
│   ├── minecraft.html          # Minecraft hosting plans
│   └── web-hosting.html        # Web hosting plans
```

## Development
- Served via Python's built-in HTTP server on port 5000
- Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`

## Deployment
- Deployment target: static
- Public directory: `.` (project root)
