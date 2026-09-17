<script setup>
const route = useRoute();
const shopStore = useShopStore();

const form = reactive({
  page: 1,
  search: "",
  sort: "latest",
});

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `store-${route.params.slug}-products`,
  () =>
    shopStore.getProducts(route.params.slug, {
      page: form.page,
      search: form.search.trim(),
      sort: form.sort,
    }),
  { watch: [() => form.page, () => form.search, () => form.sort] },
);
</script>

<template>
  <section class="w-full">
    <div
      class="flex flex-col gap-4 border-b border-border py-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="min-w-0">
        <h2 class="text-lg font-semibold tracking-tight text-title">
          All Products
          <span class="ml-1 text-sm font-normal text-body">
            ({{ products?.meta?.total ?? 0 }})
          </span>
        </h2>

        <p class="mt-1 text-sm text-body">
          Browse all products available from this store.
        </p>
      </div>

      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <form class="relative w-full sm:w-64 lg:w-72">
          <input
            v-model="form.search"
            type="search"
            placeholder="Search in this store..."
            class="h-10 w-full rounded-md border border-border bg-white pl-3.5 pr-10 text-sm text-title outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <button
            type="submit"
            class="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded text-body transition-colors hover:bg-gray-100 hover:text-primary"
          >
            <UIcon name="i-lucide-search" class="size-4" />
          </button>
        </form>

        <select
          v-model="form.sort"
          class="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-title outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-44"
        >
          <option value="latest">Latest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>

    <div
      v-if="form.search.trim()"
      class="mt-4 flex items-center justify-between gap-3 rounded-md border border-border bg-gray-50/70 px-4 py-2.5"
    >
      <p class="min-w-0 truncate text-sm text-body">
        Search results for
        <span class="font-medium text-title"> "{{ form.search.trim() }}" </span>
      </p>

      <button
        type="button"
        class="shrink-0 text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
        @click="
          form.search = '';
          form.page = 1;
        "
      >
        Clear
      </button>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!products?.data?.length" />

    <template v-else>
      <div class="py-5 sm:py-6">
        <div
          class="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
        >
          <ProductCard
            v-for="product in products.data"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>

      <div
        v-if="products?.meta?.last_page > 1"
        class="flex items-center justify-center py-4"
      >
        <UPagination
          v-model:page="form.page"
          show-edges
          :sibling-count="1"
          :total="products?.meta?.total"
          :items-per-page="products?.meta?.per_page"
        />
      </div>
    </template>
  </section>
</template>
