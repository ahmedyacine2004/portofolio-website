import { WebProjectTechStackView } from '@/components/projects/WebProjectTechStackView';
import { SHOPSPHERE_TECH_STACK_DATA } from '@/data/projects/shopsphere';

export const metadata = {
  title: 'ShopSphere - Tech Stack',
  description: 'Interactive runtime and technology stack powering ShopSphere.',
};

export default function ShopSphereTechStackPage() {
  return (
    <main className="h-full w-full p-2">
      <WebProjectTechStackView data={SHOPSPHERE_TECH_STACK_DATA} />
    </main>
  );
}
