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
import { DetailsDialog, ParallaxSection } from '@/components/home/simple-portfolio-motion';
import { CONSULTIFY_DETAILS } from '@/data/projects/consultify';
import { PORTFOLIO_WORKSPACE_DETAILS } from '@/data/projects/portfolio-workspace';
import { SHOPSPHERE_DETAILS, type WebProjectDetails } from '@/data/projects/shopsphere';
import profileImage from '@/assets/images/profile/avatar.jpg';
import consultifyImage from '@/assets/images/projects/consultify/consultify.png';
import portfolioImage from '@/assets/images/projects/portfolio-workspace/portfolio-gallery/1.png';
import shopsphereImage from '@/assets/images/projects/shopsphere/storefront.jpg';
import bachelorCertificate from '@/assets/images/experience/education/certificate.png';
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

const projects: {
  number: string;
  title: string;
  category: string;
  description: string;
  image: StaticImageData;
  details: WebProjectDetails;
}[] = [
  {
    number: '01',
    title: CONSULTIFY_DETAILS.projectName,
    category: 'Full-stack · AI',
    description: CONSULTIFY_DETAILS.tagline,
    image: consultifyImage,
    details: CONSULTIFY_DETAILS,
  },
  {
    number: '02',
    title: PORTFOLIO_WORKSPACE_DETAILS.projectName,
    category: 'Full-stack · Next.js',
    description: PORTFOLIO_WORKSPACE_DETAILS.tagline,
    image: portfolioImage,
    details: PORTFOLIO_WORKSPACE_DETAILS,
  },
  {
    number: '03',
    title: SHOPSPHERE_DETAILS.projectName,
    category: 'E-commerce · AI',
    description: SHOPSPHERE_DETAILS.tagline,
    image: shopsphereImage,
    details: SHOPSPHERE_DETAILS,
  },
];

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

const education = [
  {
    period: '2025 — Present',
    title: 'Engineering Preparatory Cycle',
    institution: 'ESTIN · Bejaia, Algeria',
    detail:
      'Second-year preparatory student. Focused on mathematics, physics, and computer science fundamentals.',
    summary: 'Building strong foundations in mathematics, physics, and computer science.',
    status: 'In progress',
  },
  {
    period: '2021 — 2025',
    title: "Bachelor's Degree in Computer Science",
    institution: 'M’Hamed Bougara University · Boumerdes, Algeria',
    detail:
      'Specialization in Web Development and Computer Graphics · GPA 14.31/20 · Good Honours.',
    summary: 'Specialized in Web Development and Computer Graphics, graduating with Good Honours.',
    status: 'Completed',
    image: bachelorCertificate,
  },
];

const experience = [
  {
    period: 'Jan 2025 — Mar 2025',
    company: 'CodSoft',
    role: 'Web Development Intern · Remote',
    summary: 'Built responsive React interfaces, integrated APIs, and improved page performance.',
    detail:
      'Built responsive web pages and reusable React components, integrated REST APIs, and contributed to a maintainable user experience. Improved page load performance by 30% and implemented dark mode.',
    technologies: ['React', 'JavaScript', 'HTML/CSS'],
  },
  {
    period: 'Aug 2024 — Oct 2024',
    company: 'TechVerse Solutions',
    role: 'Frontend Developer Intern · Hybrid',
    summary: 'Modernized dashboards and built interactive data tables and visualizations.',
    detail:
      'Migrated legacy dashboards to Next.js and built interactive data tables and chart visualizations. Converted 12 core views and reduced initial bundle size by 22%.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    period: 'May 2024 — Jul 2024',
    company: 'DevBridge',
    role: 'Software Development Intern · On-site',
    summary: 'Contributed to API design, database schemas, and backend test coverage.',
    detail:
      'Worked across API design, database schemas, and testing. Raised backend test coverage from 60% to 85% and optimized database queries for faster response times.',
    technologies: ['Node.js', 'Express', 'PostgreSQL'],
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
    <div className="min-h-dvh bg-background text-foreground">
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

            <div className="relative mx-auto w-full max-w-[340px] md:max-w-[370px]">
              <div className="absolute -inset-3 rounded-[2rem] border border-primary/20 rotate-3" />
              <div className="absolute -inset-3 rounded-[2rem] border border-border/70 -rotate-3" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-xl">
                <Image
                  src={profileImage}
                  alt="Portrait of Ahmed Yassine Abbane"
                  priority
                  className="aspect-[4/5] w-full object-cover object-center"
                  sizes="(max-width: 768px) 80vw, 370px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-16 text-white">
                  <p className="text-lg font-bold uppercase leading-none sm:text-xl">
                    Code meets creativity
                  </p>
                  <p className="mt-2 text-[10px] tracking-wide text-white/75">
                    Web development · UI/UX · Visual design
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 flex size-12 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-lg">
                <Code2 className="size-5" />
              </div>
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          id="work"
          className="scroll-mt-20 border-y border-border/70 bg-background-secondary/35"
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  A few things I’ve made
                </p>
                <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">
                  Selected work
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.number}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/55 px-2 py-1 font-mono text-[9px] text-white backdrop-blur">
                      {project.number}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-sans text-base font-bold uppercase leading-tight tracking-wide">
                        {project.title}
                      </h3>
                      <DetailsDialog triggerLabel="Project details" title={project.title}>
                        <p>{project.details.coreObjective}</p>
                        <div>
                          <h3 className="font-sans mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                            Project modules
                          </h3>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {project.details.systemModules.map((module) => (
                              <li
                                key={module.id}
                                className="rounded-lg border border-border bg-background p-3"
                              >
                                <p className="text-xs font-semibold text-foreground">
                                  {module.title}
                                </p>
                                <p className="mt-1 text-xs leading-5">{module.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-sans mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                            Engineering highlights
                          </h3>
                          <ul className="list-inside list-disc space-y-1">
                            {project.details.engineeringHighlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                        <p>
                          <span className="font-semibold text-foreground">For:</span>{' '}
                          {project.details.targetAudience.join(', ')}
                        </p>
                      </DetailsDialog>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-foreground-secondary">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ParallaxSection>

        <ParallaxSection
          id="experience"
          className="scroll-mt-20 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Where I’ve learned by doing
              </p>
              <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">Experience</h2>
            </div>
          </div>
          <div className="relative ml-2 space-y-3 border-l border-border pl-6">
            {experience.map((item, index) => (
              <article
                key={item.company}
                className="relative rounded-xl border border-border bg-card p-4 sm:p-5"
              >
                <span className="absolute -left-[31px] top-5 flex size-2.5 items-center justify-center rounded-full border-2 border-background bg-primary ring-4 ring-primary/10" />
                <div className="flex flex-wrap items-start justify-between gap-2">
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
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] text-foreground-tertiary">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-xs leading-5 text-foreground-secondary">
                  {item.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-background-secondary px-2 py-1 text-[9px] text-foreground-tertiary"
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
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
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
                  The foundations
                </p>
                <h2 className="font-beni text-4xl uppercase leading-none sm:text-5xl">Education</h2>
              </div>
              <GraduationCap className="size-7 text-primary" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {education.map((item) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] text-primary">{item.period}</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-semibold text-primary">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-sans text-base font-bold uppercase leading-tight tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-foreground-secondary">
                    {item.institution}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-foreground-tertiary">{item.summary}</p>
                  <div className="mt-4">
                    <DetailsDialog triggerLabel="Education details" title={item.title}>
                      <p className="font-semibold text-foreground">{item.institution}</p>
                      <p>
                        <span className="font-semibold text-foreground">Period:</span> {item.period}
                      </p>
                      <p>{item.detail}</p>
                      <p>
                        <span className="font-semibold text-foreground">Status:</span> {item.status}
                      </p>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt="Bachelor degree certificate"
                          className="mt-2 max-h-72 w-full rounded-lg border border-border object-contain"
                          sizes="(max-width: 672px) 90vw, 600px"
                        />
                      )}
                    </DetailsDialog>
                  </div>
                  {item.image && (
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                      <div className="relative h-10 w-16 overflow-hidden rounded border border-border">
                        <Image
                          src={item.image}
                          alt="Bachelor degree certificate preview"
                          fill
                          className="object-cover"
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
                className="group flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative h-[76px] w-[104px] shrink-0 overflow-hidden rounded-md border border-border bg-background">
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
                        className="mt-2 max-h-80 w-full rounded-lg border border-border object-contain"
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
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-foreground-secondary transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-[9px] uppercase tracking-wider text-foreground-tertiary">
                  Current focus
                </p>
                <p className="mt-1 text-xs font-semibold">CONSULTIFY &amp; AI workspaces</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
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
    </div>
  );
}
