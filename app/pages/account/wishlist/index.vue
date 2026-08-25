<script setup>
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const toast = useToast();
const sortBy = ref("recently");

const {
  data: wishlist,
  pending,
  error,
  refresh,
} = await useAsyncData("wishlist", () => wishlistStore.getWishlist());

const addToCart = async (item) => {
  const response = await cartStore.store({
    product_id: item.product.id,
    quantity: 1,
    variant_id: null,
  });

  toast.add({
    title: response.message,
  });
};

const destroy = async (item) => {
  if (confirm("Remove this item from your wishlist?")) {
    await wishlistStore.remove(item);
    await refresh();
  }
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else>
      <Head>
        <Title>Wishlist | Buyzin</Title>
        <Meta
          name="description"
          content="View and manage your saved products on Buyzin."
        />

        <Meta name="robots" content="noindex, nofollow" />
      </Head>

      <UBreadcrumb
        :items="[
          {
            label: 'Home',
            to: '/',
          },
          {
            label: 'My Account',
            to: '/account',
          },
          {
            label: 'Wishlist',
          },
        ]"
        class="py-4 text-sm"
      />

      <div class="space-y-4 text-sm">
        <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main class="min-w-0 space-y-4">
            <section
              class="overflow-hidden rounded-lg border border-border bg-white"
            >
              <div
                class="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h1
                    class="text-lg font-bold tracking-tight text-title sm:text-xl"
                  >
                    My Wishlist ({{ wishlist?.data?.length ?? 0 }})
                  </h1>

                  <p class="mt-0.5 text-sm text-body">
                    Items you love, all in one place.
                  </p>
                </div>

                <select
                  v-model="sortBy"
                  aria-label="Sort wishlist"
                  class="h-9 w-full rounded-md border border-border bg-white px-3 text-sm font-medium text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-auto"
                >
                  <option value="recently">Sort by: Recently</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <EmptyState v-if="!wishlist?.data?.length" />

              <div v-else class="divide-y divide-border">
                <article
                  v-for="item in wishlist?.data ?? []"
                  :key="item.id"
                  class="flex flex-wrap items-center gap-3 border-b border-border px-4 py-4 transition-colors last:border-b-0 hover:bg-slate-50/70 sm:flex-nowrap"
                >
                  <NuxtLink
                    :to="`/product/${item.product?.slug}/${item.product?.id}`"
                    class="shrink-0"
                  >
                    <NuxtImg
                      :src="item.product?.cover_url"
                      :alt="item.product?.name ?? 'Product'"
                      loading="lazy"
                      class="size-20 rounded border border-border bg-white object-cover"
                    />
                  </NuxtLink>

                  <div class="min-w-0 flex-1">
                    <div
                      class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                    >
                      <div class="min-w-0 flex-1">
                        <NuxtLink
                          :to="`/product/${item.product?.slug}/${item.product?.id}`"
                          target="_blank"
                          class="line-clamp-2 text-sm font-semibold leading-5 text-title transition-colors hover:text-primary"
                        >
                          {{ item.product?.name }}
                        </NuxtLink>
                        <div class="mt-1 flex items-center gap-1.5">
                          <div class="flex items-center gap-0.5">
                            <UIcon
                              v-for="star in 5"
                              :key="star"
                              name="i-lucide-star"
                              class="size-3.5"
                              :class="
                                star <= Math.round(item.product?.rating ?? 0)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              "
                            />
                          </div>

                          <span class="text-sm font-semibold text-amber-500">
                            {{ item.product?.rating ?? 0 }}
                          </span>

                          <span class="text-sm text-muted">
                            ({{ item.product?.review_count ?? 0 }})
                          </span>
                        </div>
                      </div>

                      <div class="flex shrink-0 items-center gap-2">
                        <p class="text-sm font-bold text-title">
                          {{ $currency(item.product?.price) }}
                        </p>

                        <p
                          v-if="
                            (item.product?.base_price ?? 0) >
                            (item.product?.price ?? 0)
                          "
                          class="text-sm text-muted line-through"
                        >
                          {{ $currency(item.product?.base_price) }}
                        </p>
                      </div>
                    </div>

                    <div class="mt-2 flex items-center justify-between gap-3">
                      <p class="text-sm font-medium text-success">
                        {{ item.product?.stock ?? "Out of stock" }}
                      </p>

                      <div class="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          title="Add to cart"
                          class="inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                          @click="addToCart(item)"
                        >
                          <UIcon name="i-lucide-shopping-cart" class="size-4" />
                        </button>
                        <button
                          type="button"
                          title="Remove from wishlist"
                          @click="destroy(item.id)"
                          class="inline-flex size-8 items-center justify-center rounded bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                          <UIcon name="i-lucide-trash-2" class="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section
              class="flex flex-col gap-3 rounded border border-border bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-accent"
                >
                  <UIcon name="i-lucide-bell" class="size-4" />
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-title">Price Alert</h3>

                  <p class="mt-0.5 text-sm leading-4 text-body">
                    Get notified when wishlist items go on sale.
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="inline-flex h-8 items-center justify-center rounded-md border border-violet-300 bg-white px-3 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50"
              >
                Enable Alerts
              </button>
            </section>
          </main>

          <aside class="space-y-4">
            <section class="rounded-lg border border-border bg-white p-4">
              <h2 class="text-sm font-semibold text-title">Wishlist Summary</h2>

              <div class="mt-4 space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-9 items-center justify-center rounded-full bg-violet-50 text-violet-500"
                  >
                    <UIcon name="i-lucide-heart" class="size-4 fill-current" />
                  </div>

                  <div>
                    <p class="text-sm font-bold text-title">
                      ({{ wishlist?.summary?.items ?? 0 }}) Items
                    </p>

                    <p class="text-sm text-body">Items in wishlist</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="flex size-9 items-center justify-center rounded-full bg-pink-50 text-pink-500"
                  >
                    <UIcon name="i-lucide-shopping-bag" class="size-4" />
                  </div>

                  <div>
                    <p class="text-sm font-bold text-title">
                      {{ $currency(wishlist?.summary?.total ?? 0) }}
                    </p>

                    <p class="text-sm text-body">Estimated Total</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                  >
                    <UIcon name="i-lucide-tag" class="size-4" />
                  </div>

                  <div>
                    <p class="text-sm font-bold text-title">
                      Save {{ $currency(wishlist?.summary?.saved ?? 0) }}
                    </p>

                    <p class="text-sm text-body">Based on Current Offers</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              class="relative overflow-hidden rounded-lg bg-violet-50 p-4"
            >
              <div class="relative z-10">
                <h2
                  class="flex items-center gap-2 text-sm font-bold text-title"
                >
                  Don't Miss Out!
                  <UIcon name="i-lucide-heart" class="size-4 text-pink-500" />
                </h2>

                <p class="mt-1 text-sm leading-4 text-body">
                  Prices may go up. Add your favorites to cart now.
                </p>

                <button
                  type="button"
                  class="mt-3 inline-flex h-8 items-center rounded-md bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-700"
                  @click="moveAllToCart"
                >
                  Go to Cart ({{ wishlist?.data?.length ?? 0 }})
                </button>
              </div>

              <div
                class="absolute -bottom-5 -right-3 flex size-20 rotate-6 items-center justify-center rounded-xl border-4 border-violet-200 bg-white"
              >
                <UIcon
                  name="i-lucide-shopping-cart"
                  class="size-10 text-violet-500"
                />

                <span
                  class="absolute -right-2 -top-3 flex size-8 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white"
                >
                  %
                </span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
