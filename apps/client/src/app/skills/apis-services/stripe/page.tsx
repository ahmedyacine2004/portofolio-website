import FrontendView from '@/components/skills/FrontendView';
import { stripeWorkspaceData } from '@/data/skills/apis-workspace';

export const metadata = {
  title: 'Stripe API Workspace | Skills',
  description: 'Payment processing platform workspace details',
};

export default function StripeWorkspacePage() {
  return (
    <div className="h-full w-full overflow-y-auto bg-background p-6 text-foreground md:p-8 rounded-[8px]">
      <div className="mx-auto max-w-[1400px]">
        <FrontendView data={stripeWorkspaceData} />
      </div>
    </div>
  );
}
