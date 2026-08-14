import { WebProjectDetailsView } from '@/components/projects/WebProjectDetailsView';
import { SHOPSPHERE_DETAILS } from '@/data/projects/shopsphere';

export const metadata = {
  title: 'ShopSphere - Project Details',
  description:
    'Project overview, objectives, architecture, and engineering highlights for ShopSphere.',
};

export default function ShopSphereDetailsPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDetailsView data={SHOPSPHERE_DETAILS} />
    </main>
  );
}
