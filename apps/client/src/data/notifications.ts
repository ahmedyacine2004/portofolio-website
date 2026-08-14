export type PortfolioNotificationType =
  'project' | 'update' | 'announcement' | 'feature' | 'resume';

export type PortfolioNotification = {
  id: string;
  type: PortfolioNotificationType;
  title: string;
  message: string;
  date: string;
  link?: string;
};

const baseNotifications = [
  {
    id: 'new-project-portfolio-2026',
    type: 'project',
    title: 'New project added',
    message: 'A new project has been added to the portfolio showcase.',
    date: '2026-08-14',
    link: '/projects',
  },
  {
    id: 'ai-assistant-launch-2026',
    type: 'feature',
    title: 'AI Assistant available',
    message: 'The portfolio AI assistant is now live for portfolio Q&A and project insights.',
    date: '2026-08-07',
    link: '/ai-assistant',
  },
  {
    id: 'resume-refresh-2026',
    type: 'resume',
    title: 'Resume updated',
    message: 'My latest experience, certifications, and skills have been refreshed.',
    date: '2026-07-28',
    link: '/about',
  },
  {
    id: 'skills-expansion-2026',
    type: 'update',
    title: 'Skills updated',
    message: 'New frontend, backend, and AI-related skills were added to the skills section.',
    date: '2026-07-15',
    link: '/skills',
  },
  {
    id: 'availability-2026',
    type: 'announcement',
    title: 'Freelance availability',
    message: 'Open to selected freelance, consulting, and product collaboration opportunities.',
    date: '2026-06-25',
    link: '/contact',
  },
  {
    id: 'portfolio-refresh-2026',
    type: 'update',
    title: 'Portfolio update',
    message: 'The portfolio has been refreshed with improved project details and navigation.',
    date: '2026-05-18',
    link: '/about',
  },
] satisfies PortfolioNotification[];

export const portfolioNotifications = [...baseNotifications].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
