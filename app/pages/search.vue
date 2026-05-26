<script setup>
import { main } from "#build/ui";

const productStore = useProductStore();

const route = useRoute();
const products = ref([]);

const loadResults = async () => {
  const response = await productStore.getSearch(route.query.query);
  console.log(response);
  products.value = response.data ?? [];
};

watch(
  () => route.query.query,
  () => loadResults()
);

onMounted(() => {
  loadResults();
});
</script>

<template>
  <SeoMeta
    :title="`Search Results for '${route.query.query || ''}' | Buyzin`"
    :description="`Find the best products matching '${
      route.query.query || ''
    }'. Explore deals, prices, and top-rated items.`"
    :keywords="`${
      route.query.query || ''
    }, search products, buy online, best deals`"
  />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <h1 class="text-lg font-semibold mb-4">
      Search Results for "{{ route.query.query || "All Products" }}"
    </h1>

    <div v-if="!products.length" class="text-gray-500 text-center py-10">
      No products found.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </main>
</template>
