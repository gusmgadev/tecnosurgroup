# app/(dashboard)/

Zona privada — requiere sesión activa. Protegida por middleware.

## Qué va acá
- `dashboard/page.tsx` — Panel principal
- `dashboard/clientes/page.tsx` — Gestión de clientes
- `dashboard/servicios/page.tsx` — Gestión de servicios
- `layout.tsx` — Layout con Sidebar + Header del dashboard

## Reglas
- Solo importar de `components/dashboard/` y `components/shared/`
- Acceso protegido via `middleware.ts`
- Dimensiones del sidebar en `theme.dashboard.*`
