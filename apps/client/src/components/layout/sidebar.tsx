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
  GraduationCap,
} from 'lucide-react';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
<GraduationCap />;
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
    label: 'Skills',
    href: '/skills',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Experience',
    href: '/experience',
    icon: ShieldCheck,
  },
  {
    label: 'Certifications',
    href: '/certification',
    icon: GraduationCap,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];

const bottomNavigation = [
  {
    label: 'AI assisstant',
    href: '/ai-assistant',
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
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex h-full flex-col rounded-sm bg-background py-2 px-2 shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]"
    >
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
                'flex size-[40px] shrink-0 items-center justify-center rounded-xs',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_18px_var(--color-brand)]'
                  : 'bg-background text-foreground hover:bg-muted shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]',
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
                'flex size-[40px] shrink-0 items-center justify-center rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_0_18px_var(--color-brand)]'
                  : 'bg-background text-foreground hover:bg-muted shadow-gray-400 dark:shadow-[0_0_5px_rgba(255,255,255,0.015)]',
              ].join(' ')}
            >
              <Icon className="size-5" strokeWidth={1.8} />
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
