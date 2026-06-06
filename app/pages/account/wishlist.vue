<script setup>
const wishlistStore = useWishlistStore();
const { items } = storeToRefs(wishlistStore);

const loadWishlist = async () => {
  await wishlistStore.getWishlist();
};

const removeWishlist = async (wishlist) => {
  if (confirm("Are you sure you want to remove from wishlist?")) {
    await wishlistStore.remove(wishlist);
  }
};

onMounted(() => {
  loadWishlist();
});
</script>

<template>
  <Head>
    <Title
      >My Wishlist | Buyzin - Save Your Favorite Products in Bangladesh</Title
    >
    <Meta
      name="description"
      content="Save your favorite products on Buyzin with your personal wishlist. Easily revisit items, compare products, and shop anytime from anywhere in Bangladesh."
    />
    <Meta
      name="keywords"
      content="wishlist, favorite products, save items, shopping wishlist"
    />
  </Head>

    <div class="bg-white rounded-xl">
      <div class="px-4 py-3 border-b border-border">
        <h3 class="text-lg font-semibold text-heading">Wishlist</h3>
      </div>
      <div class="p-4 text-gray-700 relative overflow-x-auto">
        <template v-if="!items.data">
          <!-- Skeleton Loader -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              v-for="n in 4"
              :key="n"
              class="border border-border rounded-lg p-3 animate-pulse"
            >
              <div class="w-full h-40 bg-gray-200 rounded-md"></div>

              <div class="mt-4 space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>

                <div class="flex gap-2 mt-3">
                  <div class="h-4 w-12 bg-gray-200 rounded"></div>
                  <div class="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="items?.data?.length">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <article
              v-for="item in items?.data"
              :key="item.id"
              class="relative group border border-border rounded-lg overflow-hidden"
            >
              <button
                @click="removeWishlist(item.id)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 transition"
              >
                <IconsIconClose class="size-4" />
              </button>

              <NuxtImg
                :src="item.product?.cover_url"
                :alt="item.product?.name"
                loading="lazy"
                class="w-full object-cover rounded-lg"
              />

              <div class="space-y-2 p-4">
                <h3 class="text-base font-semibold text-body">
                  <NuxtLink
                    :to="`/product/${item.product?.slug}/${item.product?.sku}`"
                    :title="item.product?.name"
                    target="_blank"
                    class="hover:text-primary transition"
                  >
                    {{ item.product?.name }}
                  </NuxtLink>
                </h3>

                <div class="flex items-center justify-between mt-2">
                  <div v-if="item.product?.price" class="space-x-2">
                    <del class="text-body font-body line-through">
                      {{ item.product?.currency_symbol
                      }}{{ item.product?.base_price }}
                    </del>
                    <span
                      class="text-primary font-body font-semibold text-base"
                    >
                      {{ item.product?.currency_symbol
                      }}{{ item.product?.price }}
                    </span>
                  </div>

                  <div v-else>
                    <span class="text-body">
                      {{ item.product?.currency_symbol
                      }}{{ item.product?.base_price }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div class="flex justify-end py-4" v-if="items?.meta">
            <UPagination
              v-model:page="items.current_page"
              :page-count="items.meta.last_page"
              :total="items.meta.total"
            />
          </div>
        </template>

        <template v-else>
          <UEmpty
            title="Your wishlist is empty"
            description="Looks like you haven't added anything yet. Start exploring and save your favorite products!"
          />
        </template>
      </div>
    </div>

</template>

<style scoped></style>
