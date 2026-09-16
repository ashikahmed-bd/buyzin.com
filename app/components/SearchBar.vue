<script setup>
const searchStore = useSearchStore();

const keywords = [
  "Kitchen Accessories",
  "T-Shirt",
  "Mobile Accessories",
  "Electronics",
  "Home & Living",
  "Shoes",
  "Bags",
  "Beauty Products",
];

const form = reactive({
  search: "",
});

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "search-products",
  () => searchStore.search(form.search.trim()),
  {
    immediate: false,
  },
);

const search = async () => {
  const keyword = form.search.trim();

  if (!keyword) {
    searchStore.dialog = false;
    return;
  }

  searchStore.dialog = true;

  await refresh();
};

const searchDebounced = useDebounceFn(async () => {
  const keyword = form.search.trim();

  if (!keyword) {
    return;
  }

  searchStore.dialog = true;

  await refresh();
}, 500);

const onSearchInput = () => {
  searchStore.dialog = true;

  searchDebounced();
};

const selectKeyword = async (keyword) => {
  form.search = keyword;
  searchStore.dialog = true;

  await refresh();
};

const openProduct = async (product) => {
  if (!product?.slug || !product?.id) {
    return;
  }

  searchStore.dialog = false;

  await navigateTo(`/product/${product.slug}/${product.code}`);
};

const viewAllResults = async () => {
  const keyword = form.search.trim();

  if (!keyword) {
    return;
  }

  searchStore.dialog = false;

  await navigateTo({
    path: "/search",
    query: {
      keyword,
    },
  });
};
</script>

<template>
  <div class="hidden w-full max-w-2xl md:block">
    <div @mouseleave="searchStore.dialog = false" class="relative">
      <form
        class="flex w-full items-center overflow-hidden rounded-md border-2 border-primary bg-white transition focus-within:ring-2 focus-within:ring-primary/10"
        @submit.prevent="search"
      >
        <UIcon
          v-if="pending"
          name="i-lucide-loader"
          class="ml-3 size-5 shrink-0 animate-spin text-body"
        />

        <UIcon
          v-else
          name="i-lucide-search"
          class="ml-3 size-5 shrink-0 text-body"
        />

        <input
          v-model="form.search"
          type="search"
          autocomplete="off"
          placeholder="Search products, brands or categories..."
          class="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm text-body outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0"
          @focus="searchStore.dialog = true"
          @input="onSearchInput"
        />

        <button
          type="submit"
          class="shrink-0 self-stretch bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      <div
        v-if="searchStore.dialog"
        class="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-b-2xl border border-t-0 border-gray-100 bg-white shadow-xl"
      >
        <div class="border-b border-dashed border-border px-4">
          <div class="flex items-center justify-between gap-4 py-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-trending-up" class="size-4 text-primary" />

              <p class="text-xs font-semibold text-gray-700">
                Trending Keywords
              </p>
            </div>

            <p v-if="form.search" class="text-sm text-muted">
              Results for
              <span class="font-medium text-body"> "{{ form.search }}" </span>
            </p>
          </div>

          <div class="flex flex-wrap gap-2 pb-3">
            <button
              v-for="keyword in keywords"
              :key="keyword"
              type="button"
              class="group inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-body transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              @click="selectKeyword(keyword)"
            >
              {{ keyword }}
            </button>
          </div>
        </div>

        <div class="p-4">
          <div
            v-if="error"
            class="rounded-xl border border-red-100 bg-red-50 px-6 py-8 text-center"
          >
            <UIcon
              name="i-lucide-circle-alert"
              class="mx-auto size-8 text-red-400"
            />

            <h2 class="mt-3 text-sm font-semibold text-red-700">
              Something went wrong
            </h2>

            <button
              type="button"
              class="mt-3 text-sm font-medium text-primary hover:underline"
              @click="search"
            >
              Try again
            </button>
          </div>

          <template v-else-if="pending">
            <article v-for="i in 3" :key="i">
              <div
                class="flex w-full items-center gap-3 rounded-md px-3 py-2.5"
              >
                <div
                  class="size-12 shrink-0 animate-pulse rounded-md bg-gray-200"
                />

                <div class="min-w-0 flex-1">
                  <div class="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div class="mt-2 flex items-center gap-2">
                    <div class="h-3 w-24 animate-pulse rounded bg-gray-100" />

                    <div class="h-3 w-16 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>

                <div class="shrink-0 text-right">
                  <div
                    class="ml-auto h-4 w-20 animate-pulse rounded bg-gray-200"
                  />

                  <div
                    class="mt-2 ml-auto h-3 w-14 animate-pulse rounded bg-gray-100"
                  />
                </div>
              </div>
            </article>
          </template>

          <div
            v-else-if="form.search && products?.length === 0"
            class="rounded-xl border border-gray-100 bg-white px-6 py-12 text-center"
          >
            <UIcon
              name="i-lucide-search-x"
              class="mx-auto size-10 text-gray-300"
            />

            <h2 class="mt-3 text-lg font-semibold text-title">
              No results found
            </h2>

            <p class="mt-1 text-sm text-muted">
              No results found for
              <span class="font-medium text-body"> "{{ form.search }}" </span>
            </p>
          </div>

          <template v-else-if="products?.length">
            <div class="max-h-96 overflow-y-auto">
              <article v-for="product in products" :key="product.id">
                <button
                  type="button"
                  class="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition hover:bg-gray-50"
                  @click="openProduct(product)"
                >
                  <div
                    class="size-12 shrink-0 overflow-hidden rounded border border-gray-100 bg-gray-50"
                  >
                    <NuxtImg
                      :src="product.cover_url"
                      :alt="product.name"
                      class="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h2 class="truncate text-sm font-medium text-title">
                      {{ product.name }}
                    </h2>
                    <span> MOQ {{ product.moq }} {{ product.unit }} </span>
                  </div>

                  <div class="shrink-0 text-right">
                    <p class="text-sm font-semibold text-body">
                      {{
                        $currency(product.pricing.min_price, product.currency)
                      }}
                    </p>

                    <p
                      v-if="
                        product.pricing.min_price !== product.pricing.max_price
                      "
                      class="mt-0.5 text-xs text-muted"
                    >
                      Up to
                      {{
                        $currency(product.pricing.max_price, product.currency)
                      }}
                    </p>
                  </div>
                </button>
              </article>
            </div>
          </template>

          <div v-else class="py-8 text-center">
            <UIcon
              name="i-lucide-search"
              class="mx-auto size-8 text-gray-300"
            />

            <p class="mt-2 text-sm text-muted">
              Search for products, brands or categories
            </p>
          </div>
        </div>

        <button
          v-if="form.search && products?.length"
          type="button"
          class="flex w-full items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/5"
          @click="viewAllResults"
        >
          View all results

          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>
