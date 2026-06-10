<script setup>
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();
const { link } = useWhatsapp()
const config = useRuntimeConfig();

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
    <div v-if="pending" class="max-w-7xl mx-auto px-4 py-6 animate-pulse space-y-8">
      <div class="flex gap-2 text-sm">
        <div class="h-4 w-20 bg-gray-200 rounded"></div>
        <div class="h-4 w-4 bg-gray-200 rounded"></div>
        <div class="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      <section class="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-6">

        <div class="space-y-3">
          <div class="aspect-square bg-gray-200 rounded-2xl"></div>
          <div class="grid grid-cols-4 gap-2">
            <div class="h-20 bg-gray-200 rounded-lg"></div>
            <div class="h-20 bg-gray-200 rounded-lg"></div>
            <div class="h-20 bg-gray-200 rounded-lg"></div>
            <div class="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div class="space-y-5">
          <div class="space-y-2">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          <div class="flex gap-3 items-center">
            <div class="h-8 w-32 bg-gray-200 rounded"></div>
            <div class="h-5 w-24 bg-gray-200 rounded"></div>
          </div>

          <div class="flex gap-2">
            <div class="h-4 w-24 bg-gray-200 rounded"></div>
            <div class="h-4 w-10 bg-gray-200 rounded"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
            <div class="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="h-12 bg-gray-200 rounded-xl"></div>
            <div class="h-12 bg-gray-200 rounded-xl"></div>
            <div class="h-12 bg-gray-200 rounded-xl"></div>
            <div class="h-12 bg-gray-200 rounded-xl"></div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="h-11 bg-gray-300 rounded-lg"></div>
            <div class="h-11 bg-gray-200 rounded-lg"></div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="h-16 bg-gray-200 rounded-lg"></div>
            <div class="h-16 bg-gray-200 rounded-lg"></div>
          </div>

        </div>
      </section>

      <div class="space-y-3">
        <div class="flex gap-3">
          <div class="h-8 w-24 bg-gray-200 rounded"></div>
          <div class="h-8 w-28 bg-gray-200 rounded"></div>
          <div class="h-8 w-24 bg-gray-200 rounded"></div>
        </div>

        <div class="h-40 bg-gray-200 rounded-xl"></div>
      </div>
    </div>

    <div v-if="product" class="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SeoMeta :title="product.meta_title" :description="product.meta_description" :keywords="product.meta_keywords"
        :image="product.cover_url" />

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
          <div class="sticky top-24 bg-white space-y-6">
            <div class="space-y-2">
              <div v-if="product.has_discount"
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
                product.store?.phone,
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

      <div class="bg-white py-4 rounded-xl">
        <Tabs :tabs="[
          { label: 'Description', slot: 'description' },
          { label: 'Specifications', slot: 'specifications' },
          { label: 'Reviews', slot: 'reviews' },
        ]">
          <template #description>
            <MDC :value="product?.description" class="prose max-w-none [&_hr]:!my-0"/>
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


    <div v-else class="max-w-2xl mx-auto px-4 py-20 text-center">

      <div class="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-gray-400 size-10" />
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Product not found
      </h2>

      <p class="text-gray-500 mb-6">
        The product you are looking for doesn’t exist or has been removed.
      </p>

      <div class="flex justify-center gap-3">
        <NuxtLink to="/shop" class="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90">
          Back to Shop
        </NuxtLink>

        <NuxtLink to="/" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
          Go Home
        </NuxtLink>
      </div>
    </div>

    <CartSuccessDialog :show="cartStore.dialog" @close="cartStore.dialog = false" />
  </main>
</template>

<style scoped></style>