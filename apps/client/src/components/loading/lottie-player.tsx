'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottiePlayerProps {
  className?: string;
}

export function LottiePlayer({ className }: LottiePlayerProps) {
  const { theme } = useTheme();
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setAnimationData(null);
    setHasError(false);

    // Use dark variant (white text) in dark mode, original (black text) in light mode
    const file = theme === 'dark' ? '/lottie/loading-page-dark.json' : '/lottie/loading-page.json';

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Lottie JSON');
        return res.json();
      })
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => {
        console.error('Lottie animation load error:', err);
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [theme]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center py-4 ${className || ''}`}>
        <span className="font-beni text-3xl uppercase tracking-wider text-foreground">Love</span>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`flex items-center justify-center py-4 ${className || ''}`}>
        <div className="h-16 w-48 animate-pulse rounded-md bg-muted/40" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <div className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px]">
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    </div>
  );
}
