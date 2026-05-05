# hooks/

Custom hooks de React para lógica reutilizable.

## Qué va acá
- `use-session.ts` — Hook de sesión de usuario (NextAuth)
- `use-mobile.ts` — Detección de viewport mobile
- `use-toast.ts` — Sistema de notificaciones/toasts

## Convención de nombres
- Archivos en kebab-case: `use-nombre-del-hook.ts`
- Función exportada en camelCase con prefijo `use`: `useSession`, `useMobile`
- Sin lógica de negocio específica de un módulo — solo comportamiento reutilizable
