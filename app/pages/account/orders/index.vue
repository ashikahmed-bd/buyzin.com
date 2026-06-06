<script setup>
const profileStore = useProfileStore()

const { data: orders, pending } = await useAsyncData('orders', async () => {
  return await profileStore.getOrders()
})

</script>

<template>
  <Dashboard>

    <Head>
      <Title>My Orders | Buyzin</Title>
      <Meta name="description" content="Track and manage your Buyzin orders easily." />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <div class="bg-white p-5">
      <div class="px-6 py-4 border-b border-border mb-3">
        <h2 class="text-lg font-semibold text-gray-800">My Orders</h2>
      </div>

      <div v-if="pending" class="p-6">
        <DataTableSkeleton />
      </div>

      <div v-else-if="!orders?.data?.length" class="p-12 text-center">
        <p class="text-gray-500">No orders found yet.</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="order in orders.data" :key="order.id" class="bg-white rounded-2xl p-5 border py-2.5">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div>
              <p class="text-sm text-gray-500">
                Order
                <span class="font-semibold text-gray-800">
                  #{{ order.order_no }}
                </span>
              </p>

              <p class="text-xs text-gray-400">
                {{ order.timestamps?.placed_at ?? 'N/A' }}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-xs font-medium" :class="{
                'bg-yellow-100 text-yellow-700': order.status === 'pending',
                'bg-blue-100 text-blue-700': order.status === 'processing',
                'bg-indigo-100 text-indigo-700': order.status === 'shipped',
                'bg-green-100 text-green-700': order.status === 'delivered',
                'bg-red-100 text-red-700': order.status === 'cancelled',
                'bg-gray-100 text-gray-700': !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(order.status)
              }">
                {{ order.status }}
              </span>

              <span class="text-lg font-semibold text-gray-800">
                {{ order.total_formatted }}
              </span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

            <div>
              <p class="text-gray-400">Items</p>
              <p class="font-medium text-gray-700">
                {{ order.items?.length ?? 0 }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">Payment Method</p>
              <p class="font-medium text-gray-700 capitalize">
                {{ order.payment_method ?? '-' }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">Payment Status</p>
              <p class="font-medium text-gray-700 capitalize">
                {{ order.payment_status ?? '-' }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">Address</p>

              <p class="font-medium text-gray-700 leading-snug">
                {{
                  [
                    order.contact?.address,
                    order.contact?.city,
                    order.contact?.state,
                    order.contact?.postcode,
                    order.contact?.country
                  ]
                    .filter(Boolean)
                    .join(', ') || '-'
                }}
              </p>
            </div>
          </div>
          <div class="mt-4 flex gap-3 overflow-x-auto pb-1">

            <div v-for="item in order.items" :key="item.id"
              class="min-w-xs flex items-center gap-3 border rounded-lg p-2 bg-white">
              <img :src="item.cover_url" class="w-12 h-12 rounded object-cover" />

              <div class="text-xs">
                <p class="font-medium text-gray-700 line-clamp-1">
                  {{ item.name }}
                </p>
                <p class="text-gray-500">
                  Qty: {{ item.quantity }} • ৳{{ item.price?.sale || 0 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>