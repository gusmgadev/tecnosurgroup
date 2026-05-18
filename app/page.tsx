import { Navbar }   from '@/components/landing/navbar'
import { Hero }      from '@/components/landing/hero'
import { Services }  from '@/components/landing/services'
import { Process }   from '@/components/landing/process'
import Clients       from '@/components/landing/clients'
import { Contact }   from '@/components/landing/contact'
import { Footer }    from '@/components/landing/footer'
import { supabaseAdmin } from '@/services/supabase-admin'
import type { ClienteLanding } from '@/types/cliente'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: clientes } = (await supabaseAdmin
    .from('clientes')
    .select('id, nombre, rubro, telefono, direccion, imagen, pagina_web')
    .eq('mostrar_en_landing', true)
    .eq('activo', true)
    .order('nombre')) as { data: ClienteLanding[] | null; error: unknown }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Clients clientes={clientes ?? []} />
      <Contact />
      <Footer />
    </main>
  )
}
