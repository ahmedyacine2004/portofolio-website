import React from 'react';
import { BrandingColorPaletteView } from '@/components/projects/BrandingColorPaletteView';
import { LUMINA_STUDIO_COLOR_PALETTE_DATA } from '@/data/projects/lumina-studio';

export const metadata = {
  title: 'Lumina Studio - Color Palette Tokens',
  description:
    'Official color tokens, HEX/RGB/HSL/CMYK specifications, gradients, and WCAG accessibility contrast ratios for Lumina Studio.',
};

export default function LuminaStudioColorPalettePage() {
  return (
    <main className="h-full w-full p-2 overflow-hidden">
      <BrandingColorPaletteView data={LUMINA_STUDIO_COLOR_PALETTE_DATA} />
    </main>
  );
}
