'use client';

import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Layers,
  MapPin,
  Network,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import algerietelecomImage from '@/assets/images/internships/algerie-telecom.jpg';
import algerietelecomLogo from '@/assets/images/internships/Logo_Algérie_Télécom.png';
import { useTranslation } from '@/hooks/use-translation';

export default function AlgerieTelecomInternshipPage() {
  const { t, tArray } = useTranslation();

  const atAGlance = [
    {
      icon: Briefcase,
      label: t('algerieTelecomMilestone.type', 'Type'),
      value: t('algerieTelecomMilestone.typeValue', 'Early Level Internship'),
    },
    {
      icon: Building2,
      label: t('algerieTelecomMilestone.company', 'Company'),
      value: t('algerieTelecomMilestone.companyValue', 'Algérie Télécom'),
    },
    {
      icon: MapPin,
      label: t('algerieTelecomMilestone.location', 'Location'),
      value: t('algerieTelecomMilestone.locationValue', 'Algeria'),
    },
    {
      icon: Calendar,
      label: t('algerieTelecomMilestone.period', 'Period'),
      value: t('algerieTelecomMilestone.periodValue', 'Jul 2024 – Jul 2024'),
    },
    {
      icon: Clock,
      label: t('algerieTelecomMilestone.duration', 'Duration'),
      value: t('algerieTelecomMilestone.durationValue', '1 month'),
    },
    {
      icon: Radio,
      label: t('algerieTelecomMilestone.domain', 'Domain'),
      value: t('algerieTelecomMilestone.domainValue', 'Telecommunications'),
    },
    {
      icon: ShieldCheck,
      label: t('algerieTelecomMilestone.status', 'Status'),
      value: t('algerieTelecomMilestone.statusValue', 'Completed'),
    },
  ];

  const responsibilitiesArray = tArray<string>('algerieTelecomMilestone.responsibilitiesList');
  const fallbackResponsibilities = [
    'Observed operations within a national telecommunications infrastructure',
    'Learned about fiber-optic and copper network maintenance procedures',
    'Assisted in documenting network topology and infrastructure maps',
    'Attended technical briefings on ADSL and fiber internet services',
    'Gained exposure to ISP-level network configuration and monitoring',
  ];
  const renderedResponsibilities =
    responsibilitiesArray.length > 0 ? responsibilitiesArray : fallbackResponsibilities;

  const keyLearningsArray = tArray<string>('algerieTelecomMilestone.keyLearningsList');
  const fallbackKeyLearnings = [
    'Understanding of large-scale national telecommunications networks',
    'Exposure to enterprise network administration and monitoring tools',
    'Real-world understanding of ISP operations and infrastructure',
    'Professional discipline and work ethic in a technical environment',
    'First professional experience in a structured corporate setting',
  ];
  const renderedKeyLearnings =
    keyLearningsArray.length > 0 ? keyLearningsArray : fallbackKeyLearnings;

  const skillsGained = [
    {
      name: t('algerieTelecomMilestone.skills.networkFundamentals', 'Network Fundamentals'),
      level: 75,
    },
    {
      name: t('algerieTelecomMilestone.skills.technicalObservation', 'Technical Observation'),
      level: 80,
    },
    { name: t('algerieTelecomMilestone.skills.documentation', 'Documentation'), level: 78 },
    {
      name: t('algerieTelecomMilestone.skills.professionalDiscipline', 'Professional Discipline'),
      level: 90,
    },
    {
      name: t('algerieTelecomMilestone.skills.teamCollaboration', 'Team Collaboration'),
      level: 85,
    },
  ];

  const documents = [
    { name: t('algerieTelecomMilestone.docCertificate', 'Internship Certificate'), type: 'PDF' },
    { name: t('algerieTelecomMilestone.docCompletion', 'Completion Letter'), type: 'PDF' },
  ];

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
          {t('algerieTelecomMilestone.breadcrumb', 'Experience / Milestone Details')}{' '}
          <span className="text-foreground">
            {t('algerieTelecomMilestone.breadcrumbHighlight', '— Algérie Télécom Internship')}
          </span>
        </span>
      </div>

      {/* 2. HERO + AT A GLANCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-4 shadow-2xs space-y-3 relative overflow-hidden">
          {/* Subtle gradient accent — Algerie Telecom brand: blue + green */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start relative">
            {/* Title & Info */}
            <div className="md:col-span-7 space-y-2">
              <div className="flex items-center gap-3">
                {/* Algerie Telecom logo — brand colors: blue + green */}
                <div className="relative flex size-11 items-center justify-center rounded-[8px] border border-blue-500/30 bg-white p-1 shrink-0 overflow-hidden shadow-2xs">
                  <Image
                    src={algerietelecomLogo}
                    alt="Algérie Télécom Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-black tracking-tight text-foreground uppercase font-inter">
                      {t('algerieTelecomMilestone.title', 'Algérie Télécom')}
                    </h1>
                    <span className="rounded-[4px] bg-blue-500/10 px-1.5 py-0.5 text-[8.5px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {t('algerieTelecomMilestone.badge', 'Early Level Internship')}
                    </span>
                    <span className="text-[9px] font-medium text-muted-foreground">
                      {t('algerieTelecomMilestone.year', '2024')}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                    {t(
                      'algerieTelecomMilestone.subtitle',
                      'Algérie Télécom — National Telecommunications Provider, Algeria',
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-blue-500 font-bold text-[10px] uppercase tracking-wider">
                  <Network className="size-3" />
                  <span>{t('algerieTelecomMilestone.aboutCompany', 'ABOUT THE COMPANY')}</span>
                </div>
                <p className="text-[9.5px] font-medium leading-relaxed text-muted-foreground max-w-sm">
                  {t(
                    'algerieTelecomMilestone.aboutCompanyDesc',
                    'Algérie Télécom is the national state-owned telecommunications operator of Algeria, providing internet, telephony, and data services across the country. This early-level internship provided my first exposure to professional IT operations in a major national infrastructure company.',
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 text-center">
                  <p className="text-[11px] font-black text-blue-500">1</p>
                  <p className="text-[7.5px] text-muted-foreground">
                    {t('algerieTelecomMilestone.statMonth', 'Month')}
                  </p>
                </div>
                <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 text-center">
                  <p className="text-[11px] font-black text-foreground">NET</p>
                  <p className="text-[7.5px] text-muted-foreground">
                    {t('algerieTelecomMilestone.statDomain', 'Domain')}
                  </p>
                </div>
                <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 text-center">
                  <p className="text-[11px] font-black text-emerald-500">
                    {t('algerieTelecomMilestone.statStatusDone', 'Done')}
                  </p>
                  <p className="text-[7.5px] text-muted-foreground">
                    {t('algerieTelecomMilestone.statStatus', 'Status')}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate / Internship Image — portrait */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative h-52 w-36 rounded-[6px] border border-border/80 shadow-xs bg-stone-100 dark:bg-stone-900 overflow-hidden group">
                <Image
                  src={algerietelecomImage}
                  alt="Algérie Télécom Internship Certificate"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-1">
                  <span className="text-[7px] font-semibold text-white/80 uppercase tracking-wider">
                    {t('algerieTelecomMilestone.certificateCaption', 'Internship Certificate')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 border-b border-border/40" />

          {/* Skills progress bars */}
          <div className="space-y-2 relative">
            <p className="text-[10px] font-bold uppercase tracking-wide text-foreground">
              {t('algerieTelecomMilestone.skillsDeveloped', 'SKILLS DEVELOPED')}
            </p>
            {skillsGained.map((skill) => (
              <div key={skill.name} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8.5px] font-semibold text-foreground">{skill.name}</span>
                  <span className="text-[8px] font-bold text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1 rounded-full bg-muted/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — At a Glance */}
        <div className="lg:col-span-4 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            {t('algerieTelecomMilestone.atAGlance', 'AT A GLANCE')}
          </h2>

          <div className="space-y-1.5 text-[8.5px]">
            {atAGlance.map((info) => {
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

          {/* Status Badge */}
          <div className="rounded-[6px] border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400">
              {t('algerieTelecomMilestone.completedBadge', 'Successfully Completed — July 2024')}
            </span>
          </div>

          {/* First Internship Badge */}
          <div className="rounded-[6px] border border-blue-500/20 bg-blue-500/10 px-3 py-2 flex items-center gap-2">
            <Award className="size-3.5 text-blue-500 shrink-0" />
            <span className="text-[8.5px] font-bold text-blue-600 dark:text-blue-400">
              {t(
                'algerieTelecomMilestone.firstInternshipBadge',
                'My First Professional Internship',
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 3. RESPONSIBILITIES + LEARNINGS + DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Responsibilities */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <Briefcase className="size-3.5 text-blue-500" />
            <span>{t('algerieTelecomMilestone.responsibilities', 'RESPONSIBILITIES')}</span>
          </div>
          <ul className="space-y-1.5 text-[8.5px] font-medium text-foreground">
            {renderedResponsibilities.map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Learnings */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <Layers className="size-3.5 text-green-500" />
            <span>{t('algerieTelecomMilestone.keyLearnings', 'KEY LEARNINGS')}</span>
          </div>
          <ul className="space-y-1.5 text-[8.5px] font-medium text-foreground">
            {renderedKeyLearnings.map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <Award className="size-3 text-green-500 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <FileText className="size-3.5 text-violet-500" />
            <span>{t('algerieTelecomMilestone.documents', 'DOCUMENTS')}</span>
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

          <div className="pt-2 border-t border-border/30 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wide text-foreground">
              {t('algerieTelecomMilestone.overallExperience', 'OVERALL EXPERIENCE')}
            </p>
            <p className="text-[8.5px] font-medium leading-relaxed text-muted-foreground">
              {t(
                'algerieTelecomMilestone.overallExperienceDesc',
                'My first professional internship at Algérie Télécom gave me invaluable insight into large-scale national IT infrastructure and telecommunications operations, setting the foundation for my professional career in tech.',
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
          <span className="font-bold text-foreground">
            {t('algerieTelecomMilestone.tip', 'Tip')}
          </span>{' '}
          {t(
            'algerieTelecomMilestone.tipText',
            'Select a section from the sidebar to explore more details about my experience.',
          )}
        </p>
      </footer>
    </div>
  );
}
