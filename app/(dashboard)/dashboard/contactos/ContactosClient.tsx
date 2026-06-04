'use client'

import { useState } from 'react'
import { Trash2, Mail, Phone, Building2, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'
import { theme } from '@/lib/theme'
import type { InferSelectModel } from 'drizzle-orm'
import type { contactos } from '@/lib/db/schema'

type Contacto = InferSelectModel<typeof contactos>

const tdStyle: React.CSSProperties = {
  padding: '16px', fontSize: theme.fontSizes.sm, color: theme.dashboard.text,
  borderBottom: `1px solid ${theme.dashboard.border}`, verticalAlign: 'top',
}

function formatDate(d: Date | string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function ContactoRow({ c, onDelete }: { c: Contacto; onDelete: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/dashboard/contactos/${c.id}`, { method: 'DELETE' })
    onDelete(c.id)
  }

  return (
    <>
      <tr>
        {/* Nombre + empresa */}
        <td style={tdStyle}>
          <span style={{ fontWeight: theme.fontWeights.medium, display: 'block' }}>{c.nombre}</span>
          {c.empresa && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: theme.fontSizes.xs, color: theme.dashboard.textMuted, marginTop: '2px' }}>
              <Building2 size={11} /> {c.empresa}
            </span>
          )}
        </td>

        {/* Contacto */}
        <td style={tdStyle}>
          <a href={`mailto:${c.email}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: theme.colors.accent, textDecoration: 'none', fontSize: theme.fontSizes.sm, fontWeight: theme.fontWeights.medium }}>
            <Mail size={13} /> {c.email}
          </a>
          {c.telefono && (
            <a href={`tel:${c.telefono}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: theme.dashboard.textMuted, textDecoration: 'none', fontSize: theme.fontSizes.xs, marginTop: '4px' }}>
              <Phone size={11} /> {c.telefono}
            </a>
          )}
        </td>

        {/* Mensaje */}
        <td style={{ ...tdStyle, maxWidth: '340px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            <MessageSquare size={13} style={{ color: theme.dashboard.textMuted, flexShrink: 0, marginTop: '2px' }} />
            <span style={{ color: theme.dashboard.textMuted, lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: expanded ? undefined : 2, WebkitBoxOrient: 'vertical' as const }}>
              {c.mensaje}
            </span>
          </div>
          {c.mensaje.length > 100 && (
            <button onClick={() => setExpanded(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px', background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.accent, fontSize: theme.fontSizes.xs, padding: 0 }}>
              {expanded ? <><ChevronUp size={12} /> Ver menos</> : <><ChevronDown size={12} /> Ver más</>}
            </button>
          )}
        </td>

        {/* Fecha */}
        <td style={{ ...tdStyle, color: theme.dashboard.textMuted, whiteSpace: 'nowrap', fontSize: theme.fontSizes.xs }}>
          {formatDate(c.created_at)}
        </td>

        {/* Acciones */}
        <td style={{ ...tdStyle, textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
            <a
              href={`mailto:${c.email}?subject=Re: Tu consulta en Tecnosur Group`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: `${theme.colors.accent}18`, border: `1px solid ${theme.colors.accent}44`, borderRadius: theme.radii.sm, color: theme.colors.accent, fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium, textDecoration: 'none' }}
            >
              <Mail size={12} /> Responder
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{ display: 'flex', alignItems: 'center', padding: '5px 8px', background: 'none', border: `1px solid ${theme.colors.error}44`, borderRadius: theme.radii.sm, cursor: deleting ? 'not-allowed' : 'pointer', color: theme.colors.error, opacity: deleting ? 0.5 : 1 }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      </tr>
    </>
  )
}

export default function ContactosClient({ initialContactos }: { initialContactos: Contacto[] }) {
  const [contactosList, setContactosList] = useState(initialContactos)

  function handleDelete(id: number) {
    setContactosList(prev => prev.filter(c => c.id !== id))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.dashboard.textMuted }}>
          {contactosList.length} mensaje{contactosList.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ backgroundColor: theme.dashboard.cardBg, borderRadius: theme.radii.md, border: `1px solid ${theme.dashboard.border}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Nombre', 'Contacto', 'Mensaje', 'Fecha', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i === 4 ? 'right' : 'left', padding: '12px 16px', fontSize: theme.fontSizes.xs, fontWeight: theme.fontWeights.medium, color: theme.dashboard.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${theme.dashboard.border}`, backgroundColor: theme.dashboard.thBg }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contactosList.length === 0 && (
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: 'center', color: theme.dashboard.textMuted, padding: '48px 16px' }}>
                  No hay mensajes de contacto aún
                </td>
              </tr>
            )}
            {contactosList.map(c => (
              <ContactoRow key={c.id} c={c} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
