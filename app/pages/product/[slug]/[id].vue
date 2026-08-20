<script setup>
const toast = useToast();
const route = useRoute();
const config = useRuntimeConfig();

const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const cartStore = useCartStore();

const { link } = useWhatsapp();

const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = async (product) => {
  const response = await cartStore.store({
    product_id: product.id,
    quantity: quantity.value,
    variant_id: null,
  });

  toast.add({
    title: response.message,
  });
};

const addToWishlist = async (product) => {
  const response = await wishlistStore.addItem(product);
  toast.add({
    title: response.message,
    color: response.success ? "success" : "error",
    icon: response.success ? "i-lucide-circle-check-big" : "i-lucide-x",
  });
};

const {
  data: product,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-${route.params.slug}-${route.params.id}`,
  () => productStore.getProduct(route.params.slug, route.params.id),
  {
    watch: [() => route.params.slug, () => route.params.id],
  },
);

useSchemaOrg([
  defineWebPage({
    name: computed(() => product.value?.meta_title ?? ""),
    description: computed(() => product.value?.meta_description ?? ""),
    url: computed(() =>
      new URL(route.fullPath, config.public.siteUrl).toString(),
    ),
    inLanguage: "en-BD",
  }),

  defineBreadcrumb({
    itemListElement: computed(() => [
      {
        name: "Home",
        item: config.public.siteUrl,
      },
      {
        name: product.value?.category?.name ?? "",
        item: `${config.public.siteUrl}/categories/${product.value?.category?.slug ?? ""}`,
      },
      {
        name: product.value?.name ?? "",
        item: new URL(route.fullPath, config.public.siteUrl).toString(),
      },
    ]),
  }),

  defineProduct({
    name: computed(() => product.value?.name ?? ""),
    description: computed(() => product.value?.meta_description ?? ""),
    image: computed(() =>
      [
        product.value?.cover_url ?? "",
        ...(product.value?.gallery ?? []),
      ].filter(Boolean),
    ),

    sku: computed(() => product.value?.sku ?? ""),
    mpn: computed(() => product.value?.id ?? ""),

    category: computed(() => product.value?.category?.name ?? ""),

    brand: {
      name: computed(() => product.value?.brand?.name ?? "Individual"),
    },

    seller: {
      id: computed(() => product.value?.store?.id ?? "Buyzin Seller"),
      name: computed(() => product.value?.store?.name ?? "Buyzin Seller"),
      slug: computed(() => product.value?.store?.slug ?? "buyzin-seller"),
    },

    offers: computed(() => ({
      url: new URL(route.fullPath, config.public.siteUrl).toString(),

      priceCurrency: "BDT",
      price: product.value?.price ?? 0,

      availability: computed(() =>
        product.value?.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      ),
      itemCondition: "https://schema.org/NewCondition",

      ...(product.value?.end_at
        ? {
            priceValidUntil: new Date(product.value.end_at)
              .toISOString()
              .split("T")[0],
          }
        : {}),

      shippingDetails: {
        shippingRate: {
          value: 100,
          currency: "BDT",
        },
        shippingDestination: {
          addressCountry: "BD",
        },
        deliveryTime: {
          handlingTime: {
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },

      hasMerchantReturnPolicy: {
        applicableCountry: "BD",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    })),

    aggregateRating: computed(() => ({
      ratingValue:
        (product.value?.reviews_avg_rating ?? 0) > 0
          ? product.value.reviews_avg_rating
          : 5,

      reviewCount:
        (product.value?.reviews_count ?? 0) > 0
          ? product.value.reviews_count
          : 1,

      bestRating: 5,
      worstRating: 1,
    })),

    aggregateOffer: computed(() => ({
      priceCurrency: "BDT",
      lowPrice: product.value?.price ?? 0,
      highPrice: product.value?.base_price ?? 0,
      offerCount: 1,
      price: product.value?.price ?? 0,
      availability: "https://schema.org/InStock",
    })),

    review: computed(() =>
      (product.value?.reviews ?? []).map((review) => ({
        name: review.review,
        author: {
          name: review.user?.name || "Anonymous",
        },
        reviewRating: {
          ratingValue: (review.rating ?? 0) > 0 ? review.rating : 5,
          bestRating: 5,
          worstRating: 1,
        },
        datePublished: review.created_at ?? undefined,
      })),
    ),
  }),
]);
</script>

<template>
  <main class="max-w-7xl mx-auto bg-white px-4 py-6">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="product">
      <SeoMeta
        :title="product?.meta_title"
        :description="product?.meta_description"
        :keywords="product?.meta_keywords"
        :image="product?.cover_url"
      />

      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          {
            label: product?.category?.name,
            to: '/',
          },
          {
            label: product?.name,
          },
        ]"
        class="mb-5 md:mb-8"
      />

      <section>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div class="min-w-0">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div class="min-w-0">
                <ProductGallery
                  :images="
                    [product?.cover_url, ...(product?.gallery || [])].filter(
                      Boolean,
                    )
                  "
                  :video="product?.video_url"
                />
              </div>

              <div class="min-w-0">
                <div class="space-y-2">
                  <ProductOfferCountdown
                    v-if="product.end_at"
                    :end-date="product.end_at"
                    title="Discount 20 OFF!"
                  />
                  <div>
                    <h1
                      class="text-2xl font-bold leading-tight tracking-tight text-title"
                    >
                      {{ product?.name }}
                    </h1>

                    <div
                      class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
                    >
                      <div class="flex items-center gap-2">
                        <!-- Stars -->
                        <div class="flex items-center gap-0.5">
                          <UIcon
                            v-for="i in 5"
                            :key="i"
                            :name="
                              i <= Math.round(product?.rating ?? 0)
                                ? 'i-heroicons:star-solid'
                                : 'i-heroicons:star'
                            "
                            class="size-4"
                            :class="
                              i <= Math.round(product?.rating ?? 0)
                                ? 'text-yellow-500'
                                : 'text-body'
                            "
                          />
                        </div>

                        <span class="font-semibold text-body">
                          {{ Number(product?.rating ?? 0).toFixed(1) }}
                        </span>

                        <span class="text-gray-500">
                          ({{ product?.review_count ?? 0 }} Reviews)
                        </span>
                      </div>

                      <span class="text-gray-500">
                        Brand:
                        <span class="font-semibold text-gray-900">
                          {{ product?.brand?.name ?? "Individual" }}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div class="flex items-end justify-between">
                    <div class="flex items-baseline gap-2.5">
                      <span
                        class="font-bangla text-4xl font-bold text-gray-900"
                      >
                        {{ product.price_formatted }}
                      </span>

                      <span
                        v-if="product.base_price > product.price"
                        class="font-bangla text-xl text-gray-400 line-through"
                      >
                        {{ product.base_price_formatted }}
                      </span>

                      <span
                        v-if="product.has_discount"
                        class="font-bangla text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded"
                      >
                        Save {{ product.discount_percentage }}
                      </span>
                    </div>
                  </div>

                  <div v-if="product?.highlights" class="text-body">
                    <h2 class="text-base font-bold text-title py-2">
                      Highlights:
                    </h2>
                    <MDC
                      :value="product?.highlights"
                      class="prose max-w-none"
                    />
                  </div>

                  <div
                    v-if="product?.dimensions"
                    class="flex flex-wrap items-center gap-2 py-4"
                  >
                    <div
                      v-if="product?.dimensions?.weight"
                      class="inline-flex items-center gap-2 text-xs leading-none"
                    >
                      <span class="text-gray-500">Weight</span>
                      <span class="font-semibold text-gray-900">
                        {{ product.dimensions.weight
                        }}{{ product.dimensions.unit?.weight }}
                      </span>
                    </div>

                    <div
                      v-if="product?.dimensions?.length"
                      class="inline-flex items-center gap-2 text-xs leading-none"
                    >
                      <span class="text-gray-500">Length</span>
                      <span class="font-semibold text-gray-900">
                        {{ product.dimensions.length
                        }}{{ product.dimensions.unit?.dimension }}
                      </span>
                    </div>

                    <div
                      v-if="product?.dimensions?.width"
                      class="inline-flex items-center gap-2 text-xs leading-none"
                    >
                      <span class="text-gray-500">Width</span>
                      <span class="font-semibold text-gray-900">
                        {{ product.dimensions.width
                        }}{{ product.dimensions.unit?.dimension }}
                      </span>
                    </div>

                    <div
                      v-if="product?.dimensions?.height"
                      class="inline-flex items-center gap-2 text-xs leading-none"
                    >
                      <span class="text-gray-500">Height</span>
                      <span class="font-semibold text-gray-900">
                        {{ product.dimensions.height
                        }}{{ product.dimensions.unit?.dimension }}
                      </span>
                    </div>
                  </div>

                  <!-- variants -->

                  <div class="flex flex-col gap-3 sm:flex-row">
                    <div
                      class="flex shrink-0 items-center overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                      <button
                        type="button"
                        :disabled="quantity <= 1"
                        @click="decreaseQuantity"
                        class="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        aria-label="Decrease quantity"
                      >
                        <UIcon name="i-heroicons:minus" class="size-4" />
                      </button>

                      <span
                        class="flex w-10 items-center justify-center text-sm font-semibold"
                      >
                        {{ quantity }}
                      </span>

                      <button
                        type="button"
                        @click="increaseQuantity"
                        class="flex h-full w-10 items-center justify-center transition hover:bg-gray-50 hover:text-gray-900"
                        aria-label="Increase quantity"
                      >
                        <UIcon name="i-heroicons:plus" class="size-4" />
                      </button>
                    </div>

                    <!-- Add to Cart -->
                    <BaseButton
                      :loading="cartStore.loading"
                      :disabled="cartStore.loading"
                      class="w-full gap-2.5"
                      @click="addToCart(product)"
                    >
                      <UIcon name="i-heroicons:shopping-bag" class="size-5" />
                      <span>Add to Cart</span>
                    </BaseButton>

                    <button
                      type="button"
                      :disabled="wishlistStore.loading"
                      @click="addToWishlist(product)"
                      class="flex px-2 shrink-0 items-center justify-center rounded border border-border transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                      aria-label="Add to wishlist"
                    >
                      <UIcon
                        v-if="wishlistStore.loading"
                        name="i-lucide:loader"
                        class="size-5 animate-spin"
                      />

                      <UIcon v-else name="i-lucide:heart" class="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section class="bg-white py-4 rounded-xl">
              <UTabs
                variant="link"
                :items="[
                  {
                    label: 'Description',
                    slot: 'description',
                  },
                  {
                    label: 'Specifications',
                    slot: 'specifications',
                  },
                  {
                    label: 'Reviews',
                    slot: 'reviews',
                  },
                  {
                    label: 'FAQ',
                    slot: 'faq',
                  },
                ]"
              >
                <template #description>
                  <MDC :value="product?.description" class="prose max-w-none" />
                </template>
                <template #specifications>
                  <table
                    v-for="section in product?.specifications"
                    :key="section.title"
                    class="mb-6 border max-w-5xl w-full"
                  >
                    <thead>
                      <tr class="bg-gray-100">
                        <th class="text-left p-2" colspan="2">
                          {{ section.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in section.items" :key="item.label">
                        <td
                          class="p-2 border-t w-1/4 font-medium text-gray-600"
                        >
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
                <template #faq>
                  <ProductFaq />
                </template>
              </UTabs>
            </section>
          </div>

          <aside class="lg:sticky lg:top-6 lg:self-start">
            <div class="overflow-hidden rounded-2xl border border-border">
              <div class="border-b border-gray-100 p-5 space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100"
                  >
                    <UIcon
                      name="i-heroicons:building-storefront"
                      class="size-6 text-gray-600"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <p
                      class="text-xs font-medium uppercase tracking-wide text-gray-400"
                    >
                      Sold by
                    </p>

                    <div class="mt-0.5 flex items-center gap-1.5">
                      <h2 class="truncate text-sm font-bold text-title">
                        {{ product?.store?.name }}
                      </h2>

                      <UIcon
                        name="i-heroicons:check-badge"
                        class="size-4 shrink-0 text-blue-600"
                      />
                    </div>

                    <div
                      class="mt-1 flex items-center gap-2 text-xs text-gray-500"
                    >
                      <span class="flex items-center gap-1">
                        <UIcon
                          name="i-heroicons:star-solid"
                          class="size-3.5 text-yellow-400"
                        />
                        4.8
                      </span>

                      <span class="text-gray-300">•</span>

                      <span>98% Positive</span>
                    </div>
                  </div>

                  <a
                    :href="
                      link(
                        product?.store?.whatsapp,
                        `Hi, I'm interested in this product: ${config.public.siteUrl}${route.fullPath}`,
                      )
                    "
                    target="_blank"
                    class="flex shrink-0 items-center gap-1.5 rounded border border-border px-3 py-2 text-xs font-semibold"
                  >
                    <UIcon name="i-lucide-messages-square" class="size-4" />
                    Chat
                  </a>
                </div>

                <NuxtLink
                  :to="`/stores/${product.store?.slug}`"
                  class="flex w-full items-center justify-center gap-1.5 rounded border border-border bg-gray-50 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Visit Store

                  <UIcon name="i-heroicons:arrow-up-right" class="size-3.5" />
                </NuxtLink>
              </div>

              <div class="border-b border-border p-4">
                <div class="mt-3 space-y-3">
                  <div class="flex items-start gap-3">
                    <UIcon
                      name="i-heroicons:map-pin"
                      class="mt-0.5 size-5 shrink-0 text-blue-600"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="text-xs font-medium text-gray-500">
                        Deliver to
                      </p>

                      <div class="mt-1 flex items-center justify-between gap-2">
                        <p class="truncate text-xs font-semibold text-body">
                          Rangpur, Kurigram, Rowmari
                        </p>

                        <button
                          type="button"
                          class="shrink-0 text-xs font-bold text-primary hover:text-primary/80"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Time -->
                  <div class="flex items-center gap-3">
                    <UIcon
                      name="i-heroicons:clock"
                      class="size-4 shrink-0 text-body"
                    />

                    <div class="min-w-0 flex-1">
                      <p class="text-xs text-gray-400">Delivery time</p>
                      <p class="mt-0.5 text-xs font-semibold text-gray-800">
                        3-5 working days
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <UIcon
                      name="i-heroicons:banknotes"
                      class="size-4 shrink-0 text-gray-400"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="text-xs text-gray-400">Shipping charge</p>
                      <p class="mt-0.5 text-xs font-bold text-green-600">
                        Free Shipping
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-b border-gray-100 p-5">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-9 items-center justify-center rounded bg-green-50"
                  >
                    <UIcon
                      name="i-heroicons:banknotes"
                      class="size-5 text-green-600"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p class="mt-0.5 text-xs text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>

                  <UIcon
                    name="i-heroicons:check-circle-solid"
                    class="size-5 shrink-0 text-green-500"
                  />
                </div>
              </div>

              <div class="p-5">
                <div class="flex items-center gap-2.5">
                  <div
                    class="flex size-9 items-center justify-center rounded bg-gray-100"
                  >
                    <UIcon
                      name="i-heroicons:shield-check"
                      class="size-5 text-gray-600"
                    />
                  </div>

                  <div>
                    <h2 class="text-sm font-bold text-gray-900">
                      Return & Warranty
                    </h2>

                    <p class="mt-0.5 text-xs text-gray-500">Seller policy</p>
                  </div>
                </div>

                <div class="mt-4 space-y-3">
                  <div class="flex items-start gap-2.5">
                    <UIcon
                      name="i-heroicons:check-circle"
                      class="mt-0.5 size-4 shrink-0 text-green-500"
                    />

                    <div>
                      <p class="text-sm font-semibold text-gray-800">
                        Return & Refund
                      </p>

                      <p class="mt-0.5 text-xs leading-4 text-gray-500">
                        Cancellation, return and refund available
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-2.5">
                    <UIcon
                      name="i-heroicons:information-circle"
                      class="mt-0.5 size-4 shrink-0 text-gray-400"
                    />

                    <div>
                      <p class="text-sm font-semibold text-gray-800">
                        Change of mind
                      </p>

                      <p class="mt-0.5 text-xs leading-4 text-gray-500">
                        Not applicable for this product
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3 rounded-xl bg-blue-50 p-3">
                    <UIcon
                      name="i-heroicons:shield-check"
                      class="mt-0.5 size-5 shrink-0 text-blue-600"
                    />
                    <div class="min-w-0">
                      <p class="font-sm font-bold text-gray-900">
                        Manufacturer Warranty
                      </p>

                      <p class="mt-0.5 text-xs leading-4 text-gray-500">
                        Warranty is included with this product
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <EmptyState v-else />

    <CartSuccessDialog
      :show="cartStore.dialog"
      @close="cartStore.dialog = false"
    />

    <RelatedProducts :product="product.id" />
  </main>
</template>

<style scoped></style>
