import Image from 'next/image'
import Link from 'next/link'
import { theme } from '@/lib/theme'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.dashboard.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
      }}
    >
      <div style={{
        position: 'relative',
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        overflow: 'hidden',
        marginBottom: theme.spacing.lg,
        flexShrink: 0,
      }}>
        <Image
          src={theme.logo.path}
          alt="Tecnosur Group"
          fill
          style={{ objectFit: 'contain', padding: '10px' }}
          priority
        />
      </div>

      <div
        style={{
          backgroundColor: theme.dashboard.cardBg,
          border: `1px solid ${theme.dashboard.border}`,
          borderRadius: theme.radii.md,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: '48px',
          width: '100%',
          maxWidth: '440px',
        }}
      >
        {children}
      </div>

      <Link
        href="/"
        style={{
          marginTop: theme.spacing.lg,
          color: theme.dashboard.textMuted,
          fontSize: theme.fontSizes.sm,
          textDecoration: 'none',
        }}
      >
        ← Volver al inicio
      </Link>
    </div>
  )
}
