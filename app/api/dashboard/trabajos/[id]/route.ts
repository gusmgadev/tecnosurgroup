import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { trabajos } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { del } from '@vercel/blob'
import { z } from 'zod'
import { TRABAJO_CATEGORIAS } from '@/types/trabajo'

const updateSchema = z.object({
  titulo:             z.string().min(2, 'Mínimo 2 caracteres').optional(),
  descripcion:        z.string().optional(),
  categoria:          z.enum(TRABAJO_CATEGORIAS).optional(),
  imagenes:           z.array(z.string().url('URL inválida')).max(12, 'Máximo 12 fotos').optional(),
  activo:             z.boolean().optional(),
  mostrar_en_landing: z.boolean().optional(),
})

async function requireSession() {
  const session = await auth()
  if (!session) return null
  return session
}

// Limpieza best-effort de fotos en Vercel Blob — nunca rompe la respuesta
async function deleteBlobs(urls: string[]) {
  if (urls.length === 0) return
  try {
    await del(urls)
  } catch {
    // ignorar errores de borrado remoto
  }
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
    const current = await db.select().from(trabajos).where(eq(trabajos.id, Number(id)))
    if (current.length === 0) {
      return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 })
    }
    const rows = await db
      .update(trabajos)
      .set({ ...parsed.data, updated_at: new Date() })
      .where(eq(trabajos.id, Number(id)))
      .returning()

    // Borrar de Blob las fotos que se quitaron en la edición
    const oldImages = current[0].imagenes ?? []
    const newImages = rows[0].imagenes ?? []
    await deleteBlobs(oldImages.filter((u) => !newImages.includes(u)))

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
    const current = await db.select().from(trabajos).where(eq(trabajos.id, Number(id)))
    if (current.length === 0) {
      return NextResponse.json({ error: 'Trabajo no encontrado' }, { status: 404 })
    }
    await db.delete(trabajos).where(eq(trabajos.id, Number(id)))
    await deleteBlobs(current[0].imagenes ?? [])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
