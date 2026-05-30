<script setup>
const route = useRoute()
const config = useRuntimeConfig();
const appStore = useAppStore();


const { data, pending } = await useAsyncData("home", async () => {
  return await appStore.getHome();
});

useSchemaOrg([
  defineWebPage({
    name: 'Buyzin | Simplify Your Shopping. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh',
    description: 'Buyzin is Bangladesh’s trusted online shopping platform offering authentic fashion, electronics, gadgets, and lifestyle products with fast delivery and secure payments.',
    url: new URL(route.fullPath, config.public.siteUrl).toString(),
    inLanguage: "en-US",
  }),

  defineBreadcrumb({
    items: [
      { name: 'Home', item: '/' }
    ]
  })
])
</script>

<template>
  <main class="space-y-6">

    <SeoMeta title="Buyzin | Simplify Your Shopping. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
      description="Buyzin is Bangladesh’s trusted online shopping platform offering authentic fashion, electronics, gadgets, and lifestyle products with fast delivery and secure payments."
      keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin" />

    <section class="container mx-auto px-4">
      <div class="py-4">
        <UCarousel v-slot="{ item }" loop :items="data.banners" :autoplay="{ delay: 4000 }" class="w-full">
          <a :href="item?.target_url" target="_blank" rel="noopener noreferrer"
            class="relative block overflow-hidden rounded group">
            <NuxtImg :src="item?.image_url" :alt="item?.title" loading="eager"
              class="w-full h-auto object-cover transition duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 z-10 flex items-center">
              <div class="max-w-xl px-6 md:px-12 text-white">
                <span v-if="item?.subtitle"
                  class="inline-flex items-center rounded-full bg-white/15 backdrop-blur px-4 py-1 text-xs md:text-sm font-medium mb-4 border border-white/20">
                  {{ item.subtitle }}
                </span>
                <h2 class="text-2xl md:text-5xl font-extrabold leading-tight mb-4">
                  {{ item?.title }}
                </h2>

                <div class="flex items-center gap-4">
                  <span
                    class="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-semibold transition group-hover:translate-x-1">
                    {{ item?.button_text ?? 'Shop Now' }}

                    <UIcon name="i-lucide-arrow-right" class="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </UCarousel>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="promo in data.promo" :key="promo.title"
            class="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1">
            <div
              class="flex size-14 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-primary/10 transition">
              <NuxtImg :src="promo.icon_url" :alt="promo.title" class="size-12 object-contain" />
            </div>

            <div>
              <h4 class="text-base font-semibold text-gray-900 leading-tight">
                {{ promo.title }}
              </h4>
              <p class="text-sm text-gray-500 leading-relaxed">
                {{ promo.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-6 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-5">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ data?.promotions?.title }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ data?.promotions?.subtitle }}
            </p>
          </div>

          <NuxtLink to="/flash-deals" class="text-primary font-medium text-sm hover:underline">
            View All
          </NuxtLink>
        </div>

        <UCarousel v-slot="{ item }" loop :autoplay="{ delay: 3000 }" :items="data?.promotions?.items" :ui="{
          item: 'basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5'
        }">
          <CycloneProductCard :product="item" />
        </UCarousel>
      </div>
    </section>


    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ data.top_sales?.title }}
            </h2>
            <span class="text-gray-600 text-sm mt-1">
              {{ data.top_sales?.subtitle }}</span>
          </div>
          <NuxtLink :to="{
            path: `/shop`,
            query: {
              min_price: '',
              max_price: '',
              rating: '',
              sort: 'default',
            },
          }" class="text-primary hover:underline text-sm">See all</NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard v-for="(product, index) in data.top_sales?.items" :key="index" :product="product" />
        </div>
      </div>
    </section>

    <section class="py-6 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-5">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-900">
              Featured Collections
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              Explore trending collections and exclusive deals
            </p>
          </div>

          <NuxtLink to="/shop" class="text-primary font-medium text-sm hover:underline">
            View All
          </NuxtLink>
        </div>

        <UCarousel v-slot="{ item }" loop :autoplay="{ delay: 3500 }" :items="data.collections" :ui="{
          item: 'basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2'
        }">
          <NuxtLink :to="`/collections/${item.slug}`"
            class="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300">
            <div class="relative overflow-hidden">
              <NuxtImg :src="item.banner_url" :alt="item.name"
                class="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
                loading="lazy" />
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 class="text-lg font-bold line-clamp-1">
                  {{ item.name }}
                </h3>

                <p class="text-sm text-gray-200 line-clamp-2 mt-1">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </UCarousel>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ data.brands?.title }}
            </h2>
            <span class="text-gray-600 text-sm mt-1">
              {{ data.brands?.subtitle }}</span>
          </div>
          <NuxtLink :to="{
            path: `/shop`,
            query: {
              min_price: '',
              max_price: '',
              rating: '',
              sort: 'default',
            },
          }" class="text-primary hover:underline text-sm">See all</NuxtLink>
        </div>

        <UCarousel v-slot="{ item }" loop :autoplay="{ delay: 2000 }" :items="data.brands?.items"
          :ui="{ item: 'basis-1/3 md:basis-1/10' }">
          <NuxtLink :to="{
            path: `/brand/${item.slug}/products`,
            query: {
              sort: 'default',
            },
          }"
            class="bg-white flex flex-col items-center text-center border border-border hover:border-primary rounded p-2 transition">
            <NuxtImg :src="item.logo_url" :alt="item.name" loading="lazy" class="w-20 h-20 object-contain mb-2" />
            <span class="text-sm font-medium line-clamp-1">{{
              item.name
            }}</span>
          </NuxtLink>
        </UCarousel>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto">
        <div class="flex items-center justify-between gap-4 py-6">
          <div class="max-w-2xl">
            <div
              class="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span class="h-2 w-2 rounded-full bg-primary"></span>
              Trending Now
            </div>

            <h2 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {{ data.trending?.title }}
            </h2>

            <p class="mt-2 text-sm leading-6 text-gray-600 md:text-base">
              {{ data.trending?.subtitle }}
            </p>
          </div>

          <NuxtLink :to="{
            path: '/shop',
            query: {
              min_price: '',
              max_price: '',
              rating: '',
              sort: 'default',
            },
          }" class="text-primary whitespace-nowrap">
            See All
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6">
          <ProductCard v-for="(product, index) in data.trending?.items" :key="index" :product="product" />
        </div>

        <div class="flex items-center justify-center py-6">
          <NuxtLink :to="{
            path: `/shop`,
            query: {
              min_price: '',
              max_price: '',
              rating: '',
              sort: 'default',
            },
          }"
            class="px-4 py-2.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none transition">
            Load more</NuxtLink>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped></style>
