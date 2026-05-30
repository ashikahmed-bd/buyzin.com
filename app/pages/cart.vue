<script setup>
const route = useRoute()
const config = useRuntimeConfig();
const cartStore = useCartStore();

const couponCode = ref("");

const { data: cart, pending, refresh } = await useAsyncData("cart", async () => {
  return await cartStore.getItems();
});

const couponApply = async () => {
  if (!couponCode.value) return

  await cartStore.couponApply(couponCode.value)

  await refresh()
}

const goToCheckout = () => {
  if (cartStore?.items?.length) navigateTo("/checkout")
}


useSchemaOrg([
  defineWebPage({
    name: 'Shopping Cart',
    description: 'Review items in your shopping cart, update quantities, apply coupons, and proceed to secure checkout.',
    url: new URL(route.fullPath, config.public.siteUrl).toString(),
    inLanguage: 'en-US',
  }),

  defineBreadcrumb({
    items: [
      {
        name: 'Home',
        item: '/'
      },
      {
        name: 'Cart',
        item: route.fullPath
      }
    ]
  })
])
</script>

<template>

  <main class="container mx-auto px-4 py-4">
    <SeoMeta title="Your Shopping Cart | Buyzin - Review & Checkout Securely"
      description="View and manage the items in your Buyzin shopping cart. Review product details, update quantities, and proceed to secure checkout with fast delivery across Bangladesh."
      keywords="shopping cart, checkout, buy online, ecommerce, Buyzin, Bangladesh, cart items, secure payment, online shopping, fast delivery" />

    <div class="flex flex-wrap justify-between gap-6">
      <div class="bg-white rounded-xl grow">
        <template v-if="cart?.items">
          <div class="bg-white rounded-xl">
            <div class="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 class="text-lg font-semibold text-heading">
                Shopping Cart ({{ cart.items?.length }})
              </h3>
              <button type="button" class="text-sm text-danger hover:text-danger/80" @click="cartStore.clear">
                Clear all
              </button>
            </div>

            <div class="p-4 relative overflow-x-auto">
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 divide-dashed">
                  <li v-for="item in cart.items" :key="item.id" class="flex gap-4 py-4 border-b border-gray-100">
                    <div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden border">
                      <NuxtImg :src="item.cover_url" :alt="item.name" class="w-full h-full object-cover"
                        loading="lazy" />
                    </div>

                    <div class="flex-1 flex flex-col justify-between">
                      <div class="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 class="text-sm font-semibold leading-snug">
                            {{ item.name }}
                          </h3>

                          <p class="text-xs text-gray-500 mt-0.5">
                            SKU: {{ item.sku }}
                          </p>
                        </div>

                        <button class="text-xs text-red-500 hover:text-red-600" @click="cartStore.remove(item.id)">
                          Remove
                        </button>
                      </div>

                      <div v-if="item.variant" class="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span v-for="(value, key) in item.variant.options" :key="key"
                          class="px-2 py-0.5 bg-gray-100 rounded-md">
                          {{ key }}: {{ value }}
                        </span>
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-500">
                          {{ item.unit_price_formatted }} x {{ item.quantity }}
                        </span>

                        <div class="flex items-center border rounded-lg overflow-hidden">
                          <button class="px-2 py-1 hover:bg-gray-100" @click="cartStore.decrease(item.id)">
                            <LazyUIcon name="i-lucide-minus" class="size-4" />
                          </button>

                          <span class="w-8 text-center text-sm">
                            {{ item.quantity }}
                          </span>

                          <button class="px-2 py-1 hover:bg-gray-100" @click="cartStore.increase(item.id)">
                            <LazyUIcon name="i-lucide-plus" class="size-4" />
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
                <span>{{ cart.subtotal_formatted }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ cart.shipping_formatted }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ cart.tax_formatted }}</span>
              </div>
              <div class="flex items-center justify-between ">
                <span>Discount</span>
                <span>{{ cart.discount_formatted }}</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ cart.total }}</span>
              </div>
            </div>

            <div class="flex flex-col items-center gap-4">
              <button :disabled="!cart?.items" @click="goToCheckout"
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
