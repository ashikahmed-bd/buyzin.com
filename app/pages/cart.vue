<script setup>
const cartStore = useCartStore();
const couponStore = useCouponStore();

const coupon = reactive({
  code: "",
});

const {
  data: cart,
  pending,
  refresh,
} = await useAsyncData("cart", () => {
  return cartStore.getItems();
});

const couponApply = async () => {
  if (!coupon.code) return;

  await couponStore.apply(coupon.code);
  await refresh();
};

const goToCheckout = () => {
  if (cart.value?.items?.length) {
    navigateTo("/checkout");
  }
};

const increase = async (item) => {
  await cartStore.increase(item);
  await refresh();
};

const decrease = async (item) => {
  await cartStore.decrease(item);
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
        <template v-if="pending">
          <div class="space-y-4 animate-pulse p-4">
            <div
              v-for="i in 2"
              :key="i"
              class="flex gap-4 py-4 border-b border-gray-100"
            >
              <div class="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>

              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
                <div class="h-2 bg-gray-200 rounded w-1/3"></div>

                <div class="flex justify-between mt-3">
                  <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="cart?.items?.length">
          <div
            class="px-4 py-3 border-b border-dashed flex justify-between items-center"
          >
            <h3 class="text-lg font-semibold">
              Shopping Cart ({{ cart.items.length }})
            </h3>

            <button
              class="text-sm text-danger"
              :disabled="cartStore.loading"
              @click="clear()"
            >
              <span> Clear all </span>
            </button>
          </div>

          <div class="p-4">
            <div class="divide-y divide-border">
              <article
                v-for="item in cart.items"
                :key="item.id"
                class="group flex gap-3 rounded border border-border bg-white p-3 transition sm:gap-4 sm:p-4"
              >
                <NuxtLink
                  :to="`/product/${item.slug}/${item.id}`"
                  class="relative size-20 shrink-0 overflow-hidden rounded sm:size-24"
                >
                  <NuxtImg
                    :src="item.cover_url"
                    :alt="item.name"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </NuxtLink>

                <div class="flex min-w-0 flex-1 flex-col gap-2">
                  <div class="flex min-w-0 items-start justify-between gap-2">
                    <div class="min-w-0 flex-1">
                      <NuxtLink
                        :to="`/product/${item.slug}/${item.id}`"
                        class="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 hover:text-primary sm:text-base"
                      >
                        {{ item.name }}
                      </NuxtLink>

                      <p
                        v-if="item.sku"
                        class="mt-1 truncate text-xs text-gray-500"
                      >
                        SKU: {{ item.sku }}
                      </p>
                    </div>

                    <button
                      type="button"
                      @click="remove(item)"
                      :disabled="cartStore.loading"
                      class="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:p-2"
                    >
                      <UIcon
                        v-if="cartStore.loading && cartStore.item === item.id"
                        name="i-lucide-loader"
                        class="size-4 animate-spin"
                      />

                      <UIcon v-else name="i-lucide-trash-2" class="size-4" />
                    </button>
                  </div>

                  <div class="mt-auto flex items-center justify-between gap-2">
                    <div class="flex min-w-0 items-center gap-2">
                      <span
                        class="truncate text-base font-bold text-gray-900 sm:text-lg"
                      >
                        {{ $currency(item.price) }}
                      </span>

                      <del
                        v-if="item.base_price > item.price"
                        class="shrink-0 text-xs text-gray-400 sm:text-sm"
                      >
                        {{ $currency(item.base_price) }}
                      </del>
                    </div>

                    <div
                      class="flex shrink-0 items-center overflow-hidden rounded-full border border-border px-2 py-1"
                    >
                      <button
                        type="button"
                        class="flex size-6 items-center justify-center text-danger transition disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="cartStore.loading || item.quantity <= 1"
                        @click="decrease(item)"
                      >
                        <UIcon
                          v-if="
                            cartStore.loading && cartStore.item?.id === item.id
                          "
                          name="i-lucide-loader"
                          class="size-4 animate-spin"
                        />

                        <UIcon v-else name="i-lucide-minus" class="size-4" />
                      </button>

                      <span
                        class="flex min-w-9 items-center justify-center px-1 text-sm font-semibold"
                      >
                        {{ item.quantity }}
                      </span>

                      <button
                        type="button"
                        class="flex size-6 items-center justify-center text-success transition disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="cartStore.loading"
                        @click="increase(item)"
                      >
                        <UIcon
                          v-if="
                            cartStore.loading && cartStore.item?.id === item.id
                          "
                          name="i-lucide-loader"
                          class="size-4 animate-spin"
                        />

                        <UIcon v-else name="i-lucide-plus" class="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </template>

        <template v-else>
          <EmptyCart />
        </template>
      </div>

      <div class="w-full max-w-sm">
        <div class="bg-white rounded-xl">
          <div class="px-4 py-3 border-b border-dashed">
            <h3 class="text-lg font-semibold">Cart Summary</h3>
          </div>

          <template v-if="pending">
            <div class="p-4 space-y-4 animate-pulse">
              <div class="h-4 bg-gray-200 w-1/2 rounded"></div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <div class="h-3 bg-gray-200 w-1/4 rounded"></div>
                  <div class="h-3 bg-gray-200 w-1/4 rounded"></div>
                </div>

                <div class="flex justify-between">
                  <div class="h-3 bg-gray-200 w-1/3 rounded"></div>
                  <div class="h-3 bg-gray-200 w-1/4 rounded"></div>
                </div>

                <div class="flex justify-between">
                  <div class="h-3 bg-gray-200 w-1/5 rounded"></div>
                  <div class="h-3 bg-gray-200 w-1/4 rounded"></div>
                </div>
              </div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
          </template>

          <template v-else>
            <div class="p-4 space-y-4">
              <div class="flex">
                <input
                  v-model="coupon.code"
                  type="text"
                  placeholder="Coupon Code"
                  class="border px-3 py-2 text-sm rounded-l w-full focus:outline-none"
                />

                <button
                  type="button"
                  @click="couponApply"
                  :disabled="couponStore.loading"
                  class="bg-primary text-white flex items-center gap-2.5 px-4 text-sm rounded-r"
                >
                  <UIcon
                    v-if="couponStore.loading"
                    name="i-lucide-loader"
                    class="size-5 animate-spin"
                  />
                  <span>{{ couponStore.loading ? "Applying" : "Apply" }}</span>
                </button>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ $currency(cart?.subtotal) }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span>{{ $currency(cart?.shipping) }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Tax</span>
                  <span>{{ $currency(cart?.tax) }}</span>
                </div>

                <div class="flex justify-between text-danger">
                  <span>Discount</span>
                  <span> - {{ $currency(cart?.discount) }}</span>
                </div>
                <div
                  v-if="cart?.gift_card > 0"
                  class="flex items-center justify-between text-success"
                >
                  <span> Gift Card </span>
                  <span> - {{ $currency(cart?.gift_card) }} </span>
                </div>
                <div class="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{{ $currency(cart?.total) }}</span>
                </div>
              </div>

              <button
                class="w-full bg-primary text-white py-2 rounded"
                :disabled="!cart?.items?.length"
                @click="goToCheckout"
              >
                Proceed to Checkout
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
