import { GraphicDesignBrandKitView } from '@/components/projects/GraphicDesignBrandKitView';
import type { GraphicDesignBrandKitData } from '@/data/projects/apex-brand-kit';
import { SOCIAL_CAMPAIGN_2025_BRAND_KIT_DATA } from '@/data/projects/social-campaign-2025';

export const metadata = {
  title: 'Social Campaign 2025 - Brand Kit',
  description:
    'Brand guidelines, brand kit specifications, and design standards for Social Campaign 2025.',
};

export default function SocialCampaign2025BrandKitPage() {
  return (
    <main className="h-full w-full p-2">
      <GraphicDesignBrandKitView
        data={SOCIAL_CAMPAIGN_2025_BRAND_KIT_DATA as unknown as GraphicDesignBrandKitData}
      />
    </main>
  );
}
