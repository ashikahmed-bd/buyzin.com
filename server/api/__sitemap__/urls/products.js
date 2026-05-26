import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
    const response = await $fetch('http://127.0.0.1:8000/api/products')

    const products = response?.data

    if (!Array.isArray(products)) return []

    return products.map((product) => ({
        loc: `/product/${product.slug}/${product.id}`,
        lastmod: product.updated_at || new Date().toISOString(),
    }))
})