import { KeyboardScene } from '@/components/3d/KeyboardScene';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col gap-4 p-6">
      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/50 shadow-sm">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold text-foreground">Welcome home</h1>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Welcome to the portfolio home page. Use the sidebar to navigate through sections, view
              projects, and explore services.
            </p>
          </div>

          <div className="md:w-[58%]">
            <KeyboardScene />
          </div>
        </div>
      </div>
    </div>
  );
}
