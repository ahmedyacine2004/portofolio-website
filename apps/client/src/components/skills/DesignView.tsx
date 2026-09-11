'use client';

import { FrontendWorkspaceData } from '@/data/skills/react-workspace';
import { useTranslation } from '@/hooks/use-translation';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  Award,
  Boxes,
  Check,
  Clock,
  Compass,
  Copy,
  Folder,
  Image as ImageIcon,
  Layers,
  Palette,
  Shield,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  children,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-pink-600 dark:text-pink-400"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

interface DesignViewProps {
  data: FrontendWorkspaceData;
  skillKey?: string;
}

export default function DesignView({ data, skillKey }: DesignViewProps) {
  const {
    skillName,
    header,
    proficiency,
    whyILove,
    applications,
    whatIBuild,
    impactAndStats,
    techStack,
    toolkit,
    coreStrengths,
    technicalStrengths,
  } = data;

  const resolvedSkillKey =
    skillKey ||
    (skillName.toLowerCase().includes('figma')
      ? 'figma'
      : skillName.toLowerCase().includes('photo')
        ? 'photoshop'
        : skillName.toLowerCase().includes('illustrator')
          ? 'illustrator'
          : skillName.toLowerCase().includes('after')
            ? 'after-effects'
            : skillName.toLowerCase().includes('blender')
              ? 'blender'
              : skillName.toLowerCase().replace(/[^a-z0-9]/g, ''));

  const { t, tArray, tObject, locale } = useTranslation();

  useEffect(() => {
    const metaTitle = t(
      `skillPages.${resolvedSkillKey}.metaTitle`,
      `${skillName} Workspace | Skills`,
    );
    if (metaTitle && typeof document !== 'undefined') {
      document.title = metaTitle;
    }
  }, [locale, resolvedSkillKey, t, skillName]);

  const [activeTab, setActiveTab] = useState<'gallery' | 'components' | 'tokens'>('gallery');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const defaultDesignTokens = useMemo(
    () => [
      { name: 'Electric Pink', hex: '#ec4899', role: 'Brand Accent / Highlights' },
      { name: 'Cyber Blue', hex: '#2563eb', role: 'Primary Action / Interactive' },
      { name: 'Deep Indigo', hex: '#6366f1', role: 'Secondary Accents' },
      { name: 'Emerald Glow', hex: '#10b981', role: 'Success / Active Badges' },
      { name: 'Dark Surface', hex: '#0f172a', role: 'Background Canvas / Contrast' },
    ],
    [],
  );

  const translatedTokens = tObject<Array<{ name?: string; hex?: string; role?: string }>>(
    `skillPages.${resolvedSkillKey}.gallery.colorTokens`,
    [],
  );

  const displayTokens = useMemo(() => {
    return defaultDesignTokens.map((token, idx) => {
      const trans = translatedTokens?.[idx];
      return {
        ...token,
        name: trans?.name ?? token.name,
        role: trans?.role ?? token.role,
      };
    });
  }, [defaultDesignTokens, translatedTokens]);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const defaultCreativeWorkflow = useMemo(
    () => [
      {
        step: '01',
        title: 'Research & Moodboard',
        detail: 'Visual references, typography & palette curation',
      },
      {
        step: '02',
        title: 'Component Wireframing',
        detail: 'Layout grids, hierarchy & low-fidelity wireframes',
      },
      {
        step: '03',
        title: 'Design System & Tokens',
        detail: 'Auto layout, variants, and scalable style guides',
      },
      {
        step: '04',
        title: 'Hi-Fi Prototyping',
        detail: 'Micro-interactions, animation physics & testing',
      },
      {
        step: '05',
        title: 'Production Delivery',
        detail: 'SVG optimization, vector exports & design handoff',
      },
    ],
    [],
  );

  const translatedWorkflow = tObject<Array<{ step?: string; title?: string; detail?: string }>>(
    `skillPages.${resolvedSkillKey}.workflow.stages`,
    [],
  );

  const displayWorkflow = useMemo(() => {
    return defaultCreativeWorkflow.map((item, idx) => {
      const trans = translatedWorkflow?.[idx];
      return {
        ...item,
        title: trans?.title ?? item.title,
        detail: trans?.detail ?? item.detail,
      };
    });
  }, [defaultCreativeWorkflow, translatedWorkflow]);

  const translatedMetrics = tObject<Array<{ label: string; value: string }>>(
    `skillPages.${resolvedSkillKey}.header.metrics`,
    [],
  );

  const metrics = useMemo(() => {
    return header.metrics.map((metric, i) => ({
      ...metric,
      label: translatedMetrics?.[i]?.label ?? metric.label,
      value: translatedMetrics?.[i]?.value ?? metric.value,
    }));
  }, [header.metrics, translatedMetrics]);

  const translatedTenets = tArray<string>(`skillPages.${resolvedSkillKey}.designTenets.items`);
  const displayTenets = translatedTenets.length > 0 ? translatedTenets : whyILove;

  const translatedApps = tObject<
    Array<{ id?: string; title?: string; description?: string; status?: string; badge?: string }>
  >(`skillPages.${resolvedSkillKey}.applications.items`, []);

  const displayApplications = useMemo(() => {
    return applications.map((app, idx) => {
      const trans = translatedApps?.[idx];
      return {
        ...app,
        title: trans?.title ?? app.title,
        description: trans?.description ?? app.description,
        status: trans?.status ?? app.status,
        badge: trans?.badge ?? app.badge,
      };
    });
  }, [applications, translatedApps]);

  const translatedWhatIBuild = tArray<string>(
    `skillPages.${resolvedSkillKey}.componentSystems.items`,
  );

  const displayWhatIBuild = useMemo(() => {
    return whatIBuild.map((item, idx) => ({
      ...item,
      label: translatedWhatIBuild?.[idx] ?? item.label,
    }));
  }, [whatIBuild, translatedWhatIBuild]);

  const translatedStats = tObject<Array<{ label: string; value: string }>>(
    `skillPages.${resolvedSkillKey}.impact.stats`,
    [],
  );

  const displayStats = useMemo(() => {
    return impactAndStats.map((stat, idx) => ({
      ...stat,
      label: translatedStats?.[idx]?.label ?? stat.label,
      value: translatedStats?.[idx]?.value ?? stat.value,
    }));
  }, [impactAndStats, translatedStats]);

  const translatedToolkit = tObject<Array<{ label: string; percentage?: number }>>(
    `skillPages.${resolvedSkillKey}.toolkit.items`,
    [],
  );

  const displayToolkit = useMemo(() => {
    return toolkit.map((tool, idx) => ({
      ...tool,
      label: translatedToolkit?.[idx]?.label ?? tool.label,
      percentage: translatedToolkit?.[idx]?.percentage ?? tool.percentage,
    }));
  }, [toolkit, translatedToolkit]);

  const translatedCoreStrengths = tArray<string>(
    `skillPages.${resolvedSkillKey}.architecturePrinciples.items`,
  );
  const displayCoreStrengths =
    translatedCoreStrengths.length > 0 ? translatedCoreStrengths : coreStrengths;

  const translatedTechStrengths = tObject<Array<{ label: string; percentage?: number }>>(
    `skillPages.${resolvedSkillKey}.technicalDepth.items`,
    [],
  );

  const displayTechStrengths = useMemo(() => {
    return technicalStrengths.map((tech, idx) => ({
      ...tech,
      label: translatedTechStrengths?.[idx]?.label ?? tech.label,
      percentage: translatedTechStrengths?.[idx]?.percentage ?? tech.percentage,
    }));
  }, [technicalStrengths, translatedTechStrengths]);

  return (
    <motion.div
      className="w-full space-y-6 rounded-[8px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PAGE TITLE & CREATIVE STUDIO HEADER */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col justify-between gap-3 border-b border-border/40 pb-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#0b1633] text-pink-400 border border-pink-900/80">
            <Palette className="size-5" />
          </div>
          <div>
            <h1 className="font-inter text-xl font-black uppercase tracking-tight md:text-[22px]">
              {t(
                `skillPages.${resolvedSkillKey}.workspaceTitle`,
                `DESIGN WORKSPACE -${skillName}-`,
              )}
            </h1>
            <p className="text-[12px] text-muted-foreground">
              {t(
                `skillPages.${resolvedSkillKey}.workspaceSubtitle`,
                'UI/UX design systems, vector art, visual asset library, and prototype gallery',
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-pink-900/80 bg-[#0b1633] px-3 py-1 font-mono text-[11px] font-semibold text-pink-300">
            <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
            {t(`skillPages.${resolvedSkillKey}.creativeStudio`, 'CREATIVE STUDIO')}
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.autoLayoutBadge`, 'Auto Layout Ready')}
          </span>
          <span className="rounded-[6px] border border-border/50 bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.vectorPrecisionBadge`, 'Vector Precision')}
          </span>
        </div>
      </motion.div>

      {/* TOP ROW: INTRO CARD, VISUAL PROFICIENCY GAUGE, CREATIVE TENETS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Intro Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-[#0b1633] text-pink-400 border border-pink-900/80">
              <Wand2 className="size-6" />
            </div>
            <div>
              <h2 className="font-inter text-[20px] font-bold text-foreground">
                {t(`skillPages.${resolvedSkillKey}.header.title`, header.title)}
              </h2>
              <p className="text-[11px] font-mono text-pink-600 dark:text-pink-400">
                {t(
                  `skillPages.${resolvedSkillKey}.header.category`,
                  'CREATIVE SUITE & DESIGN SYSTEM',
                )}
              </p>
            </div>
          </div>
          <p className="mb-2 text-[13px] font-bold text-foreground">
            {t(`skillPages.${resolvedSkillKey}.header.subtitle`, header.subtitle)}
          </p>
          <p className="mb-6 text-[12px] leading-relaxed text-muted-foreground">
            {t(`skillPages.${resolvedSkillKey}.header.description`, header.description)}
          </p>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {metrics.map((metric, i) => {
              const Icon = i === 0 ? Clock : i === 1 ? Folder : i === 2 ? Award : Palette;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-[8px] border border-border/40 p-2 transition-colors hover:bg-white dark:hover:bg-muted/30"
                >
                  <div className="flex size-6 shrink-0 items-center justify-center text-pink-600 dark:text-pink-400">
                    <Icon className="size-4 shrink-0" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[12px] font-bold leading-tight">
                      {metric.value}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground leading-tight">
                      {metric.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Visual Mastery Gauge */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center justify-center rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.mastery.title`, 'Visual Mastery')}
            </h3>
            <Activity className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <CircularProgress percentage={proficiency} size={130} strokeWidth={10}>
            <span className="text-[24px] font-black">{proficiency}%</span>
            <span className="text-[10px] font-medium text-muted-foreground">
              {t(`skillPages.${resolvedSkillKey}.mastery.label`, 'Mastery')}
            </span>
          </CircularProgress>
        </motion.div>

        {/* Creative Philosophy */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.designTenets.title`, 'Design Tenets')}
            </h3>
            <Sparkles className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="space-y-2.5">
            {displayTenets.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px]">
                <div className="size-1.5 shrink-0 rounded-full bg-pink-500" />
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* INTERACTIVE GALLERY & ASSET SHOWCASE */}
      <motion.div
        variants={cardVariants}
        className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm"
      >
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-pink-600 dark:text-pink-400" />
              <h2 className="font-inter text-[16px] font-black uppercase tracking-tight text-foreground md:text-[18px]">
                {t(
                  `skillPages.${resolvedSkillKey}.gallery.title`,
                  `${skillName} Visual Asset Gallery & Design Artifacts`,
                )}
              </h2>
            </div>
            <p className="font-inter text-[12px] text-muted-foreground">
              {t(
                `skillPages.${resolvedSkillKey}.gallery.subtitle`,
                `Explore user interfaces, brand identities, custom vector assets, and design system components created with ${skillName}.`,
              )}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-[8px] bg-white p-1 border border-border/40 dark:bg-muted/30">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'gallery'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(`skillPages.${resolvedSkillKey}.gallery.tabs.gallery`, 'Gallery Grid')}
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'tokens'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(`skillPages.${resolvedSkillKey}.gallery.tabs.tokens`, 'Color Tokens')}
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`rounded-[6px] px-2.5 py-1 text-[11px] font-semibold transition-all ${
                activeTab === 'components'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(`skillPages.${resolvedSkillKey}.gallery.tabs.components`, 'UI Components')}
            </button>
          </div>
        </div>

        {/* Tab 1: Gallery Showcase Grid */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayApplications.map((app, idx) => {
              const galleryImages = [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
              ];
              const imgUrl = galleryImages[idx % galleryImages.length];

              return (
                <motion.div
                  key={app.id}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-[10px] border border-border/40 bg-white p-3.5 shadow-2xs transition-all hover:border-pink-500/40 hover:shadow-md dark:bg-muted/10"
                >
                  <div>
                    <div className="relative mb-3 h-40 w-full overflow-hidden rounded-[8px] bg-slate-950">
                      <img
                        src={imgUrl}
                        alt={app.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] font-semibold text-white backdrop-blur-md">
                        {app.badge}
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <h3 className="font-inter text-[13px] font-bold text-foreground">
                        {app.title}
                      </h3>
                      <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-pink-600 dark:text-pink-400">
                        <Sparkles className="size-2.5" />{' '}
                        {t(`skillPages.${resolvedSkillKey}.gallery.readyBadge`, 'Ready')}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2.5 text-[10px] text-muted-foreground">
                    <span>
                      {t(
                        `skillPages.${resolvedSkillKey}.gallery.designedIn`,
                        `Designed in ${skillName}`,
                      )}
                    </span>
                    <span className="font-semibold text-pink-600 dark:text-pink-400 group-hover:underline">
                      {t(
                        `skillPages.${resolvedSkillKey}.gallery.inspectDetails`,
                        'Inspect Details →',
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Color Swatches & Tokens */}
        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {displayTokens.map((token) => (
              <div
                key={token.hex}
                className="flex flex-col justify-between rounded-[10px] border border-border/40 bg-white p-3.5 dark:bg-muted/10"
              >
                <div>
                  <div
                    className="mb-3 h-20 w-full rounded-[6px] shadow-inner"
                    style={{ backgroundColor: token.hex }}
                  />
                  <h4 className="font-inter text-[12px] font-bold text-foreground">{token.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{token.role}</p>
                </div>

                <button
                  onClick={() => copyHex(token.hex)}
                  className="mt-3 flex items-center justify-between rounded-[6px] bg-card p-2 border border-border/40 font-mono text-[10.5px] text-foreground hover:bg-white dark:hover:bg-muted/40 transition-colors"
                >
                  <span>{token.hex}</span>
                  {copiedToken === token.hex ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive UI Component Sandbox */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[10px] border border-border/40 bg-white p-4 space-y-3 dark:bg-muted/10">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                {t(
                  `skillPages.${resolvedSkillKey}.gallery.uiComponents.buttonVariants`,
                  'Button Component Variants',
                )}
              </span>
              <div className="flex flex-col gap-2">
                <button className="w-full rounded-[6px] border border-pink-900/80 bg-[#0b1633] px-3 py-2 text-[12px] font-semibold text-pink-300 shadow-xs transition-colors hover:bg-pink-950/60">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.primaryButton`,
                    'Primary Pink Solid',
                  )}
                </button>
                <button className="w-full rounded-[6px] border border-pink-500/50 bg-[#0b1633] px-3 py-2 text-[12px] font-semibold text-pink-300 hover:bg-pink-950/60 transition-colors">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.secondaryButton`,
                    'Secondary Ghost Variant',
                  )}
                </button>
                <button className="w-full rounded-[6px] border border-border/60 bg-card px-3 py-2 text-[12px] font-semibold text-foreground hover:bg-white dark:hover:bg-muted/40 transition-colors">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.outlineButton`,
                    'Neutral Outline',
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-[10px] border border-border/40 bg-white p-4 space-y-3 dark:bg-muted/10">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                {t(
                  `skillPages.${resolvedSkillKey}.gallery.uiComponents.badgePrimitives`,
                  'Badge & Chip Primitives',
                )}
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-pink-900/80 bg-[#0b1633] px-3 py-1 font-mono text-[10.5px] font-bold text-pink-300">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.activeVariant`,
                    'Active Variant',
                  )}
                </span>
                <span className="rounded-full border border-blue-900/80 bg-[#0b1633] px-3 py-1 font-mono text-[10.5px] font-bold text-blue-300">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.informationTag`,
                    'Information Tag',
                  )}
                </span>
                <span className="rounded-full border border-emerald-900/80 bg-[#0b1633] px-3 py-1 font-mono text-[10.5px] font-bold text-emerald-300">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.responsiveTag`,
                    '100% Responsive',
                  )}
                </span>
                <span className="rounded-full border border-border/50 bg-card px-3 py-1 font-mono text-[10.5px] font-medium text-foreground">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.defaultToken`,
                    'Default Token',
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-[10px] border border-border/40 bg-white p-4 space-y-3 dark:bg-muted/10">
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-foreground">
                {t(
                  `skillPages.${resolvedSkillKey}.gallery.uiComponents.typographyScale`,
                  'Typography Scale',
                )}
              </span>
              <div className="space-y-1">
                <p className="font-inter text-[18px] font-black text-foreground leading-tight">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.displayBold`,
                    'Display Bold 18px',
                  )}
                </p>
                <p className="font-inter text-[13px] font-bold text-foreground">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.headingSemibold`,
                    'Heading Semibold 13px',
                  )}
                </p>
                <p className="font-inter text-[11px] font-medium text-muted-foreground">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.bodyRegular`,
                    'Body Regular 11px Inter',
                  )}
                </p>
                <p className="font-mono text-[10px] text-pink-600 dark:text-pink-400">
                  {t(
                    `skillPages.${resolvedSkillKey}.gallery.uiComponents.monospaceCode`,
                    'Monospace Code 10px',
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* MIDDLE ROW: CREATIVE WORKFLOW & DESIGN ARTIFACTS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Creative Workflow Timeline */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.workflow.title`, 'Creative Workflow')}
            </h3>
            <Compass className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="relative space-y-3.5 pl-4 before:absolute before:left-1.5 before:top-2 before:h-[88%] before:w-0.5 before:bg-pink-500/30">
            {displayWorkflow.map((step) => (
              <div key={step.step} className="relative">
                <span className="absolute -left-[19px] top-1 size-2.5 rounded-full bg-pink-600 dark:bg-pink-400 ring-4 ring-card" />
                <p className="text-[12px] font-bold leading-tight text-foreground">{step.title}</p>
                <p className="text-[10px] text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I Design (whatIBuild) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.componentSystems.title`, 'Design Output')}
            </h3>
            <Boxes className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {displayWhatIBuild.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="flex flex-col items-center justify-center gap-2 rounded-[8px] border border-border/40 bg-white p-3 text-center transition-colors hover:bg-white dark:bg-muted/20 dark:hover:bg-muted/40"
              >
                <Palette className="size-5 text-foreground/70" />
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact & Design Tools */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.impact.title`, 'Impact & Benchmarks')}
            </h3>
            <TrendingUp className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="mb-6 space-y-2">
            {displayStats.map((stat, i) => (
              <li key={i} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="size-1.5 rounded-full bg-pink-500" />
                  <span>{stat.label}</span>
                </div>
                <span className="font-mono font-bold text-foreground">{stat.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-inter mb-4 text-[14px] font-bold">
            {t(`skillPages.${resolvedSkillKey}.impact.ecosystemTitle`, 'Toolchain & Plugins')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-[4px] border border-border/50 bg-white px-2.5 py-1 text-[11px] font-medium dark:bg-muted/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM ROW: TOOLKIT GAUGES, CORE PRINCIPLES, TECHNICAL METRICS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Design Toolkit */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.toolkit.title`, 'Design Toolkit')}
            </h3>
            <Zap className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="flex justify-between">
            {displayToolkit.map((tool, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <CircularProgress percentage={tool.percentage} size={48} strokeWidth={4}>
                  <span className="text-[10px] font-bold">{tool.percentage}%</span>
                </CircularProgress>
                <span className="max-w-[60px] text-center text-[9px] leading-tight text-muted-foreground">
                  {tool.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* UI/UX Principles */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(
                `skillPages.${resolvedSkillKey}.architecturePrinciples.title`,
                'Design Principles',
              )}
            </h3>
            <Shield className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <ul className="space-y-3">
            {displayCoreStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px]">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink-500" />
                <span className="leading-snug text-muted-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technical Depth (Linear Meters) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -3 }}
          className="rounded-[12px] border border-border/40 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-inter text-[14px] font-bold">
              {t(`skillPages.${resolvedSkillKey}.technicalDepth.title`, 'Creative Execution Depth')}
            </h3>
            <Layers className="size-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="space-y-4">
            {displayTechStrengths.map((tech, i) => (
              <div key={i} className="flex items-center justify-between gap-4 text-[12px]">
                <div className="flex min-w-[140px] items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-pink-500" />
                  <span className="font-medium">{tech.label}</span>
                </div>
                <span className="font-mono font-bold">{tech.percentage}%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950">
                  <motion.div
                    className="h-full rounded-full bg-pink-600 dark:bg-pink-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
