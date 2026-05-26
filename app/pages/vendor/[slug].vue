<script setup>
const route = useRoute();
const vendorStore = useVendorStore();

const vendor = ref(null);

const loadVendor = async () => {
  const response = await vendorStore.getStore(route.params.slug);
  vendor.value = response.data;
};

onMounted(() => {
  loadVendor();
});
</script>

<template>
  <SeoMeta
    v-if="vendor"
    :title="vendor?.meta_title"
    :description="vendor?.meta_description"
    :keywords="vendor?.meta_keywords"
  />
  <main class="max-w-7xl mx-auto px-4 py-6">
    <header
      class="bg-white rounded-xl mb-4 p-6 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: vendor?.banner_url
          ? `url(${vendor.banner_url})`
          : `url(/img/mountains.jpg)`,
      }"
    >
      <div
        class="flex flex-wrap gap-6 items-center justify-center md:justify-start"
      >
        <!-- Skeleton -->
        <div class="p-2">
          <div
            v-if="vendor === null"
            class="w-40 h-40 rounded-full bg-gray-200 animate-pulse"
          ></div>

          <NuxtImg
            v-else
            :src="vendor?.logo_url"
            :alt="vendor?.name"
            class="bg-cyan-100 p-2.5 rounded-full w-40 h-40 object-cover"
            loading="lazy"
          />
        </div>

        <div class="space-y-3 w-full md:w-auto">
          <!-- Skeleton -->
          <div
            v-if="vendor === null"
            class="h-7 bg-gray-200 rounded w-56 animate-pulse"
          ></div>

          <h2
            v-else
            class="text-white flex items-center gap-2 text-2xl font-bold"
          >
            {{ vendor?.name }}
            <IconsIconBadgeCheck
              v-if="vendor?.verified"
              class="size-5 text-white"
            />
          </h2>

          <!-- Skeleton -->
          <div v-if="vendor === null" class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-72 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>

          <div
            v-else
            class="text-white md:max-w-xs mt-2"
            v-html="vendor?.description"
          ></div>

          <!-- Skeleton -->
          <div v-if="vendor === null" class="flex gap-3">
            <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
          </div>

          <div v-else class="flex flex-wrap items-center">
            <div
              class="text-white flex items-center after:content-['•'] after:mx-2 last:after:content-none"
            >
              {{ vendor?.rating }} ({{ vendor?.total_reviews }} reviews)
            </div>

            <div
              v-if="vendor?.return_available"
              class="text-white flex items-center after:content-['•'] after:mx-2 last:after:content-none"
            >
              Return {{ vendor?.return_days }} days
            </div>
          </div>

          <div class="text-white flex items-center gap-4">
            <template v-if="vendor === null">
              <div class="p-3">
                <div
                  class="h-3 bg-gray-200 w-16 mb-2 rounded animate-pulse"
                ></div>
                <div class="h-5 bg-gray-200 w-20 rounded animate-pulse"></div>
              </div>

              <div class="p-3 bg-gray-50 rounded">
                <div
                  class="h-3 bg-gray-200 w-16 mb-2 rounded animate-pulse"
                ></div>
                <div class="h-5 bg-gray-200 w-20 rounded animate-pulse"></div>
              </div>

              <div class="p-3 bg-gray-50 rounded">
                <div
                  class="h-3 bg-gray-200 w-16 mb-2 rounded animate-pulse"
                ></div>
                <div class="h-5 bg-gray-200 w-20 rounded animate-pulse"></div>
              </div>
            </template>

            <template v-else>
              <div class="p-3">
                <div class="text-xs">Followers</div>
                <div class="text-lg font-semibold">{{ vendor?.followers }}</div>
              </div>

              <div class="p-3">
                <div class="text-xs">Avg ship</div>
                <div class="text-lg font-semibold">
                  {{ vendor?.avg_ship_days }} days
                </div>
              </div>

              <div class="p-3">
                <div class="text-xs">Response</div>
                <div class="text-lg font-semibold">
                  {{ vendor?.response_rate }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Tabs section -->
    <div class="bg-white rounded-xl">
      <!-- Tabs skeleton -->
      <div v-if="vendor === null" class="flex gap-4 mb-4">
        <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div v-else class="bg-white py-4 rounded-xl">
        <Tabs
          :tabs="[
            { label: 'Products', slot: 'products' },
            { label: 'About', slot: 'about' },
            { label: 'Reviews', slot: 'reviews' },
          ]"
        >
          <template #products>
            <VendorProducts />
          </template>
          <template #about> <VendorAbout /> </template>
          <template #reviews> <VendorReviews /> </template>
        </Tabs>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
