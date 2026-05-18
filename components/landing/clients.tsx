'use client'

import { theme } from '@/lib/theme'
import Image from 'next/image'
import { useState } from 'react'
import { Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ClienteLanding } from '@/types/cliente'

export default function Clients({ clientes }: { clientes: ClienteLanding[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  if (clientes.length === 0) return null

  return (
    <section
      id="clientes"
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: theme.colors.primary, scrollMarginTop: '64px' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.text }}>
            {theme.clients.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            {theme.clients.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {clientes.map((client, idx) => (
            <motion.div
              key={client.id}
              className="relative h-52 rounded-xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: theme.colors.secondary,
                border: hoveredIdx === idx
                  ? `2px solid ${theme.colors.accent}`
                  : `1px solid ${theme.colors.border}`,
                transition: `border ${theme.transitions.fast}`,
              }}
              animate={{ y: [0, -3, 0, 3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.4, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Normal state */}
              <div
                className="absolute inset-0 p-3 flex flex-col items-center justify-center"
                style={{ opacity: hoveredIdx === idx ? 0 : 1, transition: `opacity ${theme.transitions.fast}` }}
              >
                <div className="w-20 h-20 relative mb-2 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                  {client.imagen ? (
                    <Image src={client.imagen} alt={client.nombre} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-center" style={{ color: theme.colors.primary }}>
                      {client.nombre.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-center leading-tight" style={{ color: theme.colors.text }}>
                  {client.nombre}
                </h3>
                {client.rubro && (
                  <p className="text-xs text-center mt-1" style={{ color: theme.colors.textMuted }}>
                    {client.rubro}
                  </p>
                )}
              </div>

              {/* Hover state */}
              <div
                className="absolute inset-0 p-3 flex flex-col justify-center"
                style={{ backgroundColor: theme.colors.secondary, opacity: hoveredIdx === idx ? 1 : 0, transition: `opacity ${theme.transitions.fast}` }}
              >
                <div className="w-16 h-16 relative mx-auto mb-2 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                  {client.imagen ? (
                    <Image src={client.imagen} alt={client.nombre} fill className="object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ color: theme.colors.primary }}>
                      {client.nombre.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-bold text-center leading-tight mb-1" style={{ color: theme.colors.text }}>
                  {client.nombre}
                </h3>
                {client.rubro && (
                  <p className="text-xs text-center mb-2" style={{ color: theme.colors.textMuted }}>{client.rubro}</p>
                )}
                <div className="pt-2" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                  {client.direccion && (
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <MapPin size={10} style={{ color: theme.colors.accent, flexShrink: 0 }} />
                      <span className="text-[10px] truncate" style={{ color: theme.colors.textMuted }}>{client.direccion}</span>
                    </div>
                  )}
                  {client.telefono && (
                    <div className="flex items-center gap-1 justify-center">
                      <Phone size={10} style={{ color: theme.colors.accent, flexShrink: 0 }} />
                      <span className="text-[10px]" style={{ color: theme.colors.textMuted }}>{client.telefono}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
