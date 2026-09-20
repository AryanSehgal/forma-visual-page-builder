export type BlockType =
  | 'navbar'
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'testimonial'
  | 'features'
  | 'cta'
  | 'accordion'
  | 'footer';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type ButtonActionType =
  | 'url'            // Open external or relative URL (in new tab or same tab)
  | 'scroll'         // Smooth scroll to a section / block on the page
  | 'modal'          // Trigger a popup dialog / modal with custom title & message
  | 'toast'          // Show quick temporary toast notification
  | 'email'          // Open mailto link (e.g. mailto:contact@example.com)
  | 'download';      // Trigger file download or document link

export interface ButtonAction {
  type: ButtonActionType;
  // URL or email target
  url?: string;
  target?: '_blank' | '_self';
  // Scroll target (block ID or CSS selector like #features)
  targetBlockId?: string;
  // Modal dialog config
  modalTitle?: string;
  modalMessage?: string;
  modalButtonText?: string;
  // Toast notification message
  toastMessage?: string;
  // Email subject & body
  emailSubject?: string;
  // Download file name or url
  downloadUrl?: string;
  downloadFileName?: string;
}

export interface ResponsiveSettings {
  paddingY: number; // in rem (e.g. 1 to 8)
  paddingX: number; // in rem (e.g. 1 to 6)
  textAlign: 'left' | 'center' | 'right';
  fontSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  gap?: number; // in rem
  columns?: 1 | 2 | 3 | 4;
}

export interface BlockStyles {
  desktop: ResponsiveSettings;
  mobile: ResponsiveSettings;
  backgroundColor: string; // hex or 'transparent' or 'surface'
  textColor: string;
  accentColor?: string;
  hasBorder?: boolean;
  borderColor?: string;
  borderRadius?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
}

export interface BlockData {
  id: string;
  type: BlockType;
  name: string;
  customName?: string;
  content: Record<string, any>;
  styles: BlockStyles;
}

export interface PageTheme {
  mode: 'light' | 'dark';
  accentColor: string; // e.g. '#3158df'
  radius: string; // e.g. '8px'
  fontFamily: string;
  pageTitle: string;
  pageDescription: string;
}

export interface HistoryState {
  past: BlockData[][];
  present: BlockData[];
  future: BlockData[][];
}
