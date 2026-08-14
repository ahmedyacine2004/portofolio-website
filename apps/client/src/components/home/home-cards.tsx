import { useDownload } from '@/hooks/use-download';
import { BriefcaseBusiness, Code2, FileText, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export function HomeCards() {
  const { download } = useDownload();

  const handleDownloadResume = () => {
    download({
      fileName: 'Ahmed-Yassine-Abbane-Resume.pdf',
      url: '/documents/estin.pdf',
      fileType: 'pdf',
      onError: (error) => {
        console.error('Resume download failed:', error);
      },
    });
  };

  return (
    <div className="mt-2 grid w-fit grid-cols-2 items-start gap-1">
      {/* Quick Actions */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Zap className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">Quick Actions</h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <Link href="/about">About Me</Link>
          <button
            onClick={handleDownloadResume}
            className="text-left hover:text-primary transition-colors"
          >
            Download Resume
          </button>
          <Link href="/projects">View Projects</Link>
          <Link href="/contact">Contact Me</Link>
          <Link href="/ai-assistant">Ask AI Assistant</Link>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Sparkles className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">Featured Projects</h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>CONSULTIFY</span>
          <span>Portfolio Website</span>
          <span>Brand Identity</span>
          <span>Mobile UI Kit</span>
        </div>

        <Link href="/projects" className="mt-1.5 block text-[8px] font-semibold text-primary">
          View All Projects
        </Link>
      </div>

      {/* Skills */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
            <Code2 className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">Skills</h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>NestJS</span>
          <span>MongoDB</span>
          <span>Figma</span>
          <span>Adobe Creative Suite</span>
        </div>

        <Link href="/skills" className="mt-1.5 block text-[8px] font-semibold text-primary">
          View All Skills
        </Link>
      </div>

      {/* Current Status */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
            <BriefcaseBusiness className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">Current Status</h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>Available for Work</span>
          <span>Tebessa, Tebessa, Algeria</span>
          <span>ESTIN Student</span>
          <span>Building CONSULTIFY</span>
          <span>Coffee Powered</span>
        </div>
      </div>

      {/* Latest Activity */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
            <FileText className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">Latest Activity</h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>New Project Published</span>
          <span>Portfolio Updated</span>
          <span>Resume Updated</span>
          <span>Open for Freelance Opportunities</span>
        </div>
      </div>
    </div>
  );
}
