import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  
  const config = useRuntimeConfig()

  const categories = await $fetch(`${config.public.apiBase}/api/sitemaps/categories`)

  if (!Array.isArray(categories)) {
    return []
  }

  const urls = [];

  const buildUrls = (category, parent = '') => {
    const fullSlug = parent ? `${parent}/${category.slug}` : category.slug

    urls.push({
      loc: `/categories/${fullSlug}`,
      lastmod: category.updated_at,
    })

    if (Array.isArray(category.children) && category.children.length) {
      category.children.forEach((child) => {
        buildUrls(child, fullSlug)
      })
    }
  }

  categories.forEach((category) => {
    buildUrls(category)
  })

  return urls
})