<script setup>
const wishlistStore = useWishlistStore();

const {
  data: wishlist,
  pending,
  error,
  refresh,
} = await useAsyncData("wishlist", () => wishlistStore.getWishlist());

const remove = async (id) => {
  if (!confirm("Are you sure you want to remove from wishlist?")) return;

  await wishlistStore.remove(id);
  await refresh();
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>My Wishlist | Buyzin</Title>
      <Meta name="description" content="Wishlist page" />
    </Head>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-if="wishlist">
      <div class="bg-white rounded-xl">
        <div class="px-4 py-3 border-b">
          <h3 class="text-lg font-semibold">Wishlist</h3>
        </div>

        <div class="p-4">
          <article
            v-for="item in wishlist.data"
            :key="item.id"
            class="group rounded-2xl border border-border bg-white p-3 transition-all duration-200 hover:border-primary sm:p-3.5"
          >
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5"
            >
              <!-- Product -->
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <NuxtLink
                  :to="`/products/${item.product?.slug}`"
                  class="size-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:size-24 lg:size-28"
                >
                  <NuxtImg
                    :src="item.product?.cover_url"
                    :alt="item.product?.name"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </NuxtLink>

                <div class="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
                  <!-- Name + Rating -->
                  <div class="min-w-0">
                    <NuxtLink
                      :to="`/products/${item.product?.slug}`"
                      class="line-clamp-2 text-sm font-semibold leading-5 text-gray-primary transition-colors hover:text-primary-main sm:text-base sm:leading-6"
                    >
                      {{ item.product?.name }}
                    </NuxtLink>

                    <div class="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <div class="flex items-center gap-0.5">
                        <UIcon
                          v-for="i in 5"
                          :key="i"
                          name="i-lucide-star"
                          class="size-3.5 fill-yellow-400 text-yellow-400"
                        />
                      </div>

                      <span class="text-xs text-gray-secondary">
                        4.8 (118)
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-base font-bold text-primary">
                      {{ item.product?.price_formatted }}
                    </span>

                    <span
                      v-if="item.product?.base_price > item.product?.price"
                      class="text-xs text-gray-tertiary line-through"
                    >
                      {{ item.product?.base_price_formatted }}
                    </span>

                    <span
                      v-if="item.product?.base_price > item.product?.price"
                      class="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500"
                    >
                      -{{
                        Math.round(
                          ((item.product.base_price - item.product.price) /
                            item.product.base_price) *
                            100,
                        )
                      }}%
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="flex md:flex-col w-full shrink-0 gap-2 border-t border-border pt-3 sm:w-auto sm:border-0 sm:pt-0"
              >
                <button
                  type="button"
                  class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-100 hover:text-red-600 active:bg-red-100 sm:flex-none"
                  title="Remove"
                >
                  <UIcon name="i-lucide-trash-2" class="size-3.5" />
                  <span>Remove</span>
                </button>

                <button
                  type="button"
                  class="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primary/90 active:bg-primary/80 sm:flex-none"
                >
                  <UIcon name="i-lucide-shopping-cart" class="size-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>

    <EmptyState v-else />
  </Dashboard>
</template>

<style scoped></style>
