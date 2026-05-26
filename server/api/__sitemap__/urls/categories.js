import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const response = await $fetch('http://127.0.0.1:8000/api/categories')

  const categories = response?.data
  if (!Array.isArray(categories)) return []

  const urls = []

  const buildUrls = (category, parentSlug = '') => {
    const fullSlug = parentSlug
      ? `${parentSlug}/${category.slug}`
      : category.slug

    urls.push({
      loc: `/categories/${fullSlug}`,
      lastmod: category.updated_at || new Date().toISOString(),
    })

    if (Array.isArray(category.children) && category.children.length) {
      category.children.forEach((child) => buildUrls(child, fullSlug))
    }
  }

  categories.forEach((category) => buildUrls(category))

  return urls
})