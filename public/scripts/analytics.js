// Analytics utilities for client-side
function trackPageView(url) {
  if (typeof window === 'undefined') return;
  const plausibleDomain = import.meta.env?.PUBLIC_PLAUSIBLE_DOMAIN || 'corpnce.com';
  if (window.plausible) {
    window.plausible('pageview', { u: url });
  }
}

function trackEvent(event) {
  if (typeof window === 'undefined') return;
  if (window.posthog) {
    window.posthog.capture(event.name, event.props);
  }
}

function trackCTAClick(ctaName, location) {
  trackEvent({
    name: 'cta_click',
    props: {
      cta_name: ctaName,
      location: location,
    },
  });
}

function trackFormSubmit(formName, formType) {
  trackEvent({
    name: 'form_submit',
    props: {
      form_name: formName,
      form_type: formType,
    },
  });
}

function trackScrollDepth(depth) {
  trackEvent({
    name: 'scroll_depth',
    props: {
      depth: `${depth}%`,
    },
  });
}

function trackBlogComplete(postSlug, readingTime) {
  trackEvent({
    name: 'blog_complete',
    props: {
      post_slug: postSlug,
      reading_time: readingTime,
    },
  });
}

// Make functions available globally
window.trackCTAClick = trackCTAClick;
window.trackFormSubmit = trackFormSubmit;
window.trackEvent = trackEvent;
window.trackBlogComplete = trackBlogComplete;

// Track page view on load
if (typeof window !== 'undefined') {
  trackPageView(window.location.pathname);

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent;
      trackScrollDepth(scrollPercent);
    }
  });
}
