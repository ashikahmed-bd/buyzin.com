<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },

  open: {
    type: Boolean,
    default: false,
  },
});

const cartStore = useCartStore();

const emit = defineEmits(["update:open"]);

const close = () => {
  emit("update:open", false);
};

const selectedOptions = ref({});
const quantity = ref(props.product?.moq);

// Selected variant
const selectedVariant = computed(() => {
  if (!props.product?.variants?.length) {
    return null;
  }

  return props.product.variants.find((variant) => {
    return variant.options?.every((variantOption) => {
      return (
        selectedOptions.value[variantOption.attribute.id] ===
        variantOption.option.id
      );
    });
  });
});

// Current price
const currentPrice = computed(() => {
  if (selectedVariant.value) {
    return Number(selectedVariant.value.price);
  }

  return Number(props.product?.pricing?.min_price);
});

const currentStock = computed(() => {
  return selectedVariant.value?.quantity ?? 0;
});

// Variant select
const selectOption = (attribute, option) => {
  selectedOptions.value[attribute.id] = option.id;

  quantity.value = props.product?.moq ?? 1;
};

// Check selected option
const isSelected = (attribute, option) => {
  return selectedOptions.value[attribute] === option;
};

// Increment
const Increment = () => {
  const moq = Number(props.product?.moq ?? 1);
  const step = Number(props.product?.order_step ?? 1);
  const maxStock = Number(currentStock.value ?? 0);

  let nextQuantity = quantity.value + step;

  // Stock limit
  if (maxStock > 0 && nextQuantity > maxStock) {
    nextQuantity = moq + Math.floor((maxStock - moq) / step) * step;

    nextQuantity = Math.max(moq, nextQuantity);
  }

  quantity.value = nextQuantity;

  // Update cart
  if (props.product?.id) {
    cartStore.increment(
      props.product.id,
      selectedVariant.value?.id ?? null,
      quantity.value,
    );
  }
};

// Decrement
const Decrement = () => {
  const moq = Number(props.product?.moq ?? 1);
  const step = Number(props.product?.order_step ?? 1);

  const nextQuantity = quantity.value - step;

  quantity.value = Math.max(moq, nextQuantity);

  // Update cart
  if (props.product?.id) {
    cartStore.decrement(
      props.product.id,
      selectedVariant.value?.id ?? null,
      quantity.value,
    );
  }
};

// Total
const total = computed(() => {
  return quantity.value * currentPrice.value;
});

const addToCart = async () => {
  if (props.product?.has_variants && !selectedVariant.value) {
    return;
  }

  await cartStore.add(props.product, selectedVariant.value, quantity.value);

  setTimeout(() => {
    close();
  }, 1000);
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="props.open"
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-full opacity-0 sm:scale-95 sm:translate-y-4"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-full opacity-0 sm:scale-95 sm:translate-y-4"
        >
          <div
            @click.stop
            class="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl overflow-hidden rounded-t-2xl bg-white sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl"
          >
            <div
              class="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3"
            >
              <div>
                <h2 class="text-lg font-bold text-gray-900">Add to Cart</h2>

                <p class="mt-0.5 text-xs text-gray-500">
                  Select product options
                </p>
              </div>

              <button
                type="button"
                @click="close"
                class="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                <UIcon name="i-lucide-x" class="size-5" />
              </button>
            </div>

            <div class="flex-1 overflow-y-auto px-4 py-4">
              <div class="space-y-5">
                <div class="flex gap-3">
                  <div
                    class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <NuxtImg
                      :src="product.cover_url"
                      :alt="product.name"
                      class="size-full object-contain"
                    />
                  </div>

                  <div class="min-w-0">
                    <h3 class="truncate text-sm font-semibold text-gray-900">
                      {{ product.name }}
                    </h3>

                    <p class="mt-1 text-xs text-gray-500">
                      SKU: {{ product.sku }}
                    </p>

                    <div class="mt-1 flex items-center gap-2">
                      <span class="text-sm font-bold text-gray-900">
                        {{ $currency(currentPrice, product.currency) }}
                      </span>

                      <span class="text-xs text-gray-400">
                        / {{ product.unit }}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  v-for="attribute in product.attributes"
                  :key="attribute.id"
                  class="space-y-2"
                >
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-semibold text-gray-900">
                      {{ attribute.name }}
                    </h4>

                    <span
                      v-if="selectedOptions[attribute.id]"
                      class="flex items-center gap-1 text-xs font-medium text-green-600"
                    >
                      <UIcon name="i-lucide-check" class="size-3.5" />
                      Selected
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="option in attribute.options"
                      :key="option.id"
                      type="button"
                      @click="selectOption(attribute, option)"
                      :class="[
                        'rounded border px-2 py-1.5 text-sm font-medium transition',
                        isSelected(attribute.id, option.id)
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50',
                      ]"
                    >
                      <span class="flex items-center gap-1.5">
                        <UIcon
                          v-if="isSelected(attribute.id, option.id)"
                          name="i-lucide-check"
                          class="size-3.5"
                        />

                        {{ option.name }}
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  v-if="selectedVariant"
                  class="rounded border border-green-200 bg-green-50 px-3 py-2.5"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div>
                      <div class="flex items-center gap-1.5">
                        <UIcon
                          name="i-lucide-circle-check"
                          class="size-4 text-green-600"
                        />
                        <span class="text-xs font-semibold text-green-700">
                          Variant Available
                        </span>
                      </div>

                      <div class="mt-1.5 flex items-center gap-2">
                        <span class="text-sm font-bold text-gray-900">
                          {{ selectedVariant.name }}
                        </span>
                        <span class="text-gray-300">•</span>
                        <span
                          class="font-mono text-xs font-semibold text-gray-600"
                        >
                          {{ selectedVariant.sku }}
                        </span>
                      </div>
                    </div>

                    <div class="text-left sm:text-right">
                      <p class="text-lg font-bold text-gray-900">
                        {{ $currency(selectedVariant.price, product.currency) }}
                      </p>

                      <p class="text-xs text-gray-500">
                        {{ selectedVariant.quantity }} pcs available
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="product.has_variants"
                  class="rounded-2xl border border-red-200 bg-red-50 p-4"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-circle-alert"
                      class="size-4 text-red-600"
                    />

                    <p class="text-sm font-medium text-red-700">
                      Selected variant is not available.
                    </p>
                  </div>
                </div>

                <!-- Quantity -->
                <div class="rounded-xl bg-gray-50 p-4">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-gray-900">
                        Quantity
                      </p>
                      <p class="mt-1 text-xs text-gray-500">
                        Minimum order:
                        <strong> {{ product.moq }} {{ product.unit }} </strong>
                      </p>
                      <p class="mt-0.5 text-xs text-gray-400">
                        Order in multiples of {{ product.order_step }}
                      </p>
                    </div>
                    <div
                      class="flex items-center rounded-xl border border-gray-200 bg-white"
                    >
                      <button
                        type="button"
                        :disabled="quantity <= product.moq"
                        @click="Decrement"
                        :class="[
                          'flex size-10 items-center justify-center transition',
                          quantity <= product.moq
                            ? 'cursor-not-allowed text-gray-300'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                        ]"
                      >
                        <UIcon name="i-lucide-minus" class="size-4" />
                      </button>
                      <span
                        class="min-w-14 text-center text-sm font-bold text-gray-900"
                      >
                        {{ quantity }}
                      </span>
                      <button
                        type="button"
                        :disabled="currentStock > 0 && quantity >= currentStock"
                        @click="Increment"
                        :class="[
                          'flex size-10 items-center justify-center transition',
                          currentStock > 0 && quantity >= currentStock
                            ? 'cursor-not-allowed text-gray-300'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                        ]"
                      >
                        <UIcon name="i-lucide-plus" class="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="shrink-0 border-t border-gray-100 bg-white px-5 pb-5 pt-4"
            >
              <div class="mb-3 flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-500">Total</p>

                  <p class="mt-0.5 text-xs text-gray-400">
                    {{ quantity }} {{ product.unit }} ×
                    {{ $currency(currentPrice, product.currency) }}
                  </p>
                </div>

                <span class="text-xl font-bold text-gray-900">
                  {{ $currency(total, product.currency) }}
                </span>
              </div>

              <button
                type="button"
                :disabled="
                  cartStore.loading ||
                  (product.has_variants && !selectedVariant)
                "
                @click="addToCart"
                :class="[
                  'flex w-full items-center justify-center gap-2 rounded py-3.5 text-sm font-bold transition',
                  cartStore.loading ||
                  (product.has_variants && !selectedVariant)
                    ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                    : 'bg-gray-900 text-white hover:bg-gray-800',
                ]"
              >
                <UIcon
                  v-if="cartStore.loading"
                  name="i-lucide-loader"
                  class="size-5 animate-spin"
                />

                <UIcon v-else name="i-lucide-shopping-cart" class="size-5" />

                <span>
                  {{ cartStore.loading ? "Adding..." : "Add to Cart" }}
                </span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
