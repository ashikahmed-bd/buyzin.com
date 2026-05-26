<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const profileStore = useProfileStore();
const route = useRoute();
const order = ref(null);

const loadOrder = async () => {
  const response = await profileStore.getOrder(route.params.order_number);
  order.value = response.data;
};

onMounted(() => {
  loadOrder();
});
</script>

<template>
  <UBreadcrumb
    :items="[
      { label: 'Home', to: '/' },
      { label: 'My Account', to: '/profile' },
      { label: 'Orders', to: '/profile/orders' },
      { label: order?.order_number },
    ]"
    class="container mx-auto p-2.5"
  />

  <Head>
    <Title>Order Details | Buyzin</Title>
    <Meta
      name="description"
      content="View detailed information about your Buyzin order. Check order items, status, payment method, shipping address, and total amount."
    />
  </Head>

  <ProfileLayout>
    <template v-if="order === null">
      <div class="space-y-6 animate-pulse">
        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="h-32 bg-gray-200 rounded"></div>
            <div class="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="space-y-2">
            <div class="h-16 bg-gray-200 rounded"></div>
            <div class="h-16 bg-gray-200 rounded"></div>
            <div class="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="space-y-6">
        <!-- Order Summary -->
        <div class="bg-white rounded-xl">
          <div class="px-4 py-3 border-b border-border">
            <div class="border-b border-gray-200 pb-3 mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                Order #: {{ order?.order_number }}
              </h3>
              <p class="text-sm text-gray-500">
                Placed on: {{ order?.created_at }}
              </p>
            </div>
            <div class="flex flex-wrap gap-4 text-sm">
              <div class="space-x-2">
                <span class="font-medium">Status:</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white text-xs capitalize',
                    {
                      'bg-yellow-500': order?.status === 'pending',
                      'bg-indigo-500': order?.status === 'confirmed',
                      'bg-blue-500': order?.status === 'processing',
                      'bg-purple-500': order?.status === 'shipped',
                      'bg-green-500': order?.status === 'delivered',
                      'bg-red-500': order?.status === 'cancelled',
                      'bg-pink-500': order?.status === 'returned',
                    },
                  ]"
                >
                  {{ order?.status }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="font-medium text-gray-700">Payment:</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-white text-xs capitalize',
                    {
                      'bg-yellow-500': order?.payment_status === 'pending',
                      'bg-green-500': order?.payment_status === 'completed',
                      'bg-red-500': order?.payment_status === 'failed',
                      'bg-purple-500': order?.payment_status === 'refunded',
                      'bg-gray-500': order?.payment_status === 'cancelled',
                    },
                  ]"
                >
                  {{ order?.payment_status }}
                </span>
              </div>

              <div class="space-x-2">
                <span class="font-medium text-gray-700">Method:</span>
                <span
                  class="px-2 py-1 rounded-full bg-primary text-white text-xs capitalize"
                >
                  {{ order?.payment_method }}
                </span>
              </div>
            </div>
          </div>
          <!-- Shipping & Billing -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="bg-white p-4">
              <div class="flex items-center gap-2 border-b pb-2 mb-3">
                <IconsIconTruck class="size-5 text-gray-600" />
                <h4 class="font-semibold text-gray-800">Shipping Address</h4>
              </div>

              <div v-if="order?.address" class="space-y-2">
                <p class="font-medium text-body">
                  {{ order.address.name }}
                </p>
                <p class="text-body">{{ order.address.phone }}</p>
                <address class="text-body text-sm">
                  {{ order.address.address }}
                </address>
                <p>
                  {{ order.address.city }}, {{ order.address.state }},
                  {{ order.address.postal_code }}
                </p>
                <p>{{ order.address.country }}</p>
              </div>
            </div>

            <div class="bg-white p-4">
              <div class="flex items-center gap-2 border-b pb-2 mb-3">
                <IconsIconList class="size-5 text-body" />
                <h4 class="font-semibold text-body">Order Items</h4>
              </div>

              <div v-if="order?.items" class="space-y-4">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex items-center gap-3 border-b border-gray-100 pb-2"
                >
                  <NuxtImg
                    :src="item.product.cover_url"
                    :alt="item.product.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div class="flex-1">
                    <h5
                      class="text-sm font-semibold text-gray-800 line-clamp-1"
                    >
                      {{ item.product.name }}
                    </h5>
                    <div class="flex items-center gap-2 text-sm text-gray-600">
                      <span
                        >{{ item.price.toFixed(0) }} x {{ item.quantity }}</span
                      >
                      <span class="font-medium"
                        >{{ item.currency_symbol
                        }}{{ item.total.toFixed(0) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carrier Tracking -->
        <div v-if="order?.carrier" class="bg-white rounded-xl p-4">
          <div class="flex items-center gap-2 border-b pb-2 mb-3">
            <IconsIconTruck class="size-5 text-gray-600" />
            <h4 class="font-semibold text-gray-800">Carrier Tracking</h4>
          </div>

          <div class="space-y-2 text-sm text-gray-700">
            <p>
              <span class="font-medium">Carrier:</span>
              {{ order.carrier.carrier }}
            </p>
            <p>
              <span class="font-medium">Tracking Number:</span>
              {{ order.carrier.tracking_number }}
            </p>
            <p>
              <span class="font-medium">Shipping Cost:</span>
              {{ order.carrier.shipping_cost }}
            </p>
            <p>
              <span class="font-medium">Weight:</span>
              {{ order.carrier.weight }} kg
            </p>
            <p>
              <span class="font-medium">Package Type:</span>
              {{ order.carrier.package_type }}
            </p>
            <p>
              <span class="font-medium">Estimated Delivery:</span>
              {{ order.carrier.estimated_delivery_date }}
            </p>
            <p>
              <span class="font-medium">Notes:</span> {{ order.carrier.notes }}
            </p>
            <div class="space-x-2">
              <span class="font-medium">Status:</span>

              <span class="bg-primary text-white rounded px-2 py-0.5">
                {{ order.carrier.status }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </ProfileLayout>
</template>

<style scoped></style>
