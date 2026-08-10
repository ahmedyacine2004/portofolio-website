'use client';

import { AboutTabBar } from '@/components/about/about-tab-bar';
import avatar from '@/assets/images/avatar.jpg';
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

const journey = [
  {
    year: '2022',
    text: 'Just Started My coding Journey',
  },
  {
    year: '2023',
    text: 'Built my first full stack application',
  },
  {
    year: '2024',
    text: 'Joined Internships and real-world projects',
  },
  {
    year: '2025',
    text: 'Founded CONSULTIFY and building projects',
  },
  {
    year: '2026+',
    text: 'Continuing To learn build an impact',
  },
];

const services = [
  {
    title: 'Web development',
    description: 'Building responsive and performant web applications',
    icon: UserRound,
    className: 'bg-sky-500',
  },
  {
    title: 'UI/UX design',
    description: 'Designing intuitive interfaces and seamless user experiences',
    icon: Palette,
    className: 'bg-violet-600',
  },
  {
    title: 'Problem Solving',
    description: 'Turning ideas into real solutions with clean and efficient code',
    icon: Puzzle,
    className: 'bg-emerald-500',
  },
  {
    title: 'Continuous Learning',
    description: 'Always exploring new technologies and improving my skills',
    icon: Play,
    className: 'bg-orange-500',
  },
];

const interests = [
  { label: 'UI/UX design', icon: Palette },
  { label: 'Graphic Design', icon: PenTool },
  { label: 'Photography', icon: Camera },
  { label: 'Gaming', icon: Gamepad2 },
  { label: 'Reading', icon: BookOpen },
  { label: 'Tech Enthusiast', icon: Laptop },
];

export default function AboutPage() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-1 p-2">
      <AboutTabBar />
      {/* Top */}
      <section className="grid min-h-0 flex-[1.15] grid-cols-[1.2fr_0.9fr_0.9fr] gap-2">
        {/* Introduction */}
        <div className="flex min-h-0 flex-col justify-between rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <div>
            <p className="mb-1.5 text-[8px] font-semibold text-primary">Hey there !</p>

            <h1 className="text-[60px] font-bold leading-[0.7]">I&apos;m Ahmed Yassine Abbane</h1>

            <p className="mt-0.5 text-[9px] font-semibold leading-tight">
              Or, as I like to put it, a Jack of All Trades
            </p>

            <p className="mt-1 max-w-[330px] text-[7.5px] leading-[1.45] text-muted-foreground">
              From architecting scalable web applications and crafting intuitive user interfaces to
              designing compelling brand identities, I enjoy turning ideas into polished digital
              experiences. I bridge development and design, combining technical precision with
              creativity to build products that are not only functional, but memorable.
            </p>

            <p className="mt-1 max-w-[330px] text-[7.5px] leading-[1.45] text-muted-foreground">
              Welcome to my workspace. Feel free to explore the repository and discover the
              projects, technologies, and experiences that define my journey.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-2 flex h-7 items-center justify-center rounded-xs bg-primary text-[8px] font-semibold text-primary-foreground"
          >
            Let&apos;s Connect
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
          <StatCard icon={UserRound} label="Experience" value="2+ Years" color="bg-sky-500" />

          <StatCard
            icon={BriefcaseBusiness}
            label="Projects Completed"
            value="15+"
            color="bg-violet-600"
          />

          <StatCard icon={BookOpen} label="Experience" value="2+ Years" color="bg-sky-500" />

          <StatCard icon={Code2} label="Lines of code" value="50k+" color="bg-violet-600" />
        </div>
      </section>

      {/* Bottom */}
      <section className="grid min-h-0 flex-[1.15] grid-cols-[1fr_0.9fr_0.95fr] gap-2">
        {/* What to Do */}
        <div className="min-h-0 rounded-sm bg-background p-3 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
          <h2 className="font-inter mb-2.5 text-[14px] font-bold leading-none tracking-[-0.02em]">
            What to Do
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
            My journey
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
              Tech arsenal
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
              Beyond Code
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
