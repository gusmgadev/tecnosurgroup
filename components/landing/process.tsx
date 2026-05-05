'use client'

import { theme } from '@/lib/theme'

const steps = [
  { num: '01', title: 'Consultoría', desc: 'Evaluamos tu necesidad y recomendamos la mejor solución técnica.' },
  { num: '02', title: 'Presupuesto', desc: 'Cotización detallada con plazos y condiciones claras.' },
  { num: '03', title: 'Ejecución', desc: 'Montaje o fabricación con estándar de calidad y normas vigentes.' },
  { num: '04', title: 'Certificación', desc: 'Trámite de documentación y certificación final.' },
]

export function Process() {
  return (
    <section id="process" style={{ background: theme.colors.dark, padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: theme.fontSizes.xxl,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Nuestro Proceso
        </h2>
        <p
          style={{
            color: theme.colors.textMuted,
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          De la idea a la realidad en 4 pasos simples
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}
        >
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: theme.fontWeights.bold,
                  color: theme.colors.accent,
                  marginBottom: '16px',
                  opacity: 0.8,
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontSize: theme.fontSizes.lg,
                  fontWeight: theme.fontWeights.bold,
                  color: theme.colors.text,
                  marginBottom: '12px',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: theme.fontSizes.base,
                  color: theme.colors.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}