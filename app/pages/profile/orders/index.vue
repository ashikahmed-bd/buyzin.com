<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();
const orders = ref(null);
const page = ref(1);

const loadOrders = async () => {
  const response = await profileStore.getOrders(page.value);
  orders.value = response.data;
};

watch(page, () => loadOrders());

onMounted(() => {
  loadOrders();
});
</script>

<template>
  <Head>
    <Title>My Orders | Buyzin - Track Your Online Orders in Bangladesh</Title>
    <Meta
      name="description"
      content="View and track all your Buyzin orders easily. Check order status, shipment details, delivery updates, and past purchase history."
    />
  </Head>
  <ProfileLayout>
    <div class="bg-white rounded-xl">
      <div
        class="px-4 py-3 border-b border-gray-200 flex items-center justify-between"
      >
        <h3 class="text-lg font-semibold text-gray-800">Orders</h3>
      </div>
      <div class="relative overflow-x-auto p-4">
        <template v-if="orders?.data">
          <table class="w-full text-sm text-left text-body">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-2">ID</th>
                <th scope="col" class="px-4 py-2">Subtotal</th>
                <th scope="col" class="px-4 py-2">Total</th>
                <th scope="col" class="px-4 py-2">Status</th>
                <th scope="col" class="px-4 py-2">Method</th>
                <th scope="col" class="px-4 py-2">Payment</th>
                <th scope="col" class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in orders?.data"
                :key="order.order_number"
                class="odd:bg-white even:bg-gray-100"
              >
                <td scope="row" class="px-4 py-2 whitespace-nowrap">
                  #{{ order.order_number }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  {{ order.currency_symbol
                  }}{{ Number(order.subtotal).toFixed(0) }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap">
                  {{ order.currency_symbol
                  }}{{ Number(order.total).toFixed(0) }}
                </td>

                <!-- Status Badge -->
                <td class="px-4 py-2 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold capitalize',
                      {
                        'bg-yellow-100 text-yellow-700':
                          order.status === 'pending',
                        'bg-blue-100 text-blue-700':
                          order.status === 'confirmed',
                        'bg-orange-100 text-orange-700':
                          order.status === 'processing',
                        'bg-sky-100 text-sky-700': order.status === 'shipped',
                        'bg-green-100 text-green-700':
                          order.status === 'delivered',
                        'bg-red-100 text-red-700': order.status === 'cancelled',
                        'bg-gray-300 text-gray-700':
                          order.status === 'returned',
                      },
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>

                <!-- Payment Method Badge -->
                <td class="px-4 py-2 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold capitalize',
                      {
                        'bg-blue-100 text-blue-700':
                          order.payment_method === 'sslcommerz',
                        'bg-green-100 text-green-700':
                          order.payment_method === 'bkash',
                        'bg-orange-100 text-orange-700':
                          order.payment_method === 'nagad',
                        'bg-gray-200 text-gray-700':
                          order.payment_method === 'cod',
                        'bg-sky-100 text-sky-700':
                          order.payment_method === 'manual',
                      },
                    ]"
                  >
                    {{ order.payment_method }}
                  </span>
                </td>

                <!-- Payment Status Badge -->
                <td class="px-4 py-2 whitespace-nowrap">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold capitalize',
                      {
                        'bg-yellow-100 text-yellow-700':
                          order.payment_status === 'unpaid',
                        'bg-green-100 text-green-700':
                          order.payment_status === 'paid',
                        'bg-red-100 text-red-700':
                          order.payment_status === 'failed',
                        'bg-gray-200 text-gray-700':
                          order.payment_status === 'refunded',
                      },
                    ]"
                  >
                    {{ order.payment_status }}
                  </span>
                </td>

                <td class="px-4 py-2 whitespace-nowrap">
                  <NuxtLink
                    :to="`/profile/orders/${order.order_number}`"
                    class="text-primary font-medium hover:underline"
                  >
                    View
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="flex justify-end mt-4" v-if="orders?.meta">
            <UPagination
              v-model:page="page"
              :page-count="orders.meta.last_page"
              :total="orders.meta.total"
            />
          </div>
        </template>

        <!-- Loading Skeleton -->
        <template v-else>
          <DataTableSkeleton />
        </template>
      </div>
    </div>
  </ProfileLayout>
</template>
