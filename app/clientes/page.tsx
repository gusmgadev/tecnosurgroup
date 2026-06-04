import { Navbar }    from '@/components/landing/navbar'
import Clients        from '@/components/landing/clients'
import { CtaBanner }  from '@/components/landing/cta-banner'
import { Footer }     from '@/components/landing/footer'

export const metadata = {
  title: 'Clientes — Tecnosur Group',
  description: 'Empresas que confían en Tecnosur Group para sus proyectos de izaje, transporte e ingeniería.',
}

export default function ClientesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Clients />
      <CtaBanner />
      <Footer />
    </main>
  )
}
