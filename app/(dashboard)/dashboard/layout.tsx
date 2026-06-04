import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/sidebar'
import { theme } from '@/lib/theme'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          backgroundColor: theme.dashboard.bg,
          padding: '32px',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  )
}
