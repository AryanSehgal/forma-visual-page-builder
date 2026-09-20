import React from 'react';

interface FormaLogoProps {
  className?: string;
  size?: number;
}

export const FormaLogo: React.FC<FormaLogoProps> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Forma Page Builder Logo"
    >
      <defs>
        <linearGradient id="forma-builder-grad1" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--f-accent, #3158df)" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="forma-builder-accent" x1="14" y1="6" x2="26" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Base Canvas Block container */}
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#forma-builder-grad1)" />

      {/* Modular Builder Grid Segments */}
      {/* Top Banner Block */}
      <rect x="6" y="6" width="20" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.9" />

      {/* Left Column (Content / Heading block) */}
      <rect x="6" y="14" width="11" height="12" rx="2.5" fill="#ffffff" fillOpacity="0.8" />
      <rect x="8.5" y="17" width="6" height="2" rx="1" fill="#3158df" fillOpacity="0.8" />
      <rect x="8.5" y="21" width="4" height="2" rx="1" fill="#3158df" fillOpacity="0.5" />

      {/* Right Column (Visual / Media block with glowing accent) */}
      <rect x="19" y="14" width="7" height="12" rx="2.5" fill="url(#forma-builder-accent)" />
      {/* Sparkle / visual dot */}
      <circle cx="22.5" cy="20" r="1.5" fill="#ffffff" />
    </svg>
  );
};
