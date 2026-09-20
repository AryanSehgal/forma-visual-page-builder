import React from 'react';
import { X, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { ActionModalState } from '../utils/actionHandler';

interface ActionModalProps {
  modal: ActionModalState | null;
  onClose: () => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({ modal, onClose }) => {
  if (!modal || !modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#1e2330] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 space-y-4 animate-in zoom-in-95 duration-150 text-left"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            {modal.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {modal.message}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="md" onClick={onClose} className="font-semibold">
            {modal.buttonText || 'Dismiss'}
          </Button>
        </div>
      </div>
    </div>
  );
};
