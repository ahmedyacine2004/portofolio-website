'use client';

import avatar from '@/assets/images/avatar.jpg';
import { AboutTabBar } from '@/components/about/about-tab-bar';
import { useTranslation } from '@/hooks/use-translation';
import {
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Code2,
  Gamepad2,
  Laptop,
  Palette,
  PenTool,
  Play,
  Puzzle,
  UserRound,
} from 'lucide-react';
import { useMemo } from 'react';

import dockerbIcon from '@/assets/icons/docker.svg';
import gitIcon from '@/assets/icons/git.svg';
import mongodbIcon from '@/assets/icons/mongodb.svg';
import nestIcon from '@/assets/icons/nestjs.svg';
import nextIcon from '@/assets/icons/nextjs.svg';
import nodeIcon from '@/assets/icons/package.svg';
import postegresqltIcon from '@/assets/icons/postgresql.svg';
import reactIcon from '@/assets/icons/react.svg';
import tailwindIcon from '@/assets/icons/tailwindcss.svg';
import typescriptIcon from '@/assets/icons/typescript.svg';

import Image from 'next/image';
import Link from 'next/link';

const technologies = [
  reactIcon,
  nextIcon,
  nodeIcon,
  nestIcon,
  typescriptIcon,
  tailwindIcon,
  postegresqltIcon,
  mongodbIcon,
  dockerbIcon,
  gitIcon,
];

export default function AboutPage() {
  const { t, tArray } = useTranslation();

  const journey = useMemo(
    () => [
      {
        year: '2022',
        text: t('about.timeline.2022'),
      },
      {
        year: '2023',
        text: t('about.timeline.2023'),
      },
      {
        year: '2024',
        text: t('about.timeline.2024'),
      },
      {
        year: '2025',
        text: t('about.timeline.2025'),
      },
      {
        year: '2026+',
        text: t('about.timeline.2026'),
      },
    ],
    [t],
  );

  const services = useMemo(
    () => [
      {
        title: t('about.services.webDevelopment'),
        description: t('about.services.webDevelopmentDesc'),
        icon: UserRound,
        className: 'bg-sky-500',
      },
      {
        title: t('about.services.uiux'),
        description: t('about.services.uiuxDesc'),
        icon: Palette,
        className: 'bg-violet-600',
      },
      {
        title: t('about.services.problemSolving'),
        description: t('about.services.problemSolvingDesc'),
        icon: Puzzle,
        className: 'bg-emerald-500',
      },
      {
        title: t('about.services.continuousLearning'),
        description: t('about.services.continuousLearningDesc'),
        icon: Play,
        className: 'bg-orange-500',
      },
    ],
    [t],
  );

  const interests = useMemo(
    () =>
      tArray('about.interests').map((label: string, index: number) => {
        const iconList = [Palette, PenTool, Camera, Gamepad2, BookOpen, Laptop];
        const iconMap: { [key: string]: typeof Palette } = {
          'UI/UX design': Palette,
          'Design UI/UX': Palette,
          'Graphic Design': PenTool,
          'Design graphique': PenTool,
          Photography: Camera,
          Photographie: Camera,
          Gaming: Gamepad2,
          'Jeux vidéo': Gamepad2,
          Reading: BookOpen,
          Lecture: BookOpen,
          'Tech Enthusiast': Laptop,
          'Passionné de technologie': Laptop,
        };
        return { label, icon: iconMap[label] || iconList[index] || Palette };
      }),
    [tArray],
  );
  return (
    <div className="flex h-full min-h-0 flex-col gap-1 p-2">
      <AboutTabBar />
      {/* Top */}
      <section className="grid min-h-0 flex-[1.15] grid-cols-[1.2fr_0.9fr_0.9fr] gap-2">
        {/* Introduction */}
        <div className="flex min-h-0 flex-col justify-between rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <div>
            <p className="mb-1.5 text-[8px] font-semibold text-primary">{t('about.greeting')}</p>

            <h1 className="text-[60px] font-bold leading-[0.7]">{t('about.heading')}</h1>

            <p className="mt-0.5 text-[9px] font-semibold leading-tight">{t('about.subheading')}</p>

            <p className="mt-1 max-w-[330px] text-[7.5px] leading-[1.45] text-muted-foreground">
              {t('about.introduction')}
            </p>

            <p className="mt-1 max-w-[330px] text-[7.5px] leading-[1.45] text-muted-foreground">
              {t('about.welcomeMessage')}
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-2 flex h-7 items-center justify-center rounded-xs bg-primary text-[8px] font-semibold text-primary-foreground"
          >
            {t('about.letsConnect')}
          </Link>
        </div>

        {/* Avatar */}
        <div className="relative min-h-0 overflow-hidden rounded-sm bg-sky-50 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] dark:bg-slate-900">
          <Image
            src={avatar}
            alt="Ahmed Yassine Abbane"
            sizes="(max-width: 768px) 40vw, 30vw"
            className="object-fit object-center"
            priority
          />
        </div>

        {/* Stats */}
        <div className="flex rounded sm min-h-0 flex-col gap-1 px-2 py-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <StatCard
            icon={UserRound}
            label={t('about.stats.experience')}
            value={t('about.stats.experienceValue')}
            color="bg-sky-500"
          />

          <StatCard
            icon={BriefcaseBusiness}
            label={t('about.stats.projectsCompleted')}
            value={t('about.stats.projectsValue')}
            color="bg-violet-600"
          />

          <StatCard
            icon={BookOpen}
            label={t('about.stats.education')}
            value={t('about.stats.educationValue')}
            color="bg-sky-500"
          />

          <StatCard
            icon={Code2}
            label={t('about.stats.linesOfCode')}
            value={t('about.stats.linesValue')}
            color="bg-violet-600"
          />
        </div>
      </section>

      {/* Bottom */}
      <section className="grid min-h-0 flex-[1.15] grid-cols-[1fr_0.9fr_0.95fr] gap-2">
        {/* What to Do */}
        <div className="min-h-0 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <h2 className="font-inter mb-2.5 text-[14px] font-bold leading-none tracking-[-0.02em]">
            {t('about.headings.whatToDo')}
          </h2>

          <div className="flex flex-col gap-1.5">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="flex min-h-[45px] items-center gap-2 rounded-xs bg-background px-2 py-0 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
                >
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-xs text-white ${service.className}`}
                  >
                    <Icon className="size-3.5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-inter text-[9px] font-semibold leading-none">
                      {service.title}
                    </h3>

                    <p className="mt-0.5 text-[6.5px] leading-[1.25] text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My Journey */}
        <div className="min-h-0 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <h2 className="font-inter mb-3 text-[14px] font-bold leading-none tracking-[-0.02em]">
            {t('about.headings.myJourney')}
          </h2>

          <div className="relative">
            <div className="absolute bottom-2 left-[4px] top-1 w-px bg-border" />

            <div className="flex flex-col gap-2.5">
              {journey.map((item) => (
                <div key={item.year} className="relative flex gap-2">
                  <div className="relative z-10 mt-0.5 size-2 shrink-0 rounded-full bg-primary ring-2 ring-background" />

                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold leading-none text-primary">
                      {item.year}
                    </p>

                    <p className="mt-1 text-[7px] leading-[1.25]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex min-h-0 flex-col gap-2">
          {/* Tech Arsenal */}
          <div className="rounded-sm bg-background p-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
            <h2 className="font-inter mb-2.5 text-[14px] font-bold leading-none tracking-[-0.02em]">
              {t('about.headings.techArsenal')}
            </h2>

            <div className="grid grid-cols-5 gap-1">
              {technologies.map((technology, index) => (
                <div
                  key={index}
                  className="flex size-11 items-center justify-center rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
                >
                  <Image
                    src={technology}
                    alt=""
                    width={12}
                    height={12}
                    className="size-6 object-contain"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Code */}
          <div className="min-h-0 flex-1 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
            <h2 className="font-inter mb-2.5 text-[14px] font-bold leading-none tracking-[-0.02em]">
              {t('about.headings.beyondCode')}
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {interests.map((interest) => {
                const Icon = interest.icon;

                return (
                  <div
                    key={interest.label}
                    className="flex items-center gap-1.5 rounded-xs bg-background px-2 py-1.5 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
                  >
                    <Icon className="size-3 text-primary" strokeWidth={1.8} />

                    <span className="text-[7px] font-medium">{interest.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type StatCardProps = {
  icon: typeof UserRound;
  label: string;
  value: string;
  color: string;
};

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="flex min-h-0 flex-1 items-center gap-2 rounded-sm bg-background px-3 py-2 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-xs text-white ${color}`}
      >
        <Icon className="size-4" strokeWidth={1.8} />
      </div>

      <div>
        <p className="text-[6.5px] leading-none text-muted-foreground">{label}</p>

        <p className="mt-0.5 text-[10px] font-semibold leading-none">{value}</p>
      </div>
    </div>
  );
}
