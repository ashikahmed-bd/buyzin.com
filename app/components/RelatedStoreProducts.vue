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
} = await useAsyncData(`related-products-${props.product.code}`, () =>
  productStore.getRelated(props.product.slug, props.product.code),
);
</script>

<template>
  <section class="py-8">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h2 class="text-2xl font-bold text-heading">More from this store</h2>

        <p class="mt-1 text-sm text-body">
          Explore more products from this store and discover their latest
          collection.
        </p>
      </div>

      <NuxtLink
        v-if="product?.store?.url"
        :to="product.store.url"
        class="flex-none text-sm font-medium text-primary hover:underline"
      >
        See all
      </NuxtLink>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState
      v-if="!products.length"
      title="No More Products"
      description="No other products available from this store."
    />

    <template v-else>
      <UCarousel
        v-slot="{ item }"
        loop
        :items="products"
        :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5' }"
        class="gap-4"
      >
        <ProductCard :product="item" />
      </UCarousel>
    </template>
  </section>
</template>
