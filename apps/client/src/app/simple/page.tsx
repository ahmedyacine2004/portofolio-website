import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import {
  ArrowDown,
  Award,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  MapPin,
} from 'lucide-react';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { SimpleContactForm } from '@/components/home/simple-contact-form';
import { SimpleBackToTop } from '@/components/home/simple-back-to-top';
import { SimpleAvatarCard } from '@/components/home/simple-avatar-card';
import { SimpleSelectedWork } from '@/components/home/simple-selected-work';
import { DetailsDialog, ParallaxSection } from '@/components/home/simple-portfolio-motion';
import bachelorCertificate from '@/assets/images/experience/education/certificate.png';
import somiphosCertificate from '@/assets/images/experience/internships/somiphos.jpg';
import algerieTelecomCertificate from '@/assets/images/experience/internships/algerie-telecom.jpg';
import algerieTelecomLogo from '@/assets/images/experience/internships/Logo_Algérie_Télécom.png';
import codsoftLogo from '@/assets/images/experience/internships/code-soft.png';
import devBridgeLogo from '@/assets/images/experience/internships/dev-bridge.png';
import somiphosLogo from '@/assets/images/experience/internships/somiphos-logo.png';
import techVerseLogo from '@/assets/images/experience/internships/Tech-verse.png';
import awsCertificate from '@/assets/images/certificates/aws-certificate.png';
import googleCertificate from '@/assets/images/certificates/google-it-certificate.png';
import metaCertificate from '@/assets/images/certificates/meta-certificate.png';
import mongoCertificate from '@/assets/images/certificates/mongodb-certificate.png';
import oracleCertificate from '@/assets/images/certificates/oracle-certificate.png';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Ahmed Yassine Abbane — full-stack web developer and graphic designer building digital experiences through code and design.',
};

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'NestJS',
  'MongoDB',
  'PostgreSQL',
  'Figma',
  'Docker',
];

const education: {
  period: string;
  title: string;
  institution: string;
  detail: string;
  summary: string;
  status: string;
  focus: string;
  highlights: string[];
  skills: string[];
  image?: StaticImageData;
}[] = [
  {
    period: '2025 — Present',
    title: 'Engineering Preparatory Cycle · Year 2',
    institution: 'ESTIN · Bejaia, Algeria',
    detail:
      "Currently in the second year of ESTIN's preparatory cycle, studying advanced mathematics, physics, and computer science as a foundation for the engineering cycle.",
    summary:
      'An intensive preparatory curriculum building theoretical foundations for engineering studies.',
    status: 'In progress',
    focus: 'Advanced mathematics · Physics · Computer science fundamentals',
    highlights: [
      'Currently completing the second year of the preparatory cycle.',
      'Building theoretical foundations for future engineering specialization.',
    ],
    skills: ['Mathematics', 'Physics', 'Algorithms', 'CS fundamentals'],
  },
  {
    period: '2021 — 2025 · Graduated 2025',
    title: "Bachelor's Degree in Computer Science",
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      "Completed a four-year Bachelor's degree in Computer Science, specializing in Web Development and Computer Graphics. Graduated with a GPA of 14.31/20 and Good Honours.",
    summary:
      'Four years of computer science study, from core theory through a full-stack engineering specialization.',
    status: 'Completed',
    focus: 'Computer Science · Web Development · Computer Graphics',
    highlights: [
      'Graduated with a GPA of 14.31/20 and Good Honours.',
      'Completed practical projects across web development and computer graphics.',
    ],
    skills: ['Software engineering', 'Web development', 'Computer graphics', 'System design'],
    image: bachelorCertificate,
  },
  {
    period: 'Sep 2024 — Jun 2025',
    title: 'Full-Stack Engineering Specialization · Year 4',
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      'Focused on end-to-end application development with React, Next.js, Node.js, NestJS, and databases, applying the coursework to complete projects and internship work.',
    summary:
      'Applied modern frontend and backend technologies to complete applications and practical work.',
    status: 'Completed',
    focus: 'React · Next.js · NestJS · TypeScript',
    highlights: [
      'Built and shipped complete web applications end to end.',
      'Applied REST APIs, databases, and clean architecture in practical projects.',
    ],
    skills: ['React', 'Next.js', 'NestJS', 'TypeScript', 'MongoDB', 'PostgreSQL'],
  },
  {
    period: 'Sep 2023 — Jun 2024',
    title: 'Software Engineering Major · Year 3',
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      'Studied design patterns, software architecture, advanced algorithms, and formal methods, shifting focus toward designing scalable, maintainable systems.',
    summary:
      'Moved from programming fundamentals toward architecture, design, and maintainable software.',
    status: 'Completed',
    focus: 'Software architecture · Design patterns · Advanced algorithms',
    highlights: [
      'Studied classical design patterns and UML modeling.',
      'Applied agile principles in a full team software project.',
    ],
    skills: ['Java', 'C++', 'Python', 'UML', 'Algorithms', 'Agile'],
  },
  {
    period: 'Sep 2022 — Jun 2023',
    title: 'Computer Science Core · Year 2',
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      'Deepened computer science theory through operating systems, computer networks, database systems, and advanced C programming.',
    summary:
      'Explored how computer systems work, from processes and memory to networks and databases.',
    status: 'Completed',
    focus: 'Operating systems · Networks · Databases',
    highlights: [
      'Studied processes, threads, memory management, and scheduling.',
      'Learned TCP/IP, network protocols, relational databases, and SQL.',
    ],
    skills: ['C', 'C++', 'SQL', 'TCP/IP', 'Operating systems', 'PostgreSQL'],
  },
  {
    period: 'Sep 2021 — Jun 2022',
    title: 'Computer Science Foundations · Year 1',
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      'Started the Computer Science degree with programming in C, discrete mathematics, logic, and computer architecture.',
    summary:
      'Built the foundational programming, mathematical, and computer architecture knowledge for the degree.',
    status: 'Completed',
    focus: 'Programming in C · Discrete mathematics · Computer architecture',
    highlights: [
      'Learned programming fundamentals including loops, functions, pointers, and arrays.',
      'Built a foundation in logic, discrete mathematics, and computer architecture.',
    ],
    skills: ['C programming', 'Discrete mathematics', 'Logic', 'Algorithms'],
  },
];

const experience: {
  period: string;
  company: string;
  logo: StaticImageData;
  role: string;
  summary: string;
  detail: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  certificate?: StaticImageData;
  certificateAlt?: string;
}[] = [
  {
    period: 'Jun 2025 — Jul 2025',
    company: 'SOMIPHOS',
    logo: somiphosLogo,
    certificate: somiphosCertificate,
    certificateAlt: 'SOMIPHOS internship certificate',
    role: 'Integration Intern · Algeria',
    summary:
      'Explored enterprise IT systems and data workflows within a large-scale mining and phosphate operation.',
    detail:
      'An integration internship focused on understanding enterprise IT in an industrial environment, including internal systems, technical processes, and the infrastructure that supports mining operations.',
    responsibilities: [
      'Observed enterprise IT infrastructure in a mining environment.',
      'Analyzed internal systems and data management workflows.',
      'Documented technical processes and learned about network topology and security.',
    ],
    achievements: [
      'Developed a clearer understanding of industrial IT operations.',
      'Gained practical exposure to enterprise systems and technical collaboration.',
    ],
    technologies: ['System analysis', 'Technical documentation', 'IT infrastructure'],
  },
  {
    period: 'Jan 2025 — Mar 2025',
    company: 'CodSoft',
    logo: codsoftLogo,
    role: 'Web Development Intern · Remote',
    summary: 'Built responsive React interfaces, integrated APIs, and improved page performance.',
    detail:
      'Built responsive web pages and reusable React components, integrated REST APIs, and contributed to a maintainable user experience. Improved page load performance by 30% and implemented dark mode.',
    responsibilities: [
      'Developed and maintained responsive pages with HTML, CSS, and JavaScript.',
      'Built reusable React components and integrated REST APIs.',
      'Worked with design requirements to deliver consistent UI/UX.',
    ],
    achievements: ['Improved page load performance by 30%.', 'Implemented a dark mode feature.'],
    technologies: ['React', 'JavaScript', 'HTML/CSS'],
  },
  {
    period: 'Aug 2024 — Oct 2024',
    company: 'TechVerse Solutions',
    logo: techVerseLogo,
    role: 'Frontend Developer Intern · Hybrid',
    summary: 'Modernized dashboards and built interactive data tables and visualizations.',
    detail:
      'Migrated legacy dashboards to Next.js and built interactive data tables and chart visualizations. Converted 12 core views and reduced initial bundle size by 22%.',
    responsibilities: [
      'Migrated dashboard pages to the Next.js App Router.',
      'Created interactive data tables and chart visualizations.',
      'Improved cross-browser behavior and mobile responsiveness.',
    ],
    achievements: [
      'Converted 12 core dashboard views.',
      'Reduced initial bundle size by 22% with dynamic imports.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    period: 'May 2024 — Jul 2024',
    company: 'DevBridge',
    logo: devBridgeLogo,
    role: 'Software Development Intern · On-site',
    summary: 'Contributed to API design, database schemas, and backend test coverage.',
    detail:
      'Worked across API design, database schemas, and testing. Raised backend test coverage from 60% to 85% and optimized database queries for faster response times.',
    responsibilities: [
      'Designed and documented REST APIs for application features.',
      'Wrote unit and integration tests for core endpoints.',
      'Worked with relational database migrations and query performance.',
    ],
    achievements: [
      'Raised backend test coverage from 60% to 85%.',
      'Optimized database queries for faster response times.',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    period: 'Jul 2024',
    company: 'Algérie Télécom',
    logo: algerieTelecomLogo,
    certificate: algerieTelecomCertificate,
    certificateAlt: 'Algérie Télécom internship certificate',
    role: 'Early-Level Intern · Algeria',
    summary:
      'Gained an introduction to telecommunications infrastructure and the systems behind national internet services.',
    detail:
      'An early-level internship introducing telecommunications operations, network infrastructure, and the technical processes that support internet and data services.',
    responsibilities: [
      'Observed operations within a national telecommunications infrastructure.',
      'Learned about fiber-optic and copper network maintenance procedures.',
      'Attended technical briefings on ADSL and fiber internet services.',
    ],
    achievements: [
      'Built foundational knowledge of telecommunications networks and ISP operations.',
      'Gained a first professional perspective on technical work in a structured organization.',
    ],
    technologies: ['Network fundamentals', 'Technical observation', 'Documentation'],
  },
];

const certifications: {
  provider: string;
  title: string;
  issued: string;
  image: StaticImageData;
}[] = [
  {
    provider: 'Amazon Web Services',
    title: 'AWS Certified Developer — Associate',
    issued: 'Issued May 15, 2024 · Expires May 15, 2027',
    image: awsCertificate,
  },
  {
    provider: 'Oracle',
    title: 'Oracle Certified Professional, Java SE 17 Developer',
    issued: 'Issued Feb 2024 · Expires Feb 2027',
    image: oracleCertificate,
  },
  {
    provider: 'MongoDB University',
    title: 'MongoDB Certified Developer Associate',
    issued: 'Issued Dec 2023 · Expires Dec 2026',
    image: mongoCertificate,
  },
  {
    provider: 'Meta',
    title: 'Meta Front-End Developer Professional Certificate',
    issued: 'Issued Oct 2023',
    image: metaCertificate,
  },
  {
    provider: 'Google',
    title: 'Google IT Automation with Python Professional Certificate',
    issued: 'Issued Aug 2023',
    image: googleCertificate,
  },
];

export default function SimplePortfolioPage() {
  return (
    <div id="top" className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/simple"
            aria-label="Ahmed Yassine Abbane — portfolio"
            className="flex items-center gap-2.5"
          >
            <Image
              src="/branding/logo.png"
              alt="Ahmed Yassine Abbane logo"
              width={34}
              height={24}
              priority
              className="h-6 w-auto object-contain"
            />
            <span className="hidden text-xs font-semibold tracking-wide sm:inline">
              AHMED YASSINE ABBANE
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#work"
            >
              Work
            </a>
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#about"
            >
              About
            </a>
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#experience"
            >
              Experience
            </a>
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#education"
            >
              Education
            </a>
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#certifications"
            >
              Certificates
            </a>
            <a
              className="text-sm text-foreground-secondary transition-colors hover:text-primary"
              href="#contact"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/studio"
              className="rounded-full border border-border px-3 py-2 text-[11px] font-semibold text-foreground-secondary transition-colors hover:border-primary hover:text-primary sm:px-4 sm:text-xs"
            >
              <span className="sm:hidden">Interactive</span>
              <span className="hidden sm:inline">Interactive portfolio</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <ParallaxSection className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-8 -z-10 size-[28rem] rounded-full bg-primary/10 blur-[110px]"
          />
          <div className="mx-auto grid min-h-[550px] max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:min-h-[620px]">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                <span className="size-1.5 rounded-full bg-success" />
                Full Stack Web Developer &amp; Graphic Designer
              </p>
              <h1 className="font-beni text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.82] tracking-tight">
                Ahmed Yassine
                <span className="block text-primary">Abbane</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
                Building digital experiences through code &amp; design. I enjoy turning ideas into
                polished products, from scalable web applications to intuitive interfaces and
                distinctive visual identities.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Explore my work <ArrowDown className="size-3.5" />
                </a>
                <a
                  href="/documents/estin.pdf"
                  download="Ahmed-Yassine-Abbane-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Resume <Download className="size-3.5" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-4 text-[11px] text-foreground-tertiary sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  Tebessa, Algeria
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness className="size-3.5 text-primary" />
                  ESTIN student
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-success" />
                  Available for work
                </span>
              </div>
            </div>

            <SimpleAvatarCard />
          </div>
        </ParallaxSection>

        <ParallaxSection>
          <SimpleSelectedWork />
        </ParallaxSection>

        <ParallaxSection
          id="experience"
          className="scroll-mt-20 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Five internships · software development and industrial IT
              </p>
              <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">Experience</h2>
            </div>
          </div>
          <div className="relative ml-2 space-y-3 border-l border-border pl-6">
            {experience.map((item, index) => (
              <article
                key={item.company}
                className="relative rounded-[8px] border border-border bg-card p-4 sm:p-5"
              >
                <span className="absolute -left-[31px] top-5 flex size-2.5 items-center justify-center rounded-full border-2 border-background bg-primary ring-4 ring-primary/10" />
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-white p-1.5 dark:bg-white">
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        fill
                        sizes="44px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">
                        {item.period}
                      </p>
                      <h3 className="mt-1 font-sans text-base font-bold uppercase leading-tight tracking-wide">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-foreground-secondary">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-[8px] border border-border px-2.5 py-1 font-mono text-[9px] text-foreground-tertiary">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-xs leading-5 text-foreground-secondary">
                  {item.summary}
                </p>
                <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-sans text-[9px] font-semibold uppercase tracking-wider text-foreground-tertiary">
                      Contributions
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {item.responsibilities.map((responsibility) => (
                        <li
                          key={responsibility}
                          className="flex gap-2 text-[11px] leading-5 text-foreground-secondary"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/70" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-sans text-[9px] font-semibold uppercase tracking-wider text-foreground-tertiary">
                      Outcomes
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex gap-2 text-[11px] leading-5 text-foreground-secondary"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-success" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-[8px] bg-background-secondary px-2 py-1 text-[9px] text-foreground-tertiary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-border pt-3">
                  <DetailsDialog
                    triggerLabel="Role details"
                    title={`${item.company} · ${item.role}`}
                  >
                    <p>{item.detail}</p>
                    <p>
                      <span className="font-semibold text-foreground">Period:</span> {item.period}
                    </p>
                    <div>
                      <h3 className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Responsibilities
                      </h3>
                      <ul className="list-inside list-disc space-y-1">
                        {item.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Achievements
                      </h3>
                      <ul className="list-inside list-disc space-y-1">
                        {item.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-[8px] border border-border bg-background px-3 py-1 text-xs"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    {item.certificate && (
                      <figure className="max-w-sm">
                        <Image
                          src={item.certificate}
                          alt={item.certificateAlt ?? `${item.company} internship certificate`}
                          className="max-h-96 w-full rounded-[8px] border border-border bg-background object-contain"
                          sizes="(max-width: 672px) 90vw, 384px"
                        />
                        <figcaption className="mt-2 font-sans text-[10px] text-foreground-tertiary">
                          Internship certificate
                        </figcaption>
                      </figure>
                    )}
                  </DetailsDialog>
                </div>
              </article>
            ))}
          </div>
        </ParallaxSection>

        <ParallaxSection
          id="education"
          className="scroll-mt-20 border-y border-border/70 bg-background-secondary/35"
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Six milestones · from computer science foundations to engineering studies
                </p>
                <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">Education</h2>
              </div>
              <GraduationCap className="size-7 text-primary" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {education.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[8px] border border-border bg-card p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] text-primary">{item.period}</span>
                    <span className="rounded-[8px] bg-primary/10 px-2.5 py-1 text-[9px] font-semibold text-primary">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-sans text-base font-bold uppercase leading-tight tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-foreground-secondary">
                    {item.institution}
                  </p>
                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-foreground-tertiary">
                    {item.summary}
                  </p>
                  <div className="mt-4">
                    <DetailsDialog triggerLabel="Education details" title={item.title}>
                      <p className="font-semibold text-foreground">{item.institution}</p>
                      <p>
                        <span className="font-semibold text-foreground">Period:</span> {item.period}
                      </p>
                      <p>{item.detail}</p>
                      <section>
                        <h3 className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Academic focus
                        </h3>
                        <p>{item.focus}</p>
                      </section>
                      <section>
                        <h3 className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Highlights
                        </h3>
                        <ul className="list-inside list-disc space-y-1">
                          {item.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h3 className="font-sans mb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Skills developed
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-[8px] border border-border bg-background px-3 py-1 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                      <p>
                        <span className="font-semibold text-foreground">Status:</span> {item.status}
                      </p>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt="Bachelor degree certificate"
                          className="mt-2 max-h-72 w-full rounded-[8px] border border-border object-contain"
                          sizes="(max-width: 672px) 90vw, 600px"
                        />
                      )}
                    </DetailsDialog>
                  </div>
                  {item.image && (
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                      <div className="relative h-10 w-16 overflow-hidden rounded-[2px] border border-border bg-white p-0.5">
                        <Image
                          src={item.image}
                          alt="Bachelor degree certificate preview"
                          fill
                          className="object-contain p-0.5"
                          sizes="64px"
                        />
                      </div>
                      <span className="text-[10px] text-foreground-tertiary">
                        Degree certificate
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          id="certifications"
          className="scroll-mt-20 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Learning, validated
              </p>
              <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">
                Certifications
              </h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certificate) => (
              <article
                key={certificate.title}
                className="group flex gap-3 rounded-[8px] border border-border bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative h-[76px] w-[104px] shrink-0 overflow-hidden rounded-[8px] border border-border bg-background">
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="104px"
                  />
                </div>
                <div className="min-w-0 self-center">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-primary">
                    {certificate.provider}
                  </p>
                  <h3 className="mt-1 font-sans text-xs font-semibold leading-4">
                    {certificate.title}
                  </h3>
                  <p className="mt-1.5 text-[9px] text-foreground-tertiary">{certificate.issued}</p>
                  <div className="mt-2">
                    <DetailsDialog triggerLabel="View certificate" title={certificate.title}>
                      <p className="font-semibold text-foreground">{certificate.provider}</p>
                      <p>{certificate.issued}</p>
                      <Image
                        src={certificate.image}
                        alt={`${certificate.title} certificate`}
                        className="mt-2 max-h-80 w-full rounded-[8px] border border-border object-contain"
                        sizes="(max-width: 672px) 90vw, 600px"
                      />
                    </DetailsDialog>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-foreground-tertiary">
            <Award className="size-3.5 text-primary" />
            Credentials and issue dates are shown as listed in the portfolio certification records.
          </p>
        </ParallaxSection>

        <ParallaxSection
          id="about"
          className="scroll-mt-20 mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2 md:gap-14"
        >
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              A little about me
            </p>
            <h2 className="max-w-lg font-beni text-4xl uppercase leading-[0.9] sm:text-5xl">
              A jack of all trades, with a love for building.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-foreground-secondary">
              I’m a full-stack web developer and graphic designer from Tebessa, Algeria, currently
              continuing my engineering studies at ESTIN. My computer science background and
              hands-on internships have taken me from responsive React interfaces to API design,
              database work, and performance improvements.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-secondary">
              I enjoy the complete process of making a product: understanding the problem, shaping a
              clear interface, and building the experience behind it. That mix of engineering and
              visual design is what draws me to full-stack products, thoughtful UI/UX, and brand
              identities that feel coherent from the first interaction to the last detail.
            </p>
            <div className="mt-5">
              <DetailsDialog triggerLabel="More about my approach" title="How I like to build">
                <p>
                  I bring design and implementation together rather than treating them as separate
                  steps. I start by making the structure and purpose clear, then refine the visual
                  language and build reusable interfaces around it.
                </p>
                <p>
                  My experience spans frontend development with React and Next.js, backend work with
                  Node.js and NestJS, and data layers including MongoDB and PostgreSQL. I also use
                  Figma to explore and communicate interface ideas before they become code.
                </p>
                <p>
                  I’m currently studying at ESTIN and continuing to build projects that connect
                  software engineering with practical, considered design.
                </p>
              </DetailsDialog>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="size-4 text-primary" />
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em]">
                Tech I work with
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-[8px] border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground-secondary transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[8px] border border-border bg-card p-3">
                <p className="text-[9px] uppercase tracking-wider text-foreground-tertiary">
                  Current focus
                </p>
                <p className="mt-1 text-xs font-semibold">CONSULTIFY &amp; AI workspaces</p>
              </div>
              <div className="rounded-[8px] border border-border bg-card p-3">
                <p className="text-[9px] uppercase tracking-wider text-foreground-tertiary">
                  Currently
                </p>
                <p className="mt-1 text-xs font-semibold">Engineering student at ESTIN</p>
              </div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection>
          <SimpleContactForm />
        </ParallaxSection>
      </main>

      <footer className="border-t border-border/70 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl justify-end">
          <Link
            href="/studio"
            className="text-xs font-medium text-foreground-secondary transition-colors hover:text-primary"
          >
            Explore the interactive portfolio
          </Link>
        </div>
      </footer>
      <SimpleBackToTop />
    </div>
  );
}
