# Berly Landing Page

Marketing site for [Berly](https://berly.app), desktop AI compliance documentation software for consultants, lawyers, and compliance teams.

## Live site
- Production: https://berly.app

## Pages
- `index.html` — main landing page
- `classifier.html` — free multi-framework AI compliance classifier
- `deadlines.html` — free deadlines and documentation-reference page
- `feedback.html` — lightweight visitor feedback form
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
- evidence attachment and review workflow
- audit trail / change history
- structured PDF exports for review
- free classifier
- free deadlines/reference guide
- demo video

## Deployment
This repo deploys to Cloudflare Pages for `berly.app`.

Production deploys are triggered by pushes to the main production branch currently connected to Cloudflare Pages.

## Development
There is no build step.

Important: Because the site uses root-relative links, do not test it by opening the HTML files directly with file:///....

Use a local web server or a Cloudflare Pages preview instead.

Root-relative routes include:
- `/`
- `/classifier`
- `/deadlines`
- `/feedback`

do **not** test by opening the HTML files directly from disk with `file:///...`.

Use a local web server or test on the deployed Pages preview / production site instead.

## Notes
- Open Graph and Twitter preview image are served from:
  - `assets/og-image.png`
- Demo video is embedded on the landing page
- Cloudflare Web Analytics is enabled and should be reviewed from the Cloudflare dashboard

## Forms and API integration

The classifier and feedback forms submit to the Berly API.

This repository contains only public frontend code and configuration. Lead storage, feedback storage, email delivery, Turnstile verification, rate limiting, and administrative access are handled server-side in the private API repository.

The Cloudflare Turnstile site key used by the feedback form is public by design. Secret keys and administrative credentials must never be committed to this repository.
