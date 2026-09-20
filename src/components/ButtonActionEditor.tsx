import React, { useState, useEffect } from 'react';
import { ButtonAction } from '../types';
import {
  ExternalLink,
  ArrowDown,
  MessageSquare,
  Bell,
  Mail,
  Download,
  Info,
  ChevronDown,
  Check,
} from 'lucide-react';

interface ButtonActionEditorProps {
  label?: string;
  action?: ButtonAction;
  onChange: (action: ButtonAction) => void;
  availableBlocks?: { id: string; name: string; customName?: string; type: string }[];
  defaultUrl?: string;
}

export const ButtonActionEditor: React.FC<ButtonActionEditorProps> = ({
  label = 'Button Click Action',
  action,
  onChange,
  availableBlocks = [],
  defaultUrl = 'https://',
}) => {
  // Normalize current action or fall back to URL action
  const currentAction: ButtonAction = action || {
    type: 'url',
    url: defaultUrl,
    target: '_blank',
  };

  const actionTypes: {
    type: ButtonAction['type'];
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      type: 'url',
      label: 'Open URL',
      description: 'Visit a webpage or link in new or same tab',
      icon: ExternalLink,
    },
    {
      type: 'scroll',
      label: 'Scroll to Section',
      description: 'Smooth scroll page to another block',
      icon: ArrowDown,
    },
    {
      type: 'modal',
      label: 'Popup Dialog',
      description: 'Display an alert modal or message box',
      icon: MessageSquare,
    },
    {
      type: 'toast',
      label: 'Toast Notification',
      description: 'Show a temporary floating notification',
      icon: Bell,
    },
    {
      type: 'email',
      label: 'Send Email',
      description: 'Open user email client with subject',
      icon: Mail,
    },
    {
      type: 'download',
      label: 'Download File',
      description: 'Trigger file download or resource link',
      icon: Download,
    },
  ];

  const setType = (type: ButtonAction['type']) => {
    switch (type) {
      case 'url':
        onChange({
          ...currentAction,
          type: 'url',
          url: currentAction.url || 'https://github.com/AryanSehgal/forma-design-system',
          target: currentAction.target || '_blank',
        });
        break;
      case 'scroll':
        onChange({
          ...currentAction,
          type: 'scroll',
          targetBlockId: currentAction.targetBlockId || (availableBlocks[0]?.id ?? ''),
        });
        break;
      case 'modal':
        onChange({
          ...currentAction,
          type: 'modal',
          modalTitle: currentAction.modalTitle || 'Welcome to Forma Studio!',
          modalMessage:
            currentAction.modalMessage ||
            'Thank you for your interest. You have successfully triggered this interactive button dialog.',
          modalButtonText: currentAction.modalButtonText || 'Got it, thanks!',
        });
        break;
      case 'toast':
        onChange({
          ...currentAction,
          type: 'toast',
          toastMessage: currentAction.toastMessage || 'Action successful! Thanks for clicking.',
        });
        break;
      case 'email':
        onChange({
          ...currentAction,
          type: 'email',
          url: currentAction.url || 'contact@formastudio.com',
          emailSubject: currentAction.emailSubject || 'Inquiry regarding Forma UI',
        });
        break;
      case 'download':
        onChange({
          ...currentAction,
          type: 'download',
          downloadUrl: currentAction.downloadUrl || '#',
          downloadFileName: currentAction.downloadFileName || 'forma-release.zip',
        });
        break;
    }
  };

  return (
    <div className="space-y-2.5 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-700/80">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
          <span>{label}</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            Interactive
          </span>
        </label>
      </div>

      {/* Action Type Selector Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {actionTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = currentAction.type === item.type;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => setType(item.type)}
              title={item.description}
              className={`p-2 rounded-lg text-left border flex flex-col items-center justify-center text-center gap-1 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold shadow-2xs'
                  : 'border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
              <span className="text-[10px] leading-tight line-clamp-1">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Specific Fields */}
      <div className="pt-2 border-t border-gray-200/60 dark:border-gray-700/60 space-y-2">
        {/* 1. Open URL */}
        {currentAction.type === 'url' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-1">
                Target URL (Website, App link, or Anchor)
              </label>
              <input
                type="text"
                value={currentAction.url || ''}
                onChange={(e) => onChange({ ...currentAction, url: e.target.value })}
                placeholder="https://example.com or #features"
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-600 dark:text-gray-400">Open in New Tab</span>
              <input
                type="checkbox"
                checked={currentAction.target !== '_self'}
                onChange={(e) =>
                  onChange({ ...currentAction, target: e.target.checked ? '_blank' : '_self' })
                }
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 2. Scroll to Section */}
        {currentAction.type === 'scroll' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block">
              Target Section / Block on Page
            </label>
            {availableBlocks.length > 0 ? (
              <select
                value={currentAction.targetBlockId || ''}
                onChange={(e) => onChange({ ...currentAction, targetBlockId: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
              >
                <option value="">Select a block to scroll to...</option>
                {availableBlocks.map((b, idx) => (
                  <option key={b.id} value={b.id}>
                    {idx + 1}. {b.customName || b.name} ({b.type})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-[11px] text-amber-600 dark:text-amber-400">
                Add other blocks to your page first to scroll between them.
              </p>
            )}
            <p className="text-[10px] text-gray-400 italic">
              When clicked, the viewport will smoothly scroll down to this selected block.
            </p>
          </div>
        )}

        {/* 3. Popup Dialog / Modal */}
        {currentAction.type === 'modal' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Modal Heading Title
              </label>
              <input
                type="text"
                value={currentAction.modalTitle || ''}
                onChange={(e) => onChange({ ...currentAction, modalTitle: e.target.value })}
                placeholder="e.g. Thanks for clicking!"
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Modal Message / Description
              </label>
              <textarea
                rows={2}
                value={currentAction.modalMessage || ''}
                onChange={(e) => onChange({ ...currentAction, modalMessage: e.target.value })}
                placeholder="Provide details, coupon codes, signup instructions..."
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Dismiss Button Text
              </label>
              <input
                type="text"
                value={currentAction.modalButtonText || ''}
                onChange={(e) => onChange({ ...currentAction, modalButtonText: e.target.value })}
                placeholder="e.g. Close or Continue"
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* 4. Toast Notification */}
        {currentAction.type === 'toast' && (
          <div>
            <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-1">
              Toast Alert Message
            </label>
            <input
              type="text"
              value={currentAction.toastMessage || ''}
              onChange={(e) => onChange({ ...currentAction, toastMessage: e.target.value })}
              placeholder="e.g. Link copied to clipboard! / Action processed"
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Pops a sleek animated toast alert banner in the corner of the user's screen.
            </p>
          </div>
        )}

        {/* 5. Send Email */}
        {currentAction.type === 'email' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Recipient Email Address
              </label>
              <input
                type="email"
                value={currentAction.url || ''}
                onChange={(e) => onChange({ ...currentAction, url: e.target.value })}
                placeholder="hello@example.com"
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Email Subject Line (Optional)
              </label>
              <input
                type="text"
                value={currentAction.emailSubject || ''}
                onChange={(e) => onChange({ ...currentAction, emailSubject: e.target.value })}
                placeholder="e.g. Website Inquiry / Request Demo"
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* 6. Download File */}
        {currentAction.type === 'download' && (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Download Resource File URL
              </label>
              <input
                type="text"
                value={currentAction.downloadUrl || ''}
                onChange={(e) => onChange({ ...currentAction, downloadUrl: e.target.value })}
                placeholder="https://.../whitepaper.pdf or /assets/guide.pdf"
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 block mb-0.5">
                Suggested Download Filename
              </label>
              <input
                type="text"
                value={currentAction.downloadFileName || ''}
                onChange={(e) => onChange({ ...currentAction, downloadFileName: e.target.value })}
                placeholder="e.g. Forma-Presentation.pdf"
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
