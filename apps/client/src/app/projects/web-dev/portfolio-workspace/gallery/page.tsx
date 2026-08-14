import { WebProjectGalleryView } from '@/components/projects/WebProjectGalleryView';
import { PORTFOLIO_WORKSPACE_GALLERY_DATA } from '@/data/projects/portfolio-workspace';

export default function PortfolioWorkspaceGalleryPage() {
  return <WebProjectGalleryView data={PORTFOLIO_WORKSPACE_GALLERY_DATA} />;
}
