<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const productStore = useProductStore();

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

const selectedOptions = ref({});

const selectOption = (attribute, option) => {
  selectedOptions.value = {
    ...selectedOptions.value,
    [attribute.id]: option.id,
  };
};

const selectedVariant = computed(() => {
  const variants = product.value?.variants ?? [];
  const attributes = product.value?.attributes ?? [];
  const selected = selectedOptions.value;

  if (!variants.length || !attributes.length) {
    return null;
  }

  // Total number of product attributes
  const attributeCount = attributes.length;

  // Number of selected attributes
  const selectedCount = Object.keys(selected).length;

  // Return null if all attributes are not selected
  if (selectedCount !== attributeCount) {
    return null;
  }

  return (
    variants.find((variant) => {
      const variantOptions = variant.options ?? [];

      // Variant must have the same number of options as product attributes
      if (variantOptions.length !== attributeCount) {
        return false;
      }

      // Every attribute must match its selected option
      return attributes.every((attribute) => {
        const selectedOptionId = selected[attribute.id];

        return variantOptions.some((variantOption) => {
          return (
            String(variantOption.attribute?.id) === String(attribute.id) &&
            String(variantOption.option?.id) === String(selectedOptionId)
          );
        });
      });
    }) ?? null
  );
});

const currentPrice = computed(() => {
  return Number(selectedVariant.value?.price ?? product.value?.price ?? 0);
});

const currentComparePrice = computed(() => {
  return Number(
    selectedVariant.value?.compare_price ?? product.value?.compare_price ?? 0,
  );
});

const discount = computed(() => {
  if (
    !currentComparePrice.value ||
    currentComparePrice.value <= currentPrice.value
  ) {
    return 0;
  }

  return Math.round(
    ((currentComparePrice.value - currentPrice.value) /
      currentComparePrice.value) *
      100,
  );
});

const addToCart = () => {
  const variant = selectedVariant.value;

  // Product has variants but no variant is selected
  if (product.value?.variants?.length && !variant) {
    alert("Please select all product options.");
    return;
  }

  const cartItem = {
    product_id: product.value.id,
    variant_id: variant?.id ?? null,

    name: product.value.name,
    sku: variant?.sku ?? product.value.sku ?? null,
    price: variant?.price ?? product.value.price ?? 0,
    compare_price:
      variant?.compare_price ?? product.value.compare_price ?? null,
    quantity: 1,

    // Keep selected variant options
    options:
      variant?.options?.map((item) => ({
        attribute_id: item.attribute?.id,
        attribute_name: item.attribute?.name,
        option_id: item.option?.id,
        option_name: item.option?.name,
      })) ?? [],

    image: "https://placehold.co/400",
  };

  console.log("Add to cart:", cartItem);
};

const variantQuantities = ref({});

const increaseVariantQuantity = (variant) => {
  const current = variantQuantities.value[variant.id] ?? 0;

  const min = variant.minimum_order_quantity ?? 1;
  const max = variant.maximum_order_quantity ?? Infinity;
  const step = variant.order_step ?? 1;

  variantQuantities.value[variant.id] =
    current === 0 ? min : Math.min(current + step, max);
};

const decreaseVariantQuantity = (variant) => {
  const current = variantQuantities.value[variant.id] ?? 0;

  const min = variant.minimum_order_quantity ?? 1;
  const step = variant.order_step ?? 1;

  if (current <= 0) {
    return;
  }

  const next = current - step;

  variantQuantities.value[variant.id] = next < min ? 0 : next;
};

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
  <main class="max-w-7xl mx-auto bg-white px-4">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else>
      <SeoMeta
        :title="product?.meta_title"
        :description="product?.meta_description"
        :keywords="product?.meta_keywords"
        :image="product?.cover_url"
      />

      <UBreadcrumb
        class="py-4"
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
      />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div
          class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]"
        >
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
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="true"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 sm:px-3"
                >
                  <UIcon name="i-lucide-building-2" class="size-4" />
                  Wholesale
                </span>

                <span
                  v-if="product.has_variants"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 sm:px-3"
                >
                  <UIcon name="i-lucide-package-check" class="size-4" />
                  Variants Available
                </span>

                <span
                  v-if="product.shipping_available"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 sm:px-3"
                >
                  <UIcon name="i-lucide-truck" class="size-4" />
                  Shipping Available
                </span>
              </div>

              <div>
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-slate-950 sm:text-2xl"
                >
                  {{ product.name }}
                </h1>
              </div>

              <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                <div class="flex items-center gap-1">
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

                  <span class="ml-1 font-semibold text-slate-900">
                    {{ Number(product?.rating ?? 0).toFixed(1) }}
                  </span>
                </div>

                <span
                  class="text-body after:ml-3 after:content-['•'] last:after:hidden"
                >
                  {{ product.review_count }} reviews
                </span>

                <span class="text-body">
                  SKU:
                  <strong class="font-medium text-slate-800">
                    {{ product.sku }}
                  </strong>
                </span>
              </div>

              <div class="py-2">
                <MDC :value="product?.summary" class="prose max-w-none" />
              </div>

              <div
                v-if="product.pricings?.length"
                class="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                <article
                  v-for="price in product.pricings"
                  :key="price.id"
                  class="rounded border border-slate-200 bg-slate-50 p-2.5 transition"
                >
                  <div class="text-lg font-bold text-slate-950">
                    {{ $currency(price.price) }}
                  </div>
                  <div class="text-xs font-medium text-slate-500">
                    {{ price.min_quantity }}+

                    <span v-if="tier.max_quantity">
                      – {{ price.max_quantity }}
                    </span>

                    pieces
                  </div>
                </article>
              </div>

              <div v-else class="flex flex-wrap items-center gap-2 sm:gap-3">
                <span class="text-2xl font-bold text-slate-950 sm:text-3xl">
                  {{ $currency(currentPrice) }}
                </span>

                <span
                  v-if="currentComparePrice > currentPrice"
                  class="text-base text-slate-400 line-through sm:text-lg"
                >
                  {{ $currency(currentComparePrice) }}
                </span>

                <span
                  v-if="discount"
                  class="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700"
                >
                  {{ discount }}% OFF
                </span>
              </div>

              <p class="mt-3 text-xs leading-5 text-slate-500">
                Price depends on quantity and selected variant.
              </p>

              <div v-for="attribute in product.attributes" :key="attribute.id">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-sm font-semibold text-slate-900">
                    {{ attribute.name }}
                  </h3>
                  <span
                    v-if="selectedOptions[attribute.id]"
                    class="text-xs font-medium text-slate-500"
                  >
                    {{
                      attribute.options.find(
                        (option) => option.id === selectedOptions[attribute.id],
                      )?.name
                    }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in attribute.options"
                    :key="option.id"
                    type="button"
                    @click="selectOption(attribute, option)"
                    class="min-w-14 rounded border px-3 py-2 text-sm font-medium transition"
                    :class="
                      selectedOptions[attribute.id] === option.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                    "
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <!-- Variants -->
              <div class="py-4 space-y-2">
                <article
                  v-for="variant in product.variants"
                  :key="variant.id"
                  class="flex items-center gap-4"
                >
                  <div
                    class="flex size-5 shrink-0 items-center justify-center rounded-full"
                    :class="
                      selectedVariant?.id === variant.id
                        ? 'bg-blue-600 text-white'
                        : 'border-2 border-slate-300 bg-white'
                    "
                  >
                    <UIcon
                      v-if="selectedVariant?.id === variant.id"
                      name="i-lucide-check"
                      class="size-3"
                    />
                  </div>

                  <div
                    class="overflow-hidden rounded size-10 bg-white ring-1 ring-blue-200"
                  >
                    <img
                      src="https://placehold.co/80"
                      class="h-full w-full object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-sm font-semibold text-slate-900">
                      {{ variant.name }}
                    </h4>

                    <p class="text-xs text-slate-400">SKU: {{ variant.sku }}</p>
                  </div>

                  <!-- Price -->
                  <div class="text-right">
                    <p class="text-sm font-semibold text-slate-800">
                      {{ product.currency }}
                      {{ variant.price ?? product.price }}
                    </p>

                    <p
                      v-if="variant.compare_price"
                      class="text-xs text-slate-400 line-through"
                    >
                      {{ product.currency }} {{ variant.compare_price }}
                    </p>
                  </div>

                  <!-- Quantity -->
                  <div
                    class="flex h-9 overflow-hidden rounded-full border border-slate-200"
                    @click.stop
                  >
                    <!-- Minus -->
                    <button
                      type="button"
                      class="flex w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                      :disabled="!variantQuantities[variant.id]"
                      @click="decreaseVariantQuantity(variant)"
                    >
                      <UIcon name="i-lucide-minus" class="size-4" />
                    </button>

                    <!-- Quantity -->
                    <span
                      class="flex min-w-12 items-center justify-center border-x border-slate-200 px-2 text-sm font-medium text-slate-800"
                    >
                      {{ variantQuantities[variant.id] ?? 0 }}
                    </span>

                    <!-- Plus -->
                    <button
                      type="button"
                      class="flex w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50"
                      @click="increaseVariantQuantity(variant)"
                    >
                      <UIcon name="i-lucide-plus" class="size-4" />
                    </button>
                  </div>
                </article>
              </div>

              <!-- Summary -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold text-slate-900">Subtotal</p>

                    <p class="mt-1 text-2xl font-bold text-slate-900">
                      BDT 33,720.00
                    </p>

                    <p class="text-xs text-slate-500">BDT 134.88 / piece</p>
                  </div>

                  <UIcon
                    name="i-lucide-chevron-up"
                    class="size-5 text-slate-500"
                  />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-primary text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <UIcon name="i-lucide-mail" class="size-5" />

                    Send inquiry
                  </button>

                  <button
                    type="button"
                    class="flex items-center justify-center gap-2 px-2 py-2 rounded border border-slate-300 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <UIcon name="i-lucide-messages-square" class="size-5" />

                    Chat now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white col-span-2">
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
                  label: 'Faq',
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
              <template #faq>
                <ProductFaq />
              </template>
            </UTabs>
          </div>
        </div>

        <aside class="min-w-0">
          <div
            class="bg-white rounded-2xl border border-slate-200 lg:sticky top-0 space-y-4 px-4 py-6"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm"
              >
                <UIcon name="i-lucide-store" class="size-6" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <h2 class="truncate text-sm font-bold text-slate-950">
                    Buyzin Express
                  </h2>

                  <UIcon
                    name="i-lucide-badge-check"
                    class="size-4 shrink-0 text-blue-600"
                  />
                </div>

                <p class="mt-1 text-xs text-slate-500">
                  Verified wholesale supplier
                </p>

                <div class="mt-2 flex items-center gap-1.5">
                  <UIcon
                    name="i-lucide-star"
                    class="size-3.5 fill-amber-400 text-amber-400"
                  />

                  <span class="text-xs font-semibold text-slate-700">
                    4.9
                  </span>

                  <span class="text-xs text-slate-400">
                    · 98% response rate
                  </span>
                </div>
              </div>
            </div>

            <!-- Contact Supplier -->
            <div class="grid grid-cols-2 gap-2 py-2">
              <button
                type="button"
                class="flex items-center justify-center gap-2 px-2 py-2 rounded border border-slate-300 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                <UIcon name="i-lucide-store" class="size-4" />

                Visit Store
              </button>

              <button
                type="button"
                class="flex items-center justify-center gap-2 px-2 py-2 rounded bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <UIcon name="i-lucide-message-circle" class="size-4" />

                Contact
              </button>
            </div>

            <!-- Shipping -->
            <div class="flex items-center gap-2">
              <div
                class="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
              >
                <UIcon name="i-lucide-truck" class="size-4.5" />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-slate-900">Shipping</h3>

                <p class="text-xs text-slate-500">
                  Flexible wholesale delivery
                </p>
              </div>
            </div>

            <div class="space-y-3">
              <!-- Ships From -->
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-map-pin"
                  class="mt-0.5 size-4 shrink-0 text-slate-400"
                />

                <div class="min-w-0">
                  <p class="text-[11px] text-slate-400">Ships from</p>

                  <p
                    class="mt-0.5 break-word text-sm font-medium text-slate-800"
                  >
                    {{ product.ships_from }}
                  </p>
                </div>
              </div>

              <!-- Processing -->
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-clock-3"
                  class="mt-0.5 size-4 shrink-0 text-slate-400"
                />

                <div>
                  <p class="text-[11px] text-slate-400">Processing time</p>

                  <p class="mt-0.5 text-sm font-medium text-slate-800">
                    {{ product.processing_days }} days
                  </p>
                </div>
              </div>

              <!-- Delivery -->
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-package-check"
                  class="mt-0.5 size-4 shrink-0 text-slate-400"
                />

                <div>
                  <p class="text-xs text-slate-400">Delivery</p>

                  <p class="mt-0.5 text-sm font-medium text-slate-800">
                    Negotiable with supplier
                  </p>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="flex items-center gap-2">
              <div
                class="flex size-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600"
              >
                <UIcon name="i-lucide-credit-card" class="size-4.5" />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-slate-900">Payment</h3>

                <p class="text-xs text-slate-500">Secure payment options</p>
              </div>
            </div>

            <!-- Buyer Protection -->
            <div class="bg-white rounded p-4">
              <h2 class="text-base font-semibold mb-2">Payment methods</h2>

              <div class="flex items-center justify-start gap-8 my-4">
                <img class="h-6 w-auto" src="/visa.png" />
                <img class="h-6 w-auto" src="/mastercard.png" />
                <img class="h-6 w-auto" src="/paypal.png" />
                <img class="h-6 w-auto" src="/applepay.png" />
              </div>
              <h4 class="text-base font-semibold mb-2">Buyer Protection</h4>
              <p class="my-2">
                Get full refund if the item is not as described or if is not
                delivered
              </p>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </main>
</template>

<style scoped></style>
