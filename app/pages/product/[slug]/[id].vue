<script setup>
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();
const { link } = useWhatsapp()
const config = useRuntimeConfig();

const { data: product, pending, error, refresh } = await useAsyncData('product', () =>
  productStore.getProduct(
    route.params.slug,
    route.params.id
  ),
  {
    watch: [
      () => route.params.slug,
      () => route.params.id
    ]
  }
);

const selectedVariant = ref(null);

const selectVariant = (variant) => {
  selectedVariant.value = variant;
};

watchEffect(() => {
  if (product.value?.variants?.length && !selectedVariant.value) {
    selectedVariant.value =
      product.value.variants.find((v) => v.is_default) ||
      product.value.variants[0];
  }
});

const addToCart = async (product) => {
  const hasVariants = product?.variants?.length > 0;

  if (hasVariants && !selectedVariant.value?.id) {
    alert("Please select a variant");
    return;
  }

  await cartStore.store({
    product_id: product.id,
    quantity: 1,
    variant_id: hasVariants ? selectedVariant.value.id : null,
  });
};

const addToWishlist = async (product) => {
  await wishlistStore.addItem(product);
};

const getStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return 'full'
    if (i === Math.floor(rating) && rating % 1 >= 0.5) return 'half'
    return 'empty'
  })
}

</script>

<template>

  <main v-if="product">

    <div class="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SeoMeta :title="product?.meta_title" :description="product?.meta_description" :keywords="product?.meta_keywords"
        :image="product?.cover_url" />

      <UBreadcrumb :items="[
        { label: 'Home', to: '/' },
        { label: product?.category?.name, to: '/' },
        { label: product?.name },
      ]" class="mb-5 md:mb-8" />
      <section class="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-6">
        <div class="w-full">
          <ProductGallery :product="product" class="w-full" />
        </div>

        <div class="w-full">
          <div class="sticky top-24 bg-white space-y-3">
            <div class="space-y-2">
              <h1 class="text-2xl md:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                {{ product?.name }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <UIcon v-for="(type, i) in getStars(product?.rating_avg)" :key="i" :name="type === 'full'
                      ? 'i-heroicons:star-solid'
                      : type === 'half'
                        ? 'i-heroicons:star-half-solid'
                        : 'i-heroicons:star'
                      " class="size-4" :class="type === 'full'
                        ? 'text-amber-400'
                        : type === 'half'
                          ? 'text-amber-400'
                          : 'text-gray-300'
                        " />
                  </div>

                  <span class="font-semibold text-gray-900">
                    {{ product?.rating_avg?.toFixed(1) }}
                  </span>

                  <span class="text-gray-500 text-sm">
                    ({{ product?.review_count }} Reviews)
                  </span>
                </div>

                <span class="text-body">
                  SKU:
                  <span class="font-medium text-body">{{ product?.sku ?? "N/A" }}</span>
                </span>
                <div class="space-x-2">
                  <span class="font-normal text-body">Brand:</span>
                  <span class="font-semibold text-dark">{{ product?.brand?.name ?? "Individual" }}</span>
                </div>
              </div>
            </div>

            <div class="py-2">
              <div class="flex items-end justify-between">
                <div class="flex items-baseline gap-2.5">
                  <span class="text-4xl font-bold text-gray-900">
                    {{ product.price_formatted }}
                  </span>

                  <span v-if="product.base_price > product.price" class="text-xl text-gray-400 line-through">
                    {{ product.base_price_formatted }}
                  </span>

                  <span v-if="product.has_discount"
                    class="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Save {{ product.discount_percentage }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="product?.features" class="text-body py-4">
              <MDC :value="product?.features" class="prose max-w-none" />
            </div>

            <div class="flex flex-wrap gap-2 text-xs">
              <div v-if="product?.dimensions?.weight" class="px-3 py-1 bg-white border rounded">
                Weight: {{ product.dimensions.weight }} {{ product.dimensions.unit.weight }}
              </div>

              <div v-if="product?.dimensions?.length" class="px-3 py-1 bg-white border rounded">
                Length: {{ product.dimensions.length }} {{ product.dimensions.unit.dimension }}
              </div>

              <div v-if="product?.dimensions?.width" class="px-3 py-1 bg-white border rounded">
                Width: {{ product.dimensions.width }} {{ product.dimensions.unit.dimension }}
              </div>

              <div v-if="product?.dimensions?.height" class="px-3 py-1 bg-white border rounded">
                Height: {{ product.dimensions.height }} {{ product.dimensions.unit.dimension }}
              </div>
            </div>

            <div v-if="product?.variants?.length" class="space-y-5">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <h3 class="text-sm font-bold text-body">Select Variant:</h3>
                  <span class="text-xs text-muted font-display">
                    {{ selectedVariant?.name }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-2.5">
                  <button v-for="variant in product.variants" :key="variant.id" type="button"
                    @click="selectVariant(variant)" :class="[
                      'cursor-pointer rounded-xl border px-4 py-3 text-left transition-all duration-200',
                      'flex flex-col gap-1.5',
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border bg-white hover:border-primary/40 hover:bg-gray-50',
                    ]">
                    <span :class="[
                      'text-sm font-semibold leading-5',
                      selectedVariant?.id === variant.id
                        ? 'text-primary'
                        : 'text-gray-900',
                    ]">
                      {{ variant.name }}
                    </span>

                    <div class="flex items-center gap-2">
                      <span v-if="variant.base_price > variant.price" class="text-xs text-gray-400 line-through">
                        {{ variant.base_price_formatted }}
                      </span>

                      <span class="text-sm font-bold text-gray-900">
                        {{ variant.price_formatted }}
                      </span>

                      <span v-if="variant.base_price > variant.price"
                        class="text-xs font-semibold text-danger bg-red-50 px-1.5 py-0.5 rounded">
                        {{
                          Math.round(
                            ((variant.base_price - variant.price) /
                              variant.base_price) *
                            100,
                          )
                        }}% OFF
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseButton :loading="cartStore.loading" @click="addToCart(product)" :disabled="cartStore.loading">
                <span class="font-normal text-base">Add to Cart</span>
              </BaseButton>

              <button type="button" @click="addToWishlist(product)"
                class="inline-flex w-full items-center justify-center gap-2 rounded border border-border bg-white transition px-4 py-2.5">
                <span class="font-normal text-base">Add to Wishlist</span>
              </button>
            </div>

            <!-- Support -->
            <div
              class="mt-5 rounded-xl border border-gray-200 bg-gradient-to-r from-green-50 to-white p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <UIcon name="i-lucide-message-circle" class="text-white size-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">Need Help?</p>
                  <p class="text-xs text-gray-600">
                    Chat with us on WhatsApp before ordering
                  </p>
                </div>
              </div>
              <a :href="link(
                product?.store?.phone,
                `Hi, I'm interested in this product: ${config.public.siteUrl}${route.fullPath}`
              )" target="_blank"
                class="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition">
                <UIcon name="i-lucide-message-square" class="size-4" />
                Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 border rounded-xl p-6 bg-white">
          <div class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-badge-check" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Official Warranty
              </h4>
              <p v-html="product?.warranty" class="mt-1 text-sm text-gray-600"></p>

              <NuxtLink to="/warranty-policy" target="_blank"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View details
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-truck" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Estimated Delivery
              </h4>
              <p v-html="product?.estimated_delivery" class="mt-1 text-sm text-gray-600"></p>
              <NuxtLink to="/shipping-delivery" target="_blank"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Learn more
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>

          <div v-if="product?.is_refundable" class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-refresh-cw" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Return Policy
              </h4>

              <p class="mt-1 text-sm text-gray-600">
                {{ product.return_policy }}
              </p>

              <NuxtLink to="/return-policy" target="_blank"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View policy
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-store" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Authorized Seller
              </h4>

              <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                Sold by {{ product?.store?.name }}
              </p>

              <NuxtLink :to="`/stores/${product?.store?.slug}`"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                About Store
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-4 rounded-xl">
        <Tabs :tabs="[
          { label: 'Description', slot: 'description' },
          { label: 'Specifications', slot: 'specifications' },
          { label: 'Reviews', slot: 'reviews' },
        ]">
          <template #description>
            <MDC :value="product?.description" class="prose max-w-none" />
          </template>
          <template #specifications>
            <table v-for="section in product?.specifications" :key="section.title" class="mb-6 border max-w-5xl w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left p-2" colspan="2">{{ section.title }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in section.items" :key="item.label">
                  <td class="p-2 border-t w-1/4 font-medium text-gray-600">
                    {{ item.label }}
                  </td>
                  <td class="p-2 border-t">{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </template>
          <template #reviews>
            <ProductReview />
          </template>
        </Tabs>
      </section>

      <section class="py-8 md:16">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="block">
            <h2 class="text-2xl font-bold text-heading">Related products</h2>
            <span class="text-body text-sm mt-1">
              Discover our latest arrivals with freshly updated stock in every
              category.</span>
          </div>
          <NuxtLink to="/shop" class="text-primary hover:underline text-sm">See all</NuxtLink>
        </div>

        <!-- <UCarousel v-slot="{ item }" loop :items="related"
          :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5' }" class="gap-4">
          <ProductCard :product="item" />
        </UCarousel> -->
      </section>
    </div>

    <CartSuccessDialog :show="cartStore.dialog" @close="cartStore.dialog = false" />
  </main>

  <ErrorState v-else-if="error" :retry="refresh" />

  <LoadingState v-else-if="pending" />

  <LoadingState v-else />

</template>

<style scoped></style>