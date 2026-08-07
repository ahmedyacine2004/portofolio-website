'use client';

import {
  BriefcaseBusiness,
  CircleAlert,
  FolderKanban,
  House,
  Mail,
  MessageCircle,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavigation = [
  {
    label: 'Home',
    href: '/',
    icon: House,
  },
  {
    label: 'About',
    href: '/about',
    icon: CircleAlert,
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    label: 'Services',
    href: '/services',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Experience',
    href: '/experience',
    icon: ShieldCheck,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];

const bottomNavigation = [
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageCircle,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col rounded-sm bg-card py-2 px-2 shadow-sm">
      {/* Main navigation */}
      <nav className="flex flex-col items-center gap-2" aria-label="Main navigation">
        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'flex size-[46px] shrink-0 items-center justify-center rounded-xs',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_18px_var(--color-brand)]'
                  : 'bg-background text-foreground hover:bg-muted shadow-md',
              ].join(' ')}
            >
              <Icon className="size-5" strokeWidth={1.8} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <nav className="mt-auto flex flex-col items-center gap-2" aria-label="Secondary navigation">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'flex size-[46px] shadow-md shrink-0 items-center justify-center rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_18px_var(--color-brand)]'
                  : 'bg-background text-foreground hover:bg-muted',
              ].join(' ')}
            >
              <Icon className="size-5" strokeWidth={1.8} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
