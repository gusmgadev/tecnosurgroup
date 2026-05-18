'use client'

import Image from 'next/image'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { theme } from '@/lib/theme'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const socialLinks = [
  { icon: InstagramIcon, href: theme.footer.social.instagram, label: 'Instagram' },
  { icon: LinkedinIcon,  href: theme.footer.social.linkedin,  label: 'LinkedIn'  },
].filter(s => s.href)

const contactItems = [
  {
    icon: Phone,
    href: `tel:${theme.contact.phone}`,
    label: theme.contact.phone,
  },
  {
    icon: Mail,
    href: `mailto:${theme.contact.email}`,
    label: theme.contact.email,
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/${theme.contact.whatsapp}`,
    label: 'WhatsApp',
    external: true,
  },
]

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: '28px',
        height: '28px',
        borderRadius: theme.radii.sm,
        background: `${theme.colors.accent}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.accent,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  )
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        color: 'rgba(255,255,255,0.35)',
        fontSize: theme.fontSizes.xs,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        marginBottom: '16px',
        fontWeight: theme.fontWeights.medium,
      }}
    >
      {children}
    </h3>
  )
}

export function Footer() {
  return (
    <footer style={{ background: theme.colors.dark }}>

      {/* ── Grid principal ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 32px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >

        {/* Columna 1 — Empresa / Logo */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: '8px', fontSize: theme.fontSizes.sm, color: 'rgba(255,255,255,0.55)', fontWeight: theme.fontWeights.medium }}>
              Tecnosur Group
            </span>
          </div>
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <Image
              src={theme.logo.path}
              alt="Tecnosur Group"
              width={72}
              height={72}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p
            style={{
              color: 'rgba(255,255,255,0.50)',
              fontSize: theme.fontSizes.sm,
              lineHeight: 1.65,
              marginBottom: '20px',
              textAlign: 'justify',
            }}
          >
            {theme.footer.description}
          </p>
        </div>

        {/* Columna 2 — Servicios */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: '8px', fontSize: theme.fontSizes.sm, color: 'rgba(255,255,255,0.55)', fontWeight: theme.fontWeights.medium }}>
              Servicios
            </span>
          </div>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {theme.footer.services.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: theme.fontSizes.sm,
                    transition: theme.transitions.fast,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3 — Navegación */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: '8px', fontSize: theme.fontSizes.sm, color: 'rgba(255,255,255,0.55)', fontWeight: theme.fontWeights.medium }}>
              Navegación
            </span>
          </div>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {theme.footer.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: theme.fontSizes.sm,
                    transition: theme.transitions.fast,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: theme.radii.md,
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(255,255,255,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.60)',
                  transition: theme.transitions.fast,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = theme.colors.accent
                  e.currentTarget.style.color      = theme.colors.dark
                  e.currentTarget.style.border     = `0.5px solid ${theme.colors.accent}`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color      = 'rgba(255,255,255,0.60)'
                  e.currentTarget.style.border     = '0.5px solid rgba(255,255,255,0.10)'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Columna 4 — Contacto + Mapa */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          {/* Barra de título estilo hero */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: '8px', fontSize: theme.fontSizes.sm, color: 'rgba(255,255,255,0.55)', fontWeight: theme.fontWeights.medium }}>
              Contacto — Tecnosur Group
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {contactItems.map(({ icon: Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: theme.fontSizes.sm,
                  transition: theme.transitions.fast,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >
                <IconBadge><Icon size={13} /></IconBadge>
                {label}
              </a>
            ))}
          </div>

          {/* Google Maps */}
          <iframe
            src={theme.footer.maps.embedUrl}
            width="100%"
            height={theme.footer.maps.height}
            style={{
              border: 0,
              borderRadius: theme.radii.md,
              opacity: 0.70,
              outline: '1px solid rgba(255,255,255,0.08)',
              display: 'block',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Tecnosur Group"
          />

        </div>
      </div>

      {/* ── Barra inferior ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: theme.fontSizes.sm }}>
          © {theme.footer.copyright}
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'Privacidad', href: theme.footer.legal.privacy },
            { label: 'Términos',   href: theme.footer.legal.terms   },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                color: 'rgba(255,255,255,0.28)',
                fontSize: theme.fontSizes.sm,
                transition: theme.transitions.fast,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.60)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
