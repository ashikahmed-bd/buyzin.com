import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: "https://api.buyzin.com",
      siteUrl: 'https://buyzin.com'
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-gtag',
    'nuxt-schema-org'
  ],

  css: ['~/assets/css/main.css'],

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

    build: {
      sourcemap: false,
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
        class: 'antialiased min-h-screen font-sans text-sm',
      },
    },
  },
})