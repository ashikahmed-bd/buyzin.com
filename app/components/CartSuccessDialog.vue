<script setup>
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);

const router = useRouter();

const close = () => emit("close");
const goToCart = () => {
  router.push("/cart");
  close();
};
const confirmOrder = () => {
  router.push("/checkout");
  close();
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div class="relative bg-white rounded-xl w-full max-w-sm p-6 text-center animate__animated animate__fadeIn">
      <h2 class="text-xl font-semibold mb-2 text-primary">
        Product Added to Cart!
      </h2>
      <p class="text-gray-500 mb-6">
        Your item has been successfully added to your shopping cart.
      </p>

      <div class="flex items-center justify-center gap-3">
        <button @click="goToCart" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          View Cart
        </button>
        <button @click="confirmOrder" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Confirm Order
        </button>
      </div>

      <button @click="close" class="absolute top-3 right-4 text-body hover:text-primary">
        <LazyUIcon name="i-lucide-circle-x" class="size-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate__animated {
  animation-duration: 0.6s;
  animation-fill-mode: both;
}

.animate__fadeInDown {
  animation-name: fadeInDown;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
