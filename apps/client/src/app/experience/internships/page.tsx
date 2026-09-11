/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Award,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Layers,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Company Logo Images
import codeSoftLogo from '@/assets/images/experience/internships/code-soft.png';
import devBridgeLogo from '@/assets/images/experience/internships/dev-bridge.png';
import techVerseLogo from '@/assets/images/experience/internships/Tech-verse.png';

// Tech SVG Icon Imports from src/assets/icons
import chartjsIcon from '@/assets/icons/chartjs.svg';
import dockerIcon from '@/assets/icons/docker.svg';
import expressIcon from '@/assets/icons/express.svg';
import figmaIcon from '@/assets/icons/figma.svg';
import gitIcon from '@/assets/icons/git.svg';
import jestIcon from '@/assets/icons/jest.svg';
import mongodbIcon from '@/assets/icons/mongodb.svg';
import nestjsIcon from '@/assets/icons/nestjs.svg';
import nextjsIcon from '@/assets/icons/nextjs.svg';
import nodejsIcon from '@/assets/icons/package.svg';
import postgresqlIcon from '@/assets/icons/postgresql.svg';
import postmanIcon from '@/assets/icons/postman.svg';
import reactIcon from '@/assets/icons/react.svg';
import reduxIcon from '@/assets/icons/redux.svg';
import tailwindIcon from '@/assets/icons/tailwindcss.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';
import { useTranslation } from '@/hooks/use-translation';

interface Internship {
  id: string;
  company: string;
  title: string;
  period: string;
  locationMode: string;
  status: string;
  logo: any;
  overview: string;
  responsibilities: string[];
  achievements: string[];
  skills: { name: string; percentage: number }[];
  technologies: { name: string; icon: any }[];
  documents: { name: string; type: string }[];
}

const TECH_ICON_MAP: Record<string, any> = {
  React: reactIcon,
  'Next.js': nextjsIcon,
  'Node.js': nodejsIcon,
  NestJS: nestjsIcon,
  TypeScript: typescriptIcon,
  Tailwind: tailwindIcon,
  PostgreSQL: postgresqlIcon,
  MongoDB: mongodbIcon,
  Docker: dockerIcon,
  Git: gitIcon,
  Redux: reduxIcon,
  'Chart.js': chartjsIcon,
  Figma: figmaIcon,
  Express: expressIcon,
  Jest: jestIcon,
  Postman: postmanIcon,
};

const INTERNSHIPS: Internship[] = [
  {
    id: 'codsoft',
    company: 'CodSoft',
    title: 'Web Development Intern',
    period: 'Jan 2025 - Mar 2025',
    locationMode: 'Remote',
    status: 'Completed',
    logo: codeSoftLogo,
    overview:
      'Worked as a Web Development Intern where I contributed to building responsive web applications and improving user experience. Collaborated with the team to deliver clean, efficient and maintainable code.',
    responsibilities: [
      'Developed and maintained responsive web pages using HTML, CSS, JavaScript',
      'Built reusable UI components with React.js',
      'Integrated RESTful APIs and handled data on the frontend',
      'Collaborated with designers to implement modern UI/UX',
      'Debugged and optimized existing features',
    ],
    achievements: [
      'Improved page load performance by 30%',
      'Implemented dark mode feature',
      'Received positive feedback for code quality and problem solving',
    ],
    skills: [
      { name: 'React.js', percentage: 90 },
      { name: 'JavaScript', percentage: 95 },
      { name: 'HTML/CSS', percentage: 85 },
      { name: 'Git & GitHub', percentage: 90 },
      { name: 'Problem Solving', percentage: 90 },
    ],
    technologies: [
      { name: 'React', icon: TECH_ICON_MAP['React'] },
      { name: 'Next.js', icon: TECH_ICON_MAP['Next.js'] },
      { name: 'Node.js', icon: TECH_ICON_MAP['Node.js'] },
      { name: 'NestJS', icon: TECH_ICON_MAP['NestJS'] },
      { name: 'TypeScript', icon: TECH_ICON_MAP['TypeScript'] },
      { name: 'Tailwind', icon: TECH_ICON_MAP['Tailwind'] },
      { name: 'PostgreSQL', icon: TECH_ICON_MAP['PostgreSQL'] },
      { name: 'MongoDB', icon: TECH_ICON_MAP['MongoDB'] },
      { name: 'Docker', icon: TECH_ICON_MAP['Docker'] },
      { name: 'Git', icon: TECH_ICON_MAP['Git'] },
    ],
    documents: [
      { name: 'Internship Certificate', type: 'PDF' },
      { name: 'Experience Letter', type: 'PDF' },
      { name: 'Completion Certificate', type: 'PDF' },
    ],
  },
  {
    id: 'techverse',
    company: 'TechVerse Solutions',
    title: 'Frontend Developer Intern',
    period: 'Aug 2024 - Oct 2024',
    locationMode: 'Hybrid',
    status: 'Completed',
    logo: techVerseLogo,
    overview:
      'Focused on crafting pixel-perfect frontend interfaces and integrating complex client-side state logic. Assisted senior engineers in migrating legacy dashboards to Next.js.',
    responsibilities: [
      'Migrated legacy dashboard pages to Next.js App Router',
      'Created interactive data tables and real-time chart visualizations',
      'Ensured cross-browser compatibility and mobile responsiveness',
      'Participated in daily agile standups and code reviews',
    ],
    achievements: [
      'Successfully converted 12 core dashboard views',
      'Reduced initial bundle size by 22% through dynamic imports',
      'Nominated for top intern contributor of the quarter',
    ],
    skills: [
      { name: 'Next.js', percentage: 88 },
      { name: 'TypeScript', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 92 },
      { name: 'Redux Toolkit', percentage: 80 },
      { name: 'REST APIs', percentage: 88 },
    ],
    technologies: [
      { name: 'Next.js', icon: TECH_ICON_MAP['Next.js'] },
      { name: 'React', icon: TECH_ICON_MAP['React'] },
      { name: 'TypeScript', icon: TECH_ICON_MAP['TypeScript'] },
      { name: 'Tailwind', icon: TECH_ICON_MAP['Tailwind'] },
      { name: 'Redux', icon: TECH_ICON_MAP['Redux'] },
      { name: 'Chart.js', icon: TECH_ICON_MAP['Chart.js'] },
      { name: 'Git', icon: TECH_ICON_MAP['Git'] },
      { name: 'Figma', icon: TECH_ICON_MAP['Figma'] },
    ],
    documents: [
      { name: 'Internship Certificate', type: 'PDF' },
      { name: 'Recommendation Letter', type: 'PDF' },
    ],
  },
  {
    id: 'devbridge',
    company: 'DevBridge',
    title: 'Software Development Intern',
    period: 'May 2024 - Jul 2024',
    locationMode: 'On-site',
    status: 'Completed',
    logo: devBridgeLogo,
    overview:
      'Engaged in full lifecycle software development with a heavy emphasis on backend API design, database schemas, and unit testing practices.',
    responsibilities: [
      'Designed and documented REST APIs for client projects',
      'Wrote unit and integration tests for core API endpoints',
      'Managed relational database migrations and queries',
      'Assisted in setting up CI/CD GitHub Actions pipelines',
    ],
    achievements: [
      'Increased backend test coverage from 60% to 85%',
      'Optimized database queries resulting in 40% faster response times',
    ],
    skills: [
      { name: 'Node.js', percentage: 85 },
      { name: 'Express.js', percentage: 88 },
      { name: 'PostgreSQL', percentage: 82 },
      { name: 'Unit Testing', percentage: 80 },
      { name: 'Docker Basics', percentage: 75 },
    ],
    technologies: [
      { name: 'Node.js', icon: TECH_ICON_MAP['Node.js'] },
      { name: 'Express', icon: TECH_ICON_MAP['Express'] },
      { name: 'PostgreSQL', icon: TECH_ICON_MAP['PostgreSQL'] },
      { name: 'Docker', icon: TECH_ICON_MAP['Docker'] },
      { name: 'Jest', icon: TECH_ICON_MAP['Jest'] },
      { name: 'Git', icon: TECH_ICON_MAP['Git'] },
      { name: 'Postman', icon: TECH_ICON_MAP['Postman'] },
    ],
    documents: [
      { name: 'Internship Certificate', type: 'PDF' },
      { name: 'Evaluation Form', type: 'PDF' },
    ],
  },
];

export default function InternshipsPage() {
  const { t, tArray } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>('codsoft');

  const selectedInternship = INTERNSHIPS.find((item) => item.id === selectedId) || INTERNSHIPS[0];

  const selPrefix = `internshipsPage.items.${selectedInternship.id}`;
  const selTitle = t(`${selPrefix}.title`, selectedInternship.title);
  const selCompany = t(`${selPrefix}.company`, selectedInternship.company);
  const selPeriod = t(`${selPrefix}.period`, selectedInternship.period);
  const selLocation = t(`${selPrefix}.locationMode`, selectedInternship.locationMode);
  const selStatus = t(`${selPrefix}.status`, selectedInternship.status);
  const selOverview = t(`${selPrefix}.overview`, selectedInternship.overview);

  const transResp = tArray<string>(`${selPrefix}.responsibilities`);
  const responsibilities = transResp.length > 0 ? transResp : selectedInternship.responsibilities;

  const transAch = tArray<string>(`${selPrefix}.achievements`);
  const achievements = transAch.length > 0 ? transAch : selectedInternship.achievements;

  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-[var(--color-bg-primary)] p-4 space-y-4 text-[var(--color-text-primary)] font-inter font-sans [--font-display:var(--font-sans)] [--font-beni:var(--font-sans)] border border-border/60 shadow-xs select-none">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground mb-1 font-inter font-sans">
            <Link
              href="/experience"
              className="flex size-4 items-center justify-center rounded-[3px] border border-border/60 bg-[var(--color-bg-secondary)] hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-2.5" />
            </Link>
            <span>{t('internshipsPage.breadcrumb', 'Experience / Internships')}</span>
          </div>
          <h1 className="font-inter font-sans text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            {t('internshipsPage.title', 'INTERNSHIPS')}
          </h1>
          <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5 font-inter font-sans">
            {t('internshipsPage.subtitle', 'Practical Experience. Real World Exposure')}
          </p>
        </div>

        {/* Top Right Counter Badge */}
        <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 font-inter font-sans">
          <span className="size-1.5 rounded-full bg-blue-500" />
          <span>
            {INTERNSHIPS.length} {t('internshipsPage.counterBadge', 'internships')}
          </span>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* LEFT COLUMN: INTERNSHIP TIMELINE */}
        <div className="lg:col-span-3 space-y-2">
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter font-sans">
              {t('internshipsPage.timelineTitle', 'INTERNSHIP TIMELINE')}
            </h2>

            <div className="space-y-2.5">
              {INTERNSHIPS.map((item) => {
                const isSelected = selectedId === item.id;
                const ik = `internshipsPage.items.${item.id}`;
                const companyName = t(`${ik}.company`, item.company);
                const jobTitle = t(`${ik}.title`, item.title);
                const jobPeriod = t(`${ik}.period`, item.period);
                const jobStatus = t(`${ik}.status`, item.status);

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left rounded-[8px] p-3 transition-all border relative ${
                      isSelected
                        ? 'border-blue-500 bg-[var(--color-bg-primary)] shadow-xs border-l-4 border-l-blue-600'
                        : 'border-border/50 bg-[var(--color-bg-primary)]/50 hover:bg-[var(--color-bg-primary)] hover:border-border'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-slate-200/80 dark:border-white/20 bg-white p-1.5 overflow-hidden shadow-2xs">
                        <Image
                          src={item.logo}
                          alt={companyName}
                          className="object-contain p-0.5"
                          fill
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[11px] font-bold text-foreground leading-tight truncate font-inter font-sans">
                          {companyName}
                        </h3>
                        <p className="text-[8.5px] font-medium text-muted-foreground truncate font-inter font-sans">
                          {jobTitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-[8px] font-medium text-muted-foreground mb-1.5 font-inter font-sans">
                      {jobPeriod}
                    </p>

                    <span className="inline-block text-[7.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-[4px] font-inter font-sans">
                      ● {jobStatus}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: SELECTED MILESTONE */}
        <div className="lg:col-span-5 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3.5 shadow-2xs space-y-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter font-sans">
            {t('educationPage.selectedMilestone', 'SELECTED MILESTONE')}
          </h2>

          {/* Internship Banner Box */}
          <div className="rounded-[8px] border border-border/50 bg-[var(--color-bg-primary)] p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex size-12 shrink-0 items-center justify-center rounded-[8px] border border-slate-200/80 dark:border-white/20 bg-white p-2 overflow-hidden shadow-2xs">
                <Image
                  src={selectedInternship.logo}
                  alt={selCompany}
                  className="object-contain p-0.5"
                  fill
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-foreground leading-tight truncate font-inter font-sans">
                  {selTitle}
                </h3>
                <p className="text-[10px] font-bold text-foreground/80 truncate font-inter font-sans">
                  {selCompany}
                </p>
                <p className="text-[8px] font-medium text-muted-foreground mt-0.5 font-inter font-sans">
                  {selPeriod} . {selLocation}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-[8px] font-bold text-purple-600 dark:text-purple-300 bg-purple-500/15 border border-purple-500/20 px-2.5 py-1 rounded-[4px] font-inter font-sans">
              {selStatus}
            </span>
          </div>

          {/* Overview */}
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter font-sans">
              {t('internshipsPage.overviewTitle', 'OVERVIEW')}
            </h3>
            <p className="text-[9px] font-medium leading-relaxed text-muted-foreground font-inter font-sans">
              {selOverview}
            </p>
          </div>

          <div className="border-t border-border/40 pt-2 space-y-2.5">
            {/* Key Responsibilities */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter font-sans">
                {t('internshipsPage.responsibilitiesTitle', 'KEY RESPONSIBILITIES')}
              </h3>
              <ul className="space-y-1 text-[8.5px] font-medium text-foreground font-inter font-sans">
                {responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Achievements */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground font-inter font-sans">
                {t('internshipsPage.achievementsTitle', 'KEY ACHIEVEMENTS')}
              </h3>
              <ul className="space-y-1 text-[8.5px] font-medium text-foreground font-inter font-sans">
                {achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MILESTONE INFO, TECHNOLOGIES USED & DOCUMENTS */}
        <div className="lg:col-span-4 space-y-3">
          {/* Milestone Info */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter font-sans">
              {t('internshipsPage.milestoneInfo', 'MILESTONE INFO')}
            </h2>

            <div className="space-y-2">
              {selectedInternship.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] px-2.5 py-1.5 flex items-center justify-between gap-2 shadow-2xs font-inter font-sans"
                >
                  <span className="text-[8.5px] font-bold text-foreground min-w-[80px]">
                    {skill.name}
                  </span>
                  <span className="text-[8px] font-bold text-muted-foreground shrink-0">
                    {skill.percentage}%
                  </span>
                  <div className="w-24 sm:w-28 h-1.5 rounded-full bg-muted/60 overflow-hidden shrink-0">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter font-sans">
              {t('internshipsPage.technologiesUsed', 'TECHNOLOGIES USED')}
            </h2>

            <div className="grid grid-cols-5 gap-2">
              {selectedInternship.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-center p-2 rounded-[8px] border border-border/40 bg-[var(--color-bg-primary)] shadow-2xs hover:border-blue-500/50 hover:shadow-xs transition-all group"
                  title={tech.name}
                >
                  {tech.icon ? (
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={22}
                      height={22}
                      className="size-5.5 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  ) : (
                    <div className="size-5.5 rounded-[4px] bg-muted/50 flex items-center justify-center text-[8px] font-bold text-foreground font-inter font-sans">
                      {tech.name.substring(0, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter font-sans">
              {t('internshipsPage.documentsTitle', 'DOCUMENTS')}
            </h2>

            <div className="space-y-1.5">
              {selectedInternship.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-[6px] border border-border/40 bg-[var(--color-bg-primary)] px-2.5 py-1.5 transition-colors hover:border-border"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="size-3 text-muted-foreground shrink-0" />
                    <span className="text-[8.5px] font-semibold text-foreground truncate">
                      {doc.name}
                    </span>
                    <span className="rounded bg-muted px-1 text-[6.5px] font-bold text-muted-foreground">
                      {doc.type}
                    </span>
                  </div>
                  <button
                    aria-label={`Download ${doc.name}`}
                    className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                  >
                    <Download className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SUMMARY STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 font-inter font-sans">
        {/* Stat 1 */}
        <div className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Award className="size-4" />
          </div>
          <div>
            <span className="text-base font-black text-foreground leading-none font-inter font-sans">
              3
            </span>
            <p className="text-[8.5px] font-semibold text-muted-foreground leading-tight font-inter font-sans">
              {t('internshipsPage.stats.internshipsDone', 'Internships Completed')}
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Clock className="size-4" />
          </div>
          <div>
            <span className="text-base font-black text-foreground leading-none font-inter font-sans">
              12
            </span>
            <p className="text-[8.5px] font-semibold text-muted-foreground leading-tight font-inter font-sans">
              {t('internshipsPage.stats.monthsExperience', 'Months Experience')}
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Layers className="size-4" />
          </div>
          <div>
            <span className="text-base font-black text-foreground leading-none font-inter font-sans">
              15+
            </span>
            <p className="text-[8.5px] font-semibold text-muted-foreground leading-tight font-inter font-sans">
              {t('internshipsPage.stats.skillsApplied', 'Technologies Applied')}
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center gap-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Check className="size-4" />
          </div>
          <div>
            <span className="text-base font-black text-foreground leading-none font-inter font-sans">
              100%
            </span>
            <p className="text-[8.5px] font-semibold text-muted-foreground leading-tight font-inter font-sans">
              {t('internshipsPage.stats.successRate', 'Success Rate')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
