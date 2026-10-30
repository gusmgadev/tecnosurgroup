'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { theme } from '@/lib/theme'
import { CATEGORIA_LABELS, type TrabajoLanding, type TrabajoCategoria } from '@/types/trabajo'

export function WorksGallery({ trabajos }: { trabajos: TrabajoLanding[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trabajos.map((t, i) => (
          <WorkCard key={t.id} trabajo={t} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          trabajo={trabajos[openIndex]}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === null ? i : (i - 1 + trabajos.length) % trabajos.length))}
          onNext={() => setOpenIndex((i) => (i === null ? i : (i + 1) % trabajos.length))}
        />
      )}
    </>
  )
}

function WorkCard({ trabajo, onOpen }: { trabajo: TrabajoLanding; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const cover   = trabajo.imagenes[0]
  const extra   = trabajo.imagenes.length - 1

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onOpen}
      style={{
        backgroundColor: theme.colors.secondary,
        border: `1px solid ${hovered ? theme.colors.accent : theme.colors.border}`,
        borderRadius: theme.radii.md,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? `0 0 18px ${theme.colors.accent}30` : 'none',
        transition: `border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast}`,
      }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
        {cover ? (
          <Image
            src={cover}
            alt={trabajo.titulo}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.textMuted }}>
            <Images size={32} />
          </div>
        )}
        <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', backgroundColor: 'rgba(0,0,0,0.65)', border: `1px solid ${theme.colors.accent}60`, color: theme.colors.accent, borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium }}>
          {CATEGORIA_LABELS[trabajo.categoria as TrabajoCategoria] ?? trabajo.categoria}
        </span>
        {extra > 0 && (
          <span style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', backgroundColor: 'rgba(0,0,0,0.65)', color: theme.colors.text, borderRadius: theme.radii.full, fontSize: theme.fontSizes.xs }}>
            <Images size={12} /> +{extra}
          </span>
        )}
      </div>

      <div style={{ padding: '18px 20px' }}>
        <h3 style={{ margin: 0, fontSize: theme.fontSizes.lg, fontWeight: theme.fontWeights.bold, color: theme.colors.text, transition: `color ${theme.transitions.fast}` }}>
          {trabajo.titulo}
        </h3>
        {trabajo.descripcion && (
          <p style={{ margin: '8px 0 0', fontSize: theme.fontSizes.sm, color: theme.colors.textMuted, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {trabajo.descripcion}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function Lightbox({ trabajo, onClose, onPrev, onNext }: {
  trabajo: TrabajoLanding
  onClose: () => void
  onPrev:  () => void
  onNext:  () => void
}) {
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => { setPhotoIndex(0) }, [trabajo.id])

  const goPrev = useCallback(() => setPhotoIndex((i) => (i - 1 + trabajo.imagenes.length) % trabajo.imagenes.length), [trabajo.imagenes.length])
  const goNext = useCallback(() => setPhotoIndex((i) => (i + 1) % trabajo.imagenes.length), [trabajo.imagenes.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft'  && trabajo.imagenes.length > 1) goPrev()
      if (e.key === 'ArrowRight' && trabajo.imagenes.length > 1) goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, goPrev, goNext, trabajo.imagenes.length])

  const current = trabajo.imagenes[photoIndex]

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.text, padding: 8 }}
      >
        <X size={26} />
      </button>

      {/* Título */}
      <div style={{ position: 'absolute', top: 24, left: 24, maxWidth: '60%' }}>
        <h3 style={{ margin: 0, fontSize: theme.fontSizes.lg, fontWeight: theme.fontWeights.bold, color: theme.colors.text }}>{trabajo.titulo}</h3>
        <p style={{ margin: '4px 0 0', fontSize: theme.fontSizes.sm, color: theme.colors.accent }}>
          {CATEGORIA_LABELS[trabajo.categoria as TrabajoCategoria] ?? trabajo.categoria}
        </p>
      </div>

      {/* Imagen principal */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '1100px', height: 'min(72vh, 720px)' }}>
        {current && (
          <Image
            src={current}
            alt={`${trabajo.titulo} — foto ${photoIndex + 1}`}
            fill
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'contain' }}
          />
        )}

        {trabajo.imagenes.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Foto anterior"
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.colors.text }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={goNext}
              aria-label="Foto siguiente"
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.colors.text }}
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas + contador */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
        {trabajo.imagenes.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', maxWidth: '90vw', overflowX: 'auto', paddingBottom: '4px' }}>
            {trabajo.imagenes.map((url, i) => (
              <button
                key={url}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                style={{ flexShrink: 0, padding: 0, border: `2px solid ${i === photoIndex ? theme.colors.accent : 'transparent'}`, borderRadius: theme.radii.sm, overflow: 'hidden', cursor: 'pointer', background: 'none', lineHeight: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" style={{ width: 56, height: 42, objectFit: 'cover', display: 'block', opacity: i === photoIndex ? 1 : 0.55 }} />
              </button>
            ))}
          </div>
        )}
        <p style={{ margin: 0, fontSize: theme.fontSizes.xs, color: theme.colors.textMuted }}>
          {photoIndex + 1} / {trabajo.imagenes.length}
        </p>
      </div>
    </div>
  )
}
