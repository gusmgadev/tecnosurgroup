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
- **URL producción:** sin deploy aún
- **Fecha inicio:** 16/05/2026
- **Estado:** Etapa 1 — Landing completa + Dashboard de clientes funcional

---

## Fuente de verdad del diseño y datos

**Todos los valores visuales y de contenido están en `lib/theme.ts`.**
Antes de crear o modificar cualquier componente, adjuntar ese archivo.

| Qué necesitás saber            | Dónde está en theme.ts                |
|-------------------------------|---------------------------------------|
| Colores de la marca            | `theme.colors.*`                      |
| Tipografía y tamaños           | `theme.fonts.*` / `theme.fontSizes.*` |
| Logo (claro y blanco)          | `theme.logo.*`                        |
| Datos de contacto              | `theme.contact.*`                     |
| Textos del Hero                | `theme.hero.*`                        |
| Navegación y CTA del navbar    | `theme.navbar.*`                      |
| Descripción, redes, mapa       | `theme.footer.*`                      |
| Título/subtítulo sección clientes | `theme.clients.*`                  |
| Espaciado, radios, sombras     | `theme.spacing.*` / `theme.radii.*` / `theme.shadows.*` |
| Transiciones                   | `theme.transitions.*`                 |
| Rutas de auth y dashboard      | `theme.auth.*` / `theme.dashboard.*`  |

**Nunca hardcodear colores, fuentes ni textos en los componentes.**
Siempre importar: `import { theme } from '@/lib/theme'`

---

## Stack tecnológico

- **Framework:** Next.js 16.2.4 con App Router
- **Lenguaje:** TypeScript (strict)
- **Estilos:** Tailwind CSS v4 + estilos inline con `theme.*`
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** NextAuth.js v5 beta — Credentials provider, un solo admin via `.env.local`
- **Storage:** Supabase Storage — bucket `clientes-logos` (público)
- **Email:** Resend (instalado, no implementado aún)
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod
- **Deploy:** sin configurar

---

## Estructura de carpetas

```
TecnosurGroup/
│
├── app/
│   ├── (public)/                 # Zona pública — vacía, la landing está en app/page.tsx
│   ├── (auth)/
│   │   └── auth/
│   │       ├── layout.tsx        # Layout centrado fondo oscuro + logo blanco
│   │       └── signin/page.tsx   # Formulario de login
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── layout.tsx        # Layout con Sidebar + área de contenido
│   │       ├── page.tsx          # Redirect a /dashboard/clientes
│   │       └── clientes/
│   │           ├── page.tsx      # Server component — fetch inicial
│   │           └── ClientesClient.tsx  # Client component — CRUD completo
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # Handler NextAuth
│   │   ├── dashboard/clientes/
│   │   │   ├── route.ts          # GET (lista) + POST (crear)
│   │   │   └── [id]/route.ts     # PUT (editar) + DELETE (eliminar)
│   │   └── upload/logo/route.ts  # Upload imagen a Supabase Storage
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
│   │   ├── clients.tsx           # Grid de clientes desde Supabase (hover dorado)
│   │   ├── contact.tsx           # Formulario + info de contacto
│   │   └── footer.tsx
│   ├── dashboard/
│   │   └── sidebar.tsx           # Sidebar oscuro con logo blanco + logout
│   └── shared/                   # (vacío — para componentes compartidos futuros)
│
├── lib/
│   ├── theme.ts                  # ← FUENTE DE VERDAD
│   ├── supabase.ts               # Cliente browser (anon key)
│   └── auth.ts                   # Configuración NextAuth v5
│
├── services/
│   └── supabase-admin.ts         # Cliente server (service role — solo server side)
│
├── types/
│   ├── cliente.ts                # Tipos Cliente y ClienteLanding
│   └── next-auth.d.ts            # Augmentación tipos NextAuth
│
├── proxy.ts                      # Protección de rutas (Next.js 16 — reemplaza middleware.ts)
│
└── public/
    └── images/
        ├── logos/                # logo.png + logo-white.png + logofondoblanco.jpeg
        ├── hero/                 # hero-1.jpg, hero-2.jpg, hero-3.jpg
        └── clientes/             # (carpeta lista — logos se suben via Supabase Storage)
```

### Las 4 reglas de esta arquitectura

1. **`lib/theme.ts` es la única fuente de verdad** — colores, textos, datos de contacto, rutas de logos, todo vive ahí
2. **Componentes separados por zona** — `landing/` nunca importa de `dashboard/` y viceversa
3. **`services/supabase-admin.ts` solo en server** — nunca importarlo en Client Components
4. **Tipos centralizados** — todos los tipos TypeScript en `types/`

---

## Base de datos — Supabase

### Tabla `clientes`

| Campo               | Tipo        | Descripción                                  |
|--------------------|-------------|----------------------------------------------|
| id                 | serial PK   |                                              |
| nombre             | text        | Razón social o nombre                        |
| tipo               | varchar     | `'PARTICULAR'` / `'EMPRESA'` / `'COMERCIO'`  |
| email              | text        | Opcional                                     |
| telefono           | text        | Opcional                                     |
| direccion          | text        | Opcional — se muestra en landing (hover)     |
| localidad          | text        | Opcional — se muestra en tabla dashboard     |
| cuit               | text        | Opcional                                     |
| rubro              | text        | Opcional — se muestra en landing             |
| notas              | text        | Notas internas, no se muestran en landing    |
| activo             | boolean     | Default true                                 |
| imagen             | text        | URL pública de Supabase Storage              |
| pagina_web         | text        | Opcional                                     |
| mostrar_en_landing | boolean     | Default false — controla si aparece en `/`  |
| created_at         | timestamptz |                                              |
| updated_at         | timestamptz |                                              |

### Storage

- **Bucket:** `clientes-logos` (público)
- **Acceso:** solo server via `supabaseAdmin` en `/api/upload/logo`
- **Tipos permitidos:** JPG, PNG, WEBP, SVG — máx 5MB

---

## Autenticación

- **Provider:** Credentials (email + password)
- **Usuarios:** Un solo admin definido en `.env.local`
  - `ADMIN_EMAIL` — email del administrador
  - `ADMIN_PASSWORD` — contraseña
  - `AUTH_SECRET` — string aleatorio para firmar JWT
- **Protección:** `proxy.ts` redirige `/dashboard/*` a `/auth/signin` si no hay sesión
- **Para agregar más admins:** editar `.env.local` — no hay tabla de usuarios en DB

---

## Rutas y componentes existentes

### Rutas creadas

- `/` → landing principal (dinámico — fetcha clientes de Supabase)
- `/auth/signin` → login
- `/dashboard` → redirect a `/dashboard/clientes`
- `/dashboard/clientes` → gestión CRUD de clientes

### Componentes landing (`components/landing/`)

- `navbar.tsx` → navegación con logo circular, links a secciones, CTA Contactanos
- `hero.tsx` → slider 3 imágenes, ficha de trabajo en curso, stats (20+ años, 200+ equipos)
- `services.tsx` → 4 cards: Hidrogrúas, 3er Eje, Carrocerías, Taller Homologado
- `process.tsx` → 4 pasos: Consultoría → Presupuesto → Ejecución → Certificación
- `clients.tsx` → grid 2/3/4 cols, animación floating, hover con borde dorado + detalles
- `contact.tsx` → formulario + teléfono, email, WhatsApp, dirección
- `footer.tsx` → 4 columnas + Google Maps embed

### Componentes dashboard (`components/dashboard/`)

- `sidebar.tsx` → logo blanco, link a Clientes, botón logout

---

## Funcionalidades implementadas

- [x] Landing completa con todas las secciones
- [x] Sección Clientes en landing — muestra clientes con `mostrar_en_landing = true` desde Supabase
- [x] Autenticación con NextAuth v5 — Credentials provider, un admin via env vars
- [x] Protección de rutas privadas con `proxy.ts`
- [x] Dashboard layout con sidebar
- [x] CRUD completo de clientes (crear, editar, eliminar)
- [x] Upload de logo a Supabase Storage (`clientes-logos`)
- [x] Tabla de clientes con badges de estado, tipo y landing
- [x] Formulario con validación Zod + React Hook Form
- [x] Combobox de rubros con opción "Agregar nuevo"
- [ ] Formulario de contacto con envío de emails (Resend instalado, no implementado)
- [ ] SEO base (metadata, sitemap, robots)
- [ ] Deploy

---

## Pendientes y próximos pasos

### Próxima sesión

- Implementar envío de emails desde formulario de contacto (Resend ya está instalado)
- SEO: metadata dinámica, sitemap, robots.txt

### Backlog

- Deploy en Vercel
- Múltiples usuarios admin con tabla en Supabase
- Sección de trabajos realizados / portfolio
- Integración WhatsApp Business API

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
- **`supabaseAdmin` solo en server:** nunca importar `services/supabase-admin.ts` en Client Components o archivos con `'use client'`.
- **`force-dynamic` en `app/page.tsx`:** necesario para que la sección Clientes siempre traiga datos frescos de Supabase.
- **Tema oscuro:** fondo `#0F0F10`, cards `#1C1C1E`, acento dorado `#F2C230`. Botones primarios usan acento con texto negro `#000000`.
- **Logo en sidebar:** usar `theme.logo.pathWhite` (`logo-white.png`) sobre fondos oscuros.

---

**Última actualización:** 18/05/2026
**Actualizado por:** Claude (sesión implementación clientes)
