# Berly Landing Page

Marketing site for [Berly](https://berly.app) — desktop AI compliance documentation software for consultants, legal teams, and AI governance professionals.

## Live site
- Production: https://berly.app

## Pages
- `index.html` — main landing page
- `classifier.html` — free multi-framework AI compliance classifier
- `deadlines.html` — free deadlines and required-documents reference page
- `assets/` — icons, images, OG image, PDF assets, and other static files

## Product positioning
Berly is a desktop tool for AI compliance documentation across:
- EU AI Act
- Colorado SB 24-205
- Illinois AIVIA + HB 3773
- NYC Local Law 144
- CPRA ADMT

Key public-facing features currently highlighted on the site:
- field-level regulatory guidance
- AI-assisted drafting with human approval
- evidence verification
- audit trail / change history
- audit-ready PDF exports
- free classifier
- free deadlines/reference guide
- demo video

## Deployment
This repo deploys to Cloudflare Pages for `berly.app`.

Production deploys are triggered by pushes to the main production branch currently connected to Cloudflare Pages.

## Development
There is no build step.

Important:
because the site now uses root-relative links such as:
- `/`
- `/classifier`
- `/deadlines`

do **not** test by opening the HTML files directly from disk with `file:///...`.

Use a local web server or test on the deployed Pages preview / production site instead.

## Notes
- Open Graph and Twitter preview image are served from:
  - `assets/og-image.png`
- Demo video is embedded on the landing page
- Cloudflare Web Analytics is enabled and should be reviewed from the Cloudflare dashboard