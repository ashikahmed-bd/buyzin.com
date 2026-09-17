<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  open: { type: Boolean, default: false },
});
const emit = defineEmits(["update:open", "send-inquiry"]);

const cartStore = useCartStore();
const quantities = ref({});

const close = () => emit("update:open", false);

const variants = computed(() => props.product?.variants ?? []);

const getQuantity = (id) => Number(quantities.value[id] ?? 0);

const setQuantity = (id, value) => {
  const variant = variants.value.find((item) => item.id === id);
  if (!variant) return;
  const step = Number(props.product?.order_step ?? 1);
  const stock = Number(variant.quantity ?? 0);
  let quantity = Math.max(0, Number(value ?? 0));
  if (quantity > 0) {
    quantity = Math.floor(quantity / step) * step;
    quantity = Math.max(quantity, step);
  }
  if (stock > 0) {
    quantity = Math.min(quantity, stock);
  }
  quantities.value[id] = quantity;
};

const incrementVariant = (variant) => {
  setQuantity(
    variant.id,
    getQuantity(variant.id) + Number(props.product?.order_step ?? 1),
  );
};

const decrementVariant = (variant) => {
  setQuantity(
    variant.id,
    getQuantity(variant.id) - Number(props.product?.order_step ?? 1),
  );
};

const getVariantLabel = (variant) => {
  if (!variant?.options?.length) return variant?.name ?? "";
  return variant.options
    .map((item) => item.option?.name ?? item.name ?? "")
    .filter(Boolean)
    .join(" / ");
};

const getVariantPricing = (variant) => {
  const pricing = variant?.pricings ?? [];
  const quantity = getQuantity(variant.id);
  if (!pricing.length || quantity <= 0) return null;
  return (
    pricing.find((item) => {
      const min = Number(item.min_quantity ?? 0);
      const max = item.max_quantity ? Number(item.max_quantity) : Infinity;
      return quantity >= min && quantity <= max;
    }) ?? null
  );
};

const getVariantPrice = (variant) => {
  const pricing = getVariantPricing(variant);
  if (pricing) return Number(pricing.price ?? 0);
  if (variant?.price) return Number(variant.price);
  return Number(props.product?.pricing?.min_price ?? 0);
};

const getVariantTotal = (variant) =>
  getQuantity(variant.id) * getVariantPrice(variant);

const selectedVariants = computed(() =>
  variants.value.filter((variant) => getQuantity(variant.id) > 0),
);

const totalQuantity = computed(() =>
  selectedVariants.value.reduce(
    (total, variant) => total + getQuantity(variant.id),
    0,
  ),
);

const subtotal = computed(() =>
  selectedVariants.value.reduce(
    (total, variant) => total + getVariantTotal(variant),
    0,
  ),
);

const hasSelection = computed(() => selectedVariants.value.length > 0);

const resetQuantities = () => {
  quantities.value = Object.fromEntries(
    variants.value.map((variant, index) => [
      variant.id,
      index === 0 ? Number(props.product?.moq ?? 0) : 0,
    ]),
  );
};

watch(
  () => props.open,
  (open) => open && resetQuantities(),
);

const addToCart = async () => {
  if (!hasSelection.value) return;
  for (const variant of selectedVariants.value) {
    await cartStore.add(props.product.id, variant.id, getQuantity(variant.id));
  }
  close();
};

const sendInquiry = () => {
  if (!hasSelection.value) return;
  emit("send-inquiry", {
    product_id: props.product.id,
    quantity: totalQuantity.value,
    subtotal: subtotal.value,
    items: selectedVariants.value.map((variant) => ({
      variant_id: variant.id,
      sku: variant.sku,
      name: variant.name,
      quantity: getQuantity(variant.id),
      price: getVariantPrice(variant),
      total: getVariantTotal(variant),
    })),
  });
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
        v-if="open"
        class="fixed inset-0 z-50 bg-black/20 backdrop-blur"
        @click="close"
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
            v-if="open"
            class="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
            @click.stop
          >
            <header
              class="flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 px-5 py-4"
            >
              <div class="flex min-w-0 items-center gap-4">
                <div
                  class="flex size-14 shrink-0 items-center justify-center rounded"
                >
                  <NuxtImg
                    :src="product.cover_url"
                    :alt="product.name"
                    class="size-full object-contain p-1"
                  />
                </div>
                <div class="min-w-0">
                  <h2
                    class="truncate text-sm font-semibold text-title sm:text-base"
                  >
                    {{ product.name }}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                class="flex size-9 shrink-0 items-center justify-center rounded border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                @click="close"
              >
                <UIcon name="i-lucide-x" class="size-4" />
              </button>
            </header>
            <div class="space-y-4 px-4 py-3">
              <div v-for="attribute in product.attributes" :key="attribute.id">
                <h3 class="text-sm font-bold text-gray-900">
                  {{ attribute.name }}
                </h3>
                <div class="space-y-2">
                  <template
                    v-for="option in attribute.options"
                    :key="option.id"
                  >
                    <template
                      v-for="variant in variants.filter((item) =>
                        item.options?.some(
                          (variantOption) =>
                            variantOption.option?.id === option.id,
                        ),
                      )"
                      :key="variant.id"
                    >
                      <div class="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          class="rounded px-3 py-2 text-sm font-medium transition"
                          :class="
                            getQuantity(variant.id) > 0
                              ? 'bg-dark text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          "
                          @click="
                            setQuantity(
                              variant.id,
                              getQuantity(variant.id) ||
                                Number(product.moq ?? 1),
                            )
                          "
                        >
                          {{ option.name }}
                        </button>
                        <div
                          class="flex shrink-0 items-center overflow-hidden rounded-full border border-gray-200"
                        >
                          <button
                            type="button"
                            class="flex size-8 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
                            :disabled="getQuantity(variant.id) <= 0"
                            @click="decrementVariant(variant)"
                          >
                            <UIcon name="i-lucide-minus" class="size-3.5" />
                          </button>
                          <span
                            class="min-w-10 border-x border-gray-200 px-2 text-center text-sm font-medium"
                          >
                            {{ getQuantity(variant.id) }}
                          </span>
                          <button
                            type="button"
                            class="flex size-8 items-center justify-center text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
                            :disabled="
                              variant.quantity > 0 &&
                              getQuantity(variant.id) >= variant.quantity
                            "
                            @click="incrementVariant(variant)"
                          >
                            <UIcon name="i-lucide-plus" class="size-3.5" />
                          </button>
                        </div>
                      </div>
                      <div
                        v-if="
                          getQuantity(variant.id) > 0 &&
                          getVariantPricing(variant)
                        "
                        class="flex items-center justify-between"
                      >
                        <span class="text-xs text-gray-400">
                          {{ getVariantPricing(variant)?.min_quantity }}
                          <template
                            v-if="getVariantPricing(variant)?.max_quantity"
                          >
                            - {{ getVariantPricing(variant)?.max_quantity }}
                          </template>
                          <template v-else>+</template> pcs
                        </span>
                        <span class="text-xs font-semibold text-gray-700">
                          {{
                            $currency(
                              getVariantPrice(variant),
                              product.currency,
                            )
                          }}
                          / {{ product.unit }}
                        </span>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
              <div
                v-if="hasSelection"
                class="rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <div class="mb-2 flex items-center justify-between">
                  <p class="text-xs font-bold text-gray-900">
                    Selected variants
                  </p>
                  <span class="text-xs text-gray-500">
                    {{ selectedVariants.length }} variants
                  </span>
                </div>
                <div class="space-y-2">
                  <div
                    v-for="variant in selectedVariants"
                    :key="variant.id"
                    class="flex items-center justify-between text-xs"
                  >
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-700">
                        {{ getVariantLabel(variant) }}
                      </span>

                      <span class="text-xs text-gray-500">
                        {{ $currency(variant.price, product.currency) }} x
                        {{ getQuantity(variant.id) }}
                      </span>
                    </div>
                    <span class="font-semibold text-gray-900">
                      {{
                        $currency(getVariantTotal(variant), product.currency)
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <footer class="shrink-0 px-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-gray-700">Subtotal</p>
                  <p class="mt-0.5 text-xs text-gray-400">
                    {{ totalQuantity }} {{ product.unit }} selected
                  </p>
                </div>
                <span class="text-base font-bold text-gray-900">
                  {{ $currency(subtotal, product.currency) }}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-2 py-8">
                <button
                  type="button"
                  class="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition disabled:cursor-not-allowed"
                  :class="
                    !hasSelection || cartStore.loading
                      ? 'bg-primary text-white cursor-not-allowed opacity-70'
                      : 'bg-primary text-white hover:bg-primary-hover'
                  "
                  :disabled="!hasSelection || cartStore.loading"
                  @click="addToCart"
                >
                  <UIcon
                    :name="
                      cartStore.loading
                        ? 'i-lucide-loader'
                        : 'i-lucide-shopping-cart'
                    "
                    class="size-5"
                    :class="{ 'animate-spin': cartStore.loading }"
                  />
                  {{ cartStore.loading ? "Adding..." : "Add to cart" }}
                </button>
                <button
                  type="button"
                  class="rounded-full border-2 text-sm font-bold px-4 py-2 transition disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
                  :class="
                    hasSelection
                      ? 'border-border bg-white text-body hover:bg-gray-50'
                      : 'bg-white'
                  "
                  :disabled="!hasSelection"
                  @click="sendInquiry"
                >
                  Send inquiry
                </button>
              </div>
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
