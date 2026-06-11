<script setup>
const route = useRoute()

// dummy brand data (replace with API later)
const brand = {
  name: "Apple",
  logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  description: "Premium consumer electronics and software products.",
  total_products: 24,
}

// dummy products
const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (100 + i * 25).toFixed(2),
  image: "https://via.placeholder.com/300",
  slug: `product-${i + 1}`,
}))
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-10">
    <div class="bg-white border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

      <img
        :src="brand.logo"
        class="h-20 w-20 object-contain"
        alt="brand logo"
      />

      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-gray-800">
          {{ brand.name }}
        </h1>

        <p class="text-gray-500 mt-2 max-w-xl">
          {{ brand.description }}
        </p>

        <div class="mt-3 text-sm text-gray-400">
          Total Products: {{ brand.total_products }}
        </div>
      </div>
    </div>

    <div class="mt-10 flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800">
        Products
      </h2>

      <span class="text-sm text-gray-500">
        {{ products.length }} items
      </span>
    </div>

    <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

      <NuxtLink
        v-for="product in products"
        :key="product.id"
        :to="`/products/${product.slug}`"
        class="group bg-white border rounded-2xl p-3 hover:shadow-md transition"
      >
        <img
          :src="product.image"
          class="h-28 w-full object-cover rounded-xl"
        />

        <div class="mt-3">
          <h3 class="text-sm font-medium text-gray-700 group-hover:text-primary">
            {{ product.name }}
          </h3>

          <p class="text-sm text-gray-500 mt-1">
            ${{ product.price }}
          </p>
        </div>
      </NuxtLink>

    </div>

  </main>
</template>