import { GraphicDesignVisualAssetsView } from '@/components/projects/GraphicDesignVisualAssetsView';
import { SOCIAL_CAMPAIGN_2025_VISUAL_ASSETS_DATA } from '@/data/projects/social-campaign-2025';

export const metadata = {
  title: 'Social Campaign 2025 - Visual Assets',
  description: 'Design assets, graphics, and visual elements for Social Campaign 2025.',
};

export default function SocialCampaign2025VisualAssetsPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignVisualAssetsView data={SOCIAL_CAMPAIGN_2025_VISUAL_ASSETS_DATA} />
    </main>
  );
}
