# app/api/

Endpoints del backend (Route Handlers de Next.js).

## Qué va acá
- `contact/route.ts` — Envío de emails via Resend
- `dashboard/route.ts` — Endpoints privados del dashboard
- `auth/[...nextauth]/route.ts` — Handler de NextAuth v5

## Reglas
- Los endpoints solo llaman funciones de `services/` — sin lógica inline
- Los endpoints privados verifican sesión antes de procesar
- Nunca importar el cliente Supabase admin directamente — usar `services/supabase-admin.ts`
