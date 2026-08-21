import { BrandingMockupsView } from '@/components/projects/BrandingMockupsView';
import { SOCIAL_CAMPAIGN_2025_BRAND_KIT_DATA } from '@/data/projects/social-campaign-2025';

export const metadata = {
  title: 'Social Campaign 2025 - Brand Kit',
  description:
    'Brand guidelines, brand kit specifications, and design standards for Social Campaign 2025.',
};

export default function SocialCampaign2025BrandKitPage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingMockupsView data={SOCIAL_CAMPAIGN_2025_BRAND_KIT_DATA} />
    </main>
  );
}
