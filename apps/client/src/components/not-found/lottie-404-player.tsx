'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface Lottie404PlayerProps {
  className?: string;
}

export function Lottie404Player({ className }: Lottie404PlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('/lottie/404.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Lottie JSON');
        return res.json();
      })
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => {
        console.error('Lottie 404 animation load error:', err);
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className ?? ''}`}>
        <span className="font-beni text-[120px] leading-none text-primary select-none">404</span>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`flex items-center justify-center ${className ?? ''}`}>
        <div className="h-48 w-72 animate-pulse rounded-xl bg-muted/30" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    </div>
  );
}
