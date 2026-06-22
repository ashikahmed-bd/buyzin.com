<script setup>
const vendorStore = useVendorStore();

const { data: stores, pending, error, refresh } = useAsyncData("stores", async () => {
  return vendorStore.getStores();
});
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
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
      <StoreCardList v-for="store in stores" :key="store.id" :store="store" />
    </div>
  </main>
</template>