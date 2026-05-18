'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '@/lib/theme'

function ServiceCard({ service, index }: { service: typeof theme.services.items[number]; index: number }) {
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
        background: theme.colors.secondary,
        borderRadius: theme.radii.lg,
        border: `1px solid ${hovered ? theme.colors.accent : theme.colors.border}`,
        overflow: 'hidden',
        cursor: 'default',
        transition: `border-color ${theme.transitions.normal}`,
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${theme.colors.accent}22`
          : '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px 28px',
        textAlign: 'center',
      }}
    >
      {/* Círculo con imagen */}
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `3px solid ${hovered ? theme.colors.accent : theme.colors.border}`,
          boxShadow: hovered ? `0 0 0 6px ${theme.colors.accent}22` : 'none',
          transition: `border-color ${theme.transitions.normal}, box-shadow ${theme.transitions.normal}`,
          marginBottom: '24px',
          flexShrink: 0,
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="180px"
        />
      </motion.div>

      {/* Línea acento */}
      <motion.div
        style={{
          height: '3px',
          width: '48px',
          borderRadius: '2px',
          background: theme.colors.accent,
          marginBottom: '16px',
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
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" style={{ background: theme.colors.background, padding: '80px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            marginBottom: '48px',
          }}
        >
          {theme.services.title}
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {theme.services.items.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
