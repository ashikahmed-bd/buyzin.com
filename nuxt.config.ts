// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.buyzin.com',
      siteUrl: 'https://buyzin.com'
    }
  },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@nuxt/ui',
    'nuxt-gtag',
  ],

  gtag: {
    id: 'G-4JS5BWE863'
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'google-site-verification', content: 'JawtWsibWxTQgLvmhhHn4_5QAO8wTX9Ny98IvWnxaTE' },
      ],

      bodyAttrs: {
        class: 'antialiased min-h-screen font-sans',
      },
    },
  },

  site: {
    url: 'https://www.buyzin.com',
    name: 'Buyzin | Simplify Your Shopping.',
    description: 'Buyzin is Bangladesh’s trusted online shopping platform offering authentic fashion, electronics, gadgets, and lifestyle products with fast delivery and secure payments.',
    defaultLocale: 'en-US',
  },

  sitemap: {
    sitemaps: {
      pages: {
        urls: [
          { loc: '/', lastmod: new Date().toISOString() },

          // Core
          { loc: '/about-us', lastmod: new Date().toISOString() },
          { loc: '/contact-us', lastmod: new Date().toISOString() },
          { loc: '/blog', lastmod: new Date().toISOString() },
          { loc: '/categories', lastmod: new Date().toISOString() },
          { loc: '/search', lastmod: new Date().toISOString() },

          // Shop
          { loc: '/products', lastmod: new Date().toISOString() },
          { loc: '/offers', lastmod: new Date().toISOString() },
          { loc: '/flash-sale', lastmod: new Date().toISOString() },
          { loc: '/new-arrivals', lastmod: new Date().toISOString() },
          { loc: '/best-sellers', lastmod: new Date().toISOString() },

          // Account
          { loc: '/my-account', lastmod: new Date().toISOString() },
          { loc: '/my-orders', lastmod: new Date().toISOString() },
          { loc: '/order-tracking', lastmod: new Date().toISOString() },
          { loc: '/wishlist', lastmod: new Date().toISOString() },

          // Vendor
          { loc: '/become-a-vendor', lastmod: new Date().toISOString() },

          // Support
          { loc: '/help-center', lastmod: new Date().toISOString() },

          // Legal
          { loc: '/faq', lastmod: new Date().toISOString() },
          { loc: '/privacy-policy', lastmod: new Date().toISOString() },
          { loc: '/return-policy', lastmod: new Date().toISOString() },
          { loc: '/refund-policy', lastmod: new Date().toISOString() },
          { loc: '/terms-and-conditions', lastmod: new Date().toISOString() },
          { loc: '/cookie-policy', lastmod: new Date().toISOString() },
          { loc: '/shipping-and-delivery', lastmod: new Date().toISOString() },
          { loc: '/disclaimer', lastmod: new Date().toISOString() },
        ],
      },

      categories: {
        sources: ['/api/__sitemap__/urls/categories']
      },

      products: {
        sources: ['/api/__sitemap__/urls/products']
      },
    },

    exclude: [
      '/auth/**',
      '/dashboard/**',
    ],
  },
})