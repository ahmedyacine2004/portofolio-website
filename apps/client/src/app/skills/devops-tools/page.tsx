'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Check,
  ChevronRight,
  ArrowRight,
  GitBranch,
  Workflow,
  Triangle,
  Send,
  Flame,
  Sparkles,
  Box,
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const hoverCardEffect = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: { scale: 0.99 },
};

// Brand Icon Helpers
const DockerIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#2496ED]/10 text-[#2496ED]">
    <Box className="size-3.5" />
  </div>
);

const GitIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#F05032]/10 text-[#F05032]">
    <GitBranch className="size-3.5" />
  </div>
);

const GitHubActionsIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#2088FF]/10 text-[#2088FF]">
    <Workflow className="size-3.5" />
  </div>
);

const VercelIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-foreground/10 text-foreground">
    <Triangle className="size-3 fill-current rotate-0" />
  </div>
);

const PostmanIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#FF6C37]/10 text-[#FF6C37]">
    <Send className="size-3.5" />
  </div>
);

const FirebaseIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#FFCA28]/10 text-[#FFCA28]">
    <Flame className="size-3.5" />
  </div>
);

const OpenAIIcon = () => (
  <div className="flex size-6 items-center justify-center rounded-md bg-[#10A37F]/10 text-[#10A37F]">
    <Sparkles className="size-3.5" />
  </div>
);

export default function DevOpsToolsWorkspaceView() {
  const toolsData = [
    {
      icon: DockerIcon,
      name: 'Docker',
      purpose: 'Containerization',
      usedFor: 'Consistent environments',
      level: 5,
      percentage: 90,
    },
    {
      icon: GitIcon,
      name: 'Git',
      purpose: 'Version Control',
      usedFor: 'Tracking & collaboration',
      level: 5,
      percentage: 95,
    },
    {
      icon: GitHubActionsIcon,
      name: 'GitHub Actions',
      purpose: 'CI/CD Automation',
      usedFor: 'Automated workflows',
      level: 5,
      percentage: 85,
    },
    {
      icon: VercelIcon,
      name: 'Vercel',
      purpose: 'Hosting & Deployment',
      usedFor: 'Production deployment',
      level: 5,
      percentage: 90,
    },
    {
      icon: PostmanIcon,
      name: 'Postman',
      purpose: 'API Testing API',
      usedFor: 'Testing & documentation',
      level: 4,
      percentage: 90,
    },
    {
      icon: FirebaseIcon,
      name: 'Firebase',
      purpose: 'Backend Services',
      usedFor: 'Auth, DB & Storage',
      level: 4,
      percentage: 80,
    },
    {
      icon: OpenAIIcon,
      name: 'OpenAI API',
      purpose: 'AI Integration',
      usedFor: 'Intelligent features',
      level: 4,
      percentage: 85,
    },
  ];

  const workflowSteps = [
    {
      num: 1,
      title: 'Plan & Design',
      desc: 'Define requirements and architecture',
    },
    {
      num: 2,
      title: 'Develop',
      desc: 'Build clean and scalable code',
    },
    {
      num: 3,
      title: 'Version Control',
      desc: 'Commit and push changes',
    },
    {
      num: 4,
      title: 'Test & Validate',
      desc: 'Test APIs and application',
    },
    {
      num: 5,
      title: 'Build',
      desc: 'Prepare production build',
    },
    {
      num: 6,
      title: 'Deploy',
      desc: 'Deploy to production',
    },
  ];

  const projectApplications = [
    {
      name: 'CONSULTIFY - Consulting Platform',
      tags: ['Docker', 'Git', 'Vercel'],
    },
    {
      name: 'AI Chatbot Assistant',
      tags: ['OpenAI API', 'Firebase', 'Vercel'],
    },
    {
      name: 'E-Commerce Platform',
      tags: ['Next.js', 'Tailwind', 'Stripe'],
    },
    {
      name: 'Dashboard Analytics',
      tags: ['PostgreSQL', 'Docker', 'GitHub Actions'],
    },
    {
      name: 'Portfolio Website',
      tags: ['Vercel', 'Next.js', 'GitHub Actions'],
    },
    {
      name: 'Booking Platform',
      tags: ['Next.js', 'PostgreSQL', 'Docker'],
    },
  ];

  const taskRunnerItems = [
    'Frontend Layer',
    'Backend Layer',
    'Database Layer',
    'API Integration Layer',
    'Security & Auth Layer',
    'Deployment',
  ];

  return (
    <motion.div
      className="font-inter h-full w-full space-y-6 rounded-[8px] bg-background p-6 text-foreground overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER SECTION */}
      <motion.div variants={cardVariants} className="space-y-1">
        <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground">
          DevOps and Tools WORKSPACE
        </h1>
        <p className="font-inter text-[12.5px] text-muted-foreground">
          The tools I use to build, automate, test and deliver high-quality applications.
        </p>
      </motion.div>

      {/* TOP SECTION: Core Data Domains & Development Workflow */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* CORE DATA DOMAINS (TABLE) */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-8"
        >
          <div>
            <h2 className="font-inter mb-4 text-[13px] font-bold uppercase tracking-wider text-foreground">
              Core Data Domains
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/20 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2.5 pl-3 font-semibold">TOOL</th>
                    <th className="py-2.5 font-semibold">PURPOSE</th>
                    <th className="py-2.5 font-semibold">USED FOR</th>
                    <th className="py-2.5 pr-3 font-semibold">LEVEL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-[11px]">
                  {toolsData.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <tr key={idx} className="transition-colors hover:bg-muted/10">
                        <td className="py-2.5 pl-3 font-semibold text-foreground">
                          <div className="flex items-center gap-2.5">
                            <IconComponent />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-muted-foreground">{item.purpose}</td>
                        <td className="py-2.5 text-muted-foreground">{item.usedFor}</td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <span
                                key={dot}
                                className={`size-2 rounded-full ${
                                  dot <= item.level
                                    ? 'bg-blue-600 dark:bg-blue-500'
                                    : 'bg-muted/60 dark:bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* DEVELOPMENT WORKFLOW */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-start rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <h2 className="font-inter mb-4 text-[13px] font-bold uppercase tracking-wider text-foreground">
            DEVELOPMENT WORKFLOW
          </h2>

          <div className="relative mt-1 flex flex-col justify-start gap-4 pl-1">
            {/* Vertical Connecting Line */}
            <div className="absolute bottom-3 left-3.5 top-3 w-0.5 bg-border/50" />

            {workflowSteps.map((step) => (
              <motion.div
                key={step.num}
                whileHover={{ x: 2 }}
                className="relative z-10 flex items-start gap-3 transition-transform"
              >
                <div className="font-inter flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white shadow-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-inter text-[11.5px] font-bold leading-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-inter mt-0.5 text-[9.5px] leading-tight text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM SECTION: 3 EQUAL/PROPORTIONAL COLUMNS */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
        {/* COLUMN 1: MY EXPERTISE */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <h2 className="font-inter mb-4 text-[12px] font-bold uppercase tracking-wider text-foreground">
              MY EXPERTISE
            </h2>

            <div className="space-y-3.5">
              {toolsData.map((tool, idx) => {
                const IconComponent = tool.icon;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <IconComponent />
                        <span className="font-semibold text-foreground">{tool.name}</span>
                      </div>
                      <span className="font-bold text-foreground">{tool.percentage}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                      <motion.div
                        className="h-full rounded-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${tool.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * idx, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* COLUMN 2: WHERE I APPLIED THEM */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <h2 className="font-inter mb-4 text-[12px] font-bold uppercase tracking-wider text-foreground">
              WHERE I APPLIED THEM
            </h2>

            <div className="space-y-3">
              {projectApplications.map((project, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-inter text-[10.5px] font-bold text-foreground">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-inter rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 text-[9.5px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-inter mt-4 flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 transition-colors hover:text-blue-500"
          >
            Show more <ArrowRight className="size-3" />
          </motion.button>
        </motion.div>

        {/* COLUMN 3: TASK RUNNER */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col justify-between rounded-[12px] border border-border/40 bg-card p-5 shadow-sm lg:col-span-4"
        >
          <div>
            <h2 className="font-inter mb-4 text-[12px] font-bold uppercase tracking-wider text-foreground">
              TASK RUNNER
            </h2>

            <div className="space-y-3">
              {taskRunnerItems.map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-border/30 pb-2.5 last:border-b-0"
                >
                  <span className="font-inter text-[11px] font-medium text-foreground">{task}</span>
                  <div className="flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-0.5 text-[9.5px] font-bold text-white shadow-xs">
                    <span>Completed</span>
                    <Check className="size-3 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
