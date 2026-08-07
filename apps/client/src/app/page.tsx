import { ArrowRight, Download } from 'lucide-react';

import { ApiShowcase } from '@/components/home/api-showcase';
import { ContactForm } from '@/components/forms/contact-form';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-auto bg-background text-foreground">
      {/* Floating Theme Toggle */}
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex max-w-7xl flex-col gap-8 px-6 py-6 md:px-8">
        {/* Badge */}
        <span className="w-fit rounded-full border border-border bg-surface-brand px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-brand backdrop-blur">
          Typography & Component Showcase
        </span>

        {/* Hero */}
        <section className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-brand">
            Full Stack Developer
          </p>

          <h1 className="max-w-5xl font-display text-5xl leading-[0.9] md:text-7xl">
            Crafting
            <br />
            Digital <span className="text-brand">Experiences.</span>
          </h1>

          <p className="max-w-2xl text-base leading-6 text-foreground-tertiary">
            A showcase of the typography system, design tokens, theme engine, shadcn/ui components,
            API integration, state management, and forms that will power this portfolio.
          </p>
        </section>

        {/* API Showcase */}
        <section className="rounded-3xl border border-border bg-card p-5 shadow-md">
          <div className="mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
              Axios + TanStack Query
            </span>

            <h2 className="mt-2 text-xl font-semibold">API Integration</h2>

            <p className="mt-2 text-sm leading-6 text-foreground-tertiary">
              Client-side data fetching from the portfolio backend using the configured API client
              and TanStack Query.
            </p>
          </div>

          <ApiShowcase />
        </section>

        {/* Component Showcase */}
        <section className="grid gap-5 lg:grid-cols-3">
          {/* shadcn/ui Button */}
          <article className="rounded-3xl border border-border bg-card p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
              shadcn/ui
            </span>

            <h2 className="mt-3 text-xl font-semibold">Button Component</h2>

            <p className="mt-3 text-sm leading-6 text-foreground-tertiary">
              Beautifully designed, accessible, customizable components built with Base UI and
              Tailwind CSS.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Default</Button>

              <Button variant="secondary">Secondary</Button>

              <Button variant="outline">Outline</Button>

              <Button variant="ghost">Ghost</Button>

              <Button variant="destructive">Delete</Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="sm">Small</Button>

              <Button>
                <ArrowRight className="mr-2 size-4" />
                Continue
              </Button>

              <Button size="lg">
                <Download className="mr-2 size-4" />
                Resume
              </Button>
            </div>
          </article>

          {/* Beni */}
          <article className="rounded-3xl border border-border bg-card p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple">
              Display Font
            </span>

            <h2 className="mt-3 font-display text-3xl leading-none">Beni</h2>

            <p className="mt-3 text-sm leading-6 text-foreground-tertiary">
              Reserved for impactful moments such as hero titles and section headings to create
              personality and a strong visual identity.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-background-secondary p-4">
              <p className="font-display text-4xl leading-none">Aa</p>

              <p className="mt-3 font-mono text-xs text-foreground-tertiary">var(--font-display)</p>
            </div>
          </article>

          {/* Geist Mono */}
          <article className="rounded-3xl border border-border bg-background-secondary p-5 shadow-md transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-success">
              Developer Font
            </span>

            <h2 className="mt-3 text-xl font-semibold">Geist Mono</h2>

            <pre className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card p-4 font-mono text-xs leading-6 text-foreground-secondary">
              {`const portfolio = {
  developer: "Ahmed",
  frontend: "Next.js",
  backend: "NestJS",
  database: "MongoDB",
  language: "TypeScript",
  ui: "shadcn/ui",
  status: "Building..."
};`}
            </pre>
          </article>
        </section>

        {/* Form Showcase */}
        <section className="rounded-3xl border border-border bg-card p-5 shadow-md md:p-6">
          <div className="mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple">
              React Hook Form + Zod
            </span>

            <h2 className="mt-2 text-2xl font-semibold">Contact Form</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-tertiary">
              Type-safe form validation with React Hook Form and Zod, designed to integrate with the
              portfolio API.
            </p>
          </div>

          <div className="max-w-3xl">
            <ContactForm />
          </div>
        </section>

        {/* Footer Showcase */}
        <section className="rounded-3xl border border-border bg-surface-brand p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground-disabled">
                Stack
              </p>

              <h2 className="mt-2 font-display text-3xl">Built for the portfolio.</h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-foreground-tertiary">
              Next.js, Tailwind CSS, shadcn/ui, Lucide, Motion, Axios, TanStack Query, Zustand,
              React Hook Form, and Zod working together as the foundation of the application.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
