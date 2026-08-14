import { BrandingColorPaletteView } from '@/components/projects/BrandingColorPaletteView';
import { NOVA_COFFEE_COLOR_PALETTE_DATA } from '@/data/projects/nova-coffee';

export const metadata = {
  title: 'Nova Coffee - Color Palette',
  description: 'Color palette, specifications, and usage guidelines for Nova Coffee.',
};

export default function NovaCoffeeColorPalettePage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingColorPaletteView data={NOVA_COFFEE_COLOR_PALETTE_DATA} />
    </main>
  );
}
