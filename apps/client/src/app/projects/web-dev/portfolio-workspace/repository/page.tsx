import { WebProjectRepositoryView } from '@/components/projects/WebProjectRepositoryView';
import { PORTFOLIO_WORKSPACE_REPOSITORY_DATA } from '@/data/projects/portfolio-workspace';

export const metadata = {
  title: 'Portfolio Workspace - Repository',
  description:
    'Repository information, CI/CD pipeline, and project statistics for Portfolio Workspace.',
};

export default function PortfolioWorkspaceRepositoryPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectRepositoryView data={PORTFOLIO_WORKSPACE_REPOSITORY_DATA} />
    </main>
  );
}
