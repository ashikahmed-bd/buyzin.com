<script setup>
const productStore = useProductStore();

const props = defineProps({
  product: {
    type: [Number, String],
    required: true,
  },
});

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData(`related-${props.product.code}`, () =>
  productStore.getRelated(props.product.slug, props.product.code),
);
</script>

<template>
  <section class="py-8">
    <div class="py-4">
      <h2 class="text-2xl font-bold text-heading">Related products</h2>

      <span class="mt-1 block text-sm text-body">
        Discover more products you may like from our latest collection.
      </span>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState
      v-if="!products.length"
      title="No Related Products"
      description="We couldn't find any related products at the moment."
    />

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </section>
</template>
