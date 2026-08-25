'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { theme } from '@/lib/theme'

interface SectionBannerProps {
  label: string
  description: string
  anchorId?: string
}

export function SectionBanner({ label, description, anchorId }: SectionBannerProps) {
  const pathname = usePathname()

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 3 }}>
      {/* Barra amarilla */}
      <div style={{ backgroundColor: theme.colors.accent }}>
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
          <span style={{ fontSize: theme.fontSizes.base, fontWeight: theme.fontWeights.bold, color: '#000000', whiteSpace: 'nowrap' }}>
            {label}
          </span>
          <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '18px', lineHeight: 1 }}>·</span>
          <span style={{ fontSize: theme.fontSizes.sm, color: 'rgba(0,0,0,0.60)', fontWeight: theme.fontWeights.medium }}>
            {description}
          </span>
        </div>
      </div>

      {/* Botón Inicio */}
      <div id={anchorId} style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 48px' }}>
        <Link
          href="/"
          onClick={handleHomeClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            borderRadius: '99px',
            background: theme.colors.accent,
            color: '#000000',
            fontSize: theme.fontSizes.base,
            fontWeight: theme.fontWeights.bold,
            textDecoration: 'none',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <ChevronLeft size={14} />
          Inicio
        </Link>
      </div>
    </div>
  )
}
