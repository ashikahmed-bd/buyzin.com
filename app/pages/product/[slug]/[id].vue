<script setup>
const route = useRoute();

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

const cartDialog = ref(false);
const selectedOptions = ref({});

const selectOption = (attribute, option) => {
  selectedOptions.value[attribute.id] = option.id;

  cartDialog.value = true;
};

const selectedVariant = computed(() => {
  const variants = product.value?.variants ?? [];
  const attributes = product.value?.attributes ?? [];

  if (Object.keys(selectedOptions.value).length !== attributes.length) {
    return null;
  }

  return (
    variants.find((variant) =>
      attributes.every((attribute) =>
        variant.options?.some(
          (item) =>
            String(item.attribute?.id) === String(attribute.id) &&
            String(item.option?.id) ===
              String(selectedOptions.value[attribute.id]),
        ),
      ),
    ) ?? null
  );
});

const inquiryOpen = ref(false);

const inquiryForm = ref({
  quantity: 1,
  target_price: null,
  message: "",
});

const openInquiry = () => {
  if (product.value?.variants?.length && !selectedVariant.value) {
    return;
  }

  inquiryForm.value = {
    quantity: product.value?.moq ?? 1,
    message: "",
  };

  inquiryOpen.value = true;
};

const sendInquiry = async () => {
  const payload = {
    product_id: product.value.id,
    variant_id: selectedVariant.value?.id ?? null,
    quantity: inquiryForm.value.quantity,
    message: inquiryForm.value.message,
    options: Object.entries(selectedOptions.value).map(
      ([attribute_id, attribute_option_id]) => ({
        attribute_id,
        attribute_option_id,
      }),
    ),
  };

  console.log("Inquiry:", payload);

  inquiryOpen.value = false;
};
</script>

<template>
  <main class="mx-auto max-w-7xl bg-white px-4">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else>
      <SeoMeta
        :title="product?.meta_title ?? product?.name"
        :description="product?.meta_description ?? product?.summary"
        :keywords="product?.meta_keywords ?? product?.summary"
        :image="product?.cover_url"
      />

      <header class="border-b border-slate-200 bg-white">
        <div class="mx-auto py-2">
          <div class="flex items-center justify-between gap-4">
            <nav class="flex min-w-0 items-center gap-2 text-sm">
              <a href="#" class="shrink-0 text-slate-500 hover:text-slate-900">
                Home
              </a>
              <span class="text-slate-300">/</span>
              <a
                href="#"
                class="hidden text-slate-500 hover:text-slate-900 sm:block"
              >
                Apparel
              </a>

              <span class="hidden text-slate-300 sm:block">/</span>

              <a
                href="#"
                class="hidden text-slate-500 hover:text-slate-900 md:block"
              >
                Men's Wear
              </a>

              <span class="hidden text-slate-300 md:block">/</span>

              <a
                href="#"
                class="hidden text-slate-500 hover:text-slate-900 lg:block"
              >
                T-Shirts
              </a>

              <span class="text-slate-300">/</span>

              <span class="truncate font-medium text-slate-900">
                {{ product?.name }}
              </span>
            </nav>

            <div class="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <UIcon name="i-lucide-share-2" class="h-4 w-4" />
                Share
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <UIcon name="i-lucide-heart" class="h-4 w-4" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="mx-auto max-w-7xl py-6">
        <div
          class="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.48fr)_18rem]"
        >
          <section class="min-w-0">
            <ProductGallery
              :images="
                [product?.cover_url, ...(product?.gallery || [])].filter(
                  Boolean,
                )
              "
              :video="product?.video_url"
            />
          </section>

          <section class="min-w-0">
            <div class="space-y-4">
              <div class="space-y-2">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-title"
                >
                  {{ product?.name }}
                </h1>
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <!-- Rating -->
                  <div class="flex items-center">
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
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      "
                    />

                    <span class="ml-1.5 font-semibold text-slate-900">
                      {{ Number(product?.rating ?? 0).toFixed(1) }}
                    </span>
                  </div>

                  <!-- Reviews -->
                  <span
                    class="font-medium text-blue-600 after:ml-2 after:text-slate-300 after:content-['•']"
                  >
                    ({{ product?.review_count ?? 0 }} reviews)
                  </span>

                  <!-- Sold -->
                  <span
                    class="font-medium text-slate-500 after:ml-2 after:text-slate-300 after:content-['•']"
                  >
                    {{ product?.sold_count ?? 0 }}+ Sold
                  </span>
                </div>

                <!-- Product Meta -->
                <div
                  class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm"
                >
                  <!-- SKU -->
                  <div class="flex items-center gap-1.5">
                    <span class="text-slate-400">SKU:</span>
                    <span class="font-medium text-slate-700">
                      {{ product?.sku ?? "N/A" }}
                    </span>
                  </div>

                  <!-- Brand -->
                  <div class="flex items-center gap-1.5">
                    <span class="text-slate-400">Brand:</span>
                    <span class="font-medium text-slate-700">
                      {{ product?.brand?.name ?? product?.brand ?? "N/A" }}
                    </span>
                  </div>

                  <!-- Category -->
                  <div class="flex items-center gap-1.5">
                    <span class="text-slate-400">Category:</span>
                    <span class="font-medium text-slate-700">
                      {{
                        product?.category?.name ?? product?.category ?? "N/A"
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div class="space-y-4">
                <div class="flex items-end justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-gray-900">
                      Bulk Pricing
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Order more, save more
                    </p>
                  </div>

                  <div class="text-right">
                    <p class="text-xs text-muted">Starting from</p>

                    <p class="text-xl font-semibold">
                      {{
                        $currency(product?.pricing?.min_price, product.currency)
                      }}
                      -
                      {{
                        $currency(product?.pricing?.max_price, product.currency)
                      }}
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div
                    v-for="tier in product?.pricing?.tiers ?? []"
                    :key="tier.id"
                    class="group relative rounded-xl border border-border bg-white p-2.5 transition hover:-translate-y-0.5"
                  >
                    <span class="text-xl font-bold text-title">
                      {{ $currency(tier.price, product.currency) }}
                    </span>
                    <div>
                      <p class="font-semibold text-body">
                        {{ tier.min_quantity }}
                        <span class="text-body">-</span>
                        {{ tier.max_quantity }}
                        pcs
                      </p>
                    </div>

                    <div class="block">
                      <span class="text-2xs text-body line-through">
                        {{ $currency(tier.compare_price, product.currency) }}
                      </span>

                      <span class="ml-2 text-2xs font-medium text-success">
                        {{
                          $currency(
                            Number(tier.compare_price) - Number(tier.price),
                            product.currency,
                          )
                        }}
                        OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Attributes -->
              <div
                v-for="attribute in product?.attributes ?? []"
                :key="attribute.id"
              >
                <div class="flex items-center justify-between gap-3">
                  <h3 class="text-sm font-semibold text-title">
                    {{ attribute.name }}

                    <span v-if="attribute.is_required" class="text-danger"
                      >*</span
                    >
                  </h3>

                  <span
                    v-if="selectedOptions[attribute.id]"
                    class="text-xs font-medium text-body"
                  >
                    {{
                      attribute.options?.find(
                        (option) => option.id === selectedOptions[attribute.id],
                      )?.name
                    }}
                  </span>
                </div>

                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in attribute.options ?? []"
                    :key="option.id"
                    type="button"
                    class="rounded border px-2 py-1.5 text-sm font-medium transition"
                    :class="
                      selectedOptions[attribute.id] === option.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-500'
                    "
                    @click="selectOption(attribute, option)"
                  >
                    {{ option.name }}
                  </button>
                </div>
              </div>

              <div class="py-2">
                <MDC :value="product?.summary" class="prose max-w-none" />
              </div>
            </div>
          </section>

          <aside class="min-w-0">
            <div class="sticky top-20 space-y-4 bg-white p-4">
              <div class="flex items-start gap-3.5">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-700"
                >
                  <UIcon name="i-lucide-store" class="size-5" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <h2 class="truncate text-sm font-bold text-slate-950">
                      Buyzin Express
                    </h2>

                    <UIcon
                      name="i-lucide-badge-check"
                      class="size-4 shrink-0 text-blue-600"
                    />
                  </div>

                  <p class="mt-0.5 text-xs text-slate-500">
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

              <!-- Shipping -->
              <section class="space-y-4">
                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
                  >
                    <UIcon name="i-lucide-truck" class="size-4" />
                  </div>

                  <div class="min-w-0">
                    <h4 class="text-xs font-medium text-muted">Shipping</h4>

                    <p class="mt-0.5 text-sm font-normal text-body">
                      Flexible wholesale delivery
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
                  >
                    <UIcon name="i-lucide-map-pin" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-xs font-medium text-muted">Ships from</h4>

                    <p class="mt-0.5 break-words text-sm font-normal text-body">
                      {{ product?.ships_from }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-amber-50 text-amber-600"
                  >
                    <UIcon name="i-lucide-clock-3" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-xs font-medium text-muted">
                      Processing time
                    </h4>

                    <p class="mt-0.5 text-sm font-normal text-body">
                      {{ product?.processing_days }} days
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-emerald-50 text-emerald-600"
                  >
                    <UIcon name="i-lucide-package-check" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-xs font-medium text-muted">Delivery</h4>

                    <p class="mt-0.5 text-sm font-normal text-body">
                      Negotiable with supplier
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-violet-50 text-violet-600"
                  >
                    <UIcon name="i-lucide-credit-card" class="size-4" />
                  </div>

                  <div class="min-w-0">
                    <h4 class="text-xs font-medium text-muted">
                      Payment Terms
                    </h4>

                    <p class="mt-0.5 text-sm font-normal text-body">
                      T/T, L/C, Western Union
                    </p>
                  </div>
                </div>
              </section>

              <section class="space-y-3">
                <button
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="product?.has_variants"
                  @click="cartDialog = !cartDialog"
                >
                  <UIcon name="i-lucide-shopping-cart" class="size-5" />
                  Add to cart
                </button>

                <button
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <UIcon name="i-lucide-message-circle" class="size-5" />
                  Chat now
                </button>
              </section>

              <!-- Payment Methods -->
              <section class="space-y-4">
                <h3 class="text-sm font-semibold text-slate-900">
                  Payment methods
                </h3>

                <div class="flex items-center gap-4">
                  <NuxtImg
                    src="/visa.png"
                    alt="Visa"
                    class="h-5 w-auto object-contain"
                  />

                  <NuxtImg
                    src="/mastercard.png"
                    alt="Mastercard"
                    class="h-5 w-auto object-contain"
                  />

                  <NuxtImg
                    src="/paypal.png"
                    alt="PayPal"
                    class="h-5 w-auto object-contain"
                  />

                  <NuxtImg
                    src="/applepay.png"
                    alt="Apple Pay"
                    class="h-5 w-auto object-contain"
                  />
                </div>
              </section>

              <!-- Buyer Protection -->
              <section class="flex items-start gap-2">
                <UIcon name="i-lucide-shield-check" class="size-6" />

                <div class="block">
                  <h4 class="text-sm font-semibold text-slate-900">
                    Buyer Protection
                  </h4>

                  <p class="mt-1 text-xs leading-5 text-slate-600">
                    Get a full refund if the item is not as described or is not
                    delivered.
                  </p>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </main>
    </template>

    <DialogCart v-model:open="cartDialog" :product="product" />
  </main>
</template>

<style scoped></style>
