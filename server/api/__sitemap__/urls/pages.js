import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {

  const config = useRuntimeConfig()

  const pages = await $fetch(`${config.public.apiBase}/api/sitemaps/pages`)

  if (!Array.isArray(pages)) {
    return []
  }

  return pages.map(page => ({
    loc: page.loc,
    lastmod: page.lastmod,
  }))
})