import React from 'react';
import { ActionToastState } from '../utils/actionHandler';
import { CheckCircle, X } from 'lucide-react';

interface ActionToastContainerProps {
  toasts: ActionToastState[];
  onDismiss: (id: number) => void;
}

export const ActionToastContainer: React.FC<ActionToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 rounded-xl shadow-xl border border-gray-800 dark:border-gray-200 text-sm font-medium animate-in slide-in-from-bottom-5 duration-200"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="flex-1 text-xs leading-snug">{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-gray-400 hover:text-white dark:text-gray-500 dark:hover:text-gray-900 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
