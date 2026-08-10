'use client';

import { Bot, MessageCircle, History, Sparkles } from 'lucide-react';

export function AIAssistantSecondarySidebar() {
  return (
    <aside className="flex h-full w-[200px] flex-col rounded-sm bg-background p-3 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xs bg-primary text-primary-foreground">
            <Bot className="size-4" />
          </div>

          <div>
            <p className="text-[9px] font-semibold text-primary">AI Assistant</p>
            <h2 className="text-sm font-semibold">Portfolio AI</h2>
          </div>
        </div>
      </div>

      <button className="mb-3 flex items-center justify-center gap-2 rounded-xs bg-primary px-3 py-2 text-[10px] font-semibold text-primary-foreground">
        <Sparkles className="size-3.5" />
        New Conversation
      </button>

      <div className="mb-2 text-[8px] font-semibold uppercase tracking-wider text-foreground-secondary">
        Conversations
      </div>

      <div className="flex flex-col gap-1">
        <button className="flex items-center gap-2 rounded-xs bg-muted px-2 py-2 text-left text-[9px]">
          <MessageCircle className="size-3" />
          About Ahmed
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[9px] hover:bg-muted">
          <MessageCircle className="size-3" />
          Projects
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[9px] hover:bg-muted">
          <MessageCircle className="size-3" />
          Technical Skills
        </button>

        <button className="flex items-center gap-2 rounded-xs px-2 py-2 text-left text-[9px] hover:bg-muted">
          <History className="size-3" />
          Conversation History
        </button>
      </div>

      <div className="mt-auto rounded-xs bg-muted p-2">
        <p className="text-[8px] leading-relaxed text-foreground-secondary">
          Ask me anything about Ahmeds work, projects, skills or experience.
        </p>
      </div>
    </aside>
  );
}
