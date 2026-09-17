<script setup>
const productStore = useProductStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const products = ref([]);
const page = ref(1);

const loadProducts = async () => {
  const response = await productStore.getRelated(
    props.product.slug,
    props.product.code,
    {
      page: page.value,
    },
  );

  products.value.push(...(response?.data ?? []));

  return response;
};

const response = await loadProducts();

const loadMore = async () => {
  if (productStore.loading || page.value >= response.meta.last_page) {
    return;
  }

  page.value++;

  await loadProducts();
};
</script>

<template>
  <section class="py-2">
    <div class="py-4">
      <h2 class="text-2xl font-bold text-heading">Related products</h2>

      <span class="mt-1 block text-sm text-body">
        Discover more products you may like from our latest collection.
      </span>
    </div>

    <LoadingState v-if="productStore.loading && !products.length" />

    <template v-else>
      <div
        v-if="products.length"
        class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <ProductCard v-for="item in products" :key="item.id" :product="item" />
      </div>

      <EmptyState
        v-else
        title="No related products"
        description="There are no related products available."
      />

      <div
        v-if="page < response.meta.last_page"
        class="mt-8 flex justify-center"
      >
        <button
          type="button"
          :disabled="productStore.loading"
          class="bg-primary text-white py-2.5 mx-auto flex items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          @click="loadMore"
        >
          <UIcon
            v-if="productStore.loading"
            name="i-lucide-loader"
            class="size-4 animate-spin"
          />
          <span>
            {{ productStore.loading ? "Loading..." : "Load More" }}
          </span>
          <UIcon
            v-if="!productStore.loading"
            name="i-lucide-chevron-down"
            class="size-4"
          />
        </button>
      </div>
    </template>
  </section>
</template>
