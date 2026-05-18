export type Cliente = {
  id: number
  nombre: string
  tipo: 'PARTICULAR' | 'EMPRESA' | 'COMERCIO'
  email: string | null
  telefono: string | null
  direccion: string | null
  localidad: string | null
  cuit: string | null
  rubro: string | null
  notas: string | null
  activo: boolean
  imagen: string | null
  pagina_web: string | null
  mostrar_en_landing: boolean
  created_at: string
}

export type ClienteLanding = {
  id: number
  nombre: string
  rubro: string | null
  telefono: string | null
  direccion: string | null
  imagen: string | null
  pagina_web: string | null
}
