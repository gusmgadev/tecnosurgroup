import type { InferSelectModel } from 'drizzle-orm'
import type { trabajos } from '@/lib/db/schema'

export type Trabajo = InferSelectModel<typeof trabajos>

export const TRABAJO_CATEGORIAS = ['HIDROGRUAS', 'TERCER_EJE', 'CARROCERIAS', 'TALLER'] as const
export type TrabajoCategoria = (typeof TRABAJO_CATEGORIAS)[number]

export const CATEGORIA_LABELS: Record<TrabajoCategoria, string> = {
  HIDROGRUAS:  'Hidrogrúas',
  TERCER_EJE:  '3er Eje',
  CARROCERIAS: 'Carrocerías',
  TALLER:      'Taller Homologado',
}

// Versión serializable para pasar a Client Components (sin timestamps de DB)
export type TrabajoLanding = {
  id:          number
  titulo:      string
  descripcion: string | null
  categoria:   string
  imagenes:    string[]
}
