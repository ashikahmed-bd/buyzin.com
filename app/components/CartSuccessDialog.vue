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
  <Transition name="dialog">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur p-4"
    >
      <div class="relative w-full max-w-xl rounded-xl bg-white overflow-hidden">
        <button
          @click="close"
          class="absolute right-5 top-5 text-gray-400 hover:text-red-500 transition"
        >
          <LazyUIcon name="i-lucide-x" class="w-7 h-7" />
        </button>

        <div class="flex flex-col items-center bg-primary/5 px-8 py-8 border-b">
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white"
          >
            <LazyUIcon name="i-lucide-shopping-cart" class="w-10 h-10" />
          </div>

          <h2 class="mt-5 text-3xl font-bold text-gray-900">Added to Cart</h2>
          <p class="mt-3 max-w-md text-center text-gray-500">
            Your selected product has been successfully added to your shopping
            cart. You can continue shopping or proceed directly to checkout.
          </p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              @click="goToCart"
              class="rounded-xl border border-gray-300 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              View Cart
            </button>

            <button
              @click="confirmOrder"
              class="rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              Checkout
            </button>
          </div>

          <button
            @click="close"
            class="mt-5 w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .relative,
.dialog-leave-to .relative {
  transform: scale(0.92) translateY(20px);
}

.dialog-enter-to .relative,
.dialog-leave-from .relative {
  transform: scale(1) translateY(0);
}
</style>
