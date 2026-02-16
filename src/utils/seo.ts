import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  canonical?: string;
}

export function getSEOMetadata(props: SEOProps = {}) {
  const {
    title = 'Corpnce Technologies - Data Science, AI & Machine Learning Training',
    description = 'Exclusive PBL & 1st TQ Based Training Company. Project-based Classroom Learning by Industry Experts & Researchers.',
    image = '/images/og-image.jpg',
    type = 'website',
    canonical,
  } = props;

  const siteUrl = 'https://corpnce.com';
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || '';

  return {
    title,
    description,
    canonical: canonicalUrl,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Corpnce Technologies',
      images: [{ url: fullImage, width: 1200, height: 630, alt: title }],
      type,
      ...(props.publishedTime && { publishedTime: props.publishedTime }),
      ...(props.modifiedTime && { modifiedTime: props.modifiedTime }),
      ...(props.author && { authors: [props.author] }),
      ...(props.tags && { tags: props.tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: fullImage,
    },
  };
}

export function getStructuredData(type: 'Organization' | 'Article', data?: Record<string, any>) {
  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Corpnce Technologies Pvt. Ltd.',
      url: 'https://corpnce.com',
      logo: 'https://corpnce.com/images/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9739604796',
        contactType: 'Customer Service',
        email: 'info@corpnce.com',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '#191, 1st Floor, West of Chord Road 2nd Stage',
        addressLocality: 'Rajajinagar',
        addressRegion: 'Karnataka',
        postalCode: '560086',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.linkedin.com/company/corpnce',
        'https://twitter.com/corpnce',
        'https://www.facebook.com/corpnce',
      ],
      ...data,
    };
  }

  if (type === 'Article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data?.title,
      description: data?.description,
      image: data?.image,
      datePublished: data?.publishedTime,
      dateModified: data?.modifiedTime || data?.publishedTime,
      author: {
        '@type': 'Person',
        name: data?.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Corpnce Technologies',
        logo: {
          '@type': 'ImageObject',
          url: 'https://corpnce.com/images/logo.png',
        },
      },
      ...data,
    };
  }

  return null;
}
