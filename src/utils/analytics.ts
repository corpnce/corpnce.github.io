/**
 * Analytics utilities for Plausible and PostHog
 * Privacy-first, GDPR-friendly implementation
 */

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

/**
 * Track page view with Plausible Analytics
 * Self-hosted Plausible instance
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || 'corpnce.com';
  const plausibleUrl = import.meta.env.PUBLIC_PLAUSIBLE_URL || `https://plausible.${plausibleDomain}`;

  // Plausible script should be loaded in the layout
  if (window.plausible) {
    window.plausible('pageview', { u: url });
  } else {
    // Fallback: send manual event
    fetch(`${plausibleUrl}/api/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'pageview',
        url,
        domain: plausibleDomain,
      }),
    }).catch(() => {
      // Silently fail if analytics is blocked
    });
  }
}

/**
 * Track custom event with PostHog
 * Self-hosted PostHog instance
 */
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  const posthogUrl = import.meta.env.PUBLIC_POSTHOG_URL;
  const posthogKey = import.meta.env.PUBLIC_POSTHOG_KEY;

  if (!posthogUrl || !posthogKey) return;

  // PostHog should be initialized in the layout
  if (window.posthog) {
    window.posthog.capture(event.name, event.props);
  } else {
    // Fallback: send manual event
    fetch(`${posthogUrl}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: posthogKey,
        event: event.name,
        properties: {
          ...event.props,
          $lib: 'astro',
        },
      }),
    }).catch(() => {
      // Silently fail if analytics is blocked
    });
  }
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent({
    name: 'cta_click',
    props: {
      cta_name: ctaName,
      location,
    },
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, formType: string) {
  trackEvent({
    name: 'form_submit',
    props: {
      form_name: formName,
      form_type: formType,
    },
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent({
    name: 'scroll_depth',
    props: {
      depth: `${depth}%`,
    },
  });
}

/**
 * Track blog completion
 */
export function trackBlogComplete(postSlug: string, readingTime: number) {
  trackEvent({
    name: 'blog_complete',
    props: {
      post_slug: postSlug,
      reading_time: readingTime,
    },
  });
}

// TypeScript declarations for window objects
declare global {
  interface Window {
    plausible?: (event: string, options?: { u?: string; props?: Record<string, any> }) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
    };
  }
}
