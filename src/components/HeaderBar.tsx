import React from 'react';
import { ViewportMode, PageTheme } from '../types';
import { FormaLogo } from './FormaLogo';
import { ARYAN_PROFILE } from '../utils/aryanProfile';
import { Button } from '@aryan_sehgal/forma-ui';
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Download,
  PanelRight,
  LayoutGrid,
  Layers,
  Sliders,
  Sun,
  Moon,
  BookOpen,
} from 'lucide-react';
import { Tooltip } from './Tooltip';

interface HeaderBarProps {
  viewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onOpenExport: () => void;
  onClearCanvas?: () => void;
  blockCount?: number;
  theme: PageTheme;
  onToggleThemeMode: () => void;
  isPanelOpen: boolean;
  onTogglePanel: () => void;
  hasSelectedBlock?: boolean;
  onOpenGuide?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  viewport,
  onViewportChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isPreviewMode,
  onTogglePreview,
  onOpenExport,
  theme,
  onToggleThemeMode,
  isPanelOpen,
  onTogglePanel,
  onOpenGuide,
}) => {
  return (
    <header className="h-14 border-b border-gray-200 dark:border-[#373d49] bg-white dark:bg-[#17191f] px-2.5 sm:px-4 flex items-center justify-between gap-2 z-30 shrink-0 select-none">
      {/* Left: Branding & Creator Attribution */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Forma Visual Page Builder Logo & Title */}
        <div className="flex items-center gap-2 shrink-0">
          <FormaLogo size={26} />
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white whitespace-nowrap">
              Forma
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white hidden sm:inline whitespace-nowrap">
              Builder
            </span>
          </div>
        </div>

        {/* Creator Attribution to Aryan Sehgal */}
        <Tooltip content="Visit Aryan Sehgal's GitHub Profile" position="bottom">
          <div className="hidden md:flex items-center gap-1.5 pl-2.5 border-l border-gray-200 dark:border-gray-700 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 shrink-0">
            <span className="hidden lg:inline">by</span>
            <a
              href={ARYAN_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1.5 transition-colors group"
            >
              <img
                src={ARYAN_PROFILE.photoUrl}
                alt={ARYAN_PROFILE.name}
                className="w-5 h-5 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-600 group-hover:ring-blue-500 transition-all shadow-2xs shrink-0"
              />
              <span className="group-hover:underline whitespace-nowrap">{ARYAN_PROFILE.name}</span>
            </a>
          </div>
        </Tooltip>
      </div>

      {/* Center: Viewport Switcher & Undo/Redo */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Undo / Redo */}
        <div className="hidden lg:flex items-center bg-gray-100 dark:bg-[#20232b] rounded-lg p-0.5 border border-gray-200 dark:border-[#373d49] shrink-0">
          <Tooltip content="Undo last change (Ctrl+Z)" position="bottom">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#2e333e] transition-colors"
              aria-label="Undo"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
          </Tooltip>

          <Tooltip content="Redo change (Ctrl+Y)" position="bottom">
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-[#2e333e] transition-colors"
              aria-label="Redo"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
        </div>

        {/* Viewport Modes */}
        <div className="flex items-center bg-gray-100 dark:bg-[#20232b] rounded-lg p-0.5 border border-gray-200 dark:border-[#373d49] shrink-0">
          <Tooltip content="Desktop Viewport (1200px artboard with auto-fit zoom)" position="bottom">
            <button
              type="button"
              onClick={() => onViewportChange('desktop')}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewport === 'desktop'
                  ? 'bg-white dark:bg-[#2e333e] text-gray-900 dark:text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
              aria-label="Desktop viewport"
            >
              <Monitor className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Desktop</span>
            </button>
          </Tooltip>

          <Tooltip content="Tablet Viewport (768px iPad screen)" position="bottom">
            <button
              type="button"
              onClick={() => onViewportChange('tablet')}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewport === 'tablet'
                  ? 'bg-white dark:bg-[#2e333e] text-gray-900 dark:text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
              aria-label="Tablet viewport"
            >
              <Tablet className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Tablet</span>
            </button>
          </Tooltip>

          <Tooltip content="Mobile Viewport (375px iPhone screen)" position="bottom">
            <button
              type="button"
              onClick={() => onViewportChange('mobile')}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewport === 'mobile'
                  ? 'bg-white dark:bg-[#2e333e] text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
              aria-label="Mobile viewport"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Mobile</span>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Right: Website Theme Toggle, Inspector Toggle, Preview Mode & Export */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Website Dark/Light mode toggle */}
        <Tooltip
          content={`Website Theme: Switch to ${theme.mode === 'light' ? 'Dark' : 'Light'} Mode`}
          position="bottom"
        >
          <button
            type="button"
            onClick={onToggleThemeMode}
            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors shrink-0 ${
              theme.mode === 'dark'
                ? 'border-blue-600/60 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
            }`}
            aria-label="Toggle website theme mode"
          >
            {theme.mode === 'light' ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>
        </Tooltip>

        {/* Right: Block Components Panel Toggle */}
        {!isPreviewMode && (
          <Tooltip
            content={isPanelOpen ? 'Hide Block Components & Studio Panel' : 'Open Block Components, Layers & Theme'}
            position="bottom"
          >
            <button
              type="button"
              onClick={onTogglePanel}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors shrink-0 ${
                isPanelOpen
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Toggle Block Components Panel"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Blocks & Studio</span>
              <PanelRight className="w-3.5 h-3.5 opacity-70 hidden md:inline" />
            </button>
          </Tooltip>
        )}

        {/* User Guide Button */}
        {onOpenGuide && (
          <Tooltip content="Open Builder User Guide & Documentation" position="bottom">
            <button
              type="button"
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors shrink-0"
              aria-label="Open User Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">User Guide</span>
            </button>
          </Tooltip>
        )}

        {/* Preview Mode Toggle */}
        <Tooltip
          content={isPreviewMode ? 'Return to Editor Mode' : 'Live Interactive Preview (Hides editor tools)'}
          position="bottom"
        >
          <button
            type="button"
            onClick={onTogglePreview}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
              isPreviewMode
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#20232b] text-gray-700 dark:text-gray-300'
            }`}
            aria-label="Toggle Preview Mode"
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </button>
        </Tooltip>

        {/* Export Website Files Action */}
        <Tooltip content="Export clean HTML, CSS & JavaScript website bundle" position="bottom">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenExport}
            className="shadow-2xs font-semibold flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export Website</span>
            <span className="md:hidden">Export</span>
          </Button>
        </Tooltip>
      </div>
    </header>
  );
};
