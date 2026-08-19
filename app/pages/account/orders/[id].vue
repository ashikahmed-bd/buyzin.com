<script setup>
const order = {
  id: "#SH12345678",
  status: "Delivered",
  placedAt: "15 May, 10:30 AM",
  deliveredAt: "18 May 2024 at 01:15 PM",
  seller: "TrendyMart",
  subtotal: "$588.98",
  shipping: "$0.00",
  discount: "-$29.45",
  tax: "$52.91",
  total: "$612.44",
  saved: "$29.45",
};

const orderSteps = [
  {
    title: "Order Placed",
    description: "15 May, 10:30 AM",
    icon: "i-lucide-file-text",
  },
  {
    title: "Confirmed",
    description: "15 May, 10:45 AM",
    icon: "i-lucide-circle-check",
  },
  {
    title: "Shipped",
    description: "16 May, 09:20 AM",
    icon: "i-lucide-package",
  },
  {
    title: "Out for Delivery",
    description: "18 May, 08:30 AM",
    icon: "i-lucide-truck",
  },
  {
    title: "Delivered",
    description: "18 May, 01:15 PM",
    icon: "i-lucide-circle-check",
  },
];

const products = [
  {
    name: "Nike Air Max 270",
    variant: "Men's Shoes",
    details: "Size: 42 | Color: White",
    price: "$129.99",
    quantity: 1,
    image: "/images/products/nike-air-max.jpg",
  },
  {
    name: "Herschel Classic Backpack",
    variant: "",
    details: "Color: Black",
    price: "$59.99",
    quantity: 1,
    image: "/images/products/herschel-backpack.jpg",
  },
  {
    name: "Apple Watch Series 9 GPS",
    variant: "41mm, Midnight Aluminum Case",
    details: "Strap: Midnight Sport Band",
    price: "$399.00",
    quantity: 1,
    image: "/images/products/apple-watch.jpg",
  },
];

const trackingSteps = [
  {
    title: "Order Placed",
    description: "15 May, 10:30 AM",
  },
  {
    title: "Confirmed",
    description: "15 May, 10:45 AM",
  },
  {
    title: "Shipped",
    description: "16 May, 09:20 AM",
  },
  {
    title: "Out for Delivery",
    description: "18 May, 08:30 AM",
  },
  {
    title: "Delivered",
    description: "18 May, 01:15 PM",
  },
];

const helpLinks = [
  {
    title: "Help Center",
    icon: "i-lucide-circle-help",
  },
  {
    title: "Return & Refund",
    icon: "i-lucide-rotate-ccw",
  },
  {
    title: "Chat with Support",
    icon: "i-lucide-message-circle",
  },
];

const actionLinks = [
  {
    title: "Return Items",
    icon: "i-lucide-rotate-ccw",
  },
  {
    title: "Download Invoice",
    icon: "i-lucide-download",
  },
  {
    title: "Buy Again",
    icon: "i-lucide-shopping-bag",
  },
];
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Order Details | Buyzin</Title>
      <Meta
        name="description"
        content="Track and manage your Buyzin order easily."
      />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <div class="rounded-2xl bg-white px-4">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'My Orders', to: '/account/orders' },
          { label: 'Order Details' },
        ]"
        class="py-4 text-sm"
      />

      <div
        class="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div class="flex flex-wrap items-center gap-3">
            <h1 class="text-xl font-bold text-slate-900">
              Order {{ order.id }}
            </h1>

            <UBadge color="success" variant="subtle" size="sm">
              {{ order.status }}
            </UBadge>
          </div>

          <p class="mt-1.5 text-sm text-slate-500">
            Placed on {{ order.placedAt }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <UButton
            color="primary"
            variant="outline"
            size="sm"
            icon="i-lucide-download"
          >
            Invoice
          </UButton>

          <UButton
            color="primary"
            variant="outline"
            size="sm"
            icon="i-lucide-rotate-ccw"
          >
            Order Again
          </UButton>
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-5 pb-6 xl:grid-cols-[minmax(0,1fr)_250px]"
      >
        <div class="min-w-0 space-y-4">
          <section class="rounded-xl border border-border bg-white p-4">
            <div class="mb-5">
              <h2 class="text-base font-semibold text-slate-900">
                Order Status
              </h2>

              <p class="mt-1 text-sm text-slate-500">
                Follow the progress of your order.
              </p>
            </div>

            <UStepper
              :items="orderSteps"
              orientation="horizontal"
              :default-value="5"
              class="w-full"
            />

            <div
              class="mt-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
              >
                <UIcon name="i-lucide-package-check" class="size-5" />
              </div>

              <div>
                <p class="text-sm font-semibold text-slate-800">
                  Your order has been delivered
                </p>

                <p class="mt-1 text-sm text-slate-500">
                  Delivered on {{ order.deliveredAt }}
                </p>
              </div>
            </div>
          </section>

          <!-- Order Items -->
          <section
            class="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div
              class="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 class="text-base font-semibold text-slate-900">
                Order Items
              </h2>

              <p class="text-sm text-slate-500">
                Sold by:
                <span class="font-medium text-primary">
                  {{ order.seller }}
                </span>
              </p>
            </div>

            <div
              v-for="product in products"
              :key="product.name"
              class="grid grid-cols-1 gap-4 border-b border-slate-100 p-5 last:border-0 sm:grid-cols-[72px_minmax(0,1fr)_100px_100px_110px] sm:items-center"
            >
              <!-- Image -->
              <div
                class="flex size-16 items-center justify-center overflow-hidden rounded-lg bg-slate-50"
              >
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="size-full object-contain"
                />
              </div>

              <!-- Info -->
              <div class="min-w-0">
                <h3 class="font-medium text-slate-900">
                  {{ product.name }}
                </h3>

                <p v-if="product.variant" class="mt-1 text-sm text-slate-600">
                  {{ product.variant }}
                </p>

                <p class="mt-1 text-sm text-slate-400">
                  {{ product.details }}
                </p>
              </div>

              <!-- Price -->
              <div class="sm:text-right">
                <p class="font-semibold text-slate-900">
                  {{ product.price }}
                </p>

                <p class="mt-1 text-sm text-slate-400">
                  Qty: {{ product.quantity }}
                </p>
              </div>

              <!-- Total -->
              <div class="sm:text-right">
                <p class="font-semibold text-slate-900">
                  {{ product.price }}
                </p>
              </div>

              <!-- Review -->
              <div class="sm:text-right">
                <UButton color="primary" variant="outline" size="xs">
                  Write Review
                </UButton>
              </div>
            </div>
          </section>

          <!-- Tracking -->
          <section class="rounded-xl border border-slate-200 bg-white p-5">
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-truck" class="size-5" />
                </div>

                <div>
                  <h2 class="text-base font-semibold text-slate-900">
                    Order Tracking
                  </h2>

                  <p class="mt-1 text-sm text-slate-500">
                    Tracking ID:
                    <span class="font-medium text-primary">
                      TRK1234567890
                    </span>
                  </p>
                </div>
              </div>

              <UButton
                color="primary"
                variant="ghost"
                size="sm"
                icon="i-lucide-copy"
              >
                Copy ID
              </UButton>
            </div>

            <div class="mt-6">
              <UStepper
                :items="trackingSteps"
                orientation="horizontal"
                :default-value="5"
                class="w-full"
              />
            </div>
          </section>
        </div>

        <!-- Right -->
        <aside class="space-y-5">
          <!-- Summary -->
          <section class="rounded-xl border border-slate-200 bg-white p-5">
            <h2 class="text-base font-semibold text-slate-900">
              Order Summary
            </h2>

            <div class="mt-5 space-y-3 text-sm">
              <div class="flex justify-between gap-4 text-slate-500">
                <span>Subtotal (3 items)</span>
                <span class="font-medium text-slate-700">
                  {{ order.subtotal }}
                </span>
              </div>

              <div class="flex justify-between gap-4 text-slate-500">
                <span>Shipping Fee</span>
                <span class="font-medium text-slate-700">
                  {{ order.shipping }}
                </span>
              </div>

              <div class="flex justify-between gap-4 text-slate-500">
                <span>Discount</span>
                <span class="font-medium text-emerald-600">
                  {{ order.discount }}
                </span>
              </div>

              <div class="flex justify-between gap-4 text-slate-500">
                <span>Tax</span>
                <span class="font-medium text-slate-700">
                  {{ order.tax }}
                </span>
              </div>

              <div class="my-4 border-t border-slate-100" />

              <div class="flex items-center justify-between">
                <span class="font-semibold text-slate-900"> Total Paid </span>

                <span class="text-lg font-bold text-slate-900">
                  {{ order.total }}
                </span>
              </div>

              <div
                class="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-600"
              >
                <UIcon name="i-lucide-badge-check" class="size-4" />
                You saved {{ order.saved }} on this order
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-slate-200 bg-white p-5">
            <h2 class="text-base font-semibold text-slate-900">Need Help?</h2>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              View our help center or contact us for any queries regarding your
              order.
            </p>

            <div class="mt-4 divide-y divide-slate-100">
              <NuxtLink
                v-for="item in helpLinks"
                :key="item.title"
                to="#"
                class="flex items-center justify-between py-3 text-sm text-primary transition hover:text-primary/80"
              >
                <span class="flex items-center gap-3">
                  <UIcon :name="item.icon" class="size-4 text-slate-500" />
                  {{ item.title }}
                </span>

                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-4 text-slate-400"
                />
              </NuxtLink>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </Dashboard>
</template>
