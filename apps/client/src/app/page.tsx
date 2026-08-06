import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <main
      className="h-screen overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Floating Theme Toggle */}
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex h-full max-w-7xl flex-col gap-6 px-8 py-5">
        {/* Badge */}
        <span
          className="w-fit rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] backdrop-blur"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface-brand)',
            color: 'var(--color-brand)',
          }}
        >
          Typography Showcase
        </span>

        {/* Hero */}
        <section className="space-y-3">
          <p
            className="font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: 'var(--color-brand)' }}
          >
            Full Stack Developer
          </p>

          <h1
            className="max-w-5xl text-5xl leading-[0.9] md:text-7xl"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Crafting
            <br />
            Digital <span style={{ color: 'var(--color-brand)' }}>Experiences.</span>
          </h1>

          <p
            className="max-w-2xl text-base leading-6"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            A showcase of the typography system that will power my portfolio. Clean interfaces,
            modern architecture, and thoughtful design.
          </p>
        </section>

        {/* Cards */}
        <section className="grid flex-1 gap-5 lg:grid-cols-3">
          {/* Inter */}
          <article
            className="rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: 'var(--color-brand)' }}
            >
              Primary Font
            </span>

            <h2
              className="mt-3 text-xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Inter
            </h2>

            <p className="mt-3 text-sm leading-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Elegant, readable, and optimized for modern interfaces. Used across navigation,
              buttons, forms, and every UI component.
            </p>
          </article>

          {/* Beni */}
          <article
            className="rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: 'var(--color-purple)' }}
            >
              Display Font
            </span>

            <h2
              className="mt-3 text-3xl leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              Beni
            </h2>

            <p className="mt-3 text-sm leading-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Reserved for impactful moments like hero titles and section headings to create
              personality and strong visual identity.
            </p>
          </article>

          {/* Geist */}
          <article
            className="rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: 'var(--color-success)' }}
            >
              Developer Font
            </span>

            <pre
              className="mt-3 overflow-auto text-xs leading-6"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-secondary)',
              }}
            >
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

        {/* Philosophy */}
        <section
          className="rounded-[2rem] border p-5 backdrop-blur-xl"
          style={{
            background: 'var(--color-surface-brand)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            Philosophy
          </p>

          <h2
            className="mt-2 text-3xl leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Beautiful interfaces begin with thoughtful typography.
          </h2>

          <p
            className="mt-3 max-w-3xl text-sm leading-6"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Typography is more than choosing fonts—it establishes hierarchy, guides attention, and
            shapes the personality of every digital experience.
          </p>
        </section>
      </div>
    </main>
  );
}
