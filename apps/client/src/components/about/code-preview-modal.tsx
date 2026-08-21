'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Code2,
  Copy,
  FileText,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

type CodePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  language: string;
  content: string;
  fileIcon?: ReactNode;
  breadcrumb?: string;
};

export function CodePreviewModal({
  isOpen,
  onClose,
  fileName,
  language,
  content,
  fileIcon,
  breadcrumb,
}: CodePreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-[8px] border border-border bg-background shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                {fileIcon ? (
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    {fileIcon}
                  </span>
                ) : (
                  <FileText className="size-4 text-primary shrink-0" />
                )}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[12px] font-semibold truncate text-foreground">
                    {fileName}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-medium text-primary">
                    {language}
                  </span>
                </div>
              </div>

              {/* Center Tab Controls */}
              <div className="flex items-center gap-1 rounded-[8px] bg-background p-1 border border-border shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('visual')}
                  className={`flex items-center gap-1.5 rounded-[8px] px-3 py-1 text-[10px] font-medium transition-all ${
                    activeTab === 'visual'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="size-3" />
                  <span>Visual Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-1.5 rounded-[8px] px-3 py-1 text-[10px] font-medium transition-all ${
                    activeTab === 'code'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Code2 className="size-3" />
                  <span>Source Code</span>
                </button>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-[8px] bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-7 items-center justify-center rounded-[8px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Breadcrumb Bar */}
            {breadcrumb && (
              <div className="flex shrink-0 items-center justify-between bg-[#06243a] px-4 py-1.5 text-[9px] font-medium text-white/90">
                <span>{breadcrumb}</span>
                <span className="text-white/60">Interactive Live Preview</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="min-h-0 flex-1 overflow-auto bg-background p-4 sm:p-6">
              {activeTab === 'visual' ? (
                <VisualPreviewRenderer fileName={fileName} language={language} content={content} />
              ) : (
                <CodeViewRenderer content={content} />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex shrink-0 items-center justify-between border-t border-border bg-muted/20 px-4 py-2 text-[9px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="flex size-1.5 rounded-full bg-emerald-500" />
                <span>Live Render Active</span>
              </div>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* VISUAL PREVIEW RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function VisualPreviewRenderer({
  fileName,
  language,
  content,
}: {
  fileName: string;
  language: string;
  content: string;
}) {
  const fileExt = fileName.split('.').pop()?.toLowerCase() || '';

  // Determine renderer based on file type / name
  if (fileExt === 'md' || fileExt === 'mmd') {
    return <MarkdownVisualRenderer content={content} fileName={fileName} />;
  }

  if (
    fileName === 'index.tsx' ||
    fileName === 'config.ts' ||
    fileName === 'social.links' ||
    fileName === 'vision.ts'
  ) {
    return <ProfileConfigVisualRenderer fileName={fileName} content={content} />;
  }

  if (fileExt === 'json') {
    return <JsonVisualRenderer content={content} fileName={fileName} />;
  }

  if (
    fileExt === 'yaml' ||
    fileExt === 'yml' ||
    fileExt === 'toml' ||
    fileExt === 'csv' ||
    fileExt === 'xml' ||
    fileExt === 'db'
  ) {
    return <StructuredDataVisualRenderer content={content} fileName={fileName} fileExt={fileExt} />;
  }

  if (fileName.startsWith('.env') || fileName === '.gitignore' || fileName === 'LICENSE') {
    return <ConfigLicenseVisualRenderer fileName={fileName} content={content} />;
  }

  return <GenericVisualRenderer fileName={fileName} language={language} content={content} />;
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* MARKDOWN RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function MarkdownVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const lines = useMemo(() => content.split('\n'), [content]);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Header Banner */}
      <div className="rounded-[8px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 border border-primary/20">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          <FileText className="size-3.5" />
          <span>Documentation Preview</span>
        </div>
        <h1 className="text-xl font-bold text-foreground">{fileName}</h1>
      </div>

      {/* Formatted Content Card */}
      <div className="rounded-[8px] border border-border bg-card p-6 shadow-sm space-y-4">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;

          if (line.startsWith('# ')) {
            return (
              <h1
                key={idx}
                className="text-2xl font-bold text-foreground border-b border-border pb-2 mt-4"
              >
                {line.replace('# ', '')}
              </h1>
            );
          }

          if (line.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-lg font-semibold text-foreground border-b border-border/50 pb-1 mt-3"
              >
                {line.replace('## ', '')}
              </h2>
            );
          }

          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-sm font-semibold text-primary mt-2">
                {line.replace('### ', '')}
              </h3>
            );
          }

          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90 pl-2">
                <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{line.replace(/^[-*]\s+/, '')}</span>
              </div>
            );
          }

          if (line.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-primary bg-primary/5 px-3 py-2 text-xs italic text-muted-foreground rounded-r"
              >
                {line.replace('> ', '')}
              </blockquote>
            );
          }

          return (
            <p key={idx} className="text-xs leading-relaxed text-foreground/80">
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* PROFILE & CONFIG VISUAL RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function ProfileConfigVisualRenderer({ fileName, content }: { fileName: string; content: string }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Profile Overview Card */}
      <div className="relative overflow-hidden rounded-[8px] border border-border bg-gradient-to-br from-background via-muted/20 to-primary/5 p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-primary p-1 bg-background shadow-lg">
            <div className="flex size-full items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
              AY
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-medium text-emerald-500 mb-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Full Stack Engineer & Designer
            </div>

            <h2 className="text-xl font-bold text-foreground">Ahmed Yassine Abbane</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Architecting scalable web products & crafting intuitive user interfaces.
            </p>
          </div>
        </div>

        {/* Quick Tech Badges */}
        <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-1.5 justify-center sm:justify-start">
          {['React', 'Next.js', 'TypeScript', 'NestJS', 'TailwindCSS', 'MongoDB', 'Docker'].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-[8px] bg-muted px-2.5 py-1 text-[9.5px] font-medium text-foreground"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Feature Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-[8px] border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-2">
            <Zap className="size-4" />
            <span>Identity & Mission</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bridging development and design to create scalable, high-performance web applications
            with clean architecture.
          </p>
        </div>

        <div className="rounded-[8px] border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-2">
            <Globe className="size-4" />
            <span>Connect & Links</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            GitHub, LinkedIn, Portfolio & Consulting platforms. Open for exciting collaborations.
          </p>
        </div>
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* JSON VISUAL RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function JsonVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const parsedData = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }, [content]);

  if (!parsedData) {
    return <CodeViewRenderer content={content} />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between rounded-[8px] border border-border bg-muted/30 p-4">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">{fileName}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          {Object.keys(parsedData).length} Top-level Keys
        </span>
      </div>

      {/* JSON Object Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(parsedData).map(([key, value]) => {
          const isArray = Array.isArray(value);
          const isObject = typeof value === 'object' && value !== null && !isArray;

          return (
            <div key={key} className="rounded-[8px] border border-border bg-card p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {key}
              </span>

              <div className="mt-2 text-xs">
                {isArray ? (
                  <div className="flex flex-wrap gap-1">
                    {(value as unknown[]).map((item, idx) => (
                      <span
                        key={idx}
                        className="rounded-[8px] bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary"
                      >
                        {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                      </span>
                    ))}
                  </div>
                ) : isObject ? (
                  <div className="space-y-1 bg-muted/30 p-2 rounded text-[10px] font-mono">
                    {Object.entries(value as Record<string, unknown>).map(([subKey, subVal]) => (
                      <div key={subKey} className="flex justify-between">
                        <span className="text-muted-foreground">{subKey}:</span>
                        <span className="font-semibold text-foreground">{String(subVal)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="font-medium text-foreground">{String(value)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* STRUCTURED DATA VISUAL RENDERER (YAML, CSV, XML, TOML) */
}
{
  /* -------------------------------------------------------------------------- */
}

function StructuredDataVisualRenderer({
  content,
  fileName,
  fileExt,
}: {
  content: string;
  fileName: string;
  fileExt: string;
}) {
  const lines = useMemo(() => content.split('\n').filter((l) => l.trim()), [content]);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 rounded-[8px] border border-border bg-primary/5 p-4 text-primary">
        <Terminal className="size-4" />
        <span className="text-xs font-semibold">{fileName} — Data Showcase</span>
      </div>

      {/* Item Chips / Rows */}
      <div className="space-y-2">
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-[8px] border border-border bg-card px-4 py-2.5 text-xs transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                {index + 1}
              </span>
              <span className="font-medium text-foreground">{line}</span>
            </div>
            <span className="text-[9px] uppercase font-semibold text-muted-foreground">
              {fileExt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* CONFIG & LICENSE VISUAL RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function ConfigLicenseVisualRenderer({ fileName, content }: { fileName: string; content: string }) {
  const lines = useMemo(() => content.split('\n').filter((l) => l.trim()), [content]);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="rounded-[8px] border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
          <ShieldCheck className="size-5" />
          <span>{fileName}</span>
        </div>

        <div className="space-y-2">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded bg-muted/40 px-3 py-1.5 text-xs"
            >
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              <span className="font-mono text-foreground">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* GENERIC VISUAL RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function GenericVisualRenderer({
  fileName,
  language,
  content,
}: {
  fileName: string;
  language: string;
  content: string;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="rounded-[8px] border border-border bg-card p-6">
        <h3 className="text-sm font-bold text-foreground mb-2">{fileName}</h3>
        <p className="text-xs text-muted-foreground mb-4">Formatted Live View ({language})</p>
        <div className="rounded bg-muted/50 p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}

{
  /* -------------------------------------------------------------------------- */
}
{
  /* CODE VIEW RENDERER */
}
{
  /* -------------------------------------------------------------------------- */
}

function CodeViewRenderer({ content }: { content: string }) {
  const lines = useMemo(() => content.split('\n'), [content]);

  return (
    <div className="rounded-[8px] border border-border bg-[#1e1e1e] p-2 text-white font-mono text-[8px] leading-tight overflow-x-hidden shadow-inner lg:p-4 lg:text-[11px] lg:leading-relaxed lg:overflow-x-auto">
      {lines.map((line, idx) => (
        <div key={idx} className="flex min-w-0 hover:bg-white/5 px-1 py-0.5 rounded lg:px-2">
          <span className="w-6 shrink-0 select-none text-right pr-1 text-[#6e7681] text-[8px] lg:w-8 lg:pr-3 lg:text-[10px]">
            {idx + 1}
          </span>
          <span className="min-w-0 whitespace-pre-wrap break-words text-[#d4d4d4] lg:whitespace-pre lg:break-normal">
            {line || ' '}
          </span>
        </div>
      ))}
    </div>
  );
}
