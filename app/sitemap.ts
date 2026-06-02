import { MetadataRoute } from 'next'
import { theme } from '@/lib/theme'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             theme.seo.url,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1,
    },
  ]
}
