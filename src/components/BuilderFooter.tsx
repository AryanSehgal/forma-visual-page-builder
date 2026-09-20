import React from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { ARYAN_PROFILE } from '../utils/aryanProfile';

export const BuilderFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-[#373d49] bg-white/95 dark:bg-[#17191f]/95 backdrop-blur-xs px-3 sm:px-4 py-2 sm:py-0 sm:h-9 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-[11px] sm:text-xs text-gray-500 dark:text-[#a3aaba] shrink-0 z-20 select-none">
      {/* Left / Top on mobile: Package info & link to Forma UI Playground */}
      <div className="flex items-center justify-center sm:justify-start gap-1.5 min-w-0 max-w-full">
        <Layers className="w-3.5 h-3.5 text-[var(--f-accent)] shrink-0" />
        <span className="font-medium text-gray-600 dark:text-[#edf0f5] whitespace-nowrap">
          <span className="hidden sm:inline">Builds responsive websites using</span>
          <span className="sm:hidden">Built using</span>
        </span>
        <a
          href={ARYAN_PROFILE.formaDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Forma UI Component Playground & Documentation"
          className="font-mono font-semibold px-1.5 py-0.5 rounded text-[10.5px] sm:text-xs bg-blue-50 dark:bg-[#202945] text-[var(--f-accent)] hover:bg-blue-100 dark:hover:bg-[#28355a] hover:underline inline-flex items-center gap-1 transition-all shrink-0 whitespace-nowrap border border-blue-200/60 dark:border-blue-800/40"
        >
          <span>{ARYAN_PROFILE.npmPackage}</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
        </a>
      </div>

      {/* Right / Bottom on mobile: Creator attribution to Aryan Sehgal with photo */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs shrink-0">
        <span className="text-gray-500 dark:text-[#a3aaba]">Created by</span>
        <a
          href={ARYAN_PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Aryan Sehgal's GitHub Profile"
          className="font-bold text-gray-900 dark:text-white hover:text-[var(--f-accent)] dark:hover:text-[var(--f-accent)] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap group"
        >
          <img
            src={ARYAN_PROFILE.photoUrl}
            alt={ARYAN_PROFILE.name}
            className="w-4 h-4 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-600 group-hover:ring-[var(--f-accent)] transition-all shrink-0"
          />
          <span className="group-hover:underline">{ARYAN_PROFILE.name}</span>
          <Github className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300 group-hover:text-[var(--f-accent)] transition-colors" />
        </a>
      </div>
    </footer>
  );
};

