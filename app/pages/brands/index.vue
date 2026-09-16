<script setup>
const route = useRoute();
const router = useRouter();

const brandStore = useBrandStore();

const form = reactive({
  search: route.query.search ?? "",
  category: route.query.category ?? "",
  region: route.query.region ?? "",
  sort: route.query.sort ?? "popularity",
  page: Number(route.query.page) ?? 1,
});

const { data, pending, error, refresh } = await useAsyncData(
  "brands",
  () =>
    brandStore.getBrands({
      page: form.page,
      search: form.search,
      category: form.category,
      region: form.region,
      sort: form.sort,
    }),
  {
    watch: [
      () => form.page,
      () => form.search,
      () => form.category,
      () => form.region,
      () => form.sort,
    ],
  },
);

const clear = () => {
  form.search = "";
  form.category = "";
  form.region = "";
  form.sort = "popularity";

  router.replace({
    query: {},
  });
};
</script>

<template>
  <main>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else>
      <SeoMeta
        title="All Brands | Trusted B2B Suppliers & Wholesale Brands"
        description="Explore all brands on our B2B marketplace. Discover trusted manufacturers, suppliers, wholesalers, and quality products for your business at competitive wholesale prices."
        keywords="B2B brands, wholesale brands, B2B marketplace brands, wholesale suppliers, manufacturers, suppliers, wholesalers, business suppliers, bulk products, wholesale products, trusted brands, B2B suppliers"
      />

      <section class="relative overflow-hidden bg-dark">
        <div class="relative container mx-auto px-4 py-8">
          <UBreadcrumb
            :items="[
              {
                label: 'Home',
                to: '/',
              },
              {
                label: 'Brands',
              },
            ]"
            class="text-sm"
          />

          <div class="grid items-center gap-8 lg:grid-cols-2 py-4">
            <div>
              <h1 class="text-4xl font-bold tracking-tight text-white">
                Our Brands
              </h1>
              <p class="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Explore top global and local brands at wholesale prices. Trusted
                quality, better business for you.
              </p>
            </div>
            <div class="hidden justify-end lg:flex">
              <div class="border-l border-white/20 pl-14">
                <p class="text-2xl font-semibold leading-8 text-white">
                  Stronger Brands
                </p>
                <p class="text-2xl font-semibold leading-8 text-white">
                  Stronger Business
                </p>
                <div class="mt-4 h-1 w-12 rounded bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid gap-6 lg:grid-cols-[230px_1fr]">
          <aside class="rounded border border-border bg-gray-50 p-4">
            <div class="mb-5 flex items-center justify-between">
              <h2 class="text-sm font-semibold text-body">Filters</h2>
              <button
                type="button"
                class="text-sm font-medium text-primary hover:underline"
                @click="clear"
              >
                Clear All
              </button>
            </div>

            <section class="relative">
              <input
                v-model="form.search"
                type="text"
                placeholder="Search brands..."
                class="w-full rounded border border-gray-200 bg-white px-3 py-2 pr-10 text-sm text-body outline-none placeholder:text-gray-400 focus:border-primary"
                @change="
                  router.replace({
                    query: {
                      ...route.query,
                      search: form.search,
                    },
                  })
                "
              />
              <UIcon
                name="i-lucide-search"
                class="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
              />
            </section>

            <section v-if="data?.categories?.length" class="py-8">
              <h3 class="mb-3 text-sm font-semibold text-body">Categories</h3>
              <div class="space-y-3">
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    v-model="form.category"
                    type="radio"
                    name="category"
                    value=""
                    class="size-4 border-gray-300 text-primary focus:ring-primary"
                    @change="
                      router.replace({
                        query: { ...route.query, category: null },
                      })
                    "
                  />
                  <span class="text-sm text-body"> All Categories </span>
                </label>

                <label
                  v-for="item in data?.categories"
                  :key="item.id"
                  class="flex cursor-pointer items-center gap-2"
                >
                  <input
                    v-model="form.category"
                    type="radio"
                    name="category"
                    :value="item.slug"
                    class="size-4 border-gray-300 text-primary focus:ring-primary"
                    @change="
                      router.replace({
                        query: {
                          ...route.query,
                          category: form.category,
                        },
                      })
                    "
                  />
                  <span class="text-sm text-body">
                    {{ item.name }}
                    <span v-if="item.count !== undefined" class="text-gray-400">
                      ({{ item.count }})
                    </span>
                  </span>
                </label>
              </div>
            </section>

            <section v-if="data?.regions?.length">
              <h3 class="mb-3 text-sm font-semibold text-body">Region</h3>
              <div class="space-y-3">
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    v-model="form.region"
                    type="radio"
                    name="region"
                    value=""
                    class="size-4 border-gray-300 text-primary focus:ring-primary"
                    @change="
                      router.replace({
                        query: { ...route.query, region: null },
                      })
                    "
                  />
                  <span class="text-sm text-body"> All Regions </span>
                </label>

                <label
                  v-for="item in data.regions"
                  :key="item.name"
                  class="flex cursor-pointer items-center gap-2"
                >
                  <input
                    v-model="form.region"
                    type="radio"
                    name="region"
                    :value="item.slug"
                    class="size-4 border-gray-300 text-primary focus:ring-primary"
                    @change="
                      router.replace({
                        query: { ...route.query, region: form.region },
                      })
                    "
                  />
                  <span class="text-sm text-body">
                    {{ item.label }}
                    <span class="text-body"> ({{ item.count }}) </span>
                  </span>
                </label>
              </div>
            </section>
          </aside>

          <section>
            <div class="mb-5 flex items-center justify-between">
              <p class="text-sm text-body">
                <span class="font-semibold">
                  {{ data?.meta?.total ?? 0 }}
                </span>
                Brands found
              </p>
              <select
                v-model="form.sort"
                class="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-body outline-none focus:border-primary"
                @change="
                  router.replace({
                    query: {
                      ...route.query,
                      sort: form.sort,
                    },
                  })
                "
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="name">Sort by: Name</option>
              </select>
            </div>

            <LoadingState v-if="pending" />

            <ErrorState v-else-if="error" :retry="refresh" />

            <EmptyState v-else-if="!data?.data?.length" />

            <template v-else>
              <div
                class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
              >
                <NuxtLink
                  v-for="brand in data.data"
                  :key="brand.id"
                  :to="`/brands/${brand.slug}`"
                  class="group flex flex-col items-center justify-between rounded-lg border border-gray-100 bg-white p-4 transition hover:border-primary/30 hover:shadow-md"
                >
                  <div class="flex h-16 w-full items-center justify-center">
                    <NuxtImg
                      :src="brand.logo_url"
                      :alt="brand.name"
                      class="max-h-12 object-contain grayscale transition group-hover:grayscale-0"
                    />
                  </div>
                  <div class="text-center">
                    <h3 class="text-sm font-semibold text-body">
                      {{ brand.name }}
                    </h3>
                  </div>
                  <span
                    class="mt-3 flex h-9 w-full items-center justify-center gap-1 rounded-md border border-primary/10 bg-primary/5 text-sm font-medium text-primary transition group-hover:bg-primary group-hover:text-white"
                  >
                    View Products
                    <UIcon name="i-lucide-arrow-right" class="size-4" />
                  </span>
                </NuxtLink>
              </div>

              <div
                v-if="data?.meta?.last_page > 1"
                class="flex justify-center py-8"
              >
                <UPagination
                  v-model:page="form.page"
                  show-edges
                  :sibling-count="1"
                  :total="data?.meta?.total"
                  :items-per-page="data?.meta?.per_page"
                />
              </div>
            </template>
          </section>
        </div>

        <section class="py-6">
          <div class="grid grid-cols-1 rounded sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <UIcon
                  name="i-lucide-badge-check"
                  class="size-5 text-primary"
                />
              </div>
              <div>
                <p class="text-sm font-semibold text-body">Verified Brands</p>
                <p class="text-sm text-gray-500">Authentic & reliable</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <UIcon name="i-lucide-tag" class="size-5 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold text-body">
                  Competitive Wholesale Pricing
                </p>
                <p class="text-sm text-gray-500">
                  Better profits for your business
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <UIcon name="i-lucide-package" class="size-5 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold text-body">
                  Wide Product Range
                </p>
                <p class="text-sm text-gray-500">Everything in one place</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-5">
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white"
              >
                <UIcon name="i-lucide-headphones" class="size-5 text-primary" />
              </div>
              <div>
                <p class="text-sm font-semibold text-body">
                  Dedicated B2B Support
                </p>
                <p class="text-sm text-gray-500">We're here to help</p>
              </div>
            </div>
          </div>
        </section>

        <section class="py-6">
          <div
            class="flex flex-col gap-5 rounded bg-primary/5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary"
              >
                <UIcon name="i-lucide-store" class="size-6 text-white" />
              </div>
              <div>
                <h3 class="text-sm font-semibold text-body">
                  Are you a Brand or Distributor?
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Partner with BizMart and grow your business with thousands of
                  verified buyers.
                </p>
              </div>
            </div>

            <NuxtLink
              to="/become-supplier"
              class="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              Become a Supplier
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>
          </div>
        </section>
      </section>
    </template>
  </main>
</template>
