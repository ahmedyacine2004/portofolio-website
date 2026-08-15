'use client';

import { motion, Variants } from 'framer-motion';
import { Cloud, Cpu, CreditCard, Image as ImageIcon, Mail, Zap } from 'lucide-react';

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

const hoverCardEffect: Variants = {
  hover: {
    y: -4,
    scale: 1.015,
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
  tap: { scale: 0.98 },
};

const API_SERVICES = [
  {
    title: 'OpenAI API',
    icon: Zap,
    description: 'AI-powered features and intelligent automation',
    projects: ['AI Assistant', 'Content Generation'],
    level: 'Advanced',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Stripe',
    icon: CreditCard,
    description: 'Payment processing and subscription management',
    projects: ['Consultify', 'E-Commerce'],
    level: 'Advanced',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Cloudinary',
    icon: ImageIcon,
    description: 'Image and video management and optimization',
    projects: ['Portfolio', 'Content Management'],
    level: 'Advanced',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Resend',
    icon: Mail,
    description: 'Transactional email service',
    projects: ['Notifications', 'Newsletter'],
    level: 'Intermediate',
    color: 'text-pink-600 dark:text-pink-400',
  },
  {
    title: 'Firebase',
    icon: Cloud,
    description: 'Real-time database and authentication',
    projects: ['Real-time Apps', 'Authentication'],
    level: 'Advanced',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: 'GitHub API',
    icon: Cpu,
    description: 'Repository management and automation',
    projects: ['CI/CD', 'Repository Integration'],
    level: 'Intermediate',
    color: 'text-gray-700 dark:text-gray-300',
  },
];

const IMPACT = [
  { label: 'APIs Integrated', value: '6+' },
  { label: 'Projects with APIs', value: '12+' },
  { label: 'Payment Transactions', value: '1000+' },
  { label: 'API Response Time', value: '<200ms' },
];

export default function ApisServicesPage() {
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
          APIs & Services
        </h1>
        <p className="font-inter text-[13px] text-muted-foreground">
          Third-party integrations and APIs powering my applications
        </p>
      </motion.div>

      {/* GRID OF API CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {API_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover="hover"
              initial="initial"
              className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm overflow-hidden"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-[8px] bg-muted ${service.color}`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <h2 className="font-inter text-[14px] font-bold text-foreground">
                    {service.title}
                  </h2>
                  <span className={`text-[10px] font-medium ${service.color}`}>
                    {service.level}
                  </span>
                </div>
              </div>

              <p className="font-inter text-[12px] text-muted-foreground mb-4">
                {service.description}
              </p>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-foreground">Used in:</span>
                <div className="flex flex-wrap gap-1">
                  {service.projects.map((project) => (
                    <span
                      key={project}
                      className="text-[10px] bg-muted px-2 py-1 rounded-[4px] text-muted-foreground"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* IMPACT SECTION */}
      <motion.div variants={cardVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {IMPACT.map((item) => (
          <div
            key={item.label}
            className="rounded-[8px] border border-border/40 bg-card p-4 shadow-sm text-center"
          >
            <p className="font-inter text-[12px] font-bold text-foreground">{item.value}</p>
            <p className="font-inter text-[10px] text-muted-foreground">{item.label}</p>
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
              Pro Tip: Smart API Integration
            </p>
            <p className="font-inter text-[11px] text-muted-foreground">
              Choose APIs that complement your tech stack and provide real value. Each integration
              should solve a specific problem or enhance user experience significantly.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
