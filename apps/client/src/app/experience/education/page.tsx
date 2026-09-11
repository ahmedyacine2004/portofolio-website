'use client';

import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Download,
  FileText,
  Flag,
  GraduationCap,
  Layers,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { ElementType } from 'react';
import React, { useState } from 'react';

import certificateImage from '@/assets/images/experience/education/certificate.png';
import { useTranslation } from '@/hooks/use-translation';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface MetricCard {
  icon: ElementType;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
}

interface InfoRow {
  icon: ElementType;
  label: string;
  value: string;
}

interface MilestoneDetail {
  bannerTitle: string;
  bannerBadge: string;
  bannerBadgeColor: string;
  bannerQuote: string;
  bannerIcon: ElementType;
  bannerIconColor: string;
  bannerImage?: StaticImageData;
  about: string;
  metrics: MetricCard[];
  highlights: string[];
  info: InfoRow[];
  documents: { name: string; type: string }[];
  skills: string[];
  skillDotColor: string;
  status: 'current' | 'completed' | 'past';
}

/* ─────────────────────────────────────────────
   MILESTONE DATA
───────────────────────────────────────────── */
const MILESTONE_DETAILS: Record<string, MilestoneDetail> = {
  estin: {
    bannerTitle: 'Student at ESTIN',
    bannerBadge: 'In Progress — 2025 →',
    bannerBadgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    bannerQuote: '"Engineering begins where comfort ends."',
    bannerIcon: GraduationCap,
    bannerIconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    about:
      "Currently enrolled in the second year of the preparatory cycle at ESTIN (École Supérieure en Technologies de l'Information et du Numérique), one of Algeria's premier engineering schools. The curriculum is intensive, covering advanced mathematics, physics, and computer science fundamentals as a foundation for the engineering cycle.",
    metrics: [
      {
        icon: Building2,
        iconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        label: 'Institution',
        value: 'ESTIN',
        sub: 'Engineering School',
      },
      {
        icon: BookOpen,
        iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        label: 'Cycle',
        value: '2nd Year',
        sub: 'Preparatory',
      },
      {
        icon: Clock,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Started',
        value: '2025',
        sub: 'Ongoing',
      },
      {
        icon: Flag,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'Goal',
        value: 'Engineer',
        sub: 'Diploma',
      },
    ],
    highlights: [
      "Admitted to one of Algeria's top engineering schools after competitive selection",
      'Intensive curriculum in advanced mathematics, physics and CS fundamentals',
      'Building deep theoretical foundations for engineering specialization',
      'Adapting to a highly demanding academic environment with strong performance',
    ],
    info: [
      { icon: GraduationCap, label: 'Level', value: 'Preparatory Cycle' },
      { icon: Building2, label: 'School', value: 'ESTIN Bejaia' },
      { icon: MapPin, label: 'Location', value: 'Bejaia, Algeria' },
      { icon: Layers, label: 'Focus', value: 'Maths · Physics · CS' },
      { icon: ShieldCheck, label: 'Status', value: 'In Progress' },
      { icon: Clock, label: 'Year', value: '2nd Year Prep' },
      { icon: Calendar, label: 'Since', value: '2025' },
    ],
    documents: [{ name: 'Enrollment Certificate', type: 'PDF' }],
    skills: ['Mathematics', 'Physics', 'Algorithms', 'CS Fundamentals', 'English', 'French'],
    skillDotColor: 'bg-purple-500',
    status: 'current',
  },

  bachelor: {
    bannerTitle: "Bachelor's Degree",
    bannerBadge: 'Completed in 2025',
    bannerBadgeColor: 'text-blue-600 dark:text-blue-300 bg-blue-500/10 border-blue-500/20',
    bannerQuote: '"The end of one journey, the beginning of infinite possibilities."',
    bannerIcon: BookOpen,
    bannerIconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    bannerImage: certificateImage,
    about:
      "Completed my Bachelor's degree in Computer Science at M'Hamed Bougara University with a specialization in Web Development and Computer Graphics. This 4-year journey built a strong foundation in software engineering, problem solving and system design, and shaped my passion for building impactful digital solutions.",
    metrics: [
      {
        icon: Compass,
        iconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        label: 'University',
        value: "M'Hamed Bougara",
        sub: 'Boumerdes',
      },
      {
        icon: BookOpen,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Field',
        value: 'Computer',
        sub: 'Science',
      },
      {
        icon: Clock,
        iconColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        label: 'Duration',
        value: '2021–2025',
        sub: '4 Years',
      },
      {
        icon: Award,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'GPA',
        value: '14.31 / 20',
        sub: 'Good Honours',
      },
    ],
    highlights: [
      'Strong academic performance across core computer science subjects',
      'Completed multiple practical projects and real-world applications',
      'Specialized in Web Development and Computer Graphics',
      'Built a solid foundation in full-stack development and system design',
    ],
    info: [
      { icon: GraduationCap, label: 'Degree', value: "Bachelor's" },
      { icon: Layers, label: 'Field', value: 'Computer Science' },
      { icon: Sparkles, label: 'Specialization', value: 'Web Dev & Graphics' },
      { icon: Building2, label: 'Institution', value: "M'Hamed Bougara" },
      { icon: MapPin, label: 'Location', value: 'Boumerdes, Algeria' },
      { icon: ShieldCheck, label: 'Status', value: 'Completed' },
      { icon: Calendar, label: 'Credits', value: '180 ECTS' },
      { icon: Clock, label: 'Graduated', value: '2025' },
    ],
    documents: [
      { name: 'Degree Certificate.pdf', type: 'PDF' },
      { name: 'Academic Transcript.pdf', type: 'PDF' },
      { name: 'Completion Letter.pdf', type: 'PDF' },
    ],
    skills: [
      'Data Structures',
      'Operating Systems',
      'Web Development',
      'OOP',
      'Databases',
      'Algorithms',
      'Networks',
    ],
    skillDotColor: 'bg-blue-500',
    status: 'completed',
  },

  'fullstack-2024': {
    bannerTitle: 'Full Stack Engineering',
    bannerBadge: 'Specialization — 2024',
    bannerBadgeColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20',
    bannerQuote: '"Ship fast, learn faster."',
    bannerIcon: Code2,
    bannerIconColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    about:
      'The final year of university focused on full-stack engineering specialization. I dived deep into modern web technologies, building complete end-to-end applications using React, Next.js, Node.js, NestJS and databases. This was the year I transitioned from academic learner to practitioner — shipping real projects and internship work.',
    metrics: [
      {
        icon: Code2,
        iconColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
        label: 'Stack',
        value: 'Full Stack',
        sub: 'Web Dev',
      },
      {
        icon: Layers,
        iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        label: 'Projects',
        value: '8+',
        sub: 'Built',
      },
      {
        icon: Clock,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Year',
        value: '2024',
        sub: '4th Year',
      },
      {
        icon: Star,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'Focus',
        value: 'React + NestJS',
        sub: 'TypeScript',
      },
    ],
    highlights: [
      'Mastered the full-stack ecosystem: React, Next.js, NestJS, MongoDB, PostgreSQL',
      'Built and shipped multiple complete web applications end-to-end',
      'First internship experience applying skills in a real company context',
      'Developed deep understanding of TypeScript, REST APIs and clean architecture',
    ],
    info: [
      { icon: GraduationCap, label: 'Year', value: '4th Year (Final)' },
      { icon: Layers, label: 'Specialization', value: 'Full Stack Web' },
      { icon: Code2, label: 'Primary Stack', value: 'React · NestJS' },
      { icon: Building2, label: 'Institution', value: "M'Hamed Bougara" },
      { icon: ShieldCheck, label: 'Status', value: 'Completed' },
      { icon: Clock, label: 'Period', value: 'Sep 2024 – Jun 2025' },
    ],
    documents: [
      { name: 'Year 4 Transcript.pdf', type: 'PDF' },
      { name: 'Project Reports.pdf', type: 'PDF' },
    ],
    skills: [
      'React',
      'Next.js',
      'NestJS',
      'TypeScript',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'REST APIs',
    ],
    skillDotColor: 'bg-sky-500',
    status: 'past',
  },

  'major-2023': {
    bannerTitle: 'Software Engineering Major',
    bannerBadge: 'Major Courses — 2023',
    bannerBadgeColor: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20',
    bannerQuote: '"Design before you code. Think before you type."',
    bannerIcon: Layers,
    bannerIconColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    about:
      'The third year introduced the core software engineering major curriculum — Design Patterns, Software Architecture, Advanced Algorithms, and formal methods. This was when I truly began thinking like a software engineer rather than just a programmer, learning to design scalable and maintainable systems.',
    metrics: [
      {
        icon: Layers,
        iconColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
        label: 'Focus',
        value: 'Architecture',
        sub: 'Design Patterns',
      },
      {
        icon: Code2,
        iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        label: 'Languages',
        value: 'Java · C++',
        sub: 'Python',
      },
      {
        icon: Clock,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Year',
        value: '2023',
        sub: '3rd Year',
      },
      {
        icon: BookOpen,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'Modules',
        value: '12+',
        sub: 'Core Units',
      },
    ],
    highlights: [
      'Studied classical design patterns: Factory, Observer, Strategy, Singleton and more',
      'Learned software architecture principles and UML modeling',
      'Advanced algorithms and complexity analysis (dynamic programming, graphs)',
      'Completed a full team software project applying agile principles',
    ],
    info: [
      { icon: GraduationCap, label: 'Year', value: '3rd Year' },
      { icon: Layers, label: 'Focus', value: 'Software Engineering' },
      { icon: Code2, label: 'Languages', value: 'Java · C++ · Python' },
      { icon: Building2, label: 'Institution', value: "M'Hamed Bougara" },
      { icon: ShieldCheck, label: 'Status', value: 'Completed' },
      { icon: Clock, label: 'Period', value: 'Sep 2023 – Jun 2024' },
    ],
    documents: [
      { name: 'Year 3 Transcript.pdf', type: 'PDF' },
      { name: 'Software Project Report.pdf', type: 'PDF' },
    ],
    skills: [
      'Java',
      'C++',
      'Python',
      'Design Patterns',
      'UML',
      'Algorithms',
      'Agile',
      'Software Architecture',
    ],
    skillDotColor: 'bg-violet-500',
    status: 'past',
  },

  'year2-2022': {
    bannerTitle: 'University Second Year',
    bannerBadge: 'Core Modules — 2022',
    bannerBadgeColor: 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20',
    bannerQuote: '"Every system you study adds a new lens to see the world."',
    bannerIcon: Compass,
    bannerIconColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    about:
      'The second year deepened core computer science theory — Operating Systems, Computer Networks, Database Systems, and advanced C programming. This was a pivotal year for understanding how computers truly work at a systems level, from memory management to network protocols and relational database design.',
    metrics: [
      {
        icon: Compass,
        iconColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
        label: 'Focus',
        value: 'Systems',
        sub: 'CS Theory',
      },
      {
        icon: Code2,
        iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        label: 'Language',
        value: 'C / C++',
        sub: 'SQL',
      },
      {
        icon: Clock,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Year',
        value: '2022',
        sub: '2nd Year',
      },
      {
        icon: Layers,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'Modules',
        value: '10+',
        sub: 'Core Units',
      },
    ],
    highlights: [
      'Mastered operating system concepts: processes, threads, memory, scheduling',
      'Studied computer networks from the ground up (TCP/IP, OSI model, routing)',
      'Learned relational databases and SQL fundamentals with PostgreSQL',
      'Built foundational systems-level thinking in C and C++',
    ],
    info: [
      { icon: GraduationCap, label: 'Year', value: '2nd Year' },
      { icon: Layers, label: 'Focus', value: 'OS · Networks · DB' },
      { icon: Code2, label: 'Languages', value: 'C · C++ · SQL' },
      { icon: Building2, label: 'Institution', value: "M'Hamed Bougara" },
      { icon: ShieldCheck, label: 'Status', value: 'Completed' },
      { icon: Clock, label: 'Period', value: 'Sep 2022 – Jun 2023' },
    ],
    documents: [{ name: 'Year 2 Transcript.pdf', type: 'PDF' }],
    skills: [
      'Operating Systems',
      'Networks',
      'Databases',
      'C',
      'C++',
      'SQL',
      'TCP/IP',
      'Memory Management',
    ],
    skillDotColor: 'bg-teal-500',
    status: 'past',
  },

  'year1-2021': {
    bannerTitle: 'University First Year',
    bannerBadge: 'Foundations — 2021',
    bannerBadgeColor: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
    bannerQuote: '"Every expert was once a beginner."',
    bannerIcon: Star,
    bannerIconColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    about:
      "The first year at M'Hamed Bougara University marked the true beginning of my Computer Science journey. Starting from the fundamentals — Introduction to Programming in C, Discrete Mathematics, Logic, and Computer Architecture — this year laid the building blocks that everything else would rest on.",
    metrics: [
      {
        icon: Star,
        iconColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
        label: 'Stage',
        value: '1st Year',
        sub: 'Foundation',
      },
      {
        icon: Code2,
        iconColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        label: 'First Language',
        value: 'C',
        sub: 'Programming',
      },
      {
        icon: Clock,
        iconColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        label: 'Year',
        value: '2021',
        sub: '1st Year',
      },
      {
        icon: BookOpen,
        iconColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        label: 'Modules',
        value: '8+',
        sub: 'Core Units',
      },
    ],
    highlights: [
      'Took my first steps into programming with C — loops, functions, pointers and arrays',
      'Built a strong mathematical base in discrete math and propositional logic',
      'Understood how computers work at the hardware level through architecture',
      'Finished first year with passing grades and confirmed my passion for CS',
    ],
    info: [
      { icon: GraduationCap, label: 'Year', value: '1st Year' },
      { icon: Layers, label: 'Focus', value: 'Intro to CS' },
      { icon: Code2, label: 'Language', value: 'C Programming' },
      { icon: Building2, label: 'Institution', value: "M'Hamed Bougara" },
      { icon: ShieldCheck, label: 'Status', value: 'Completed' },
      { icon: Clock, label: 'Period', value: 'Sep 2021 – Jun 2022' },
    ],
    documents: [{ name: 'Year 1 Transcript.pdf', type: 'PDF' }],
    skills: [
      'C Programming',
      'Discrete Maths',
      'Logic',
      'Computer Architecture',
      'Algorithms Basics',
    ],
    skillDotColor: 'bg-rose-500',
    status: 'past',
  },
};

/* ─────────────────────────────────────────────
   TIMELINE SIDEBAR ITEMS
───────────────────────────────────────────── */
interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle?: string;
  isCurrent?: boolean;
  isCompleted?: boolean;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'estin',
    year: 'Currently',
    title: 'Student at ESTIN',
    subtitle: 'Second Year preparatory class',
    isCurrent: true,
  },
  {
    id: 'bachelor',
    year: '2025',
    title: "Bachelor's Degree",
    subtitle: 'Completed',
    isCompleted: true,
  },
  { id: 'fullstack-2024', year: '2024', title: 'Full Stack Engineering Specialization' },
  { id: 'major-2023', year: '2023', title: 'Software Engineering Major Courses' },
  { id: 'year2-2022', year: '2022', title: 'University Journey Second Year' },
  { id: 'year1-2021', year: '2021', title: 'Started University First Year' },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function EducationTimelinePage() {
  const { t, tArray } = useTranslation();
  const [selectedId, setSelectedId] = useState<string>('estin');
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const milestone = MILESTONE_DETAILS[selectedId] ?? MILESTONE_DETAILS['estin'];
  const BannerIcon = milestone.bannerIcon as React.ElementType<{ className?: string }>;

  const itemKey = `educationPage.items.${selectedId}`;
  const bannerTitle = t(`${itemKey}.bannerTitle`, milestone.bannerTitle);
  const bannerBadge = t(`${itemKey}.bannerBadge`, milestone.bannerBadge);
  const bannerQuote = t(`${itemKey}.bannerQuote`, milestone.bannerQuote);
  const aboutText = t(`${itemKey}.about`, milestone.about);
  const translatedHighlights = tArray<string>(`${itemKey}.highlights`);
  const highlights = translatedHighlights.length > 0 ? translatedHighlights : milestone.highlights;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setActiveTab('Overview');
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'Overview':
        return t('educationPage.tabOverview', 'Overview');
      case 'Highlights':
        return t('educationPage.tabHighlights', 'Highlights');
      case 'Skills':
        return t('educationPage.tabSkills', 'Skills');
      case 'Documents':
        return t('educationPage.tabDocuments', 'Documents');
      default:
        return tab;
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-[var(--color-bg-primary)] p-4 space-y-4 text-[var(--color-text-primary)] font-inter border border-border/60 shadow-xs select-none">
      {/* ── 1. HEADER ── */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground mb-1">
            <Link
              href="/experience"
              className="flex size-4 items-center justify-center rounded-[3px] border border-border/60 bg-[var(--color-bg-secondary)] hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-2.5" />
            </Link>
            <span>{t('educationPage.breadcrumb', 'Experience / Education timeline')}</span>
          </div>
          <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            {t('educationPage.title', 'Education timeline')}
          </h1>
          <p className="text-[10px] font-medium text-muted-foreground mt-0.5 font-inter">
            {t(
              'educationPage.subtitle',
              'My academic journey from first year to engineering school.',
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] px-2.5 py-1.5 max-w-xs shadow-2xs">
          <Quote className="size-3 shrink-0 text-blue-500 fill-blue-500/20" />
          <p className="text-[9px] font-medium leading-tight text-muted-foreground font-inter italic">
            {t('educationPage.quote', '"The quieter you become, the more you are able to hear."')}
          </p>
        </div>
      </header>

      {/* ── 2. MAIN CONTENT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* ── LEFT: TIMELINE ── */}
        <div className="lg:col-span-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              {t('educationPage.journeyTitle', 'ACADEMIC JOURNEY')}
            </h2>

            <div className="space-y-1.5">
              {TIMELINE_ITEMS.map((item) => {
                const isSelected = selectedId === item.id;
                const ik = `educationPage.items.${item.id}`;
                const itemYear = t(`${ik}.timelineYear`, item.year);
                const itemTitle = t(`${ik}.timelineTitle`, item.title);
                const itemSubtitle = item.subtitle
                  ? t(`${ik}.timelineSubtitle`, item.subtitle)
                  : undefined;

                if (isSelected) {
                  if (item.isCurrent) {
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className="w-full text-left rounded-[6px] bg-purple-800 border border-purple-600 p-2 text-white shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-purple-200">
                            ● {itemYear}
                          </span>
                          <CheckCircle2 className="size-3 text-purple-300" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-purple-700 text-purple-100">
                            <GraduationCap className="size-3" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9.5px] font-bold text-white leading-tight truncate">
                              {itemTitle}
                            </p>
                            {itemSubtitle && (
                              <p className="text-[7.5px] font-medium text-purple-200 truncate">
                                {itemSubtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  }

                  const ItemIcon = (MILESTONE_DETAILS[item.id]?.bannerIcon ??
                    BookOpen) as React.ElementType<{ className?: string }>;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className="w-full text-left rounded-[6px] bg-blue-900 border border-blue-600 p-2 text-white shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-blue-300">
                          ● {itemYear}
                        </span>
                        <CheckCircle2 className="size-3 text-blue-300" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-blue-800 text-blue-100">
                          <ItemIcon className="size-3" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9.5px] font-bold text-white leading-tight truncate">
                            {itemTitle}
                          </p>
                          {itemSubtitle && (
                            <p className="text-[7.5px] font-medium text-blue-200 truncate">
                              {itemSubtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full text-left rounded-[5px] p-1.5 transition-colors flex items-start gap-2 border border-transparent hover:bg-[var(--color-bg-tertiary)]"
                  >
                    <span className="mt-1 size-1.5 rounded-full shrink-0 bg-muted-foreground/50" />
                    <div className="min-w-0 space-y-0.5">
                      <p
                        className={`text-[8px] font-bold leading-none ${
                          item.isCurrent
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {itemYear}
                      </p>
                      <p className="text-[8.5px] font-medium text-foreground leading-tight truncate">
                        {itemTitle}
                      </p>
                      {itemSubtitle && (
                        <p className="text-[7.5px] font-medium text-muted-foreground truncate">
                          {itemSubtitle}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => handleSelect('year1-2021')}
            className="w-full rounded-[6px] bg-blue-900 hover:bg-blue-800 text-white py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <span>{t('educationPage.viewAll', 'View All')}</span>
            <ChevronRight className="size-3" />
          </button>
        </div>

        {/* ── MIDDLE: MILESTONE DETAIL ── */}
        <div className="lg:col-span-6 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3.5 shadow-2xs space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            {t('educationPage.selectedMilestone', 'SELECTED MILESTONE')}
          </h2>

          {/* Banner */}
          <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-[4px] border ${milestone.bannerIconColor}`}
                >
                  <BannerIcon className="size-4" />
                </div>
                <div>
                  <h3 className="text-[22px] font-extrabold text-foreground leading-tight">
                    {bannerTitle}
                  </h3>
                  <span
                    className={`inline-block text-[7.5px] font-bold border px-1.5 py-0.5 rounded-[3px] ${milestone.bannerBadgeColor}`}
                  >
                    {bannerBadge}
                  </span>
                </div>
              </div>
              <p className="text-[8.5px] font-medium text-muted-foreground italic">{bannerQuote}</p>
            </div>

            {milestone.bannerImage && (
              <div className="relative h-28 w-44 sm:h-32 sm:w-52 shrink-0 overflow-hidden rounded-[6px] border border-border/80 shadow-xs bg-stone-100 dark:bg-stone-900">
                <Image
                  src={milestone.bannerImage}
                  alt="Milestone Certificate"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border/40 pb-1 text-[9px] font-bold">
            {['Overview', 'Highlights', 'Skills', 'Documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                  activeTab === tab
                    ? 'bg-[var(--color-bg-tertiary)] text-foreground font-extrabold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {getTabLabel(tab)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                  {t('educationPage.aboutThisMilestone', 'ABOUT THIS MILESTONE')}
                </h3>
                <p className="text-[9px] font-medium leading-relaxed text-muted-foreground">
                  {aboutText}
                </p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {milestone.metrics.map((metric, i) => {
                  const Icon = metric.icon as React.ElementType<{ className?: string }>;
                  let mKey = 'institution';
                  if (i === 1) mKey = 'cycle';
                  else if (i === 2) mKey = 'started';
                  else if (i === 3) mKey = 'goal';

                  const label = t(`${itemKey}.metrics.${mKey}`, metric.label);
                  const val = t(`${itemKey}.metrics.${mKey}Value`, metric.value);
                  const sub = t(`${itemKey}.metrics.${mKey}Sub`, metric.sub);

                  return (
                    <div
                      key={i}
                      className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1"
                    >
                      <div
                        className={`flex size-5 items-center justify-center rounded-[4px] ${metric.iconColor}`}
                      >
                        <Icon className="size-3" />
                      </div>
                      <div>
                        <p className="text-[8.5px] font-bold text-foreground leading-tight truncate">
                          {label}
                        </p>
                        <p className="text-[8px] font-bold text-foreground truncate">{val}</p>
                        <p className="text-[7px] text-muted-foreground">{sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'Highlights' && (
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                {t('educationPage.highlightsTitle', 'HIGHLIGHTS')}
              </h3>
              <ul className="space-y-1 text-[8.5px] font-medium text-foreground">
                {highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                {t('educationPage.skillsGainedTitle', 'SKILLS GAINED')}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {milestone.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full bg-[var(--color-bg-primary)] px-2.5 py-1 text-[8px] font-bold text-foreground border border-border/50"
                  >
                    <span className={`size-1.5 rounded-full ${milestone.skillDotColor}`} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                {t('educationPage.documentsTitle', 'DOCUMENTS')}
              </h3>
              {milestone.documents.length > 0 ? (
                <div className="space-y-1.5">
                  {milestone.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between rounded-[4px] border border-border/40 bg-[var(--color-bg-primary)] px-2 py-1.5 hover:border-border transition-colors"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <FileText className="size-3 text-muted-foreground shrink-0" />
                        <span className="text-[8px] font-semibold text-foreground truncate">
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
                        <Download className="size-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[9px] text-muted-foreground">
                  {t('educationPage.noDocuments', 'No documents available for this milestone.')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT: INFO + SKILLS + DOCUMENTS ── */}
        <div className="lg:col-span-3 space-y-3">
          {/* Milestone Info */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              {t('educationPage.milestoneInfo', 'MILESTONE INFO')}
            </h2>
            <div className="space-y-1.5 text-[8.5px]">
              {milestone.info.map((row, idx) => {
                const Icon = row.icon as React.ElementType<{ className?: string }>;
                const infoKeyMap: Record<string, string> = {
                  Level: 'levelLabel',
                  School: 'schoolLabel',
                  Location: 'locationLabel',
                  Focus: 'focusLabel',
                  Status: 'statusLabel',
                  Year: 'yearLabel',
                  Since: 'sinceLabel',
                  Degree: 'levelLabel',
                  Specialization: 'specializationLabel',
                  Institution: 'schoolLabel',
                  Credits: 'creditsLabel',
                  Graduated: 'graduatedLabel',
                  'Primary Stack': 'stackLabel',
                  Period: 'periodLabel',
                  Languages: 'languagesLabel',
                  Language: 'languagesLabel',
                };
                const kName = infoKeyMap[row.label] || `info_${idx}`;
                const labelText = t(`${itemKey}.info.${kName}`, row.label);
                const valKey = kName.replace('Label', 'Value');
                const valText = t(`${itemKey}.info.${valKey}`, row.value);

                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-0.5 border-b border-border/20 last:border-none"
                  >
                    <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                      <Icon className="size-3 shrink-0" />
                      <span>{labelText}</span>
                    </div>
                    <span className="font-bold text-foreground text-[8px] truncate max-w-[100px] text-right">
                      {valText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              {t('educationPage.documentsTitle', 'DOCUMENTS')}
            </h2>
            <div className="space-y-1.5">
              {milestone.documents.length > 0 ? (
                milestone.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-[4px] border border-border/40 bg-[var(--color-bg-primary)] px-2 py-1 hover:border-border transition-colors"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText className="size-3 text-muted-foreground shrink-0" />
                      <span className="text-[8px] font-semibold text-foreground truncate">
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
                      <Download className="size-2.5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[8.5px] text-muted-foreground italic">
                  {t('educationPage.noDocumentsYet', 'No documents yet.')}
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              {t('educationPage.skillsGainedTitle', 'SKILLS GAINED')}
            </h2>
            <div className="flex flex-wrap gap-1">
              {milestone.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 rounded-full bg-[var(--color-bg-primary)] px-2 py-0.5 text-[7.5px] font-bold text-foreground border border-border/50"
                >
                  <span className={`size-1 rounded-full ${milestone.skillDotColor}`} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM STATS ── */}
      {(() => {
        interface StatItem {
          icon: ElementType;
          value: string;
          labelKey: string;
          defaultLabel: string;
          color: string;
        }
        const stats: StatItem[] = [
          {
            icon: Award,
            value: '2',
            labelKey: 'educationPage.stats.degreesEarned',
            defaultLabel: 'Degrees Earned',
            color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
          },
          {
            icon: Clock,
            value: '5+',
            labelKey: 'educationPage.stats.yearsJourney',
            defaultLabel: 'Years of Academic Journey',
            color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          },
          {
            icon: Layers,
            value: '15+',
            labelKey: 'educationPage.stats.projectsCompleted',
            defaultLabel: 'Projects Completed',
            color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
          },
          {
            icon: Check,
            value: '100%',
            labelKey: 'educationPage.stats.milestonesCompleted',
            defaultLabel: 'Milestones Completed',
            color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
          },
        ];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {stats.map((stat) => {
              const Icon = stat.icon as React.ElementType<{ className?: string }>;
              return (
                <div
                  key={stat.labelKey}
                  className="flex items-center gap-3 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] p-2.5 shadow-2xs"
                >
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-[4px] ${stat.color}`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-foreground leading-none">
                      {stat.value}
                    </span>
                    <p className="text-[8px] font-semibold text-muted-foreground leading-tight">
                      {t(stat.labelKey, stat.defaultLabel)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* ── TIP BANNER ── */}
      <footer className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] px-2.5 py-1.5 text-[9px] text-muted-foreground shadow-2xs">
        <div className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-blue-500/10 text-blue-500">
          <Zap className="size-2.5 fill-blue-500" />
        </div>
        <p className="font-inter">
          <span className="font-bold text-foreground">{t('educationPage.tip', 'Tip')}</span>{' '}
          {t(
            'educationPage.tipText',
            'Click any milestone in the Academic Journey panel to explore its details, skills and documents.',
          )}
        </p>
      </footer>
    </div>
  );
}
