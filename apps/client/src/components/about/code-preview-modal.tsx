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

  if (fileName.startsWith('.env')) {
    return <EnvironmentVisualRenderer fileName={fileName} content={content} />;
  }

  if (fileName === '.gitignore') {
    return <GitignoreVisualRenderer content={content} />;
  }

  if (fileName === 'LICENSE') {
    return <MarkdownVisualRenderer content={content} fileName={fileName} />;
  }

  switch (fileExt) {
    case 'md':
      return <MarkdownVisualRenderer content={content} fileName={fileName} />;
    case 'mmd':
      return <MermaidVisualRenderer content={content} fileName={fileName} />;
    case 'json':
      return <JsonVisualRenderer content={content} fileName={fileName} />;
    case 'yaml':
    case 'yml':
      return <YamlVisualRenderer content={content} fileName={fileName} />;
    case 'csv':
      return <CsvVisualRenderer content={content} fileName={fileName} />;
    case 'xml':
      return <XmlVisualRenderer content={content} fileName={fileName} />;
    case 'toml':
      return <TomlVisualRenderer content={content} fileName={fileName} />;
    case 'ts':
    case 'tsx':
      return <TypeScriptVisualRenderer content={content} fileName={fileName} />;
    case 'db':
      return <DatabaseVisualRenderer content={content} fileName={fileName} />;
    case 'links':
      return <LinksVisualRenderer content={content} fileName={fileName} />;
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

function TypeScriptVisualRenderer({ fileName, content }: { fileName: string; content: string }) {
  const declarations = content
    .split(/\r?\n/)
    .map((line) => line.match(/\b(?:const|let|var|function|class|interface|type)\s+([\w$]+)/)?.[1])
    .filter((name): name is string => Boolean(name));
  const imports = content.split(/\r?\n/).filter((line) => /^\s*import\b/.test(line)).length;
  const lines = content.split(/\r?\n/);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader icon={<Code2 className="size-4" />} title={fileName} subtitle="TypeScript" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SummaryCard label="Declarations" value={String(declarations.length)} />
        <SummaryCard label="Imports" value={String(imports)} />
        <SummaryCard label="Lines" value={String(lines.length)} />
      </div>

      <section className="rounded-[8px] border border-border bg-card p-4">
        <h2 className="mb-3 text-xs font-semibold text-foreground">File outline</h2>
        {declarations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {declarations.map((declaration, index) => (
              <span
                key={`${declaration}-${index}`}
                className="rounded-[6px] border border-primary/20 bg-primary/5 px-2.5 py-1.5 font-mono text-[10px] text-primary"
              >
                {declaration}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No top-level declarations found.</p>
        )}
      </section>

      <div className="rounded-[8px] border border-border bg-muted/30 p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Source preview
        </p>
        <pre className="overflow-auto whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-foreground">
          {lines.slice(0, 12).join('\n')}
        </pre>
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
function PreviewHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[8px] border border-border bg-muted/30 p-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-primary">{icon}</span>
        <span className="truncate text-xs font-semibold text-foreground">{title}</span>
      </div>
      <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[9px] font-medium text-primary">
        {subtitle}
      </span>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-border bg-card p-3">
      <p className="text-[9px] font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function YamlVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const rows = content.split(/\r?\n/).filter((line) => line.trim());

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader icon={<Layers className="size-4" />} title={fileName} subtitle="YAML tree" />
      <div className="rounded-[8px] border border-border bg-card p-3">
        {rows.map((line, index) => {
          const indentation = line.match(/^\s*/)?.[0].length ?? 0;
          const text = line.trim();
          const isComment = text.startsWith('#');
          const isListItem = text.startsWith('- ');
          const separator = text.indexOf(':');
          const key = !isComment && !isListItem && separator >= 0 ? text.slice(0, separator) : '';
          const value =
            key.length > 0
              ? text.slice(separator + 1).trim()
              : isListItem
                ? text.slice(2).trim()
                : text;

          return (
            <div
              key={`${index}-${text}`}
              className={`flex items-start gap-2 rounded-[5px] px-2 py-1.5 ${
                isComment ? 'text-muted-foreground' : 'text-foreground'
              }`}
              style={{ marginLeft: `${Math.min(indentation, 12) * 4}px` }}
            >
              {isComment ? (
                <span className="text-[10px] italic">{text}</span>
              ) : (
                <>
                  {key && (
                    <span className="shrink-0 font-mono text-[10px] font-semibold text-primary">
                      {key}
                    </span>
                  )}
                  {!key && <span className="text-primary">{isListItem ? '•' : '·'}</span>}
                  {key && <span className="text-muted-foreground">:</span>}
                  <span className="break-all font-mono text-[10px]">{value}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CsvVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const rows = content
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trimStart().startsWith('#'))
    .map(parseCsvRow);
  const [headers = [], ...records] = rows;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <PreviewHeader
        icon={<Layers className="size-4" />}
        title={fileName}
        subtitle={`${records.length} records`}
      />
      <div className="overflow-x-auto rounded-[8px] border border-border bg-card">
        <table className="w-full border-collapse text-left text-[10px]">
          <thead className="bg-primary/10 text-primary">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={`${header}-${index}`}
                  className="whitespace-nowrap px-3 py-2 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border/70">
                {headers.map((_, columnIndex) => (
                  <td key={columnIndex} className="px-3 py-2 align-top text-foreground">
                    {record[columnIndex] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function parseCsvRow(line: string): string[] {
  const cells: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === ',' && !inQuotes) {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += character;
    }
  }

  cells.push(cell.trim());
  return cells;
}

function TomlVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const sections = useMemo(() => {
    const result: { name: string; entries: { key: string; value: string }[] }[] = [
      { name: 'General', entries: [] },
    ];

    for (const line of content.split(/\r?\n/)) {
      const text = line.trim();
      const section = text.match(/^\[([^\]]+)\]$/);
      if (section) {
        result.push({ name: section[1], entries: [] });
        continue;
      }

      const entry = text.match(/^([^=#]+?)\s*=\s*(.*)$/);
      if (entry) {
        result[result.length - 1].entries.push({ key: entry[1].trim(), value: entry[2].trim() });
      }
    }

    return result.filter((section) => section.entries.length > 0);
  }, [content]);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<Layers className="size-4" />}
        title={fileName}
        subtitle="TOML settings"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <section key={section.name} className="rounded-[8px] border border-border bg-card p-3">
            <h2 className="mb-2 border-b border-border pb-2 text-[10px] font-semibold text-primary">
              [{section.name}]
            </h2>
            <div className="space-y-2">
              {section.entries.map((entry) => (
                <div key={entry.key} className="flex items-start justify-between gap-3 text-[10px]">
                  <span className="font-mono text-muted-foreground">{entry.key}</span>
                  <span className="break-all text-right font-medium text-foreground">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function XmlVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const rows = content.split(/\r?\n/).filter((line) => line.trim());
  const rootElement = content.match(/<([A-Za-z_][\w:.-]*)\b/)?.[1] || 'XML document';

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<Layers className="size-4" />}
        title={fileName}
        subtitle={`Root: ${rootElement}`}
      />
      <div className="rounded-[8px] border border-border bg-card p-3">
        <div className="space-y-1">
          {rows.map((line, index) => {
            const indentation = line.match(/^\s*/)?.[0].length ?? 0;
            const text = line.trim();
            const leaf = text.match(/^<([\w:.-]+)[^>]*>([^<]*)<\/\1>$/);
            const tag = text.match(/^<\/?([\w:.-]+)/);

            return (
              <div
                key={`${index}-${text}`}
                className="flex items-start gap-2 rounded-[5px] bg-muted/30 px-2 py-1.5"
                style={{ marginLeft: `${Math.min(indentation, 12) * 4}px` }}
              >
                {tag ? (
                  <>
                    <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary">
                      {tag[1]}
                    </span>
                    {leaf?.[2] && (
                      <span className="break-all text-[10px] text-foreground">{leaf[2]}</span>
                    )}
                    {!leaf && (
                      <span className="break-all font-mono text-[9px] text-muted-foreground">
                        {text.replace(/^<\/?[\w:.-]+/, '').replace(/[<>]/g, '')}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="break-all font-mono text-[9px] text-muted-foreground">
                    {text}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MermaidVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const nodes = useMemo(() => {
    const result: { id: string; label: string }[] = [];
    const pattern = /([A-Za-z_]\w*)\s*(?:\["([^"]+)"\]|\(\[([^\]]+)\]\))/g;
    let match = pattern.exec(content);

    while (match) {
      result.push({
        id: match[1],
        label: (match[2] || match[3]).replace(/<br\s*\/?>/gi, ' '),
      });
      match = pattern.exec(content);
    }

    return result;
  }, [content]);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <PreviewHeader icon={<Zap className="size-4" />} title={fileName} subtitle="Flow diagram" />
      {nodes.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-[8px] border border-border bg-card p-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-2">
              <div className="max-w-48 rounded-[8px] border border-primary/20 bg-primary/5 px-3 py-2 text-center">
                <p className="text-[9px] font-semibold text-primary">{node.id}</p>
                <p className="mt-1 text-[10px] text-foreground">{node.label}</p>
              </div>
              {index < nodes.length - 1 && (
                <span className="text-sm text-muted-foreground" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-[8px] border border-border bg-card p-4 text-xs text-muted-foreground">
          No diagram nodes could be read from this Mermaid file.
        </p>
      )}
    </div>
  );
}

function EnvironmentVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const entries = content.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    return match ? [{ key: match[1], value: match[2].replace(/^["']|["']$/g, '') }] : [];
  });

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<ShieldCheck className="size-4" />}
        title={fileName}
        subtitle="Profile variables"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {entries.map((entry) => (
          <div key={entry.key} className="rounded-[8px] border border-border bg-card p-3">
            <p className="font-mono text-[9px] font-semibold text-primary">{entry.key}</p>
            <p className="mt-1 break-words text-[10px] text-foreground">{entry.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GitignoreVisualRenderer({ content }: { content: string }) {
  const patterns = content
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trimStart().startsWith('#'));

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<ShieldCheck className="size-4" />}
        title=".gitignore"
        subtitle={`${patterns.length} rules`}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {patterns.map((pattern, index) => (
          <div
            key={`${pattern}-${index}`}
            className="rounded-[6px] border border-border bg-card px-3 py-2"
          >
            <code className="break-all text-[10px] text-foreground">{pattern}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinksVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const links = content.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\s*([^#=]+?)\s*=>\s*(.+)\s*$/);
    return match ? [{ label: match[1].trim(), value: match[2].trim() }] : [];
  });

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<Globe className="size-4" />}
        title={fileName}
        subtitle={`${links.length} details`}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <div key={link.label} className="rounded-[8px] border border-border bg-card p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
              {link.label.replace(/_/g, ' ')}
            </p>
            <p className="mt-1 break-all text-[10px] font-medium text-foreground">{link.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DatabaseVisualRenderer({ content, fileName }: { content: string; fileName: string }) {
  const tableName = content.match(/CREATE\s+TABLE\s+(\w+)/i)?.[1] || 'Database record';
  const schema = content.match(/CREATE\s+TABLE\s+\w+\s*\(([\s\S]*?)\);/i)?.[1] || '';
  const columns = schema
    .split(/\r?\n/)
    .map((line) => line.trim().match(/^(\w+)\s+(\w+)/))
    .flatMap((match) => (match ? [{ name: match[1], type: match[2] }] : []));
  const insert = content.match(/INSERT\s+INTO\s+\w+[\s\S]*?VALUES\s*\(([\s\S]*?)\);/i)?.[1] || '';
  const values = parseCsvRow(insert.replace(/'/g, '"'));

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PreviewHeader
        icon={<Layers className="size-4" />}
        title={fileName}
        subtitle={`${tableName} table`}
      />
      <div className="overflow-x-auto rounded-[8px] border border-border bg-card">
        <table className="w-full border-collapse text-left text-[10px]">
          <thead className="bg-primary/10 text-primary">
            <tr>
              {columns.map((column) => (
                <th key={column.name} className="px-3 py-2">
                  <span className="block font-semibold">{column.name}</span>
                  <span className="font-mono text-[8px] font-normal">{column.type}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.length > 0 && (
              <tr className="border-t border-border">
                {columns.map((column, index) => (
                  <td key={column.name} className="px-3 py-2 text-foreground">
                    {values[index] || '—'}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {columns.length === 0 && (
        <div className="rounded-[8px] border border-border bg-card p-4 font-mono text-[10px] whitespace-pre-wrap text-foreground">
          {content}
        </div>
      )}
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
