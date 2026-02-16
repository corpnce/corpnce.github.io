# Cloudflare Pages Deployment Guide

This guide will help you deploy your Corpnce website to Cloudflare Pages (Free Plan).

## Quick Start Summary

1. **Install Cloudflare adapter**: `npm install @astrojs/cloudflare`
2. **Update astro.config.mjs** to use `@astrojs/cloudflare` adapter (see Step 2)
3. **Connect GitHub repo** to Cloudflare Pages dashboard
4. **Set build command**: `npm run build`
5. **Set output directory**: `dist`
6. **Add environment variables** in Cloudflare dashboard
7. **Deploy!**

⚠️ **Note**: The contact form API needs to be updated for Cloudflare compatibility (see Step 5).

## Prerequisites

1. A Cloudflare account (free tier is sufficient)
2. Your GitHub repository connected to Cloudflare Pages
3. Node.js 20+ installed locally (for testing)

## Step 1: Install Cloudflare Adapter

First, install the Cloudflare adapter for Astro (version 12.x for Astro 5 compatibility):

```bash
npm install @astrojs/cloudflare@^12.6.12
```

**Note**: Make sure you're using `@astrojs/cloudflare` version 12.x or higher for Astro 5 compatibility. Version 11.x only supports Astro 4.

## Step 2: Update Astro Configuration

You have two options:

### Option A: Update Existing Config (Recommended)

Update `astro.config.mjs` to use the Cloudflare adapter:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://corpnce.com', // Update with your actual domain
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Option B: Use Cloudflare-Specific Config

1. Rename `astro.config.cloudflare.mjs` to `astro.config.mjs` before deploying
2. Or use the build command: `npm run build:cloudflare` (if you keep both configs)

## Step 3: Create Wrangler Configuration

Create a `wrangler.toml` file in the root directory:

```toml
name = "corpnce-website"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[env.production]
name = "corpnce-website"
routes = [
  { pattern = "corpnce.com", zone_name = "corpnce.com" },
  { pattern = "www.corpnce.com", zone_name = "corpnce.com" }
]
```

## Step 4: Update Environment Variables

### Option A: Using Cloudflare Pages Environment Variables (Recommended)

1. Go to Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables
2. Add the following variables:

```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@corpnce.com
CONTACT_EMAIL=info@corpnce.com
PUBLIC_PLAUSIBLE_URL=https://plausible.corpnce.com
PUBLIC_PLAUSIBLE_DOMAIN=corpnce.com
PUBLIC_POSTHOG_URL=https://posthog.corpnce.com
PUBLIC_POSTHOG_KEY=your-posthog-key
```

### Option B: Using .env File (Not Recommended for Production)

⚠️ **Note**: Never commit `.env` files to git. Use Cloudflare Pages environment variables instead.

## Step 5: Update API Routes for Cloudflare Compatibility

⚠️ **Important**: The contact form API route (`src/pages/api/contact.ts`) uses `nodemailer` which **does not work** in Cloudflare Workers environment.

### Solution Options:

**Option 1: Use Cloudflare Email Workers** (Recommended)
- Replace nodemailer with Cloudflare's Email Workers API
- Update the contact.ts to use Cloudflare's email API

**Option 2: Use Third-Party Email Service**
- Use SendGrid, Mailgun, or Resend API
- These work well with Cloudflare Workers

**Option 3: Use Client-Side Form Service**
- Use Formspree, Netlify Forms, or similar
- Update contact form to submit directly to the service

**Option 4: Disable Contact Form Temporarily**
- Comment out the contact form API route
- Use a simple mailto: link instead

I can help you implement any of these solutions if needed.

## Step 6: Deploy via Cloudflare Dashboard

### Method 1: Connect GitHub Repository (Recommended)

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Sign in or create a free account

2. **Navigate to Pages**
   - Click on "Workers & Pages" in the sidebar
   - Click "Create application"
   - Select "Pages" → "Connect to Git"

3. **Connect Your Repository**
   - Authorize Cloudflare to access your GitHub account
   - Select the repository: `corpnce/corpnce_static_frontend`
   - Click "Begin setup"

4. **Configure Build Settings**
   - **Project name**: `corpnce-website` (or your preferred name)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave as default)

5. **Set Environment Variables**
   - Scroll down to "Environment variables"
   - Add all your environment variables (see Step 4)
   - Make sure to set them for "Production" environment

6. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site
   - You'll get a URL like: `https://corpnce-website.pages.dev`

### Method 2: Deploy via Wrangler CLI

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy dist --project-name=corpnce-website
   ```

## Step 7: Custom Domain Setup

1. **Add Custom Domain**
   - Go to Cloudflare Pages → Your Project → Custom domains
   - Click "Set up a custom domain"
   - Enter your domain: `corpnce.com`
   - Follow the DNS setup instructions

2. **Update DNS Records**
   - In Cloudflare DNS settings, add a CNAME record:
     - **Name**: `@` (or `www`)
     - **Target**: `corpnce-website.pages.dev`
     - **Proxy status**: Proxied (orange cloud)

## Step 8: Automatic Deployments

Once connected to GitHub, Cloudflare Pages will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Important Notes

### API Routes Limitations

1. **Contact Form API**: The `nodemailer` package may not work in Cloudflare Workers. Consider:
   - Using Cloudflare Email Workers
   - Using a third-party email API (SendGrid, Mailgun, etc.)
   - Using Cloudflare Email Routing

2. **Jobs API**: Should work fine as it only uses `fetch` API

### Build Time

- Free plan: 20 minutes per build
- Your build should complete in 2-5 minutes

### Limits (Free Plan)

- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 100,000 requests/day for Functions
- ✅ 10ms CPU time per request (may need optimization for heavy operations)

### Troubleshooting

1. **Build Fails**
   - Check build logs in Cloudflare Dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **API Routes Not Working**
   - Check Cloudflare Functions logs
   - Verify environment variables are set correctly
   - Ensure API routes are in `src/pages/api/` directory

3. **Static Assets Not Loading**
   - Verify `public/` directory files are included
   - Check build output directory is `dist`

## Alternative: Static Site Generation

If you don't need server-side rendering or API routes, you can switch to static site generation:

1. Update `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://corpnce.com',
     output: 'static', // Changed from 'server'
     // Remove adapter
     integrations: [
       mdx(),
       sitemap({
         changefreq: 'weekly',
         priority: 0.7,
         lastmod: new Date(),
       }),
     ],
   });
   ```

2. For contact forms, use a client-side solution:
   - Formspree
   - Netlify Forms
   - Cloudflare Forms (if available)

## Support

For Cloudflare-specific issues:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Cloudflare Community: https://community.cloudflare.com/

For Astro-specific issues:
- Astro Docs: https://docs.astro.build
- Astro Discord: https://astro.build/chat
