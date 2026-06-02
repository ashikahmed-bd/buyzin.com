<script setup>
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();


const { related } = storeToRefs(productStore);


const { data: product, pending, refresh } = await useAsyncData(
  () => `product-${route.params.slug}-${route.params.id}`,
  async () => {
    return await productStore.getProduct(
      route.params.slug,
      route.params.id
    )
  },
  {
    watch: [() => route.params.slug, () => route.params.id]
  }
)


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
  <main>
    <div class="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <template v-if="product">
        <SeoMeta :title="product.seo?.title" :description="product.seo?.description" :keywords="product.seo?.keywords"
          :image="product.seo?.og_image" />

        <UBreadcrumb :items="[
          { label: 'Home', to: '/' },
          { label: product?.category?.name, to: '/' },
          { label: product?.name },
        ]" class="mb-5 md:mb-8" />

        <section class="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-4">
          <div class="w-full">
            <ProductGallery :product="product?.media" class="w-full" />
          </div>

          <div class="w-full">
            <div class="sticky top-24 bg-white space-y-6">
              <div class="space-y-2">
                <div v-if="product.is_promo"
                  class="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-pink-500 text-white ">
                  <div class="flex items-center justify-between px-5 py-4">
                    <div class="flex items-center gap-4">
                      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <UIcon name="i-heroicons-percent-badge" class="h-6 w-6 text-white" />
                      </div>

                      <div>
                        <p class="text-sm font-semibold uppercase tracking-wide">
                          Limited Time Promo!
                        </p>
                        <p class="text-xs text-white/80">
                          Don’t miss this exclusive offer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h1 class="text-2xl md:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                  {{ product?.name }}
                </h1>

                <div class="flex flex-wrap items-center gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center">
                      <UIcon v-for="(type, i) in getStars(product.rating_avg)" :key="i" :name="type === 'full'
                        ? 'i-heroicons-star-solid'
                        : type === 'half'
                          ? 'i-heroicons-star'
                          : 'i-heroicons-star'
                        " class="text-amber-400 size-4" />
                    </div>

                    <span class="font-semibold text-gray-900">
                      {{ product?.rating_avg?.toFixed(1) }}
                    </span>

                    <span class="text-gray-500 text-sm">
                      ({{ product?.review_count }})
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

              <div class="flex flex-wrap items-end gap-3">
                <span class="text-3xl md:text-4xl font-black text-primary leading-none">
                  {{ product?.price_formatted }}
                </span>

                <del v-if="product?.base_price > product?.price" class="text-base md:text-lg text-gray-400 font-medium">
                  {{ product?.base_price_formatted }}
                </del>

                <span v-if="product?.discount_percentage > 0"
                  class="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1 text-xs md:text-sm font-bold">
                  {{ product?.discount_percentage_formatted }} OFF
                </span>
              </div>

              <div v-if="product?.summary" class="prose prose-sm max-w-none text-gray-600">
                <div v-html="product?.summary" class="text-base leading-7"></div>
              </div>

              <div class="flex flex-wrap gap-2 mt-4 text-xs">
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

              <div v-if="product.variants?.length" class="space-y-5">
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

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-if="product?.shipping?.is_shippable"
                  class="flex items-start gap-3 rounded border border-border bg-surface p-2.5">
                  <UIcon name="i-lucide-truck" class="size-6" />
                  <div>
                    <h4 class="text-sm font-bold text-dark">Fast Delivery</h4>
                    <p class="text-sm leading-6 text-body">
                      {{ product?.shipping?.estimated_delivery }}
                    </p>
                  </div>
                </div>

                <div v-if="product?.warranty"
                  class="flex items-start gap-3 rounded border border-border bg-surface p-2.5">
                  <UIcon name="i-lucide-shield-check" class="size-6" />
                  <div>
                    <h4 class="text-sm font-bold text-dark">
                      Warranty Protection
                    </h4>
                    <p class="text-sm leading-6 text-body">
                      {{ product?.warranty }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <span class="font-semibold text-gray-900">Need help?</span>
                Chat with support before placing your order.
              </div>
            </div>
          </div>
        </section>
      </template>

      <template v-else>
        <div class="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm">
          Product not found.
        </div>
      </template>

      <div class="bg-white py-4 rounded-xl">
        <Tabs :tabs="[
          { label: 'Description', slot: 'description' },
          { label: 'Specifications', slot: 'specifications' },
          { label: 'Reviews', slot: 'reviews' },
        ]">
          <template #description>
            <div v-html="product?.description" class="text-body max-w-5xl leading-relaxed"></div>
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
      </div>

      <div class="py-8 md:16">
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
      </div>
    </div>

    <CartSuccessDialog :show="cartStore.dialog" @close="cartStore.dialog = false" />
  </main>
</template>
