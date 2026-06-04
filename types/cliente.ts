import type { InferSelectModel } from 'drizzle-orm'
import type { clientes } from '@/lib/db/schema'

export type Cliente = InferSelectModel<typeof clientes>

export type ClienteLanding = {
  id: number
  nombre: string
  rubro: string | null
  telefono: string | null
  direccion: string | null
  imagen: string | null
  pagina_web: string | null
}
