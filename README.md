# Forma Visual Page Builder

> A focused, responsive visual website builder for composing polished landing pages from reusable blocks—without writing page code by hand.

[![Live application](https://img.shields.io/badge/Live%20application-Visit%20Forma%20Builder-3158DF?style=for-the-badge)](https://forma-visual-page-builder.vercel.app/)
[![Powered by Forma UI](https://img.shields.io/badge/Powered%20by-Forma%20UI-111827?style=for-the-badge)](https://github.com/AryanSehgal/forma-design-system)

**[Open the live builder](https://forma-visual-page-builder.vercel.app/)** · **[Explore Forma UI](https://forma-design-system-docs.vercel.app/getting-started)** · **[View the Forma UI source](https://github.com/AryanSehgal/forma-design-system)**

## Overview

Forma Visual Page Builder is a browser-based creation tool for people who want the speed of a no-code landing-page builder with the consistency of a production design system. Users assemble a page from purposeful content blocks, edit copy and visual properties in context, verify the page at desktop, tablet, and mobile widths, and export a deployable website bundle.

Rather than attempting to reproduce every feature in a large site builder, this project deliberately supports a compact set of well-designed blocks and reliable editing controls. That constraint makes the interface quick to learn, visually cohesive, and suited to portfolios, product launches, marketing pages, and lightweight documentation sites.

## Screenshots

| **Title** | **Screenshot** |
| Dektop Canvas | <img width="2522" height="1544" alt="forma-visual-page-builder vercel app" src="https://github.com/user-attachments/assets/c879f06a-10fc-45fe-bf71-7e6924db95b5" /> |
| Tablet Canvas | <img width="2522" height="1544" alt="forma-visual-page-builder vercel app2" src="https://github.com/user-attachments/assets/306ae850-9b52-4fc0-b0e3-6adb7435a6fa" /> |
| Phone Canvas | <img width="2522" height="1544" alt="forma-visual-page-builder vercel app3" src="https://github.com/user-attachments/assets/149a6940-3aa1-40b9-a6dd-6b0eb2fff7c4" /> |
| Dark Mode | <img width="2522" height="1544" alt="forma-visual-page-builder vercel app5" src="https://github.com/user-attachments/assets/62a5a185-3843-4793-98a3-47a24e43a14d" /> |
| User Guide | <img width="2522" height="1544" alt="forma-visual-page-builder vercel app6" src="https://github.com/user-attachments/assets/2bce3106-0c41-4333-a0ad-d369e602337d" /> |

## Lighthouse audit

The deployed builder was audited with Lighthouse against [forma-visual-page-builder.vercel.app](https://forma-visual-page-builder.vercel.app/). The reported results provide a strong baseline for a client-side visual editing experience.

<img width="586" height="571" alt="image" src="https://github.com/user-attachments/assets/6312737d-353c-410d-854e-133d8e7de9bf" />

> Lighthouse scores are a point-in-time measurement and can vary by device profile, network conditions, browser version, and deployed asset versions.

**Detailed report placeholder:** add the exported PDF at [Lighthouse Report of Forma Builder.pdf](https://github.com/user-attachments/files/32434891/Lighthouse.Report.of.Forma.Builder.pdf)


## What you can build

- Marketing and SaaS landing pages
- Personal portfolios and resume sites
- Product-launch pages
- Feature and testimonial pages
- Lightweight documentation and FAQ pages

Start with a blank artboard or an included starter flow, then customize content, spacing, colours, actions, and responsive behaviour visually.

## Feature set

### Block-based page composition

The builder includes ten focused page blocks that can be added to the canvas in any order:

| Block | Purpose |
| --- | --- |
| Navigation Bar | Brand identity, navigation links, and a configurable CTA |
| Hero / Heading | Kicker badge, headline, supporting copy, and primary/secondary actions |
| Text Section | Editorial headline and rich body copy |
| Image Banner | Responsive image, alt text, caption, aspect ratio, and corner radius |
| Button & CTA Action | Standalone call to action with Forma UI variants, sizes, and helper text |
| Testimonial Card | Quote, rating, avatar, author, and role |
| Feature Grid | A scalable collection of benefit cards with icons and badges |
| Call to Action Banner | High-contrast email-capture style conversion section |
| Accordion FAQ | Expandable questions and answers |
| Page Footer | Brand attribution, useful links, and copyright information |

### Visual editing workflow

- **Blocks tab:** Browse the component library and add sections directly to the page.
- **Layers tab:** Inspect page structure, select a section, drag to reorder it, rename it, duplicate it, move it, or delete it.
- **Inspector:** Edit the selected block’s content, layout, and style without leaving the workspace.
- **Theme tab:** Define the page’s light/dark mode, accent colour, typography, corner radius, title, and metadata.
- **History controls:** Undo and redo recently committed edits with `Ctrl/Cmd + Z` and `Ctrl/Cmd + Y`.
- **Local persistence:** Page blocks and theme preferences are retained in browser `localStorage`, so an in-progress page survives a refresh on the same device.

### Responsive design controls

The central canvas provides realistic artboards for three breakpoints:

| Mode | Artboard width | Use case |
| --- | ---: | --- |
| Desktop | 1200px | Full landing-page composition |
| Tablet | 768px | Mid-sized responsive layout review |
| Mobile | 375px | Phone-first spacing and visual-hierarchy review |

Each block supports independent desktop and mobile padding, alignment, type scale, gap, and column settings. The canvas automatically scales an artboard to the available workspace while preserving its actual layout width. A dedicated interactive preview mode hides builder controls so the page can be evaluated as an end user would see it.

### Custom button behaviour

Buttons are configured per component rather than being decorative placeholders. The Navbar CTA, Hero primary and secondary CTAs, standalone Button block, and CTA banner submit button can each be assigned one of the following actions:

- Open a URL in the same tab or a new tab
- Smooth-scroll to another builder block
- Open a configurable modal dialog
- Show an animated toast notification
- Open a pre-addressed email draft
- Download a linked file

The same behaviour is available in the interactive builder preview and retained in exported static sites.

### Starter templates

Three starter templates provide an editable starting point:

- **Modern SaaS Showcase** — Navbar, Hero, image, action, feature grid, testimonial, CTA, and footer.
- **Essential Webflow-Style Flow** — A compact heading, image, action-button, and testimonial sequence.
- **Designer & Engineer Portfolio** — A profile-oriented starting point for portfolios and resume websites.

## Powered by Forma UI

This builder is built with **[@aryan_sehgal/forma-ui](https://www.npmjs.com/package/@aryan_sehgal/forma-ui)**, the React component library created by [Aryan Sehgal](https://github.com/AryanSehgal/forma-design-system).

Forma UI provides the visual and interaction foundation of the application, including `Button`, `Card`, `Badge`, `Avatar`, `Input`, and `Accordion` primitives. Its semantic `--f-*` CSS token namespace is used to scope each artboard’s accent colour, radius, typography choices, surface colours, and dark-mode treatment.

The library supplies TypeScript declarations, semantic CSS tokens, and accessible interaction primitives. Its Radix-backed complex controls provide practical keyboard behaviour, semantics, focus management, and controlled/uncontrolled state patterns. Forma Visual Page Builder demonstrates a real-world design-system use case: authoring and previewing consistent, responsive interfaces visually.

Learn more:

- [Forma UI documentation](https://forma-design-system-docs.vercel.app/getting-started)
- [Forma UI source repository](https://github.com/AryanSehgal/forma-design-system)
- [Forma UI npm package](https://www.npmjs.com/package/@aryan_sehgal/forma-ui)

## Export and deployment

When a page is ready, the Export Website workflow can generate a standalone ZIP bundle containing:

| File | Contents |
| --- | --- |
| `index.html` | Semantic page structure and configured block content |
| `styles.css` | Responsive styles and Forma-inspired design tokens |
| `script.js` | Accordion, anchor navigation, modal, toast, download, email, and scroll interactions |
| `README.md` | Instructions for deploying the exported static website |

The export experience also includes copyable HTML/CSS and React views for developers who want to continue implementation in code. Exported static files do not require a build step and can be hosted on Vercel, Netlify, GitHub Pages, or any standard static host.

## Technology

| Area | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 and Forma UI CSS tokens |
| Component system | `@aryan_sehgal/forma-ui` |
| Accessible primitives | Forma UI and Radix-backed controls |
| Icons | Lucide React |
| Export packaging | JSZip |
| Hosting | Vercel |

## Project structure

```text
src/
├── components/
│   ├── blocks/BlockRenderer.tsx  # Renders every visual page block
│   ├── Canvas.tsx                # Responsive artboard, preview, and action runtime
│   ├── LeftSidebar.tsx           # Blocks, theme, and layers workspace
│   ├── RightSidebar.tsx          # Selected-block inspector
│   ├── ButtonActionEditor.tsx    # Per-button action configuration
│   └── ExportModal.tsx           # ZIP, code, and deployment export workflow
├── data/
│   ├── defaultBlocks.ts          # Default block configuration
│   └── starterTemplates.ts       # Ready-to-edit page templates
├── utils/
│   ├── actionHandler.ts          # Preview action handling
│   └── exportWebsite.ts          # Static HTML/CSS/JS generation and ZIP packaging
├── types.ts                      # Shared builder, theme, and action types
└── App.tsx                       # Application state, persistence, and history
```

## Run locally

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Installation

```bash
git clone <your-fork-or-repository-url>
cd forma-visual-page-builder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality checks

```bash
npm run lint
npm run build
```

`npm run lint` performs a TypeScript type check. `npm run build` creates the production-ready static application in `dist/`.

## Deploy to Vercel

### From GitHub

1. Push this project to a GitHub repository.
2. Visit [Vercel](https://vercel.com/new) and choose **Add New → Project**.
3. Import the repository and allow Vercel to detect Vite.
4. Confirm the build settings:
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Select **Deploy**.

Vercel will create a production URL and deploy future pushes automatically. Pull requests receive their own preview deployment URLs.

### From the CLI

```bash
npm install --global vercel
vercel
vercel --prod
```

## Design decisions

- **A limited block set over an infinite canvas:** Keeps pages cohesive and helps users make confident choices quickly.
- **Independent mobile controls:** Responsive work is not an afterthought; mobile spacing and alignment are editable at the block level.
- **Artboard-scoped tokens:** Theme controls apply to the page being built, avoiding accidental changes to the editor shell.
- **Exportable interactions:** CTA configuration is data-driven, so meaningful behaviour survives the transition from preview to static export.
- **Design-system-first implementation:** Using a single authored component library keeps the builder and its generated pages visually aligned.

## Author

Created by [Aryan Sehgal](https://github.com/AryanSehgal).

Built as a practical showcase for [Forma UI](https://github.com/AryanSehgal/forma-design-system), a composable React component library with TypeScript declarations, semantic CSS tokens, and accessible interaction primitives.



