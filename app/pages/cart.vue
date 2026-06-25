<script setup>
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

const increase = async (item) => {
  await cartStore.increase(item)
  await refresh()
}

const decrease = async (item) => {
  await cartStore.decrease(item)
  await refresh()
}

const remove = async (item) => {
  await cartStore.remove(item)
  await refresh()
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

          <div class="px-4 py-3 border-b border-dashed flex justify-between items-center">
            <h3 class="text-lg font-semibold">
              Shopping Cart ({{ cart.items.length }})
            </h3>

            <button class="text-sm text-red-500" @click="cartStore.clear">
              Clear all
            </button>
          </div>

          <div class="p-4">
            <ul class="divide-y divide-gray-100">
              <li v-for="item in cart.items" :key="item.id"
                class="group flex gap-4 rounded-2xl border border-border bg-white p-4 transitiond">
                <NuxtLink :to="`/products/${item.slug}`"
                  class="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <NuxtImg :src="item.cover_url" :alt="item.name"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                </NuxtLink>

                <div class="flex min-w-0 flex-1 flex-col">
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <NuxtLink :to="`/products/${item.slug}`"
                        class="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-primary">
                        {{ item.name }}
                      </NuxtLink>

                      <p v-if="item.sku" class="mt-1 text-xs text-gray-500">
                        SKU: {{ item.sku }}
                      </p>
                    </div>

                    <button class="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      @click="remove(item)">
                      <UIcon name="i-lucide-trash-2" class="h-4 w-4" />
                    </button>
                  </div>

                  <div class="mt-auto flex items-end justify-between pt-4">
                    <div class="block">
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-bold text-gray-900">
                          {{ item.price_formatted }}
                        </span>
                        <del v-if="item.base_price > item.price" class="text-sm text-gray-400">
                          {{ item.base_price_formatted }}
                        </del>
                      </div>
                    </div>

                    <div class="flex items-center overflow-hidden rounded-xl border border-gray-200">
                      <button class="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                        :disabled="loading" @click="decrease(item)">
                        <UIcon name="i-lucide-minus" class="size-4" />
                      </button>

                      <span class="flex h-10 min-w-12 items-center justify-center border-x text-sm font-semibold">
                        {{ item.quantity }}
                      </span>

                      <button class="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                        :disabled="cartStore.loading" @click="increase(item)">
                        <UIcon name="i-lucide-plus" class="size-4" />
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