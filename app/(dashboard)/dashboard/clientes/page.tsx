import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/services/supabase-admin'
import ClientesClient from './ClientesClient'
import type { Cliente } from '@/types/cliente'

export default async function ClientesPage() {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  const { data: clientes } = (await supabaseAdmin
    .from('clientes')
    .select('*')
    .order('nombre')) as { data: Cliente[] | null; error: unknown }

  const initialRubros = [...new Set(
    (clientes ?? []).map((c) => c.rubro).filter((r): r is string => Boolean(r))
  )].sort()

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
          Clientes
        </h1>
      </div>
      <ClientesClient initialClientes={clientes ?? []} initialRubros={initialRubros} />
    </div>
  )
}
