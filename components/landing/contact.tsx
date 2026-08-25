'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { theme } from '@/lib/theme'
import { SectionBanner } from '@/components/landing/section-banner'

export function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:   form.name,
          empresa:  form.company || undefined,
          email:    form.email,
          telefono: form.phone || undefined,
          mensaje:  form.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error al enviar el mensaje. Intentá de nuevo.')
        return
      }

      setSent(true)
      setForm({ name: '', company: '', email: '', phone: '', message: '' })
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: theme.radii.md,
    color: '#ffffff',
    fontSize: theme.fontSizes.base,
    outline: 'none',
    transition: theme.transitions.fast,
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: 'rgba(255,255,255,0.65)',
    fontSize: theme.fontSizes.sm,
  }

  return (
    <section id="contact" style={{ position: 'relative', overflow: 'hidden', minHeight: '100dvh' }}>

      {/* Imagen de fondo */}
      <Image
        src="/images/contacto/tecnosur.jpeg"
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
        backgroundColor: 'rgba(0,0,0,0.72)',
        zIndex: 1,
      }} />

      <SectionBanner
        label={theme.sectionHeaders.contact.label}
        description={theme.sectionHeaders.contact.description}
        anchorId="contact"
      />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <h2
          style={{
            fontSize: theme.fontSizes.xl,
            fontWeight: theme.fontWeights.bold,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Contactanos
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.60)',
            textAlign: 'center',
            marginBottom: '28px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: theme.fontSizes.sm,
          }}
        >
          ¿Necesitás cotizar o tenés alguna consulta? Escribinos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Info de contacto */}
          <div style={{
            background: 'rgba(15,15,16,0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: theme.radii.lg,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.10)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={`tel:${theme.contact.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: theme.fontSizes.sm }}>Teléfono</div>
                  <div style={{ color: '#ffffff', fontSize: theme.fontSizes.base }}>{theme.contact.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${theme.contact.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: theme.fontSizes.sm }}>Email</div>
                  <div style={{ color: '#ffffff', fontSize: theme.fontSizes.base }}>{theme.contact.email}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${theme.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: theme.fontSizes.sm }}>WhatsApp</div>
                  <div style={{ color: '#ffffff', fontSize: theme.fontSizes.base }}>{theme.contact.phone}</div>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: theme.fontSizes.sm }}>Dirección</div>
                  <div style={{ color: '#ffffff', fontSize: theme.fontSizes.base }}>{theme.contact.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div style={{
            background: 'rgba(15,15,16,0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: theme.radii.lg,
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.10)',
          }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ color: '#ffffff', fontSize: theme.fontSizes.lg, marginBottom: '8px' }}>Mensaje enviado</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)' }}>Te respondemos pronto</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Nombre *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Empresa</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      placeholder="Tu empresa"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Teléfono</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      placeholder="Tu teléfono"
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                {error && (
                  <p style={{ color: '#ff6b6b', fontSize: theme.fontSizes.sm, textAlign: 'center' }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: theme.colors.accent,
                    color: theme.colors.dark,
                    border: 'none',
                    borderRadius: theme.radii.full,
                    padding: '10px 24px',
                    fontSize: theme.fontSizes.base,
                    fontWeight: theme.fontWeights.bold,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    transition: theme.transitions.fast,
                    alignSelf: 'center',
                  }}
                >
                  {sending ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
