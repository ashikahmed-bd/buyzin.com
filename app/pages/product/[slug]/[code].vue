<script setup>
const route = useRoute();
const toast = useToast();
const productStore = useProductStore();
const wishlistStore = useWishlistStore();
const chatStore = useChatStore();
const cartStore = useCartStore();

const { data, pending, error, refresh } = await useAsyncData(
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
  <main class="mx-auto max-w-7xl bg-background px-4">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else>
      <SeoMeta
        :title="data?.data?.meta_title ?? data?.data?.name"
        :description="data?.data?.meta_description ?? data?.data?.summary"
        :keywords="data?.data?.meta_keywords ?? data?.data?.summary"
        :image="data?.data?.cover_url"
      />

      <div class="mx-auto py-2">
        <div class="flex items-center justify-between gap-4">
          <nav class="flex flex-wrap items-center gap-2 text-sm text-body">
            <a href="/" class="flex items-center gap-2 text-body">
              <span>Home</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
            <template
              v-for="(item, index) in data?.data?.breadcrumbs"
              :key="index"
            >
              <a
                v-if="index < data?.data.breadcrumbs.length - 1"
                :to="item.slug"
                class="whitespace-nowrap hover:text-primary"
              >
                {{ item.name }}
              </a>

              <span v-else>
                {{ item.name }}
              </span>

              <UIcon
                v-if="index < data?.data.breadcrumbs.length - 1"
                name="i-lucide-chevron-right"
                class="size-4"
              />
            </template>
          </nav>

          <div class="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              @click="shareLink(data?.data)"
              class="inline-flex items-center gap-2 text-sm font-medium text-body"
            >
              <UIcon name="i-lucide-share-2" class="size-4" />
              Share
            </button>

            <button
              type="button"
              @click="addToWishlist(data?.data?.id)"
              class="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              <UIcon name="i-lucide-heart" class="size-4" />
              Wishlist
            </button>
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
                    [
                      data?.data?.cover_url,
                      ...(data?.data?.gallery || []),
                    ].filter(Boolean)
                  "
                  :video="data?.data?.video_url"
                />
              </div>

              <div class="min-w-0 space-y-4">
                <div class="space-y-2">
                  <h1
                    class="text-xl font-bold leading-tight tracking-tight text-title"
                  >
                    {{ data?.data?.name }}
                  </h1>
                  <div class="flex flex-wrap items-center gap-x-4">
                    <div class="flex items-center">
                      <UIcon
                        v-for="i in 5"
                        :key="i"
                        :name="
                          i <= Math.round(data?.data?.rating ?? 0)
                            ? 'i-heroicons:star-solid'
                            : 'i-heroicons:star'
                        "
                        class="size-4"
                        :class="
                          i <= Math.round(data?.data?.rating ?? 0)
                            ? 'text-amber-400'
                            : 'text-slate-300'
                        "
                      />

                      <span class="ml-1.5 font-semibold text-slate-900">
                        {{ Number(data?.data?.rating ?? 0).toFixed(1) }}
                      </span>
                    </div>

                    <span class="font-medium text-primary">
                      ({{ data?.data?.review_count ?? 0 }} reviews)
                    </span>

                    <span class="font-medium text-body">
                      {{ data?.data?.sold_count ?? 0 }}+ Sold
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-x-4">
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm text-muted">Brand:</span>
                      <a
                        :href="data?.data?.brand?.url"
                        target="_blank"
                        class="text-sm font-semibold text-link"
                      >
                        {{ data?.data?.brand?.name ?? "N/A" }}
                      </a>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <span class="text-sm text-muted">Category:</span>
                      <a
                        :href="data?.data?.category?.url"
                        target="_blank"
                        class="text-sm font-semibold text-link"
                      >
                        {{ data?.data?.category?.name ?? "N/A" }}
                      </a>
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
                            data?.data?.pricing?.min_price,
                            data?.data.currency,
                          )
                        }}
                        -
                        {{
                          $currency(
                            data?.data?.pricing?.max_price,
                            data?.data.currency,
                          )
                        }}
                      </p>
                    </div>
                  </div>

                  <UCarousel
                    :items="data?.data?.pricing?.tiers ?? []"
                    :ui="{
                      item: 'basis-1/2 lg:basis-1/3',
                    }"
                  >
                    <template #default="{ item: tier }">
                      <div
                        class="group relative rounded-xl border border-border bg-white p-2.5 transition hover:-translate-y-0.5"
                      >
                        <span class="text-xl font-bold text-title">
                          {{ $currency(tier.price, data?.data?.currency) }}
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
                            class="text-2xs text-body line-through truncate"
                          >
                            {{
                              $currency(
                                tier.compare_price,
                                data?.data?.currency,
                              )
                            }}
                          </span>

                          <span
                            v-if="tier.compare_price"
                            class="ml-2 text-2xs font-medium text-success truncate"
                          >
                            {{
                              $currency(
                                Number(tier.compare_price) - Number(tier.price),
                                data?.data?.currency,
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
                  v-for="attribute in data?.data?.attributes ?? []"
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
                  <MDC :value="data?.data?.summary" class="prose max-w-none" />
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
                  <MDC
                    :value="data?.data?.description"
                    class="prose max-w-none"
                  />
                </template>
                <template #specifications>
                  <table
                    v-for="section in data?.data?.specifications"
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
              <section class="space-y-3">
                <div class="flex items-start gap-2.5">
                  <div
                    class="bg-light flex shrink-0 items-center justify-center"
                  >
                    <NuxtLink
                      :to="data?.data.store.url"
                      class="block size-12 shrink-0 overflow-hidden rounded-lg"
                    >
                      <NuxtImg
                        :src="data?.data.store.logo_url"
                        :alt="data?.data.store.name"
                        width="48"
                        height="48"
                        class="size-12 object-cover"
                      />
                    </NuxtLink>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                      <h2 class="truncate text-sm font-semibold text-title">
                        {{ data?.data?.store?.name }}
                      </h2>

                      <UIcon
                        v-if="data?.data?.store?.verified"
                        name="i-lucide-badge-check"
                        class="size-4 shrink-0 text-blue-600"
                      />
                    </div>

                    <div>
                      <span
                        v-if="data?.data?.store?.verified"
                        class="inline-flex items-center gap-1 text-xs text-green-600"
                      >
                        <UIcon name="i-lucide-badge-check" class="size-4" />
                        Verified wholesale supplier
                      </span>

                      <span v-else class="text-xs text-body">
                        Wholesale supplier
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <UIcon
                        name="i-lucide-star"
                        class="size-3.5 fill-amber-400 text-amber-400"
                      />

                      <span class="text-xs font-semibold text-title">
                        {{ data?.data?.store?.rating ?? "0.00" }}
                      </span>

                      <span class="text-xs text-body">
                        ({{ data?.data?.store?.reviews_count ?? 0 }} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <NuxtLink
                  v-if="data?.data?.store?.url"
                  :to="data?.data.store.url"
                  class="group flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/5"
                >
                  <span>Visit Store</span>

                  <UIcon
                    name="i-lucide-arrow-up-right"
                    class="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </NuxtLink>
              </section>

              <!-- Shipping -->
              <section v-if="data?.data?.shipping?.available" class="space-y-4">
                <div class="flex items-start gap-2">
                  <div
                    class="flex size-7 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
                  >
                    <UIcon name="i-lucide-truck" class="size-4" />
                  </div>

                  <div class="min-w-0">
                    <h4 class="text-xs font-medium text-muted">Shipping</h4>
                    <p class="mt-0.5 text-sm font-normal text-body">
                      {{ data?.data?.shipping?.title }}
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
                      {{ data?.data?.shipping?.ships_from ?? "Not specified" }}
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
                      {{ data?.data?.shipping?.processing_days ?? 0 }} days
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
                      <template v-if="data?.data?.shipping?.delivery">
                        {{ data?.data.shipping.delivery.min_days }}–{{
                          data?.data.shipping.delivery.max_days
                        }}
                        days

                        <span
                          v-if="data?.data.shipping.delivery.negotiable"
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
                      {{
                        data?.data?.shipping?.payment_terms ?? "Not specified"
                      }}
                    </p>
                  </div>
                </div>
              </section>

              <section class="space-y-3">
                <button v-if="data?.data?.is_negotiable"
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  @click="cartDialog = !cartDialog"
                >
                  <UIcon name="i-lucide-shopping-cart" class="size-5" />
                  Send inquiry
                </button>

                <button v-else
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
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

      <section class="py-8">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-2xl font-bold text-heading">
              More from this store
            </h2>

            <p class="mt-1 text-sm text-body">
              Explore more products from this store and discover their latest
              collection.
            </p>
          </div>

          <NuxtLink
            v-if="data?.data?.store?.url"
            :to="data?.data.store.url"
            class="flex-none text-sm font-medium text-primary hover:underline"
          >
            See all
          </NuxtLink>
        </div>

        <EmptyState
          v-if="!data?.related?.length"
          title="No More Products"
          description="No other products available from this store."
        />

        <template v-else>
          <UCarousel
            v-slot="{ item }"
            loop
            arrows
            prev-icon="i-lucide-chevron-left"
            next-icon="i-lucide-chevron-right"
            :autoplay="{ delay: 2000 }"
            wheel-gestures
            :items="data.related"
            :ui="{
              item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5',
              prev: 'sm:start-2',
              next: 'sm:end-2',
              container: 'ms-0',
            }"
            class="gap-4"
          >
            <ProductCard :product="item" />
          </UCarousel>
        </template>
      </section>

      <RelatedProducts :product="data.data" />
    </template>

    <DialogCart v-model:open="cartDialog" :product="data.data" />

    <DialogCartSuccess
      :show="cartStore.dialog"
      @close="cartStore.dialog = false"
    />

    <ChatDrawer :product="data.data" />
  </main>
</template>

<style scoped></style>
