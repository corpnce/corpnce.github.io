# Image Requirements for Corpnce Website

This document outlines all the images needed to complete the website design. All images should be placed in the `public/images/` directory.

## Required Images

### 1. Logo Files
**Location:** `public/images/logo.png`

**Requirements:**
- Format: PNG with transparent background
- Dimensions: Minimum 200px width (will be scaled)
- Style: Should match the Corpnce brand (black, white, yellow colors)
- Usage: Header navigation, footer, and various page headers

**Alternative formats:**
- `public/images/logo.svg` (preferred for scalability)
- `public/images/logo-white.png` (for dark backgrounds if needed)

---

### 2. Hero Section Background
**Location:** `public/images/hero-background.jpg` (optional)

**Requirements:**
- Format: JPG or WebP
- Dimensions: 1920x1080px (full HD)
- Style: Modern, tech-focused, subtle pattern or gradient
- Colors: Should complement black/yellow theme
- Usage: Background for hero section (currently using solid black)

**Alternative:** Keep current solid black background with yellow accents

---

### 3. Course Images
**Location:** `public/images/courses/`

**Required files:**
- `data-science.jpg` - Data Science course image
- `machine-learning.jpg` - Machine Learning course image
- `deep-learning.jpg` - Deep Learning course image
- `ai-course.jpg` - AI Course image

**Requirements:**
- Format: JPG or WebP
- Dimensions: 800x600px (4:3 aspect ratio)
- Style: Modern, tech-focused, professional
- Content: Should represent the course topic visually
- Colors: Should work with black/yellow theme

**Placeholder:** Currently showing yellow gradient with icon placeholder

---

### 4. Testimonial Images
**Location:** `public/images/testimonials/`

**Required files:**
- Multiple testimonial images/carousel items
- Format: JPG or PNG
- Dimensions: 400x300px or similar
- Style: Professional photos of students or testimonial cards
- Content: Student photos, quotes, or testimonial graphics

**Note:** This section is currently a placeholder. Add images as available.

---

### 5. Company Logos (Hiring Section)
**Location:** `public/images/companies/`

**Required files:**
- Logos of companies that hire data scientists
- Format: PNG with transparent background (preferred) or SVG
- Dimensions: 200x100px (maintain aspect ratio)
- Style: Company logos in grayscale or color
- Content: Logos of tech companies, consulting firms, etc.

**Examples:**
- `company-1.png`
- `company-2.png`
- `company-3.png`
- etc.

**Note:** This section is currently a placeholder. Add company logos as available.

---

### 6. Open Graph Image
**Location:** `public/images/og-image.jpg`

**Requirements:**
- Format: JPG or PNG
- Dimensions: 1200x630px (Facebook/LinkedIn standard)
- Style: Branded image with Corpnce logo and tagline
- Colors: Black, white, yellow theme
- Usage: Social media sharing previews

---

### 7. Favicon
**Location:** `public/favicon.svg` (already exists, may need update)

**Requirements:**
- Format: SVG (preferred) or PNG
- Dimensions: 32x32px minimum
- Style: Simplified Corpnce logo or icon
- Colors: Should work on both light and dark backgrounds

---

### 8. Gallery Images (Future)
**Location:** `public/images/gallery/`

**Required files:**
- Training session photos
- Event photos
- Facility photos
- Student activities

**Requirements:**
- Format: JPG or WebP
- Dimensions: Various (will be optimized)
- Style: Professional photography
- Content: Real photos from training sessions and events

**Note:** Gallery page is currently a placeholder.

---

### 9. About Us Section Images
**Location:** `public/images/about/`

**Optional files:**
- `team.jpg` - Team photo
- `office.jpg` - Office/facility photo
- `training-room.jpg` - Training room photo

**Requirements:**
- Format: JPG or WebP
- Dimensions: 1200x800px or similar
- Style: Professional, modern

---

### 10. Blog Post Featured Images
**Location:** `public/images/blog/` or inline in blog posts

**Requirements:**
- Format: JPG, PNG, or WebP
- Dimensions: 1200x630px (recommended)
- Style: Relevant to blog post topic
- Usage: Featured images for blog posts

**Note:** Can be added per blog post in frontmatter.

---

## Image Optimization Guidelines

1. **File Formats:**
   - Use WebP for better compression (with JPG fallback)
   - Use PNG for logos and graphics with transparency
   - Use SVG for logos and simple graphics

2. **File Sizes:**
   - Hero images: < 500KB
   - Course images: < 200KB
   - Logo: < 50KB
   - Thumbnails: < 100KB

3. **Responsive Images:**
   - Consider providing multiple sizes for responsive design
   - Use `srcset` attribute for different screen sizes

4. **Alt Text:**
   - All images should have descriptive alt text
   - Already implemented in the code

---

## Priority Order

1. **High Priority (Required for launch):**
   - Logo (`logo.png`)
   - OG Image (`og-image.jpg`)
   - Course images (4 images)

2. **Medium Priority (Important for user experience):**
   - Company logos (hiring section)
   - Testimonial images
   - About section images

3. **Low Priority (Can be added later):**
   - Gallery images
   - Blog post featured images
   - Hero background (optional)

---

## Current Placeholder Status

The website currently uses:
- Yellow gradient placeholders for course images
- Text placeholders for testimonials and company sections
- Fallback text if logo is not found

All placeholders are clearly marked and will be replaced once images are provided.

---

## Image Naming Convention

Use lowercase, hyphen-separated names:
- ✅ `data-science.jpg`
- ✅ `company-logo-1.png`
- ❌ `Data Science.jpg`
- ❌ `company_logo_1.png`

---

## Questions?

If you need help with image specifications or have questions about image placement, refer to the specific page code or contact the development team.
