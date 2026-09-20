import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  shortcut?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  shortcut,
  position = 'top',
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-1.5';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-1.5';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-1.5';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-1.5';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'bottom':
        return '-top-1 left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-800 border-x-transparent border-t-transparent border-4';
      case 'left':
        return '-right-1 top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-800 border-y-transparent border-r-transparent border-4';
      case 'right':
        return '-left-1 top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-800 border-y-transparent border-l-transparent border-4';
      case 'top':
      default:
        return '-bottom-1 left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-800 border-x-transparent border-b-transparent border-4';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute ${getPositionClasses()} z-50 pointer-events-none px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-[11px] font-medium rounded-md shadow-xl whitespace-nowrap flex items-center gap-1.5 border border-gray-700/60 transition-opacity duration-150 animate-in fade-in-0 zoom-in-95`}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="px-1 py-0.5 text-[9px] font-mono bg-gray-800 dark:bg-gray-700 text-gray-300 rounded border border-gray-600/60">
              {shortcut}
            </kbd>
          )}
          <div className={`absolute w-0 h-0 ${getArrowClasses()}`} />
        </div>
      )}
    </div>
  );
};
