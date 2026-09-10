<script setup>
const appStore = useAppStore();
const categoryStore = useCategoryStore();

const {
  data: home,
  pending,
  error,
  refresh,
} = await useAsyncData("home", async () => {
  return await appStore.getHome();
});

const { data: categories } = useAsyncData("categories", async () => {
  return categoryStore.getCategories();
});
</script>

<template>
  <SkeletonHome v-if="pending" />

  <ErrorState v-else-if="error" :retry="refresh" />

  <main v-else-if="home">
    <SeoMeta
      title="Buyzin | Simplify Your Shopping. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
      description="Buyzin is Bangladesh’s trusted online shopping platform offering authentic fashion, electronics, gadgets, and lifestyle products with fast delivery and secure payments."
      keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin"
    />

    <section class="bg-white py-2.5">
      <div class="container mx-auto px-4">
        <UCarousel
          v-slot="{ item }"
          loop
          wheel-gestures
          fade
          :items="home?.banners"
          :autoplay="{ delay: 3000, pauseOnHover: true }"
          class="w-full"
        >
          <a
            :href="item?.target_url"
            target="_blank"
            rel="noopener noreferrer"
            class="relative block overflow-hidden rounded group"
          >
            <NuxtImg
              :src="item.image_url"
              :alt="item.title?.trim()"
              loading="eager"
              class="w-full h-full object-cover object-center"
            />
          </a>
        </UCarousel>
      </div>
    </section>

    <section class="bg-gray-50 py-6 md:py-10">
      <div class="container mx-auto px-4 mb-4">
        <UCarousel
          v-if="home?.categories?.length"
          v-slot="{ item }"
          loop
          :autoplay="{ delay: 3500 }"
          :items="home?.categories"
          :ui="{
            item: 'basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8',
          }"
        >
          <NuxtLink
            :to="`/categories/${item.slug}`"
            class="group relative block overflow-hidden rounded bg-white transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <NuxtImg
              :src="item.image_url"
              :alt="item.name"
              loading="lazy"
              class="mx-auto object-cover rounded transition-transform duration-500"
            />

            <h3 class="text-sm text-body font-semibold truncate w-full py-1.5">
              {{ item.name }}
            </h3>
          </NuxtLink>
        </UCarousel>
      </div>

      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-6">
          <div class="block">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ home?.promotions?.title }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ home?.promotions?.subtitle }}
            </p>
          </div>
        </div>

        <UCarousel
          v-if="home?.promotions?.items?.length"
          v-slot="{ item }"
          loop
          :autoplay="{ delay: 3000 }"
          :items="home?.promotions?.items"
          :ui="{
            item: 'basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/5',
          }"
        >
          <ProductCard :product="item" />
        </UCarousel>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto px-4">
        <div class="block py-4">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ home?.top_sales?.title }}
          </h2>
          <span class="text-gray-600 text-sm mt-1">
            {{ home?.top_sales?.subtitle }}</span
          >
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="(product, index) in home?.top_sales?.items"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto px-4">
        <div class="block py-4">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ home?.brands?.title }}
          </h2>
          <span class="text-gray-600 text-sm mt-1">
            {{ home?.brands?.subtitle }}</span
          >
        </div>

        <UCarousel
          v-if="home?.brands?.items?.length"
          v-slot="{ item }"
          loop
          :autoplay="{ delay: 2000 }"
          :items="home?.brands?.items"
          :ui="{ item: 'basis-1/3 md:basis-1/10' }"
        >
          <NuxtLink
            :to="{
              path: `/brands/${item.slug}`,
              query: {
                sort: 'default',
              },
            }"
            class="bg-white flex flex-col items-center text-center border border-border hover:border-primary rounded p-2 transition"
          >
            <NuxtImg
              :src="item.logo_url"
              :alt="item.name"
              loading="lazy"
              class="w-20 h-20 object-contain mb-2"
            />
            <span class="text-sm font-medium line-clamp-1">{{
              item.name
            }}</span>
          </NuxtLink>
        </UCarousel>
      </div>
    </section>

    <section class="py-4">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl py-4">
          <div
            class="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            <span class="h-2 w-2 rounded-full bg-primary"></span>
            Trending Now
          </div>

          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
          >
            {{ home?.trending?.title }}
          </h2>

          <p class="mt-2 text-sm leading-6 text-gray-600 md:text-base">
            {{ home?.trending?.subtitle }}
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="(product, index) in home?.trending?.items"
            :key="index"
            :product="product"
          />
        </div>

        <div class="flex items-center justify-center py-6">
          <NuxtLink
            :to="{
              path: `/shop`,
              query: {
                min_price: '',
                max_price: '',
                rating: '',
                sort: 'default',
              },
            }"
            class="px-4 py-2.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none transition"
          >
            Load more</NuxtLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
