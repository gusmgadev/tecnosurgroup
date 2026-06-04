import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { db } from '@/lib/db'
import { contactos } from '@/lib/db/schema'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  nombre:   z.string().min(2, 'El nombre es requerido'),
  empresa:  z.string().optional(),
  email:    z.string().email('Email inválido'),
  telefono: z.string().optional(),
  mensaje:  z.string().min(10, 'El mensaje es muy corto'),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    )
  }

  const { nombre, empresa, email, telefono, mensaje } = parsed.data

  // Guardar en Neon (no fatal)
  try {
    await db.insert(contactos).values({
      nombre,
      empresa: empresa || null,
      email,
      telefono: telefono || null,
      mensaje,
    })
  } catch (e) {
    console.error('Error guardando contacto:', e)
  }

  // Enviar email al admin
  const adminEmail = process.env.ADMIN_EMAIL!
  const fromEmail  = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  const { error: emailError } = await resend.emails.send({
    from:    `Tecnosur Group <${fromEmail}>`,
    to:      adminEmail,
    subject: `Nuevo contacto desde pagina WEB - ${nombre}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1C1C1E;color:#fff;border-radius:8px;padding:32px;">
        <div style="margin-bottom:24px;border-bottom:2px solid #F2C230;padding-bottom:16px;">
          <h1 style="color:#F2C230;margin:0;font-size:22px;">Nuevo mensaje de contacto</h1>
          <p style="color:#999;margin:4px 0 0;font-size:13px;">Tecnosur Group — Formulario web</p>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#999;font-size:13px;width:100px;vertical-align:top;">Nombre</td>
            <td style="padding:10px 0;color:#fff;font-size:15px;font-weight:bold;">${nombre}</td>
          </tr>
          ${empresa ? `
          <tr>
            <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top;">Empresa</td>
            <td style="padding:10px 0;color:#fff;font-size:15px;">${empresa}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top;">Email</td>
            <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#F2C230;text-decoration:none;">${email}</a></td>
          </tr>
          ${telefono ? `
          <tr>
            <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top;">Teléfono</td>
            <td style="padding:10px 0;color:#fff;">${telefono}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:10px 0;color:#999;font-size:13px;vertical-align:top;">Mensaje</td>
            <td style="padding:10px 0;color:#fff;line-height:1.6;">${mensaje.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #333;">
          <a href="mailto:${email}?subject=Re: Tu consulta en Tecnosur Group"
             style="display:inline-block;background:#F2C230;color:#000;padding:10px 24px;border-radius:20px;text-decoration:none;font-weight:bold;font-size:14px;">
            Responder a ${nombre}
          </a>
        </div>
      </div>
    `,
  })

  if (emailError) {
    console.error('Error enviando email:', emailError)
    return NextResponse.json(
      { error: 'Mensaje guardado pero no se pudo enviar el email. Contactanos directamente.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
