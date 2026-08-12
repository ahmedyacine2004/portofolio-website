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
  Compass,
  Download,
  FileText,
  GraduationCap,
  Layers,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import certificateImage from '@/assets/images/certificate.png';

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
  {
    id: 'fullstack-2024',
    year: '2024',
    title: 'Full Stack Engineering Specialization',
  },
  {
    id: 'major-2023',
    year: '2023',
    title: 'Software Engineering Major Courses',
  },
  {
    id: 'year2-2022',
    year: '2022',
    title: 'University Journey Second Year',
  },
  {
    id: 'year1-2021',
    year: '2021',
    title: 'Started University First Year',
  },
];

const DOCUMENTS = [
  { name: 'Degree Certificate.pdf', type: 'PDF' },
  { name: 'Academic Transcript.pdf', type: 'PDF' },
  { name: 'Completion Letter.pdf', type: 'PDF' },
];

const SKILLS = [
  'Data Structures',
  'Operating Systems',
  'Web Development',
  'OOP',
  'Databases',
  'Algorithms',
  'Networks',
];

export default function EducationTimelinePage() {
  const [selectedId, setSelectedId] = useState<string>('bachelor');
  const [activeTab, setActiveTab] = useState<string>('Overview');

  return (
    <div className="h-full w-full overflow-y-auto rounded-[8px] bg-[var(--color-bg-primary)] p-4 space-y-4 text-[var(--color-text-primary)] font-inter border border-border/60 shadow-xs select-none">
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground mb-1">
            <Link
              href="/experience"
              className="flex size-4 items-center justify-center rounded-[3px] border border-border/60 bg-[var(--color-bg-secondary)] hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-2.5" />
            </Link>
            <span>Experience / Education timeline</span>
          </div>
          <h1 className="font-inter text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
            Education timeline
          </h1>
          <p className="text-[10px] font-medium text-muted-foreground mt-0.5 font-inter">
            My professional journey, education, internships and achievements.
          </p>
        </div>

        {/* Top Right Quote Box */}
        <div className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] px-2.5 py-1.5 max-w-xs shadow-2xs">
          <Quote className="size-3 shrink-0 text-blue-500 fill-blue-500/20" />
          <p className="text-[9px] font-medium leading-tight text-muted-foreground font-inter italic">
            &quot;The quieter you become, the more you are able to hear.&quot;
          </p>
        </div>
      </header>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* LEFT COLUMN: ACADEMIC JOURNEY TIMELINE */}
        <div className="lg:col-span-3 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              ACADEMIC JOURNEY
            </h2>

            <div className="space-y-1.5">
              {TIMELINE_ITEMS.map((item) => {
                const isSelected = selectedId === item.id;

                if (item.isCurrent) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left rounded-[6px] p-2 transition-all border ${
                        isSelected
                          ? 'bg-purple-500/10 border-purple-500/30'
                          : 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10'
                      }`}
                    >
                      <span className="text-[8px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-0.5">
                        ● {item.year}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-purple-500/20 text-purple-600 dark:text-purple-300">
                          <GraduationCap className="size-3" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold text-foreground leading-tight truncate">
                            {item.title}
                          </p>
                          <p className="text-[7.5px] font-medium text-muted-foreground truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                }

                if (item.isCompleted && isSelected) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className="w-full text-left rounded-[6px] bg-blue-900 border border-blue-700 p-2 text-white shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-blue-200">
                          ● {item.year}
                        </span>
                        <CheckCircle2 className="size-3 text-blue-300" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-blue-800 text-blue-100">
                          <BookOpen className="size-3" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9.5px] font-bold text-white leading-tight truncate">
                            {item.title}
                          </p>
                          <p className="text-[7.5px] font-medium text-blue-200 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left rounded-[5px] p-1.5 transition-colors hover:bg-[var(--color-bg-tertiary)] flex items-start gap-2 ${
                      isSelected ? 'bg-[var(--color-bg-tertiary)] font-semibold' : ''
                    }`}
                  >
                    <span className="mt-1 size-1.5 rounded-full bg-blue-500 shrink-0" />
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[8px] font-bold text-blue-600 dark:text-blue-400 leading-none">
                        {item.year}
                      </p>
                      <p className="text-[8.5px] font-medium text-foreground leading-tight truncate">
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button className="w-full rounded-[6px] bg-blue-900 hover:bg-blue-800 text-white py-1.5 text-[9px] font-bold flex items-center justify-center gap-1 transition-colors">
            <span>View All</span>
            <ChevronRight className="size-3" />
          </button>
        </div>

        {/* MIDDLE COLUMN: SELECTED MILESTONE DETAILS */}
        <div className="lg:col-span-6 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3.5 shadow-2xs space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            SELECTED MILESTONE
          </h2>

          {/* Certificate Banner Box */}
          <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] border border-border/60 bg-[var(--color-bg-secondary)] text-foreground">
                  <Building2 className="size-4" />
                </div>
                <div>
                  <h3 className="text-[30px] font-extrabold text-foreground leading-tight">
                    Bachelor&apos;s Degree
                  </h3>
                  <span className="inline-block text-[7.5px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.2 rounded-[3px]">
                    Completed in 2025
                  </span>
                </div>
              </div>
              <p className="text-[8.5px] font-medium text-muted-foreground italic">
                &quot;The end of one journey, the beginning of infinite possibilities.&quot;
              </p>
            </div>

            {/* Prominent Certificate Image Component */}
            <div className="relative h-28 w-44 sm:h-32 sm:w-52 shrink-0 overflow-hidden rounded-[6px] border border-border/80 shadow-xs bg-stone-100 dark:bg-stone-900">
              <Image
                src={certificateImage}
                alt="Bachelor Degree Certificate"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-border/40 pb-1 text-[9px] font-bold">
            {['Overview', 'Completed', 'Projects', 'Achievements', 'Notes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                  activeTab === tab
                    ? 'bg-[var(--color-bg-tertiary)] text-foreground font-extrabold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* About This Milestone */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
              ABOUT THIS MILESTONE
            </h3>
            <p className="text-[9px] font-medium leading-relaxed text-muted-foreground">
              Completed my Bachelor&apos;s degree in Computer Science with a strong foundation in
              software development, problem solving and system design. This journey shaped my
              technical skills and passion for building impactful digital solutions.
            </p>
          </div>

          {/* 4 Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* 1. University */}
            <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1">
              <div className="flex size-5 items-center justify-center rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Compass className="size-3" />
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-foreground leading-tight truncate">
                  University
                </p>
                <p className="text-[8px] font-bold text-foreground truncate">
                  M&apos;Hamed Bougara
                </p>
                <p className="text-[7px] text-muted-foreground">University</p>
              </div>
            </div>

            {/* 2. Computer Science */}
            <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1">
              <div className="flex size-5 items-center justify-center rounded-[4px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="size-3" />
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-foreground leading-tight truncate">
                  Computer
                </p>
                <p className="text-[8px] font-bold text-foreground truncate">Science</p>
                <p className="text-[7px] text-muted-foreground">Specialization</p>
              </div>
            </div>

            {/* 3. Duration */}
            <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1">
              <div className="flex size-5 items-center justify-center rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Clock className="size-3" />
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-foreground leading-tight truncate">
                  2021 - 2025
                </p>
                <p className="text-[8px] font-bold text-foreground truncate">[3 Years]</p>
                <p className="text-[7px] text-muted-foreground">Duration</p>
              </div>
            </div>

            {/* 4. GPA */}
            <div className="rounded-[6px] border border-border/50 bg-[var(--color-bg-primary)] p-2 space-y-1">
              <div className="flex size-5 items-center justify-center rounded-[4px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Award className="size-3" />
              </div>
              <div>
                <p className="text-[8.5px] font-bold text-foreground leading-tight truncate">
                  14.31 / 20
                </p>
                <p className="text-[8px] font-bold text-foreground truncate">[Good]</p>
                <p className="text-[7px] text-muted-foreground">GPA</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground">
              HIGHLIGHTS
            </h3>
            <ul className="space-y-1 text-[8.5px] font-medium text-foreground">
              {[
                'Strong academic performance across core computer science subject',
                'Completed multiple practical projects and real-world applications',
                'Actively participated in coding challenges and tech communities',
                'Built a solid foundation in full stack development and system design',
              ].map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: MILESTONE INFO, DOCUMENTS & SKILLS */}
        <div className="lg:col-span-3 space-y-3">
          {/* Milestone Info Card */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              MILESTONE INFO
            </h2>

            <div className="space-y-1.5 text-[8.5px]">
              {[
                { icon: GraduationCap, label: 'Degree', value: "Bachelor's Degree" },
                { icon: Layers, label: 'Field', value: 'Computer Science' },
                { icon: Sparkles, label: 'Specialization', value: 'Software Dev' },
                { icon: Building2, label: 'Institution', value: "M'Hamed Bougara University" },
                { icon: MapPin, label: 'Location', value: 'Boumerdes, Algeria' },
                { icon: ShieldCheck, label: 'Status', value: 'Completed' },
                { icon: Calendar, label: 'Credits Earned', value: '180 ECTS' },
                { icon: Clock, label: 'Graduation Year', value: '2025' },
              ].map((info) => {
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
                    <span className="font-bold text-foreground text-[8px] truncate max-w-[100px] text-right">
                      {info.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents Card */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              DOCUMENTS
            </h2>

            <div className="space-y-1.5">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-[4px] border border-border/40 bg-[var(--color-bg-primary)] px-2 py-1 transition-colors hover:border-border"
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
          </div>

          {/* Skills Gained Card */}
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
              SKILLS GAINED
            </h2>

            <div className="flex flex-wrap gap-1">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 rounded-full bg-[var(--color-bg-primary)] px-2 py-0.5 text-[7.5px] font-bold text-foreground border border-border/50"
                >
                  <span className="size-1 rounded-full bg-blue-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SUMMARY STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
        {/* Stat 1 */}
        <div className="flex items-center gap-3 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] p-2.5 shadow-2xs">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Award className="size-3.5" />
          </div>
          <div>
            <span className="text-sm font-black text-foreground leading-none">3</span>
            <p className="text-[8px] font-semibold text-muted-foreground leading-tight">
              Degrees & Major Steps
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] p-2.5 shadow-2xs">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Clock className="size-3.5" />
          </div>
          <div>
            <span className="text-sm font-black text-foreground leading-none">12</span>
            <p className="text-[8px] font-semibold text-muted-foreground leading-tight">
              Years of Academic Journey
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] p-2.5 shadow-2xs">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Layers className="size-3.5" />
          </div>
          <div>
            <span className="text-sm font-black text-foreground leading-none">15+</span>
            <p className="text-[8px] font-semibold text-muted-foreground leading-tight">
              Projects Completed
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center gap-3 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] p-2.5 shadow-2xs">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Check className="size-3.5" />
          </div>
          <div>
            <span className="text-sm font-black text-foreground leading-none">100%</span>
            <p className="text-[8px] font-semibold text-muted-foreground leading-tight">
              Academic Milestones Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
