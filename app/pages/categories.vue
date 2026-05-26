<script setup>
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const loadCategories = async () => {
    await categoryStore.getCategories();
}

onMounted(() => {
    loadCategories();
});
</script>

<template>
    <div class="bg-gray-50 min-h-screen py-10">
        <div class="max-w-7xl mx-auto px-4">

            <!-- Page Header -->
            <div class="text-center mb-10">
                <h1 class="text-4xl font-bold text-gray-800">
                    All Categories
                </h1>
                <p class="text-gray-500 mt-2">
                    Explore products by category
                </p>
            </div>

            <!-- Categories Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <NuxtLink v-for="cat in categories.data" :key="cat.id" :to="`/category/${cat.slug}`"
                    class="group bg-white rounded-2xl transition overflow-hidden">
                    <!-- Image -->
                    <div class="relative h-40 overflow-hidden">
                        <img :src="cat.image_url" :alt="cat.name"
                            class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
                    </div>

                    <div class="p-4 text-center">
                        <h3 class="text-lg font-semibold text-gray-800 group-hover:text-primary transition">
                            {{ cat.name }}
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">
                            {{ cat.product_count }} Products
                        </p>
                    </div>
                </NuxtLink>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Optional custom styles */
</style>
