'use client'

import Image from 'next/image'
import { theme } from '@/lib/theme'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { SectionBanner } from '@/components/landing/section-banner'

export default function Clients() {
  return (
    <section
      id="clientes"
      style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh' }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/images/clientes/clientes.jpg"
        alt=""
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        sizes="100vw"
        quality={80}
      />
      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        zIndex: 1,
      }} />

      <SectionBanner
        label={theme.sectionHeaders.clients.label}
        description={theme.sectionHeaders.clients.description}
      />

      <div className="max-w-6xl mx-auto py-20 px-6 md:px-12" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            {theme.clients.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            {theme.clients.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {theme.clients.names.map((name) => (
            <ClientPill key={name} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientPill({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="px-5 py-2 rounded-full text-sm font-medium cursor-default select-none"
      style={{
        backgroundColor: theme.colors.secondary,
        border: `1px solid ${hovered ? theme.colors.accent : theme.colors.border}`,
        color: hovered ? theme.colors.accent : theme.colors.text,
        boxShadow: hovered ? `0 0 14px ${theme.colors.accent}40` : 'none',
        transition: `color ${theme.transitions.fast}, border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast}`,
      }}
    >
      {name}
    </motion.span>
  )
}
