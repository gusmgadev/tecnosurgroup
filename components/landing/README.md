# components/landing/

Componentes exclusivos de la zona pública (landing page).

## Qué va acá
- `navbar.tsx` — Barra de navegación pública
- `hero.tsx` — Sección hero con slider de imágenes
- `footer.tsx` — Pie de página con mapa, redes y navegación
- `contact-form.tsx` — Formulario de contacto con validación
- `services-section.tsx`, `clients-section.tsx`, `process-section.tsx`, etc.

## Reglas
- Solo se usan en `app/(public)/`
- Nunca importar desde `components/dashboard/`
- Textos del hero en `theme.hero.*`, footer en `theme.footer.*`, nav en `theme.navbar.*`
