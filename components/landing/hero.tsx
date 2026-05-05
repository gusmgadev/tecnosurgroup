'use client'

import { useState, useEffect, useCallback } from 'react'
import { theme } from '@/lib/theme'

const mockRows = [
  { label: 'Hidrogrúa Fassi F110',       status: 'En montaje',  color: theme.colors.accent  },
  { label: '3er Eje — Camión Scania',    status: 'Certificado', color: theme.colors.success },
  { label: 'Carrocería a medida #08',   status: 'En taller',   color: 'rgba(255,255,255,0.45)' },
] as const

const mockStats = [
  { num: '12+',  label: 'Años de experiencia' },
  { num: '200+', label: 'Equipos montados'    },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const total = theme.hero.images.length

  const advance = useCallback(
    () => setCurrent(prev => (prev + 1) % total),
    [total],
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, theme.hero.slideInterval)
    return () => clearInterval(id)
  }, [paused, advance])

  return (
    <section
      style={{ height: theme.hero.height, position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slideshow ── */}
      {theme.hero.images.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${theme.hero.blurAmount})`,
            transform: 'scale(1.05)',
            opacity: i === current ? 1 : 0,
            transition: `opacity ${theme.hero.slideTransition} ease`,
          }}
        />
      ))}

      {/* ── Overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to right,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.88) 45%,
            rgba(0,0,0,0.42) 70%,
            rgba(0,0,0,0.12) 100%)`,
        }}
      />

      {/* ── Grid de contenido ── */}
      <div
        className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 items-center gap-8"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 48px)',
        }}
      >
        {/* Columna izquierda */}
        <div>
          {/* Badge tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: `1px solid ${theme.colors.accent}55`,
              borderRadius: theme.radii.full,
              padding: '4px 14px',
              marginBottom: '20px',
              color: theme.colors.accent,
              fontSize: theme.fontSizes.xs,
              letterSpacing: '0.8px',
              fontWeight: theme.fontWeights.medium,
            }}
          >
            {theme.hero.tag}
          </div>

          {/* Título destacado */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: theme.fontWeights.bold,
              color: theme.colors.accent,
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            {theme.hero.titleHighlight}
          </h1>

          {/* Subtítulo del título */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              fontWeight: theme.fontWeights.medium,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.45,
              marginBottom: '14px',
            }}
          >
            {theme.hero.title}
          </p>

          {/* Descripción */}
          <p
            style={{
              color: 'rgba(255,255,255,0.60)',
              fontSize: theme.fontSizes.base,
              maxWidth: '440px',
              lineHeight: 1.65,
              marginBottom: '32px',
            }}
          >
            {theme.hero.subtitle}
          </p>

          {/* Botones CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={theme.hero.cta.primary.href}
              style={{
                background: theme.colors.accent,
                color: theme.colors.dark,
                borderRadius: theme.radii.full,
                padding: '12px 28px',
                fontWeight: theme.fontWeights.bold,
                fontSize: theme.fontSizes.sm,
                transition: theme.transitions.fast,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {theme.hero.cta.primary.text}
            </a>
            <a
              href={theme.hero.cta.secondary.href}
              style={{
                border: '1px solid rgba(255,255,255,0.30)',
                color: '#ffffff',
                borderRadius: theme.radii.full,
                padding: '12px 28px',
                fontWeight: theme.fontWeights.medium,
                fontSize: theme.fontSizes.sm,
                transition: theme.transitions.fast,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background   = 'rgba(255,255,255,0.10)'
                e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.50)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background   = 'transparent'
                e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.30)'
              }}
            >
              {theme.hero.cta.secondary.text}
            </a>
          </div>
        </div>

        {/* Columna derecha — mockup */}
        <div
          className="hidden md:block"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          {/* Barra de título simulada */}
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
            <span style={{ marginLeft: '8px', fontSize: theme.fontSizes.xs, color: 'rgba(255,255,255,0.30)' }}>
              Panel de Gestión — Tecnosur Group
            </span>
          </div>

          {/* Filas de datos simulados */}
          {mockRows.map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: theme.fontSizes.sm,
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.80)' }}>{row.label}</span>
              <span
                style={{
                  color: row.color,
                  fontSize: theme.fontSizes.xs,
                  background: `${row.color}18`,
                  padding: '2px 10px',
                  borderRadius: theme.radii.full,
                }}
              >
                {row.status}
              </span>
            </div>
          ))}

          {/* Cards de estadísticas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '16px',
            }}
          >
            {mockStats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: theme.radii.md,
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: theme.fontSizes.xl,
                    fontWeight: theme.fontWeights.bold,
                    color: theme.colors.accent,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: theme.fontSizes.xs,
                    color: 'rgba(255,255,255,0.45)',
                    marginTop: '2px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dots de navegación ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 'clamp(24px, 5vw, 48px)',
          display: 'flex',
          gap: '8px',
          zIndex: 20,
        }}
      >
        {theme.hero.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Imagen ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '99px',
              background: i === current ? theme.colors.accent : 'rgba(255,255,255,0.30)',
              border: 'none',
              cursor: 'pointer',
              transition: theme.transitions.fast,
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
