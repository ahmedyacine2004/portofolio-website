'use client';

import {
  BookOpen,
  Building2,
  ChevronLeft,
  Clock,
  Compass,
  Flag,
  Layers,
  RotateCcw,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import consultifyIcon from '@/assets/icons/consultify.svg';
import consultifyImage from '@/assets/images/consultify.png';

export default function ConsultifyDetailPage() {
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
          Experience / Milestone Details <span className="text-foreground">-CONSULTIFY-</span>
        </span>
      </div>

      {/* 2. TOP HERO & AT A GLANCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-4 shadow-2xs relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Title & Subtitle */}
            <div className="md:col-span-7 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-[8px] border border-purple-500/30 bg-purple-500/10 p-1.5 shrink-0">
                  <Image
                    src={consultifyIcon}
                    alt="Consultify Icon"
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-black tracking-tight text-foreground uppercase font-inter">
                      CONSULTIFY
                    </h1>
                    <span className="rounded-[4px] bg-purple-500/10 px-1.5 py-0.5 text-[8.5px] font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Startup founder
                    </span>
                    <span className="text-[9px] font-medium text-muted-foreground">2025</span>
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                    Making expert knowledge universally accessible.
                  </p>
                </div>
              </div>
            </div>

            {/* 3D Logo Image */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative size-32 md:size-36 flex items-center justify-center">
                <Image
                  src={consultifyImage}
                  alt="Consultify 3D Logo"
                  width={160}
                  height={160}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="my-3 border-b border-border/40" />

          {/* Mission Statement */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-blue-500 font-bold text-[10px] uppercase tracking-wider">
              <Zap className="size-3 fill-blue-500" />
              <span>MISSION</span>
            </div>
            <p className="text-[10px] font-medium leading-relaxed text-muted-foreground max-w-xl">
              CONSULTIFY was created to simplify access to professional guidance by combining expert
              booking, intelligent recommendations and a modern digital experience into a single
              platform.
            </p>
          </div>
        </div>

        {/* Right At a Glance Card */}
        <div className="lg:col-span-4 rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-foreground font-inter">
            AT A GLANCE
          </h2>

          <div className="space-y-2 text-[9.5px]">
            {/* Status */}
            <div className="flex items-center justify-between py-1 border-b border-border/30">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <RotateCcw className="size-3 shrink-0" />
                <span>Status</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-1 rounded-full bg-emerald-500" />
                Archived
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between py-1 border-b border-border/30">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Clock className="size-3 shrink-0" />
                <span>Duration</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground leading-tight">8 Months</p>
                <p className="text-[8px] text-muted-foreground">Jan 2025 - Aug 2025</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between py-1 border-b border-border/30">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <User className="size-3 shrink-0" />
                <span>Role</span>
              </div>
              <span className="font-bold text-foreground">Founder & Full-Stack Developer</span>
            </div>

            {/* Industry */}
            <div className="flex items-center justify-between py-1 border-b border-border/30">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Building2 className="size-3 shrink-0" />
                <span>Industry</span>
              </div>
              <span className="font-bold text-foreground">EdTech . AI . Consultation</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-muted-foreground font-medium">
                <Layers className="size-3 shrink-0" />
                <span>Tech Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-3.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-bold flex items-center justify-center">
                  ⚛
                </span>
                <span className="size-3.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold flex items-center justify-center">
                  ▲
                </span>
                <span className="size-3.5 rounded bg-cyan-500/10 text-cyan-500 text-[8px] font-bold flex items-center justify-center">
                  ≈
                </span>
                <span className="size-3.5 rounded bg-blue-600/10 text-blue-600 text-[8px] font-bold flex items-center justify-center">
                  TS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MIDDLE THREE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: What I Built */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <BookOpen className="size-3.5 text-emerald-500" />
            <span>WHAT I BUILT</span>
          </div>
          <ul className="space-y-1.5 text-[9px] font-medium text-foreground">
            {[
              'Complete Product Vision',
              'UI / UX Design System',
              'Full-Stack Architecture',
              'Authentication System',
              'AI Recommendation Engine',
              'Expert Dashboard',
              'Booking Workflow',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Biggest Challenges */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <Compass className="size-3.5 text-amber-500" />
            <span>BIGGEST CHALLENGES</span>
          </div>
          <ul className="space-y-1.5 text-[9px] font-medium text-foreground">
            {[
              'Market validation',
              'Product positioning',
              'Time management',
              'User decision making',
              'Data acquisition',
              'Scaling with limited resources',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Key Takeaways */}
        <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
            <Flag className="size-3.5 text-blue-500" />
            <span>KEY TAKEAWAYS</span>
          </div>
          <ul className="space-y-1.5 text-[9px] font-medium text-foreground">
            {[
              'Building is only half the journey',
              'Validate ideas before scaling',
              'Communication is as important as code',
              'Failure is valuable',
              'Mentor input > experience',
              'Product thinking changed my perspective',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. BOTTOM IMPACT SECTION & PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Impact + Tip Banner */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
          <div className="rounded-[8px] border border-border/60 bg-[var(--color-bg-secondary)] p-3 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-foreground">
              <TrendingUp className="size-3.5 text-blue-500" />
              <span>IMPACT</span>
            </div>
            <p className="text-[9.5px] font-medium text-muted-foreground leading-relaxed">
              Although CONSULTIFY did not reach commercial success, it became the project that
              transformed me from someone who could build applications into someone who understands
              product design, software architecture, user experience, business strategy and
              entrepreneurship.
            </p>
          </div>

          {/* Bottom Tip Banner */}
          <footer className="flex items-center gap-2 rounded-[6px] border border-border/60 bg-[var(--color-bg-secondary)] px-2.5 py-1.5 text-[9px] text-muted-foreground shadow-2xs">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-blue-500/10 text-blue-500">
              <Zap className="size-2.5 fill-blue-500" />
            </div>
            <p className="font-inter">
              <span className="font-bold text-foreground">Tip</span> Select a section from the
              sidebar to explore more details about my experience.
            </p>
          </footer>
        </div>

        {/* Right Column: Platform Preview Frame */}
        <div className="lg:col-span-4 rounded-[8px] border border-border/60 bg-purple-950/80 p-2 shadow-2xs flex items-center justify-center overflow-hidden">
          <div className="w-full h-36 rounded-[6px] bg-slate-950 border border-purple-500/30 p-2 relative flex flex-col justify-between">
            {/* Mock Header */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-1">
              <div className="flex items-center gap-1">
                <Image
                  src={consultifyIcon}
                  alt="Icon"
                  width={12}
                  height={12}
                  className="size-3 object-contain"
                />
                <span className="text-[7px] font-bold text-white tracking-widest">CONSULTIFY</span>
              </div>
              <div className="flex items-center gap-1 text-[6px] text-purple-300 font-mono">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
            </div>

            {/* Preview Image / Graphic */}
            <div className="flex-1 my-1 flex items-center justify-center relative">
              <Image
                src={consultifyImage}
                alt="Consultify Graphic"
                width={80}
                height={80}
                className="object-contain opacity-90 drop-shadow"
              />
            </div>

            {/* Mock Footer Badge */}
            <div className="rounded bg-purple-900/60 p-1 text-center">
              <span className="text-[6px] font-semibold text-purple-200 uppercase tracking-tight">
                Where Knowledge Meets Opportunity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
