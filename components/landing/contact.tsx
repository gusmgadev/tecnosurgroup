'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { theme } from '@/lib/theme'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: theme.colors.secondary,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.md,
    color: theme.colors.text,
    fontSize: theme.fontSizes.base,
    outline: 'none',
    transition: theme.transitions.fast,
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.sm,
  }

  return (
    <section id="contact" style={{ background: theme.colors.background, padding: '80px 24px' }}>
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
          Contactanos
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
          ¿Necesitás cotizar o tenés alguna consulta? Escribinos
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Info de contacto */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <a
                href={`tel:${theme.contact.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>Teléfono</div>
                  <div style={{ color: theme.colors.text, fontSize: theme.fontSizes.base }}>{theme.contact.phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${theme.contact.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>Email</div>
                  <div style={{ color: theme.colors.text, fontSize: theme.fontSizes.base }}>{theme.contact.email}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${theme.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>WhatsApp</div>
                  <div style={{ color: theme.colors.text, fontSize: theme.fontSizes.base }}>{theme.contact.phone}</div>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: theme.colors.accent + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} color={theme.colors.accent} />
                </div>
                <div>
                  <div style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.sm }}>Dirección</div>
                  <div style={{ color: theme.colors.text, fontSize: theme.fontSizes.base }}>{theme.contact.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div style={{ background: theme.colors.secondary, borderRadius: theme.radii.lg, padding: '32px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ color: theme.colors.text, fontSize: theme.fontSizes.lg, marginBottom: '8px' }}>Mensaje enviado</h3>
                <p style={{ color: theme.colors.textMuted }}>Te respondemos pronto</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Tu nombre"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: theme.colors.accent,
                    color: theme.colors.dark,
                    border: 'none',
                    borderRadius: theme.radii.full,
                    padding: '14px 28px',
                    fontSize: theme.fontSizes.base,
                    fontWeight: theme.fontWeights.bold,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    transition: theme.transitions.fast,
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