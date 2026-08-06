import { ArrowRight, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex h-full max-w-7xl flex-col gap-6 px-8 py-5">
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
            A showcase of the typography system, design tokens, theme engine, and shadcn/ui
            components that will power this portfolio.
          </p>
        </section>

        {/* Showcase Cards */}
        <section className="grid flex-1 gap-5 lg:grid-cols-3">
          {/* shadcn/ui Button */}
          <article className="rounded-3xl border border-border bg-card p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
              shadcn/ui
            </span>

            <h2 className="mt-3 text-xl font-semibold">Button Component</h2>

            <p className="mt-3 text-sm leading-6 text-foreground-tertiary">
              Beautifully designed. Accessible. Fully customizable. Open source. Built to work
              seamlessly with Tailwind CSS.
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
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue
              </Button>

              <Button size="lg">
                <Download className="mr-2 h-4 w-4" />
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
              Reserved for impactful moments like hero titles and section headings to create
              personality and strong visual identity.
            </p>
          </article>

          {/* Geist Mono */}
          <article className="rounded-3xl border border-border bg-background-secondary p-5 shadow-md transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-success">
              Developer Font
            </span>

            <pre className="mt-3 overflow-auto font-mono text-xs leading-6 text-foreground-secondary">
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
      </div>
    </main>
  );
}
