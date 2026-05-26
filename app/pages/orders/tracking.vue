<script setup>
const orderStore = useOrderStore();

const order_number = ref("ORD-20251118-0001");
const order = ref("");
const loading = ref(false);
const error = ref(null);

// Load order based on order_number
const loadOrder = async () => {
  if (!order_number.value) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await orderStore.tracking(order_number.value);
    order.value = response.data;
  } catch (err) {
    error.value = "Order not found. Please check your order number.";
  } finally {
    loading.value = false;
  }
};

const steps = ref([
  {
    title: "Order Placed",
    description: "We have received your order and it is awaiting confirmation.",
    icon: "i-lucide-shopping-cart",
  },
  {
    title: "Confirmed",
    description: "Your order has been confirmed and is being prepared.",
    icon: "i-lucide-check-circle",
  },
  {
    title: "Processing",
    description: "Our team is packaging your items and preparing for shipment.",
    icon: "i-lucide-sun",
  },
  {
    title: "Shipped",
    description: "Your order is on the way via our courier partner.",
    icon: "i-lucide-truck",
  },
  {
    title: "Out for Delivery",
    description: "The courier is delivering your order to your address.",
    icon: "i-lucide-map-pin",
  },
  {
    title: "Delivered",
    description: "Your order has been delivered successfully.",
    icon: "i-lucide-home",
  },
]);
const orientation = ref("horizontal");

const updateOrientation = () => {
  orientation.value = window.innerWidth < 640 ? "vertical" : "horizontal";
};

onMounted(() => {
  updateOrientation();
  window.addEventListener("resize", updateOrientation);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateOrientation);
});
</script>

<template>
  <Head>
    <Title>
      Order Tracking | Buyzin - Track Your Online Orders in Bangladesh
    </Title>
    <Meta
      name="description"
      content="Track your Buyzin orders in real-time. Enter your order ID to check the shipping status, delivery updates, and estimated arrival. Shop confidently with Buyzin in Bangladesh."
    />
    <Meta
      name="keywords"
      content="Buyzin order tracking, track orders Bangladesh, online shopping shipment status, delivery updates, ecommerce tracking Bangladesh, Buyzin order status"
    />
  </Head>

  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-white rounded-xl px-4 py-8">
      <div class="max-w-sm mx-auto">
        <div class="relative w-full mx-auto">
          <div
            class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
          >
            <IconsIconSearch class="size-5" />
          </div>

          <input
            type="search"
            v-model="order_number"
            @keyup.enter="loadOrder"
            placeholder="Enter your order number..."
            class="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          />

          <button
            @click="loadOrder"
            :disabled="loading"
            class="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white px-5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200"
          >
            {{ loading ? "Checking..." : "Track Order" }}
          </button>
        </div>
      </div>

      <!-- Order Details -->
      <div class="py-8">
        <template v-if="order && Object.keys(order).length">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="col-span-2 block space-y-4">
              <!-- Timeline -->
              <div class="bg-white rounded-xl border border-border">
                <div class="py-2">
                  <h2 class="text-lg font-semibold text-heading border-b p-2">
                    Shipment Timeline
                  </h2>
                  <div class="px-4 py-6">
                    <UStepper
                      :orientation="orientation"
                      disabled
                      :items="steps"
                      v-model="order.current_step"
                      class="w-full"
                    >
                    </UStepper>
                  </div>
                </div>
              </div>

              <!-- Items list -->
              <div class="bg-white rounded-xl border border-border">
                <div class="py-2">
                  <h2 class="text-lg font-semibold text-heading border-b p-2">
                    Items in this order
                  </h2>
                </div>

                <div class="px-4 py-6">
                  <ul class="divide-y">
                    <li
                      v-for="item in order.items"
                      :key="item.id"
                      class="py-2 flex items-center justify-between"
                    >
                      <div class="flex items-start gap-4">
                        <div class="w-14 h-14 bg-gray-100">
                          <NuxtImg :src="item.product?.image_url" />
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-800">
                            {{ item.product?.name }}
                          </div>
                          <div class="text-xs text-gray-500">
                            Quantity: {{ item.quantity }}
                          </div>
                        </div>
                      </div>
                      <div class="text-sm font-semibold text-gray-800">
                        {{ item.currency_symbol
                        }}{{ (item.price * item.quantity).toFixed(2) }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <aside class="space-y-6">
              <div class="bg-gray-100 rounded-xl">
                <div class="py-2">
                  <h3 class="text-md font-semibold text-heading border-b p-2">
                    Order Summary
                  </h3>
                </div>

                <div class="px-4 py-2">
                  <ul class="space-y-2">
                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Order Number:</span>
                      <span class="text-sm">{{ order.order_number }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Order Date: </span>
                      <span class="text-sm">{{
                        new Date(order.created_at).toDateString()
                      }}</span>
                    </li>
                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Payment</span>
                      <span class="text-sm capitalize"
                        >{{ order.payment_method }} •
                        {{ order.payment_status }}</span
                      >
                    </li>
                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Items</span>
                      <span class="text-sm">({{ order.items?.length }})</span>
                    </li>

                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Subtotal</span>
                      <span class="text-sm"
                        >{{ order.currency_symbol
                        }}{{ order.total.toFixed(0) }}</span
                      >
                    </li>

                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Paid</span>
                      <span class="text-sm"
                        >{{ order.currency_symbol
                        }}{{ order.paid_amount.toFixed(0) }}</span
                      >
                    </li>

                    <li class="flex justify-between">
                      <span class="text-sm font-semibold">Total</span>
                      <span class="text-sm font-semibold"
                        >{{ order.currency_symbol
                        }}{{
                          (order.total - order.paid_amount).toFixed(0)
                        }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="order.address" class="bg-gray-100 rounded-xl">
                <div class="py-2">
                  <h3 class="text-md font-semibold text-heading border-b p-2">
                    Delivery Address
                  </h3>
                </div>
                <div class="px-4 py-2">
                  <h4 class="text-sm text-heading font-medium">
                    {{ order.address.name }}
                  </h4>
                  <p class="text-sm">Phone: {{ order.address.phone }}</p>
                  <address class="text-sm mt-2">
                    {{ order.address.address }}
                  </address>
                  <p>{{ order.address?.city }}, {{ order.address?.state }}</p>
                  <p>
                    {{ order.address?.postal_code }},
                    {{ order.address?.country }}
                  </p>
                </div>
              </div>

              <div v-if="order.shipment" class="bg-gray-100 rounded-xl">
                <div class="py-2">
                  <h3 class="text-md font-semibold text-heading border-b p-2">
                    Shipment Details
                  </h3>
                </div>

                <div class="px-4 py-2">
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      src="/courier.png"
                      alt="Courier Logo"
                      loading="lazy"
                      class="bg-white p-2 h-16 w-16 object-contain rounded-full border border-border"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-800">
                        {{ order.shipment?.carrier }}
                      </p>
                      <p class="text-xs text-gray-500">
                        Tracking:
                        <span class="font-medium text-gray-700">
                          {{ order.shipment?.tracking_number }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="py-2">
                    <div class="block">
                      <span class="font-semibold text-gray-800">Cost:</span>
                      {{ order.shipment?.shipping_cost }}
                      {{ order.currency_symbol }}
                    </div>
                    <div class="block">
                      <span class="font-semibold text-gray-800">Weight:</span>
                      {{ order.shipment?.weight }} kg
                    </div>
                    <div class="block">
                      <span class="font-semibold text-gray-800">Package:</span>
                      {{ order.shipment?.package_type }}
                    </div>
                    <div class="block">
                      <span class="font-semibold text-gray-800"
                        >Estimated Delivery:</span
                      >
                      {{
                        new Date(
                          order.shipment?.estimated_delivery_date
                        ).toLocaleDateString()
                      }}
                    </div>
                    <div v-if="order.shipment?.notes" class="block">
                      <span class="font-semibold text-gray-800">Notes:</span>
                      {{ order.shipment.notes }}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>
