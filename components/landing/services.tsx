'use client'

import { theme } from '@/lib/theme'

const services = [
  {
    title: 'Montaje de Hidrogrúas e Hidrolevadores',
    description: 'Instalación profesional de equipos de izaje en vehículos comerciales, con garantía certificada.',
    icon: '🔧',
  },
  {
    title: 'Reformas Estructurales y 3er Eje',
    description: 'Adaptaciones vehiculares para incrementar capacidad de carga y estabilidad.',
    icon: '⚙️',
  },
  {
    title: 'Fabricación de Carrocerías a Medida',
    description: 'Diseño y construcción de carrocerías personalizadas según necesidades del cliente.',
    icon: '🚛',
  },
  {
    title: 'Taller Homologado – Cerficados de montaje y fabricación',
    description: 'Trámites y certificaciones oficiales de seguridad y cumplimiento normativo.',
    icon: '📋',
  },
]

export function Services() {
  return (
    <section id="services" style={{ background: theme.colors.background, padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: theme.fontSizes.xxl,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Nuestros Servicios
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                background: theme.colors.secondary,
                borderRadius: theme.radii.lg,
                padding: '32px',
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: theme.fontSizes.lg,
                  fontWeight: theme.fontWeights.bold,
                  color: theme.colors.text,
                  marginBottom: '12px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: theme.fontSizes.base,
                  color: theme.colors.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}