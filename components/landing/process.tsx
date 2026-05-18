'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '@/lib/theme'

const steps = [
  { num: '01', title: 'Consultoría',  desc: 'Evaluamos tu necesidad y asesoramos la mejor solución técnica.' },
  { num: '02', title: 'Presupuesto',  desc: 'Cotización detallada con plazos y condiciones claras.' },
  { num: '03', title: 'Ejecución',    desc: 'Trabajamos bajo las directivas de fábrica de las mejores marcas a nivel mundial cumpliendo sus estándares y avalados por ellos.' },
  { num: '04', title: 'Certificación',desc: 'Los trabajos se entregan con los certificados correspondientes bajo el control de nuestro ingeniero director técnico.' },
]

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'rgba(28, 28, 30, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: theme.radii.lg,
        border: `1px solid ${hovered ? theme.colors.accent : 'rgba(255,255,255,0.12)'}`,
        padding: '32px 24px',
        textAlign: 'center',
        cursor: 'default',
        transition: `border-color ${theme.transitions.normal}`,
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${theme.colors.accent}22`
          : '0 4px 20px rgba(0,0,0,0.35)',
      }}
    >
      {/* Número */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '52px',
          fontWeight: theme.fontWeights.bold,
          color: hovered ? theme.colors.accent : `${theme.colors.accent}99`,
          lineHeight: 1,
          marginBottom: '16px',
          transition: `color ${theme.transitions.normal}`,
          fontFamily: theme.fonts.primary,
        }}
      >
        {step.num}
      </motion.div>

      {/* Línea acento */}
      <motion.div
        style={{
          height: '3px',
          width: '40px',
          borderRadius: '2px',
          background: theme.colors.accent,
          margin: '0 auto 16px',
          originX: 0.5,
        }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <h3
        style={{
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.bold,
          color: hovered ? theme.colors.accent : theme.colors.text,
          marginBottom: '12px',
          transition: `color ${theme.transitions.normal}`,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontSize: theme.fontSizes.base,
          color: 'rgba(160,160,160,0.9)',
          lineHeight: 1.6,
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  )
}

export function Process() {
  return (
    <section
      id="process"
      style={{ position: 'relative', padding: '80px 24px', overflow: 'hidden' }}
    >
      {/* Fondo con imagen desenfocada */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/proceso/proceso.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: 'scale(1.05)',
        }}
      />
      {/* Overlay oscuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 15, 16, 0.65)',
        }}
      />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: theme.fontSizes.xxl,
            fontWeight: theme.fontWeights.bold,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Nuestro Proceso
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
