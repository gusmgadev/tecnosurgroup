# app/(auth)/

Zona de autenticación — login, registro, recuperación de contraseña.

## Qué va acá
- `auth/signin/page.tsx` — Página de login
- `auth/register/page.tsx` — Registro (si aplica)
- `layout.tsx` — Layout mínimo sin navbar ni footer

## Reglas
- Redirige a `/dashboard` si ya hay sesión activa
- Rutas post-auth configuradas en `theme.auth.*`
- No importar de `components/landing/` ni `components/dashboard/`
