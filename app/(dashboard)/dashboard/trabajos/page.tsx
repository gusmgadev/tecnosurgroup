import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { trabajos as trabajosTable } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import TrabajosClient from './TrabajosClient'
import type { Trabajo } from '@/types/trabajo'
import { theme } from '@/lib/theme'

export default async function TrabajosPage() {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  const trabajos: Trabajo[] = await db
    .select()
    .from(trabajosTable)
    .orderBy(desc(trabajosTable.id))

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.dashboard.text, margin: 0 }}>
          Trabajos
        </h1>
      </div>
      <TrabajosClient initialTrabajos={trabajos} />
    </div>
  )
}
