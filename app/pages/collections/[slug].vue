<script setup>
import { useRoute } from "vue-router";
import ProductCard from "@/components/ProductCard.vue";
import { useCollectionStore } from "@/stores/collection";

const route = useRoute();
const collectionStore = useCollectionStore();

const data = ref([]);
const sort = ref("default");
const limit = ref(5);

const loadCollection = async (page = 1) => {
  const response = await collectionStore.show(route.params.slug, {
    sort: sort.value,
    limit: limit.value,
    page: page,
  });

  data.value = response.data;
};

onMounted(() => {
  loadCollection();
});
</script>

<template>
  <SeoMeta :title="data?.collection?.meta_title" :description="data?.collection?.meta_description"
    :keywords="data?.collection?.meta_keywords" :image="data?.collection?.banner_url" />
  <main class="max-w-7xl mx-auto px-4 py-6">

    <template v-if="collectionStore.loading">
      <div class="container mx-auto py-6 space-y-6">
        <div class="h-48 w-full bg-gray-200 rounded-xl animate-pulse"></div>
        <div class="bg-white px-4 py-2 space-y-2">
          <div class="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="i in 10" :key="i" class="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </template>

    <template v-else-if="data?.data">
      <div class="w-full space-y-4">
        <NuxtImg :src="data?.collection.banner_url" :alt="data?.collection.name"
          class="rounded-xl w-full object-cover" />

        <div class="bg-white rounded-xl px-4">
          <nav class="flex items-start justify-between py-4">
            <div class="">
              <h1 class="text-3xl font-bold text-heading">
                {{ data?.collection.name }}
              </h1>
              <p class="text-body mb-4">{{ data?.collection.description }}</p>
            </div>

            <div class="flex items-center gap-3">
              <label class="text-gray-600 text-sm">Sort by:</label>
              <select v-model="sort" @change="loadCollection"
                class="border rounded-lg px-3 py-2 text-sm focus:outline-none">
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </nav>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ProductCard v-for="product in data?.data" :key="product.id" :product="product" />
          </div>

          <!-- Pagination -->
          <div class="py-6">
            <Pagination :meta="data?.meta" @page-change="loadCollection" />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <NotFound />
    </template>
  </main>
</template>
