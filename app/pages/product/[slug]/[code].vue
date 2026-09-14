<script setup>
const route = useRoute();
const toast = useToast();
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const chatStore = useChatStore();

const {
  data: product,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `product-${route.params.slug}-${route.params.code}`,
  () => productStore.getProduct(route.params.slug, route.params.code),
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

const shareLink = async (product) => {
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url,
      });

      return;
    } catch (error) {
      toast.add({
        title: "Share failed",
        description: "Unable to share the product link.",
        color: "error",
      });

      return;
    }
  }

  if (!navigator.clipboard) {
    toast.add({
      title: "Not supported",
      description: "Your browser does not support copying links.",
      color: "error",
    });

    return;
  }

  try {
    await navigator.clipboard.writeText(url);

    toast.add({
      title: "Link copied",
      description: "Product link copied to clipboard.",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Copy failed",
      description: "Unable to copy the product link.",
      color: "error",
    });
  }
};

const addToWishlist = async (product) => {
  await wishlistStore.addItem(product);
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

      <div class="bg-white">
        <div class="mx-auto py-2">
          <div class="flex items-center justify-between gap-4">
            <nav class="flex items-center gap-2 text-sm text-body">
              <a href="/" class="flex items-center gap-2 text-body">
                <span>Home</span>
                <UIcon name="i-lucide-chevron-right" class="size-4" />
              </a>
              <template
                v-for="(item, index) in product?.breadcrumbs"
                :key="index"
              >
                <a
                  v-if="index < product.breadcrumbs.length - 1"
                  :to="item.slug"
                  class="hover:text-primary"
                >
                  {{ item.name }}
                </a>

                <span v-else>
                  {{ item.name }}
                </span>

                <UIcon
                  v-if="index < product.breadcrumbs.length - 1"
                  name="i-lucide-chevron-right"
                  class="size-4"
                />
              </template>
            </nav>

            <div class="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                @click="shareLink(product)"
                class="inline-flex items-center gap-2 text-sm font-medium text-body"
              >
                <UIcon name="i-lucide-share-2" class="size-4" />
                Share
              </button>

              <button
                type="button"
                @click="addToWishlist(product.id)"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                <UIcon name="i-lucide-heart" class="size-4" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="py-4">
        <div
          class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_18rem]"
        >
          <main class="min-w-0">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <div class="min-w-0 space-y-4">
                <div class="space-y-2">
                  <h1
                    class="text-xl font-bold leading-tight tracking-tight text-title"
                  >
                    {{ product?.name }}
                  </h1>
                  <div class="flex flex-wrap items-center gap-x-4">
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

                    <span class="font-medium text-primary">
                      ({{ product?.review_count ?? 0 }} reviews)
                    </span>

                    <span class="font-medium text-body">
                      {{ product?.sold_count ?? 0 }}+ Sold
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-x-4">
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm text-muted">Brand:</span>
                      <a
                        :href="`/brands/${product?.brand?.slug}`"
                        target="_blank"
                        class="text-sm font-medium text-body"
                      >
                        {{ product?.brand?.name ?? "N/A" }}
                      </a>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <span class="text-sm text-muted">Category:</span>
                      <span class="text-sm font-medium text-body">
                        {{
                          product?.category?.name ?? product?.category ?? "N/A"
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex items-end justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-body">
                        Bulk Pricing
                      </h3>
                      <p class="mt-1 text-sm text-body">
                        Order more, save more
                      </p>
                    </div>

                    <div class="text-right">
                      <p class="text-xs text-body">Starting from</p>

                      <p class="text-xl font-semibold text-body">
                        {{
                          $currency(
                            product?.pricing?.min_price,
                            product.currency,
                          )
                        }}
                        -
                        {{
                          $currency(
                            product?.pricing?.max_price,
                            product.currency,
                          )
                        }}
                      </p>
                    </div>
                  </div>

                  <UCarousel
                    :items="product?.pricing?.tiers ?? []"
                    :ui="{
                      item: 'basis-1/2 lg:basis-1/3',
                    }"
                  >
                    <template #default="{ item: tier }">
                      <div
                        class="group relative rounded-xl border border-border bg-white p-2.5 transition hover:-translate-y-0.5"
                      >
                        <span class="text-xl font-bold text-title">
                          {{ $currency(tier.price, product.currency) }}
                        </span>

                        <p class="font-semibold text-body">
                          {{ tier.min_quantity }}
                          <span>-</span>
                          {{ tier.max_quantity }}
                          pcs
                        </p>

                        <div class="block">
                          <span
                            v-if="tier.compare_price"
                            class="text-2xs text-body line-through"
                          >
                            {{
                              $currency(tier.compare_price, product.currency)
                            }}
                          </span>

                          <span
                            v-if="tier.compare_price"
                            class="ml-2 text-2xs font-medium text-success"
                          >
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
                    </template>
                  </UCarousel>
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
                          (option) =>
                            option.id === selectedOptions[attribute.id],
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
            </div>
            <div class="py-6">
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
                ]"
              >
                <template #description>
                  <MDC :value="product?.description" class="prose max-w-none" />
                </template>
                <template #specifications>
                  <table
                    v-for="section in product?.specifications"
                    :key="section.title"
                    class="mb-6 border w-full"
                  >
                    <thead>
                      <tr>
                        <th class="text-left" colspan="2">
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
              </UTabs>
            </div>
          </main>

          <aside class="min-w-0">
            <div class="sticky top-20 space-y-4 bg-white p-4">
              <section class="flex items-start gap-3.5">
                <div
                  class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded bg-slate-100 text-slate-700"
                >
                  <img
                    v-if="product?.store?.logo_url"
                    :src="product.store.logo_url"
                    :alt="product.store.name"
                    class="size-full object-cover"
                  />

                  <UIcon v-else name="i-lucide-store" class="size-5" />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <h2 class="truncate text-sm font-bold text-slate-950">
                      {{ product?.store?.name }}
                    </h2>

                    <UIcon
                      v-if="product?.store?.verified"
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

                    <span class="text-xs font-semibold text-body">
                      {{ product?.store?.rating ?? "0.00" }}
                    </span>

                    <span class="text-xs text-body">
                      · {{ product?.store?.reviews_count ?? 0 }} reviews
                    </span>
                  </div>
                </div>
              </section>

              <!-- Shipping -->
              <section v-if="product?.shipping?.available" class="space-y-4">
                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
                  >
                    <UIcon name="i-lucide-truck" class="size-4" />
                  </div>

                  <div class="min-w-0">
                    <h4 class="text-xs font-medium text-muted">Shipping</h4>
                    <p class="mt-0.5 text-sm font-normal text-body">
                      {{ product?.shipping?.title }}
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

                    <p class="mt-0.5 text-sm font-normal text-body">
                      {{ product?.shipping?.ships_from ?? "Not specified" }}
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
                      {{ product?.shipping?.processing_days ?? 0 }} days
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
                      <template v-if="product?.shipping?.delivery">
                        {{ product.shipping.delivery.min_days }}–{{
                          product.shipping.delivery.max_days
                        }}
                        days

                        <span
                          v-if="product.shipping.delivery.negotiable"
                          class="text-primary"
                        >
                          Negotiable with supplier
                        </span>
                      </template>

                      <span v-else> Negotiable with supplier </span>
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-violet-50 text-violet-600"
                  >
                    <UIcon name="i-lucide-credit-card" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h4 class="text-xs font-medium text-muted">
                      Payment Terms
                    </h4>
                    <p class="mt-0.5 text-sm font-normal text-body">
                      {{ product?.shipping?.payment_terms ?? "Not specified" }}
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
                  @click="chatStore.dialog = true"
                  class="flex w-full items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <UIcon name="i-lucide-messages-square" class="size-5" />
                  Chat now
                </button>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </template>

    <DialogCart v-model:open="cartDialog" :product="product" />

    <ChatDrawer :product="product" />
  </main>
</template>

<style scoped></style>
