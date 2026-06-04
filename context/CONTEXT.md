# CONTEXT.md — TecnosurGroup

> **Cómo usar este archivo:**
> 1. Al iniciar cada chat con la IA, adjuntarlo junto con `lib/theme.ts`
> 2. Al terminar cada sesión, actualizar "Funcionalidades implementadas" y "Pendientes"
>
> **Regla fundamental:** Los valores de colores, tipografía, textos, logos,
> contacto y navegación NO se escriben aquí — todos viven en `lib/theme.ts`.
> Este archivo describe el proyecto. `theme.ts` describe el diseño y los datos.

---

## Descripción general

- **Proyecto:** TecnosurGroup — Landing + Panel de administración
- **Cliente:** Tecnosur Group
- **Rubro:** Ingeniería — Equipos de izaje e integración vehicular (Hidrogrúas, 3er Eje, Carrocerías)
- **Objetivo:** Landing pública para captar clientes + dashboard privado para gestión de clientes
- **URL producción:** tecnosurgroup.com (deploy en Vercel)
- **Fecha inicio:** 16/05/2026
- **Estado:** Etapa 1 completa — Landing + Dashboard de clientes + Dashboard de contactos + Email funcional

---

## Fuente de verdad del diseño y datos

**Todos los valores visuales y de contenido están en `lib/theme.ts`.**
Antes de crear o modificar cualquier componente, adjuntar ese archivo.

| Qué necesitás saber               | Dónde está en theme.ts                |
|----------------------------------|---------------------------------------|
| Colores de la marca               | `theme.colors.*`                      |
| Tipografía y tamaños              | `theme.fonts.*` / `theme.fontSizes.*` |
| Logo (claro y blanco)             | `theme.logo.*`                        |
| Datos de contacto                 | `theme.contact.*`                     |
| Textos del Hero                   | `theme.hero.*`                        |
| Navegación y CTA del navbar       | `theme.navbar.*`                      |
| Descripción, redes, mapa          | `theme.footer.*`                      |
| Título/subtítulo sección clientes | `theme.clients.*`                     |
| Espaciado, radios, sombras        | `theme.spacing.*` / `theme.radii.*` / `theme.shadows.*` |
| Transiciones                      | `theme.transitions.*`                 |
| Rutas de auth y dashboard         | `theme.auth.*` / `theme.dashboard.*`  |

**Nunca hardcodear colores, fuentes ni textos en los componentes.**
Siempre importar: `import { theme } from '@/lib/theme'`

---

## Stack tecnológico

- **Framework:** Next.js 16.2.4 con App Router
- **Lenguaje:** TypeScript (strict)
- **Estilos:** Tailwind CSS v4 + estilos inline con `theme.*`
- **Base de datos:** Neon (PostgreSQL serverless) con Drizzle ORM
- **Autenticación:** NextAuth.js v5 beta — Credentials provider, un solo admin via `.env.local`
- **Storage:** Vercel Blob — logos de clientes subidos via `/api/upload/logo`
- **Email:** Resend — dominio `tecnosurgroup.com` verificado, funcional
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod
- **Deploy:** Vercel (producción en tecnosurgroup.com)

---

## Variables de entorno requeridas

| Variable              | Descripción                                      | Dónde se usa         |
|----------------------|--------------------------------------------------|----------------------|
| `DATABASE_URL`        | Connection string Neon (pooled)                  | `lib/db/index.ts`    |
| `RESEND_API_KEY`      | API key de Resend                                | `app/api/contact/`   |
| `RESEND_FROM_EMAIL`   | `info@tecnosurgroup.com`                         | `app/api/contact/`   |
| `ADMIN_EMAIL`         | `info@tecnosurgroup.com` — destino emails + login | auth + contact       |
| `ADMIN_PASSWORD`      | Contraseña del admin                             | `lib/auth.ts`        |
| `AUTH_SECRET`         | String aleatorio para firmar JWT                 | `lib/auth.ts`        |
| `AUTH_URL`            | URL base (ej: `https://tecnosurgroup.com`)       | NextAuth             |
| `BLOB_READ_WRITE_TOKEN` | Token de Vercel Blob                           | `app/api/upload/`    |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app                            | client side          |

**Importante:** en Vercel, todas estas variables deben estar configuradas en Settings → Environment Variables.

---

## Estructura de carpetas

```
TecnosurGroup/
│
├── app/
│   ├── (auth)/
│   │   └── auth/
│   │       ├── layout.tsx        # Layout centrado fondo oscuro + logo blanco
│   │       └── signin/page.tsx   # Formulario de login
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── layout.tsx        # Layout con Sidebar + área de contenido
│   │       ├── page.tsx          # Redirect a /dashboard/clientes
│   │       ├── clientes/
│   │       │   ├── page.tsx      # Server component — fetch inicial
│   │       │   └── ClientesClient.tsx  # Client component — CRUD completo
│   │       └── contactos/
│   │           ├── page.tsx      # Server component — fetch inicial (ordenado desc)
│   │           └── ContactosClient.tsx  # Client component — tabla + eliminar
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Handler NextAuth
│   │   ├── contact/route.ts      # POST — recibe formulario, guarda en DB, envía email
│   │   ├── dashboard/
│   │   │   ├── clientes/
│   │   │   │   ├── route.ts      # GET (lista) + POST (crear)
│   │   │   │   └── [id]/route.ts # PUT (editar) + DELETE (eliminar)
│   │   │   └── contactos/
│   │   │       └── [id]/route.ts # DELETE (eliminar mensaje)
│   │   └── upload/logo/route.ts  # Upload imagen a Vercel Blob
│   ├── page.tsx                  # Landing principal (force-dynamic)
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── landing/
│   │   ├── navbar.tsx
│   │   ├── hero.tsx              # Slider 3 imágenes con ficha de trabajo en curso
│   │   ├── services.tsx          # 4 cards de servicios
│   │   ├── process.tsx           # 4 pasos del proceso
│   │   ├── clients.tsx           # Grid de clientes desde Neon (hover dorado)
│   │   ├── contact.tsx           # Formulario + info de contacto
│   │   ├── section-banner.tsx    # Banner de sección reutilizable
│   │   └── footer.tsx
│   ├── dashboard/
│   │   └── sidebar.tsx           # Sidebar oscuro con logo blanco + logout
│   └── shared/                   # (vacío — para componentes compartidos futuros)
│
├── lib/
│   ├── theme.ts                  # ← FUENTE DE VERDAD
│   ├── auth.ts                   # Configuración NextAuth v5
│   └── db/
│       ├── index.ts              # Cliente Drizzle (singleton con lazy init)
│       └── schema.ts             # Tablas: clientes, contactos
│
├── types/
│   ├── cliente.ts                # Tipos Cliente y ClienteLanding
│   └── next-auth.d.ts            # Augmentación tipos NextAuth
│
├── drizzle.config.ts             # Config para drizzle-kit (migraciones)
├── proxy.ts                      # Protección de rutas (Next.js 16 — reemplaza middleware.ts)
│
└── public/
    └── images/
        ├── logos/                # logo.png + logo-white.png + logofondoblanco.jpeg
        ├── hero/                 # hero-1.jpg, hero-2.jpg, hero-3.jpg
        └── contacto/             # tecnosur.jpeg (fondo sección contacto)
```

### Las 4 reglas de esta arquitectura

1. **`lib/theme.ts` es la única fuente de verdad** — colores, textos, datos de contacto, rutas de logos, todo vive ahí
2. **Componentes separados por zona** — `landing/` nunca importa de `dashboard/` y viceversa
3. **`lib/db` solo en server** — nunca importarlo en Client Components (`'use client'`)
4. **Tipos centralizados** — todos los tipos TypeScript en `types/`

---

## Base de datos — Neon + Drizzle ORM

**ORM:** Drizzle | **DB:** Neon PostgreSQL (serverless)
**Migraciones:** `npx drizzle-kit push`

### Tabla `clientes`

| Campo               | Tipo        | Descripción                                  |
|--------------------|-------------|----------------------------------------------|
| id                 | serial PK   |                                              |
| nombre             | text        | Razón social o nombre                        |
| tipo               | varchar(20) | `'PARTICULAR'` / `'EMPRESA'` / `'COMERCIO'`  |
| email              | text        | Opcional                                     |
| telefono           | text        | Opcional                                     |
| direccion          | text        | Opcional — se muestra en landing (hover)     |
| localidad          | text        | Opcional — se muestra en tabla dashboard     |
| cuit               | text        | Opcional                                     |
| rubro              | text        | Opcional — se muestra en landing             |
| notas              | text        | Notas internas, no se muestran en landing    |
| activo             | boolean     | Default true                                 |
| imagen             | text        | URL pública de Vercel Blob                   |
| pagina_web         | text        | Opcional                                     |
| mostrar_en_landing | boolean     | Default false — controla si aparece en `/`  |
| created_at         | timestamptz |                                              |
| updated_at         | timestamptz |                                              |

### Tabla `contactos`

| Campo      | Tipo        | Descripción                              |
|-----------|-------------|------------------------------------------|
| id         | bigserial PK |                                         |
| nombre     | text        | Nombre del contacto (requerido, min 2)   |
| empresa    | text        | Opcional                                 |
| email      | text        | Email del contacto (requerido)           |
| telefono   | text        | Opcional                                 |
| mensaje    | text        | Cuerpo del mensaje (requerido, min 10)   |
| created_at | timestamptz | Auto                                     |

### Storage — Vercel Blob

- **Tipo:** Vercel Blob (reemplazó a Supabase Storage)
- **Acceso:** via `BLOB_READ_WRITE_TOKEN` en `/api/upload/logo`
- **Tipos permitidos:** JPG, PNG, WEBP, SVG — máx 5MB

---

## Autenticación

- **Provider:** Credentials (email + password)
- **Usuarios:** Un solo admin definido en `.env.local`
  - `ADMIN_EMAIL` — email del administrador (también recibe emails de contacto)
  - `ADMIN_PASSWORD` — contraseña
  - `AUTH_SECRET` — string aleatorio para firmar JWT
- **Protección:** `proxy.ts` redirige `/dashboard/*` a `/auth/signin` si no hay sesión
- **Para agregar más admins:** editar `.env.local` — no hay tabla de usuarios en DB

---

## Email — Resend

- **Dominio verificado:** `tecnosurgroup.com` (DKIM + SPF en Resend)
- **From:** `Tecnosur Group <info@tecnosurgroup.com>`
- **To:** `ADMIN_EMAIL` (`info@tecnosurgroup.com`)
- **Subject:** `Nuevo contacto desde pagina WEB - {nombre}`
- **Flujo:** formulario → `/api/contact` → guarda en tabla `contactos` → envía email via Resend

### Reglas anti-spam (aprendidas en producción)

- **NO usar `replyTo`** — Ferozo (hosting del email) marca como spam cuando el Reply-To es un email externo distinto al From (patrón de phishing)
- **NO usar em dash `—` en el subject** — se codifica como `â€"` y activa filtros de spam
- **Usar subjects con solo ASCII simple** — sin caracteres especiales ni Unicode en el asunto
- El botón "Responder" en el cuerpo del HTML tiene el `mailto:` del contacto (reemplaza al replyTo)

---

## Rutas y componentes existentes

### Rutas creadas

- `/` → landing principal (dinámico — fetcha clientes de Neon)
- `/auth/signin` → login
- `/dashboard` → redirect a `/dashboard/clientes`
- `/dashboard/clientes` → gestión CRUD de clientes
- `/dashboard/contactos` → mensajes del formulario web (solo eliminar)

### Componentes landing (`components/landing/`)

- `navbar.tsx` → navegación con logo circular, links a secciones, CTA Contactanos
- `hero.tsx` → slider 3 imágenes, ficha de trabajo en curso, stats (20+ años, 200+ equipos)
- `services.tsx` → 4 cards: Hidrogrúas, 3er Eje, Carrocerías, Taller Homologado
- `process.tsx` → 4 pasos: Consultoría → Presupuesto → Ejecución → Certificación
- `clients.tsx` → grid 2/3/4 cols, animación floating, hover con borde dorado + detalles
- `contact.tsx` → formulario + teléfono, email, WhatsApp, dirección. Envía a `/api/contact`
- `section-banner.tsx` → banner reutilizable con label y descripción de sección
- `footer.tsx` → 4 columnas + Google Maps embed

### Componentes dashboard (`components/dashboard/`)

- `sidebar.tsx` → logo blanco, links a Clientes y Contactos, botón logout

---

## Funcionalidades implementadas

- [x] Landing completa con todas las secciones
- [x] SEO — metadata, sitemap, robots.txt
- [x] Sección Clientes en landing — muestra clientes con `mostrar_en_landing = true` desde Neon
- [x] Autenticación con NextAuth v5 — Credentials provider, un admin via env vars
- [x] Protección de rutas privadas con `proxy.ts`
- [x] Dashboard layout con sidebar
- [x] CRUD completo de clientes (crear, editar, eliminar)
- [x] Upload de logo a Vercel Blob (`/api/upload/logo`)
- [x] Tabla de clientes con badges de estado, tipo y landing
- [x] Formulario con validación Zod + React Hook Form
- [x] Combobox de rubros con opción "Agregar nuevo"
- [x] Formulario de contacto — guarda en DB + envía email via Resend
- [x] Dashboard de Contactos — tabla con mensajes, responder y eliminar
- [x] Deploy en Vercel (tecnosurgroup.com)

---

## Pendientes y próximos pasos

### Backlog

- Múltiples usuarios admin con tabla en DB
- Sección de trabajos realizados / portfolio
- Integración WhatsApp Business API
- Marcar contactos como leídos/respondidos en dashboard

---

## Convenciones del proyecto

- **Idioma del código:** inglés (variables, funciones) / español (textos UI)
- **Idioma de la UI:** español
- **Mensajes de error:** siempre en español
- **Nombres de archivos:** kebab-case (ej: `contact-form.tsx`)
- **Componentes:** PascalCase (ej: `ContactForm`)
- **Variables:** camelCase (ej: `isLoading`)
- **Estilos:** Tailwind para layout/spacing + `theme.*` para colores y valores de diseño
- **Imports:** absolutos desde raíz con `@/` (ej: `@/lib/theme`)
- **Comentarios:** en español

---

## Notas especiales del proyecto

- **Next.js 16 breaking change:** el archivo de protección de rutas se llama `proxy.ts` (no `middleware.ts`). Los `params` en route handlers son `Promise<{...}>` — siempre usar `await params`.
- **`lib/db` solo en server:** nunca importar en Client Components o archivos con `'use client'`. Usar en page.tsx (Server Components) o API routes.
- **`force-dynamic` en `app/page.tsx`:** necesario para que la sección Clientes siempre traiga datos frescos de Neon.
- **Tema oscuro:** fondo `#0F0F10`, cards `#1C1C1E`, acento dorado `#F2C230`. Botones primarios usan acento con texto negro `#000000`.
- **Logo en sidebar:** usar `theme.logo.pathWhite` (`logo-white.png`) sobre fondos oscuros.
- **Drizzle schema:** al agregar columnas nuevas a la DB, actualizar `lib/db/schema.ts` y correr `npx drizzle-kit push`.

---

**Última actualización:** 04/06/2026
**Actualizado por:** Claude (sesión — email contacto + migración Neon/Vercel Blob)
