import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { clientes } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { z } from 'zod'

const createSchema = z.object({
  nombre:             z.string().min(2, 'Mínimo 2 caracteres'),
  tipo:               z.enum(['PARTICULAR', 'EMPRESA', 'COMERCIO']),
  email:              z.string().email('Email inválido').optional().or(z.literal('')),
  telefono:           z.string().optional(),
  direccion:          z.string().optional(),
  cuit:               z.string().optional(),
  rubro:              z.string().optional(),
  localidad:          z.string().optional(),
  notas:              z.string().optional(),
  activo:             z.boolean(),
  imagen:             z.string().optional(),
  pagina_web:         z.string().url('URL inválida').optional().or(z.literal('')),
  mostrar_en_landing: z.boolean(),
})

async function requireSession() {
  const session = await auth()
  if (!session) return null
  return session
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const data = await db.select().from(clientes).orderBy(asc(clientes.nombre))
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }
  try {
    const rows = await db.insert(clientes).values(parsed.data).returning()
    return NextResponse.json(rows[0], { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
