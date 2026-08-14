import { GraphicDesignOverviewView } from '@/components/projects/GraphicDesignOverviewView';
import { SOCIAL_CAMPAIGN_2025_OVERVIEW_DATA } from '@/data/projects/social-campaign-2025';

export const metadata = {
  title: 'Social Campaign 2025 - Design Overview',
  description:
    'Project overview, design vision, visual identity, and campaign strategy for Social Campaign 2025.',
};

export default function SocialCampaign2025OverviewPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignOverviewView data={SOCIAL_CAMPAIGN_2025_OVERVIEW_DATA} />
    </main>
  );
}
