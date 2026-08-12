export interface MetricItem {
  label: string;
  value: string;
  icon: string;
}

export interface ApplicationItem {
  id: string;
  title: string;
  description: string;
  status: string;
  badge: string;
}

export interface BuildGridItem {
  label: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface PercentageItem {
  label: string;
  percentage: number;
}

export interface FrontendWorkspaceData {
  skillName: string;
  header: {
    title: string;
    subtitle: string;
    description: string;
    metrics: MetricItem[];
  };
  proficiency: number;
  whyILove: string[];
  applications: ApplicationItem[];
  whatIBuild: BuildGridItem[];
  impactAndStats: StatItem[];
  techStack: string[];
  toolkit: PercentageItem[];
  coreStrengths: string[];
  technicalStrengths: PercentageItem[];
}

export const reactWorkspaceData: FrontendWorkspaceData = {
  skillName: 'ReactJS',
  header: {
    title: 'ReactJS',
    subtitle: 'Building interactive UIs for impactful digital experiences',
    description:
      'I use React to turn ideas into elegant, scalable and user-focused interfaces. It is the core of most of my frontend work.',
    metrics: [
      { label: 'Experience', value: '3+ years', icon: 'Calendar' },
      { label: 'Projects', value: '12+', icon: 'Folder' },
      { label: 'Level', value: 'Expert', icon: 'Star' },
      { label: 'Frontend library', value: 'Primary', icon: 'BookOpen' },
    ],
  },
  proficiency: 95,
  whyILove: [
    'Component-based architecture',
    'Highly reusable UI building blocks',
    'Rich ecosystem & community',
    'Great developer experience',
    'Perfect for scalable portfolios',
  ],
  applications: [
    {
      id: 'consultify',
      title: 'CONSULTIFY',
      description: 'AI powered consultation platform with booking payment & admin dashboard.',
      status: 'Online',
      badge: 'Production',
    },
    {
      id: 'portfolio',
      title: 'Portfolio Workspace',
      description: 'Developer portfolio with interactive experience and custom animations.',
      status: 'Online',
      badge: 'Production',
    },
    {
      id: 'taskflow',
      title: 'TaskFlow',
      description: 'Productivity app for task management with analytics and team collaboration.',
      status: 'Online',
      badge: 'Production',
    },
  ],
  whatIBuild: [
    { label: 'Home Pages', icon: 'Home' },
    { label: 'Dashboards', icon: 'TrendingUp' },
    { label: 'Authentication', icon: 'Lock' },
    { label: 'User Profiles', icon: 'User' },
    { label: 'Booking Flow', icon: 'CalendarDays' },
    { label: 'Payment Flow', icon: 'CreditCard' },
    { label: 'Admin Panels', icon: 'Shield' },
    { label: 'Settings Pages', icon: 'Settings' },
    { label: 'Blog / CMS', icon: 'FileText' },
    { label: 'Portfolio Showcases', icon: 'Layout' },
    { label: 'Landing Pages', icon: 'Zap' },
    { label: 'Error / 404 Pages', icon: 'AlertCircle' },
  ],
  impactAndStats: [
    { label: 'UI Components Create', value: '240+' },
    { label: 'Reusable Components', value: '85+' },
    { label: 'Pages Built', value: '60+' },
    { label: 'Interactive Features', value: '110+' },
    { label: 'Performance Score', value: '98/100' },
    { label: 'Accessibility Score', value: '100/100' },
  ],
  techStack: [
    'Zustand',
    'Tailwind CSS',
    'React Router',
    'React Hook Form',
    'Axios',
    'Framer Motion',
    'Vite',
    'TanStack Query',
  ],
  toolkit: [
    { label: 'Component Design', percentage: 95 },
    { label: 'Performance Optimization', percentage: 90 },
    { label: 'Reusable Architecture', percentage: 86 },
    { label: 'Responsive Design', percentage: 70 },
    { label: 'State Management', percentage: 65 },
  ],
  coreStrengths: [
    'Create scalable and maintainable component systems',
    'Write clean, reusable and testable components',
    'Optimize performance and bundle size',
    'Build accessible and inclusive user interfaces',
    'Solve real-world problems with elegant UI solutions',
  ],
  technicalStrengths: [
    { label: 'React Server Components', percentage: 60 },
    { label: 'Advanced Animations', percentage: 40 },
    { label: 'TanStack Router', percentage: 55 },
    { label: 'AI Integration in UI', percentage: 75 },
  ],
};
