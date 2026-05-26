<script setup>
const route = useRoute();
const vendorStore = useVendorStore();

const page = ref(1);
const products = ref([]);

const loadVendorProducts = async () => {
  const response = await vendorStore.getProducts(route.params.slug, page.value);
  products.value = response.data;
};

onMounted(() => {
  loadVendorProducts();
});
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-5">
    <div v-for="product in products.data" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>

  <!-- Pagination -->
  <div class="flex justify-end mt-4" v-if="products?.meta">
    <UPagination
      v-model:page="page"
      :page-count="products.meta.last_page"
      :total="products.meta.total"
      @change="loadVendorProducts"
    />
  </div>
</template>

<style scoped></style>
