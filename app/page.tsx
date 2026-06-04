import { Navbar }             from '@/components/landing/navbar'
import { Hero }                from '@/components/landing/hero'
import { Services }            from '@/components/landing/services'
import { Process }             from '@/components/landing/process'
import { Contact }             from '@/components/landing/contact'
import { CtaBanner }           from '@/components/landing/cta-banner'
import { Footer }              from '@/components/landing/footer'
import { theme }               from '@/lib/theme'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Tecnosur Group',
  description: theme.seo.description,
  url: theme.seo.url,
  telephone: theme.contact.phone,
  email: theme.contact.email,
  image: `${theme.seo.url}${theme.seo.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gdor. Manuel Pio Raso 1706',
    addressLocality: 'Rada Tilly',
    addressRegion: 'Chubut',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -45.927963,
    longitude: -67.584149,
  },
  sameAs: [
    theme.footer.social.instagram,
    theme.footer.social.linkedin,
  ].filter(s => s.length > 0),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios',
    itemListElement: theme.services.items.map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
      },
    })),
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Patagonia, Argentina',
  },
  priceRange: '$$',
  foundingDate: '2004',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Contact />
      <CtaBanner />
      <Footer />
    </main>
  )
}
