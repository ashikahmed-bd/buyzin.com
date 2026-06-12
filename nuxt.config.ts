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

  modules: ['@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/sitemap', 'nuxt-schema-org', '@nuxt/ui', 'nuxt-gtag', '@nuxtjs/mdc'],

  mdc: {
    components: {
      prose: true,
    }
  },

  components: [
    {
      path: '~/components',
      global: true
    },
    {
      path: '~/components/prose',
      global: true
    }
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
        sources: ['/api/__sitemap__/urls/pages']
      },

      categories: {
        sources: ['/api/__sitemap__/urls/categories']
      },
      brands: {
        sources: ['/api/__sitemap__/urls/brands']
      },
      products: {
        sources: ['/api/__sitemap__/urls/products']
      }
    },
  },
})