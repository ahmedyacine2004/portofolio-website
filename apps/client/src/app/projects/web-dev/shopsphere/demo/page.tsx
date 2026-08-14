import { WebProjectDemoView } from '@/components/projects/WebProjectDemoView';
import { SHOPSPHERE_DEMO_DATA } from '@/data/projects/shopsphere';

export const metadata = {
  title: 'ShopSphere - Live Demo Execution',
  description: 'Interactive execution and demo session configuration for ShopSphere.',
};

export default function ShopSphereDemoPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectDemoView data={SHOPSPHERE_DEMO_DATA} />
    </main>
  );
}
