import { WebProjectTechStackView } from '@/components/projects/WebProjectTechStackView';
import { PORTFOLIO_WORKSPACE_TECH_STACK_DATA } from '@/data/projects/portfolio-workspace';

export const metadata = {
  title: 'Portfolio Workspace - Tech Stack',
  description: 'Interactive runtime and technology stack powering Portfolio Workspace.',
};

export default function PortfolioWorkspaceTechStackPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectTechStackView data={PORTFOLIO_WORKSPACE_TECH_STACK_DATA} />
    </main>
  );
}
