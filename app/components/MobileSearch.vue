<script setup>
const searchStore = useSearchStore();

const dialog = ref(false);
const products = ref([]);
const pending = ref(false);
const search = ref("");

const productList = computed(() => {
  const data = products.value;

  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;

  return [];
});

const searchProducts = async () => {
  const keyword = search.value.trim();

  if (!keyword) {
    dialog.value = false;
    products.value = [];
    return;
  }

  dialog.value = true;
  pending.value = true;

  try {
    products.value = await searchStore.search(keyword);
  } catch (error) {
    console.error("Search error:", error);
    products.value = [];
  } finally {
    pending.value = false;
  }
};

const debouncedSearch = useDebounceFn(searchProducts, 500);

const onInput = () => {
  const keyword = search.value.trim();

  if (!keyword) {
    dialog.value = false;
    products.value = [];
    pending.value = false;
    return;
  }

  dialog.value = true;
  debouncedSearch();
};

const onFocus = () => {
  if (search.value.trim()) {
    dialog.value = true;
  }
};

const closeSearch = () => {
  dialog.value = false;
};

const openProduct = (product) => {
  if (!product?.url) return;

  dialog.value = false;
  navigateTo(product.url);
};
</script>

<template>
  <div class="relative w-full">
    <form
      @submit.prevent="searchProducts"
      class="relative mb-2 block w-full md:hidden"
    >
      <UIcon
        name="i-lucide-search"
        class="pointer-events-none absolute left-3 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-400"
      />

      <input
        v-model="search"
        @input="onInput"
        @focus="onFocus"
        type="search"
        autocomplete="off"
        enterkeyhint="search"
        placeholder="Search products..."
        class="h-11 w-full rounded-lg border-2 border-primary/70 bg-white py-2.5 pl-10 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />

      <button
        type="submit"
        aria-label="Search"
        class="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-lg bg-primary transition hover:bg-primary/90 active:scale-95"
      >
        <UIcon name="i-lucide-search" class="size-5 text-white" />
      </button>
    </form>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="dialog"
        class="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
      >
        <div
          class="flex items-center justify-between border-b border-gray-100 px-4 py-3"
        >
          <div>
            <h3 class="text-sm font-semibold text-gray-900">Search Results</h3>

            <p class="mt-0.5 text-xs text-gray-500">
              {{
                pending
                  ? "Searching..."
                  : `${productList.length} products found`
              }}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            @click="closeSearch"
            class="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <UIcon name="i-lucide-x" class="size-4" />
          </button>
        </div>

        <div
          v-if="pending"
          class="flex flex-col items-center justify-center py-10"
        >
          <UIcon
            name="i-lucide-loader-circle"
            class="size-7 animate-spin text-primary"
          />

          <p class="mt-3 text-sm text-gray-500">Searching products...</p>
        </div>

        <div
          v-else-if="productList.length"
          class="max-h-[60vh] overflow-y-auto"
        >
          <button
            v-for="product in productList"
            :key="product.id"
            type="button"
            @click="openProduct(product)"
            class="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-0 hover:bg-gray-50 active:bg-gray-100"
          >
            <div
              class="size-14 shrink-0 overflow-hidden rounded border border-border bg-gray-50"
            >
              <NuxtImg
                :src="product?.cover_url"
                :alt="product?.name"
                loading="lazy"
                class="size-full object-cover"
              />
            </div>

            <div class="min-w-0 flex-1 space-y-1">
              <h4 class="truncate text-sm font-medium text-title">
                {{ product?.name }}
              </h4>

              <div class="flex items-center gap-2 text-xs">
                <span class="font-semibold text-primary">
                  {{ $currency(product?.pricing?.min_price, product?.currency) }}- 
                  {{ $currency(product?.pricing?.max_price, product?.currency) }}
                </span>

                <span class="text-gray-300">•</span>

                <span class="text-body text-xs">
                  MOQ {{ product.moq }} {{ product.unit }}
                </span>
              </div>
            </div>

            <UIcon
              name="i-lucide-chevron-right"
              class="size-4 shrink-0 text-body"
            />
          </button>
        </div>

        <div v-else class="px-4 py-10 text-center">
          <UIcon
            name="i-lucide-search-x"
            class="mx-auto size-9 text-gray-300"
          />

          <h4 class="mt-3 text-sm font-medium text-gray-900">
            No products found
          </h4>

          <p class="mt-1 text-xs text-gray-500">
            Try searching with another keyword.
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
