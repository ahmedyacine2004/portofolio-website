import { WebProjectRepositoryView } from '@/components/projects/WebProjectRepositoryView';
import { SHOPSPHERE_REPOSITORY_DATA } from '@/data/projects/shopsphere';

export const metadata = {
  title: 'ShopSphere - Repository',
  description: 'Repository information, CI/CD pipeline, and project statistics for ShopSphere.',
};

export default function ShopSphereRepositoryPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectRepositoryView data={SHOPSPHERE_REPOSITORY_DATA} />
    </main>
  );
}
