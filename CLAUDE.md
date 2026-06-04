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

### Base de datos — Neon + Drizzle ORM
- `lib/db/index.ts` — cliente Drizzle (singleton con lazy init, solo server)
- `lib/db/schema.ts` — definición de tablas (`clientes`, `contactos`)
- `drizzle.config.ts` — configuración para migraciones
- **Nunca importar `lib/db` en archivos con `'use client'`**
- Para migraciones: `npx drizzle-kit push`

### Next.js 16 (breaking changes)
- El archivo de proxy/middleware se llama **`proxy.ts`** (no `middleware.ts`)
- Los `params` en route handlers son `Promise`: siempre `await params` antes de usar
- `searchParams` en pages también es `Promise`

### Autenticación
- Un solo admin definido en `.env.local` (`ADMIN_EMAIL` + `ADMIN_PASSWORD`)
- No hay tabla de usuarios en DB — no crearla sin pedido explícito
- Para verificar sesión en Server Components: `const session = await auth()`

### Email — Resend
- Dominio `tecnosurgroup.com` verificado en Resend (DKIM + SPF)
- **NO usar `replyTo`** — el servidor de Ferozo lo marca como spam (email externo en Reply-To de dominio propio)
- **NO usar em dash `—` en subjects** — causa encoding `â€"` que activa filtros de spam
- Subject actual: `"Nuevo contacto desde pagina WEB - {nombre}"`
- Los contactos se guardan en tabla `contactos` de Neon aunque falle el email

### Tema visual
- Fondo principal: `theme.colors.primary` (`#0F0F10`)
- Cards y paneles: `theme.colors.secondary` (`#1C1C1E`)
- Acento: `theme.colors.accent` (`#F2C230`) — botones primarios con texto negro `#000000`
- Logo sobre fondos oscuros: `theme.logo.pathWhite`

## Base de datos actual

- **Tablas:** `clientes` y `contactos` — ver estructura completa en `context/CONTEXT.md`
- **Storage:** Vercel Blob — logos subidos via `/api/upload/logo` (usa `BLOB_READ_WRITE_TOKEN`)

## Archivos que NO tocar sin revisar primero

- `proxy.ts` — protección de rutas, lógica sensible
- `.env.local` — credenciales, no commitear
- `lib/auth.ts` — configuración de autenticación
