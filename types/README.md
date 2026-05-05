# types/

Tipos TypeScript centralizados del proyecto.

## Qué va acá
- `index.ts` — Re-exporta todos los tipos
- `database.ts` — Tipos de tablas de Supabase
- `auth.ts` — Tipos de sesión y usuario
- `api.ts` — Tipos de requests y responses de la API

## Reglas
- Todos los tipos compartidos se definen acá — nunca inline en componentes
- Los componentes importan: `import type { X } from "@/types"`
- Usar `interface` para objetos con propiedades, `type` para unions y aliases
