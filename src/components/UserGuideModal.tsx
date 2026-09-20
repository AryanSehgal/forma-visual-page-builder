import React from 'react';
import {
  X,
  PlusCircle,
  Layers,
  Edit3,
  Sliders,
  Palette,
  Eye,
  Download,
  GripVertical,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { Badge } from '@aryan_sehgal/forma-ui';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBlocksTab?: () => void;
  onLoadTemplate?: (templateId: string) => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenBlocksTab,
  onLoadTemplate,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Add Sections to Your Page',
      icon: PlusCircle,
      badge: 'Blocks Tab',
      description:
        'Explore 10+ modular blocks including Navigation Bars, Hero Headings, Feature Grids, Image Banners, Testimonials, FAQ Accordions, and Footers. Click any block in the right sidebar to add it to your canvas.',
    },
    {
      step: 2,
      title: 'Drag & Drop to Reorder Layers',
      icon: GripVertical,
      badge: 'Layers Tab',
      description:
        'Switch to the Layers tab to see your entire page structure. Drag any layer up or down using the grip handle, or use the quick arrow buttons to reorder sections effortlessly.',
    },
    {
      step: 3,
      title: 'Give Layers Custom Names',
      icon: Edit3,
      badge: 'Organization',
      description:
        'Never get confused between multiple banners or text sections! Click the pencil icon on any layer to assign a custom label like "Main Hero", "Summer Promo", or "Pricing FAQ".',
    },
    {
      step: 4,
      title: 'Customize Controls in One Place',
      icon: Sliders,
      badge: 'Combined Inspector',
      description:
        'Click on any layer to open its full control panel right in the sidebar. Edit headlines, paragraphs, button links, image URLs, responsive padding, and colors. Use the Next/Previous buttons or back button to navigate between sections.',
    },
    {
      step: 5,
      title: 'Brand Styling & Global Theme',
      icon: Palette,
      badge: 'Theme Tab',
      description:
        'Customize your brand identity in the Theme tab. Toggle between Dark & Light modes, pick custom accent colors, set corner radiuses, and choose typography font pairings.',
    },
    {
      step: 6,
      title: 'Multi-Device Preview & Export',
      icon: Download,
      badge: 'Production Ready',
      description:
        'Test your layout across Desktop (1200px), Tablet (768px), and Mobile (375px) artboards. Click "Export Website" at any time to download clean, standalone HTML/CSS/JS code or JSON backup.',
    },
  ];

  return (
    <div
      id="user-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div
        id="user-guide-modal-container"
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#1a1d24] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#373d49] flex flex-col overflow-hidden text-gray-900 dark:text-[#edf0f5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#373d49] flex items-center justify-between gap-3 bg-gray-50/70 dark:bg-[#14161c] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                How to Build with Forma
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                A simple guide to creating, organizing, and styling your website
              </p>
            </div>
          </div>

          <button
            id="user-guide-close-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close user guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Step Guide */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#20232b] flex flex-col justify-between space-y-2 cursor-default select-text"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {item.step}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                        {item.title}
                      </span>
                    </div>
                    <Badge variant="neutral" className="text-[10px] shrink-0">
                      {item.badge}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Keyboard Shortcuts & Pro Tips */}
          <div className="mt-4 p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Pro Tips & Keyboard Shortcuts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[11px] font-mono shadow-2xs font-semibold">
                  Ctrl+Z
                </kbd>
                <span>Undo changes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[11px] font-mono shadow-2xs font-semibold">
                  Ctrl+Y
                </kbd>
                <span>Redo changes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[11px] font-mono shadow-2xs font-semibold">
                  Escape
                </kbd>
                <span>Back to layers list</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[#373d49] flex items-center justify-between gap-3 bg-gray-50/70 dark:bg-[#14161c] shrink-0">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Forma Visual Page Builder
          </span>

          <div className="flex items-center gap-2">
            {onOpenBlocksTab && (
              <Button
                id="guide-add-blocks-btn"
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenBlocksTab();
                }}
              >
                Add Sections
              </Button>
            )}
            <Button
              id="guide-got-it-btn"
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              Got it, let&apos;s build!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
