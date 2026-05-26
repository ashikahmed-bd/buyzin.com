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
  if (authStore.token) {
    await wishlistStore.addItem(product);
  }
  setTimeout(() => {
    navigateTo("/auth/login");
  }, 2000);
};
</script>

<template>
  <article
    class="bg-white border border-border rounded-lg overflow-hidden relative"
  >
    <div class="absolute top-2 right-2 z-20">
      <span
        v-if="product.price && product.base_price > product.price"
        class="inline-flex items-center text-xs font-semibold px-2 py-1 rounded-l-full bg-red-100 text-red-600 shadow-sm"
      >
        {{ product.base_price - product.price }} Off
      </span>
    </div>

    <a :href="`/product/${product.slug}/${product.id}`" :title="product.name">
      <div class="shine__img__wrapper">
        <NuxtImg
          :src="product.media?.cover_url"
          :alt="product.name"
          loading="lazy"
          class="bg-white w-full h-full object-contain transition-transform duration-300 ease-in-out shine__img"
        />
      </div>
    </a>

    <div class="px-2.5 py-2">
      <a :href="`/product/${product.slug}/${product.id}`">
        <h3
          class="text-xl line-clamp-2 font-semibold hover:text-primary transition duration-150"
        >
          {{ product.name }}
        </h3>
      </a>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-0.5">
          <div v-for="i in 5" :key="i">
            <IconsIconStar
              v-if="(product.review_count ?? 0) === 0"
              class="size-4 text-gray-400"
            />
            <template v-else>
              <IconsIconStarFill
                v-if="i <= Math.floor(product.rating ?? 0)"
                class="size-4 text-yellow-400"
              />
              <IconsIconStar v-else class="size-4 text-gray-400" />
            </template>
          </div>
        </div>
        <span>({{ product.review_count ?? 0 }})</span>
      </div>

      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <template v-if="product.price">
            <span class="text-primary text-base font-sans font-medium">
              {{ product.price_formatted }}
            </span>
            <del class="text-sm line-through font-sans">
              {{ product.base_price_formatted }}
            </del>
          </template>

          <template v-else>
            <span class="text-primary text-base font-medium">
              {{ product.base_price_formatted }}
            </span>
          </template>
        </div>

        <div class="block">
          <button
            type="button"
            @click="addToWishlist(product)"
            class="flex items-end hover:text-primary focus:text-primary transition duration-150"
          >
            <IconsIconHeart
              class="bg-white rounded-full p-1.5 border border-border size-8"
            />
          </button>
        </div>
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
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
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
