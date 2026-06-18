# Berly Landing Page

Marketing site for [Berly](https://berly.app) — desktop AI compliance documentation software for consultants, lawyers, and compliance teams.

## Live site
- Production: https://berly.app

## Pages
- `index.html` — main landing page
- `classifier.html` — free multi-framework AI compliance classifier
- `deadlines.html` — free deadlines and documentation-reference page
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

## Classifier lead verification

The classifier submits to `https://berly-api.berly.workers.dev/screener-results`. Cloudflare KV in `berly-api` remains the source of truth; this landing repo does not store leads.

Manual checklist:

1. Complete the classifier, submit a valid email, and confirm the results email arrives.
2. Confirm `berly-api` stores `screener-lead:{normalizedEmail}` in Cloudflare KV.
3. Export with `GET /admin/screener-leads` and a valid `ADMIN_EXPORT_TOKEN`; confirm the lead comes from KV.
4. Confirm the exported lead includes `source`, `frameworkResultSummary`, `applicableFrameworks`, `riskOutcome`, and jurisdiction/framework flags.
5. Submit an invalid email and confirm the landing form does not submit it.
6. Test `/classifier?source=producthunt`, `/classifier?source=linkedin`, and `utm_source` variants; confirm the source is preserved in KV/export.
7. Test without source parameters; confirm Product Hunt/LinkedIn referrers are recognized and other referrers/default classifier attribution behave as expected.
8. Simulate an API failure; confirm the form displays a retry message and remains usable.
