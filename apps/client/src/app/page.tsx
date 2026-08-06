export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-[#09090B] text-white">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-6 px-8 py-5">
        {/* Badge */}
        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 backdrop-blur">
          Typography Showcase
        </span>

        {/* Hero */}
        <section className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            Full Stack Developer
          </p>

          <h1
            className="max-w-5xl text-5xl leading-[0.9] md:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Crafting
            <br />
            Digital
            <span className="text-cyan-400"> Experiences.</span>
          </h1>

          <p className="max-w-2xl text-base leading-6 text-zinc-400">
            A showcase of the typography system that will power my portfolio. Clean interfaces,
            modern architecture, and thoughtful design.
          </p>
        </section>

        {/* Font Cards */}
        <section className="grid flex-1 gap-5 lg:grid-cols-3">
          {/* Inter */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-400/40 hover:bg-white/[0.05]">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
              Primary Font
            </span>

            <h2 className="mt-3 text-xl font-semibold">Inter</h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Elegant, readable, and optimized for modern interfaces. Used across navigation,
              buttons, forms, and every UI component.
            </p>
          </article>

          {/* Beni */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:border-purple-400/40 hover:bg-white/[0.05]">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-400">
              Display Font
            </span>

            <h2
              className="mt-3 text-3xl leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Beni
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Reserved for impactful moments like hero titles and section headings to create
              personality and strong visual identity.
            </p>
          </article>

          {/* Geist Mono */}
          <article className="rounded-3xl border border-white/10 bg-[#0F172A] p-5 transition duration-300 hover:border-emerald-400/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
              Developer Font
            </span>

            <pre
              className="mt-3 overflow-auto text-xs leading-6 text-zinc-300"
              style={{ fontFamily: 'var(--font-mono)' }}
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
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 p-5 backdrop-blur-xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">Philosophy</p>

          <h2 className="mt-2 text-3xl leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Beautiful interfaces begin with thoughtful typography.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Typography is more than choosing fonts—it establishes hierarchy, guides attention, and
            shapes the personality of every digital experience.
          </p>
        </section>
      </div>
    </main>
  );
}
