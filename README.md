# Berly Landing Page

Marketing site for [Berly](https://berly.app) — desktop AI compliance documentation software for consultants, lawyers, and compliance teams.

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

Important:
because the site now uses root-relative links such as:
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

## Classifier lead verification

The classifier submits to `https://berly-api.berly.workers.dev/screener-results`. Cloudflare KV in `berly-api` remains the source of truth; this landing repo does not store leads.

Manual checklist:

1. Complete the classifier, submit a valid email, and confirm the results email arrives.
2. Confirm `berly-api` stores `screener-lead:{normalizedEmail}` in Cloudflare KV.
3. Export with `GET /admin/screener-leads` and a valid `ADMIN_EXPORT_TOKEN`; confirm the lead comes from KV.
4. Confirm the exported lead includes `source`, `frameworkResultSummary`, `applicableFrameworks`, `riskOutcome`, and jurisdiction/framework flags.
5. Submit an invalid email and confirm the landing form does not submit it.
6. Test `source`, `utm_source`, and safe `ref` variants such as `?ref=producthunt` and `?ref=partner-newsletter`; confirm the source is preserved in attribution and KV/export.
7. Confirm source priority is `source`, then `utm_source`, then `ref`, then known external referrer domains; without those signals, confirm direct/referral attribution behaves as expected.
8. Simulate an API failure; confirm the form displays a retry message and remains usable.
9. Clear the site's local storage, then visit `https://berly.app/?utm_source=linkedin&utm_campaign=test` and navigate to the classifier.
10. Submit a test email and confirm the `berly-api` KV lead contains `attribution.firstTouch.firstTouchSource` or `attribution.firstTouch.utmSource` as `linkedin`, with `utmCampaign` set to `test`.
11. Confirm the immediate `page` and `referrer` may show the classifier and `berly.app`, while `attribution.firstTouch` preserves the original landing page and campaign source.
12. Clear local storage and visit `https://berly.app/?ref=producthunt`, then repeat with `?ref=partner-newsletter`; confirm `firstTouchSource` is respectively `producthunt` and `partner-newsletter`.

## Feedback verification

The feedback page submits to `https://berly-api.berly.workers.dev/feedback`. Cloudflare KV in `berly-api` remains the source of truth for stored feedback records; this landing repo does not store feedback.

The feedback page uses Cloudflare Turnstile. The public frontend site key is configured in `feedback.html` as `TURNSTILE_SITE_KEY`. The Turnstile secret key must not be placed in this repo; it belongs only in `berly-api` as `TURNSTILE_SECRET_KEY`.

Manual checklist:

1. Visit `/feedback`.
2. Confirm the Turnstile widget renders.
3. Submit feedback without completing Turnstile and confirm the page asks for verification before sending.
4. Complete Turnstile, submit feedback without an email address, and confirm the success state appears.
5. Confirm `berly-api` stores a Cloudflare KV record under `feedback:`.
6. Submit feedback with an email address.
7. Confirm the stored feedback record includes `page`, `referrer`, and `attribution`; the API should accept it only after server-side Turnstile verification.
8. Submit an empty message and confirm the page blocks submission before calling the API.
9. Trigger or simulate a rate-limit response and confirm the page shows a retry-later message.
