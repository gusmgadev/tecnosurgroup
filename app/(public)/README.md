# app/(public)/

Zona pública — accesible sin autenticación.

## Qué va acá
- `page.tsx` — Landing principal (ruta `/`)
- `servicios/[slug]/page.tsx` — Detalle de servicio
- `layout.tsx` — Layout con Navbar + Footer públicos

## Reglas
- Solo importar de `components/landing/` y `components/shared/`
- Nunca importar de `components/dashboard/`
- Todos los textos y colores vienen de `@/lib/theme`
