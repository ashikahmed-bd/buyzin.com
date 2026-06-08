<script setup>
const wishlistStore = useWishlistStore()

const { data: wishlist, pending, refresh } = await useAsyncData(
  'wishlist',
  () => wishlistStore.getWishlist()
)

const removeWishlist = async (id) => {
  if (!confirm("Are you sure you want to remove from wishlist?")) return

  await wishlistStore.remove(id);
  await refresh();
}
</script>

<template>
  <Dashboard>

    <Head>
      <Title>My Wishlist | Buyzin</Title>
      <Meta name="description" content="Wishlist page" />
    </Head>

    <div class="bg-white rounded-xl">

      <div class="px-4 py-3 border-b">
        <h3 class="text-lg font-semibold">Wishlist</h3>
      </div>

      <div class="p-4">
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div v-for="n in 4" :key="n" class="border p-3 animate-pulse">
            <div class="h-40 bg-gray-200 rounded"></div>
            <div class="mt-3 h-4 bg-gray-200 w-3/4"></div>
          </div>
        </div>

        <div v-else-if="wishlist?.data?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article v-for="item in wishlist.data" :key="item.id"
            class="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
            <button @click="removeWishlist(item.id)"
              class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
              ✕
            </button>

            <NuxtLink :to="`/product/${item.product?.slug}/${item.product?.sku}`"
              class="block relative overflow-hidden">
              <NuxtImg :src="item.product?.cover_url" :alt="item.product?.name"
                class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy" />
            </NuxtLink>

            <div class="p-4 space-y-2">
              <NuxtLink :to="`/product/${item.product?.slug}/${item.product?.sku}`"
                class="block text-sm font-semibold text-gray-800 line-clamp-2 hover:text-primary transition">
                {{ item.product?.name }}
              </NuxtLink>

              <div class="flex items-center gap-2">

                <span v-if="item.product?.price" class="text-primary font-semibold text-base">
                  {{ item.product?.currency_symbol }}{{ item.product?.price }}
                </span>

                <span v-if="item.product?.base_price && item.product?.price" class="text-gray-400 line-through text-sm">
                  {{ item.product?.currency_symbol }}{{ item.product?.base_price }}
                </span>

                <span v-else class="text-gray-700 font-medium">
                  {{ item.product?.currency_symbol }}{{ item.product?.base_price }}
                </span>

              </div>

              <button class="w-full bg-primary hover:opacity-90 text-white text-sm py-2 rounded transition">
                View Product
              </button>
            </div>
          </article>
        </div>

        <UEmpty v-else title="Your wishlist is empty" description="Start adding products" />
      </div>
    </div>

  </Dashboard>
</template>

<style scoped></style>
