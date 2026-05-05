# services/

Lógica de integración con APIs y servicios externos.

## Qué va acá
- `resend.ts` — Funciones de envío de emails (Resend API)
- `supabase-admin.ts` — Cliente Supabase con service role key (solo server-side)

## Reglas
- Solo se llaman desde `app/api/` (Route Handlers) — nunca desde componentes
- `supabase-admin.ts` usa `SUPABASE_SERVICE_ROLE_KEY` — no exponer al cliente
- Cada función exporta una operación clara: `sendContactEmail()`, `getUserById()`, etc.
