import { useDownload } from '@/hooks/use-download';
import { useTranslation } from '@/hooks/use-translation';
import { BriefcaseBusiness, Code2, FileText, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export function HomeCards() {
  const { t } = useTranslation();
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

          <h2 className="font-sans text-[10px] font-semibold leading-none">
            {t('homeCards.quickActions')}
          </h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <Link href="/about">{t('homeCards.aboutMe')}</Link>
          <button
            onClick={handleDownloadResume}
            className="text-left hover:text-primary transition-colors"
          >
            {t('homeCards.downloadResume')}
          </button>
          <Link href="/projects">{t('homeCards.viewProjects')}</Link>
          <Link href="/contact">{t('homeCards.contactMe')}</Link>
          <Link href="/ai-assistant">{t('homeCards.askAI')}</Link>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Sparkles className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">
            {t('homeCards.featuredProjects')}
          </h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>{t('homeCards.consultify')}</span>
          <span>{t('homeCards.portfolio')}</span>
          <span>{t('homeCards.brandIdentity')}</span>
          <span>{t('homeCards.mobileUIKit')}</span>
        </div>

        <Link href="/projects" className="mt-1.5 block text-[8px] font-semibold text-primary">
          {t('homeCards.viewAllProjects')}
        </Link>
      </div>

      {/* Skills */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
            <Code2 className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">
            {t('homeCards.skills')}
          </h2>
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
          {t('homeCards.viewAllSkills')}
        </Link>
      </div>

      {/* Current Status */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
            <BriefcaseBusiness className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">
            {t('homeCards.currentStatus')}
          </h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>{t('homeCards.availableForWork')}</span>
          <span>{t('homeCards.location')}</span>
          <span>{t('homeCards.estinStudent')}</span>
          <span>{t('homeCards.buildingConsultify')}</span>
          <span>{t('homeCards.coffeePowered')}</span>
        </div>
      </div>

      {/* Latest Activity */}
      <div className="h-full w-full min-w-[230px] rounded-xs bg-background p-2 px-4 shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]">
        <div className="mb-1.5 flex items-center gap-1.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
            <FileText className="size-3" strokeWidth={2} />
          </div>

          <h2 className="font-sans text-[10px] font-semibold leading-none">
            {t('homeCards.latestActivity')}
          </h2>
        </div>

        <div className="flex flex-col gap-1 text-[8px] leading-tight">
          <span>{t('homeCards.newProjectPublished')}</span>
          <span>{t('homeCards.portfolioUpdated')}</span>
          <span>{t('homeCards.resumeUpdated')}</span>
          <span>{t('homeCards.openForFreelance')}</span>
        </div>
      </div>
    </div>
  );
}
