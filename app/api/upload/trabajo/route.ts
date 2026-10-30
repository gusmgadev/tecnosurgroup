import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
const MAX_FILES = 12

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const formData = await req.formData()
  const files = formData.getAll('files').filter((f): f is File => f instanceof File)

  if (files.length === 0) return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })
  if (files.length > MAX_FILES) return NextResponse.json({ error: `Máximo ${MAX_FILES} fotos por vez` }, { status: 400 })

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: `"${file.name}": tipo no permitido. Usá JPG, PNG o WEBP` }, { status: 400 })
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `"${file.name}" no puede superar ${MAX_SIZE_MB}MB` }, { status: 400 })
    }
  }

  try {
    const urls: string[] = []
    for (const file of files) {
      const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
      const fileName = `trabajos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const blob = await put(fileName, file, { access: 'public' })
      urls.push(blob.url)
    }
    return NextResponse.json({ urls })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
