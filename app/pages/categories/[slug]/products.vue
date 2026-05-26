<script setup>
import apiClient from '~/utils/axios'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NotFound from '~/components/NotFound.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const products = ref([])
const meta = ref({})
const category = ref({})
const filters = ref({})

// Selected filters
const selectedCategories = ref([])
const selectedBrands = ref([])
const price = ref({ min: null, max: null })
const rating = ref(null)
const sort = ref('default')

// Sidebar open on mobile
const sidebarOpen = ref(false)

// Sync filters with URL query
const syncFromQuery = () => {
    const query = route.query
    selectedCategories.value = query.categories ? query.categories.toString().split(',') : []
    selectedBrands.value = query.brands ? query.brands.toString().split(',') : []
    price.value.min = query.min_price ? Number(query.min_price) : null
    price.value.max = query.max_price ? Number(query.max_price) : null
    rating.value = query.rating ? Number(query.rating) : null
    sort.value = query.sort || 'default'
}

// Update URL when filters change
const updateQuery = () => {
    router.replace({
        query: {
            categories: selectedCategories.value.join(',') || undefined,
            brands: selectedBrands.value.join(',') || undefined,
            min_price: price.value.min || undefined,
            max_price: price.value.max || undefined,
            rating: rating.value || undefined,
            sort: sort.value !== 'default' ? sort.value : undefined
        }
    })
}

// Load products from API
const loadProducts = async (page = 1) => {
    try {
        loading.value = true
        const response = await apiClient.get(`/api/categories/${route.params.slug}/products`, {
            params: {
                categories: selectedCategories.value.join(','),
                brands: selectedBrands.value.join(','),
                min_price: price.value.min,
                max_price: price.value.max,
                rating: rating.value,
                sort: sort.value,
                page
            }
        })
        products.value = response.data.data
        meta.value = response.data.meta
        filters.value = response.data.filters
        category.value = response.data.category
    } catch (err) {
        console.error('Failed to load products:', err)
    } finally {
        loading.value = false
    }
}

// Watch filters and reload products + update URL
watch(
    [selectedCategories, selectedBrands, () => price.value.min, () => price.value.max, rating, sort],
    () => {
        updateQuery()
        loadProducts(1)
    }
)

// Initial load
onMounted(() => {
    syncFromQuery()
    loadProducts()
})
</script>

<template>
    <SeoMeta :title="category.meta_title" :description="category.meta_description || category.meta_title"
        :keywords="category.meta_keywords" :url="category.canonical_url" :image="category.image_url" />

    <main class="max-w-7xl mx-auto px-4 py-4">

        <div class="space-y-2 mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">{{ category.name }}</h1>
            <p v-if="category.description" class="text-sm text-gray-600 max-w-3xl">{{ category.description }}</p>
        </div>

        <div v-if="category.banner_url" class="relative group rounded-xl overflow-hidden bg-gray-100">
            <NuxtImg :src="category.banner_url" :alt="category.meta_title" fit="cover" loading="lazy"
                class="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>

        <!-- Mobile: Filter toggle button -->
        <div class="flex justify-end mb-4 lg:hidden">
            <button @click="sidebarOpen = !sidebarOpen" class="px-4 py-2 bg-primary text-white rounded-lg">
                Filters
            </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-4 py-4">
            <!-- Sidebar -->
            <aside class="space-y-4 flex-none max-w-72 hidden md:block">
                <!-- Categories -->
                <template v-if="loading">
                    <div class="bg-white rounded-xl border p-4 space-y-3">
                        <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </template>

                <template v-else>
                    <div class="bg-white rounded-xl border p-4">
                        <h3 class="font-semibold text-gray-800 mb-4">Categories</h3>
                        <div class="space-y-3">
                            <label v-for="cat in filters.categories || []" :key="cat.id"
                                class="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" class="size-4 accent-primary cursor-pointer" :value="cat.slug"
                                    v-model="selectedCategories" />
                                <span class="text-sm text-gray-700 group-hover:text-primary">{{ cat.name }}</span>
                            </label>
                        </div>
                    </div>
                </template>

                <!-- Brands -->
                <template v-if="loading">
                    <div class="bg-white rounded-xl border p-4 space-y-3">
                        <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </template>

                <template v-else>
                    <div class="bg-white rounded-xl border p-4">
                        <h3 class="font-semibold text-gray-800 mb-4">Brands</h3>
                        <div class="space-y-3">
                            <label v-for="brand in filters.brands || []" :key="brand.id"
                                class="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" class="size-4 accent-primary cursor-pointer" :value="brand.slug"
                                    v-model="selectedBrands" />
                                <span class="text-sm text-gray-700 group-hover:text-primary">{{ brand.name }}</span>
                            </label>
                        </div>
                    </div>
                </template>


                <!-- Price Range -->
                <template v-if="loading">
                    <div class="bg-white rounded-xl border p-4 space-y-3">
                        <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </template>

                <template v-else>
                    <div class="bg-white rounded-xl border p-4">
                        <h3 class="font-semibold text-gray-800 mb-4">Price Range</h3>
                        <div class="flex gap-3">
                            <input type="number" v-model.number="price.min" :min="filters.price?.min"
                                :placeholder="filters.price?.min"
                                class="w-1/2 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                            <input type="number" v-model.number="price.max" :max="filters.price?.max"
                                :placeholder="filters.price?.max"
                                class="w-1/2 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <p class="text-xs text-gray-500 mt-2">{{ filters.price?.min }} - {{ filters.price?.max }}
                        </p>
                    </div>
                </template>


                <!-- Ratings -->
                <template v-if="loading">
                    <div class="bg-white rounded-xl border p-4 space-y-3">
                        <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </template>
                <template v-else>
                    <div class="bg-white rounded-xl border p-4">
                        <h3 class="font-semibold text-gray-800 mb-4">Ratings</h3>
                        <div class="space-y-3">
                            <label v-for="r in filters.ratings || [5, 4, 3, 2, 1]" :key="r"
                                class="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" name="rating" :value="r" v-model.number="rating"
                                    class="size-4 accent-primary" />
                                <div class="flex items-center gap-1">
                                    <svg v-for="star in 5" :key="star" class="size-4"
                                        :class="star <= r ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="text-sm text-gray-600 ml-1">& up</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </template>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 lg:ml-0">
                <!-- Sorting Bar -->
                <template v-if="loading">
                    <nav class="bg-white border rounded-xl p-4 mb-6 animate-pulse">
                        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    </nav>
                </template>

                <template v-else>
                    <nav
                        class="flex flex-col md:flex-row items-start md:items-center justify-between py-4 mb-6 bg-white rounded-xl border p-4 gap-2">
                        <span class="text-gray-700 font-medium">
                            Showing {{ meta.from || 0 }}–{{ meta.to || 0 }} of {{ meta.total || 0 }} results
                        </span>

                        <div class="flex items-center gap-2 flex-wrap">
                            <div class="flex items-center gap-3">
                                <label class="text-gray-600 text-sm">Sort by:</label>
                                <select v-model="sort" class="border rounded-lg px-3 py-2 text-sm focus:outline-none">
                                    <option value="default">Default</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>
                            <button type="button">
                                <UIcon name="i-lucide-layout-grid" class="size-6" />
                            </button>
                            <button type="button">
                                <UIcon name="i-lucide-list" class="size-6" />
                            </button>
                        </div>
                    </nav>
                </template>


                <!-- Product Grid -->
                <main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <template v-if="loading">
                        <div v-for="i in 8" :key="i" class="bg-white border rounded-xl p-3 animate-pulse space-y-3">
                            <div class="w-full h-40 bg-gray-200 rounded-lg"></div>
                            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div class="h-8 bg-gray-200 rounded w-full"></div>
                        </div>
                    </template>

                    <template v-else-if="products">
                        <div v-for="product in products" :key="product.id">
                            <ProductCard :product="product" />
                        </div>
                    </template>

                    <template v-else>
                        <NotFound />
                    </template>
                </main>

                <!-- Pagination -->
                <div class="py-6">
                    <Pagination :meta="meta" @page-change="loadProducts" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
