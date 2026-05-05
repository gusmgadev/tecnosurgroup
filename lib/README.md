# lib/

Configuraciones core, utilidades y fuente de verdad del diseño.

## Qué va acá
- `theme.ts` — FUENTE DE VERDAD: colores, tipografía, textos, rutas, datos de contacto
- `supabase.ts` — Cliente de Supabase para el browser
- `auth.ts` — Configuración de NextAuth v5
- `constants.ts` — Constantes globales del proyecto
- `utils.ts` — Funciones utilitarias puras

## Regla fundamental
`theme.ts` es la única fuente de verdad.
Ningún componente hardcodea colores, textos ni rutas:
`import { theme } from "@/lib/theme"`
