import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { trabajos } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { z } from 'zod'
import { TRABAJO_CATEGORIAS } from '@/types/trabajo'

const createSchema = z.object({
  titulo:             z.string().min(2, 'Mínimo 2 caracteres'),
  descripcion:        z.string().optional(),
  categoria:          z.enum(TRABAJO_CATEGORIAS),
  imagenes:           z.array(z.string().url('URL inválida')).max(12, 'Máximo 12 fotos'),
  activo:             z.boolean(),
  mostrar_en_landing: z.boolean(),
})

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const data = await db.select().from(trabajos).orderBy(desc(trabajos.id))
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }
  try {
    const rows = await db.insert(trabajos).values(parsed.data).returning()
    return NextResponse.json(rows[0], { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
