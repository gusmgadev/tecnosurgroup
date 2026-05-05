# components/dashboard/

Componentes exclusivos de la zona privada (panel de administración).

## Qué va acá
- `sidebar.tsx` — Navegación lateral del dashboard
- `header.tsx` — Cabecera del panel con usuario y acciones
- `data-table.tsx` — Tabla de datos reutilizable
- Subcarpetas por módulo: `clientes/`, `servicios/`, etc.

## Reglas
- Solo se usan en `app/(dashboard)/`
- Nunca importar desde `components/landing/`
- Ancho del sidebar: `theme.dashboard.sidebarWidth` / `theme.dashboard.sidebarWidthCollapsed`
