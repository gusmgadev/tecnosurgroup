'use client'

import { theme } from '@/lib/theme'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const items = [
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
  {
    icon: MapPin,
    href: `https://maps.google.com/?q=${encodeURIComponent(theme.contact.address)}`,
    label: theme.contact.address,
    external: true,
  },
]

export function CtaBanner() {
  return (
    <section style={{ backgroundColor: theme.colors.accent, overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '10px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: theme.fontSizes.base,
            fontWeight: theme.fontWeights.bold,
            color: '#000000',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Contacto
        </span>
        <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '18px', lineHeight: 1 }}>·</span>

        {items.map(({ icon: Icon, href, label, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              textDecoration: 'none',
              color: 'rgba(0,0,0,0.70)',
              fontSize: theme.fontSizes.sm,
              fontWeight: theme.fontWeights.medium,
              transition: `color ${theme.transitions.fast}`,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#000000')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.70)')}
          >
            <Icon size={13} strokeWidth={2.2} />
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
