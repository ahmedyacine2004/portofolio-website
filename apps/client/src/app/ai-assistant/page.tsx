'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Brain,
  Briefcase,
  ChevronRight,
  Code2,
  FileText,
  Globe,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import RobotImage from '@/assets/images/robot.png';
import { askAssistant, type AssistantAttachment } from '@/services/ai-assistant.service';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function AIAssistantPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshingContext, setIsRefreshingContext] = useState(false);
  const [activeContext, setActiveContext] = useState<'portfolio' | 'web' | 'code'>('portfolio');
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I can answer questions about Ahmed Yassine Abbane's portfolio, skills, projects, experience, and career direction.",
      time: 'now',
    },
  ]);

  const suggestionCards = useMemo(
    () => [
      {
        id: 'summarize',
        title: 'Summarize',
        subtitle: 'His experience',
        icon: MessageSquare,
      },
      {
        id: 'tell-me',
        title: 'Tell me about',
        subtitle: 'His projects',
        icon: MessageSquare,
      },
      {
        id: 'generate',
        title: 'Generate',
        subtitle: 'Cover letter',
        icon: MessageSquare,
      },
    ],
    [],
  );

  const capabilities = useMemo(
    () => [
      {
        title: 'Portfolio Q&A',
        description: 'Ask anything about his background',
        icon: Brain,
        prompt: "Tell me about Ahmed Yassine Abbane's portfolio, his projects, and his background.",
      },
      {
        title: 'Project Explainer',
        description: 'Detailed insights about his projects',
        icon: Code2,
        prompt: 'Explain his projects in detail and highlight the value behind each one.',
      },
      {
        title: 'Skills Analyzer',
        description: 'Analyze and showcase his stack',
        icon: Sparkles,
        prompt: 'Analyze his stack and tell me what his strongest technical skills are.',
      },
      {
        title: 'Resume Reviewer',
        description: 'Get feedback on his resume',
        icon: FileText,
        prompt: 'Review his resume and tell me what stands out most.',
      },
      {
        title: 'Career Guidance',
        description: 'Personalized career advice',
        icon: UserCheck,
        prompt: 'Give me personalized career guidance based on his profile and goals.',
      },
    ],
    [],
  );

  const quickActions = useMemo(
    () => [
      {
        label: 'Summarize His Background',
        icon: Briefcase,
        prompt: 'Summarize his background and experience.',
      },
      {
        label: 'List His Technical Skills',
        icon: Code2,
        prompt: 'What are his main technical skills?',
      },
      {
        label: 'Show His Achievements',
        icon: Award,
        prompt: 'What are his biggest achievements?',
      },
      {
        label: 'Generate Cover Letter',
        icon: FileText,
        prompt: 'Can you help draft a cover letter for him?',
      },
    ],
    [],
  );

  const sendPrompt = async (prompt?: string, attachmentsToSend: AssistantAttachment[] = []) => {
    const finalPrompt = (prompt ?? inputMessage).trim();
    if ((!finalPrompt && attachmentsToSend.length === 0) || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessageText =
      attachmentsToSend.length > 0
        ? `${finalPrompt || 'Attached file'} [${attachmentsToSend
            .map((attachment) => attachment.name ?? 'file')
            .join(', ')}]`
        : finalPrompt;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', text: userMessageText, time },
    ]);
    setInputMessage('');
    setSelectedFiles([]);
    setIsAttachmentModalOpen(false);
    setIsLoading(true);

    try {
      const response = await askAssistant(
        finalPrompt || 'Please review the attached file.',
        attachmentsToSend,
      );
      const reply = response?.data?.reply ?? 'I could not generate an answer right now.';
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'The assistant is temporarily unavailable. Please try again in a moment.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const convertFilesToAttachments = async (files: File[]) =>
    Promise.all(
      files.map(
        (file) =>
          new Promise<AssistantAttachment>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = typeof reader.result === 'string' ? reader.result : '';
              const data = result.includes(',') ? (result.split(',')[1] ?? '') : result;

              resolve({
                name: file.name,
                type: file.type.startsWith('image/') ? 'image' : 'text',
                data,
              });
            };
            reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
            reader.readAsDataURL(file);
          }),
      ),
    );

  const openAttachmentModal = (promptText?: string) => {
    setPendingPrompt(promptText ?? (inputMessage || null));
    setIsAttachmentModalOpen(true);
  };

  const handleRefreshContext = async () => {
    if (isLoading) return;

    setIsRefreshingContext(true);
    setActiveContext('portfolio');
    await sendPrompt(
      "Refresh Ahmed Yassine Abbane's portfolio context and summarize his latest profile, projects, and current focus.",
    );
    setIsRefreshingContext(false);
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setSelectedFiles(files);
    event.target.value = '';
  };

  return (
    <div className="font-inter flex h-full w-full flex-col overflow-y-auto select-none rounded-sm bg-background p-2.5 text-foreground shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] lg:max-h-[620px] lg:overflow-hidden scrollbar-none sm:p-3.5">
      {isAttachmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xs border border-border bg-background p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-inter text-sm font-bold text-foreground">Attach file</h3>
              <button
                type="button"
                onClick={() => {
                  setPendingPrompt(null);
                  setIsAttachmentModalOpen(false);
                }}
                className="rounded-xs bg-muted p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="rounded-xs border border-dashed border-border bg-muted/30 p-4 text-center">
              <Paperclip className="mx-auto mb-2 size-6 text-primary" />
              <p className="font-inter text-xs text-muted-foreground">
                Select a file to send with your message.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <input
                type="file"
                multiple
                onChange={handleFileSelection}
                className="font-inter w-full rounded-xs border border-border bg-muted/20 p-2 text-xs text-foreground file:mr-2 file:rounded-xs file:border-0 file:bg-primary file:px-2 file:py-1 file:text-[10px] file:font-bold file:text-primary-foreground"
              />

              {selectedFiles.length > 0 && (
                <div className="max-h-28 overflow-y-auto rounded-xs bg-muted/20 p-2 text-xs text-foreground">
                  {selectedFiles.map((file) => (
                    <div key={`${file.name}-${file.size}`} className="truncate py-1">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setPendingPrompt(null);
                  setIsAttachmentModalOpen(false);
                }}
                className="rounded-xs border border-border px-3 py-1.5 text-xs font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (selectedFiles.length === 0) return;

                  const attachments = await convertFilesToAttachments(selectedFiles);
                  const finalPrompt =
                    pendingPrompt || inputMessage || 'Please review the attached file.';
                  setPendingPrompt(null);
                  setIsAttachmentModalOpen(false);
                  await sendPrompt(finalPrompt, attachments);
                }}
                className="rounded-xs bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
                disabled={selectedFiles.length === 0 || isLoading}
              >
                Send with file
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="font-inter flex flex-col lg:flex-row gap-3.5 w-full h-full p-1">
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="flex-1 min-w-0 flex flex-col h-full gap-3 px-1">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex shrink-0 justify-between items-center gap-3 rounded-sm bg-background p-3 sm:p-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
          >
            <div className="space-y-1 max-w-md">
              <span className="font-inter text-[10px] font-bold text-primary uppercase tracking-wider">
                AI assistant
              </span>
              <h1 className="font-inter text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase leading-none">
                WSUP BROSKI
              </h1>
              <p className="font-inter text-[11px] font-normal leading-tight text-muted-foreground line-clamp-2">
                I&apos;m your AI portfolio assistant. Ask me anything about your skills, experience,
                projects, or achievements.
              </p>

              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="font-inter inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
                <span className="font-inter inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-violet-500/10 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                  Ready
                </span>
              </div>
            </div>

            {/* Robot Image */}
            <div className="relative size-24 sm:size-28 shrink-0 rounded-sm bg-sky-500/10 p-1 flex items-center justify-center">
              <Image
                src={RobotImage}
                alt="AI Assistant Robot"
                width={100}
                height={100}
                priority
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Suggestion Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="grid grid-cols-3 gap-2.5 shrink-0 p-0.5"
          >
            {suggestionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  suppressHydrationWarning
                  key={card.id}
                  type="button"
                  onClick={() => openAttachmentModal(`${card.title} ${card.subtitle}`)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] hover:shadow-md transition-all group cursor-pointer text-left"
                >
                  <div className="size-7 rounded-xs bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-inter text-[11px] font-bold text-foreground leading-tight truncate">
                      {card.title}
                    </h2>
                    <p className="font-inter text-[9px] text-muted-foreground truncate mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Chat Workspace Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1 min-h-[260px] flex flex-col justify-between rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
          >
            {/* Scrollable Message History */}
            <div className="flex-1 overflow-y-auto space-y-3 p-1.5 scrollbar-none lg:max-h-[220px]">
              {messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex flex-col items-end gap-0.5">
                    <div className="font-inter rounded-xs bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-medium max-w-xs shadow-xs whitespace-pre-wrap break-words">
                      {message.text}
                    </div>
                    <span className="font-inter text-[9px] text-muted-foreground px-1">
                      {message.time}
                    </span>
                  </div>
                ) : (
                  <div key={message.id} className="flex items-start gap-2.5">
                    <div className="size-7 rounded-xs bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-0.5 shadow-xs">
                      <Zap className="size-3.5 fill-current" />
                    </div>

                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="rounded-xs bg-muted/40 p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-2">
                        <div className="font-inter text-[11px] text-foreground whitespace-pre-wrap break-words">
                          {message.text}
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-1">
                        <span className="font-inter text-[9px] text-muted-foreground">
                          {message.time}
                        </span>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <button
                            type="button"
                            suppressHydrationWarning
                            className="hover:text-foreground transition-colors cursor-pointer"
                          >
                            <ThumbsUp className="size-3" />
                          </button>
                          <button
                            type="button"
                            suppressHydrationWarning
                            className="hover:text-foreground transition-colors cursor-pointer"
                          >
                            <ThumbsDown className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="size-7 rounded-xs bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-0.5 shadow-xs">
                    <Zap className="size-3.5 fill-current" />
                  </div>
                  <div className="rounded-xs bg-muted/40 px-3 py-2 text-[11px] text-muted-foreground">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-2 shrink-0 p-0.5">
              <div className="rounded-xs bg-muted/40 p-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-1.5">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      void sendPrompt();
                    }
                  }}
                  placeholder="Ask me anything about Ahmed Yassine Abbane's portfolio..."
                  className="font-inter w-full bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none px-1"
                />

                <div className="flex items-center justify-between flex-wrap gap-1.5 pt-1.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      suppressHydrationWarning
                      type="button"
                      aria-pressed={activeContext === 'portfolio'}
                      onClick={() => {
                        setActiveContext('portfolio');
                        void sendPrompt('Tell me about Ahmed Yassine Abbane and his portfolio.');
                      }}
                      className={`font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] cursor-pointer ${
                        activeContext === 'portfolio' ? 'ring-1 ring-primary/80' : ''
                      }`}
                    >
                      Portfolio Context
                    </button>
                    <button
                      suppressHydrationWarning
                      type="button"
                      aria-pressed={activeContext === 'web'}
                      onClick={() => {
                        setActiveContext('web');
                        void sendPrompt(
                          'What are the latest trends in AI and modern web development?',
                        );
                      }}
                      className={`font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] flex items-center gap-1 cursor-pointer ${
                        activeContext === 'web' ? 'ring-1 ring-primary/80' : ''
                      }`}
                    >
                      <Globe className="size-2.5 text-muted-foreground" />
                      <span>Web Search</span>
                    </button>
                    <button
                      suppressHydrationWarning
                      type="button"
                      aria-pressed={activeContext === 'code'}
                      onClick={() => {
                        setActiveContext('code');
                        void sendPrompt(
                          'Explain best practices for clean frontend architecture and TypeScript code.',
                        );
                      }}
                      className={`font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] flex items-center gap-1 cursor-pointer ${
                        activeContext === 'code' ? 'ring-1 ring-primary/80' : ''
                      }`}
                    >
                      <Code2 className="size-2.5 text-muted-foreground" />
                      <span>Code Insights</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      suppressHydrationWarning
                      type="button"
                      onClick={() => openAttachmentModal(inputMessage || undefined)}
                      className="size-7 rounded-xs bg-background text-foreground hover:bg-muted transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      <Paperclip className="size-3.5" />
                    </button>
                    <button
                      suppressHydrationWarning
                      type="button"
                      onClick={() => void sendPrompt()}
                      disabled={isLoading}
                      className="size-7 rounded-xs bg-primary text-primary-foreground hover:opacity-90 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden lg:flex w-full lg:w-[280px] shrink-0 flex-col justify-between h-full overflow-y-auto scrollbar-none rounded-sm bg-background p-3.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-3"
        >
          {/* Assistant Capabilities */}
          <div className="space-y-1.5 p-0.5">
            <h2 className="font-inter text-[10px] font-bold text-foreground uppercase tracking-wider">
              Assistant Capabilities
            </h2>

            <div className="space-y-1.5">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openAttachmentModal(cap.prompt)}
                    className="w-full flex items-center justify-between p-2 rounded-xs bg-muted/40 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] hover:shadow-md transition-all group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="size-7 rounded-xs bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-inter text-[11px] font-bold text-foreground leading-tight truncate">
                          {cap.title}
                        </h3>
                        <p className="font-inter text-[9px] text-muted-foreground truncate mt-0.5">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5 p-0.5">
            <h2 className="font-inter text-[10px] font-bold text-foreground uppercase tracking-wider">
              Quick Actions
            </h2>

            <div className="space-y-1.5">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openAttachmentModal(action.prompt)}
                    className="w-full flex items-center justify-between p-2 rounded-xs bg-muted/40 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="size-7 rounded-xs bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="font-inter text-[11px] font-bold text-foreground truncate">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Context Box */}
          <div className="rounded-xs bg-primary text-primary-foreground p-3 space-y-2 shadow-xs shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-inter text-[11px] font-bold tracking-tight">Portfolio Context</h3>
              <span className="font-inter px-1.5 py-0.5 rounded-xs bg-primary-foreground/20 text-[9px] font-bold tracking-wide uppercase">
                Live
              </span>
            </div>

            <p className="font-inter text-[10px] opacity-90 leading-relaxed">
              I have access to your profile data including projects, skills, experience, and
              achievements.
            </p>

            <button
              type="button"
              onClick={() => void handleRefreshContext()}
              disabled={isLoading || isRefreshingContext}
              className="w-full py-1.5 px-2.5 rounded-xs bg-background text-foreground hover:bg-muted text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`size-3 text-primary ${isRefreshingContext ? 'animate-spin' : ''}`}
              />
              <span className="font-inter">
                {isRefreshingContext ? 'Refreshing...' : 'Refresh Context'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
