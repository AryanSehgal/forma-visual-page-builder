import React, { useState, useEffect, useCallback } from 'react';
import {
  BlockData,
  BlockType,
  ViewportMode,
  PageTheme,
} from './types';
import { defaultBlocks } from './data/defaultBlocks';
import { defaultTemplates, Template } from './data/starterTemplates';
import { HeaderBar } from './components/HeaderBar';
import { LeftSidebar } from './components/LeftSidebar';
import { Canvas } from './components/Canvas';
import { ExportModal } from './components/ExportModal';
import { UserGuideModal } from './components/UserGuideModal';
import { BuilderFooter } from './components/BuilderFooter';
import { X, Plus } from 'lucide-react';

const STORAGE_KEY = 'forma_page_builder_blocks_v1';
const THEME_STORAGE_KEY = 'forma_page_builder_theme_v1';

const initialTheme: PageTheme = {
  mode: 'light',
  accentColor: '#3158df',
  fontFamily: 'Inter',
  radius: '8px',
  pageTitle: 'My Forma Website',
  pageDescription: 'Created with Forma Visual Page Builder',
};

interface HistoryState {
  past: BlockData[][];
  present: BlockData[];
  future: BlockData[][];
}

export function App() {
  // Load saved blocks or initialize with empty canvas for first-time visitors
  const [blocks, setBlocks] = useState<BlockData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading blocks from localStorage', e);
    }
    // Default: clean empty canvas inviting the user to create something of their own
    return [];
  });

  // Load saved theme or use initial
  const [theme, setTheme] = useState<PageTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading theme from localStorage', e);
    }
    return initialTheme;
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: blocks,
    future: [],
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState<boolean>(false);

  // Sidebar visibility: Components & Studio docked on the right
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Mobile drawer state (< 1024px)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Clean up any lingering document-level tokens on mount so builder remains pristine
  useEffect(() => {
    document.documentElement.style.removeProperty('--f-accent');
    document.documentElement.style.removeProperty('--f-radius');
    document.documentElement.style.removeProperty('--f-font');
    document.documentElement.removeAttribute('data-f-theme');
    document.documentElement.classList.remove('dark');
  }, []);

  // Sync blocks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch (e) {
      console.error('Error saving blocks to localStorage', e);
    }
  }, [blocks]);

  // Sync theme to localStorage (scoped to website artboard, not document.documentElement)
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (e) {
      console.error('Error saving theme', e);
    }
  }, [theme]);

  // Helper to commit state change into history
  const commitBlocksChange = useCallback((newBlocks: BlockData[]) => {
    setHistory((prev) => ({
      past: [...prev.past.slice(-20), prev.present],
      present: newBlocks,
      future: [],
    }));
    setBlocks(newBlocks);
  }, []);

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future],
    });
    setBlocks(previous);
    if (selectedBlockId && !previous.some((b: BlockData) => b.id === selectedBlockId)) {
      setSelectedBlockId(previous.length > 0 ? previous[0].id : null);
    }
  }, [history, selectedBlockId]);

  const handleRedo = useCallback(() => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture,
    });
    setBlocks(next);
    if (selectedBlockId && !next.some((b: BlockData) => b.id === selectedBlockId)) {
      setSelectedBlockId(next.length > 0 ? next[0].id : null);
    }
  }, [history, selectedBlockId]);

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Escape, Delete)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is editing in an input or textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.metaKey || e.ctrlKey) && e.key === 'y') ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z')
      ) {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Escape') {
        setSelectedBlockId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Block CRUD Operations
  const handleAddBlock = (type: BlockType) => {
    const templateBlock = defaultBlocks.find((b: BlockData) => b.type === type);
    if (!templateBlock) return;

    const newBlock: BlockData = {
      ...JSON.parse(JSON.stringify(templateBlock)),
      id: 'block_' + Math.random().toString(36).substring(2, 9),
    };

    const updated = [...blocks, newBlock];
    commitBlocksChange(updated);
    setSelectedBlockId(newBlock.id);
    setIsSidebarOpen(true);

    // Auto-close drawer on mobile if opened
    if (window.innerWidth < 1024) {
      setIsMobileDrawerOpen(false);
    }
  };

  const handleAddBlockAtIndex = (type: BlockType, index: number) => {
    const templateBlock = defaultBlocks.find((b: BlockData) => b.type === type);
    if (!templateBlock) return;

    const newBlock: BlockData = {
      ...JSON.parse(JSON.stringify(templateBlock)),
      id: 'block_' + Math.random().toString(36).substring(2, 9),
    };

    const updated = [...blocks];
    updated.splice(index, 0, newBlock);
    commitBlocksChange(updated);
    setSelectedBlockId(newBlock.id);
    setIsSidebarOpen(true);
  };

  const handleUpdateBlock = (updatedBlock: BlockData) => {
    const updated = blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b));
    commitBlocksChange(updated);
  };

  const handleMoveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    commitBlocksChange(updated);
  };

  const handleDuplicateBlock = (id: string) => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    const original = blocks[index];
    const duplicate: BlockData = {
      ...JSON.parse(JSON.stringify(original)),
      id: 'block_' + Math.random().toString(36).substring(2, 9),
      name: `${original.name} (Copy)`,
    };
    const updated = [...blocks];
    updated.splice(index + 1, 0, duplicate);
    commitBlocksChange(updated);
    setSelectedBlockId(duplicate.id);
    setIsSidebarOpen(true);
  };

  const handleDeleteBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    commitBlocksChange(updated);
    if (selectedBlockId === id) {
      setSelectedBlockId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleRenameBlock = (id: string, newName: string) => {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, customName: newName.trim() } : b
    );
    commitBlocksChange(updated);
  };

  const handleReorderBlocks = (startIndex: number, endIndex: number) => {
    if (startIndex === endIndex || startIndex < 0 || endIndex < 0) return;
    const updated = [...blocks];
    const [moved] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, moved);
    commitBlocksChange(updated);
  };

  const handleLoadTemplate = (tpl: Template | string) => {
    let targetTemplate: Template | undefined;
    if (typeof tpl === 'string') {
      targetTemplate = defaultTemplates.find((t: Template) => t.id === tpl);
    } else {
      targetTemplate = tpl;
    }
    if (targetTemplate) {
      const freshBlocks: BlockData[] = targetTemplate.blocks.map((b: BlockData) => ({
        ...JSON.parse(JSON.stringify(b)),
        id: 'block_' + Math.random().toString(36).substring(2, 9),
      }));
      commitBlocksChange(freshBlocks);
      setSelectedBlockId(freshBlocks.length > 0 ? freshBlocks[0].id : null);
      if (window.innerWidth < 1024) {
        setIsMobileDrawerOpen(false);
      }
    }
  };

  const handleClearCanvas = () => {
    commitBlocksChange([]);
    setSelectedBlockId(null);
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  // Responsive sidebar toggles
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  const isPanelVisible = isDesktop ? isSidebarOpen : isMobileDrawerOpen;

  const togglePanel = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsMobileDrawerOpen(!isMobileDrawerOpen);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 dark:bg-[#17191f] font-sans text-gray-900 dark:text-[#edf0f5]">
      {/* Top Header Bar */}
      <HeaderBar
        viewport={viewport}
        onViewportChange={setViewport}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isPreviewMode={isPreviewMode}
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onClearCanvas={handleClearCanvas}
        blockCount={blocks.length}
        theme={theme}
        onToggleThemeMode={() =>
          setTheme((prev) => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }))
        }
        isPanelOpen={isPanelVisible}
        onTogglePanel={togglePanel}
        hasSelectedBlock={!!selectedBlock}
        onOpenGuide={() => setIsUserGuideOpen(true)}
      />

      {/* Main Workspace (Scaled Zoom Canvas in Center + Docked Block Components & Studio on Right) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Central Workspace Canvas with Auto-fit Zoom Scaling */}
        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={(id) => {
            setSelectedBlockId(id);
          }}
          onMoveBlock={handleMoveBlock}
          onDuplicateBlock={handleDuplicateBlock}
          onDeleteBlock={handleDeleteBlock}
          onAddBlockAtIndex={handleAddBlockAtIndex}
          viewport={viewport}
          theme={theme}
          isPreviewMode={isPreviewMode}
          onLoadTemplate={(tplId) => handleLoadTemplate(tplId)}
          onOpenGuide={() => setIsUserGuideOpen(true)}
        />

        {/* DOCKED Right Sidebar (Components Library, Theme & Combined Layers/Inspector) */}
        {!isPreviewMode && isSidebarOpen && (
          <div className="hidden lg:flex shrink-0 h-full">
            <LeftSidebar
              side="right"
              onAddBlock={handleAddBlock}
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={(id) => setSelectedBlockId(id)}
              onMoveBlock={handleMoveBlock}
              onDuplicateBlock={handleDuplicateBlock}
              onDeleteBlock={handleDeleteBlock}
              onRenameBlock={handleRenameBlock}
              onReorderBlocks={handleReorderBlocks}
              onUpdateBlock={handleUpdateBlock}
              onOpenGuide={() => setIsUserGuideOpen(true)}
              onLoadTemplate={handleLoadTemplate}
              onClearCanvas={handleClearCanvas}
              theme={theme}
              onUpdateTheme={(updates) => setTheme((prev) => ({ ...prev, ...updates }))}
              viewport={viewport}
              onViewportChange={setViewport}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {/* MOBILE Right Drawer Overlay (< 1024px) - Opens from the right */}
        {!isPreviewMode && isMobileDrawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex justify-end">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            {/* Drawer Content opening smoothly from right */}
            <div className="relative z-50 w-84 max-w-[88vw] h-full shadow-2xl flex flex-col bg-white dark:bg-[#17191f]">
              <div className="p-2 border-b border-gray-200 dark:border-[#373d49] flex justify-between items-center px-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Blocks & Studio
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <LeftSidebar
                  side="right"
                  onAddBlock={handleAddBlock}
                  blocks={blocks}
                  selectedBlockId={selectedBlockId}
                  onSelectBlock={(id) => {
                    setSelectedBlockId(id);
                  }}
                  onMoveBlock={handleMoveBlock}
                  onDuplicateBlock={handleDuplicateBlock}
                  onDeleteBlock={handleDeleteBlock}
                  onRenameBlock={handleRenameBlock}
                  onReorderBlocks={handleReorderBlocks}
                  onUpdateBlock={handleUpdateBlock}
                  onOpenGuide={() => {
                    setIsMobileDrawerOpen(false);
                    setIsUserGuideOpen(true);
                  }}
                  onLoadTemplate={handleLoadTemplate}
                  onClearCanvas={handleClearCanvas}
                  theme={theme}
                  onUpdateTheme={(updates) => setTheme((prev) => ({ ...prev, ...updates }))}
                  viewport={viewport}
                  onViewportChange={setViewport}
                />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE FLOATING ACTION BUTTON ON RIGHT TO OPEN BLOCKS & STUDIO */}
        {!isPreviewMode && (
          <div className="lg:hidden fixed bottom-16 right-4 z-30 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl border border-blue-500/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Blocks & Studio</span>
            </button>
          </div>
        )}
      </div>

      {/* Persistent Builder Footer mentioning Aryan Sehgal & Forma UI Playground */}
      <BuilderFooter />

      {/* Export Website Files Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        blocks={blocks}
        theme={theme}
      />

      {/* User Guide & Instructions Modal */}
      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
        onLoadTemplate={(tplId) => handleLoadTemplate(tplId)}
      />
    </div>
  );
}

export default App;
