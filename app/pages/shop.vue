<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NotFound from '~/components/NotFound.vue'
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();
const route = useRoute()
const router = useRouter()

// Selected filters
const selectedCategory = ref(route.query.category || '')
const selectedBrands = ref(route.query.brands ? route.query.brands.split(',') : [])
const price = reactive({
  min: route.query.min_price ? Number(route.query.min_price) : null,
  max: route.query.max_price ? Number(route.query.max_price) : null
})
const rating = ref(route.query.rating ? Number(route.query.rating) : '')
const sort = ref(route.query.sort || 'default')

// Products & filters
const products = ref([])
const meta = ref({})
const filters = ref([])

// Load products with filters
const loadProducts = async (page = 1) => {
  const response = await productStore.index({
    categories: selectedCategory.value,
    brands: selectedBrands.value.join(','),
    min_price: price.min,
    max_price: price.max,
    rating: rating.value,
    sort: sort.value,
    page,
    limit: 12
  });

  products.value = response.data
  meta.value = response.meta
  filters.value = response.filters

  // Update URL query parameters
  router.replace({
    query: {
      categories: selectedCategory.value || '',
      brands: selectedBrands.value.length ? selectedBrands.value.join(',') : '',
      min_price: price.min || '',
      max_price: price.max || '',
      rating: rating.value || '',
      sort: sort.value !== 'default' ? sort.value : '',
      page
    }
  })
}

watch([selectedCategory, selectedBrands, rating, sort], () => {
  loadProducts()
}
)

onMounted(() => {
  loadProducts(route.query.page ? Number(route.query.page) : 1)
})
</script>


<template>
  <SeoMeta title="Buyzin | Shop Smart. Live Easy. | Best Deals on Fashion, Gadgets & Lifestyle in Bangladesh"
    description="Shop online with Buyzin for 100% authentic products, fast delivery & easy returns across Bangladesh. Find the best deals on fashion, electronics, home goods & more. Shop Smart. Live Easy."
    keywords="ecommerce, online shopping, buy online, fashion, gadgets, electronics, Bangladesh, best price, quick delivery, Buyzin" />

  <main class="max-w-7xl mx-auto px-4 py-4">

    <BannerCard position="shop_page" />

    <div class="flex flex-wrap gap-4 py-4">
      <!-- Sidebar -->
      <aside class="space-y-4 flex-none max-w-72 hidden md:block">
        <!-- Categories -->
        <template v-if="productStore.loading">
          <div class="bg-white rounded-xl border p-4 space-y-3">
            <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>

        <template v-else>
          <div class="bg-white rounded-xl border p-4">
            <h3 class="font-semibold text-heading mb-4">Categories</h3>
            <div class="space-y-3 h-96 overflow-y-auto scrollbar">
              <template v-for="cat in filters.categories || []" :key="cat.id">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" class="size-4 accent-primary cursor-pointer" name="category" :value="cat.slug"
                    v-model="selectedCategory" />
                  <span class="text-sm text-gray-700 group-hover:text-primary">{{ cat.name }}</span>
                </label>

                <div v-if="cat.children && cat.children.length" class="pl-5 mt-1 space-y-1">
                  <label v-for="child in cat.children" :key="child.id"
                    class="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" class="size-4 accent-primary cursor-pointer" name="category" :value="child.slug"
                      v-model="selectedCategory" />
                    <span class="text-sm text-gray-600 group-hover:text-primary">{{ child.name }}</span>
                  </label>
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- Brands -->
        <template v-if="productStore.loading">
          <div class="bg-white rounded-xl border p-4 space-y-3">
            <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>

        <template v-else>
          <div class="bg-white rounded-xl border p-4">
            <h3 class="font-semibold text-heading mb-4">Brands</h3>
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
        <template v-if="productStore.loading">
          <div class="bg-white rounded-xl border p-4 space-y-3">
            <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>

        <template v-else>
          <div class="bg-white rounded-xl border p-4">
            <h3 class="font-semibold text-heading mb-4">Price Range</h3>

            <div class="flex gap-3 mb-3">
              <input type="number" v-model.number="price.min" :min="filters.price_range?.min ?? 0"
                :max="price.max ?? filters.price_range?.max" :placeholder="filters.price_range?.min ?? 0"
                class="w-1/2 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />

              <input type="number" v-model.number="price.max" :min="price.min ?? filters.price_range?.min"
                :max="filters.price_range?.max ?? 1000000" :placeholder="filters.price_range?.max ?? 1000000"
                class="w-1/2 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <button type="button" @click="loadProducts"
              class="w-full bg-primary text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-dark transition">
              Apply
            </button>
          </div>
        </template>


        <!-- Ratings -->
        <template v-if="productStore.loading">
          <div class="bg-white rounded-xl border p-4 space-y-3">
            <div v-for="i in 8" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </template>
        <template v-else>
          <div class="bg-white rounded-xl border p-4">
            <h3 class="font-semibold text-heading mb-4">Ratings</h3>
            <div class="space-y-3">
              <label v-for="r in filters.ratings || [5, 4, 3, 2, 1]" :key="r"
                class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="rating" :value="r" v-model.number="rating" class="size-4 accent-primary" />
                <div class="flex items-center gap-1">
                  <svg v-for="star in 5" :key="star" class="size-4"
                    :class="star <= r ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
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
      <div class="flex-1 lg:ml-0 space-y-4">
        <!-- Sorting Bar -->
        <template v-if="productStore.loading">
          <nav class="bg-white border rounded-xl p-4 mb-6 animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          </nav>
        </template>

        <template v-else>
          <nav class="flex items-center justify-between gap-2.5 p-4 bg-white rounded-xl border">
            <div class="flex items-center w-full gap-2">
              <button class="flex items-center gap-2
             border rounded-lg px-3 py-2 text-sm">
                <UIcon name="i-lucide-filter" class="size-4" />
                Filters
              </button>

              <span v-if="meta" class="hidden md:block text-gray-700 text-sm font-medium">
                Showing {{ meta.from || 0 }}–{{ meta.to || 0 }} of {{ meta.total || 0 }} results
              </span>
            </div>

            <div class="flex items-center justify-end gap-2">
              <div class="flex items-center gap-2">
                <label class="text-gray-600 text-sm whitespace-nowrap">
                  Sort by:
                </label>

                <select v-model="sort" class="border rounded-lg px-3 py-2 text-sm
               focus:outline-none">
                  <option value="default">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" class="hover:text-primary" :class="{ 'text-primary': view === 'grid' }"
                  @click="view = 'grid'">
                  <UIcon name="i-lucide-layout-grid" class="size-5" />
                </button>
                <button type="button" class="hover:text-primary" :class="{ 'text-primary': view === 'list' }"
                  @click="view = 'list'">
                  <UIcon name="i-lucide-list" class="size-5" />
                </button>
              </div>
            </div>
          </nav>
        </template>


        <!-- Product Grid -->
        <main class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <template v-if="productStore.loading">
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
