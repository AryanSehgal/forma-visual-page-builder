import React from 'react';
import { BlockData, ViewportMode, PageTheme, ButtonAction } from '../../types';
import { ARYAN_PROFILE } from '../../utils/aryanProfile';
import { Button } from '@aryan_sehgal/forma-ui';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@aryan_sehgal/forma-ui';
import { Badge } from '@aryan_sehgal/forma-ui';
import { Avatar } from '@aryan_sehgal/forma-ui';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@aryan_sehgal/forma-ui';
import { Input } from '@aryan_sehgal/forma-ui';
import {
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Globe,
  Mail,
  Smartphone,
  Check,
} from 'lucide-react';

interface BlockRendererProps {
  block: BlockData;
  viewport: ViewportMode;
  theme: PageTheme;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdateContent?: (key: string, value: any) => void;
  isInteractivePreview?: boolean;
  onTriggerAction?: (action?: ButtonAction, fallbackUrl?: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  viewport,
  theme,
  isSelected,
  onSelect,
  onUpdateContent,
  isInteractivePreview = false,
  onTriggerAction,
}) => {
  const isMobile = viewport === 'mobile';
  const currentResponsive = isMobile ? block.styles.mobile : block.styles.desktop;

  const paddingYStyle = `${currentResponsive.paddingY}rem`;
  const paddingXStyle = `${currentResponsive.paddingX}rem`;
  const textAlign = currentResponsive.textAlign;

  const getMaxWidthClass = (maxWidth?: string) => {
    switch (maxWidth) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case '2xl': return 'max-w-2xl';
      case '4xl': return 'max-w-4xl';
      case '6xl': return 'max-w-6xl';
      case 'full': return 'w-full';
      default: return 'max-w-5xl';
    }
  };

  const renderFeatureIcon = (iconName?: string, index = 0) => {
    switch (iconName) {
      case 'blocks': return <Layers className="w-4 h-4" />;
      case 'smartphone': return <Smartphone className="w-4 h-4" />;
      case 'download': return <ArrowRight className="w-4 h-4" />;
      case 'zap': return <Zap className="w-4 h-4" />;
      case 'shield': return <ShieldCheck className="w-4 h-4" />;
      case 'sparkles': return <Sparkles className="w-4 h-4" />;
      case 'globe': return <Globe className="w-4 h-4" />;
      default:
        return index === 0 ? <Zap className="w-4 h-4" /> : index === 1 ? <Layers className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />;
    }
  };

  const renderContent = () => {
    switch (block.type) {
      case 'navbar': {
        const { brandName, links = [], ctaLabel, ctaVariant, showCta } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap`}>
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="w-3 h-3 rounded-full shadow-xs shrink-0"
                style={{ backgroundColor: 'var(--f-accent, #3158df)' }}
              />
              <span className="font-extrabold text-lg tracking-tight text-inherit whitespace-nowrap">
                {brandName}
              </span>
            </div>

            <nav className={`${isMobile ? 'hidden' : 'flex'} items-center flex-wrap gap-x-6 gap-y-1 text-sm font-medium text-inherit/80 justify-center min-w-0`}>
              {links.map((link: any, idx: number) => (
                <span
                  key={idx}
                  className="hover:text-inherit transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </span>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              {showCta !== false && ctaLabel && (
                <Button
                  variant={ctaVariant || 'primary'}
                  size={isMobile ? 'sm' : 'md'}
                  className="whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTriggerAction) {
                      onTriggerAction(block.content.ctaAction, '#features');
                    }
                  }}
                >
                  {ctaLabel}
                </Button>
              )}
            </div>
          </div>
        );
      }

      case 'heading': {
        const {
          badge,
          title,
          subtitle,
          primaryCtaText,
          primaryCtaVariant,
          secondaryCtaText,
          secondaryCtaVariant,
          showBadge,
          showSecondaryCta,
        } = block.content;

        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)}`}>
            {showBadge !== false && badge && (
              <div className="mb-4 flex justify-center">
                <Badge variant="brand" className="px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--f-accent)]" />
                  {badge}
                </Badge>
              </div>
            )}

            <h1
              className={`font-black tracking-tight text-inherit leading-[1.15] mb-5 break-words ${
                isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-inherit/75 leading-relaxed mx-auto mb-8 break-words ${
                isMobile ? 'text-base max-w-sm' : 'text-lg lg:text-xl max-w-2xl'
              }`}
            >
              {subtitle}
            </p>

            <div
              className={`flex flex-wrap items-center gap-3.5 ${
                textAlign === 'center'
                  ? 'justify-center'
                  : textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {primaryCtaText && (
                <Button
                  variant={primaryCtaVariant || 'primary'}
                  size={isMobile ? 'md' : 'lg'}
                  className="font-semibold shadow-sm whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTriggerAction) {
                      onTriggerAction(block.content.primaryAction, '#action');
                    }
                  }}
                >
                  {primaryCtaText}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}

              {showSecondaryCta !== false && secondaryCtaText && (
                <Button
                  variant={secondaryCtaVariant || 'outline'}
                  size={isMobile ? 'md' : 'lg'}
                  className="whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTriggerAction) {
                      onTriggerAction(block.content.secondaryAction, '#features');
                    }
                  }}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </div>
        );
      }

      case 'paragraph': {
        const { headline, body } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} space-y-3`}>
            {headline && (
              <h3 className={`font-bold tracking-tight text-inherit ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                {headline}
              </h3>
            )}
            <p className="text-inherit/80 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {body}
            </p>
          </div>
        );
      }

      case 'button': {
        const { buttonText, variant, size, helperText, action, linkUrl } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} flex flex-col items-center justify-center gap-2`}>
            <Button
              variant={variant || 'primary'}
              size={size || (isMobile ? 'md' : 'lg')}
              className="font-semibold px-8 shadow-sm whitespace-nowrap"
              onClick={(e) => {
                e.stopPropagation();
                if (onTriggerAction) {
                  onTriggerAction(action, linkUrl);
                }
              }}
            >
              {buttonText || 'Click Here'}
            </Button>
            {helperText && (
              <span className="text-xs text-inherit/60 tracking-tight">
                {helperText}
              </span>
            )}
          </div>
        );
      }

      case 'image': {
        const { imageUrl, alt, caption, aspectRatio, borderRadius } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} space-y-2`}>
            <div
              className="w-full overflow-hidden shadow-lg border border-[var(--f-border)] bg-[var(--f-surface)]"
              style={{
                aspectRatio: aspectRatio || '16/9',
                borderRadius: borderRadius || '16px',
              }}
            >
              <img
                src={imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80'}
                alt={alt || 'Visual content'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {caption && (
              <p className="text-xs text-inherit/60 text-center italic">
                {caption}
              </p>
            )}
          </div>
        );
      }

      case 'testimonial': {
        const { quote, authorName, authorRole, rating = 5, avatarUrl } = block.content;
        const isAryan = authorName && authorName.toLowerCase().includes('aryan');
        const effectiveAvatar = isAryan ? ARYAN_PROFILE.photoUrl : avatarUrl;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)}`}>
            <Card className="bg-[var(--f-surface)] border border-[var(--f-border)] shadow-md p-6 md:p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <blockquote className={`font-medium text-inherit leading-relaxed italic ${isMobile ? 'text-base' : 'text-lg md:text-xl max-w-2xl'}`}>
                  "{quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-2">
                  <Avatar
                    src={effectiveAvatar}
                    alt={authorName}
                    fallback={authorName?.slice(0, 2)?.toUpperCase() || 'AV'}
                    size="md"
                  />
                  <div className="text-left">
                    <div className="font-bold text-sm text-inherit">
                      {authorName}
                    </div>
                    <div className="text-xs text-inherit/60">
                      {authorRole}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      }

      case 'features': {
        const { sectionTitle, sectionSubtitle, items = [] } = block.content;

        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)}`}>
            <div className="mb-8 space-y-2">
              <h2 className={`font-black tracking-tight text-inherit ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                {sectionTitle}
              </h2>
              <p className={`text-inherit/70 mx-auto max-w-2xl ${isMobile ? 'text-sm' : 'text-base'}`}>
                {sectionSubtitle}
              </p>
            </div>

            <div
              className="grid gap-5 text-left"
              style={{
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              }}
            >
              {items.map((item: any, idx: number) => (
                <Card
                  key={idx}
                  className="bg-[var(--f-surface)] border border-[var(--f-border)] hover:border-[var(--f-accent)]/50 transition-all shadow-xs"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--f-accent)]/10 text-[var(--f-accent)] flex items-center justify-center font-bold text-sm shrink-0">
                        {renderFeatureIcon(item.icon, idx)}
                      </div>
                      {item.badge && (
                        <Badge variant="neutral" className="text-[10px]">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base font-bold text-inherit">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-inherit/75 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      }

      case 'cta': {
        const { badge, headline, description, inputPlaceholder, buttonText } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)}`}>
            <div
              className={`rounded-2xl p-6 md:p-12 shadow-xl border border-white/10 ${
                isMobile ? 'space-y-4' : 'space-y-6'
              }`}
              style={{
                backgroundColor: block.styles.backgroundColor || '#0f172a',
                color: block.styles.textColor || '#ffffff',
              }}
            >
              {badge && (
                <div className="flex justify-center">
                  <Badge variant="neutral" className="bg-white/15 text-white border-white/20 text-xs font-semibold">
                    {badge}
                  </Badge>
                </div>
              )}

              <div className="space-y-2 text-center">
                <h2 className={`font-black tracking-tight text-white ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
                  {headline}
                </h2>
                <p className={`text-white/80 max-w-xl mx-auto ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={inputPlaceholder || 'Enter your email'}
                  className="w-full bg-white text-gray-900 border-none shadow-inner"
                />
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-semibold whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTriggerAction) {
                      onTriggerAction(block.content.buttonAction, '#subscribe');
                    }
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        );
      }

      case 'accordion': {
        const { title, subtitle, items = [] } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} space-y-6`}>
            <div className="space-y-1">
              <h2 className={`font-black tracking-tight text-inherit ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {title}
              </h2>
              {subtitle && <p className="text-sm text-inherit/70">{subtitle}</p>}
            </div>

            <Accordion type="single" collapsible defaultValue="item-0" className="w-full text-left">
              {items.map((item: any, idx: number) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-[var(--f-border)]">
                  <AccordionTrigger className="text-base font-semibold py-4 text-inherit">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-inherit/75 pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      }

      case 'footer': {
        const { brandName, tagline, copyright, links = [] } = block.content;
        return (
          <div className={`mx-auto ${getMaxWidthClass(block.styles.maxWidth)} space-y-6 text-sm text-inherit/75`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <div className="font-extrabold text-base text-inherit">{brandName}</div>
                <div className="text-xs text-inherit/60 mt-0.5">{tagline}</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
                {links.map((link: any, idx: number) => (
                  <span key={idx} className="hover:text-inherit cursor-pointer transition-colors whitespace-nowrap">
                    {link.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--f-border)] pt-4 text-xs text-inherit/50 text-center">
              {copyright}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 text-xs font-mono rounded">
            Component: {block.type}
          </div>
        );
    }
  };

  const isDark = theme.mode === 'dark';

  // Smart color resolution: Prevents text from vanishing when switching between light and dark modes
  const rawTextColor = block.styles.textColor?.trim();
  const isDefaultDarkText =
    !rawTextColor ||
    rawTextColor === 'inherit' ||
    rawTextColor === '#111827' ||
    rawTextColor === '#0f172a' ||
    rawTextColor === '#374151' ||
    rawTextColor === '#1f2937' ||
    rawTextColor === '#64748b';

  const effectiveTextColor = isDark
    ? (isDefaultDarkText ? 'var(--f-fg, #f9fafb)' : rawTextColor)
    : (rawTextColor && rawTextColor !== 'inherit' && rawTextColor !== '#ffffff' ? rawTextColor : 'var(--f-fg, #111827)');

  const rawBgColor = block.styles.backgroundColor?.trim();
  const isDefaultLightBg = rawBgColor === '#ffffff' || rawBgColor === '#f8fafc';
  const effectiveBgColor = isDark
    ? (isDefaultLightBg ? 'transparent' : rawBgColor || 'transparent')
    : (rawBgColor || 'transparent');

  return (
    <div
      style={{
        paddingTop: paddingYStyle,
        paddingBottom: paddingYStyle,
        paddingLeft: paddingXStyle,
        paddingRight: paddingXStyle,
        textAlign: textAlign,
        backgroundColor: effectiveBgColor !== 'transparent' ? effectiveBgColor : undefined,
        color: effectiveTextColor,
      }}
      className={`relative transition-all duration-150 ${
        block.styles.hasBorder ? 'border-b border-[var(--f-border)]' : ''
      }`}
    >
      {renderContent()}
    </div>
  );
};
