<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()

const couponCode = ref("")

const { data: cart, pending, refresh } = await useAsyncData(
  'cart',
  () => cartStore.getItems(),
  {
    server: false
  }
)

const couponApply = async () => {
  if (!couponCode.value) return

  await cartStore.couponApply(couponCode.value)
  await refresh()
}

const goToCheckout = () => {
  if (cart.value?.items?.length) {
    navigateTo("/checkout")
  }
}
</script>

<template>
  <main class="container mx-auto px-4 py-4">

    <Head>
      <Title>Your Shopping Cart | Buyzin</Title>
      <Meta name="description" content="Review your shopping cart, update items, and proceed to secure checkout." />
      <Meta name="robots" content="noindex, follow" />
      <Meta name="referrer" content="no-referrer-when-downgrade" />
    </Head>

    <div class="flex flex-wrap justify-between gap-6">
      <div class="bg-white rounded-xl grow">
        <template v-if="pending">
          <div class="space-y-4 animate-pulse p-4">

            <div v-for="i in 2" :key="i" class="flex gap-4 py-4 border-b border-gray-100">

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

          <div class="px-4 py-3 border-b flex justify-between items-center">
            <h3 class="text-lg font-semibold">
              Shopping Cart ({{ cart.items.length }})
            </h3>

            <button class="text-sm text-red-500" @click="cartStore.clear">
              Clear all
            </button>
          </div>

          <div class="p-4">
            <ul class="divide-y divide-gray-100">
              <li v-for="item in cart.items" :key="item.id" class="flex gap-4 py-4">
                <div class="w-20 h-20 shrink-0 rounded-lg overflow-hidden border">
                  <NuxtImg :src="item.cover_url" :alt="item.name" class="w-full h-full object-cover" />
                </div>

                <div class="flex-1 flex flex-col justify-between">
                  <div class="flex justify-between">
                    <div>
                      <h3 class="text-sm font-semibold">
                        {{ item.name }}
                      </h3>
                      <p class="text-xs text-gray-500">
                        SKU: {{ item.sku }}
                      </p>
                    </div>

                    <button class="text-xs text-red-500" @click="cartStore.remove(item.id)">
                      Remove
                    </button>
                  </div>

                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-gray-500 flex gap-1 items-center">
                      <del v-if="item.base_price > item.price">
                        {{ item.base_price_formatted }}
                      </del>

                      <span>{{ item.price_formatted }}</span>

                      <span>× {{ item.quantity }}</span>
                    </span>

                    <div class="flex border rounded overflow-hidden">
                      <button class="px-2" @click="cartStore.decrease(item.id)">
                        -
                      </button>

                      <span class="w-8 text-center text-sm">
                        {{ item.quantity }}
                      </span>

                      <button class="px-2" @click="cartStore.increase(item.id)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-else>
          <EmptyCart />
        </template>
      </div>

      <div class="w-full max-w-sm">

        <div class="bg-white rounded-xl">

          <div class="px-4 py-3 border-b">
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
                <input v-model="couponCode" type="text" placeholder="Coupon Code"
                  class="border px-3 py-2 text-sm rounded-l w-full focus:outline-none" />

                <button @click="couponApply" class="bg-primary text-white px-4 text-sm rounded-r">
                  Apply
                </button>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ cart?.subtotal_formatted }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span>{{ cart?.shipping_formatted }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Tax</span>
                  <span>{{ cart?.tax_formatted }}</span>
                </div>

                <div class="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>{{ cart?.discount_formatted }}</span>
                </div>

                <div class="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{{ cart?.total_formatted }}</span>
                </div>
              </div>


              <button class="w-full bg-primary text-white py-2 rounded" :disabled="!cart?.items?.length"
                @click="goToCheckout">
                Proceed to Checkout
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>