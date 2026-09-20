import React, { useState, useEffect } from 'react';
import { BlockType, BlockData, PageTheme, ViewportMode } from '../types';
import {
  Type,
  Image as ImageIcon,
  MousePointerClick,
  MessageSquareQuote,
  LayoutGrid,
  Sparkles,
  ListCollapse,
  Menu,
  FileText,
  AlignEndHorizontal,
  Plus,
  Palette,
  Layers,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Info,
  X,
  GripVertical,
  Edit2,
  Check,
  BookOpen,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { Badge } from '@aryan_sehgal/forma-ui';
import { Tooltip } from './Tooltip';
import { RightSidebar } from './RightSidebar';

export interface LeftSidebarProps {
  onAddBlock: (type: BlockType) => void;
  blocks: BlockData[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onDuplicateBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onReorderBlocks: (startIndex: number, endIndex: number) => void;
  onRenameBlock: (id: string, newName: string) => void;
  onUpdateBlock: (updatedBlock: BlockData) => void;
  onLoadTemplate?: (template: any) => void;
  onClearCanvas: () => void;
  theme: PageTheme;
  onUpdateTheme: (updatedTheme: Partial<PageTheme>) => void;
  viewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  onOpenGuide: () => void;
  onClose?: () => void;
  side?: 'left' | 'right';
}

type TabType = 'blocks' | 'theme' | 'layers';

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  onAddBlock,
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onReorderBlocks,
  onRenameBlock,
  onUpdateBlock,
  onClearCanvas,
  theme,
  onUpdateTheme,
  viewport,
  onViewportChange,
  onOpenGuide,
  onClose,
  side = 'right',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('blocks');
  const [isInspectingBlock, setIsInspectingBlock] = useState<boolean>(false);

  // Drag & drop reorder state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Inline layer rename state
  const [renamingBlockId, setRenamingBlockId] = useState<string | null>(null);
  const [renameInputValue, setRenameInputValue] = useState<string>('');

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  // When block selection changes while on layers tab, open inspector
  useEffect(() => {
    if (selectedBlockId && activeTab === 'layers') {
      setIsInspectingBlock(true);
    }
  }, [selectedBlockId, activeTab]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onReorderBlocks(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const startRenaming = (e: React.MouseEvent, block: BlockData) => {
    e.stopPropagation();
    setRenamingBlockId(block.id);
    setRenameInputValue(block.customName || block.name);
  };

  const saveRename = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (renamingBlockId) {
      const trimmed = renameInputValue.trim();
      onRenameBlock(renamingBlockId, trimmed);
    }
    setRenamingBlockId(null);
  };

  const blockDefinitions: {
    type: BlockType;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
  }[] = [
    {
      type: 'navbar',
      name: 'Navigation Bar',
      description: 'Sticky header with brand logo, links, and responsive CTA',
      icon: Menu,
      badge: 'Header',
    },
    {
      type: 'heading',
      name: 'Hero / Heading',
      description: 'Bold title, subtitle, kicker badge & CTA action buttons',
      icon: Type,
      badge: 'Core',
    },
    {
      type: 'paragraph',
      name: 'Text Section',
      description: 'Editorial article block with headlines and rich body copy',
      icon: FileText,
      badge: 'Text',
    },
    {
      type: 'image',
      name: 'Image Banner',
      description: 'Responsive media with custom aspect ratio & border radius',
      icon: ImageIcon,
      badge: 'Media',
    },
    {
      type: 'button',
      name: 'Button & CTA Action',
      description: 'Forma UI interactive button with variants, sizes & helper text',
      icon: MousePointerClick,
      badge: 'Action',
    },
    {
      type: 'testimonial',
      name: 'Testimonial Card',
      description: 'Customer quote card with avatar, author bio & 5-star rating',
      icon: MessageSquareQuote,
      badge: 'Review',
    },
    {
      type: 'features',
      name: 'Feature Grid',
      description: 'Multi-column cards highlighting key features and perks',
      icon: LayoutGrid,
      badge: 'Grid',
    },
    {
      type: 'cta',
      name: 'Call to Action Banner',
      description: 'High-contrast conversion card with email capture & button',
      icon: Sparkles,
      badge: 'Banner',
    },
    {
      type: 'accordion',
      name: 'Accordion FAQ',
      description: 'Collapsible questions & answers for documentation and FAQs',
      icon: ListCollapse,
      badge: 'FAQ',
    },
    {
      type: 'footer',
      name: 'Page Footer',
      description: 'End-of-page copyright, brand tagline & navigation links',
      icon: AlignEndHorizontal,
      badge: 'Footer',
    },
  ];

  const formaColors = [
    { name: 'Forma Blue', hex: '#3158df' },
    { name: 'Indigo', hex: '#4f46e5' },
    { name: 'Violet', hex: '#7c3aed' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Amber', hex: '#f59e0b' },
    { name: 'Rose', hex: '#f43f5e' },
    { name: 'Cyan', hex: '#06b6d4' },
    { name: 'Neutral Zinc', hex: '#3f3f46' },
  ];

  const radiusPresets = [
    { label: 'Square (0px)', value: '0px' },
    { label: 'Subtle (4px)', value: '4px' },
    { label: 'Standard (8px)', value: '8px' },
    { label: 'Smooth (12px)', value: '12px' },
    { label: 'Round (16px)', value: '16px' },
    { label: 'Pill (9999px)', value: '9999px' },
  ];

  const fontPresets = [
    { label: 'Plus Jakarta Sans (Modern Clean)', value: '"Plus Jakarta Sans", -apple-system, sans-serif' },
    { label: 'Inter (High Legibility)', value: '"Inter", -apple-system, sans-serif' },
    { label: 'System UI (Native OS)', value: 'system-ui, -apple-system, sans-serif' },
    { label: 'Playfair Display (Editorial Serif)', value: '"Playfair Display", Georgia, serif' },
    { label: 'JetBrains Mono (Technical Mono)', value: '"JetBrains Mono", monospace' },
  ];

  const borderClass = side === 'left' ? 'border-r' : 'border-l';

  return (
    <aside className={`w-80 sm:w-88 h-full ${borderClass} border-gray-200 dark:border-[#373d49] bg-white dark:bg-[#17191f] flex flex-col z-10 select-none`}>
      {/* Sidebar Header */}
      <div className="h-12 border-b border-gray-200 dark:border-[#373d49] px-4 flex items-center justify-between shrink-0">
        <span className="font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Page Builder Studio
        </span>
        <div className="flex items-center gap-1">
          <Tooltip content="Open User Guide & Instructions" position="bottom">
            <button
              type="button"
              onClick={onOpenGuide}
              className="p-1 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              aria-label="Open User Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </Tooltip>
          {onClose && (
            <Tooltip content="Close Panel" position="left">
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Tabs Switcher: Blocks | Theme | Layers */}
      <div className="p-2 border-b border-gray-200 dark:border-[#373d49] grid grid-cols-3 gap-1 bg-gray-50/70 dark:bg-[#13151a]">
        <Tooltip content="Components Library" position="bottom">
          <button
            type="button"
            onClick={() => setActiveTab('blocks')}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'blocks'
                ? 'bg-white dark:bg-[#252831] text-gray-900 dark:text-white shadow-xs border border-gray-200/80 dark:border-gray-700/80'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Blocks</span>
          </button>
        </Tooltip>

        <Tooltip content="Website Theme & Tokens" position="bottom">
          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'theme'
                ? 'bg-white dark:bg-[#252831] text-gray-900 dark:text-white shadow-xs border border-gray-200/80 dark:border-gray-700/80'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 shrink-0" />
            <span>Theme</span>
          </button>
        </Tooltip>

        <Tooltip content="Page Layers & Controls" position="bottom">
          <button
            type="button"
            onClick={() => setActiveTab('layers')}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'layers'
                ? 'bg-white dark:bg-[#252831] text-gray-900 dark:text-white shadow-xs border border-gray-200/80 dark:border-gray-700/80'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Layers</span>
            {blocks.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[17px] h-4 px-1 rounded-full text-[10px] font-bold leading-none bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 shrink-0 ml-0.5">
                {blocks.length}
              </span>
            )}
          </button>
        </Tooltip>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* TAB 1: BLOCKS (Click to add) */}
        {activeTab === 'blocks' && (
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
              Click to Add Component
            </div>

            <div className="grid grid-cols-1 gap-2">
              {blockDefinitions.map((item) => {
                const Icon = item.icon;
                return (
                  <Tooltip
                    key={item.type}
                    content={`${item.name} [${item.badge}]: ${item.description}`}
                    position={side === 'right' ? 'left' : 'right'}
                    className="w-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onAddBlock(item.type);
                        setActiveTab('layers');
                        setIsInspectingBlock(true);
                      }}
                      className="w-full text-left group p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 bg-white dark:bg-[#1b1e26] cursor-pointer transition-all duration-150 flex items-start gap-3 relative"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700/80 shrink-0 whitespace-nowrap ml-auto">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  </Tooltip>
                );
              })}
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 px-1 leading-relaxed">
              💡 <span className="font-medium">Tip:</span> Single-click any component to append it directly to your page canvas.
            </div>
          </div>
        )}

        {/* TAB 2: THEME & TOKENS (Scoped to the website being designed) */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
              <div className="flex items-start gap-2 text-xs text-blue-900 dark:text-blue-200">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>
                  These styling tokens and properties are applied directly to the <strong>website you are designing</strong> on the canvas.
                </span>
              </div>
            </div>

            {/* Mode: Light vs Dark */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Website Theme Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateTheme({ mode: 'light' })}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                    theme.mode === 'light'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateTheme({ mode: 'dark' })}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                    theme.mode === 'dark'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* Brand Accent Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Website Accent Color
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {formaColors.map((color) => (
                  <Tooltip key={color.hex} content={color.name} position="top">
                    <button
                      type="button"
                      onClick={() => onUpdateTheme({ accentColor: color.hex })}
                      className={`w-full py-1.5 rounded-md flex flex-col items-center gap-1 border transition-all ${
                        theme.accentColor === color.hex
                          ? 'border-gray-900 dark:border-white ring-2 ring-blue-500/30 font-bold'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] truncate max-w-[50px] text-gray-600 dark:text-gray-400 font-mono">
                        {color.name}
                      </span>
                    </button>
                  </Tooltip>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                  className="w-7 h-7 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                  placeholder="#3158df"
                  className="flex-1 px-2.5 py-1 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            {/* Corner Radius */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Website Component Corner Radius
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {radiusPresets.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => onUpdateTheme({ radius: r.value })}
                    className={`py-1.5 px-2 text-xs font-medium rounded-md border text-left transition-all ${
                      theme.radius === r.value
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Font */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Website Typography Font
              </label>
              <div className="space-y-1">
                {fontPresets.map((font) => (
                  <button
                    key={font.label}
                    type="button"
                    onClick={() => onUpdateTheme({ fontFamily: font.value })}
                    className={`w-full py-1.5 px-2.5 text-xs text-left rounded-md border transition-all ${
                      theme.fontFamily === font.value
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LAYERS */}
        {activeTab === 'layers' && (
          <div className="h-full flex flex-col">
            {isInspectingBlock && selectedBlock ? (
              <div className="-m-3 h-full flex flex-col overflow-hidden">
                <RightSidebar
                  embedded={true}
                  selectedBlock={selectedBlock}
                  onUpdateBlock={onUpdateBlock}
                  onDeselect={() => {
                    onSelectBlock(null);
                    setIsInspectingBlock(false);
                  }}
                  onBackToLayers={() => {
                    setIsInspectingBlock(false);
                  }}
                  onDeleteBlock={(id) => {
                    onDeleteBlock(id);
                    setIsInspectingBlock(false);
                  }}
                  onDuplicateBlock={onDuplicateBlock}
                  onMoveBlock={onMoveBlock}
                  onRenameBlock={onRenameBlock}
                  allBlocks={blocks}
                  onSelectBlock={(id) => {
                    onSelectBlock(id);
                    setIsInspectingBlock(true);
                  }}
                  viewport={viewport}
                  onViewportChange={onViewportChange}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Header with Title & Clear All */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Layers Flow ({blocks.length})
                  </span>
                  {blocks.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCanvas}
                      className="text-[11px] font-medium text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {/* Helpful tip */}
                {blocks.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0 text-blue-500 mt-0.5" />
                    <div>
                      <strong>Draggable Layers:</strong> Drag items to reorder page sections. Click any layer to open its controls & customize.
                    </div>
                  </div>
                )}

                {blocks.length === 0 ? (
                  <div className="p-6 text-center space-y-3 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-[#15171d]">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        No layers yet
                      </div>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-[200px] mx-auto">
                        Click any component in the Blocks tab to start building!
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('blocks')}
                      className="text-xs"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Component
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {blocks.map((b, idx) => {
                      const isSelected = b.id === selectedBlockId;
                      const isDragging = draggedIndex === idx;
                      const isDragOver = dragOverIndex === idx;
                      const isRenaming = renamingBlockId === b.id;

                      return (
                        <div
                          key={b.id}
                          draggable={!isRenaming}
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragEnd={handleDragEnd}
                          onClick={() => {
                            if (!isRenaming) {
                              onSelectBlock(b.id);
                              setIsInspectingBlock(true);
                            }
                          }}
                          className={`group flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                            isDragging
                              ? 'opacity-40 border-dashed border-blue-500 bg-blue-50/20'
                              : isDragOver
                              ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30'
                              : isSelected
                              ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-[#1a1d24] text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {/* Left: Drag Handle, Number Badge, and Name */}
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <Tooltip content="Drag to reorder" position="top">
                              <div
                                className="p-1 text-gray-300 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <GripVertical className="w-3.5 h-3.5" />
                              </div>
                            </Tooltip>

                            <span className="w-5 h-5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center text-[10px] font-mono shrink-0 font-bold">
                              {idx + 1}
                            </span>

                            {isRenaming ? (
                              <form
                                onSubmit={saveRename}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 flex-1 min-w-0"
                              >
                                <input
                                  type="text"
                                  autoFocus
                                  value={renameInputValue}
                                  onChange={(e) => setRenameInputValue(e.target.value)}
                                  onBlur={() => saveRename()}
                                  className="flex-1 px-1.5 py-0.5 text-xs rounded border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <button
                                  type="submit"
                                  className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                                  title="Save"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRenamingBlockId(null);
                                  }}
                                  className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                  title="Cancel"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </form>
                            ) : (
                              <div className="flex items-center gap-1.5 min-w-0 truncate">
                                <span className="truncate font-semibold text-gray-900 dark:text-white">
                                  {b.customName || b.name}
                                </span>
                                {b.customName && (
                                  <span className="text-[9px] px-1 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 font-mono capitalize shrink-0">
                                    {b.type}
                                  </span>
                                )}
                                <Tooltip content="Rename layer" position="top">
                                  <button
                                    type="button"
                                    onClick={(e) => startRenaming(e, b)}
                                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-opacity"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                </Tooltip>
                              </div>
                            )}
                          </div>

                          {/* Right Action buttons */}
                          <div className="flex items-center gap-0.5 shrink-0 ml-1" onClick={(e) => e.stopPropagation()}>
                            <Tooltip content="Move Up" position="top">
                              <button
                                type="button"
                                onClick={() => onMoveBlock(b.id, 'up')}
                                disabled={idx === 0}
                                className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                            </Tooltip>

                            <Tooltip content="Move Down" position="top">
                              <button
                                type="button"
                                onClick={() => onMoveBlock(b.id, 'down')}
                                disabled={idx === blocks.length - 1}
                                className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </Tooltip>

                            <Tooltip content="Duplicate" position="top">
                              <button
                                type="button"
                                onClick={() => onDuplicateBlock(b.id)}
                                className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </Tooltip>

                            <Tooltip content="Delete" position="top">
                              <button
                                type="button"
                                onClick={() => onDeleteBlock(b.id)}
                                className="p-1 rounded text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </Tooltip>

                            <Tooltip content="Edit Controls" position="top">
                              <button
                                type="button"
                                onClick={() => {
                                  onSelectBlock(b.id);
                                  setIsInspectingBlock(true);
                                }}
                                className="p-1 rounded text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar Footer with User Guide Link */}
      <div className="p-2.5 border-t border-gray-200 dark:border-[#373d49] bg-gray-50/50 dark:bg-[#13151a] flex items-center justify-between gap-2 shrink-0 text-xs">
        <button
          type="button"
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          <span>User Guide & Instructions</span>
        </button>
        <span className="text-[10px] text-gray-400 font-mono">Forma Studio</span>
      </div>
    </aside>
  );
};
