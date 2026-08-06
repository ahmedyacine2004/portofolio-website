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
          Typography Showcase
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
            A showcase of the typography system that will power my portfolio. Clean interfaces,
            modern architecture, and thoughtful design.
          </p>
        </section>

        {/* Font Cards */}
        <section className="grid flex-1 gap-5 lg:grid-cols-3">
          {/* Inter */}
          <article className="rounded-3xl border border-border bg-card p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
              Primary Font
            </span>

            <h2 className="mt-3 text-xl font-semibold">Inter</h2>

            <p className="mt-3 text-sm leading-6 text-foreground-tertiary">
              Elegant, readable, and optimized for modern interfaces. Used across navigation,
              buttons, forms, and every UI component.
            </p>
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
  status: "Building..."
};`}
            </pre>
          </article>
        </section>
      </div>
    </main>
  );
}
