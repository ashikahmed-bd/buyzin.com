<script setup>
const route = useRoute();
const router = useRouter();

const brandStore = useBrandStore();

const filters = reactive({
  category: route.query.category ? String(route.query.category).split(",") : [],

  pricing: [0, 0],

  availability: route.query.availability
    ? String(route.query.availability)
    : "",

  rating: Number(route.query.rating) || 0,

  sort: route.query.sort ? String(route.query.sort) : "latest",
});

const mobileFilterOpen = ref(false);

const { data, pending, error, refresh } = await useAsyncData(
  `brand-${route.params.slug}`,
  () => brandStore.getProducts(route.params.slug, route.query),
  {
    watch: [
      () => route.params.slug,
      () => route.query.category,
      () => route.query.min_price,
      () => route.query.max_price,
      () => route.query.availability,
      () => route.query.rating,
      () => route.query.sort,
    ],
  },
);

watch(
  () => data.value?.pricing,
  (pricing) => {
    if (!pricing) {
      filters.pricing = [0, 0];
      return;
    }

    filters.pricing = [
      Math.round(Number(route.query.min_price ?? pricing.min_price ?? 0)),
      Math.round(Number(route.query.max_price ?? pricing.max_price ?? 0)),
    ];
  },
  {
    immediate: true,
  },
);

watch(
  filters,
  (value) => {
    const query = {};

    if (value.category?.length) {
      query.category = value.category.join(",");
    }

    if (
      Array.isArray(value.pricing) &&
      value.pricing.length === 2 &&
      value.pricing[0] !== 0 &&
      value.pricing[1] !== 0
    ) {
      query.min_price = Math.round(value.pricing[0]);
      query.max_price = Math.round(value.pricing[1]);
    }

    if (value.availability) {
      query.availability = value.availability;
    }

    if (value.rating) {
      query.rating = value.rating;
    }

    if (value.sort) {
      query.sort = value.sort;
    }

    router.replace({ query });
  },
  {
    deep: true,
  },
);

const clear = () => {
  router.push({
    query: {},
  });
};
</script>

<template>
  <main class="container mx-auto px-4 py-6">
    <div class="mb-4 flex items-center gap-2 text-sm text-body">
      <template v-for="(item, index) in data?.breadcrumbs" :key="index">
        <a
          v-if="index < data.breadcrumbs.length - 1 && item?.slug"
          :href="item.slug.startsWith('/') ? item.slug : `/${item.slug}`"
          class="hover:text-primary"
        >
          {{ item.name }}
        </a>

        <span v-else class="text-body">
          {{ item.name }}
        </span>

        <UIcon
          v-if="index < data.breadcrumbs.length - 1"
          name="i-lucide-chevron-right"
          class="size-4"
        />
      </template>
    </div>

    <SeoMeta
      v-if="data?.brand"
      :title="data?.brand?.meta_title"
      :description="data?.brand?.meta_description"
      :keywords="data?.brand?.meta_keywords"
      :url="data?.brand?.canonical_url"
    />

    <section
      v-if="data?.brand"
      class="relative h-56 overflow-hidden rounded bg-white sm:h-64 lg:h-72"
    >
      <NuxtImg
        :src="data.brand.banner_url"
        :alt="data.brand.name"
        loading="lazy"
        class="absolute inset-0 size-full object-cover"
      />

      <div class="absolute inset-0 flex items-center px-6">
        <div class="max-w-xl text-white">
          <div class="flex items-center gap-4">
            <div
              class="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white"
            >
              <NuxtImg
                :src="data.brand.logo_url"
                :alt="data.brand.name"
                class="size-full object-contain p-2"
                loading="lazy"
              />
            </div>

            <div>
              <h1 class="text-2xl font-bold sm:text-3xl">
                {{ data.brand.name }}
              </h1>

              <span
                v-if="data.brand.featured"
                class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-white"
              >
                <UIcon name="i-lucide-badge-check" class="size-4" />
                Verified
              </span>
            </div>
          </div>

          <p
            v-if="data.brand.description"
            class="mt-4 text-sm leading-6 text-white/90"
          >
            {{ data.brand.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="mt-4">
      <div class="mb-3 flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-body lg:hidden"
          @click="mobileFilterOpen = !mobileFilterOpen"
        >
          <UIcon name="i-lucide-sliders-horizontal" class="size-4" />

          Filters
        </button>

        <div class="ml-auto flex items-center gap-2 text-sm text-body">
          <span>Sort by:</span>

          <select
            v-model="filters.sort"
            class="rounded border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <aside
          class="rounded-lg border border-gray-100 bg-white p-4"
          :class="mobileFilterOpen ? 'block' : 'hidden lg:block'"
        >
          <div class="mb-5 flex items-center justify-between">
            <h2 class="text-sm font-bold text-title">Filters</h2>

            <button type="button" class="text-sm text-primary" @click="clear">
              Clear All
            </button>
          </div>

          <div
            v-if="data?.brand?.categories?.length"
            class="border-b border-gray-100 pb-4"
          >
            <div class="mb-3 text-sm font-semibold text-title">Categories</div>

            <label
              v-for="category in data.brand.categories"
              :key="category.id"
              class="mb-2 flex cursor-pointer items-center gap-2 text-sm text-body"
            >
              <input
                v-model="filters.category"
                type="checkbox"
                :value="category.slug"
                class="size-4 rounded border-gray-300 text-primary"
              />

              <span> {{ category.name }} </span>
            </label>
          </div>

          <div
            v-if="
              data?.pricing &&
              Number(data.pricing.min_price) >= 0 &&
              Number(data.pricing.max_price) > 0
            "
            class="w-full"
          >
            <div class="mb-2 flex items-center justify-between">
              <span class="text-xs font-medium text-gray-700">
                Price Range
              </span>
            </div>

            <USlider
              v-model="filters.pricing"
              :min="Number(data?.pricing?.min_price)"
              :max="Number(data?.pricing?.max_price)"
              :step="0.01"
              :ui="{
                track: 'bg-gray-200',
                range: 'bg-primary',
                thumb: 'bg-white border-2 border-primary',
              }"
            />

            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-body">{{
                $currency(filters.pricing[0], data?.pricing?.currency)
              }}</span>
              <span class="text-sm text-body">{{
                $currency(filters.pricing[1], data?.pricing?.currency)
              }}</span>
            </div>
          </div>

          <div
            v-if="data?.availability?.length"
            class="border-b border-gray-100 py-5"
          >
            <div class="mb-3 text-sm font-semibold text-title">
              Availability
            </div>

            <label
              v-for="item in data.availability"
              :key="item.value"
              class="mb-2 flex cursor-pointer items-center gap-2 text-sm text-body"
            >
              <input
                v-model="filters.availability"
                type="radio"
                :value="item.value"
                class="size-4 rounded border-gray-300 text-primary"
              />

              <span class="flex-1">
                {{ item.label }}
              </span>

              <span> ({{ item.count }}) </span>
            </label>
          </div>

          <div v-if="data?.rating?.length" class="py-5">
            <div class="mb-3 text-sm font-semibold text-title">Reviews</div>

            <label
              v-for="item in data.rating"
              :key="item.value"
              class="mb-2 flex cursor-pointer items-center gap-2 text-sm text-body"
            >
              <input
                v-model="filters.rating"
                type="radio"
                :value="item.value"
                class="size-4 rounded border-gray-300 text-primary"
              />

              <span class="flex shrink-0">
                <UIcon
                  v-for="star in 5"
                  :key="star"
                  name="i-lucide-star"
                  class="size-3.5"
                  :class="
                    star <= item.value
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  "
                />
              </span>

              <span class="text-sm text-body">
                {{ item.label }}
              </span>
            </label>
          </div>

          <button
            type="button"
            class="w-full rounded border border-primary px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
            @click="clear"
          >
            Clear All Filters
          </button>
        </aside>

        <div class="w-full">
          <LoadingState v-if="pending" />

          <ErrorState v-else-if="error" :retry="refresh" />

          <EmptyState v-else-if="!data?.data.length" />

          <template v-else>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              <ProductCard
                v-for="product in data?.data"
                :key="product.id"
                :product="product"
              />
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
