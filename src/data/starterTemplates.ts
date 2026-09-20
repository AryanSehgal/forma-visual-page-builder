import { BlockData } from '../types';
import { createBlock } from './defaultBlocks';
import { ARYAN_PROFILE } from '../utils/aryanProfile';

export interface Template {
  id: string;
  name: string;
  description: string;
  blocks: BlockData[];
}

export function getStarterTemplates(): Template[] {
  // 1. Featured Complete Showcase (Hero + Image + Features + Testimonial + CTA + Footer)
  const heroBlock = createBlock('heading');
  const imageBlock = createBlock('image');
  const buttonBlock = createBlock('button');
  const testimonialBlock = createBlock('testimonial');
  const navbarBlock = createBlock('navbar');
  const featuresBlock = createBlock('features');
  const ctaBlock = createBlock('cta');
  const footerBlock = createBlock('footer');

  const completeShowcase: BlockData[] = [
    navbarBlock,
    heroBlock,
    imageBlock,
    buttonBlock,
    featuresBlock,
    testimonialBlock,
    ctaBlock,
    footerBlock,
  ];

  // 2. Focused Story: Heading + Image + Button + Testimonial (Matching user's exact example)
  const focusedHeading = createBlock('heading');
  focusedHeading.content.title = 'Crafted for designers who write code';
  focusedHeading.content.subtitle = 'Arrange semantic UI blocks, preview responsive phone breakpoints, and export clean standalone website files.';
  focusedHeading.content.badge = 'New Release • Forma UI v0.1.2';

  const focusedImage = createBlock('image');
  focusedImage.content.imageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80';
  focusedImage.content.caption = 'Fluid design system tokens adapting seamlessly to mobile and desktop';

  const focusedButton = createBlock('button');
  focusedButton.content.buttonText = 'Explore Design System Documentation';
  focusedButton.content.variant = 'primary';
  focusedButton.content.size = 'lg';
  focusedButton.content.helperText = 'Free open source components published to npm @aryan_sehgal/forma-ui';

  const focusedTestimonial = createBlock('testimonial');
  focusedTestimonial.content.quote = 'The combination of accessible Radix primitives and portable CSS tokens in Forma UI makes rapid layout prototyping an absolute joy.';
  focusedTestimonial.content.authorName = 'Aryan Sehgal';
  focusedTestimonial.content.authorRole = 'Creator of Forma Design System';
  focusedTestimonial.content.avatarUrl = ARYAN_PROFILE.photoUrl;

  const userStoryTemplate: BlockData[] = [
    focusedHeading,
    focusedImage,
    focusedButton,
    focusedTestimonial,
  ];

  // 3. Portfolio & Resume template
  const portfolioNavbar = createBlock('navbar');
  portfolioNavbar.content.brandName = 'Aryan Sehgal • Design Engineer';
  portfolioNavbar.content.links = [
    { label: 'Projects', href: '#projects' },
    { label: 'Forma UI', href: '#forma' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
  portfolioNavbar.content.ctaLabel = 'Download CV';

  const portfolioHero = createBlock('heading');
  portfolioHero.content.badge = 'Design Systems & Frontend Architecture';
  portfolioHero.content.title = 'Hi, I’m Aryan. I build scalable design systems and visual tools.';
  portfolioHero.content.subtitle = 'Author of @aryan_sehgal/forma-ui — accessible React primitives, semantic design tokens, and visual builders.';
  portfolioHero.content.primaryCtaText = 'View GitHub Repo';
  portfolioHero.content.secondaryCtaText = 'Explore NPM Package';

  const portfolioTestimonial = createBlock('testimonial');
  portfolioTestimonial.content.quote = 'Aryan’s work on Forma UI reflects deep attention to accessibility, keyboard navigation, and modular component registry architecture.';
  portfolioTestimonial.content.authorName = 'Sarah Jenkins';
  portfolioTestimonial.content.authorRole = 'Engineering Manager, Web Platforms';

  const portfolioCta = createBlock('cta');
  portfolioCta.content.headline = 'Let’s collaborate on your next project';
  portfolioCta.content.description = 'Available for design engineering, component library architecture, and full-stack web development.';
  portfolioCta.content.buttonText = 'Get in Touch';

  const portfolioTemplate: BlockData[] = [
    portfolioNavbar,
    portfolioHero,
    createBlock('features'),
    portfolioTestimonial,
    portfolioCta,
    createBlock('footer'),
  ];

  return [
    {
      id: 'template_showcase',
      name: 'Modern SaaS Showcase',
      description: 'Navbar, Hero, Image banner, Buttons, Features, Testimonial, and CTA.',
      blocks: completeShowcase,
    },
    {
      id: 'template_core',
      name: 'Essential Webflow-Style Flow',
      description: 'Heading, Image, Action Button, and Testimonial block.',
      blocks: userStoryTemplate,
    },
    {
      id: 'template_portfolio',
      name: 'Designer & Engineer Portfolio',
      description: 'Tailored for personal resumes, component showcases, and client projects.',
      blocks: portfolioTemplate,
    },
  ];
}

export const defaultTemplates: Template[] = getStarterTemplates();

