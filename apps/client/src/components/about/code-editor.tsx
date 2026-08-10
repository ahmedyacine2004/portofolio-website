'use client';

import { useTheme } from '@/hooks/use-theme';
import { AlertTriangle, Eye, GitBranch, X, XCircle } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

type CodeEditorProps = {
  fileName: string;
  breadcrumb: string;
  language: string;
  content: string;
  fileIcon?: ReactNode; // Pass your SVG icon here
  errorCount?: number;
  warningCount?: number;
};

type Token = {
  text: string;
  type:
    | 'plain'
    | 'keyword'
    | 'string'
    | 'comment'
    | 'number'
    | 'function'
    | 'type'
    | 'operator'
    | 'property';
};

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    if (remaining.startsWith('//') || remaining.startsWith('#') || remaining.startsWith('<!--')) {
      tokens.push({
        text: remaining,
        type: 'comment',
      });
      break;
    }

    const stringMatch = remaining.match(/^("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/);

    if (stringMatch) {
      tokens.push({
        text: stringMatch[0],
        type: 'string',
      });

      remaining = remaining.slice(stringMatch[0].length);
      continue;
    }

    const numberMatch = remaining.match(/^\b\d+(?:\.\d+)?\b/);

    if (numberMatch) {
      tokens.push({
        text: numberMatch[0],
        type: 'number',
      });

      remaining = remaining.slice(numberMatch[0].length);
      continue;
    }

    const keywordMatch = remaining.match(
      /^(import|from|const|export|default|return|new|true|false|null|undefined)\b/,
    );

    if (keywordMatch) {
      tokens.push({
        text: keywordMatch[0],
        type: 'keyword',
      });

      remaining = remaining.slice(keywordMatch[0].length);
      continue;
    }

    const typeMatch = remaining.match(/^(Identity|Workspace|Expertise|Journey|Mission)\b/);

    if (typeMatch) {
      tokens.push({
        text: typeMatch[0],
        type: 'type',
      });

      remaining = remaining.slice(typeMatch[0].length);
      continue;
    }

    const functionMatch = remaining.match(/^([A-Za-z_$][\w$]*)(?=\()/);

    if (functionMatch) {
      tokens.push({
        text: functionMatch[0],
        type: 'function',
      });

      remaining = remaining.slice(functionMatch[0].length);
      continue;
    }

    const propertyMatch = remaining.match(/^([A-Za-z_$][\w$]*)(?=\s*:)/);

    if (propertyMatch) {
      tokens.push({
        text: propertyMatch[0],
        type: 'property',
      });

      remaining = remaining.slice(propertyMatch[0].length);
      continue;
    }

    const operatorMatch = remaining.match(/^(=>|===|!==|==|!=|=|\+|-|\.)/);

    if (operatorMatch) {
      tokens.push({
        text: operatorMatch[0],
        type: 'operator',
      });

      remaining = remaining.slice(operatorMatch[0].length);
      continue;
    }

    const plainMatch = remaining.match(/^[^"'`/\dA-Za-z_$=+!.:-]+|^[A-Za-z_$][\w$]*/);

    if (plainMatch) {
      tokens.push({
        text: plainMatch[0],
        type: 'plain',
      });

      remaining = remaining.slice(plainMatch[0].length);
      continue;
    }

    tokens.push({
      text: remaining[0],
      type: 'plain',
    });

    remaining = remaining.slice(1);
  }

  return tokens;
}

function TokenizedLine({ line, isDark }: { line: string; isDark: boolean }) {
  const tokens = useMemo(() => tokenize(line), [line]);

  return (
    <>
      {tokens.map((token, index) => {
        let colorClass = '';

        switch (token.type) {
          case 'keyword':
            colorClass = isDark ? 'text-[#ff3b72]' : 'text-[#d73a68]';
            break;
          case 'string':
            colorClass = isDark ? 'text-[#9cdcfe]' : 'text-[#0969da]';
            break;
          case 'comment':
            colorClass = isDark ? 'text-[#6a9955]' : 'text-[#6e7781]';
            break;
          case 'number':
            colorClass = isDark ? 'text-[#b5cea8]' : 'text-[#b45309]';
            break;
          case 'function':
            colorClass = isDark ? 'text-[#dcdcaa]' : 'text-[#111827]';
            break;
          case 'type':
            colorClass = isDark ? 'text-[#4ec9b0]' : 'text-[#6f42c1]';
            break;
          case 'property':
            colorClass = isDark ? 'text-[#9cdcfe]' : 'text-[#8250df]';
            break;
          case 'operator':
          case 'plain':
          default:
            colorClass = isDark ? 'text-[#d4d4d4]' : 'text-[#24292f]';
            break;
        }

        return (
          <span key={`${token.text}-${index}`} className={`font-mono ${colorClass}`}>
            {token.text}
          </span>
        );
      })}
    </>
  );
}

export function CodeEditor({
  fileName,
  breadcrumb,
  language,
  content,
  fileIcon,
  errorCount = 0,
  warningCount = 0,
}: CodeEditorProps) {
  const lines = useMemo(() => content.split('\n'), [content]);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex h-full min-h-0 flex-col bg-background rounded-sm">
      {/* Editor toolbar */}
      <div className="flex shrink-0 items-center justify-between px-2 py-1">
        {/* File tab */}
        <div className="flex h-7 items-center gap-2 rounded-[3px] bg-primary/10 px-2.5">
          {fileIcon && (
            <span className="flex size-3.5 items-center justify-center shrink-0">{fileIcon}</span>
          )}
          <span className="text-[9px] font-medium leading-none text-primary">{fileName}</span>
          <X className="ml-3 size-2.5 text-primary" strokeWidth={2} aria-hidden="true" />
        </div>

        {/* Preview */}
        <button
          type="button"
          className="flex h-7 items-center gap-2 rounded-[5px] bg-primary px-4 text-[8px] font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <span>Preview Code</span>
          <Eye className="size-3" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="mx-1 flex h-9 shrink-0 items-center rounded-t-[4px] bg-[#06243a] px-2.5">
        <span className="text-[8px] font-semibold leading-none text-white">{breadcrumb}</span>
      </div>

      {/* Code area */}
      <div
        className={
          isDark
            ? 'min-h-0 flex-1 overflow-auto bg-[#1e1e1e]'
            : 'min-h-0 flex-1 overflow-auto bg-white'
        }
      >
        <div className="min-w-max py-1">
          {lines.map((line, index) => (
            <div
              key={`${index}-${line}`}
              className="flex min-h-[15px] items-start text-[8px] leading-[15px]"
            >
              {/* Line number */}
              <div className="w-9 shrink-0 select-none pr-2 text-right text-[7px] font-medium text-[#8993a7]">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Code */}
              <div className="whitespace-pre pr-6">
                <TokenizedLine line={line} isDark={isDark} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className={`flex h-6 shrink-0 items-center justify-between px-3 text-[7px] rounded-b-[8px] ${
          isDark ? 'bg-[#252526] text-[#cccccc]' : 'bg-[#eef4fb] text-[#172033]'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="size-2.5" strokeWidth={1.8} aria-hidden="true" />
            Main
          </span>

          {/* Error & Warning Counters */}
          <span className="flex items-center gap-1">
            <XCircle className="size-2.5 text-red-500" strokeWidth={2} aria-hidden="true" />
            {errorCount}
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="size-2.5 text-amber-500" strokeWidth={2} aria-hidden="true" />
            {warningCount}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>

          {/* Language Type with SVG icon */}
          <span className="flex items-center gap-1">
            {fileIcon && (
              <span className="flex size-2.5 items-center justify-center shrink-0">{fileIcon}</span>
            )}
            <span>{language}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
