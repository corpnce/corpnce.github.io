# Deployment Guide

This guide covers various deployment options for the Corpnce Technologies website.

## Prerequisites

- Node.js 20+ installed
- Docker and Docker Compose (for containerized deployment)
- SMTP server credentials (for contact form)
- Analytics setup (optional)

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (587 for TLS, 465 for SSL)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - From email address
- `CONTACT_EMAIL` - Email to receive contact form submissions

Optional variables:
- `PUBLIC_PLAUSIBLE_URL` - Self-hosted Plausible Analytics URL
- `PUBLIC_PLAUSIBLE_DOMAIN` - Domain for Plausible
- `PUBLIC_POSTHOG_URL` - Self-hosted PostHog URL
- `PUBLIC_POSTHOG_KEY` - PostHog API key

## Docker Deployment (Recommended)

### Using Docker Compose

1. Update environment variables in `docker-compose.yml` or `.env` file
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
docker run -d \
  -p 4321:4321 \
  --env-file .env \
  --name corpnce-website \
  corpnce-website
```

## Self-Hosted Server Deployment

### Using PM2

1. Build the project:
```bash
npm run build
```

2. Install PM2 globally:
```bash
npm install -g pm2
```

3. Start the application:
```bash
pm2 start dist/server/entry.mjs --name corpnce-website
```

4. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Using systemd

1. Create a systemd service file `/etc/systemd/system/corpnce-website.service`:

```ini
[Unit]
Description=Corpnce Technologies Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/corpnce-website
ExecStart=/usr/bin/node dist/server/entry.mjs
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/var/www/corpnce-website/.env

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service:
```bash
sudo systemctl enable corpnce-website
sudo systemctl start corpnce-website
```

## Platform Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

3. Add environment variables in Netlify dashboard

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Cloudflare dashboard

## Nginx Reverse Proxy

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name corpnce.com www.corpnce.com;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

For HTTPS, use Let's Encrypt with Certbot:

```bash
sudo certbot --nginx -d corpnce.com -d www.corpnce.com
```

## Setting Up Analytics

### Plausible Analytics (Self-hosted)

1. Deploy Plausible Analytics following their [self-hosting guide](https://plausible.io/docs/self-hosting)
2. Update `PUBLIC_PLAUSIBLE_URL` and `PUBLIC_PLAUSIBLE_DOMAIN` in `.env`
3. The analytics script will automatically load

### PostHog (Self-hosted)

1. Deploy PostHog following their [self-hosting guide](https://posthog.com/docs/self-host)
2. Update `PUBLIC_POSTHOG_URL` and `PUBLIC_POSTHOG_KEY` in `.env`
3. The analytics script will automatically load

## Email Configuration

### Using SMTP

Configure your SMTP settings in `.env`:
- Gmail: Use App Password
- SendGrid: Use API key
- AWS SES: Use IAM credentials
- Mailgun: Use API credentials

### Using MailHog (Development)

MailHog is included in `docker-compose.yml` for development. Access the web UI at `http://localhost:8025`.

## Monitoring

### Health Check Endpoint

The application includes a health check at `/api/health` (if implemented).

### Logging

Logs are output to stdout/stderr. Use your process manager (PM2, systemd) to handle log rotation.

## Backup

Regular backups should include:
- Source code (Git repository)
- Environment variables (stored securely)
- Database (if using external database for analytics)

## Security

1. Keep dependencies updated:
```bash
npm audit
npm update
```

2. Use HTTPS in production
3. Keep environment variables secure
4. Regularly update Node.js and system packages
5. Use a firewall to restrict access

## Troubleshooting

### Application won't start

1. Check Node.js version: `node --version` (should be 20+)
2. Check environment variables are set correctly
3. Check port 4321 is not in use
4. Review application logs

### Contact form not working

1. Verify SMTP credentials are correct
2. Check SMTP server is accessible
3. Test SMTP connection manually
4. Check application logs for errors

### Analytics not tracking

1. Verify analytics URLs are correct
2. Check browser console for errors
3. Verify domain configuration in analytics tools
4. Check ad blockers aren't blocking scripts

## Support

For deployment issues, contact:
- Email: info@corpnce.com
- Check logs: `pm2 logs` or `journalctl -u corpnce-website`
