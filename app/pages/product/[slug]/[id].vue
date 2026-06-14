<script setup>
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();
const { link } = useWhatsapp()
const config = useRuntimeConfig();


const addToCart = async (product) => {
  await cartStore.store({
    product_id: product.id,
    quantity: 1,
    variant_id: null,
  });
}


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

const { data, pending, error, refresh } = await useAsyncData(`product-${route.params.slug}-${route.params.id}`, () =>
  productStore.getProduct(
    route.params.slug,
    route.params.id
  ),
  {
    watch: [() => route.params.slug, () => route.params.id]
  }

);

const product = computed(() => data.value?.product)

watchEffect(() => {
  if (!product.value) return

  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'schema-breadcrumb',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.buyzin.com'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: product.value.category?.name,
              item: `https://www.buyzin.com/categories/${product.value.category?.slug}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: product.value.name,
              item: `https://www.buyzin.com/products/${product.value.slug}/${product.value.id}`
            }
          ]
        })
      },
      {
        type: 'application/ld+json',
        key: 'schema-product',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.value.name,
          description: product.value.summary,
          sku: product.value.sku,
          image: [
            product.value.cover_url,
            ...(product.value.gallery ?? [])
          ].filter(Boolean),
          brand: {
            '@type': 'Brand',
            name: product.value.brand?.name
          },
          category: product.value.category?.name,
          url: `https://www.buyzin.com/products/${product.value.slug}/${product.value.id}`,
          offers: {
            '@type': 'Offer',
            url: `https://www.buyzin.com/products/${product.value.slug}/${product.value.id}`,
            priceCurrency: 'BDT',
            price: product.value.final_price,
            priceValidUntil: product.value.end_at
              ? new Date(product.value.end_at).toISOString().split('T')[0]
              : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toISOString()
                .split('T')[0],
            availability:
              (product.value.quantity ?? 0) > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@type': 'Organization',
              name: product.value.store?.name,
              telephone: product.value.store?.phone
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              returnPolicyCategory: product.value.is_refundable
                ? 'https://schema.org/MerchantReturnFiniteReturnWindow'
                : 'https://schema.org/MerchantReturnNotPermitted',
              merchantReturnDays: 7,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn'
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: 0,
                currency: 'BDT'
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 0,
                  unitCode: 'DAY'
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 1,
                  unitCode: 'DAY'
                }
              }
            }
          },
          ...(Number(product.value.review_count) > 0 && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.value.rating_avg,
              reviewCount: product.value.review_count,
              bestRating: 5,
              worstRating: 1
            }
          })
        })
      },
      {
        type: 'application/ld+json',
        key: 'schema-organization',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: product.value.store?.name,
          telephone: product.value.store?.phone,
          url: `https://www.buyzin.com/stores/${product.value.store?.slug}`
        })
      }
    ]
  })
});


</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6 space-y-5">

    <div v-if="data?.product">
      <SeoMeta :title="data.product?.meta_title" :description="data.product?.meta_description"
        :keywords="data.product?.meta_keywords" :image="data.product?.cover_url" />


      <UBreadcrumb :items="[
        { label: 'Home', to: '/' },
        { label: data.product?.category?.name, to: '/' },
        { label: data.product?.name },
      ]" class="mb-5 md:mb-8" />

      <section class="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-6">
        <div class="w-full">
          <ProductGallery :product="data.product" class="w-full" />
        </div>

        <div class="w-full">
          <div class="sticky top-24 bg-white space-y-3">
            <div class="space-y-2">
              <h1 class="text-2xl md:text-4xl font-extrabold tracking-tight text-dark leading-tight">
                {{ data.product?.name }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <UIcon v-for="(type, i) in getStars(data.product?.rating_avg)" :key="i" :name="type === 'full'
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
                    {{ data.product?.rating_avg?.toFixed(1) }}
                  </span>

                  <span class="text-gray-500 text-sm">
                    ({{ data.product?.review_count }} Reviews)
                  </span>
                </div>

                <span class="text-body">
                  SKU:
                  <span class="font-medium text-body">{{ data.product?.sku ?? "N/A" }}</span>
                </span>
                <div class="space-x-2">
                  <span class="font-normal text-body">Brand:</span>
                  <span class="font-semibold text-dark">{{ data.product?.brand?.name ?? "Individual" }}</span>
                </div>
              </div>
            </div>

            <div class="py-2">
              <div class="flex items-end justify-between">
                <div class="flex items-baseline gap-2.5">
                  <span class="text-4xl font-bold text-gray-900">
                    {{ data.product.price_formatted }}
                  </span>

                  <span v-if="data.product.base_price > data.product.price" class="text-xl text-gray-400 line-through">
                    {{ data.product.base_price_formatted }}
                  </span>

                  <span v-if="data.product.has_discount"
                    class="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Save {{ data.product.discount_percentage }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="data.product?.features" class="text-body py-4">
              <MDC :value="data.product?.features" class="prose max-w-none" />
            </div>

            <div class="flex flex-wrap gap-2 text-xs">
              <div v-if="data.product?.dimensions?.weight" class="px-3 py-1 bg-white border rounded">
                Weight: {{ data.product.dimensions.weight }} {{ data.product.dimensions.unit.weight }}
              </div>

              <div v-if="data.product?.dimensions?.length" class="px-3 py-1 bg-white border rounded">
                Length: {{ data.product.dimensions.length }} {{ data.product.dimensions.unit.dimension }}
              </div>

              <div v-if="data.product?.dimensions?.width" class="px-3 py-1 bg-white border rounded">
                Width: {{ data.product.dimensions.width }} {{ data.product.dimensions.unit.dimension }}
              </div>

              <div v-if="data.product?.dimensions?.height" class="px-3 py-1 bg-white border rounded">
                Height: {{ data.product.dimensions.height }} {{ data.product.dimensions.unit.dimension }}
              </div>
            </div>

            <div v-if="data.product?.variants?.length" class="space-y-5">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <h3 class="text-sm font-bold text-body">Select Variant:</h3>
                  <span class="text-xs text-muted font-display">
                    {{ selectedVariant?.name }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-2.5">
                  <button v-for="variant in data.product.variants" :key="variant.id" type="button"
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
              <BaseButton :loading="cartStore.loading" @click="addToCart(data.product)" :disabled="cartStore.loading">
                <span class="font-normal text-base">Add to Cart</span>
              </BaseButton>

              <button type="button" @click="addToWishlist(data.product)"
                class="inline-flex w-full items-center justify-center gap-2 rounded border border-border bg-white transition px-4 py-2.5">
                <span class="font-normal text-base">Add to Wishlist</span>
              </button>
            </div>

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
                data.product?.store?.phone,
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

      <section class="w-full py-4">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 border rounded-xl p-6 bg-white">
          <div class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-badge-check" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Official Warranty
              </h4>
              <p v-html="data.product?.warranty" class="mt-1 text-sm text-gray-600"></p>

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
              <p v-html="data.product?.estimated_delivery" class="mt-1 text-sm text-gray-600"></p>
              <NuxtLink to="/shipping-delivery" target="_blank"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Learn more
                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon name="i-lucide-refresh-cw" class="size-6" />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900">
                Return Policy
              </h4>

              <p class="mt-1 text-sm text-gray-600">
                {{ data.product?.return_policy }}
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
                Sold by {{ data.product?.store?.name }}
              </p>

              <NuxtLink :to="`/stores/${data.product?.store?.slug}`"
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
            <MDC :value="data.product?.description" class="prose max-w-none" />
          </template>
          <template #specifications>
            <table v-for="section in data.product?.specifications" :key="section.title"
              class="mb-6 border max-w-5xl w-full">
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

        <UCarousel v-slot="{ item }" loop :items="data?.related"
          :ui="{ item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5' }" class="gap-4">
          <ProductCard :product="item" />
        </UCarousel>
      </section>

    </div>

    <ErrorState v-else-if="error" :retry="refresh" />

    <LoadingState v-else-if="pending" />

    <LoadingState v-else />

    <CartSuccessDialog :show="cartStore.dialog" @close="cartStore.dialog = false" />
  </main>
</template>

<style scoped></style>