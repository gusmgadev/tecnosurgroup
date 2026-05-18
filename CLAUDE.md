@AGENTS.md

# TecnosurGroup — Instrucciones para Claude

## Al iniciar cada sesión

Adjuntar siempre:
1. `context/CONTEXT.md` — descripción del proyecto, rutas, componentes
2. `lib/theme.ts` — fuente de verdad de colores, textos y datos

## Reglas críticas

### Fuente de verdad
- **Todos los colores, tipografías y textos viven en `lib/theme.ts`**
- Nunca hardcodear valores visuales en componentes
- Siempre importar: `import { theme } from '@/lib/theme'`

### Supabase
- `lib/supabase.ts` — solo para browser / Client Components
- `services/supabase-admin.ts` — solo para server (API routes, Server Components, page.tsx)
- **Nunca importar `supabase-admin` en archivos con `'use client'`**

### Next.js 16 (breaking changes)
- El archivo de proxy/middleware se llama **`proxy.ts`** (no `middleware.ts`)
- Los `params` en route handlers son `Promise`: siempre `await params` antes de usar
- `searchParams` en pages también es `Promise`

### Autenticación
- Un solo admin definido en `.env.local` (`ADMIN_EMAIL` + `ADMIN_PASSWORD`)
- No hay tabla de usuarios en Supabase — no crearla sin pedido explícito
- Para verificar sesión en Server Components: `const session = await auth()`

### Tema visual
- Fondo principal: `theme.colors.primary` (`#0F0F10`)
- Cards y paneles: `theme.colors.secondary` (`#1C1C1E`)
- Acento: `theme.colors.accent` (`#F2C230`) — botones primarios con texto negro `#000000`
- Logo sobre fondos oscuros: `theme.logo.pathWhite`

## Base de datos actual

- **Tabla:** `clientes` — ver estructura completa en `context/CONTEXT.md`
- **Storage:** bucket `clientes-logos` (público) — logos subidos via `/api/upload/logo`

## Archivos que NO tocar sin revisar primero

- `proxy.ts` — protección de rutas, lógica sensible
- `.env.local` — credenciales, no commitear
- `lib/auth.ts` — configuración de autenticación
