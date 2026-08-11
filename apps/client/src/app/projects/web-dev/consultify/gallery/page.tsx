import React from 'react';
import { CONSULTIFY_GALLERY_DATA } from '@/data/projects/consultify';
import { WebProjectGalleryView } from '@/components/projects/WebProjectGalleryView';

export default function ConsultifyGalleryPage() {
  return <WebProjectGalleryView data={CONSULTIFY_GALLERY_DATA} />;
}
