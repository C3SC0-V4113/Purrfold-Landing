import { ImageResponse } from 'next/og';

import { SeoCatMark } from '@/components/seo/seo-cat-mark';
import { brandColors, siteName } from '@/lib/site';

export const alt = 'Purrfold cat brand card for agent-first project scaffolding';

export const size = {
  height: 630,
  width: 1200,
};

export const contentType = 'image/png';

const rootStyle = {
  alignItems: 'center',
  background: `linear-gradient(135deg, ${brandColors.background} 0%, ${brandColors.card} 52%, #eef7fa 100%)`,
  color: brandColors.foreground,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
} as const;

const dotPatternStyle = {
  opacity: 0.28,
  position: 'absolute',
} as const;

const cardStyle = {
  background: 'rgba(255, 250, 247, 0.82)',
  border: `2px solid ${brandColors.border}`,
  borderRadius: '48px',
  boxShadow: '0 32px 90px rgba(47, 41, 35, 0.14)',
  display: 'flex',
  flexDirection: 'column',
  gap: '34px',
  padding: '64px 72px',
  position: 'relative',
  width: '980px',
} as const;

const brandRowStyle = {
  alignItems: 'center',
  display: 'flex',
  gap: '22px',
} as const;

const markFrameStyle = {
  alignItems: 'center',
  background: brandColors.primary,
  borderRadius: '28px',
  color: brandColors.primaryForeground,
  display: 'flex',
  height: '92px',
  justifyContent: 'center',
  width: '92px',
} as const;

const brandStackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
} as const;

const brandTitleStyle = {
  color: brandColors.primary,
  fontSize: 36,
  fontWeight: 700,
} as const;

const eyebrowStyle = {
  color: brandColors.muted,
  fontSize: 24,
} as const;

const headlineStyle = {
  color: brandColors.foreground,
  fontSize: 66,
  fontWeight: 720,
  letterSpacing: '-0.05em',
  lineHeight: 1.02,
  maxWidth: '860px',
} as const;

const descriptionStyle = {
  color: brandColors.muted,
  fontSize: 28,
  lineHeight: 1.35,
  maxWidth: '790px',
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={rootStyle}>
      <svg height="630" style={dotPatternStyle} viewBox="0 0 1200 630" width="1200">
        {Array.from({ length: 18 }).map((_, row) =>
          Array.from({ length: 32 }).map((__, column) => (
            <circle
              key={`${row}-${column}`}
              cx={column * 42 + 10}
              cy={row * 42 + 8}
              fill={brandColors.primary}
              r="2.2"
            />
          ))
        )}
      </svg>

      <div style={cardStyle}>
        <div style={brandRowStyle}>
          <div style={markFrameStyle}>
            <SeoCatMark variant="og" />
          </div>
          <div style={brandStackStyle}>
            <div style={brandTitleStyle}>{siteName}</div>
            <div style={eyebrowStyle}>Agent-first scaffolding</div>
          </div>
        </div>

        <div style={headlineStyle}>The solid foundation for agent-driven projects</div>

        <div style={descriptionStyle}>
          Production-ready setup with quality gates, reusable skills, and a shadcn UI foundation.
        </div>
      </div>
    </div>,
    size
  );
}
