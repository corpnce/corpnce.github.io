/** Set in env or leave empty to show "Configure Formspree" message. */
export const FORMSPREE_FORM_ID = import.meta.env.PUBLIC_FORMSPREE_FORM_ID || '';

export const SITE_CONFIG = {
  name: 'Corpnce Technologies',
  title: 'Corpnce Technologies Pvt. Ltd.',
  description: 'Exclusive PBL & 1st TQ Based Training Company. Project-based Classroom Learning by Industry Experts & Researchers as Instructors along with Evaluating Your Technology Quotient (TQ).',
  url: 'https://corpnce.github.io',
  ogImage: '/images/og-image.jpg',
  contact: {
    email: 'info@corpnce.com',
    phone: {
      india: '+91 9739604796',
      usa: '+1 203 658 5946',
    },
    address: {
      main: {
        label: 'Main Branch',
        street: '#191, 1st Floor, West of Chord Road 2nd Stage',
        city: 'Rajajinagar, Bengaluru',
        state: 'Karnataka',
        zip: '560086',
        country: 'India',
      },
    },
  },
  social: {
    linkedin: 'https://linkedin.com/company/corpnce',
    twitter: 'https://twitter.com/corpnce',
    facebook: 'https://facebook.com/corpnce',
  },
} as const;

export const COURSES = [
  {
    name: 'Data Science and AI',
    description: 'Advanced Data Science and AI course covering Python, Math foundations, ML upto AI agents, and production deployment strategies.',
    slug: 'data-science',
    href: '/data-science-courses-bangalore',
    image: '/images/data_science.png',
  },
  {
    name: 'ML and DL',
    description: 'Advanced Machine Learning course with hands-on projects and real-world applications.',
    slug: 'machine-learning',
    href: '/courses/machine-learning',
    image: '/images/ml_and_dl.png',
  },
  {
    name: 'Data Analytics',
    description: 'Deep Learning specialization covering neural networks, CNNs, RNNs, and modern architectures.',
    slug: 'deep-learning',
    href: '/data-analytics-course-in-bangalore',
    image: '/images/data_analytics.png',
  },
  {
    name: 'GenAI',
    description: 'Complete AI course covering artificial intelligence fundamentals, NLP, computer vision, and more.',
    slug: 'ai-course',
    href: '/courses/ai-course',
    image: '/images/genai.png',
  },
] as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  {
    name: 'Courses',
    href: '/courses',
    children: [
      { name: 'Data Science and AI', href: '/data-science-courses-bangalore' },
      { name: 'ML and DL', href: '/courses/machine-learning' },
      { name: 'Data Analytics', href: '/data-analytics-course-in-bangalore' },
      { name: 'GenAI', href: '/courses/ai-course' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'Training', href: '/services/training' },
      { name: 'SaaS', href: '/services/saas' },
      { name: 'Consultancy', href: '/services/consultancy' },
    ],
  },
  {
    name: 'Company',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Gallery', href: '/gallery' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
] as const;
