import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { contactos } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { theme } from '@/lib/theme'
import ContactosClient from './ContactosClient'

export default async function ContactosPage() {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  const data = await db
    .select()
    .from(contactos)
    .orderBy(desc(contactos.created_at))

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.dashboard.text, margin: 0 }}>
          Contactos
        </h1>
      </div>
      <ContactosClient initialContactos={data} />
    </div>
  )
}
