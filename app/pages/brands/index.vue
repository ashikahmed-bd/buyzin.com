<script setup>
import LoadingState from '~/components/LoadingState.vue';

const brandStore = useBrandStore();

const { data: brands, pending, error, refresh } = await useAsyncData(
    "brands",
    async () => {
        return await brandStore.getBrands()
    }
)


</script>

<template>

    <main class="max-w-7xl mx-auto px-4 py-6">
        <LoadingState v-if="pending" />

        <ErrorState v-else-if="error" :retry="refresh" />

        <div v-else-if="brands">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-800">All Brands</h1>
                <p class="text-gray-500 mt-2">
                    Shop products by your favorite brands
                </p>
            </div>

            <div class="max-w-md mx-auto mb-10">
                <input type="text" placeholder="Search brands..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <NuxtLink v-for="brand in brands?.data" :key="brand.id" :to="`/brands/${brand.slug}`"
                    class="group bg-white rounded-2xl border border-gray-100 hover:border-primary transition p-4 flex flex-col items-center justify-center">
                    <NuxtImg :src="brand.logo_url" :alt="brand.name" class="h-12 object-contain" />
                    <span class="mt-3 text-sm font-medium text-gray-700 group-hover:text-primary transition">
                        {{ brand.name }}
                    </span>
                </NuxtLink>
            </div>
        </div>

        <div v-else>
            <div class="space-y-8">
                <div class="text-center space-y-3">
                    <div class="h-8 w-64 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
                    <div class="h-4 w-80 mx-auto bg-gray-100 rounded-md animate-pulse"></div>
                </div>
                <div class="max-w-md mx-auto">
                    <div class="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div v-for="i in 12" :key="i"
                        class="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                        <div class="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                        <div class="h-3 w-20 bg-gray-100 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
