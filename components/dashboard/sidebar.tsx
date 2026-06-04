'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Building2, MessageSquare, LogOut } from 'lucide-react'
import { theme } from '@/lib/theme'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Clientes',   href: '/dashboard/clientes',  Icon: Building2     },
    { label: 'Contactos',  href: '/dashboard/contactos', Icon: MessageSquare },
  ]

  return (
    <aside
      style={{
        width: theme.dashboard.sidebarWidth,
        backgroundColor: theme.colors.accent,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        minHeight: '100vh',
      }}
    >
      {/* Logo circular */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(0,0,0,0.10)', display: 'flex', justifyContent: 'center' }}>
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <Image
            src={theme.logo.path}
            alt="Tecnosur Group"
            fill
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        <p style={{ fontSize: theme.fontSizes.xs, color: 'rgba(0,0,0,0.45)', fontWeight: theme.fontWeights.medium, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 20px 8px', margin: 0 }}>
          Gestión
        </p>
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                margin: '2px 8px',
                borderRadius: theme.radii.sm,
                textDecoration: 'none',
                fontSize: theme.fontSizes.sm,
                fontWeight: active ? theme.fontWeights.medium : theme.fontWeights.regular,
                color: active ? '#000000' : 'rgba(0,0,0,0.60)',
                backgroundColor: active ? 'rgba(0,0,0,0.12)' : 'transparent',
                transition: theme.transitions.fast,
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(0,0,0,0.10)' }}>
        <button
          onClick={() => signOut({ callbackUrl: theme.auth.redirectAfterLogout })}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.55)', fontSize: theme.fontSizes.sm, padding: 0, transition: theme.transitions.fast }}
        >
          <LogOut size={14} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
