import JSZip from 'jszip';
import { BlockData, PageTheme } from '../types';

export function generateHtml(blocks: BlockData[], theme: PageTheme): string {
  const renderedBlocksHtml = blocks
    .map((block) => renderBlockToHtml(block, theme))
    .join('\n\n');

  const blockResponsiveCss = blocks
    .map(
      (b) => `
    .f-block-${b.id} {
      padding-top: ${b.styles.desktop.paddingY}rem;
      padding-bottom: ${b.styles.desktop.paddingY}rem;
      padding-left: ${b.styles.desktop.paddingX}rem;
      padding-right: ${b.styles.desktop.paddingX}rem;
      text-align: ${b.styles.desktop.textAlign};
    }
    @media (max-width: 640px) {
      .f-block-${b.id} {
        padding-top: ${b.styles.mobile.paddingY}rem !important;
        padding-bottom: ${b.styles.mobile.paddingY}rem !important;
        padding-left: ${b.styles.mobile.paddingX}rem !important;
        padding-right: ${b.styles.mobile.paddingX}rem !important;
        text-align: ${b.styles.mobile.textAlign} !important;
      }
    }`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-f-theme="${theme.mode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(theme.pageTitle || 'Forma Page')}</title>
  <meta name="description" content="${escapeHtml(theme.pageDescription || 'Created with Forma Visual Page Builder')}">
  
  <!-- Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="styles.css">
  <style>
    :root {
      --f-accent: ${theme.accentColor};
      --f-radius: ${theme.radius};
      --f-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    ${blockResponsiveCss}
  </style>
</head>
<body class="page-body">
${renderedBlocksHtml}

  <script src="script.js"></script>
</body>
</html>`;
}

export function generateCss(theme: PageTheme): string {
  return `/* Forma UI Design System Tokens & Base Stylesheet */
:root {
  --f-accent: ${theme.accentColor};
  --f-accent-hover: ${adjustColor(theme.accentColor, -15)};
  --f-accent-soft: ${theme.accentColor}18;
  --f-on-accent: #ffffff;
  --f-bg: ${theme.mode === 'dark' ? '#0f172a' : '#ffffff'};
  --f-surface: ${theme.mode === 'dark' ? '#1e293b' : '#f8fafc'};
  --f-fg: ${theme.mode === 'dark' ? '#f1f5f9' : '#0f172a'};
  --f-muted: ${theme.mode === 'dark' ? '#94a3b8' : '#64748b'};
  --f-border: ${theme.mode === 'dark' ? '#334155' : '#e2e8f0'};
  --f-radius: ${theme.radius};
  --f-font: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--f-font);
  background-color: var(--f-bg);
  color: var(--f-fg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Forma UI Button Styles */
.f-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: var(--f-radius);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  border: 1px solid transparent;
  white-space: nowrap;
}

.f-button-primary {
  background-color: var(--f-accent);
  color: var(--f-on-accent);
}
.f-button-primary:hover {
  filter: brightness(0.92);
  transform: translateY(-1px);
}

.f-button-secondary {
  background-color: var(--f-surface);
  color: var(--f-fg);
  border-color: var(--f-border);
}
.f-button-secondary:hover {
  background-color: var(--f-border);
}

.f-button-outline {
  background-color: transparent;
  color: var(--f-accent);
  border-color: var(--f-accent);
}
.f-button-outline:hover {
  background-color: var(--f-accent-soft);
}

.f-button-ghost {
  background-color: transparent;
  color: var(--f-fg);
}
.f-button-ghost:hover {
  background-color: var(--f-surface);
}

.f-button-sm {
  padding: 0.35rem 0.75rem;
  font-size: 0.875rem;
}
.f-button-md {
  padding: 0.55rem 1.25rem;
  font-size: 0.95rem;
}
.f-button-lg {
  padding: 0.75rem 1.75rem;
  font-size: 1.05rem;
}

/* Forma Badge */
.f-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: var(--f-accent-soft);
  color: var(--f-accent);
  border: 1px solid var(--f-accent)30;
}

/* Forma Card */
.f-card {
  background-color: var(--f-surface);
  border: 1px solid var(--f-border);
  border-radius: var(--f-radius);
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Grid helper */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}

/* Accordion */
.f-accordion-item {
  border-bottom: 1px solid var(--f-border);
}
.f-accordion-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  text-align: left;
}
.f-accordion-content {
  display: none;
  padding-bottom: 1.25rem;
  color: var(--f-muted);
}
.f-accordion-item.active .f-accordion-content {
  display: block;
}
.f-accordion-item.active .accordion-icon {
  transform: rotate(180deg);
}

/* Responsive Mobile Layout Overrides */
@media (max-width: 640px) {
  .mobile-text-center { text-align: center !important; }
  .mobile-text-left { text-align: left !important; }
  .mobile-flex-col { flex-direction: column !important; }
  .mobile-w-full { width: 100% !important; }
}
`;
}

export function generateScript(): string {
  return `// Client-side interactions for Forma Webflow-style page
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Accordion Expand/Collapse
  const accordionTriggers = document.querySelectorAll('.f-accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.f-accordion-item');
      if (item) {
        item.classList.toggle('active');
      }
    });
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
`;
}

export function generateReadme(theme: PageTheme): string {
  return `# ${theme.pageTitle || 'Forma Website'}

Built visually with **Forma Visual Page Builder** using the [@aryan_sehgal/forma-ui](https://www.npmjs.com/package/@aryan_sehgal/forma-ui) component design system.

## 🚀 Free 1-Click Deployment to Vercel

You can deploy this website to Vercel for free in less than 30 seconds:

### Option 1: Vercel CLI (Fastest)
1. In your terminal, run:
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`
2. Accept the defaults. Your site is live!

### Option 2: Upload via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Upload this unzipped folder into the deploy dropzone.
3. Click **Deploy**.

### Option 3: GitHub + Vercel
1. Create a new GitHub repository and push these files:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit from Forma Page Builder"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   \`\`\`
2. Import the repo in Vercel to get automatic production deployments and preview URLs on every commit.

---

## 🎨 Design Tokens & Customization
- The styles are powered by Forma UI's semantic CSS custom properties:
  - \`--f-accent\`: ${theme.accentColor}
  - \`--f-radius\`: ${theme.radius}
  - \`--f-font\`: ${theme.fontFamily || 'Plus Jakarta Sans'}
- All component tokens can be edited in \`styles.css\`.

---
*Created with [Forma Visual Page Builder](https://forma-design-system-docs.vercel.app/) • Built by [Aryan Sehgal](https://github.com/AryanSehgal) • Powered by [@aryan_sehgal/forma-ui](https://forma-design-system-docs.vercel.app/)*
`;
}

export function generateReactCode(blocks: BlockData[], theme: PageTheme): string {
  return `// App.tsx
// Created with Forma Page Builder using @aryan_sehgal/forma-ui
import React from 'react';
import '@aryan_sehgal/forma-ui/styles.css';
import { Button } from '@aryan_sehgal/forma-ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@aryan_sehgal/forma-ui/card';
import { Badge } from '@aryan_sehgal/forma-ui/badge';
import { Avatar } from '@aryan_sehgal/forma-ui/avatar';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@aryan_sehgal/forma-ui/accordion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--f-bg)] text-[var(--f-fg)]" data-f-theme="${theme.mode}">
      ${blocks.map(b => renderBlockToReact(b)).join('\n\n      ')}
    </div>
  );
}
`;
}

function renderBlockToReact(block: BlockData): string {
  switch (block.type) {
    case 'heading':
      return `/* Hero Section */
      <section className="py-${Math.round(block.styles.desktop.paddingY * 4)} px-4 text-${block.styles.desktop.textAlign}">
        <div className="max-w-4xl mx-auto space-y-6">
          ${block.content.showBadge ? `<Badge variant="outline">${block.content.badge}</Badge>` : ''}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            ${escapeHtml(block.content.title)}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            ${escapeHtml(block.content.subtitle)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button variant="${block.content.primaryCtaVariant || 'primary'}" size="lg">
              ${escapeHtml(block.content.primaryCtaText)}
            </Button>
            ${block.content.showSecondaryCta ? `<Button variant="${block.content.secondaryCtaVariant || 'outline'}" size="lg">
              ${escapeHtml(block.content.secondaryCtaText)}
            </Button>` : ''}
          </div>
        </div>
      </section>`;

    case 'button':
      return `/* Action Button */
      <div className="py-${Math.round(block.styles.desktop.paddingY * 4)} text-${block.styles.desktop.textAlign}">
        <Button variant="${block.content.variant}" size="${block.content.size}">
          ${escapeHtml(block.content.buttonText)}
        </Button>
        ${block.content.helperText ? `<p className="text-xs text-gray-500 mt-2">${escapeHtml(block.content.helperText)}</p>` : ''}
      </div>`;

    case 'testimonial':
      return `/* Testimonial Section */
      <section className="py-${Math.round(block.styles.desktop.paddingY * 4)} px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center p-8 bg-gray-50 border border-gray-200">
            <CardContent className="space-y-4">
              <p className="text-xl font-medium italic text-gray-800">
                "${escapeHtml(block.content.quote)}"
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Avatar src="${block.content.avatarUrl}" alt="${escapeHtml(block.content.authorName)}" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">${escapeHtml(block.content.authorName)}</div>
                  <div className="text-xs text-gray-500">${escapeHtml(block.content.authorRole)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>`;

    default:
      return `/* ${block.name} */
      <div className="py-${Math.round(block.styles.desktop.paddingY * 4)} px-4">
        {/* ${block.name} content */}
      </div>`;
  }
}

function renderBlockToHtml(block: BlockData, theme: PageTheme): string {
  const dPadY = `${block.styles.desktop.paddingY}rem`;
  const mPadY = `${block.styles.mobile.paddingY}rem`;
  const dPadX = `${block.styles.desktop.paddingX}rem`;
  const mPadX = `${block.styles.mobile.paddingX}rem`;
  const bgColor = block.styles.backgroundColor || 'transparent';
  const textColor = block.styles.textColor || 'inherit';
  const maxW = getMaxWidthValue(block.styles.maxWidth);
  const borderStyle = block.styles.hasBorder ? `border: 1px solid ${block.styles.borderColor || 'var(--f-border)'};` : '';
  const radiusStyle = block.styles.borderRadius ? `border-radius: ${block.styles.borderRadius};` : '';

  const inlineWrapperStyle = `padding-top: ${dPadY}; padding-bottom: ${dPadY}; padding-left: ${dPadX}; padding-right: ${dPadX}; background-color: ${bgColor}; color: ${textColor}; ${borderStyle} ${radiusStyle}`;

  switch (block.type) {
    case 'navbar':
      return `  <!-- Navbar -->
  <header class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
      <a href="#" style="font-size: 1.25rem; font-weight: 800; color: inherit; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 9999px; background-color: var(--f-accent);"></span>
        ${escapeHtml(block.content.brandName)}
      </a>
      <nav style="display: flex; align-items: center; gap: 1.5rem;" class="desktop-nav">
        ${(block.content.links || [])
          .map(
            (l: any) =>
              `<a href="${escapeHtml(l.href)}" style="color: inherit; text-decoration: none; font-size: 0.95rem; font-weight: 500; opacity: 0.85;">${escapeHtml(l.label)}</a>`
          )
          .join('\n        ')}
        ${
          block.content.showCta
            ? `<a href="#cta" class="f-button f-button-primary f-button-md">${escapeHtml(
                block.content.ctaLabel
              )}</a>`
            : ''
        }
      </nav>
    </div>
  </header>`;

    case 'heading':
      return `  <!-- Hero / Heading Block -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; text-align: ${block.styles.desktop.textAlign};">
      ${
        block.content.showBadge
          ? `<div style="margin-bottom: 1.25rem;"><span class="f-badge">${escapeHtml(
              block.content.badge
            )}</span></div>`
          : ''
      }
      <h1 style="font-size: clamp(2rem, 5vw, 3.75rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1.25rem;">
        ${escapeHtml(block.content.title)}
      </h1>
      <p style="font-size: clamp(1rem, 2vw, 1.25rem); opacity: 0.8; line-height: 1.6; max-width: 42rem; margin: 0 auto 2rem auto;">
        ${escapeHtml(block.content.subtitle)}
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: ${
        block.styles.desktop.textAlign === 'center' ? 'center' : 'flex-start'
      };">
        <a href="#action" class="f-button f-button-primary f-button-lg">${escapeHtml(
          block.content.primaryCtaText
        )}</a>
        ${
          block.content.showSecondaryCta
            ? `<a href="#more" class="f-button f-button-outline f-button-lg">${escapeHtml(
                block.content.secondaryCtaText
              )}</a>`
            : ''
        }
      </div>
    </div>
  </section>`;

    case 'paragraph':
      return `  <!-- Rich Text Block -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; text-align: ${block.styles.desktop.textAlign};">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">${escapeHtml(block.content.headline)}</h2>
      <p style="font-size: 1.1rem; line-height: 1.7; opacity: 0.85;">${escapeHtml(block.content.body)}</p>
    </div>
  </section>`;

    case 'image':
      return `  <!-- Image Block -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; text-align: ${block.styles.desktop.textAlign};">
      <div style="border-radius: ${block.content.borderRadius || '16px'}; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08); border: 1px solid var(--f-border);">
        <img src="${escapeHtml(block.content.imageUrl)}" alt="${escapeHtml(
          block.content.altText
        )}" style="width: 100%; height: auto; display: block; aspect-ratio: ${
          block.content.aspectRatio || '16/9'
        }; object-fit: cover;" loading="lazy" />
      </div>
      ${
        block.content.caption
          ? `<p style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.7;">${escapeHtml(
              block.content.caption
            )}</p>`
          : ''
      }
    </div>
  </section>`;

    case 'button':
      return `  <!-- Button Block -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; text-align: ${block.styles.desktop.textAlign};">
      <a href="${escapeHtml(block.content.linkUrl || '#')}" class="f-button f-button-${
        block.content.variant || 'primary'
      } f-button-${block.content.size || 'lg'}">
        ${escapeHtml(block.content.buttonText)}
      </a>
      ${
        block.content.helperText
          ? `<p style="margin-top: 0.5rem; font-size: 0.825rem; opacity: 0.7;">${escapeHtml(
              block.content.helperText
            )}</p>`
          : ''
      }
    </div>
  </section>`;

    case 'testimonial':
      return `  <!-- Testimonial Section -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto;">
      <div class="f-card" style="text-align: center;">
        <div style="display: flex; justify-content: center; gap: 4px; color: #f59e0b; margin-bottom: 1rem;">
          ${'★'.repeat(block.content.rating || 5)}
        </div>
        <blockquote style="font-size: 1.25rem; font-weight: 500; font-style: italic; line-height: 1.6; margin-bottom: 1.5rem;">
          "${escapeHtml(block.content.quote)}"
        </blockquote>
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.85rem;">
          <img src="${escapeHtml(
            block.content.avatarUrl
          )}" alt="${escapeHtml(block.content.authorName)}" style="width: 48px; height: 48px; border-radius: 9999px; object-fit: cover; border: 2px solid var(--f-accent);" />
          <div style="text-align: left;">
            <div style="font-weight: 700; font-size: 1rem;">${escapeHtml(block.content.authorName)}</div>
            <div style="font-size: 0.85rem; opacity: 0.75;">${escapeHtml(block.content.authorRole)}</div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

    case 'features':
      return `  <!-- Features Grid -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.75rem;">${escapeHtml(
          block.content.sectionTitle
        )}</h2>
        <p style="font-size: 1.15rem; opacity: 0.8; max-width: 36rem; margin: 0 auto;">${escapeHtml(
          block.content.sectionSubtitle
        )}</p>
      </div>
      <div class="grid-3">
        ${(block.content.items || [])
          .map(
            (item: any) => `
        <div class="f-card" style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div><span class="f-badge">${escapeHtml(item.badge || 'Feature')}</span></div>
          <h3 style="font-size: 1.25rem; font-weight: 700;">${escapeHtml(item.title)}</h3>
          <p style="opacity: 0.8; font-size: 0.95rem; line-height: 1.5;">${escapeHtml(
            item.description
          )}</p>
        </div>`
          )
          .join('\n')}
      </div>
    </div>
  </section>`;

    case 'cta':
      return `  <!-- Call to Action Banner -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; text-align: center; padding: 2rem;">
      <div style="margin-bottom: 1rem;"><span class="f-badge">${escapeHtml(
        block.content.badge || 'Get Started'
      )}</span></div>
      <h2 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1rem;">${escapeHtml(
        block.content.headline
      )}</h2>
      <p style="font-size: 1.1rem; opacity: 0.85; max-width: 34rem; margin: 0 auto 2rem auto;">${escapeHtml(
        block.content.description
      )}</p>
      <form style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; max-width: 28rem; margin: 0 auto;" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
        <input type="email" placeholder="${escapeHtml(
          block.content.inputPlaceholder || 'Enter your email...'
        )}" required style="flex: 1; min-width: 200px; padding: 0.75rem 1rem; border-radius: var(--f-radius); border: 1px solid var(--f-border); font-size: 0.95rem;" />
        <button type="submit" class="f-button f-button-primary f-button-lg">${escapeHtml(
          block.content.buttonText || 'Subscribe'
        )}</button>
      </form>
    </div>
  </section>`;

    case 'accordion':
      return `  <!-- Accordion FAQ -->
  <section class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 2rem; font-weight: 800;">${escapeHtml(block.content.title)}</h2>
        <p style="opacity: 0.75; margin-top: 0.5rem;">${escapeHtml(block.content.subtitle)}</p>
      </div>
      <div>
        ${(block.content.items || [])
          .map(
            (q: any, i: number) => `
        <div class="f-accordion-item ${i === 0 ? 'active' : ''}">
          <button class="f-accordion-trigger" type="button">
            <span>${escapeHtml(q.question)}</span>
            <span class="accordion-icon" style="transition: transform 0.2s;">▾</span>
          </button>
          <div class="f-accordion-content">
            <p>${escapeHtml(q.answer)}</p>
          </div>
        </div>`
          )
          .join('\n')}
      </div>
    </div>
  </section>`;

    case 'footer':
      return `  <!-- Footer -->
  <footer class="f-block f-block-${block.id}" style="${inlineWrapperStyle}">
    <div style="max-width: ${maxW}; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; text-align: center;">
      <div>
        <div style="font-weight: 800; font-size: 1.1rem; color: var(--f-fg);">${escapeHtml(
          block.content.brandName
        )}</div>
        <div style="font-size: 0.85rem; opacity: 0.75; margin-top: 0.25rem;">${escapeHtml(
          block.content.tagline
        )}</div>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center;">
        ${(block.content.links || [])
          .map(
            (l: any) =>
              `<a href="${escapeHtml(l.href)}" style="color: inherit; text-decoration: none; font-size: 0.875rem; opacity: 0.8;">${escapeHtml(l.label)}</a>`
          )
          .join('\n        ')}
      </div>
      <div style="font-size: 0.8rem; opacity: 0.6; width: 100%; border-top: 1px solid var(--f-border); padding-top: 1.25rem; margin-top: 0.5rem;">
        ${escapeHtml(block.content.copyright)}
      </div>
    </div>
  </footer>`;

    default:
      return `  <section style="${inlineWrapperStyle}"><div style="max-width: ${maxW}; margin: 0 auto;">${escapeHtml(block.name)}</div></section>`;
  }
}

export async function downloadZip(blocks: BlockData[], theme: PageTheme): Promise<void> {
  const zip = new JSZip();

  const htmlContent = generateHtml(blocks, theme);
  const cssContent = generateCss(theme);
  const jsContent = generateScript();
  const readmeContent = generateReadme(theme);

  zip.file('index.html', htmlContent);
  zip.file('styles.css', cssContent);
  zip.file('script.js', jsContent);
  zip.file('README.md', readmeContent);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(theme.pageTitle || 'forma-website').toLowerCase().replace(/\s+/g, '-')}-files.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getMaxWidthValue(maxWidth?: string): string {
  switch (maxWidth) {
    case 'sm': return '24rem';
    case 'md': return '32rem';
    case 'lg': return '42rem';
    case 'xl': return '52rem';
    case '2xl': return '64rem';
    case '4xl': return '76rem';
    case '6xl': return '84rem';
    case 'full': return '100%';
    default: return '64rem';
  }
}

function adjustColor(hex: string, percent: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
