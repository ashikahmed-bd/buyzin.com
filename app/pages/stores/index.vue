<script setup>
const vendorStore = useVendorStore();

const { data: stores, pending, error, refresh } = useAsyncData("stores", async () => {
  return vendorStore.getStores();
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
    <SeoMeta title="Shop Verified Online Stores | Electronics, Fashion & More | Buyzin"
      description="Browse verified online stores on Buyzin marketplace. Discover top-rated sellers in electronics, fashion, groceries, beauty and sports categories with secure shopping experience."
      keywords="verified online stores, best ecommerce marketplace, shop electronics online, fashion stores online, grocery shopping online, beauty products shop, sports goods stores, trusted sellers Bangladesh, Buyzin" />

    <template v-if="pending">

      <div class="relative overflow-hidden rounded-3xl bg-gray-100 p-8 mb-8 animate-pulse">
        <div class="max-w-2xl space-y-4">
          <div class="h-10 w-2/3 bg-gray-300 rounded"></div>
          <div class="h-5 w-1/2 bg-gray-300 rounded"></div>
          <div class="h-12 w-full max-w-xl bg-gray-300 rounded"></div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-pulse">
        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl p-5 border">
          <div class="h-3 w-20 bg-gray-200 rounded"></div>
          <div class="h-6 w-16 bg-gray-300 rounded mt-3"></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-8 animate-pulse">
        <div v-for="i in 6" :key="i" class="h-7 w-20 bg-gray-200 rounded-full"></div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div v-for="i in 10" :key="i" class="animate-pulse rounded-2xl border bg-white overflow-hidden">
          <div class="h-28 bg-gray-200"></div>

          <div class="p-4 space-y-3">
            <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div class="h-3 w-1/2 bg-gray-200 rounded"></div>

            <div class="flex gap-2 mt-4">
              <div class="h-8 w-16 bg-gray-200 rounded"></div>
              <div class="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

    </template>

    <template v-else-if="error">
      <ErrorState :retry="refresh" />
    </template>

    <template v-else-if="stores">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-white mb-8">
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-5xl font-bold">
            Discover Trusted Stores
          </h1>

          <p class="mt-3 text-white/80">
            Explore thousands of verified stores on Buyzin marketplace.
          </p>

          <div class="mt-6">
            <UInput size="xl" icon="i-lucide-search" placeholder="Search stores..." class="max-w-xl" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <p class="text-gray-500 text-sm">Total Stores</p>
          <h3 class="text-2xl font-bold mt-1">5,000+</h3>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <p class="text-gray-500 text-sm">Verified Stores</p>
          <h3 class="text-2xl font-bold mt-1">3,200+</h3>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <p class="text-gray-500 text-sm">Products</p>
          <h3 class="text-2xl font-bold mt-1">250K+</h3>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <p class="text-gray-500 text-sm">Customers</p>
          <h3 class="text-2xl font-bold mt-1">100K+</h3>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        <UBadge color="primary" variant="soft">All Stores</UBadge>
        <UBadge color="neutral" variant="soft">Electronics</UBadge>
        <UBadge color="neutral" variant="soft">Fashion</UBadge>
        <UBadge color="neutral" variant="soft">Groceries</UBadge>
        <UBadge color="neutral" variant="soft">Beauty</UBadge>
        <UBadge color="neutral" variant="soft">Sports</UBadge>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StoreCardList v-for="store in stores.data" :key="store.id" :store="store" />
      </div>
    </template>

    <template v-else>
      <EmptyState />
    </template>

  </main>
</template>