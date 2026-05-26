<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrandStore } from '@/stores/brand'
import Pagination from '~/components/Pagination.vue'

const brandStore = useBrandStore()
const { brands } = storeToRefs(brandStore);

const search = ref('')

const loadBrands = async () => {
    await brandStore.all()
}

const filteredBrands = computed(() => {
    if (!brands.value?.data) return []

    if (!search.value) return brands.value.data

    return brands.value.data.filter(brand =>
        brand.name?.toLowerCase().includes(search.value.toLowerCase())
    )
})

onMounted(() => {
    loadBrands()
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen py-10">
        <div class="max-w-7xl mx-auto px-4">

            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-800">All Brands</h1>
                <p class="text-gray-500 mt-2">
                    Shop products by your favorite brands
                </p>
            </div>

            <div class="max-w-md mx-auto mb-10">
                <input v-model="search" type="text" placeholder="Search brands..."
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>

            <div v-if="filteredBrands.length"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <NuxtLink v-for="brand in filteredBrands" :key="brand.id" :to="`/brand/${brand.slug}`"
                    class="group bg-white rounded-2xl transition p-4 flex flex-col items-center justify-center">
                    <img :src="brand.logo_url" :alt="brand.name" class="h-12 object-contain" />
                    <span class="mt-3 text-sm font-medium text-gray-700 group-hover:text-primary transition">
                        {{ brand.name }}
                    </span>
                </NuxtLink>

                <Pagination :meta="brands.meta" />
            </div>

            <!-- Empty -->
            <div v-else class="text-center text-gray-500">
                No brands found
            </div>

        </div>
    </div>
</template>
