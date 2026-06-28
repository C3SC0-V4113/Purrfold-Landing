import { ImageResponse } from 'next/og';

import { SeoCatMark } from '@/components/seo/seo-cat-mark';
import { brandColors } from '@/lib/site';

export const size = {
  height: 32,
  width: 32,
};

export const contentType = 'image/png';

const iconFrameStyle = {
  alignItems: 'center',
  background: brandColors.background,
  borderRadius: '999px',
  color: brandColors.primary,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
} as const;

export default function Icon() {
  return new ImageResponse(
    <div style={iconFrameStyle}>
      <SeoCatMark variant="favicon" />
    </div>,
    size
  );
}
