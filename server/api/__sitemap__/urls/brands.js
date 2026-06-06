import { defineSitemapEventHandler, useRuntimeConfig } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  const brands = await $fetch(`${config.public.apiBase}/api/sitemaps/brands`)

  if (!Array.isArray(brands)) {
    return []
  }

  return brands.map((brand) => ({
    loc: `/brands/${brand.slug}`,
    lastmod: brand.updated_at,
  }))
})