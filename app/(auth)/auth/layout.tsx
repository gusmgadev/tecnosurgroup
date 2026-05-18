import Image from 'next/image'
import Link from 'next/link'
import { theme } from '@/lib/theme'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
      }}
    >
      <Image
        src={theme.logo.pathWhite}
        alt="Tecnosur Group"
        width={theme.auth.logo.width}
        height={theme.auth.logo.height}
        style={{ marginBottom: theme.spacing.lg }}
        priority
      />

      <div
        style={{
          backgroundColor: theme.colors.secondary,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radii.md,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
          color: theme.colors.textMuted,
          fontSize: theme.fontSizes.sm,
          textDecoration: 'none',
        }}
      >
        ← Volver al inicio
      </Link>
    </div>
  )
}
