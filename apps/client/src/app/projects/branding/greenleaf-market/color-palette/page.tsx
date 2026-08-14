import { BrandingColorPaletteView } from '@/components/projects/BrandingColorPaletteView';
import { GREENLEAF_MARKET_COLOR_PALETTE_DATA } from '@/data/projects/greenleaf-market';

export const metadata = {
  title: 'GreenLeaf Market - Color Palette',
  description: 'Color palette, specifications, and usage guidelines for GreenLeaf Market.',
};

export default function GreenLeafMarketColorPalettePage() {
  return (
    <main className="h-full w-full p-2">
      <BrandingColorPaletteView data={GREENLEAF_MARKET_COLOR_PALETTE_DATA} />
    </main>
  );
}
