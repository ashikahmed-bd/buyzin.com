<script setup>
definePageMeta({
  title: "All Collections",
});

const { $api } = useNuxtApp();
const collections = ref([]);

onMounted(async () => {
  const res = await $api.get("/api/collections");
  collections.value = res.data;
});
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-4">All Collections</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtLink
        v-for="collection in collections"
        :key="collection.id"
        :to="`/collections/${collection.slug}`"
        class="bg-white border rounded-lg p-4 hover:shadow-md transition"
      >
        <img
          :src="collection.banner_url"
          :alt="collection.name"
          class="rounded mb-2"
        />
        <h2 class="text-lg font-semibold">{{ collection.name }}</h2>
        <p class="text-gray-600 text-sm">{{ collection.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
