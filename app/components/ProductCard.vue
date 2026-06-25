<script setup>
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToWishlist = async (product) => {
  if (!authStore.token) {
    return navigateTo("/auth/login");
  }

  await wishlistStore.addItem(product);
};
</script>

<template>
  <article class="group relative bg-white border border-border rounded overflow-hidden">
    <div class="absolute top-2 left-2 right-2 z-10 flex justify-between items-start">
      <span v-if="product.has_discount" class="text-xs font-semibold px-2 py-1 bg-danger text-white rounded-full">
        -{{ product.discount_percentage }} OFF
      </span>
      <button @click="addToWishlist(product)" type="button">
        <UIcon name="i-lucide-heart" class="size-5 hover:text-primary" />
      </button>
    </div>

    <a :href="`/product/${product.slug}/${product.id}`">
      <div
        class="relative shine__img__wrapper aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <NuxtImg :src="product.cover_url" :alt="product.meta_title"
          class="w-full h-full object-contain shine__img group-hover:scale-105 transition-transform duration-300"
          loading="lazy" />
      </div>
    </a>

    <div class="p-2.5">
      <a :href="`/product/${product.slug}/${product.id}`">
        <h3 class="text-sm font-semibold text-heading line-clamp-2 group-hover:text-primary transition">
          {{ product.name }}
        </h3>
      </a>

      <div class="flex items-center gap-2 py-2">
        <div class="flex items-center gap-0.5">
          <UIcon v-for="i in 5" :key="i" :name="i <= Math.round(product.reviews_avg_rating ?? 0)
            ? 'heroicons:star-solid'
            : 'heroicons:star'" class="size-4" :class="i <= Math.round(product.reviews_avg_rating ?? 0)
              ? 'text-yellow-400'
              : 'text-gray-300'" />
        </div>

        <span class="text-xs text-black">
          ({{ product.reviews_count }})
        </span>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-base font-semibold text-black">
          {{ product.price_formatted }}
        </span>

        <span v-if="product.price" class="text-xs text-muted line-through">
          {{ product.base_price_formatted }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.shine__img__wrapper {
  position: relative;
  overflow: hidden;
  display: block;
}

.shine__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out;
  display: block;
}

.shine__img__wrapper:hover .shine__img {
  transform: scale(1.05);
}

/* Shine effect pseudo-element */
:deep(.shine__img__wrapper)::before {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%);
  transform: skewX(-25deg);
  z-index: 10;
  pointer-events: none;
}

/* Hover animation */
:deep(.shine__img__wrapper:hover)::before {
  animation: shine 1s ease-in-out;
}

@keyframes shine {
  0% {
    left: -75%;
  }

  100% {
    left: 125%;
  }
}
</style>
