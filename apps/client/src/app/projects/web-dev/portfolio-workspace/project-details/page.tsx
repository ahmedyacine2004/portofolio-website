import { WebProjectDetailsView } from '@/components/projects/WebProjectDetailsView';
import { PORTFOLIO_WORKSPACE_DETAILS } from '@/data/projects/portfolio-workspace';

export const metadata = {
  title: 'Portfolio Workspace - Project Details',
  description:
    'Project overview, objectives, architecture, and engineering highlights for Portfolio Workspace.',
};

export default function PortfolioWorkspaceDetailsPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDetailsView data={PORTFOLIO_WORKSPACE_DETAILS} />
    </main>
  );
}
