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

import { useVisitorInfoStore } from '@/stores/visitor-info.store';

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
  const isOpen = useVisitorInfoStore((s) => s.isOpen);
  const close = useVisitorInfoStore((s) => s.close);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>(defaultVisitorInfo);

  useEffect(() => {
    if (!isOpen) return;

    const loadVisitorInfo = async () => {
      setIsLoading(true);

      try {
        const locationResponse = await fetch('https://ipapi.co/json/', { cache: 'no-store' });

        let locationText = 'Unavailable';
        if (locationResponse.ok) {
          const place = (await locationResponse.json()) as {
            ip?: string;
            city?: string;
            country_name?: string;
            country?: string;
          };

          locationText = [place.city, place.country_name || place.country]
            .filter(Boolean)
            .join(', ');
          if (!locationText) locationText = 'Unavailable';

          setVisitorInfo({
            ip: place.ip ?? 'Unavailable',
            location: locationText,
            deviceType: detectDeviceType(),
            deviceName: getDeviceName(),
            os: detectOS(),
            browser: detectBrowser(),
            screen: formatScreen(),
            language: navigator.language || 'Unavailable',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unavailable',
          });
        } else {
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
      } finally {
        setIsLoading(false);
      }
    };

    void loadVisitorInfo();
  }, [isOpen]);

  const infoRows = useMemo(
    () => [
      { label: 'IP Address', value: visitorInfo.ip, icon: Globe },
      { label: 'Location', value: visitorInfo.location, icon: MapPin },
      { label: 'Device', value: visitorInfo.deviceType, icon: Monitor },
      { label: 'Device Name', value: visitorInfo.deviceName, icon: Cpu },
      { label: 'OS', value: visitorInfo.os, icon: UserCircle },
      { label: 'Browser', value: visitorInfo.browser, icon: MonitorSmartphone },
      { label: 'Screen', value: visitorInfo.screen, icon: MousePointer2 },
      { label: 'Language', value: visitorInfo.language, icon: Sparkles },
      { label: 'Timezone', value: visitorInfo.timezone, icon: Info },
    ],
    [visitorInfo],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed right-6 top-12 z-50 w-full max-w-[360px] overflow-hidden rounded-[8px] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <UserCircle className="size-3.5 text-primary" />
              <span className="text-[11px] font-bold text-foreground">Visitor Info</span>
            </div>

            <button
              type="button"
              onClick={close}
              className="flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close Visitor Info"
            >
              ×
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-[10px] text-muted-foreground">
                Loading visitor info…
              </div>
            ) : (
              <div className="space-y-2.5">
                {infoRows.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-2.5 rounded-sm border border-border/60 bg-muted/20 p-2"
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
