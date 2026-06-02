import { Navbar }     from '@/components/landing/navbar'
import { Hero }        from '@/components/landing/hero'
import { Services }    from '@/components/landing/services'
import { Process }     from '@/components/landing/process'
import Clients         from '@/components/landing/clients'
import { Contact }     from '@/components/landing/contact'
import { CtaBanner }   from '@/components/landing/cta-banner'
import { Footer }      from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Clients />
      <Contact />
      <CtaBanner />
      <Footer />
    </main>
  )
}
