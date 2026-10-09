'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Code2, RotateCw } from 'lucide-react';

import profileImage from '@/assets/images/profile/avatar.jpg';
import avatarImage from '@/assets/images/profile/avatarV2.png';

export function SimpleAvatarCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[340px] md:max-w-[370px]">
      <div className="absolute -inset-3 rotate-3 rounded-xl border border-primary/20" />
      <div className="absolute -inset-3 -rotate-3 rounded-xl border border-border/70" />

      <button
        type="button"
        onClick={() => setIsFlipped((current) => !current)}
        aria-label={isFlipped ? 'Show portrait photo' : 'Flip card to see profile avatar'}
        aria-pressed={isFlipped}
        className="relative block h-[430px] w-full cursor-pointer rounded-lg text-left shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [perspective:1800px]"
      >
        <span
          className={`relative block h-full w-full rounded-lg transition-transform duration-700 motion-reduce:transition-none [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <span className="absolute inset-0 block overflow-hidden rounded-lg border border-border bg-card [backface-visibility:hidden]">
            <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/55 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm backdrop-blur">
              <RotateCw aria-hidden="true" className="size-3" />
              Click to flip
            </span>
            <Image
              src={profileImage}
              alt=""
              priority
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 80vw, 370px"
            />
            <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-16 text-white">
              <span className="block text-lg font-bold uppercase leading-none sm:text-xl">
                Code meets creativity
              </span>
              <span className="mt-2 block text-[10px] tracking-wide text-white/75">
                Web development · UI/UX · Visual design
              </span>
            </span>
          </span>

          <span className="absolute inset-0 block overflow-hidden rounded-lg border border-border bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/55 px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm backdrop-blur">
              <RotateCw aria-hidden="true" className="size-3" />
              Click to return
            </span>
            <Image
              src={avatarImage}
              alt=""
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 80vw, 370px"
            />
            <span className="absolute inset-0 block bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 block p-5 text-white">
              <span className="block text-lg font-bold uppercase leading-none sm:text-xl">
                Profile avatar
              </span>
              <span className="mt-2 block text-[10px] tracking-wide text-white/75">
                Design identity · Brand presence
              </span>
            </span>
          </span>
        </span>
      </button>

      <span className="absolute -bottom-4 -left-4 flex size-12 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-lg">
        <Code2 className="size-5" />
      </span>
    </div>
  );
}
