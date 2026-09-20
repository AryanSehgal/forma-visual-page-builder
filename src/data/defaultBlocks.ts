import { BlockData, BlockType } from '../types';

export function createBlock(type: BlockType): BlockData {
  const id = 'block_' + Math.random().toString(36).substring(2, 9);

  switch (type) {
    case 'navbar':
      return {
        id,
        type: 'navbar',
        name: 'Navigation Bar',
        content: {
          brandName: 'Forma Studio',
          links: [
            { label: 'Features', href: '#features' },
            { label: 'Showcase', href: '#showcase' },
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'Pricing', href: '#pricing' },
          ],
          ctaLabel: 'Get Started',
          ctaVariant: 'primary',
          showCta: true,
          ctaAction: {
            type: 'url',
            url: '#features',
            target: '_self',
          },
        },
        styles: {
          desktop: { paddingY: 1.25, paddingX: 2, textAlign: 'left' },
          mobile: { paddingY: 1, paddingX: 1.25, textAlign: 'left' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '6xl',
          hasBorder: true,
          borderColor: 'var(--f-border)',
        },
      };

    case 'heading':
      return {
        id,
        type: 'heading',
        name: 'Hero / Heading',
        content: {
          badge: 'Powered by Forma UI',
          title: 'Design high-converting websites visually in minutes',
          subtitle: 'Arrange production-ready blocks, tune responsive spacing across desktop & mobile viewports, and export clean standalone code.',
          primaryCtaText: 'Start Building Now',
          primaryCtaVariant: 'primary',
          primaryAction: {
            type: 'modal',
            modalTitle: 'Start Building with Forma UI',
            modalMessage: 'You are viewing an interactive preview. Connect your production onboarding flow or checkout page right here!',
            modalButtonText: 'Let\'s do it!',
          },
          secondaryCtaText: 'Explore Components',
          secondaryCtaVariant: 'outline',
          secondaryAction: {
            type: 'url',
            url: 'https://forma-design-system-docs.vercel.app',
            target: '_blank',
          },
          showBadge: true,
          showSecondaryCta: true,
        },
        styles: {
          desktop: { paddingY: 5, paddingX: 2, textAlign: 'center', fontSize: '5xl' },
          mobile: { paddingY: 3, paddingX: 1.25, textAlign: 'center', fontSize: '3xl' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '4xl',
        },
      };

    case 'paragraph':
      return {
        id,
        type: 'paragraph',
        name: 'Text Section',
        content: {
          headline: 'Engineered for Performance and Visual Balance',
          body: 'Every component inherits strict typographic rhythm, WCAG-compliant color contrast, and fluid responsiveness. Built from the ground up to integrate seamlessly with modern web stacks.',
        },
        styles: {
          desktop: { paddingY: 3, paddingX: 2, textAlign: 'left', fontSize: 'lg' },
          mobile: { paddingY: 2, paddingX: 1.25, textAlign: 'left', fontSize: 'base' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '4xl',
        },
      };

    case 'image':
      return {
        id,
        type: 'image',
        name: 'Image Banner',
        content: {
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
          altText: 'Modern digital interface visualization',
          caption: 'Fluid layouts rendered with pixel-perfect responsive precision',
          aspectRatio: '16/9',
          borderRadius: '16px',
        },
        styles: {
          desktop: { paddingY: 3, paddingX: 2, textAlign: 'center' },
          mobile: { paddingY: 2, paddingX: 1.25, textAlign: 'center' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '6xl',
        },
      };

    case 'button':
      return {
        id,
        type: 'button',
        name: 'Button & CTA Action',
        content: {
          buttonText: 'Claim Your Free Trial',
          variant: 'primary', // Forma UI button variant
          size: 'lg',
          linkUrl: 'https://github.com/AryanSehgal/forma-design-system',
          action: {
            type: 'url',
            url: 'https://github.com/AryanSehgal/forma-design-system',
            target: '_blank',
          },
          helperText: 'No credit card required. Instant 14-day free access.',
        },
        styles: {
          desktop: { paddingY: 2.5, paddingX: 2, textAlign: 'center' },
          mobile: { paddingY: 2, paddingX: 1.25, textAlign: 'center' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: 'md',
        },
      };

    case 'testimonial':
      return {
        id,
        type: 'testimonial',
        name: 'Testimonial Section',
        content: {
          quote: 'Forma UI drastically reduced our design-to-production cycle. The tokens and Radix-backed accessibility give our apps a level of polish that users immediately notice.',
          authorName: 'Alex Rivera',
          authorRole: 'Head of Product at Nexus Dynamics',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
          rating: 5,
          companyLogoText: 'NEXUS',
        },
        styles: {
          desktop: { paddingY: 4, paddingX: 2, textAlign: 'center' },
          mobile: { paddingY: 2.5, paddingX: 1.25, textAlign: 'center' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '4xl',
          hasBorder: false,
        },
      };

    case 'features':
      return {
        id,
        type: 'features',
        name: 'Feature Grid',
        content: {
          sectionTitle: 'Everything you need to launch fast',
          sectionSubtitle: 'Carefully tuned components crafted for scalability and modern aesthetics.',
          items: [
            {
              icon: 'blocks',
              badge: 'Modular',
              title: 'Component Driven',
              description: 'Powered by @aryan_sehgal/forma-ui primitives for high visual consistency and composability.',
            },
            {
              icon: 'smartphone',
              badge: 'Fluid',
              title: 'Mobile-Tuned Layouts',
              description: 'Independent desktop and mobile spacing controls ensure flawless responsiveness on any device.',
            },
            {
              icon: 'download',
              badge: 'Portable',
              title: 'Clean Code Export',
              description: 'Export complete, production-ready website files (HTML, CSS, JS) ready to deploy on Vercel.',
            },
          ],
        },
        styles: {
          desktop: { paddingY: 5, paddingX: 2, textAlign: 'center', columns: 3 },
          mobile: { paddingY: 3, paddingX: 1.25, textAlign: 'left', columns: 1 },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '6xl',
        },
      };

    case 'cta':
      return {
        id,
        type: 'cta',
        name: 'Call to Action Section',
        content: {
          badge: 'Limited Time Launch Offer',
          headline: 'Ready to bring your ideas to life?',
          description: 'Join thousands of creators building clean, accessible web experiences with Forma UI.',
          inputPlaceholder: 'Enter your work email...',
          buttonText: 'Get Started Free',
          buttonVariant: 'primary',
          buttonAction: {
            type: 'toast',
            toastMessage: '🎉 Success! You are on the priority waitlist. Check your inbox soon.',
          },
        },
        styles: {
          desktop: { paddingY: 5, paddingX: 2, textAlign: 'center' },
          mobile: { paddingY: 3, paddingX: 1.25, textAlign: 'center' },
          backgroundColor: '#0f172a',
          textColor: '#ffffff',
          maxWidth: '4xl',
          borderRadius: '20px',
        },
      };

    case 'accordion':
      return {
        id,
        type: 'accordion',
        name: 'Accordion FAQ',
        content: {
          title: 'Frequently Asked Questions',
          subtitle: 'Find quick answers about Forma UI, exports, and deployment.',
          items: [
            {
              question: 'How do I deploy the exported website files?',
              answer: 'Simply download the ZIP bundle, unzip it, and upload the folder into Vercel, Netlify, or deploy using GitHub Pages. It runs instantly with zero configuration.',
            },
            {
              question: 'Can I customize the design tokens and colors?',
              answer: 'Yes! The page builder utilizes Forma UI CSS custom properties like --f-accent, --f-radius, and font-family. You can customize them in the theme studio or directly in styles.css.',
            },
            {
              question: 'Is the generated code clean and semantic?',
              answer: 'All blocks are rendered using clean HTML5 tags, standard responsive Tailwind or modular CSS, and accessible ARIA attributes.',
            },
          ],
        },
        styles: {
          desktop: { paddingY: 4, paddingX: 2, textAlign: 'left' },
          mobile: { paddingY: 2.5, paddingX: 1.25, textAlign: 'left' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '2xl',
        },
      };

    case 'footer':
      return {
        id,
        type: 'footer',
        name: 'Page Footer',
        content: {
          brandName: 'Forma Page Builder',
          tagline: 'Crafted with @aryan_sehgal/forma-ui component library.',
          copyright: `© ${new Date().getFullYear()} Forma Studio. All rights reserved.`,
          links: [
            { label: 'Documentation', href: 'https://forma-design-system-docs.vercel.app' },
            { label: 'GitHub Repository', href: 'https://github.com/AryanSehgal/forma-design-system' },
            { label: 'NPM Package', href: 'https://www.npmjs.com/package/@aryan_sehgal/forma-ui' },
            { label: 'Privacy Policy', href: '#' },
          ],
        },
        styles: {
          desktop: { paddingY: 3, paddingX: 2, textAlign: 'center' },
          mobile: { paddingY: 2, paddingX: 1.25, textAlign: 'center' },
          backgroundColor: 'transparent',
          textColor: '',
          maxWidth: '6xl',
          hasBorder: true,
          borderColor: 'var(--f-border)',
        },
      };

    default:
      return {
        id,
        type: 'heading',
        name: 'Heading Block',
        content: { title: 'Heading Title' },
        styles: {
          desktop: { paddingY: 3, paddingX: 2, textAlign: 'left' },
          mobile: { paddingY: 2, paddingX: 1.25, textAlign: 'left' },
          backgroundColor: 'transparent',
          textColor: '',
        },
      };
  }
}

export const defaultBlocks: BlockData[] = [
  createBlock('heading'),
  createBlock('image'),
  createBlock('button'),
  createBlock('testimonial'),
  createBlock('features'),
  createBlock('cta'),
  createBlock('accordion'),
  createBlock('navbar'),
  createBlock('paragraph'),
  createBlock('footer'),
];

