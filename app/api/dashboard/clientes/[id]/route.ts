import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { clientes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const updateSchema = z.object({
  nombre:             z.string().min(2, 'Mínimo 2 caracteres').optional(),
  tipo:               z.enum(['PARTICULAR', 'EMPRESA', 'COMERCIO']).optional(),
  email:              z.string().email('Email inválido').optional().or(z.literal('')),
  telefono:           z.string().optional(),
  direccion:          z.string().optional(),
  cuit:               z.string().optional(),
  rubro:              z.string().optional(),
  localidad:          z.string().optional(),
  notas:              z.string().optional(),
  activo:             z.boolean().optional(),
  imagen:             z.string().optional(),
  pagina_web:         z.string().url('URL inválida').optional().or(z.literal('')),
  mostrar_en_landing: z.boolean().optional(),
})

async function requireSession() {
  const session = await auth()
  if (!session) return null
  return session
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { id } = await params
  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }
  try {
    const rows = await db
      .update(clientes)
      .set({ ...parsed.data, updated_at: new Date() })
      .where(eq(clientes.id, Number(id)))
      .returning()
    return NextResponse.json(rows[0])
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { id } = await params
  try {
    await db.delete(clientes).where(eq(clientes.id, Number(id)))
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
