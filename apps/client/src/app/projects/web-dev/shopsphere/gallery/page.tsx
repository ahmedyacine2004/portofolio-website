import { WebProjectGalleryView } from '@/components/projects/WebProjectGalleryView';
import { SHOPSPHERE_GALLERY_DATA } from '@/data/projects/shopsphere';

export default function ShopSphereGalleryPage() {
  return <WebProjectGalleryView data={SHOPSPHERE_GALLERY_DATA} />;
}
