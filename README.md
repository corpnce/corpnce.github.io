# Corpnce Technologies Website

A static, SEO-optimized site built with Astro, TypeScript, and Tailwind CSS. Deployed on **GitHub Pages**.

## Features

- **Static site** — Fast, no server required
- **SEO** — Metadata, sitemap, JSON-LD
- **Blog** — MDX with reading time
- **Contact** — Formspree (optional)
- **Jobs** — Live listings from Remotive (client-side)
- **Analytics** — Plausible / PostHog (optional)

## Prerequisites

Node.js 20+ and npm

## Setup

```bash
git clone <repository-url>
cd website
npm install
cp .env.example .env   # optional: analytics, Formspree
```

## Development

```bash
npm run dev
```

Open `http://localhost:4321`

## Build

```bash
npm run build
```

Output in `dist/`. Preview with `npm run preview`.

## Deployment (GitHub Pages)

1. **Settings → Pages** — Source: **GitHub Actions**
2. Push to the **deploy** branch to build and deploy
3. Site: **https://corpnce.github.io**

Optional: add **Secrets** → `PUBLIC_FORMSPREE_FORM_ID` (from [Formspree](https://formspree.io)) so contact forms work.

## Configuration

- **Contact forms**: Set `PUBLIC_FORMSPREE_FORM_ID` at build time (e.g. in GitHub Secrets) so forms submit to Formspree
- **Analytics**: `PUBLIC_PLAUSIBLE_*` and `PUBLIC_POSTHOG_*` in `.env` or build env

## Project structure

```
├── public/          # Static assets
├── src/
│   ├── components/
│   ├── content/     # Blog (MDX)
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── .github/workflows/  # Deploy to Pages
└── astro.config.mjs
```

## License

Open-source. Built by Corpnce Technologies.
