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
  RefreshCw,
  RotateCw,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import RobotImage from '@/assets/images/robot.png';

const SUGGESTION_CARDS = [
  {
    id: 'summarize',
    title: 'Summarize',
    subtitle: 'My experience',
    icon: MessageSquare,
  },
  {
    id: 'tell-me',
    title: 'Tell me about',
    subtitle: 'My projects',
    icon: MessageSquare,
  },
  {
    id: 'generate',
    title: 'Generate',
    subtitle: 'Cover letter',
    icon: MessageSquare,
  },
];

const CAPABILITIES = [
  {
    title: 'Portfolio Q&A',
    description: 'Ask anything about your background',
    icon: Brain,
  },
  {
    title: 'Project Explainer',
    description: 'Detailed insights about your projects',
    icon: Code2,
  },
  {
    title: 'Skills Analyzer',
    description: 'Analyze and showcase your stack',
    icon: Sparkles,
  },
  {
    title: 'Resume Reviewer',
    description: 'Get feedback on your resume',
    icon: FileText,
  },
  {
    title: 'Career Guidance',
    description: 'Personalized career advice',
    icon: UserCheck,
  },
];

const QUICK_ACTIONS = [
  { label: 'Summarize My Background', icon: Briefcase },
  { label: 'List My Technical Skills', icon: Code2 },
  { label: 'Show My Achievements', icon: Award },
  { label: 'Generate Cover Letter', icon: FileText },
];

const EXPERIENCE_ITEMS = [
  {
    role: 'CONSULTLY - Startup Founder',
    description:
      'Founded and led CONSULTLY, an AI-powered consultation platform. Handled product strategy, development, and marketing end-to-end.',
    period: 'Jan 2025 - Present',
  },
  {
    role: 'Full Stack Developer Intern - CodSoft',
    description:
      'Developed responsive web applications using React, Node.js, and MongoDB. Collaborated with remote teams and improved application performance.',
    period: 'Jan 2025 - Mar 2025',
  },
  {
    role: 'Frontend Developer Intern - TechVerse Solutions',
    description:
      'Built modern UI components and improved user experience. Worked with HTML, CSS, JavaScript, and React.',
    period: 'Jul 2024 - Sep 2024',
  },
  {
    role: 'Software Development Intern - DevBridge',
    description:
      'Contributed to real-world projects and learned agile development practices. Gained experience in debugging, testing, and version control.',
    period: 'May 2024 - Jul 2024',
  },
];

export default function AIAssistantPage() {
  const [inputMessage, setInputMessage] = useState('');

  return (
    <div className="font-inter flex h-full w-full max-h-[620px] flex-col overflow-y-auto select-none rounded-sm bg-background p-2.5 text-foreground shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] lg:overflow-hidden scrollbar-none sm:p-3.5">
      <div className="font-inter flex flex-col lg:flex-row gap-3.5 w-full h-full p-1">
        {/* ================= LEFT MAIN CONTENT ================= */}
        <div className="flex-1 min-w-0 flex flex-col h-full gap-3 p-1">
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0 p-0.5"
          >
            {SUGGESTION_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
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
            <div className="flex-1 overflow-y-auto space-y-3 p-1.5 scrollbar-none max-h-[220px]">
              {/* User Message Bubble */}
              <div className="flex flex-col items-end gap-0.5">
                <div className="font-inter rounded-xs bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-medium max-w-xs shadow-xs">
                  Can you give me a summary of my experience?
                </div>
                <span className="font-inter text-[9px] text-muted-foreground px-1">10:00 AM</span>
              </div>

              {/* AI Response Block */}
              <div className="flex items-start gap-2.5">
                <div className="size-7 rounded-xs bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-0.5 shadow-xs">
                  <Zap className="size-3.5 fill-current" />
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="rounded-xs bg-muted/40 p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-2">
                    <h3 className="font-inter text-[11px] font-semibold text-foreground">
                      Can you give me a summary of my experience?
                    </h3>

                    <div className="space-y-1.5">
                      {EXPERIENCE_ITEMS.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
                        >
                          <div className="size-6 rounded-xs bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 mt-0.5">
                            <RotateCw className="size-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-inter text-[11px] font-bold text-foreground truncate">
                                {item.role}
                              </h4>
                              <span className="font-inter text-[9px] text-muted-foreground shrink-0 whitespace-nowrap">
                                {item.period}
                              </span>
                            </div>
                            <p className="font-inter text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Metadata Actions */}
                  <div className="flex items-center justify-between px-1">
                    <span className="font-inter text-[9px] text-muted-foreground">10:00 AM</span>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <button className="hover:text-foreground transition-colors cursor-pointer">
                        <ThumbsUp className="size-3" />
                      </button>
                      <button className="hover:text-foreground transition-colors cursor-pointer">
                        <ThumbsDown className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="pt-2 shrink-0 p-0.5">
              <div className="rounded-xs bg-muted/40 p-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-1.5">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your portfolio..."
                  className="font-inter w-full bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none px-1"
                />

                <div className="flex items-center justify-between flex-wrap gap-1.5 pt-1.5">
                  <div className="flex items-center gap-1 flex-wrap">
                    <button className="font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] cursor-pointer">
                      Portfolio Context
                    </button>
                    <button className="font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] flex items-center gap-1 cursor-pointer">
                      <Globe className="size-2.5 text-muted-foreground" />
                      <span>Web Search</span>
                    </button>
                    <button className="font-inter px-2 py-0.5 rounded-xs bg-background text-[9px] font-medium text-foreground hover:bg-muted transition-colors shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] flex items-center gap-1 cursor-pointer">
                      <Code2 className="size-2.5 text-muted-foreground" />
                      <span>Code Insights</span>
                    </button>
                  </div>

                  <button className="size-7 rounded-xs bg-primary text-primary-foreground hover:opacity-90 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-xs">
                    <Send className="size-3.5" />
                  </button>
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
          className="w-full lg:w-[280px] shrink-0 flex flex-col justify-between h-full overflow-y-auto scrollbar-none rounded-sm bg-background p-3.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] space-y-3"
        >
          {/* Assistant Capabilities */}
          <div className="space-y-1.5 p-0.5">
            <h2 className="font-inter text-[10px] font-bold text-foreground uppercase tracking-wider">
              Assistant Capabilities
            </h2>

            <div className="space-y-1.5">
              {CAPABILITIES.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <button
                    key={idx}
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
              {QUICK_ACTIONS.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
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

            <button className="w-full py-1.5 px-2.5 rounded-xs bg-background text-foreground hover:bg-muted text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs">
              <RefreshCw className="size-3 text-primary" />
              <span className="font-inter">Refresh Context</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
