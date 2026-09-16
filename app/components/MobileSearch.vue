<script setup>
const form = reactive({
  search: "",
});

const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    sku: "TSH-001",
    price: 450,
    moq: 10,
    unit: "Piece",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    sku: "EAR-002",
    price: 850,
    moq: 5,
    unit: "Piece",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200",
  },
  {
    id: 3,
    name: "Leather Casual Backpack",
    sku: "BAG-003",
    price: 1200,
    moq: 5,
    unit: "Piece",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
  },
];

const showResults = ref(false);

const filteredProducts = computed(() => {
  const keyword = form.search.trim().toLowerCase();

  if (!keyword) {
    return products;
  }

  return products.filter((product) =>
    `${product.name} ${product.sku}`.toLowerCase().includes(keyword),
  );
});

const search = () => {
  showResults.value = true;
};

const selectProduct = (product) => {
  showResults.value = false;
  navigateTo(`/products/${product.id}`);
};
</script>

<template>
  <div class="relative">
    <form @submit.prevent="search" class="relative mb-2 block w-full md:hidden">
      <UIcon
        name="i-lucide-search"
        class="absolute left-3 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-500"
      />

      <input
        v-model="form.search"
        @focus="showResults = true"
        type="search"
        autocomplete="off"
        placeholder="Search products..."
        class="w-full rounded border-2 border-primary/70 bg-white py-2.5 pl-10 pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:outline-none"
      />

      <button
        type="submit"
        class="absolute right-0 top-0 flex h-full items-center justify-center rounded-r bg-primary px-4 transition hover:bg-primary/90"
      >
        <UIcon name="i-lucide-search" class="size-5 text-white" />
      </button>
    </form>

    <div
      v-if="showResults"
      class="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl md:hidden"
    >
      <div class="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h3 class="text-sm font-semibold text-gray-900">Search Results</h3>

          <p class="text-xs text-gray-500">
            {{ filteredProducts.length }} products found
          </p>
        </div>

        <button
          type="button"
          @click="showResults = false"
          class="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <UIcon name="i-lucide-x" class="size-4" />
        </button>
      </div>

      <div v-if="filteredProducts.length" class="max-h-1/2 overflow-y-auto">
        <button
          v-for="product in filteredProducts"
          :key="product.id"
          type="button"
          @click="selectProduct(product)"
          class="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
        >
          <div
            class="size-14 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="size-full object-cover"
            />
          </div>

          <div class="min-w-0 flex-1">
            <h4 class="truncate text-sm font-medium text-gray-900">
              {{ product.name }}
            </h4>

            <p class="mt-0.5 text-xs text-gray-500">SKU: {{ product.sku }}</p>

            <div class="mt-1 flex items-center gap-2 text-xs">
              <span class="font-semibold text-primary">
                ৳{{ product.price }}
              </span>

              <span class="text-gray-400">•</span>

              <span class="text-gray-500"> MOQ {{ product.moq }} </span>
            </div>
          </div>

          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 shrink-0 text-gray-400"
          />
        </button>
      </div>

      <div v-else class="px-4 py-10 text-center">
        <UIcon name="i-lucide-search-x" class="mx-auto size-10 text-gray-300" />

        <h4 class="mt-3 text-sm font-medium text-gray-900">
          No products found
        </h4>

        <p class="mt-1 text-xs text-gray-500">
          Try searching with another keyword.
        </p>
      </div>

      <div v-if="filteredProducts.length" class="border-t bg-gray-50 px-4 py-3">
        <button
          type="button"
          @click="
            navigateTo(`/search?keyword=${encodeURIComponent(form.search)}`)
          "
          class="flex w-full items-center justify-center gap-2 text-sm font-medium text-primary"
        >
          View all results
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>
