import { useDownload } from '@/hooks/use-download';
import { useTranslation } from '@/hooks/use-translation';
import { BriefcaseBusiness, Code2, FileText, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

interface HomeCardsProps {
  variant?: 'desktop' | 'tablet' | 'mobile';
}

export function HomeCards({ variant = 'desktop' }: HomeCardsProps) {
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
    <div
      className={`mt-2 grid w-fit items-start gap-1 ${
        variant === 'desktop'
          ? 'grid-cols-2'
          : variant === 'tablet'
            ? 'grid-cols-1 md:grid-cols-2 w-full'
            : 'grid-cols-1 w-full'
      }`}
    >
      {/* Quick Actions */}
      <div
        className={`h-full w-full rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] ${
          variant === 'desktop'
            ? 'min-w-[230px] p-2 px-4'
            : variant === 'tablet'
              ? 'p-2 px-3'
              : 'p-1.5 px-2.5'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 mb-1.5 ${
            variant === 'desktop' ? '' : variant === 'tablet' ? 'mb-1' : 'mb-0.5'
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-primary text-white ${
              variant === 'desktop' ? 'size-6' : variant === 'tablet' ? 'size-5' : 'size-4'
            }`}
          >
            <Zap
              className={`${
                variant === 'desktop' ? 'size-3' : variant === 'tablet' ? 'size-2.5' : 'size-2'
              }`}
              strokeWidth={2}
            />
          </div>

          <h2
            className={`font-sans font-semibold leading-none ${
              variant === 'desktop'
                ? 'text-[10px]'
                : variant === 'tablet'
                  ? 'text-[9px]'
                  : 'text-[8px]'
            }`}
          >
            {t('homeCards.quickActions')}
          </h2>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            variant === 'desktop'
              ? 'text-[8px]'
              : variant === 'tablet'
                ? 'text-[7.5px]'
                : 'text-[7px]'
          } leading-tight`}
        >
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
      <div
        className={`h-full w-full rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] ${
          variant === 'desktop'
            ? 'min-w-[230px] p-2 px-4'
            : variant === 'tablet'
              ? 'p-2 px-3'
              : 'p-1.5 px-2.5'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 mb-1.5 ${
            variant === 'desktop' ? '' : variant === 'tablet' ? 'mb-1' : 'mb-0.5'
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ${
              variant === 'desktop' ? 'size-6' : variant === 'tablet' ? 'size-5' : 'size-4'
            }`}
          >
            <Sparkles
              className={`${
                variant === 'desktop' ? 'size-3' : variant === 'tablet' ? 'size-2.5' : 'size-2'
              }`}
              strokeWidth={2}
            />
          </div>

          <h2
            className={`font-sans font-semibold leading-none ${
              variant === 'desktop'
                ? 'text-[10px]'
                : variant === 'tablet'
                  ? 'text-[9px]'
                  : 'text-[8px]'
            }`}
          >
            {t('homeCards.featuredProjects')}
          </h2>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            variant === 'desktop'
              ? 'text-[8px]'
              : variant === 'tablet'
                ? 'text-[7.5px]'
                : 'text-[7px]'
          } leading-tight`}
        >
          <span>{t('homeCards.consultify')}</span>
          <span>{t('homeCards.portfolio')}</span>
          <span>{t('homeCards.brandIdentity')}</span>
          <span>{t('homeCards.mobileUIKit')}</span>
        </div>

        <Link
          href="/projects"
          className={`block font-semibold text-primary ${
            variant === 'desktop'
              ? 'text-[8px] mt-1.5'
              : variant === 'tablet'
                ? 'text-[7.5px] mt-1'
                : 'text-[7px] mt-1'
          }`}
        >
          {t('homeCards.viewAllProjects')}
        </Link>
      </div>

      {/* Skills */}
      <div
        className={`h-full w-full rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] ${
          variant === 'desktop'
            ? 'min-w-[230px] p-2 px-4'
            : variant === 'tablet'
              ? 'p-2 px-3'
              : 'p-1.5 px-2.5'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 mb-1.5 ${
            variant === 'desktop' ? '' : variant === 'tablet' ? 'mb-1' : 'mb-0.5'
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-violet-600 text-white ${
              variant === 'desktop' ? 'size-6' : variant === 'tablet' ? 'size-5' : 'size-4'
            }`}
          >
            <Code2
              className={`${
                variant === 'desktop' ? 'size-3' : variant === 'tablet' ? 'size-2.5' : 'size-2'
              }`}
              strokeWidth={2}
            />
          </div>

          <h2
            className={`font-sans font-semibold leading-none ${
              variant === 'desktop'
                ? 'text-[10px]'
                : variant === 'tablet'
                  ? 'text-[9px]'
                  : 'text-[8px]'
            }`}
          >
            {t('homeCards.skills')}
          </h2>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            variant === 'desktop'
              ? 'text-[8px]'
              : variant === 'tablet'
                ? 'text-[7.5px]'
                : 'text-[7px]'
          } leading-tight`}
        >
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>NestJS</span>
          <span>MongoDB</span>
          <span>Figma</span>
          <span>Adobe Creative Suite</span>
        </div>

        <Link
          href="/skills"
          className={`block font-semibold text-primary ${
            variant === 'desktop'
              ? 'text-[8px] mt-1.5'
              : variant === 'tablet'
                ? 'text-[7.5px] mt-1'
                : 'text-[7px] mt-1'
          }`}
        >
          {t('homeCards.viewAllSkills')}
        </Link>
      </div>

      {/* Current Status */}
      <div
        className={`h-full w-full rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] ${
          variant === 'desktop'
            ? 'min-w-[230px] p-2 px-4'
            : variant === 'tablet'
              ? 'p-2 px-3'
              : 'p-1.5 px-2.5'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 mb-1.5 ${
            variant === 'desktop' ? '' : variant === 'tablet' ? 'mb-1' : 'mb-0.5'
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-orange-500 text-white ${
              variant === 'desktop' ? 'size-6' : variant === 'tablet' ? 'size-5' : 'size-4'
            }`}
          >
            <BriefcaseBusiness
              className={`${
                variant === 'desktop' ? 'size-3' : variant === 'tablet' ? 'size-2.5' : 'size-2'
              }`}
              strokeWidth={2}
            />
          </div>

          <h2
            className={`font-sans font-semibold leading-none ${
              variant === 'desktop'
                ? 'text-[10px]'
                : variant === 'tablet'
                  ? 'text-[9px]'
                  : 'text-[8px]'
            }`}
          >
            {t('homeCards.currentStatus')}
          </h2>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            variant === 'desktop'
              ? 'text-[8px]'
              : variant === 'tablet'
                ? 'text-[7.5px]'
                : 'text-[7px]'
          } leading-tight`}
        >
          <span>{t('homeCards.availableForWork')}</span>
          <span>{t('homeCards.location')}</span>
          <span>{t('homeCards.estinStudent')}</span>
          <span>{t('homeCards.buildingConsultify')}</span>
          <span>{t('homeCards.coffeePowered')}</span>
        </div>
      </div>

      {/* Latest Activity */}
      <div
        className={`h-full w-full rounded-xs bg-background shadow-gray-300 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)] ${
          variant === 'desktop'
            ? 'min-w-[230px] p-2 px-4'
            : variant === 'tablet'
              ? 'p-2 px-3'
              : 'p-1.5 px-2.5'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 mb-1.5 ${
            variant === 'desktop' ? '' : variant === 'tablet' ? 'mb-1' : 'mb-0.5'
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-blue-700 text-white ${
              variant === 'desktop' ? 'size-6' : variant === 'tablet' ? 'size-5' : 'size-4'
            }`}
          >
            <FileText
              className={`${
                variant === 'desktop' ? 'size-3' : variant === 'tablet' ? 'size-2.5' : 'size-2'
              }`}
              strokeWidth={2}
            />
          </div>

          <h2
            className={`font-sans font-semibold leading-none ${
              variant === 'desktop'
                ? 'text-[10px]'
                : variant === 'tablet'
                  ? 'text-[9px]'
                  : 'text-[8px]'
            }`}
          >
            {t('homeCards.latestActivity')}
          </h2>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            variant === 'desktop'
              ? 'text-[8px]'
              : variant === 'tablet'
                ? 'text-[7.5px]'
                : 'text-[7px]'
          } leading-tight`}
        >
          <span>{t('homeCards.newProjectPublished')}</span>
          <span>{t('homeCards.portfolioUpdated')}</span>
          <span>{t('homeCards.resumeUpdated')}</span>
          <span>{t('homeCards.openForFreelance')}</span>
        </div>
      </div>
    </div>
  );
}
