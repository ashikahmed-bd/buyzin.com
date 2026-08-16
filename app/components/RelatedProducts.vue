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
} = await useAsyncData(`related-products-${props.product}`, () =>
  productStore.getRelated(props.product),
);
</script>

<template>
  <section class="py-8 md:16">
    <div class="flex flex-wrap items-center justify-between mb-4">
      <div class="block">
        <h2 class="text-2xl font-bold text-heading">Related products</h2>
        <span class="text-body text-sm mt-1">
          Discover our latest arrivals with freshly updated stock in every
          category.</span
        >
      </div>
      <NuxtLink to="/shop" class="text-primary hover:underline text-sm"
        >See all</NuxtLink
      >
    </div>

    <UCarousel
      v-slot="{ item }"
      loop
      :items="products"
      :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5' }"
      class="gap-4"
    >
      <ProductCard :product="item" />
    </UCarousel>
  </section>
</template>
