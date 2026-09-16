import { defineSitemapEventHandler, useRuntimeConfig } from '#imports'

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig()

    let page = 1
    let urls = []
    let hasMore = true

    while (hasMore) {
        const response = await $fetch(`${config.public.apiBase}/api/sitemaps/products?page=${page}`)

        urls.push(
            ...response.data.map(product => ({
                loc: `/product/${product.slug}/${product.hashid}`,
                lastmod: product.updated_at,
            }))
        )

        hasMore = response.has_more
        page++
    }

    return urls
})