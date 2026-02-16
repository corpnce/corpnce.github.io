# Corpnce Technologies Website

A modern, SEO-optimized, high-performance website built with Astro, TypeScript, and Tailwind CSS. This website is fully open-source and privacy-friendly.

## 🚀 Features

- **Modern Stack**: Built with Astro, TypeScript, and Tailwind CSS
- **SEO Optimized**: Complete SEO implementation with metadata, sitemap, and structured data
- **Blog System**: MDX-based blog with reading time calculation
- **Analytics**: Privacy-first analytics with self-hosted Plausible and PostHog
- **Contact Forms**: Email integration with Nodemailer
- **Performance**: Optimized for speed with minimal JavaScript
- **Accessibility**: WCAG compliant and mobile-first design
- **Docker Ready**: Complete Docker setup for easy deployment

## 📋 Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
CONTACT_EMAIL=info@corpnce.com
PUBLIC_PLAUSIBLE_URL=https://plausible.corpnce.com
PUBLIC_POSTHOG_URL=https://posthog.corpnce.com
```

## 🏃 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## 📝 Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields:
```yaml
---
title: Your Post Title
description: A brief description
author: Author Name
publishedDate: 2024-01-15
tags:
  - Tag1
  - Tag2
---
```

3. Write your content in Markdown/MDX format
4. The post will automatically appear in the blog listing

## 🏗️ Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose

1. Update environment variables in `docker-compose.yml` or use `.env` file
2. Build and start services:
```bash
docker-compose up -d
```

3. The website will be available at `http://localhost:4321`
4. MailHog (for email testing) will be available at `http://localhost:8025`

### Using Docker

1. Build the image:
```bash
docker build -t corpnce-website .
```

2. Run the container:
```bash
docker run -p 4321:4321 --env-file .env corpnce-website
```

## 📁 Project Structure

```
/
├── public/           # Static assets
│   ├── images/      # Images
│   └── scripts/     # Client-side scripts
├── src/
│   ├── components/  # Reusable components
│   ├── content/     # Content collections (blog posts)
│   ├── layouts/     # Page layouts
│   ├── pages/        # Pages and routes
│   ├── styles/      # Global styles
│   ├── types/       # TypeScript types
│   └── utils/       # Utility functions
├── astro.config.mjs # Astro configuration
├── Dockerfile       # Docker configuration
└── docker-compose.yml # Docker Compose setup
```

## 🔧 Configuration

### Analytics

The website supports two analytics solutions:

1. **Plausible Analytics** (Self-hosted)
   - Set `PUBLIC_PLAUSIBLE_URL` and `PUBLIC_PLAUSIBLE_DOMAIN` in `.env`
   - Privacy-friendly, GDPR compliant

2. **PostHog** (Self-hosted)
   - Set `PUBLIC_POSTHOG_URL` and `PUBLIC_POSTHOG_KEY` in `.env`
   - Event-based analytics

### Email Configuration

Configure SMTP settings in `.env`:
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP port (usually 587 or 465)
- `SMTP_SECURE`: Use TLS (true/false)
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `SMTP_FROM`: From email address
- `CONTACT_EMAIL`: Email address to receive contact form submissions

For development, use MailHog (included in docker-compose.yml).

## 📄 Pages

- `/` - Homepage
- `/about` - About Us
- `/services` - Services overview
- `/services/training` - Corporate Training
- `/services/saas` - SaaS Solutions
- `/services/consultancy` - Consultancy Services
- `/courses` - Courses listing
- `/courses/[slug]` - Individual course pages
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/contact` - Contact form
- `/gallery` - Gallery (coming soon)
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## 🎨 Styling

The website uses Tailwind CSS v4. Custom styles can be added in `src/styles/global.css`.

## 🔍 SEO

- All pages include proper meta tags
- Open Graph and Twitter Card support
- JSON-LD structured data
- Automatic sitemap generation
- robots.txt configuration

## 📊 Analytics Events

The following events are tracked:

- `pageview` - Page views (Plausible)
- `cta_click` - CTA button clicks
- `form_submit` - Form submissions
- `scroll_depth` - Scroll depth (25%, 50%, 75%, 100%)
- `blog_complete` - Blog post completion

## 🚢 Deployment

### Self-Hosted Server

1. Build the project: `npm run build`
2. Copy `dist/` to your server
3. Install Node.js dependencies
4. Run with a process manager like PM2:
```bash
pm2 start dist/server/entry.mjs
```

### Platform Deployment

The website can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any Node.js hosting platform

## 📚 Documentation

For more information:
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Plausible Analytics](https://plausible.io/docs)
- [PostHog Documentation](https://posthog.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open-source. All tools and libraries used are open-source with permissive licenses.

## 📞 Support

For questions or support, contact:
- Email: info@corpnce.com
- Phone: +91 9739604796

---

Built with ❤️ by Corpnce Technologies
# corpnce_static_frontend
