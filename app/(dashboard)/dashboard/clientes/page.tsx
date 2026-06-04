import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { clientes as clientesTable } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import ClientesClient from './ClientesClient'
import type { Cliente } from '@/types/cliente'
import { theme } from '@/lib/theme'

export default async function ClientesPage() {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  const clientes: Cliente[] = await db
    .select()
    .from(clientesTable)
    .orderBy(asc(clientesTable.nombre))

  const initialRubros = [...new Set(
    clientes.map((c) => c.rubro).filter((r): r is string => Boolean(r))
  )].sort()

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.dashboard.text, margin: 0 }}>
          Clientes
        </h1>
      </div>
      <ClientesClient initialClientes={clientes} initialRubros={initialRubros} />
    </div>
  )
}
