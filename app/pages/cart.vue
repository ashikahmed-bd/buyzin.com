<script setup>
const cartStore = useCartStore();

const {
  data: cart,
  pending,
  error,
  refresh,
} = await useAsyncData("cart", () => {
  return cartStore.getItems();
});

const update = async (item, quantity) => {
  await cartStore.update(item, quantity);
  await refresh();
};

const remove = async (item) => {
  await cartStore.remove(item);
  await refresh();
};

const clear = async () => {
  await cartStore.clear();
  await refresh();
};

const goToCheckout = () => {
  if (!cart.value.items?.length) {
    return;
  }

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
        <LoadingState v-if="pending" />

        <ErrorState v-else-if="error" :retry="refresh" />

        <EmptyCart v-if="!cart?.items?.length" />

        <template v-else>
          <div
            class="px-4 py-3 border-b border-dashed flex justify-between items-center"
          >
            <div>
              <h3 class="text-lg font-semibold">Shopping Cart</h3>

              <p class="mt-1 text-sm text-gray-500">
                ({{ cart.items.length }}) products in your order
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
              v-for="item in cart.items"
              :key="item.id"
              class="group p-4"
            >
              <div class="flex items-stretch gap-4">
                <div
                  class="size-24 shrink-0 overflow-hidden rounded bg-gray-50"
                >
                  <NuxtImg
                    :src="item.product?.cover_url"
                    :alt="item.product?.name"
                    class="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <NuxtLink
                      :to="`/product/${item.product?.slug}/${item.product?.id}`"
                      target="_blank"
                      class="line-clamp-1 text-base font-semibold text-title transition hover:text-primary"
                    >
                      {{ item.product?.name }}
                    </NuxtLink>

                    <button
                      type="button"
                      :disabled="cartStore.loading"
                      @click="remove(item.id)"
                      class="size-8 shrink-0 rounded-lg text-body transition hover:bg-red-50 hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Remove item"
                    >
                      <UIcon name="i-lucide-trash-2" class="size-4" />
                    </button>
                  </div>

                  <div
                    v-if="item.product?.sku"
                    class="flex flex-wrap items-center gap-x-3 text-xs text-body"
                  >
                    <span v-if="item.product?.sku">
                      SKU:
                      <strong class="text-gray-800">
                        {{ item.product.sku }}
                      </strong>
                    </span>

                    <span
                      v-for="option in item.variant?.options"
                      :key="`${option.attribute}-${option.option}`"
                    >
                      {{ option.attribute }}:
                      <strong class="font-semibold text-gray-800">
                        {{ option.option }}
                      </strong>
                    </span>

                    <span
                      v-if="item.product?.unit"
                      class="rounded-md bg-gray-100 px-2 py-1 font-medium capitalize text-body"
                    >
                      {{ item.product.unit }}
                    </span>
                  </div>

                  <div class="flex flex-wrap items-center gap-x-4 text-sm">
                    <div class="flex items-baseline gap-1.5">
                      <span class="text-xs font-medium text-body">
                        Unit Price
                      </span>

                      <span class="text-xs font-semibold text-title">
                        {{ $currency(item.unit_price) }}
                      </span>
                    </div>

                    <div
                      v-if="item.tax_rate > 0"
                      class="flex items-baseline gap-1.5"
                    >
                      <span class="text-xs font-medium text-body"> Tax </span>

                      <span class="text-xs font-semibold text-title">
                        {{ item.tax_rate }}%
                        <span class="font-normal text-body">
                          · {{ $currency(item.tax) }}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between gap-x-4 py-1.5">
                    <div class="flex items-center">
                      <button
                        type="button"
                        :disabled="
                          cartStore.loading ||
                          item.quantity <= (item.product?.moq ?? 1)
                        "
                        @click="
                          update(
                            item,
                            item.quantity - item.product?.order_step ?? 1,
                          )
                        "
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
                        @click="
                          update(
                            item,
                            item.quantity + (item.product?.order_step ?? 1),
                          )
                        "
                        class="flex size-6 items-center justify-center text-body transition hover:bg-gray-50 hover:text-success disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <UIcon name="i-lucide-plus" class="size-4" />
                      </button>
                    </div>

                    <p class="text-sm font-medium text-gray-950">
                      {{ $currency(item.total) }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                v-if="item.product?.moq || item.product?.order_step"
                class="flex items-start gap-1.5 text-xs text-body"
              >
                <UIcon name="i-lucide-info" class="size-4 shrink-0" />

                <span>
                  Minimum order
                  <strong class="font-semibold text-blue-500">
                    {{ item.product.moq }} {{ item.product.unit }}
                  </strong>

                  <template v-if="item.product?.order_step">
                    <span class="mx-1 text-gray-300">·</span>

                    Increase by
                    <strong class="font-semibold text-blue-500">
                      {{ item.product.order_step }} {{ item.product.unit }}
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
              {{ cart.items.length }} items
            </span>
          </div>

          <div class="space-y-2.5">
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body"> Subtotal </span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cart.subtotal, cart.currency) }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body"> Shipping Charge </span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cart.shipping, cart.currency) }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body">VAT</span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cart.tax, cart.currency) }}
              </span>
            </div>

            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-body">Discount</span>
              <span class="shrink-0 text-sm font-semibold text-gray-800">
                {{ $currency(cart.discount, cart.currency) }}
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
              {{ $currency(cart.total, cart.currency) }}
            </span>
          </div>

          <button
            type="button"
            :disabled="cartStore.loading || cartStore.isEmpty"
            class="w-full flex items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            @click="goToCheckout"
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
