'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export function SimpleMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Close section navigation' : 'Open section navigation'}
        aria-expanded={isOpen}
        aria-controls="simple-mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="flex size-9 items-center justify-center rounded-[8px] border border-border text-foreground-secondary transition-colors hover:border-primary hover:text-primary"
      >
        {isOpen ? (
          <X className="size-4" aria-hidden="true" />
        ) : (
          <Menu className="size-4" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <nav
          id="simple-mobile-navigation"
          aria-label="Section navigation"
          className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-48 flex-col gap-1 rounded-[8px] border border-border bg-background p-2 shadow-xl"
        >
          {sections.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="rounded-[8px] px-3 py-2 text-xs text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
