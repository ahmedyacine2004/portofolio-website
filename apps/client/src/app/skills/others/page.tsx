'use client';

import { motion, Variants } from 'framer-motion';
import { Bug, Code2, GitBranch, Package, Zap } from 'lucide-react';

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

const TOOLS = [
  {
    title: 'Git & GitHub',
    icon: GitBranch,
    description: 'Version control and collaboration',
    skills: [
      'Version Control',
      'Branching Strategy',
      'Pull Requests',
      'Merge Conflicts',
      'GitHub Actions',
      'CI/CD Integration',
    ],
    level: 'Advanced',
    color: 'text-gray-700 dark:text-gray-300',
  },
  {
    title: 'npm & pnpm',
    icon: Package,
    description: 'Package management and dependency control',
    skills: [
      'Package Management',
      'Monorepo Setup',
      'Workspace Configuration',
      'Dependency Resolution',
      'Script Management',
      'Version Publishing',
    ],
    level: 'Advanced',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    title: 'Postman',
    icon: Code2,
    description: 'API testing and development',
    skills: [
      'API Testing',
      'Request Creation',
      'Collections',
      'Environments',
      'Mock Servers',
      'Documentation',
    ],
    level: 'Advanced',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: 'Jest',
    icon: Bug,
    description: 'Unit testing and code coverage',
    skills: [
      'Unit Testing',
      'Mocking',
      'Snapshot Testing',
      'Code Coverage',
      'Test Reports',
      'Integration Testing',
    ],
    level: 'Advanced',
    color: 'text-red-500 dark:text-red-400',
  },
  {
    title: 'ESLint',
    icon: Zap,
    description: 'Code quality and style enforcement',
    skills: [
      'Linting Rules',
      'Custom Rules',
      'Code Formatting',
      'Error Detection',
      'Best Practices',
      'Auto-fixing',
    ],
    level: 'Advanced',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Prettier',
    icon: Code2,
    description: 'Code formatting and consistency',
    skills: [
      'Code Formatting',
      'Consistency Rules',
      'Configuration',
      'Integration with Tools',
      'Pre-commit Hooks',
      'Team Standards',
    ],
    level: 'Advanced',
    color: 'text-blue-600 dark:text-blue-400',
  },
];

const CATEGORIES = [
  { name: 'Version Control', count: '2' },
  { name: 'Package Managers', count: '2' },
  { name: 'Testing', count: '1' },
  { name: 'Linting & Formatting', count: '2' },
];

const WORKFLOWS = [
  {
    title: 'Development Workflow',
    steps: [
      'Clone repository with Git',
      'Install dependencies with npm/pnpm',
      'Run linting with ESLint',
      'Format code with Prettier',
      'Run tests with Jest',
      'Push changes to GitHub',
    ],
  },
  {
    title: 'API Development',
    steps: [
      'Create API endpoints in backend',
      'Test with Postman',
      'Document endpoints',
      'Integrate with frontend',
      'Write integration tests',
      'Deploy to production',
    ],
  },
];

export default function OthersPage() {
  return (
    <motion.div
      className="h-full w-full space-y-6 rounded-[8px] p-6 overflow-y-auto overflow-x-hidden bg-background text-foreground md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      <motion.div variants={cardVariants} className="space-y-2">
        <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
          Others & Tools
        </h1>
        <p className="font-inter text-[13px] text-muted-foreground">
          Essential development tools and utilities
        </p>
      </motion.div>

      {/* TOOLS GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              variants={cardVariants}
              className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-[8px] bg-muted ${tool.color}`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <h2 className="font-inter text-[14px] font-bold text-foreground">{tool.title}</h2>
                  <span className={`text-[10px] font-medium ${tool.color}`}>{tool.level}</span>
                </div>
              </div>

              <p className="font-inter text-[12px] text-muted-foreground mb-4">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {tool.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] bg-muted px-2 py-1 rounded-[4px] text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CATEGORIES */}
      <motion.div variants={cardVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm"
          >
            <p className="font-inter text-[11px] font-bold text-muted-foreground mb-2">
              {cat.name}
            </p>
            <p className="font-inter text-[16px] font-bold text-foreground">{cat.count}</p>
          </div>
        ))}
      </motion.div>

      {/* WORKFLOWS */}
      <motion.div variants={cardVariants} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {WORKFLOWS.map((workflow) => (
          <div
            key={workflow.title}
            className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
          >
            <h2 className="font-inter text-[14px] font-bold text-foreground mb-4">
              {workflow.title}
            </h2>
            <div className="space-y-2">
              {workflow.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[12px] font-bold text-blue-600 dark:text-blue-400 shrink-0 w-6">
                    {i + 1}.
                  </span>
                  <span className="text-[12px] text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* INFO BANNER */}
      <motion.div
        variants={cardVariants}
        className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm"
      >
        <div className="flex gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Zap className="size-3.5" />
          </div>
          <div>
            <p className="font-inter text-[12px] font-bold text-foreground mb-1">
              Developer Productivity
            </p>
            <p className="font-inter text-[11px] text-muted-foreground">
              The right tools and workflows significantly improve development speed and code
              quality. Invest time in mastering these tools for long-term productivity gains.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
