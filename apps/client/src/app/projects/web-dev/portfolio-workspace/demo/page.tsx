import { WebProjectDemoView } from '@/components/projects/WebProjectDemoView';
import { PORTFOLIO_WORKSPACE_DEMO_DATA } from '@/data/projects/portfolio-workspace';

export const metadata = {
  title: 'Portfolio Workspace - Live Demo Execution',
  description: 'Interactive execution and demo session configuration for Portfolio Workspace.',
};

export default function PortfolioWorkspaceDemoPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDemoView data={PORTFOLIO_WORKSPACE_DEMO_DATA} />
    </main>
  );
}
