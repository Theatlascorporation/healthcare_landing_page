# MediCore Health — Premium Healthcare Landing Page

A production-quality, fully handcrafted healthcare landing page template built with pure HTML5, CSS3, and Vanilla JavaScript. Zero dependencies, zero frameworks.

---

## Folder Structure

```
Healthcare Landing Page/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── icons/
    │   └── favicon.svg
    └── images/
        └── .gitkeep
```

---

## Features

- Responsive & Mobile-First
- Sticky Transparent Header with Scroll Effect
- Hamburger Menu (mobile)
- Loading Screen Animation
- Hero Section with Floating Cards
- Services Grid (6 cards)
- Benefits Section with Floating Badges
- Animated Statistics Counter
- Testimonials (3-card layout, featured card)
- Pricing Section (3 tiers, popular badge)
- FAQ Accordion (smooth open/close)
- Contact Form with Full Validation
- Scroll Animations (Intersection Observer)
- Button Ripple Effect
- Scroll-to-Top Button
- Active Navigation Link Tracking
- Footer with Social Links
- SVG Favicon
- SEO Meta Tags + Open Graph + Twitter Cards
- JSON-LD Structured Data (Schema.org MedicalOrganization)
- WCAG Accessibility (ARIA labels, keyboard navigation, focus states)
- `prefers-reduced-motion` support
- Lazy Image Loading fallback

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Markup     | HTML5 (Semantic)            |
| Styling    | CSS3 (Custom Properties, BEM) |
| Scripting  | Vanilla JavaScript (ES5+)   |
| Font       | Inter (Google Fonts)        |
| Icons      | Inline SVG                  |

No Bootstrap. No Tailwind. No jQuery. No React. No UI Libraries.

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 80+     |
| Firefox | 75+     |
| Safari  | 13+     |
| Edge    | 80+     |
| Mobile Safari | iOS 13+ |
| Chrome Android | 80+ |

---

## Getting Started

No build step required. Open `index.html` directly in any modern browser.

```bash
# Option 1 — Open directly
open index.html

# Option 2 — Use a local server (recommended for font loading)
npx serve .
# or
python -m http.server 8000
```

---

## Deployment

### Netlify (Recommended — Drag & Drop)

1. Go to [netlify.com](https://netlify.com) and sign up or log in.
2. Click **"Add new site"** → **"Deploy manually"**.
3. Drag and drop the entire `Healthcare Landing Page` folder onto the deploy area.
4. Your site will be live instantly with a Netlify URL.
5. Optionally connect a custom domain in Site Settings → Domain Management.

### Netlify (via Git)

1. Push this project to a GitHub repository.
2. In Netlify → **"Add new site"** → **"Import an existing project"**.
3. Connect your GitHub account, select the repository.
4. Build command: *(leave empty — no build required)*
5. Publish directory: `.` (root)
6. Click **Deploy site**.

### GitHub Pages

1. Push to a GitHub repository.
2. Go to **Settings** → **Pages**.
3. Set Source to `main` branch, folder `/` (root).
4. Click **Save** — your site will be available at `https://yourusername.github.io/repo-name`.

### Traditional Hosting (FTP)

Upload all files maintaining the exact folder structure via any FTP client (FileZilla, Cyberduck, etc.) to your server's `public_html` or `www` root.

---

## Customisation Guide

### Brand Name & Content
Replace all instances of `MediCore Health` in `index.html` with your client's brand name.

### Colours
All colours are CSS Custom Properties in `style.css` inside `:root`. Change `--clr-primary` to match the brand:

```css
:root {
  --clr-primary: #0A6EBD;      /* Main brand colour */
  --clr-secondary: #00C2A8;    /* Accent / highlight */
}
```

### Fonts
The `@import` at the top of `style.css` loads **Inter** from Google Fonts. Replace with any other Google Font by swapping the import URL and updating `--font-family`.

### Real Images
Replace the inline SVG placeholder illustrations in `index.html` with `<img>` tags pointing to images in `assets/images/`. Add `loading="lazy"` to all non-critical images.

### Pricing & Content
All pricing, service descriptions, FAQ answers, and testimonials are in plain HTML in `index.html` — edit directly, no configuration files needed.

### SEO Meta Tags
Update the `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags, canonical URL, and the JSON-LD structured data block in `<head>` for each deployment.

---

## Performance Notes

- All SVG icons are inline (zero HTTP requests for icons)
- Google Fonts loaded with `preconnect` + `display=swap`
- CSS uses `will-change` sparingly — only via transition properties
- Animations use `transform` and `opacity` only (GPU-composited, no layout reflow)
- Intersection Observer used for all scroll animations (no scroll event polling)
- `requestAnimationFrame` used for counter animations (no `setInterval`)

---

## Security

- All form input values are sanitised via `document.createTextNode()` before any processing — prevents XSS and HTML injection
- No `innerHTML` is ever assigned user-controlled data
- No `eval()` or `Function()` constructor usage
- JavaScript runs in strict mode (`'use strict'`)
- External links use `rel="noopener noreferrer"`

---

## License

This template is provided for portfolio and client project use. All company names, addresses, phone numbers, and personal names used are entirely fictional.
