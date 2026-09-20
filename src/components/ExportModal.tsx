import React, { useState } from 'react';
import { BlockData, PageTheme } from '../types';
import {
  generateHtml,
  generateCss,
  generateScript,
  generateReadme,
  generateReactCode,
  downloadZip,
} from '../utils/exportWebsite';
import {
  Download,
  FileCode,
  Check,
  Copy,
  ExternalLink,
  X,
  FileText,
  FolderArchive,
  Terminal,
  Globe,
} from 'lucide-react';
import { Button } from '@aryan_sehgal/forma-ui';
import { Badge } from '@aryan_sehgal/forma-ui';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: BlockData[];
  theme: PageTheme;
}

type ModalTab = 'zip' | 'html' | 'react' | 'deploy';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  blocks,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('zip');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const htmlCode = generateHtml(blocks, theme);
  const cssCode = generateCss(theme);
  const reactCode = generateReactCode(blocks, theme);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadZip(blocks, theme);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to download ZIP', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-[var(--f-accent)] flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Export Website Files
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Production-ready standalone code powered by @aryan_sehgal/forma-ui
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Bar */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 gap-2 bg-gray-50/50 dark:bg-gray-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('zip')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'zip'
                ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Download ZIP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML & CSS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('react')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'react'
                ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>React (Forma UI)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'deploy'
                ? 'border-[var(--f-accent)] text-[var(--f-accent)]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Deploy to Vercel</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 select-text">
          {/* TAB 1: DOWNLOAD ZIP */}
          {activeTab === 'zip' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <FolderArchive className="w-4 h-4 text-blue-500" />
                    <span>Website Bundle (.zip)</span>
                  </div>
                  <Badge variant="neutral" className="text-[10px] font-mono">
                    {blocks.length} blocks included
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">index.html</div>
                    <div className="text-[10px] text-gray-400">Semantic markup</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">styles.css</div>
                    <div className="text-[10px] text-gray-400">Forma UI tokens</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">script.js</div>
                    <div className="text-[10px] text-gray-400">Interactions</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">README.md</div>
                    <div className="text-[10px] text-gray-400">Vercel guide</div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-8 py-3 font-semibold shadow-md inline-flex items-center gap-2 mx-auto"
                >
                  {isDownloading ? (
                    <span>Packaging website ZIP...</span>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Downloaded Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Website ZIP</span>
                    </>
                  )}
                </Button>

                {downloadSuccess && (
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium animate-in fade-in">
                    ZIP file downloaded! Extract and deploy to Vercel or open in any browser.
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  What makes these exported files special?
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Zero build steps required: Double click <code>index.html</code> to open immediately in any browser.</li>
                  <li>Responsive mobile styles are fully compiled with your custom breakpoints.</li>
                  <li>Powered by Forma UI's portable CSS tokens (<code>--f-accent</code>, <code>--f-radius</code>).</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: HTML & CSS */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">
                  index.html
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(htmlCode, 'html')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copiedSection === 'html' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-gray-950 text-gray-200 text-xs font-mono overflow-x-auto max-h-80 border border-gray-800 leading-relaxed">
                <code>{htmlCode}</code>
              </pre>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">
                  styles.css
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(cssCode, 'css')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copiedSection === 'css' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-gray-950 text-gray-200 text-xs font-mono overflow-x-auto max-h-56 border border-gray-800 leading-relaxed">
                <code>{cssCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 3: REACT CODE */}
          {activeTab === 'react' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">
                    LandingPage.tsx
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Using @aryan_sehgal/forma-ui components
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(reactCode, 'react')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copiedSection === 'react' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy React Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-gray-950 text-gray-200 text-xs font-mono overflow-x-auto max-h-96 border border-gray-800 leading-relaxed">
                <code>{reactCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: DEPLOY TO VERCEL */}
          {activeTab === 'deploy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                <div className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Deploy for Free on Vercel in 30 seconds</span>
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed">
                  These exported website files are static and standalone. You can host them on Vercel's free global CDN with custom domain support and instant HTTPS.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--f-accent)] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <span>Method A: One-Click Web Upload (Zero CLI)</span>
                  </div>
                  <ol className="list-decimal list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1.5 pl-6">
                    <li>Download the ZIP above and extract it into a folder.</li>
                    <li>Visit <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold">vercel.com/new <ExternalLink className="w-3 h-3" /></a></li>
                    <li>Upload or drop the extracted folder into the deploy area.</li>
                    <li>Click <strong>Deploy</strong>. Your site is live worldwide!</li>
                  </ol>
                </div>

                <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--f-accent)] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <span>Method B: Vercel CLI</span>
                  </div>
                  <pre className="p-3 rounded-lg bg-gray-950 text-gray-200 text-xs font-mono overflow-x-auto border border-gray-800">
                    <code>npx vercel</code>
                  </pre>
                  <p className="text-[11px] text-gray-500 pl-6">
                    Run this command inside the unzipped website folder. Accept default prompts and your website will be deployed instantly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 dark:bg-gray-900">
          <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1.5">
            <span>Powered by</span>
            <a
              href="https://forma-design-system-docs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--f-accent)] hover:underline inline-flex items-center gap-1"
            >
              <span>@aryan_sehgal/forma-ui</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>Created by</span>
            <a
              href="https://github.com/AryanSehgal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
            >
              Aryan Sehgal
            </a>
          </div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
