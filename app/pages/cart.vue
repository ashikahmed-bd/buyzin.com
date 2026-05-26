<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const { items } = storeToRefs(cartStore);

const couponCode = ref("");

const couponApply = async () => {
  if (!couponCode.value) return;
  await cartStore.couponApply(couponCode.value);
};

const goToCheckout = () => {
  if (cartStore?.items?.length) navigateTo("/checkout");
};

useSchemaOrg([
  defineWebPage({
    "@type": "CheckoutPage",
    name: "Your Shopping Cart",
    description: "Review and edit your shopping cart items before checkout.",
  }),
]);
</script>

<template>
  <SeoMeta title="Your Shopping Cart | Buyzin - Review & Checkout Securely"
    description="View and manage the items in your Buyzin shopping cart. Review product details, update quantities, and proceed to secure checkout with fast delivery across Bangladesh."
    keywords="shopping cart, checkout, buy online, ecommerce, Buyzin, Bangladesh, cart items, secure payment, online shopping, fast delivery" />
  <main class="container mx-auto px-4 py-4">
    <div class="flex flex-wrap justify-between gap-6">

      <div class="bg-white rounded-xl grow">
        <template v-if="items.length">
          <div class="bg-white rounded-xl">
            <div class="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 class="text-lg font-semibold text-heading">
                Shopping Cart ({{ items.length }})
              </h3>
              <button type="button" class="text-sm text-danger hover:text-danger/80" @click="cartStore.clear">
                Clear all
              </button>
            </div>

            <div class="p-4 relative overflow-x-auto">
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 divide-dashed">
                  <li v-for="item in items" :key="item.id" class="flex items-center py-4">
                    <div class="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <NuxtImg :src="item.cover_url" :alt="item.name" loading="lazy" class="size-full object-cover" />
                    </div>

                    <!-- Product info -->
                    <div class="ml-4 grow space-y-1">
                      <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold">
                          {{ item.name }}
                        </h3>
                        <button type="button" class="text-danger hover:text-danger/70 transition"
                          @click="cartStore.remove(item.id)">
                          Remove
                        </button>
                      </div>

                      <div class="flex flex-wrap text-sm text-gray-600 gap-2">
                        <template v-if="item.options">
                          <div
                            v-for="(value, key) in typeof item.options === 'string' ? JSON.parse(item.options) : item.options"
                            :key="key"
                            class="flex items-center gap-1 capitalize after:content-['•'] after:mx-1 last:after:content-none">
                            <span class="font-medium">{{ key }}:</span>
                            <span>{{ value }}</span>
                          </div>
                        </template>
                      </div>

                      <!-- Price & Quantity -->
                      <div class="flex items-center justify-between mt-1">
                        <div>
                          <span class="text-base font-semibold text-body">
                            {{ $currency(item.price) }}</span>
                        </div>

                        <div class="flex items-center">
                          <button type="button" class="bg-red-100 p-1 rounded-full text-red-500"
                            aria-label="Decrease quantity" @click="cartStore.decrease(item.id)">
                            <IconsIconMinus class="size-4" />
                          </button>
                          <span class="w-8 text-center">{{
                            item.quantity
                          }}</span>
                          <button type="button" class="bg-green-100 p-1 rounded-full text-green-500"
                            aria-label="Increase quantity" @click="cartStore.increase(item.id)">
                            <IconsIconPlus class="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <EmptyCart />
        </template>
      </div>

      <div class="flex-none max-w-full">
        <div class="bg-white rounded-xl">
          <div class="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 class="text-lg font-semibold text-heading">Cart Summary</h3>
          </div>

          <div class="p-4 space-y-4 border-b border-dashed">
            <div class="border-b border-dashed border-gray-300 pb-4">
              <label class="text-sm font-medium mb-1 flex justify-between items-center"><span>Coupon Code</span></label>
              <div class="flex">
                <input v-model="couponCode" type="text" placeholder="Enter Coupon Code"
                  class="grow border border-border focus:outline-none rounded-l-md px-3 py-2 text-sm" />
                <button @click.prevent="couponApply" :disabled="!couponCode"
                  class="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/70 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  Apply
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ $currency(cartStore.subtotal) }}</span>
              </div>
              <div class="flex items-center justify-between ">
                <p class="text-gray-700 font-medium">
                  Discount
                  <span v-if="cartStore.coupon" class="text-gray-500 text-sm">
                    ({{ cartStore.coupon.type === 'percent'
                      ? cartStore.coupon.discount + '%'
                      : $currency(cartStore.coupon.discount) }})
                  </span>
                </p>
                <p class="text-gray-700 font-medium ml-auto text-right">
                  {{ $currency(cartStore.discount) }}
                </p>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ $currency(cartStore.shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ $currency(cartStore.tax) }}</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ $currency(cartStore.total) }}</span>
              </div>
            </div>

            <div class="flex flex-col items-center gap-4">
              <button :disabled="!items?.length" @click="goToCheckout"
                class="w-full px-4 py-2.5 text-sm text-center font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none transition whitespace-nowrap disabled:opacity-50">
                Proceed to Checkout
              </button>

              <div class="text-center text-sm">
                <p>
                  or
                  <NuxtLink to="/shop" class="font-medium text-primary hover:opacity-90">
                    Continue Shopping
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-4 mt-3">
            <div class="text-lg font-semibold mb-2">Payment methods</div>
            <div class="flex flex-wrap items-center justify-start gap-4 py-4">
              <img src="/visa.png" class="h-8 w-auto" />
              <img src="/mastercard.png" class="h-8 w-auto" />
              <img src="/bKash.png" class="h-8 w-auto" />
              <img src="/nagad.png" class="h-8 w-auto" />
              <img src="/upay.png" class="h-8 w-auto" />
            </div>

            <div class="flex items-center gap-2 py-2">
              <UIcon name="i-lucide-shield-check" class="size-5" />
              <h3 class="text-base font-semibold">Buyer Protection</h3>
            </div>

            <p class="text-sm text-gray-600">
              Get full refund if the item is not as described or not delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
