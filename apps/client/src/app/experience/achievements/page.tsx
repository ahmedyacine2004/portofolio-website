/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code,
  Crown,
  Download,
  FileText,
  GraduationCap,
  Infinity as InfinityIcon,
  Medal,
  Rocket,
  ShieldCheck,
  ShieldPlus,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Tech SVG Icon Imports
import dockerIcon from '@/assets/icons/docker.svg';
import gitIcon from '@/assets/icons/git.svg';
import mongodbIcon from '@/assets/icons/mongodb.svg';
import nestjsIcon from '@/assets/icons/nestjs.svg';
import nextjsIcon from '@/assets/icons/nextjs.svg';
import nodejsIcon from '@/assets/icons/package.svg';
import postgresqlIcon from '@/assets/icons/postgresql.svg';
import reactIcon from '@/assets/icons/react.svg';
import tailwindIcon from '@/assets/icons/tailwindcss.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badgeText: string;
  badgeType: 'milestone' | 'achievement' | 'completed';
  duration?: string;
  role?: string;
  overview: string;
  achievementsList: string[];
  impactList: string[];
  technologies: { name: string; icon: any }[];
  galleryImages: string[];
}

const TECH_ICONS = [
  { name: 'React.js', icon: reactIcon },
  { name: 'Next.js', icon: nextjsIcon },
  { name: 'Node.js', icon: nodejsIcon },
  { name: 'NestJS', icon: nestjsIcon },
  { name: 'TypeScript', icon: typescriptIcon },
  { name: 'Tailwind', icon: tailwindIcon },
  { name: 'PostgreSQL', icon: postgresqlIcon },
  { name: 'MongoDB', icon: mongodbIcon },
  { name: 'Docker', icon: dockerIcon },
  { name: 'Git and GitHub', icon: gitIcon },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'consultify',
    title: 'CONSULTIFY Founder',
    subtitle: 'Startup Journey',
    date: 'Jan 2025 - Mar 2025',
    duration: '5 Months',
    role: 'Founder & Developer',
    badgeText: 'Key Milestone',
    badgeType: 'milestone',
    overview:
      'Founded and built CONSULTIFY, an AI-powered consultation platform connecting users with verified experts. Led the product vision, development, and strategy from scratch.',
    achievementsList: [
      'Built the complete platform from idea to MVP',
      'Designed and developed scalable architecture',
      'Integrated AI recommendations and booking system',
      'Managed product, branding and user experience',
      'Gained real-world entrepreneurial experience',
    ],
    impactList: [
      "While the startup didn't reach the expected outcome, it shaped my product thinking, problem-solving skills and resilience",
      'Every lesson became a building block for my growth.',
    ],
    technologies: TECH_ICONS,
    galleryImages: ['/gallery1.png', '/gallery2.png', '/gallery3.png', '/gallery4.png'],
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    subtitle: 'Personal Project',
    date: 'Dec 2024',
    badgeText: 'Achievement',
    badgeType: 'achievement',
    overview:
      'Architected and deployed a multi-tenant web application incorporating Next.js App Router, Tailwind CSS, and serverless PostgreSQL.',
    achievementsList: [
      'Designed high-performance RESTful APIs',
      'Implemented robust OAuth authentication flow',
      'Deployed on Vercel with automated CI/CD pipeline',
    ],
    impactList: [
      'Expanded hands-on expertise in full-stack architecture and automated deployments.',
    ],
    technologies: TECH_ICONS.slice(0, 6),
    galleryImages: ['/gallery1.png', '/gallery2.png'],
  },
  {
    id: 'academic-performer',
    title: 'Top Academic Performer',
    subtitle: 'University Recognition',
    date: '2024',
    badgeText: 'Achievement',
    badgeType: 'achievement',
    overview:
      'Awarded top honors for exceptional academic performance and contributions to student tech forums.',
    achievementsList: [
      'Ranked among top percentile of computer science students',
      'Maintained consistent high marks across major courses',
    ],
    impactList: ['Recognized for academic dedication and problem-solving excellence.'],
    technologies: TECH_ICONS.slice(0, 4),
    galleryImages: ['/gallery1.png'],
  },
  {
    id: 'hackathon',
    title: 'Hackathon Participant',
    subtitle: 'Innovation Challenge',
    date: 'Nov 2024',
    badgeText: 'Completed',
    badgeType: 'completed',
    overview:
      'Participated in an intense 48-hour innovation hackathon building smart accessibility solutions.',
    achievementsList: [
      'Delivered a working prototype within tight time constraints',
      'Presented live pitch to industry judges',
    ],
    impactList: ['Sharpened rapid prototyping skills under tight deadlines.'],
    technologies: TECH_ICONS.slice(0, 5),
    galleryImages: ['/gallery2.png'],
  },
  {
    id: 'certification',
    title: 'Certification Achiever',
    subtitle: 'Continuous Learning',
    date: 'Oct 2024',
    badgeText: 'Achievement',
    badgeType: 'achievement',
    overview:
      'Earned professional cloud and full stack certifications to validate technical mastery.',
    achievementsList: [
      'Completed rigorous specialization courses',
      'Passed practical hands-on assessments',
    ],
    impactList: ['Strengthened core technical expertise in cloud platforms.'],
    technologies: TECH_ICONS.slice(0, 4),
    galleryImages: ['/gallery3.png'],
  },
];

const BADGES = [
  { icon: Trophy, name: 'Trophy' },
  { icon: Rocket, name: 'Rocket' },
  { icon: ShieldCheck, name: 'Verified' },
  { icon: Medal, name: 'Medal' },
  { icon: Crown, name: 'Leader' },
  { icon: Target, name: 'Target' },
  { icon: GraduationCap, name: 'Academic' },
  { icon: ShieldPlus, name: 'Extra' },
  { icon: Code, name: 'Developer' },
];

const DOCUMENTS = [
  { name: 'Degree Certificate.pdf', type: 'PDF' },
  { name: 'Academic Transcript.pdf', type: 'PDF' },
  { name: 'Completion Letter.pdf', type: 'PDF' },
];

export default function AchievementsPage() {
  const [selectedId, setSelectedId] = useState<string>('consultify');
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const selectedAchievement =
    ACHIEVEMENTS.find((item) => item.id === selectedId) || ACHIEVEMENTS[0];

  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-[var(--color-bg-primary)] p-4 space-y-4 text-[var(--color-text-primary)] font-inter border border-border/60 shadow-xs select-none">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-inter">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground mb-1 font-inter">
            <Link
              href="/experience"
              className="flex size-4 items-center justify-center rounded-[3px] border border-border/60 bg-[var(--color-bg-secondary)] hover:text-foreground transition-colors font-inter"
            >
              <ChevronLeft className="size-2.5" />
            </Link>
            <span className="font-inter">Experience / Achievements</span>
          </div>
          <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            ACHIEVEMENTS
          </h1>
          <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5 font-inter">
            Key Wins. Recognitions. Milestones.
          </p>
        </div>

        {/* Top Right Counter Badge */}
        <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 font-inter">
          <span className="size-1.5 rounded-full bg-blue-500" />
          <span className="font-inter">12 Achievements</span>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 font-inter">
        {/* LEFT COLUMN: ACHIEVEMENTS LIST */}
        <div className="lg:col-span-3 font-inter">
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-3 font-inter">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              ACHIEVEMENTS LIST
            </h2>

            <div className="space-y-2 font-inter">
              {ACHIEVEMENTS.map((item) => {
                const isSelected = selectedId === item.id;

                if (isSelected) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className="w-full text-left rounded-[8px] bg-[#002244] border border-[#003366] p-3 text-white shadow-md transition-all relative overflow-hidden font-inter"
                    >
                      <div className="flex items-start gap-2.5 font-inter">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-[6px] bg-purple-600/30 text-purple-300 border border-purple-400/20 font-inter">
                          <InfinityIcon className="size-5" />
                        </div>
                        <div className="min-w-0 font-inter">
                          <h3 className="text-[11px] font-black text-white leading-tight truncate font-inter">
                            {item.title}
                          </h3>
                          <p className="text-[8px] font-medium text-blue-200 truncate font-inter">
                            {item.subtitle}
                          </p>
                          <p className="text-[7.5px] font-medium text-blue-300 mt-0.5 font-inter">
                            {item.date}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 font-inter">
                        <span className="inline-block text-[7px] font-bold text-blue-100 bg-blue-800/80 border border-blue-600/60 px-2 py-0.5 rounded-[3px] font-inter">
                          {item.badgeText}
                        </span>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="w-full text-left rounded-[8px] border border-border/50 bg-[var(--color-bg-primary)]/60 hover:bg-[var(--color-bg-primary)] p-2.5 transition-all flex items-center justify-between gap-2 group font-inter"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 font-inter">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] text-blue-600 dark:text-blue-400 font-inter">
                        <Award className="size-3.5" />
                      </div>
                      <div className="min-w-0 font-inter">
                        <h3 className="text-[10px] font-bold text-foreground leading-tight truncate font-inter">
                          {item.title}
                        </h3>
                        <p className="text-[8px] font-medium text-muted-foreground truncate font-inter">
                          {item.subtitle}
                        </p>
                        <p className="text-[7.5px] text-muted-foreground/80 font-inter">
                          {item.date}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-[7px] font-bold px-1.5 py-0.5 rounded-[3px] font-inter ${
                        item.badgeType === 'completed'
                          ? 'text-purple-600 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20'
                          : 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      }`}
                    >
                      {item.badgeText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View All Achievements Button - Directly following the list */}
            <button className="w-full rounded-[6px] bg-[#003366] hover:bg-[#002244] text-white py-2.5 text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-[0_4px_12px_rgba(0,51,102,0.35)] pt-2 font-inter">
              <span className="font-inter">View All Achievements</span>
            </button>
          </div>
        </div>

        {/* MIDDLE COLUMN: SELECTED MILESTONE */}
        <div className="lg:col-span-5 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3.5 shadow-2xs space-y-3.5 font-inter">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            SELECTED MILESTONE
          </h2>

          {/* Banner Box */}
          <div className="rounded-[8px] border border-border/50 bg-[var(--color-bg-primary)] p-3.5 flex items-center justify-between gap-3 font-inter">
            <div className="flex items-center gap-3 min-w-0 font-inter">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 font-inter">
                <InfinityIcon className="size-7" />
              </div>
              <div className="min-w-0 font-inter">
                <h3 className="text-sm font-extrabold text-foreground leading-tight truncate font-inter">
                  {selectedAchievement.title}
                </h3>
                <p className="text-[10px] font-bold text-foreground/80 truncate font-inter">
                  {selectedAchievement.subtitle}
                </p>
                <p className="text-[8px] font-medium text-muted-foreground mt-0.5 font-inter">
                  {selectedAchievement.date}
                  {selectedAchievement.duration && ` · ${selectedAchievement.duration}`}
                  {selectedAchievement.role && ` · ${selectedAchievement.role}`}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-[8px] font-bold text-purple-600 dark:text-purple-300 bg-purple-500/15 border border-purple-500/20 px-2.5 py-1 rounded-[4px] font-inter">
              {selectedAchievement.badgeText}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-border/40 pb-1 text-[9px] font-bold font-inter">
            {['Overview', 'What I Achieved', 'Impact', 'Projects', 'Notes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-[4px] transition-colors font-inter ${
                  activeTab === tab
                    ? 'bg-[var(--color-bg-tertiary)] text-foreground font-extrabold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview */}
          <div className="space-y-1 font-inter">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter">
              OVERVIEW
            </h3>
            <p className="text-[9px] font-medium leading-relaxed text-muted-foreground font-inter">
              {selectedAchievement.overview}
            </p>
          </div>

          {/* Two-Column Grid: What I Achieved & Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border/40 font-inter">
            {/* What I Achieved */}
            <div className="space-y-1.5 font-inter">
              <h3 className="text-[9.5px] font-bold uppercase tracking-wide text-foreground font-inter">
                WHAT I ACHIEVED
              </h3>
              <ul className="space-y-1 text-[8.5px] font-medium text-foreground font-inter">
                {selectedAchievement.achievementsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 font-inter">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight font-inter">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="space-y-1.5 font-inter">
              <h3 className="text-[9.5px] font-bold uppercase tracking-wide text-foreground font-inter">
                IMPACT
              </h3>
              <ul className="space-y-1.5 text-[8.5px] font-medium text-foreground font-inter">
                {selectedAchievement.impactList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 font-inter">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight text-muted-foreground font-inter">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2 pt-1 border-t border-border/40 font-inter">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter">
              TECHNOLOGIES USED
            </h3>

            <div className="flex flex-wrap gap-1.5 font-inter">
              {selectedAchievement.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 rounded-[5px] border border-border/40 bg-[var(--color-bg-primary)] px-2 py-1 text-[8px] font-bold text-foreground shadow-2xs hover:border-border transition-colors font-inter"
                >
                  {tech.icon && (
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={14}
                      height={14}
                      className="size-3.5 object-contain"
                    />
                  )}
                  <span className="font-inter">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Carousel Row */}
          <div className="space-y-1.5 pt-1 border-t border-border/40 font-inter">
            <div className="flex items-center justify-between font-inter">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter">
                GALLERY
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground font-inter">
                <button className="flex size-4 items-center justify-center rounded border border-border/60 hover:text-foreground font-inter">
                  <ChevronLeft className="size-2.5" />
                </button>
                <button className="flex size-4 items-center justify-center rounded border border-border/60 hover:text-foreground font-inter">
                  <ChevronRight className="size-2.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 font-inter">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video relative rounded-[6px] border border-border/60 bg-gradient-to-br from-purple-950 via-slate-900 to-purple-900 overflow-hidden p-1 flex flex-col justify-between shadow-2xs group cursor-pointer font-inter"
                >
                  <div className="flex items-center justify-between text-[6px] font-bold text-purple-300 font-inter">
                    <span>UI {i}</span>
                    <span className="size-1 rounded-full bg-purple-400" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="h-1.5 w-3/4 rounded bg-purple-500/40" />
                    <div className="h-1.5 w-1/2 rounded bg-purple-400/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MILESTONE INFO, BADGES & DOCUMENTS */}
        <div className="lg:col-span-4 space-y-3 font-inter">
          {/* Milestone Info */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5 font-inter">
            <div className="flex items-center justify-between font-inter">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
                MILESTONE INFO
              </h2>
              <span className="text-[8px] font-bold text-white bg-[#002244] px-2 py-0.5 rounded-[4px] font-inter">
                Total - 12
              </span>
            </div>

            <div className="space-y-1.5 font-inter">
              <div className="rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] p-2 flex items-center gap-3 font-inter">
                <Zap className="size-4 text-blue-500 shrink-0" />
                <div className="font-inter">
                  <span className="text-sm font-black text-foreground leading-none block font-inter">
                    5
                  </span>
                  <span className="text-[8px] font-medium text-muted-foreground font-inter">
                    Milestones
                  </span>
                </div>
              </div>

              <div className="rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] p-2 flex items-center gap-3 font-inter">
                <Zap className="size-4 text-blue-500 shrink-0" />
                <div className="font-inter">
                  <span className="text-sm font-black text-foreground leading-none block font-inter">
                    4
                  </span>
                  <span className="text-[8px] font-medium text-muted-foreground font-inter">
                    Recognitions
                  </span>
                </div>
              </div>

              <div className="rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] p-2 flex items-center gap-3 font-inter">
                <Zap className="size-4 text-blue-500 shrink-0" />
                <div className="font-inter">
                  <span className="text-sm font-black text-foreground leading-none block font-inter">
                    3
                  </span>
                  <span className="text-[8px] font-medium text-muted-foreground font-inter">
                    Certificates
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2 font-inter">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              ACHIEVEMENT BADGES
            </h2>

            <div className="grid grid-cols-3 gap-2 font-inter">
              {BADGES.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center p-3 rounded-[8px] border border-border/40 bg-[var(--color-bg-primary)] text-blue-600 dark:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all shadow-2xs font-inter"
                    title={badge.name}
                  >
                    <Icon className="size-5" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2 font-inter">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              DOCUMENTS
            </h2>

            <div className="space-y-1.5 font-inter">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] px-2.5 py-1.5 transition-colors hover:border-border font-inter"
                >
                  <div className="flex items-center gap-2 min-w-0 font-inter">
                    <FileText className="size-3 text-muted-foreground shrink-0" />
                    <span className="text-[8.5px] font-semibold text-foreground truncate font-inter">
                      {doc.name}
                    </span>
                    <span className="rounded bg-muted px-1 text-[6.5px] font-bold text-muted-foreground font-inter">
                      {doc.type}
                    </span>
                  </div>
                  <button
                    aria-label={`Download ${doc.name}`}
                    className="text-muted-foreground hover:text-foreground transition-colors p-0.5 font-inter"
                  >
                    <Download className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
