<script setup>
const route = useRoute();

const vendorStore = useVendorStore();

const { data: store, pending, error, refresh } = await useAsyncData(`store-${route.params.slug}`, () =>
  vendorStore.getStoreBySlug(route.params.slug),
  {
    watch: [() => route.params.slug]
  });

</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-6">
    <template v-if="pending">
      <LoadingState />
    </template>
    <template v-else-if="error">
      <ErrorState :retry="refresh" />
    </template>
    <template v-else-if="store.data">
      <SeoMeta :title="store.data?.meta_title" :description="store.data?.meta_description"
        :keywords="store.data?.meta_keywords" :image="store.data?.logo_url" />

      <section class="relative overflow-hidden rounded-xl border bg-white">
        <div class="w-full h-auto overflow-hidden">
          <img :src="store.data?.banner_url" class="h-full w-full object-cover" />
        </div>

        <div class="relative p-6 md:p-8 flex flex-col md:flex-row md:items-end gap-6">

          <div class="w-24 h-24 md:w-28 md:h-28 -mt-16 md:-mt-20 rounded-2xl border bg-white overflow-hidden shadow-sm">
            <img :src="store.data?.logo_url" class="w-full h-full object-cover" />
          </div>

          <div class="flex-1">
            <h1 class="text-2xl md:text-3xl font-bold">
              {{ store.data?.name }}
            </h1>

            <p class="text-gray-500 mt-1">
              {{ store.data?.description || 'No description available' }}
            </p>

            <div class="flex items-center gap-1">
              <UIcon v-for="i in 5" :key="i" :name="i <= Math.round(store.data?.rating || 0)
                ? 'heroicons:star-solid'
                : 'heroicons:star'" class="size-4" :class="i <= Math.round(store.data?.rating || 0)
                  ? 'text-yellow-400'
                  : 'text-gray-300'" />
              <span>{{ store.data?.rating || 0 }}</span>
              <span class="ml-2">({{ store.data?.reviews_count || 0 }} Reviews)</span>
            </div>

            <div class="flex items-center gap-1 mt-1">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
              <address class="not-italic">
                {{ [
                  store.data?.address,
                  store.data?.city,
                  store.data?.state,
                  store.data?.country,
                  store.data?.postcode
                ].filter(Boolean).join(', ') }}
              </address>
            </div>
          </div>

          <div class="flex gap-2">
            <UButton color="primary">Follow</UButton>
            <UButton color="neutral" variant="soft">Contact</UButton>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <EmptyState />
    </template>
  </main>
</template>