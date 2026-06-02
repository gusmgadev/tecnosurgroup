'use client'

import { theme } from '@/lib/theme'

interface SectionBannerProps {
  label: string
  description: string
}

export function SectionBanner({ label, description }: SectionBannerProps) {
  return (
    <div style={{ backgroundColor: theme.colors.accent, width: '100%', position: 'relative', zIndex: 3 }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '10px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: theme.fontSizes.base,
            fontWeight: theme.fontWeights.bold,
            color: '#000000',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '18px', lineHeight: 1 }}>·</span>
        <span
          style={{
            fontSize: theme.fontSizes.sm,
            color: 'rgba(0,0,0,0.60)',
            fontWeight: theme.fontWeights.medium,
          }}
        >
          {description}
        </span>
      </div>
    </div>
  )
}
