'use client';

import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Compass,
  Download,
  FileText,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import certificateImage from '@/assets/images/certificate.png';
import { useTranslation } from '@/hooks/use-translation';

export default function BachelorDegreePage() {
  const { t, tArray } = useTranslation();

  const milestoneInfo = [
    {
      icon: GraduationCap,
      label: t('bachelorMilestone.degree', 'Degree'),
      value: t('bachelorMilestone.degreeValue', "Bachelor's Degree"),
    },
    {
      icon: Layers,
      label: t('bachelorMilestone.field', 'Field'),
      value: t('bachelorMilestone.fieldValue', 'Computer Science'),
    },
    {
      icon: Sparkles,
      label: t('bachelorMilestone.specialization', 'Specialization'),
      value: t('bachelorMilestone.specializationValue', 'Web Dev & Computer Graphics'),
    },
    {
      icon: Building2,
      label: t('bachelorMilestone.institution', 'Institution'),
      value: t('bachelorMilestone.institutionValue', "M'Hamed Bougara University"),
    },
    {
      icon: MapPin,
      label: t('bachelorMilestone.location', 'Location'),
      value: t('bachelorMilestone.locationValue', 'Boumerdes, Algeria'),
    },
    {
      icon: ShieldCheck,
      label: t('bachelorMilestone.status', 'Status'),
      value: t('bachelorMilestone.statusCompleted', 'Completed'),
    },
    {
      icon: Calendar,
      label: t('bachelorMilestone.creditsEarned', 'Credits Earned'),
      value: t('bachelorMilestone.creditsValue', '180 ECTS'),
    },
    {
      icon: Clock,
      label: t('bachelorMilestone.duration', 'Duration'),
      value: t('bachelorMilestone.durationValue', '2021 – 2025'),
    },
  ];

  const coreSubjects = [
    {
      name: t('bachelorMilestone.subjects.webDev', 'Web Development'),
      grade: '16/20',
      color: 'bg-blue-500',
    },
    {
      name: t('bachelorMilestone.subjects.computerGraphics', 'Computer Graphics'),
      grade: '15/20',
      color: 'bg-purple-500',
    },
    {
      name: t('bachelorMilestone.subjects.dataStructures', 'Data Structures'),
      grade: '14/20',
      color: 'bg-emerald-500',
    },
    {
      name: t('bachelorMilestone.subjects.algorithms', 'Algorithms'),
      grade: '13/20',
      color: 'bg-amber-500',
    },
    {
      name: t('bachelorMilestone.subjects.operatingSystems', 'Operating Systems'),
      grade: '14/20',
      color: 'bg-rose-500',
    },
    {
      name: t('bachelorMilestone.subjects.databases', 'Databases'),
      grade: '15/20',
      color: 'bg-cyan-500',
    },
  ];

  const highlightsArray = tArray<string>('bachelorMilestone.highlightsList');
  const fallbackHighlights = [
    'Strong academic performance across core computer science subjects',
    'Completed multiple practical projects and real-world applications',
    'Specialized in Web Development and Computer Graphics',
    'Built a solid foundation in full-stack development and system design',
    'Graduated with a GPA of 14.31/20 — Good Honours',
  ];
  const renderedHighlights = highlightsArray.length > 0 ? highlightsArray : fallbackHighlights;

  const documents = [
    { name: t('bachelorMilestone.docDegree', 'Degree Certificate.pdf'), type: 'PDF' },
    { name: t('bachelorMilestone.docTranscript', 'Academic Transcript.pdf'), type: 'PDF' },
    { name: t('bachelorMilestone.docCompletion', 'Completion Letter.pdf'), type: 'PDF' },
  ];

  const stats = [
    {
      icon: Award,
      value: '14.31/20',
      label: t('bachelorMilestone.statGpaLabel', 'Final GPA'),
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Clock,
      value: t('bachelorMilestone.statDurationValue', '4 Years'),
      label: t('bachelorMilestone.statDurationLabel', 'Duration'),
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
      icon: BookOpen,
      value: t('bachelorMilestone.statCreditsValue', '180'),
      label: t('bachelorMilestone.statCreditsLabel', 'ECTS Credits'),
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Star,
      value: t('bachelorMilestone.statHonoursValue', 'Good'),
      label: t('bachelorMilestone.statHonoursLabel', 'Honours'),
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
  ];

  const tagsArray = tArray<string>('bachelorMilestone.tags');
  const fallbackTags = [
    'Web Dev',
    'Computer Graphics',
    'OOP',
    'Databases',
    'Algorithms',
    'Networks',
  ];
  const renderedTags = tagsArray.length > 0 ? tagsArray : fallbackTags;

  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-[var(--color-bg-primary)] p-4 space-y-4 text-[var(--color-text-primary)] font-inter border border-border/60 shadow-xs select-none">
      {/* 1. BREADCRUMB HEADER */}
      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground">
        <Link
          href="/experience"
          className="flex size-5 items-center justify-center rounded-[4px] border border-border/60 bg-[var(--color-bg-secondary)] hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-3" />
        </Link>
        <span>
          {t('bachelorMilestone.breadcrumb', 'Experience / Milestone Details')}{' '}
          <span className="text-foreground">
            {t('bachelorMilestone.breadcrumbHighlight', "— Bachelor's Degree")}
          </span>
        </span>
      </div>

      {/* 2. HERO + AT A GLANCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-4 shadow-2xs space-y-3 relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start relative">
            {/* Title & Info */}
            <div className="md:col-span-7 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-[8px] border border-blue-500/30 bg-blue-500/10 shrink-0">
                  <GraduationCap className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-black tracking-tight text-foreground uppercase font-inter">
                      {t('bachelorMilestone.title', "Bachelor's Degree")}
                    </h1>
                    <span className="rounded-[4px] bg-emerald-500/10 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {t('bachelorMilestone.statusCompleted', 'Completed')}
                    </span>
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {t('bachelorMilestone.year', '2025')}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                    {t(
                      'bachelorMilestone.university',
                      "M'Hamed Bougara University — Boumerdes, Algeria",
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-blue-500 font-bold text-[10px] uppercase tracking-wider">
                  <Compass className="size-3 fill-blue-500/20" />
                  <span>{t('bachelorMilestone.specialty', 'SPECIALTY')}</span>
                </div>
                <p className="text-[9.5px] font-medium leading-relaxed text-muted-foreground max-w-sm">
                  {t(
                    'bachelorMilestone.specialtyDesc',
                    'Web Development and Computer Graphics — a blend of software engineering and visual computing that shaped my full-stack mindset and creative problem-solving approach.',
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {renderedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-[var(--color-bg-primary)] px-2 py-0.5 text-[7.5px] font-bold text-foreground border border-border/50"
                  >
                    <span className="size-1 rounded-full bg-blue-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Certificate Image */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative h-36 w-52 rounded-[6px] border border-border/80 shadow-xs bg-stone-100 dark:bg-stone-900 overflow-hidden group">
                <Image
                  src={certificateImage}
                  alt="Bachelor Degree Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center pb-1">
                  <span className="text-[7px] font-semibold text-white/80 uppercase tracking-wider">
                    {t('bachelorMilestone.officialCertificate', 'Official Certificate')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 border-b border-border/40" />

          {/* GPA + Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1"
                >
                  <div
                    className={`flex size-5 items-center justify-center rounded-[4px] ${stat.color}`}
                  >
                    <Icon className="size-3" />
                  </div>
                  <p className="text-[10px] font-black text-foreground leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[7.5px] text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — Milestone Info Card */}
        <div className="lg:col-span-4 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            {t('bachelorMilestone.atAGlance', 'AT A GLANCE')}
          </h2>

          <div className="space-y-1.5 text-[8.5px]">
            {milestoneInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="flex items-center justify-between py-0.5 border-b border-border/20 last:border-none"
                >
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <Icon className="size-3 shrink-0" />
                    <span>{info.label}</span>
                  </div>
                  <span className="font-bold text-foreground text-[8px] truncate max-w-[110px] text-right">
                    {info.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MIDDLE SECTION — Core Subjects + Highlights + Documents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Core Subjects */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <BookOpen className="size-3.5 text-blue-500" />
            <span>{t('bachelorMilestone.coreSubjects', 'CORE SUBJECTS')}</span>
          </div>
          <div className="space-y-2">
            {coreSubjects.map((subject) => (
              <div key={subject.name} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8.5px] font-semibold text-foreground">{subject.name}</span>
                  <span className="text-[8px] font-bold text-muted-foreground">
                    {subject.grade}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-muted/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${subject.color} transition-all duration-500`}
                    style={{
                      width: `${(parseInt(subject.grade) / 20) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <Star className="size-3.5 text-amber-500" />
            <span>{t('bachelorMilestone.highlights', 'HIGHLIGHTS')}</span>
          </div>
          <ul className="space-y-1.5 text-[8.5px] font-medium text-foreground">
            {renderedHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <FileText className="size-3.5 text-violet-500" />
            <span>{t('bachelorMilestone.documents', 'DOCUMENTS')}</span>
          </div>
          <div className="space-y-1.5">
            {documents.map((doc) => (
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

          {/* About section */}
          <div className="pt-2 border-t border-border/30 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wide text-foreground">
              {t('bachelorMilestone.about', 'ABOUT')}
            </p>
            <p className="text-[8.5px] font-medium leading-relaxed text-muted-foreground">
              {t(
                'bachelorMilestone.aboutDesc',
                "Completed my Bachelor's degree in Computer Science with a strong foundation in software development, problem solving and system design. This journey shaped my technical skills and passion for building impactful digital solutions.",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TIP BANNER */}
      <footer className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] px-2.5 py-1.5 text-[9px] text-muted-foreground shadow-2xs">
        <div className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-blue-500/10 text-blue-500">
          <Zap className="size-2.5 fill-blue-500" />
        </div>
        <p className="font-inter">
          <span className="font-bold text-foreground">{t('bachelorMilestone.tip', 'Tip')}</span>{' '}
          {t(
            'bachelorMilestone.tipText',
            'Select a section from the sidebar to explore more details about my experience.',
          )}
        </p>
      </footer>
    </div>
  );
}
