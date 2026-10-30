import { connection } from 'next/server'
import { desc, eq, and } from 'drizzle-orm'
import { db } from '@/lib/db'
import { trabajos } from '@/lib/db/schema'
import { theme } from '@/lib/theme'
import { SectionBanner } from '@/components/landing/section-banner'
import { WorksGallery } from '@/components/landing/works-gallery'
import type { Trabajo, TrabajoLanding } from '@/types/trabajo'

export async function Works() {
  // Fuerza render dinámico: los trabajos del panel se reflejan sin redeploy
  await connection()

  let items: TrabajoLanding[] = []
  try {
    const rows: Trabajo[] = await db
      .select()
      .from(trabajos)
      .where(and(eq(trabajos.activo, true), eq(trabajos.mostrar_en_landing, true)))
      .orderBy(desc(trabajos.id))
    items = rows.map((t) => ({
      id:          t.id,
      titulo:      t.titulo,
      descripcion: t.descripcion,
      categoria:   t.categoria,
      imagenes:    t.imagenes ?? [],
    }))
  } catch {
    // Si la DB no está disponible, la landing no se rompe
    items = []
  }

  return (
    <section
      id="trabajos"
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: theme.colors.primary }}
    >
      <SectionBanner
        label={theme.sectionHeaders.works.label}
        description={theme.sectionHeaders.works.description}
      />

      <div className="max-w-6xl mx-auto py-20 px-6 md:px-12">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            {theme.works.title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            {theme.works.subtitle}
          </p>
        </div>

        {items.length > 0 ? (
          <WorksGallery trabajos={items} />
        ) : (
          <p className="text-center" style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.base }}>
            {theme.works.empty}
          </p>
        )}
      </div>
    </section>
  )
}
