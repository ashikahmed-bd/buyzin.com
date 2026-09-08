<script setup>
const cartStore = useCartStore();

const increase = async (item) => {
  const moq = Number(item.moq ?? 1);
  const step = Number(item.orderStep ?? 1);
  const maxStock = Number(item.stock ?? 0);

  const nextQuantity = Number(item.quantity) + step;

  // Stock limit
  if (maxStock > 0 && nextQuantity > maxStock) {
    nextQuantity = moq + Math.floor((maxStock - moq) / step) * step;

    nextQuantity = Math.max(moq, nextQuantity);
  }

  // Nothing to update
  if (nextQuantity === item.quantity) {
    return;
  }

  cartStore.increment(item.product, item.variant ?? null, nextQuantity);
};

const decrease = async (item) => {
  const moq = Number(item.moq ?? 1);
  const step = Number(item.orderStep ?? 1);

  const nextQuantity = Math.max(moq, Number(item.quantity) - step);

  // Nothing to update
  if (nextQuantity === item.quantity) {
    return;
  }

  cartStore.decrement(item.product, item.variant ?? null, nextQuantity);
};

const remove = async (item) => {
  await cartStore.remove(item.product, item.variant);
};

const clear = async () => {
  await cartStore.clear();
};

const checkout = () => {
  return navigateTo("/checkout");
};
</script>

<template>
  <main class="container mx-auto px-4 py-4">
    <Head>
      <Title>Your Shopping Cart | Buyzin</Title>
      <Meta
        name="description"
        content="Review your shopping cart, update items, and proceed to secure checkout."
      />
      <Meta name="robots" content="noindex, follow" />
      <Meta name="referrer" content="no-referrer-when-downgrade" />
    </Head>

    <div class="flex flex-wrap justify-between gap-6">
      <div class="bg-white rounded-xl grow">
        <EmptyCart v-if="!cartStore?.items?.length" />

        <template v-else>
          <div
            class="px-4 py-3 border-b border-dashed flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-semibold">Shopping Cart</h3>

              <p class="mt-1 text-sm text-gray-500">
                {{ cartStore.items.length }} products in your order
              </p>
            </div>

            <button
              class="text-sm text-danger"
              :disabled="cartStore.loading"
              @click="clear()"
            >
              <span> Clear all </span>
            </button>
          </div>

          <div class="space-y-2.5 divide-y divide-dashed divide-border">
            <article
              v-for="item in cartStore.items"
              :key="`${item.product}-${item.variant ?? 'default'}`"
              class="group p-4 space-y-3"
            >
              <!-- Product -->
              <div class="flex gap-4">
                <div
                  class="size-20 shrink-0 overflow-hidden rounded bg-gray-50"
                >
                  <NuxtImg
                    :src="item.image"
                    :alt="item.name"
                    class="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <NuxtLink
                      :to="`/product/${item.product}`"
                      class="line-clamp-1 text-base font-semibold text-title transition hover:text-primary"
                    >
                      {{ item.name }}
                    </NuxtLink>

                    <button
                      type="button"
                      :disabled="cartStore.loading"
                      @click="cartStore.remove(item.product, item.variant)"
                      class="size-8 shrink-0 rounded-lg text-body transition hover:bg-red-50 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Remove item"
                    >
                      <UIcon name="i-lucide-trash-2" class="size-4" />
                    </button>
                  </div>

                  <div class="flex items-center gap-x-2.5 text-xs text-body">
                    <span v-if="item.sku">
                      SKU:
                      <strong class="text-body">
                        {{ item.sku }}
                      </strong>
                    </span>

                    <span v-for="option in item.options" :key="option.optionId">
                      {{ option.attributeName }}:
                      <strong class="font-semibold text-gray-800">
                        {{ option.optionName }}
                      </strong>
                    </span>

                    <span
                      v-if="item.unit"
                      class="rounded-md bg-gray-100 px-2 py-1 font-medium capitalize text-body"
                    >
                      {{ item.unit }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center">
                      <button
                        type="button"
                        :disabled="
                          cartStore.loading || item.quantity <= item.moq
                        "
                        @click="decrease(item)"
                        class="flex size-6 items-center justify-center text-body transition hover:bg-gray-50 hover:text-danger disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <UIcon name="i-lucide-minus" class="size-4" />
                      </button>

                      <span
                        class="flex min-w-6 items-center justify-center px-2 text-sm font-bold text-gray-950"
                      >
                        {{ item.quantity }}
                      </span>

                      <button
                        type="button"
                        :disabled="cartStore.loading"
                        @click="increase(item)"
                        class="flex size-6 items-center justify-center text-body transition hover:bg-gray-50 hover:text-success disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <UIcon name="i-lucide-plus" class="size-4" />
                      </button>
                    </div>

                    <p class="text-sm font-medium text-gray-950">
                      {{ $currency(item.price * item.quantity) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Product Meta -->
              <div class="flex flex-wrap items-center gap-x-4 text-sm">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-xs font-medium text-body">
                    Unit Price
                  </span>

                  <span class="text-xs font-semibold text-title">
                    {{ $currency(item.price) }}
                  </span>
                </div>

                <div class="flex items-baseline gap-1.5">
                  <span class="text-xs font-medium text-body"> MOQ </span>
                  <span class="font-semibold text-gray-800">
                    {{ item.moq }}
                    <span class="text-xs font-normal text-body">
                      {{ item.unit }}
                    </span>
                  </span>
                </div>

                <div class="flex items-baseline gap-1.5">
                  <span class="text-xs font-medium text-body"> Stock </span>
                  <span class="font-semibold text-success">
                    {{ item.stock }}
                    <span class="text-xs font-normal">
                      {{ item.unit }}
                    </span>
                  </span>
                </div>
              </div>

              <div
                v-if="item.moq || item.orderStep"
                class="flex items-start gap-1.5 text-xs text-body"
              >
                <UIcon name="i-lucide-info" class="size-4 shrink-0" />
                <span>
                  Minimum order
                  <strong class="font-semibold text-blue-500">
                    {{ item.moq }} {{ item.unit }}
                  </strong>
                  <template v-if="item.orderStep">
                    <span class="mx-1 text-gray-300">·</span>
                    Increase by
                    <strong class="font-semibold text-blue-500">
                      {{ item.orderStep }} {{ item.unit }}
                    </strong>
                  </template>
                </span>
              </div>
            </article>
          </div>
        </template>
      </div>

      <aside class="w-full max-w-sm">
        <div class="rounded-xl bg-white p-4 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>
            <span class="text-xs font-medium text-body">
              {{ cartStore.items.length }} items
            </span>
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body"> Subtotal </span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cartStore.subtotal) }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body">
                VAT
                <span class="text-xs"> ({{ cartStore.taxRate }}%) </span>
              </span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cartStore.tax) }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body"> Shipping </span>
              <span
                v-if="cartStore.shipping > 0"
                class="shrink-0 text-sm font-semibold text-gray-800"
              >
                {{ $currency(cartStore.shipping) }}
              </span>

              <span v-else class="shrink-0 text-sm font-semibold text-success">
                Free
              </span>
            </div>
          </div>

          <div class="flex items-end justify-between gap-4">
            <div class="block">
              <p class="text-sm font-semibold text-gray-900">Total Amount</p>
              <small class="mt-0.5 text-xs text-body"
                >Including VAT & shipping</small
              >
            </div>
            <span
              class="shrink-0 text-xl font-bold tracking-tight text-primary"
            >
              {{ $currency(cartStore.total) }}
            </span>
          </div>

          <button
            type="button"
            :disabled="cartStore.loading || cartStore.isEmpty"
            class="w-full flex items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            @click="checkout"
          >
            <span>Proceed to Checkout</span>
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </button>

          <button
            type="button"
            :disabled="cartStore.loading || cartStore.isEmpty"
            class="w-full flex items-center justify-center gap-2 rounded border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            @click="requestQuote"
          >
            <UIcon name="i-lucide-file-text" class="size-4" />
            <span>Request a Quote</span>
          </button>

          <div class="w-full">
            <h3 class="text-sm font-bold text-title mb-4">Buyer protection</h3>

            <div class="space-y-4">
              <div class="flex gap-3">
                <UIcon
                  name="i-lucide-shield-check"
                  class="mt-0.5 size-5 shrink-0 text-green-600"
                />
                <div class="block">
                  <p class="text-sm font-semibold text-gray-900">
                    Secure payments
                  </p>

                  <p class="mt-0.5 text-xs leading-5 text-gray-500">
                    SSL encryption and PCI DSS data protection keep your payment
                    information secure.
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <UIcon
                  name="i-lucide-truck"
                  class="mt-0.5 size-5 shrink-0 text-blue-600"
                />
                <div class="block">
                  <p class="text-sm font-semibold text-gray-900">
                    Guaranteed delivery
                  </p>

                  <p class="mt-0.5 text-xs leading-5 text-gray-500">
                    Get your order by the scheduled date or receive 5% delay
                    compensation.
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <UIcon
                  name="i-lucide-circle-dollar-sign"
                  class="mt-0.5 size-5 shrink-0 text-orange-600"
                />
                <div class="block">
                  <p class="text-sm font-semibold text-gray-900">
                    Money-back protection
                  </p>
                  <p class="mt-0.5 text-xs leading-5 text-gray-500">
                    Get a refund if your order was not shipped, is missing, or
                    arrives with product issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
