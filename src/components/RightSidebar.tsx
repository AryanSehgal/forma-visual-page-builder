import React, { useState, useEffect } from 'react';
import { BlockData, ViewportMode, ResponsiveSettings } from '../types';
import {
  Sliders,
  Type,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Monitor,
  Info,
  Layers,
  FileText,
  Move,
  Plus,
  Link,
  Star,
  Image as ImageIcon,
  Check,
  HelpCircle,
  ArrowLeft,
  Edit2,
} from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { Badge } from '@aryan_sehgal/forma-ui';
import { Tooltip } from './Tooltip';
import { ARYAN_PROFILE } from '../utils/aryanProfile';
import { ButtonActionEditor } from './ButtonActionEditor';

export interface RightSidebarProps {
  selectedBlock: BlockData | null;
  onUpdateBlock: (updatedBlock: BlockData) => void;
  onDeselect: () => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  viewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  onClose?: () => void;
  // Unified Layers Inspector Props
  embedded?: boolean;
  onBackToLayers?: () => void;
  onRenameBlock?: (id: string, newName: string) => void;
  allBlocks?: BlockData[];
  onSelectBlock?: (id: string) => void;
}

type InspectorTab = 'content' | 'spacing' | 'style';

export const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedBlock,
  onUpdateBlock,
  onDeselect,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  viewport,
  onViewportChange,
  onClose,
  embedded = false,
  onBackToLayers,
  onRenameBlock,
  allBlocks,
  onSelectBlock,
}) => {
  // Default to 'content' so users immediately see editable fields for their component
  const [activeTab, setActiveTab] = useState<InspectorTab>('content');
  const [editingBreakpoint, setEditingBreakpoint] = useState<'desktop' | 'mobile'>(
    viewport === 'mobile' ? 'mobile' : 'desktop'
  );
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState('');

  // Sync editing breakpoint if viewport changes
  useEffect(() => {
    if (viewport === 'mobile') {
      setEditingBreakpoint('mobile');
    } else {
      setEditingBreakpoint('desktop');
    }
  }, [viewport]);

  // When block selection changes, ensure user is on content tab for instant editing
  useEffect(() => {
    if (selectedBlock?.id) {
      setActiveTab('content');
      setIsRenaming(false);
      setRenameVal(selectedBlock.customName || selectedBlock.name);
    }
  }, [selectedBlock?.id, selectedBlock?.name, selectedBlock?.customName]);

  const handleSaveRename = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedBlock) return;
    const trimmed = renameVal.trim();
    if (onRenameBlock) {
      onRenameBlock(selectedBlock.id, trimmed || selectedBlock.name);
    }
    setIsRenaming(false);
  };

  if (!selectedBlock) {
    return (
      <aside className="w-80 border-l border-gray-200 dark:border-[#373d49] bg-white dark:bg-[#17191f] flex flex-col shrink-0 z-20 select-none p-6 text-center justify-center items-center">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#20232b] text-gray-400 dark:text-gray-500 flex items-center justify-center mb-3">
          <Sliders className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-sm text-gray-800 dark:text-[#edf0f5] mb-1">
          Block Inspector
        </h3>
        <p className="text-xs text-gray-500 dark:text-[#a3aaba] max-w-[220px] leading-relaxed">
          Select any component on the page canvas to edit its text, images, responsive spacing, and colors.
        </p>
      </aside>
    );
  }

  const currentResponsive: ResponsiveSettings =
    editingBreakpoint === 'mobile'
      ? selectedBlock.styles.mobile
      : selectedBlock.styles.desktop;

  const updateResponsive = (updates: Partial<ResponsiveSettings>) => {
    const updated = {
      ...selectedBlock,
      styles: {
        ...selectedBlock.styles,
        [editingBreakpoint]: {
          ...currentResponsive,
          ...updates,
        },
      },
    };
    onUpdateBlock(updated);
  };

  const updateContent = (key: string, value: any) => {
    onUpdateBlock({
      ...selectedBlock,
      content: {
        ...selectedBlock.content,
        [key]: value,
      },
    });
  };

  const updateStyles = (updates: Partial<typeof selectedBlock.styles>) => {
    onUpdateBlock({
      ...selectedBlock,
      styles: {
        ...selectedBlock.styles,
        ...updates,
      },
    });
  };

  const colorPresets = [
    { label: 'Transparent', value: 'transparent' },
    { label: 'White', value: '#ffffff' },
    { label: 'Off-White', value: '#f8fafc' },
    { label: 'Surface Gray', value: '#f1f5f9' },
    { label: 'Dark Slate', value: '#0f172a' },
    { label: 'Forma Accent', value: 'var(--f-accent, #3158df)' },
  ];

  const currentIndex = allBlocks ? allBlocks.findIndex((b) => b.id === selectedBlock.id) : -1;
  const canMoveUp = currentIndex > 0;
  const canMoveDown = allBlocks ? currentIndex < allBlocks.length - 1 : false;

  const content = (
    <>
      {/* Inspector Header */}
      {embedded ? (
        <div className="border-b border-gray-200 dark:border-[#373d49] bg-gray-50/70 dark:bg-[#14161c]">
          {/* Top Bar: Back to All Layers + Action Buttons */}
          <div className="p-2.5 flex items-center justify-between gap-2 border-b border-gray-200/70 dark:border-gray-800">
            <button
              type="button"
              onClick={onBackToLayers}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>All Layers</span>
            </button>

            <div className="flex items-center gap-0.5">
              <Tooltip content="Move Section Up" position="bottom">
                <button
                  type="button"
                  disabled={!canMoveUp}
                  onClick={() => onMoveBlock(selectedBlock.id, 'up')}
                  className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </Tooltip>

              <Tooltip content="Move Section Down" position="bottom">
                <button
                  type="button"
                  disabled={!canMoveDown}
                  onClick={() => onMoveBlock(selectedBlock.id, 'down')}
                  className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-20 transition-colors"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </Tooltip>

              <Tooltip content="Duplicate Section" position="bottom">
                <button
                  type="button"
                  onClick={() => onDuplicateBlock(selectedBlock.id)}
                  className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </Tooltip>

              <Tooltip content="Delete Section" position="bottom">
                <button
                  type="button"
                  onClick={() => onDeleteBlock(selectedBlock.id)}
                  className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Section Name with Inline Rename & Section Jumper */}
          <div className="px-3 py-2 flex items-center justify-between gap-2">
            {isRenaming ? (
              <form onSubmit={handleSaveRename} className="flex items-center gap-1.5 flex-1">
                <input
                  type="text"
                  autoFocus
                  value={renameVal}
                  onChange={(e) => setRenameVal(e.target.value)}
                  placeholder="Enter custom layer name..."
                  className="flex-1 px-2 py-1 text-xs font-semibold rounded border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs"
                  title="Save Name"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsRenaming(false)}
                  className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between w-full gap-2 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {selectedBlock.customName || selectedBlock.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setRenameVal(selectedBlock.customName || selectedBlock.name);
                        setIsRenaming(true);
                      }}
                      className="p-0.5 rounded text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Rename this layer"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono capitalize">
                    {selectedBlock.type} section {currentIndex >= 0 ? `(#${currentIndex + 1})` : ''}
                  </div>
                </div>

                {/* Prev / Next section quick navigation */}
                {allBlocks && allBlocks.length > 1 && (
                  <div className="flex items-center gap-1 shrink-0">
                    <Tooltip content="Previous Layer" position="bottom">
                      <button
                        type="button"
                        disabled={currentIndex <= 0}
                        onClick={() => onSelectBlock && onSelectBlock(allBlocks[currentIndex - 1].id)}
                        className="p-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-20"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    <span className="text-[10px] font-mono text-gray-400">
                      {currentIndex + 1}/{allBlocks.length}
                    </span>
                    <Tooltip content="Next Layer" position="bottom">
                      <button
                        type="button"
                        disabled={currentIndex >= allBlocks.length - 1}
                        onClick={() => onSelectBlock && onSelectBlock(allBlocks[currentIndex + 1].id)}
                        className="p-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-20"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 border-b border-gray-200 dark:border-[#373d49] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950 text-[var(--f-accent)] flex items-center justify-center font-bold text-xs shrink-0">
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                {selectedBlock.customName || selectedBlock.name}
              </div>
              <div className="text-[10px] text-gray-400 capitalize font-mono">
                {selectedBlock.type} component
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Tooltip content="Duplicate Component" position="bottom">
              <button
                type="button"
                onClick={() => onDuplicateBlock(selectedBlock.id)}
                className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Duplicate component"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </Tooltip>

            <Tooltip content="Delete Component" position="bottom">
              <button
                type="button"
                onClick={() => onDeleteBlock(selectedBlock.id)}
                className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                aria-label="Delete component"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </Tooltip>

            <Tooltip content="Close Inspector Panel" position="bottom">
              <button
                type="button"
                onClick={() => {
                  onDeselect();
                  if (onClose) onClose();
                }}
                className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ml-0.5 transition-colors"
                aria-label="Close inspector"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Tab Switcher - Content is FIRST per user expectation */}
      <div className="flex border-b border-gray-200 dark:border-[#373d49] px-2 bg-gray-50/50 dark:bg-[#1a1d24]">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'content'
              ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Edit Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('spacing')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'spacing'
              ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span>Layout</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'style'
              ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Style</span>
        </button>
      </div>

      {/* Active Tab Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* =========================================================================
            TAB 1: CONTENT EDITING (Full editing for all 10 component types)
           ========================================================================= */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* Header description */}
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Update text, images, and links for this {selectedBlock.type} component:
            </div>

            {/* --- 1. HEADING / HERO --- */}
            {selectedBlock.type === 'heading' && (
              <div className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Kicker Badge
                    </label>
                    <button
                      type="button"
                      onClick={() => updateContent('showBadge', !selectedBlock.content.showBadge)}
                      className="text-[10px] text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      {selectedBlock.content.showBadge !== false ? 'Hide Badge' : 'Show Badge'}
                    </button>
                  </div>
                  {selectedBlock.content.showBadge !== false && (
                    <input
                      type="text"
                      value={selectedBlock.content.badge || ''}
                      onChange={(e) => updateContent('badge', e.target.value)}
                      placeholder="e.g. Powered by Forma UI"
                      className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-[var(--f-accent)]"
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Headline Title
                  </label>
                  <textarea
                    rows={2}
                    value={selectedBlock.content.title || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    placeholder="Enter main headline..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-[var(--f-accent)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Subtitle Description
                  </label>
                  <textarea
                    rows={3}
                    value={selectedBlock.content.subtitle || ''}
                    onChange={(e) => updateContent('subtitle', e.target.value)}
                    placeholder="Supporting paragraph..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-[var(--f-accent)]"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="font-semibold text-xs text-gray-900 dark:text-white">
                    Primary CTA Button
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.content.primaryCtaText || ''}
                        onChange={(e) => updateContent('primaryCtaText', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                        Variant
                      </label>
                      <select
                        value={selectedBlock.content.primaryCtaVariant || 'primary'}
                        onChange={(e) => updateContent('primaryCtaVariant', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="primary">Primary (Accent)</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <ButtonActionEditor
                      label="Primary Button Action"
                      action={selectedBlock.content.primaryAction}
                      onChange={(act) => updateContent('primaryAction', act)}
                      availableBlocks={(allBlocks || []).filter((b) => b.id !== selectedBlock.id)}
                      defaultUrl="https://forma-design-system-docs.vercel.app"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900 dark:text-white">
                      Secondary Button
                    </span>
                    <button
                      type="button"
                      onClick={() => updateContent('showSecondaryCta', !selectedBlock.content.showSecondaryCta)}
                      className="text-[10px] text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      {selectedBlock.content.showSecondaryCta ? 'Remove' : '+ Add Button'}
                    </button>
                  </div>
                  {selectedBlock.content.showSecondaryCta && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                            Button Label
                          </label>
                          <input
                            type="text"
                            value={selectedBlock.content.secondaryCtaText || ''}
                            onChange={(e) => updateContent('secondaryCtaText', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                            Variant
                          </label>
                          <select
                            value={selectedBlock.content.secondaryCtaVariant || 'outline'}
                            onChange={(e) => updateContent('secondaryCtaVariant', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="outline">Outline</option>
                            <option value="secondary">Secondary</option>
                            <option value="ghost">Ghost</option>
                          </select>
                        </div>
                      </div>

                      <ButtonActionEditor
                        label="Secondary Button Action"
                        action={selectedBlock.content.secondaryAction}
                        onChange={(act) => updateContent('secondaryAction', act)}
                        availableBlocks={(allBlocks || []).filter((b) => b.id !== selectedBlock.id)}
                        defaultUrl="#features"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- 2. FEATURES GRID --- */}
            {selectedBlock.type === 'features' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Section Header Title
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.sectionTitle || ''}
                    onChange={(e) => updateContent('sectionTitle', e.target.value)}
                    placeholder="e.g. Everything you need to launch fast"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={selectedBlock.content.sectionSubtitle || ''}
                    onChange={(e) => updateContent('sectionSubtitle', e.target.value)}
                    placeholder="Short summary under title..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Feature Cards List */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Feature Cards ({selectedBlock.content.items?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(selectedBlock.content.items || [])];
                        items.push({
                          icon: 'sparkles',
                          badge: 'New',
                          title: 'New Feature',
                          description: 'Explain this feature highlight and benefits.',
                        });
                        updateContent('items', items);
                      }}
                      className="text-xs text-[var(--f-accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedBlock.content.items || []).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            Card #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const items = (selectedBlock.content.items || []).filter((_: any, i: number) => i !== idx);
                              updateContent('items', items);
                            }}
                            className="p-1 text-red-500 hover:text-red-700 text-xs"
                            title="Remove Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-0.5">
                              Card Title
                            </label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const items = [...selectedBlock.content.items];
                                items[idx] = { ...items[idx], title: e.target.value };
                                updateContent('items', items);
                              }}
                              className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-0.5">
                              Badge
                            </label>
                            <input
                              type="text"
                              value={item.badge || ''}
                              onChange={(e) => {
                                const items = [...selectedBlock.content.items];
                                items[idx] = { ...items[idx], badge: e.target.value };
                                updateContent('items', items);
                              }}
                              placeholder="e.g. Pro"
                              className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-0.5">
                            Card Description
                          </label>
                          <textarea
                            rows={2}
                            value={item.description || ''}
                            onChange={(e) => {
                              const items = [...selectedBlock.content.items];
                              items[idx] = { ...items[idx], description: e.target.value };
                              updateContent('items', items);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 dark:text-gray-400 block mb-0.5">
                            Icon
                          </label>
                          <select
                            value={item.icon || 'blocks'}
                            onChange={(e) => {
                              const items = [...selectedBlock.content.items];
                              items[idx] = { ...items[idx], icon: e.target.value };
                              updateContent('items', items);
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="blocks">Blocks / Components</option>
                            <option value="smartphone">Mobile Phone / Responsive</option>
                            <option value="download">Download / Code</option>
                            <option value="zap">Zap / Lightning Speed</option>
                            <option value="shield">Shield / Security</option>
                            <option value="sparkles">Sparkles / AI Magic</option>
                            <option value="globe">Globe / Web</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- 3. NAVBAR --- */}
            {selectedBlock.type === 'navbar' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Brand Name / Logo Text
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.brandName || ''}
                    onChange={(e) => updateContent('brandName', e.target.value)}
                    placeholder="e.g. Forma Studio"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Show CTA Button
                    </label>
                    <input
                      type="checkbox"
                      checked={selectedBlock.content.showCta !== false}
                      onChange={(e) => updateContent('showCta', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                  {selectedBlock.content.showCta !== false && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] text-gray-500 block mb-0.5">CTA Label</label>
                        <input
                          type="text"
                          value={selectedBlock.content.ctaLabel || ''}
                          onChange={(e) => updateContent('ctaLabel', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 block mb-0.5">Variant</label>
                        <select
                          value={selectedBlock.content.ctaVariant || 'primary'}
                          onChange={(e) => updateContent('ctaVariant', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="outline">Outline</option>
                        </select>
                      </div>
                    </div>

                    <ButtonActionEditor
                      label="Navbar CTA Action"
                      action={selectedBlock.content.ctaAction}
                      onChange={(act) => updateContent('ctaAction', act)}
                      availableBlocks={(allBlocks || []).filter((b) => b.id !== selectedBlock.id)}
                      defaultUrl="#features"
                    />
                  )}
                </div>

                {/* Navbar Links */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Nav Links ({selectedBlock.content.links?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const links = [...(selectedBlock.content.links || [])];
                        links.push({ label: 'New Link', href: '#' });
                        updateContent('links', links);
                      }}
                      className="text-xs text-[var(--f-accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(selectedBlock.content.links || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link.label || ''}
                          onChange={(e) => {
                            const links = [...selectedBlock.content.links];
                            links[idx] = { ...links[idx], label: e.target.value };
                            updateContent('links', links);
                          }}
                          placeholder="Link Label"
                          className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <input
                          type="text"
                          value={link.href || ''}
                          onChange={(e) => {
                            const links = [...selectedBlock.content.links];
                            links[idx] = { ...links[idx], href: e.target.value };
                            updateContent('links', links);
                          }}
                          placeholder="#anchor"
                          className="w-24 px-2 py-1 text-xs font-mono rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const links = (selectedBlock.content.links || []).filter((_: any, i: number) => i !== idx);
                            updateContent('links', links);
                          }}
                          className="p-1 text-red-500 hover:text-red-700 text-xs"
                          title="Remove Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- 4. BUTTON BLOCK --- */}
            {selectedBlock.type === 'button' && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Button Label Text
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.buttonText || ''}
                    onChange={(e) => updateContent('buttonText', e.target.value)}
                    placeholder="e.g. Claim Your Free Trial"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <ButtonActionEditor
                  label="Button Click Action & Behavior"
                  action={
                    selectedBlock.content.action || {
                      type: 'url',
                      url: selectedBlock.content.linkUrl || 'https://github.com/AryanSehgal/forma-design-system',
                      target: '_blank',
                    }
                  }
                  onChange={(act) => {
                    updateContent('action', act);
                    if (act.url) {
                      updateContent('linkUrl', act.url);
                    }
                  }}
                  availableBlocks={(allBlocks || []).filter((b) => b.id !== selectedBlock.id)}
                  defaultUrl={selectedBlock.content.linkUrl || 'https://github.com/AryanSehgal/forma-design-system'}
                />

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Forma UI Button Variant
                  </label>
                  <select
                    value={selectedBlock.content.variant || 'primary'}
                    onChange={(e) => updateContent('variant', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="primary">Primary (Accent fill)</option>
                    <option value="secondary">Secondary (Surface fill)</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                    <option value="danger">Danger (Red alert)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Button Size
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateContent('size', s)}
                        className={`py-1.5 text-xs font-bold rounded-md border transition-all ${
                          selectedBlock.content.size === s
                            ? 'border-[var(--f-accent)] bg-blue-50 dark:bg-blue-950 text-[var(--f-accent)]'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Helper Note (Under button)
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.helperText || ''}
                    onChange={(e) => updateContent('helperText', e.target.value)}
                    placeholder="e.g. No credit card required. 14-day trial."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* --- 5. IMAGE BANNER --- */}
            {selectedBlock.type === 'image' && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Image Source URL
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.imageUrl || ''}
                    onChange={(e) => updateContent('imageUrl', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  {/* Preset quick picks */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    <span className="text-[10px] text-gray-400 py-0.5">Presets:</span>
                    {[
                      { label: 'Abstract', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80' },
                      { label: 'Studio', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80' },
                      { label: 'Modern UI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80' },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => updateContent('imageUrl', p.url)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 text-gray-600 dark:text-gray-400 hover:text-[var(--f-accent)]"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Aspect Ratio
                    </label>
                    <select
                      value={selectedBlock.content.aspectRatio || '16/9'}
                      onChange={(e) => updateContent('aspectRatio', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="16/9">16:9 Widescreen</option>
                      <option value="4/3">4:3 Standard</option>
                      <option value="1/1">1:1 Square</option>
                      <option value="21/9">21:9 Ultra-wide</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Border Radius
                    </label>
                    <select
                      value={selectedBlock.content.borderRadius || '16px'}
                      onChange={(e) => updateContent('borderRadius', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="0px">None (0px)</option>
                      <option value="8px">Subtle (8px)</option>
                      <option value="16px">Modern (16px)</option>
                      <option value="24px">Extra (24px)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Caption Text
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.caption || ''}
                    onChange={(e) => updateContent('caption', e.target.value)}
                    placeholder="Optional image caption..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* --- 6. TESTIMONIAL --- */}
            {selectedBlock.type === 'testimonial' && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Customer Quote
                  </label>
                  <textarea
                    rows={3}
                    value={selectedBlock.content.quote || ''}
                    onChange={(e) => updateContent('quote', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.content.authorName || ''}
                      onChange={(e) => updateContent('authorName', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.content.authorRole || ''}
                      onChange={(e) => updateContent('authorRole', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => updateContent('rating', stars)}
                        className={`flex-1 py-1 text-xs font-bold rounded-md border transition-all flex items-center justify-center gap-1 ${
                          (selectedBlock.content.rating || 5) === stars
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-600'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        <span>{stars}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Avatar Image URL
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.avatarUrl || ''}
                    onChange={(e) => updateContent('avatarUrl', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateBlock({
                          ...selectedBlock,
                          content: {
                            ...selectedBlock.content,
                            authorName: ARYAN_PROFILE.name,
                            authorRole: 'Creator of Forma Design System',
                            avatarUrl: ARYAN_PROFILE.photoUrl,
                          },
                        });
                      }}
                      className="w-full py-1.5 px-2.5 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-[var(--f-accent)] border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <img
                        src={ARYAN_PROFILE.photoUrl}
                        alt={ARYAN_PROFILE.name}
                        className="w-4 h-4 rounded-full object-cover shrink-0"
                      />
                      <span>Set to Aryan Sehgal's Photo & Bio</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- 7. PARAGRAPH / RICH TEXT --- */}
            {selectedBlock.type === 'paragraph' && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.headline || ''}
                    onChange={(e) => updateContent('headline', e.target.value)}
                    placeholder="Heading for this story..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Body Paragraph
                  </label>
                  <textarea
                    rows={6}
                    value={selectedBlock.content.body || ''}
                    onChange={(e) => updateContent('body', e.target.value)}
                    placeholder="Write detailed paragraph text here..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* --- 8. CTA SECTION --- */}
            {selectedBlock.type === 'cta' && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Kicker Badge
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.badge || ''}
                    onChange={(e) => updateContent('badge', e.target.value)}
                    placeholder="e.g. Limited Time Offer"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.headline || ''}
                    onChange={(e) => updateContent('headline', e.target.value)}
                    placeholder="e.g. Ready to bring your ideas to life?"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={selectedBlock.content.description || ''}
                    onChange={(e) => updateContent('description', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.content.buttonText || ''}
                      onChange={(e) => updateContent('buttonText', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Email Placeholder
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.content.inputPlaceholder || ''}
                      onChange={(e) => updateContent('inputPlaceholder', e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <ButtonActionEditor
                  label="Submit / CTA Action"
                  action={selectedBlock.content.buttonAction}
                  onChange={(act) => updateContent('buttonAction', act)}
                  availableBlocks={(allBlocks || []).filter((b) => b.id !== selectedBlock.id)}
                  defaultUrl="#features"
                />
              </div>
            )}

            {/* --- 9. ACCORDION (FAQ) --- */}
            {selectedBlock.type === 'accordion' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.title || ''}
                    onChange={(e) => updateContent('title', e.target.value)}
                    placeholder="e.g. Frequently Asked Questions"
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.subtitle || ''}
                    onChange={(e) => updateContent('subtitle', e.target.value)}
                    placeholder="Short description..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* FAQ Items */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Questions ({selectedBlock.content.items?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(selectedBlock.content.items || [])];
                        items.push({
                          question: 'New Question?',
                          answer: 'Provide a clear, helpful answer here.',
                        });
                        updateContent('items', items);
                      }}
                      className="text-xs text-[var(--f-accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedBlock.content.items || []).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-850 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-500 uppercase">
                            Q{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const items = (selectedBlock.content.items || []).filter((_: any, i: number) => i !== idx);
                              updateContent('items', items);
                            }}
                            className="p-1 text-red-500 hover:text-red-700 text-xs"
                            title="Remove Question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.question || ''}
                          onChange={(e) => {
                            const items = [...selectedBlock.content.items];
                            items[idx] = { ...items[idx], question: e.target.value };
                            updateContent('items', items);
                          }}
                          placeholder="Question text"
                          className="w-full px-2 py-1 text-xs font-semibold rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <textarea
                          rows={2}
                          value={item.answer || ''}
                          onChange={(e) => {
                            const items = [...selectedBlock.content.items];
                            items[idx] = { ...items[idx], answer: e.target.value };
                            updateContent('items', items);
                          }}
                          placeholder="Answer explanation"
                          className="w-full px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* --- 10. FOOTER --- */}
            {selectedBlock.type === 'footer' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.brandName || ''}
                    onChange={(e) => updateContent('brandName', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.tagline || ''}
                    onChange={(e) => updateContent('tagline', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.copyright || ''}
                    onChange={(e) => updateContent('copyright', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Footer Links */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Footer Links ({selectedBlock.content.links?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const links = [...(selectedBlock.content.links || [])];
                        links.push({ label: 'New Link', href: '#' });
                        updateContent('links', links);
                      }}
                      className="text-xs text-[var(--f-accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(selectedBlock.content.links || []).map((link: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={link.label || ''}
                          onChange={(e) => {
                            const links = [...selectedBlock.content.links];
                            links[idx] = { ...links[idx], label: e.target.value };
                            updateContent('links', links);
                          }}
                          placeholder="Link text"
                          className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <input
                          type="text"
                          value={link.href || ''}
                          onChange={(e) => {
                            const links = [...selectedBlock.content.links];
                            links[idx] = { ...links[idx], href: e.target.value };
                            updateContent('links', links);
                          }}
                          placeholder="https://..."
                          className="w-24 px-2 py-1 text-xs font-mono rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const links = (selectedBlock.content.links || []).filter((_: any, i: number) => i !== idx);
                            updateContent('links', links);
                          }}
                          className="p-1 text-red-500 hover:text-red-700 text-xs"
                          title="Remove Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: SPACING & RESPONSIVE LAYOUT
           ========================================================================= */}
        {activeTab === 'spacing' && (
          <div className="space-y-4">
            {/* Breakpoint Switcher */}
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Active Target</span>
                <span className="text-[var(--f-accent)] font-semibold lowercase">
                  {editingBreakpoint === 'desktop' ? 'Desktop (≥ 768px)' : 'Mobile (< 640px)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-gray-900 p-0.5 rounded-md border border-gray-200 dark:border-gray-700">
                <Tooltip content="Edit Desktop Spacing (default)" position="bottom" className="w-full">
                  <button
                    type="button"
                    onClick={() => setEditingBreakpoint('desktop')}
                    className={`w-full flex items-center justify-center gap-1.5 py-1 text-xs font-semibold rounded transition-all ${
                      editingBreakpoint === 'desktop'
                        ? 'bg-blue-50 dark:bg-blue-950 text-[var(--f-accent)] font-bold'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                </Tooltip>

                <Tooltip content="Edit Mobile Spacing (< 640px)" position="bottom" className="w-full">
                  <button
                    type="button"
                    onClick={() => setEditingBreakpoint('mobile')}
                    className={`w-full flex items-center justify-center gap-1.5 py-1 text-xs font-semibold rounded transition-all ${
                      editingBreakpoint === 'mobile'
                        ? 'bg-blue-50 dark:bg-blue-950 text-[var(--f-accent)] font-bold'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Vertical Padding (paddingY) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Vertical Padding (Top/Bottom)
                </label>
                <span className="text-xs font-mono font-bold text-[var(--f-accent)]">
                  {currentResponsive.paddingY} rem ({currentResponsive.paddingY * 16}px)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.25"
                value={currentResponsive.paddingY}
                onChange={(e) => updateResponsive({ paddingY: parseFloat(e.target.value) })}
                className="w-full accent-[var(--f-accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>Compact (8px)</span>
                <span>Spacious (128px)</span>
              </div>
            </div>

            {/* Horizontal Padding (paddingX) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Horizontal Gutter Padding
                </label>
                <span className="text-xs font-mono font-bold text-[var(--f-accent)]">
                  {currentResponsive.paddingX} rem ({currentResponsive.paddingX * 16}px)
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.25"
                value={currentResponsive.paddingX}
                onChange={(e) => updateResponsive({ paddingX: parseFloat(e.target.value) })}
                className="w-full accent-[var(--f-accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>Tight (8px)</span>
                <span>Wide (80px)</span>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Text Alignment
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { align: 'left' as const, label: 'Left', icon: AlignLeft },
                  { align: 'center' as const, label: 'Center', icon: AlignCenter },
                  { align: 'right' as const, label: 'Right', icon: AlignRight },
                ].map(({ align, label, icon: Icon }) => (
                  <Tooltip key={align} content={`Align ${label}`} position="top" className="w-full">
                    <button
                      type="button"
                      onClick={() => updateResponsive({ textAlign: align })}
                      className={`w-full py-1.5 flex items-center justify-center gap-1 text-xs font-semibold rounded-md border transition-all ${
                        currentResponsive.textAlign === align
                          ? 'border-[var(--f-accent)] bg-blue-50/70 dark:bg-blue-950/70 text-[var(--f-accent)]'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Container Max Width */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Container Max Width
              </label>
              <select
                value={selectedBlock.styles.maxWidth || '5xl'}
                onChange={(e) => updateStyles({ maxWidth: e.target.value as any })}
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="sm">Small (384px)</option>
                <option value="md">Medium (448px)</option>
                <option value="lg">Large (512px)</option>
                <option value="xl">Extra Large (576px)</option>
                <option value="2xl">2X Large (672px)</option>
                <option value="4xl">4X Large (896px)</option>
                <option value="6xl">6X Large (1152px)</option>
                <option value="full">100% Full Width</option>
              </select>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />
              <div>
                Spacing tuned on <strong>{editingBreakpoint}</strong> saves independently for that device view.
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: STYLE & COLORS
           ========================================================================= */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Background Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Block Background Color
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => updateStyles({ backgroundColor: preset.value })}
                    className={`py-1.5 px-2 rounded-md border text-xs font-medium text-left truncate transition-all ${
                      selectedBlock.styles.backgroundColor === preset.value
                        ? 'border-[var(--f-accent)] bg-blue-50/50 dark:bg-blue-950/40 text-[var(--f-accent)] font-bold'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={
                    selectedBlock.styles.backgroundColor?.startsWith('#')
                      ? selectedBlock.styles.backgroundColor
                      : '#ffffff'
                  }
                  onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                  className="w-7 h-7 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedBlock.styles.backgroundColor || ''}
                  onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                  placeholder="#ffffff or transparent"
                  className="flex-1 px-2.5 py-1 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Text Color
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateStyles({ textColor: '#111827' })}
                  className={`py-1.5 rounded-md border text-xs font-semibold ${
                    selectedBlock.styles.textColor === '#111827'
                      ? 'border-[var(--f-accent)] bg-blue-50 text-[var(--f-accent)]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Dark Text
                </button>
                <button
                  type="button"
                  onClick={() => updateStyles({ textColor: '#ffffff' })}
                  className={`py-1.5 rounded-md border text-xs font-semibold ${
                    selectedBlock.styles.textColor === '#ffffff'
                      ? 'border-[var(--f-accent)] bg-blue-50 text-[var(--f-accent)]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Light Text
                </button>
              </div>
            </div>

            {/* Border Divider */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Section Divider Borders
                </label>
                <input
                  type="checkbox"
                  checked={!!selectedBlock.styles.hasBorder}
                  onChange={(e) => updateStyles({ hasBorder: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#17191f] select-none overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <aside className="w-80 border-l border-gray-200 dark:border-[#373d49] bg-white dark:bg-[#17191f] flex flex-col shrink-0 z-20 select-none">
      {content}
    </aside>
  );
};
