import { ImageResponse } from 'next/og';

import { SeoCatMark } from '@/components/seo/seo-cat-mark';
import { brandColors } from '@/lib/site';

export const size = {
  height: 180,
  width: 180,
};

export const contentType = 'image/png';

const appleIconFrameStyle = {
  alignItems: 'center',
  background: brandColors.primary,
  borderRadius: '40px',
  color: brandColors.primaryForeground,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
} as const;

export default function AppleIcon() {
  return new ImageResponse(
    <div style={appleIconFrameStyle}>
      <SeoCatMark variant="apple" />
    </div>,
    size
  );
}
