import React, { useState, useRef, useEffect } from 'react';
import { BlockData, ViewportMode, PageTheme, BlockType, ButtonAction } from '../types';
import { BlockRenderer } from './blocks/BlockRenderer';
import {
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Wifi,
  Battery,
  Sparkles,
  Sliders,
  ZoomIn,
  ZoomOut,
  Maximize2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { Tooltip } from './Tooltip';

interface CanvasProps {
  blocks: BlockData[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onDuplicateBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onAddBlockAtIndex: (type: BlockType, index: number) => void;
  viewport: ViewportMode;
  theme: PageTheme;
  isPreviewMode: boolean;
  onLoadTemplate: (templateId: string) => void;
  onOpenGuide?: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  viewport,
  theme,
  isPreviewMode,
  onLoadTemplate,
  onOpenGuide,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [artboardHeight, setArtboardHeight] = useState<number>(750);
  const [zoomMode, setZoomMode] = useState<'fit' | number>('fit');

  // Monitor canvas container dimensions
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();

    const ro = new ResizeObserver(() => updateSize());
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Monitor artboard content height to prevent vertical blank space when scaled down
  useEffect(() => {
    if (!artboardRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setArtboardHeight(entry.contentRect.height);
        }
      }
    });
    ro.observe(artboardRef.current);
    return () => ro.disconnect();
  }, [blocks, viewport]);

  // Target fixed artboard widths for each viewport standard
  const targetWidth = viewport === 'mobile' ? 375 : viewport === 'tablet' ? 768 : 1200;

  // Auto-fit calculation: calculate scale needed to fit within the available canvas width
  const paddingHoriz = 48;
  const availableWidth = Math.max(300, containerWidth - paddingHoriz);
  const autoScale = availableWidth < targetWidth ? Math.min(1, Math.max(0.3, availableWidth / targetWidth)) : 1;

  // Effective scale
  const effectiveScale = zoomMode === 'fit' ? autoScale : zoomMode / 100;
  const isZoomedOut = effectiveScale < 0.99;

  return (
    <main
      ref={containerRef}
      onClick={(e) => {
        // Deselect if clicking directly on empty workspace canvas
        if (e.target === e.currentTarget) {
          onSelectBlock(null);
        }
      }}
      className="flex-1 w-full overflow-y-auto overflow-x-auto p-3 sm:p-5 md:p-6 pb-28 lg:pb-8 flex flex-col items-center justify-start canvas-checkerboard bg-gray-100/90 dark:bg-[#12141a] select-none relative"
    >
      {/* Top Canvas Bar: Viewport Details + Responsive Zoom Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono w-full max-w-[1240px] px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider hidden sm:inline">Viewport:</span>
          <span className="font-bold text-gray-800 dark:text-gray-200 uppercase bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 shadow-2xs">
            {viewport} ({targetWidth}px)
          </span>

          {isZoomedOut && (
            <span className="text-[11px] font-sans font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <span>Zoomed to {Math.round(effectiveScale * 100)}% to fit workspace</span>
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-2xs font-sans">
          <Tooltip content="Auto-fit to available workspace width" position="bottom">
            <button
              type="button"
              onClick={() => setZoomMode('fit')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center gap-1 ${
                zoomMode === 'fit'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fit ({Math.round(autoScale * 100)}%)</span>
            </button>
          </Tooltip>

          {[100, 75, 50].map((level) => (
            <Tooltip key={level} content={`Set canvas scale to ${level}%`} position="bottom">
              <button
                type="button"
                onClick={() => setZoomMode(level)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-all ${
                  zoomMode === level
                    ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {level}%
              </button>
            </Tooltip>
          ))}

          <div className="w-[1px] h-3.5 bg-gray-200 dark:bg-gray-700 mx-0.5" />

          <Tooltip content="Zoom Out (-10%)" position="bottom">
            <button
              type="button"
              onClick={() => {
                const current = typeof zoomMode === 'number' ? zoomMode : Math.round(autoScale * 100);
                setZoomMode(Math.max(30, current - 10));
              }}
              className="p-1 rounded text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </Tooltip>

          <Tooltip content="Zoom In (+10%)" position="bottom">
            <button
              type="button"
              onClick={() => {
                const current = typeof zoomMode === 'number' ? zoomMode : Math.round(autoScale * 100);
                setZoomMode(Math.min(150, current + 10));
              }}
              className="p-1 rounded text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Outer Scaled Artboard Wrapper */}
      <div
        className="relative flex justify-center items-start w-full transition-all duration-150"
        style={{
          height: effectiveScale < 1 ? `${Math.ceil(artboardHeight * effectiveScale)}px` : 'auto',
          minHeight: effectiveScale < 1 ? `${Math.ceil(artboardHeight * effectiveScale)}px` : undefined,
        }}
      >
        {/* Scaled Artboard Container */}
        <div
          ref={artboardRef}
          style={{
            width: `${targetWidth}px`,
            maxWidth: `${targetWidth}px`,
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top center',
          }}
          className="transition-transform duration-150 origin-top shrink-0"
        >
          {/* Mobile Phone Device Bezel (Mobile Viewport) */}
          {viewport === 'mobile' ? (
            <div className="rounded-[44px] p-3.5 bg-gray-950 shadow-2xl ring-12 ring-gray-800/80 mx-auto">
              {/* Phone Speaker & Dynamic Island */}
              <div className="flex items-center justify-between px-6 pt-1 pb-2 text-white text-[11px] font-semibold select-none">
                <span>9:41</span>
                <div className="w-20 h-4 bg-black rounded-full mx-auto -mt-0.5" />
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Inner Mobile Screen with Scoped Website Theme */}
              <div
                id="forma-website-canvas"
                data-f-theme={theme.mode}
                className={`rounded-[32px] overflow-hidden min-h-[640px] shadow-inner transition-colors duration-200 select-text ${
                  theme.mode === 'dark' ? 'dark bg-[#0b0f19] text-[#f9fafb]' : 'bg-white text-[#111827]'
                }`}
                style={{
                  '--f-accent': theme.accentColor,
                  '--f-accent-hover': theme.accentColor,
                  '--f-radius': theme.radius,
                  '--f-font': theme.fontFamily,
                  fontFamily: theme.fontFamily,
                  backgroundColor: theme.mode === 'dark' ? '#0b0f19' : '#ffffff',
                  color: theme.mode === 'dark' ? '#f9fafb' : '#111827',
                } as React.CSSProperties}
              >
                {renderCanvasContent()}
              </div>

              {/* Home Indicator Bar */}
              <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mt-2.5 mb-1" />
            </div>
          ) : (
            /* Tablet / Desktop Artboard Card with Scoped Website Theme */
            <div
              id="forma-website-canvas"
              data-f-theme={theme.mode}
              className={`rounded-xl shadow-2xl border transition-colors duration-200 overflow-hidden min-h-[700px] select-text ${
                theme.mode === 'dark'
                  ? 'dark bg-[#0b0f19] text-[#f9fafb] border-gray-800/80'
                  : 'bg-white text-[#111827] border-gray-200/90'
              }`}
              style={{
                '--f-accent': theme.accentColor,
                '--f-accent-hover': theme.accentColor,
                '--f-radius': theme.radius,
                '--f-font': theme.fontFamily,
                fontFamily: theme.fontFamily,
                backgroundColor: theme.mode === 'dark' ? '#0b0f19' : '#ffffff',
                color: theme.mode === 'dark' ? '#f9fafb' : '#111827',
              } as React.CSSProperties}
            >
              {renderCanvasContent()}
            </div>
          )}
        </div>
      </div>
    </main>
  );

  function renderCanvasContent() {
    if (blocks.length === 0) {
      return (
        <div className="py-20 px-6 max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 ring-4 ring-blue-500/10">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Bring your idea to life
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
                Welcome to your clean canvas. Choose components from the <strong className="text-gray-800 dark:text-gray-200">Blocks</strong> panel on the right, or kickstart your project with a starter flow below.
              </p>
            </div>
          </div>

          {/* Quick Starter Templates & Guide Action */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onLoadTemplate('template_core')}
              className="shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Load Essential Blocks Flow
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onLoadTemplate('template_showcase')}
            >
              Load SaaS Showcase
            </Button>
            {onOpenGuide && (
              <Button
                variant="outline"
                size="md"
                onClick={onOpenGuide}
                className="text-gray-700 dark:text-gray-300"
              >
                <BookOpen className="w-4 h-4 mr-1.5 text-blue-500" />
                Read User Guide
              </Button>
            )}
          </div>

          {/* Three-step onboarding visual guide cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left border-t border-gray-100 dark:border-gray-800">
            <div className="p-3.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold font-mono mb-2">
                1
              </div>
              <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">
                Add Components
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                Click any section in the Blocks tab: Hero, Navbar, Features, Pricing, or FAQ.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold font-mono mb-2">
                2
              </div>
              <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">
                Manage Layers
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                Drag layers to reorder your page flow, and rename sections with custom labels.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold font-mono mb-2">
                3
              </div>
              <div className="font-bold text-xs text-gray-900 dark:text-white mb-1">
                Customize Controls
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                Click any layer in the sidebar to open its controls: edit text, images & colors.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative min-h-[600px]">
        {blocks.map((block) => {
          const isSelected = block.id === selectedBlockId;

          return (
            <div
              key={block.id}
              className={`relative transition-all ${
                !isPreviewMode && isSelected
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-sm'
                  : ''
              }`}
            >
              {/* Clean canvas rendering - all controls and interactions are managed from the unified Layers panel */}
              <BlockRenderer
                block={block}
                viewport={viewport}
                theme={theme}
                isSelected={!isPreviewMode && isSelected}
                isInteractivePreview={isPreviewMode}
              />
            </div>
          );
        })}
      </div>
    );
  }
};
