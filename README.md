# Sentry — Business Consultancy & Startup Acceleration

> A fully responsive corporate landing page built with semantic HTML5, CSS3 (3D transforms, CSS Grid, custom properties), and vanilla JavaScript. Zero dependencies. No frameworks.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)

---

## Overview

**Sentry** is a high-conversion landing page for a business consultancy and startup acceleration agency. The design follows a clean, futuristic corporate aesthetic using deep blue tones, electric blue accents, and metallic whites. Every section is built to guide visitors toward a single goal: scheduling a strategy consultation.

The page is built entirely with native web technologies — no build tools, no bundlers, no external libraries.

---

## Features

**Design**
- Full-width hero with Ken Burns entrance animation and dark gradient overlay
- 3D testimonial carousel with `perspective`, `rotateY`, `translateZ` transforms
- Glassmorphism navbar that transitions from transparent to frosted on scroll
- Electric-blue glow on active carousel card
- Smooth scroll-reveal animations triggered by `IntersectionObserver`
- Staggered entry animations for grid sections

**Functionality**
- 3D carousel: arrows, dot navigation, keyboard arrows, touch/swipe, auto-play (pauses on hover)
- Contact form with live validation, error states, and simulated submission flow
- Mobile hamburger navigation drawer
- Fully accessible buttons with `aria-label` attributes

**Responsive**
- Mobile-first layout
- Breakpoints at `480px`, `768px`, and `1024px`
- Adaptive typography with `clamp()`
- Touch-friendly controls throughout

---

## Project Structure

```
sentry/
│
├── index.html              # Main HTML — all 8 page sections
│
├── assets/
│   ├── css/
│   │   └── style.css       # All styles (variables, layout, components, responsive)
│   └── js/
│       └── main.js         # All JavaScript (navbar, carousel, form validation)
│
├── image/
│   ├── heroe.jpg           # Hero background — Cardiff Bay waterfront
│   └── logo.png            # Sentry shield logo (metallic silver on deep blue)
│
├── CLAUDE.md               # Developer context & working instructions
└── README.md               # This file
```

---

## Sections

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | Navbar | — | Fixed, transparent → glass on scroll. Hamburger on mobile. |
| 2 | Hero | `#top` | Full-viewport hero with `heroe.jpg`, animated headline, 2 CTAs, and 3 live stats. |
| 3 | About | `#about` | Two-column layout — mission copy + 3 value pillar cards (Clarity, Structure, Acceleration). |
| 4 | Services | `#services` | 6 service cards on dark background with icon glow on hover. |
| 5 | Why Choose | `#why` | 5-column responsive grid with circular icon badges. |
| 6 | Case Studies | `#cases` | 3 cards with color-bar accent and KPI grid (MRR, timeline, margin lift). |
| 7 | Testimonials | `#testimonials` | **3D carousel** — 5 cards, infinite loop, auto-play, swipe. |
| 8 | Final CTA | `#cta` | Deep blue gradient banner with consultation CTA button. |
| 9 | Contact Form | `#contact` | Lead capture form — personal info, company data, service/budget selectors. |
| 10 | Footer | — | 4-column grid — brand, services, company links, contact details. |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements: `<nav>`, `<section>`, `<footer>`, `<blockquote>`) |
| Styling | CSS3 — Custom Properties, Flexbox, Grid, `clamp()`, `transform-style: preserve-3d` |
| Scripting | Vanilla JavaScript ES6+ — IIFE, `IntersectionObserver`, `addEventListener` |
| Fonts | Google Fonts — **Inter** (body) + **Poppins** (headings) |
| Icons | Inline SVG — no icon font or sprite dependencies |
| Images | Local JPG/PNG in `image/` |

---

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary background (dark) | Deep Blue | `#0A1A3F` |
| Accent / interactive | Electric Blue | `#1F6FFF` |
| Accent hover | Electric Blue Dark | `#1558CC` |
| Light background / text | Metallic White | `#F2F5FA` |
| Borders / dividers | Silver Light | `#E6EBF5` |
| Subtle backgrounds | Silver Dark | `#C9D1E3` |
| Body text | Text Gray | `#6B7A99` |

All palette values are exposed as CSS custom properties in `:root` inside `assets/css/style.css` — change them once, they propagate everywhere.

---

## Typography

| Usage | Family | Weight |
|-------|--------|--------|
| Headings, nav brand, card names | Poppins | 600 / 700 / 800 / 900 |
| Body, labels, buttons, paragraphs | Inter | 300 / 400 / 500 / 600 / 700 / 800 |

Font sizes use `clamp()` for fluid scaling between viewport sizes:

```css
/* Example — hero headline */
font-size: clamp(2.1rem, 5vw, 4.1rem);

/* Example — section title */
font-size: clamp(1.75rem, 3.5vw, 2.75rem);
```

---

## Getting Started

No build step required. Open the file directly in a browser.

**Option 1 — Double-click**
```
Open index.html in any modern browser.
```

**Option 2 — Local server (recommended to avoid CORS on images)**
```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
Install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then visit `http://localhost:8080`.

---

## Customization Guide

### Replace brand copy

All text content lives directly in `index.html`. Search for the section comment you want to update:

```html
<!-- ═══════════════════════ HERO ═══════════════════════ -->
<!-- ═══════════════════════ ABOUT ═══════════════════════ -->
<!-- ═══════════════════════ SERVICES ═══════════════════════ -->
<!-- etc. -->
```

### Change the color palette

Open `assets/css/style.css` and edit the variables in `:root`:

```css
:root {
  --deep-blue:        #0A1A3F;  /* Main dark backgrounds */
  --electric-blue:    #1F6FFF;  /* Accent, buttons, borders */
  --metallic-white:   #F2F5FA;  /* Light backgrounds, text on dark */
}
```

### Update testimonials

Testimonial data is defined at the top of the carousel IIFE in `assets/js/main.js`:

```javascript
const TESTIMONIALS = [
  {
    initials: 'AM',
    name:     'Alexandra M.',
    role:     'CEO, Finova Technologies',
    text:     'Your testimonial text here.',
    stars:    5
  },
  // Add or remove entries freely — the carousel adapts automatically
];
```

### Connect the contact form

The form currently simulates a 1.2s submission delay. Replace the `setTimeout` in `submitForm()` inside `assets/js/main.js` with a real `fetch` call:

```javascript
function submitForm() {
  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.querySelector('.btn-submit-text').textContent = 'Sending…';

  // Replace this block with your real API call:
  fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  .then(res => {
    if (!res.ok) throw new Error('Server error');
    form.style.display = 'none';
    formSuccess.classList.add('visible');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  })
  .catch(() => {
    btn.disabled = false;
    btn.querySelector('.btn-submit-text').textContent = 'Send My Request';
    // Show a global error message here
  });
}
```

### Replace the hero image

Swap `image/heroe.jpg` with any full-width image. The hero overlay gradient is applied via CSS, so any photo with a clear sky or architectural subject works well:

```css
/* assets/css/style.css */
.hero-bg {
  background: url('../../image/heroe.jpg') center bottom / cover no-repeat;
}
```

---

## Contact Form Fields

The form captures the following client data:

**Personal**
- Full Name (required)
- Email Address (required, format validated)
- Phone Number
- Job Title / Role

**Company**
- Company Name (required)
- Business Type (required) — Startup · Small Business · Medium · Enterprise · Freelancer · Non-Profit
- Industry / Sector — 10 options
- Company Stage — Idea through Scaling

**Service & Budget**
- Service of Interest — maps to Sentry's 6 core offerings
- Monthly Budget Range — Under $2,500 through $30,000+
- How did you hear about us

**Message**
- Open textarea for goals and challenges

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full (`-webkit-user-select` prefixed) |
| Edge 90+ | Full |
| Mobile Chrome / Safari | Full (touch/swipe enabled) |

> Requires a browser with support for `CSS Grid`, `IntersectionObserver`, `transform-style: preserve-3d`, and `CSS Custom Properties`. All evergreen browsers qualify.

---

## License

This project is proprietary. All design, copy, and code belong to **Sentry Business Consultancy**. Unauthorized reproduction or distribution is not permitted.

---

*Built with HTML5 · CSS3 · Vanilla JavaScript — no frameworks, no build tools, no dependencies.*
