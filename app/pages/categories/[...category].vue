<script setup>
const route = useRoute();

const categoryStore = useCategoryStore();

const slug = computed(() => {
  const category = route.params.category;

  return Array.isArray(category) ? category.join("/") : category;
});

const { data, pending, error, refresh } = await useAsyncData(
  () => `category-products-${slug.value}`,
  () => categoryStore.getProducts(slug.value),
  {
    watch: [slug],

    default: () => ({
      data: [],
      category: null,
      meta: {
        total: 0,
      },
    }),
  },
);
</script>

<template>
  <main class="bg-gray-50">
    <div class="container mx-auto px-4">
      <LoadingState v-if="pending" />

      <ErrorState v-else-if="error" :retry="refresh" />

      <template v-else>
        <SeoMeta
          :title="data?.category?.meta_title"
          :description="data?.category?.meta_description"
          :keywords="data?.category?.meta_keywords"
          :image="data?.category?.image_url"
        />

        <nav class="flex flex-wrap items-center gap-1.5 text-sm text-body py-2">
          <NuxtLink to="/" class="transition hover:text-primary">
            Home
          </NuxtLink>

          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 shrink-0 text-muted"
          />

          <template
            v-for="(item, index) in slug.split('/')"
            :key="`${item}-${index}`"
          >
            <NuxtLink
              v-if="index < slug.split('/').length - 1"
              :to="`/categories/${slug
                .split('/')
                .slice(0, index + 1)
                .join('/')}`"
              class="capitalize transition hover:text-primary"
            >
              {{ item.replaceAll("-", " ") }}
            </NuxtLink>

            <span v-else class="font-medium capitalize text-title">
              {{ item.replaceAll("-", " ") }}
            </span>

            <UIcon
              v-if="index < slug.split('/').length - 1"
              name="i-lucide-chevron-right"
              class="size-4 shrink-0 text-muted"
            />
          </template>
        </nav>

        <section>
          <div
            class="relative min-h-52 w-full overflow-hidden rounded-xl bg-gray-100 lg:min-h-64"
          >
            <NuxtImg
              :src="data?.category?.banner_url"
              :alt="data?.category?.name"
              class="absolute inset-0 h-full w-full object-cover"
            />

            <div
              class="relative z-10 flex min-h-52 max-w-3xl flex-col justify-center px-6 py-8 sm:px-8 lg:min-h-64 lg:px-10"
            >
              <h1
                class="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                {{ data?.category?.name }}
              </h1>
              <p
                v-if="data?.category?.description"
                class="mt-2 max-w-2xl text-sm leading-6 text-white/90 sm:text-base"
              >
                {{ data.category.description }}
              </p>
            </div>
          </div>
        </section>

        <section v-if="data?.category?.children?.length" class="py-4">
          <div
            class="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          >
            <NuxtLink
              v-for="child in data.category.children"
              :key="child.id"
              :to="`/categories/${slug}/${child.slug}`"
              class="group rounded-xl border border-border bg-white p-2 text-center transition hover:border-primary/40"
            >
              <div
                class="flex items-center justify-center overflow-hidden rounded-full bg-gray-50"
              >
                <NuxtImg
                  :src="child.icon_url"
                  :alt="child.name"
                  class="size-16 rounded-full object-contain"
                />
              </div>

              <h4
                class="line-clamp-2 text-center text-sm font-semibold leading-4 py-2 text-body transition group-hover:text-primary"
              >
                {{ child.name }}
              </h4>
            </NuxtLink>
          </div>
        </section>

        <section class="py-6">
          <div class="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <h2 class="text-base font-semibold text-title">
                {{ data?.meta?.total ?? data?.data?.length ?? 0 }}
                Products Found
              </h2>

              <p class="mt-0.5 text-sm text-body">
                Browse products from
                {{ data?.category?.name }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <select
                class="px-4 py-2 appearance rounded border border-gray-200 bg-white text-sm font-medium text-body outline-none"
              >
                <option value="popular">Sort by: Popularity</option>
                <option value="latest">Sort by: Latest</option>
                <option selected value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <EmptyState v-if="!data?.data?.length" />

          <div
            v-else
            class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            <ProductCard
              v-for="product in data.data"
              :key="product.id"
              :product="product"
            />
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<style scoped></style>
