'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Cpu,
  Globe,
  Info,
  Monitor,
  MonitorSmartphone,
  MousePointer2,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from '@/hooks/use-translation';
import { useVisitorInfoStore } from '@/stores/visitor-info.store';

type IPData = {
  ip?: string;
  city?: string;
  country_name?: string;
  timezone?: string;
};

type VisitorInfo = {
  ip: string;
  location: string;
  deviceType: string;
  deviceName: string;
  os: string;
  browser: string;
  screen: string;
  language: string;
  timezone: string;
};

const defaultVisitorInfo: VisitorInfo = {
  ip: 'Unavailable',
  location: 'Unavailable',
  deviceType: 'Unavailable',
  deviceName: 'Unavailable',
  os: 'Unavailable',
  browser: 'Unavailable',
  screen: 'Unavailable',
  language: 'Unavailable',
  timezone: 'Unavailable',
};

function detectBrowser(): string {
  if (typeof navigator === 'undefined') return 'Unavailable';

  const userAgent = navigator.userAgent;

  if (/Edg|EdgA|Edge/i.test(userAgent)) return 'Microsoft Edge';
  if (/OPR|Opera/i.test(userAgent)) return 'Opera';
  if (/Chrome/i.test(userAgent)) return 'Chrome';
  if (/Firefox/i.test(userAgent)) return 'Firefox';
  if (/Safari/i.test(userAgent)) return 'Safari';

  return 'Unknown browser';
}

function getDeviceName(): string {
  if (typeof navigator === 'undefined') return 'Unavailable';

  const navWithUserAgentData = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };

  return navWithUserAgentData.userAgentData?.platform ?? navigator.platform ?? 'Unavailable';
}

function detectOS(): string {
  if (typeof navigator === 'undefined') return 'Unavailable';

  const userAgent = navigator.userAgent;

  if (/Windows/i.test(userAgent)) return 'Windows';
  if (/Mac OS/i.test(userAgent)) return 'macOS';
  if (/Android/i.test(userAgent)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
  if (/Linux/i.test(userAgent)) return 'Linux';

  return 'Unknown OS';
}

function detectDeviceType(): string {
  if (typeof navigator === 'undefined') return 'Desktop';

  const userAgent = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    if (/Tablet|iPad/i.test(userAgent)) return 'Tablet';
    return 'Mobile';
  }

  return 'Desktop';
}

function formatScreen(): string {
  if (typeof window === 'undefined') return 'Unavailable';

  const width = window.screen?.width ?? 0;
  const height = window.screen?.height ?? 0;

  if (!width || !height) return 'Unavailable';

  return `${width} × ${height}`;
}

export function VisitorInfoPanel() {
  const { t } = useTranslation();
  const isOpen = useVisitorInfoStore((s) => s.isOpen);
  const close = useVisitorInfoStore((s) => s.close);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>(defaultVisitorInfo);

  useEffect(() => {
    if (!isOpen) return;

    const loadVisitorInfo = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch visitor data');

        const data = (await response.json()) as IPData;

        setVisitorInfo({
          ip: data.ip || 'Unavailable',
          location:
            data.city && data.country_name
              ? `${data.city}, ${data.country_name}`
              : data.country_name || 'Unavailable',
          deviceType: detectDeviceType(),
          deviceName: getDeviceName(),
          os: detectOS(),
          browser: detectBrowser(),
          screen: formatScreen(),
          language: navigator.language || 'Unavailable',
          timezone:
            data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable',
        });
      } catch {
        try {
          const fallbackResponse = await fetch('https://api.ipify.org?format=json');
          if (!fallbackResponse.ok) throw new Error('Failed fallback IP request');

          const fallbackData = (await fallbackResponse.json()) as { ip?: string };

          setVisitorInfo({
            ip: fallbackData.ip || 'Unavailable',
            location: 'Unavailable',
            deviceType: detectDeviceType(),
            deviceName: getDeviceName(),
            os: detectOS(),
            browser: detectBrowser(),
            screen: formatScreen(),
            language: navigator.language || 'Unavailable',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable',
          });
        } catch {
          setVisitorInfo({
            ip: 'Unavailable',
            location: 'Unavailable',
            deviceType: detectDeviceType(),
            deviceName: getDeviceName(),
            os: detectOS(),
            browser: detectBrowser(),
            screen: formatScreen(),
            language: navigator.language || 'Unavailable',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadVisitorInfo();
  }, [isOpen]);

  const infoRows = useMemo(
    () => [
      { label: t('visitorInfo.ip'), value: visitorInfo.ip, icon: Globe },
      { label: t('visitorInfo.location'), value: visitorInfo.location, icon: MapPin },
      { label: t('visitorInfo.device'), value: visitorInfo.deviceType, icon: Monitor },
      { label: t('visitorInfo.deviceName'), value: visitorInfo.deviceName, icon: Cpu },
      { label: t('visitorInfo.os'), value: visitorInfo.os, icon: UserCircle },
      { label: t('visitorInfo.browser'), value: visitorInfo.browser, icon: MonitorSmartphone },
      { label: t('visitorInfo.screen'), value: visitorInfo.screen, icon: MousePointer2 },
      { label: t('visitorInfo.language'), value: visitorInfo.language, icon: Sparkles },
      { label: t('visitorInfo.timezone'), value: visitorInfo.timezone, icon: Info },
    ],
    [visitorInfo, t],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed inset-x-2 top-16 z-50 w-auto max-w-none overflow-hidden rounded-[8px] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:right-6 sm:top-12 sm:w-full sm:max-w-[360px]"
        >
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <UserCircle className="size-3.5 text-primary" />
              <span className="text-[11px] font-bold text-foreground">
                {t('visitorInfo.title')}
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              className="flex size-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:size-5"
              aria-label="Close Visitor Info"
            >
              ×
            </button>
          </div>

          <div className="max-h-[calc(100dvh-9rem)] overflow-y-auto p-2.5 sm:max-h-[420px] sm:p-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-[10px] text-muted-foreground">
                {t('visitorInfo.loading')}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:block sm:space-y-2.5">
                {infoRows.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-start gap-2 rounded-sm border border-border/60 bg-muted/20 p-2 sm:gap-2.5"
                  >
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </div>
                      <div className="mt-0.5 break-words text-[10px] text-foreground">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MapPin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s-6-5.686-6-11a6 6 0 1 1 12 0c0 5.314-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
