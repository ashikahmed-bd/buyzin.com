<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const stats = [
  {
    title: "Total Orders",
    value: "24",
    icon: "i-lucide-shopping-bag",
    iconClass: "bg-violet-100 text-violet-600",
    link: "View all orders",
    to: "/account/orders",
  },
  {
    title: "Delivered Orders",
    value: "18",
    icon: "i-lucide-package-check",
    iconClass: "bg-green-100 text-green-600",
    link: "View details",
    to: "/account/orders?status=delivered",
  },
  {
    title: "Pending Orders",
    value: "3",
    icon: "i-lucide-clock-3",
    iconClass: "bg-orange-100 text-orange-600",
    link: "Track your orders",
    to: "/account/orders?status=pending",
  },
  {
    title: "Total Spent",
    value: "$1,245.60",
    icon: "i-lucide-wallet-cards",
    iconClass: "bg-sky-100 text-sky-600",
    link: "View spending",
    to: "/account/orders",
  },
];

const orders = [
  {
    id: "#ORD12345",
    name: "Wireless Headphones",
    price: "$59.99",
    date: "16 May 2025",
    status: "Delivered",
    statusClass: "bg-green-50 text-green-600",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "#ORD12344",
    name: "Men's Sneakers",
    price: "$49.99",
    date: "10 May 2025",
    status: "Delivered",
    statusClass: "bg-green-50 text-green-600",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "#ORD12343",
    name: "Travel Backpack",
    price: "$39.99",
    date: "08 May 2025",
    status: "Shipped",
    statusClass: "bg-indigo-50 text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "#ORD12342",
    name: "Smart Watch",
    price: "$89.99",
    date: "02 May 2025",
    status: "Delivered",
    statusClass: "bg-green-50 text-green-600",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "#ORD12341",
    name: "Cotton T-Shirt",
    price: "$19.99",
    date: "01 May 2025",
    status: "Processing",
    statusClass: "bg-orange-50 text-orange-600",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=100&q=80",
  },
];

const orderStatuses = [
  {
    name: "Delivered",
    count: 18,
    percentage: "75%",
    color: "bg-green-500",
  },
  {
    name: "Shipped",
    count: 2,
    percentage: "8%",
    color: "bg-indigo-500",
  },
  {
    name: "Processing",
    count: 3,
    percentage: "12%",
    color: "bg-orange-400",
  },
  {
    name: "Cancelled",
    count: 1,
    percentage: "5%",
    color: "bg-red-500",
  },
];

const quickActions = [
  {
    title: "My Orders",
    description: "View & track",
    icon: "i-lucide-shopping-bag",
    iconClass: "bg-violet-50 text-violet-600",
    to: "/account/orders",
  },
  {
    title: "Return & Refund",
    description: "Request return",
    icon: "i-lucide-rotate-ccw",
    iconClass: "bg-green-50 text-green-600",
    to: "/account/returns",
  },
  {
    title: "Address Book",
    description: "Manage addresses",
    icon: "i-lucide-map-pin",
    iconClass: "bg-orange-50 text-orange-600",
    to: "/account/addresses",
  },
  {
    title: "Payment Methods",
    description: "Manage cards",
    icon: "i-lucide-credit-card",
    iconClass: "bg-blue-50 text-blue-600",
    to: "/account/payment-methods",
  },
];

const products = [
  {
    name: "Wireless Headphones",
    price: "$59.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Men's Sneakers",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Travel Backpack",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Smart Watch",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
  },
];
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Dashboard | Buyzin.com</Title>

      <Meta
        name="description"
        content="Manage your Buyzin.com account, track orders, view order history, update profile information, and manage your preferences from your customer dashboard."
      />

      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <div class="w-full">
      <div
        class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 class="text-xl font-bold text-title">Welcome back, Sarah!</h1>

          <p class="mt-1 font-body text-xs text-body">
            Here's what's happening with your account today.
          </p>
        </div>
      </div>

      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="rounded-xl border border-default bg-white p-4 shadow-card"
        >
          <div class="flex items-start justify-between">
            <div
              class="flex size-11 items-center justify-center rounded-full"
              :class="stat.iconClass"
            >
              <UIcon :name="stat.icon" class="size-5" />
            </div>

            <!-- Value -->
            <div class="text-right">
              <p class="font-body text-xs text-body">
                {{ stat.title }}
              </p>

              <p class="mt-1 text-2xl font-bold text-title">
                {{ stat.value }}
              </p>
            </div>
          </div>

          <NuxtLink
            :to="stat.to"
            class="mt-3 flex items-center justify-between font-body text-xs text-body transition-colors hover:text-primary"
          >
            <span>{{ stat.link }}</span>

            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div
          class="overflow-hidden rounded-xl border border-default bg-white shadow-card xl:col-span-2"
        >
          <div
            class="flex items-center justify-between border-b border-default px-5 py-4"
          >
            <h2 class="text-sm font-bold text-title">Recent Orders</h2>

            <NuxtLink
              to="/account/orders"
              class="font-body text-xs font-semibold text-primary hover:underline"
            >
              View All Orders
            </NuxtLink>
          </div>

          <div class="divide-y divide-border">
            <NuxtLink
              v-for="order in orders"
              :key="order.id"
              :to="`/account/orders/${order.id.replace('#', '')}`"
              class="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
            >
              <div
                class="size-11 shrink-0 overflow-hidden rounded-lg bg-gray-100"
              >
                <NuxtImg
                  :src="order.image"
                  :alt="order.name"
                  class="size-full object-cover"
                />
              </div>

              <div class="min-w-0 flex-1">
                <p class="truncate font-body text-xs font-medium text-title">
                  {{ order.name }}
                </p>

                <p class="mt-0.5 font-body text-[10px] text-body">
                  Order {{ order.id }}
                </p>
              </div>

              <span
                class="hidden shrink-0 rounded-full px-2 py-1 font-body text-[9px] font-medium sm:inline-flex"
                :class="order.statusClass"
              >
                {{ order.status }}
              </span>

              <span
                class="w-14 shrink-0 text-right font-body text-xs font-medium text-title"
              >
                {{ order.price }}
              </span>

              <span
                class="hidden w-20 shrink-0 text-right font-body text-[10px] text-body sm:block"
              >
                {{ order.date }}
              </span>

              <UIcon
                name="i-lucide-chevron-right"
                class="size-4 shrink-0 text-body transition-transform group-hover:translate-x-0.5"
              />
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4">
          <div
            class="rounded-xl border border-default bg-white p-5 shadow-card"
          >
            <h2 class="mb-5 text-sm font-bold text-title">Order Summary</h2>

            <div class="flex items-center gap-5">
              <div class="relative size-32 shrink-0">
                <div
                  class="size-full rounded-full"
                  style="
                    background: conic-gradient(
                      #22c55e 0deg 270deg,
                      #6366f1 270deg 300deg,
                      #f59e0b 300deg 330deg,
                      #ef4444 330deg 345deg,
                      #fca5a5 345deg 360deg
                    );
                  "
                />

                <div
                  class="absolute inset-[15px] flex flex-col items-center justify-center rounded-full bg-white"
                >
                  <span class="text-2xl font-bold text-title"> 24 </span>

                  <span class="font-body text-[9px] text-body">
                    Total Orders
                  </span>
                </div>
              </div>

              <div class="flex-1 space-y-3">
                <div
                  v-for="status in orderStatuses"
                  :key="status.name"
                  class="flex items-center justify-between"
                >
                  <span
                    class="flex items-center gap-2 font-body text-xs text-body"
                  >
                    <span class="size-2 rounded-full" :class="status.color" />

                    {{ status.name }}
                  </span>

                  <span class="font-body text-xs font-semibold text-title">
                    {{ status.count }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-white p-4">
            <h2 class="mb-3 text-sm font-bold text-title">Quick Actions</h2>

            <div class="grid grid-cols-2 gap-2">
              <NuxtLink
                v-for="action in quickActions"
                :key="action.title"
                :to="action.to"
                class="group flex items-center gap-3 rounded-lg p-3 transition-colors"
                :class="action.iconClass"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white"
                >
                  <UIcon :name="action.icon" class="size-4" />
                </span>

                <div class="min-w-0">
                  <p
                    class="truncate font-body text-xs font-semibold text-title"
                  >
                    {{ action.title }}
                  </p>

                  <p class="truncate font-body text-[10px] text-body">
                    {{ action.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          class="rounded-xl border border-default bg-white p-4 lg:col-span-2"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-sm font-bold text-title">
              Recently Viewed Products
            </h2>

            <div class="flex items-center gap-1">
              <button
                type="button"
                class="flex size-7 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
              >
                <UIcon name="i-lucide-chevron-left" class="size-4" />
              </button>

              <button
                type="button"
                class="flex size-7 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
              >
                <UIcon name="i-lucide-chevron-right" class="size-4" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              v-for="product in products"
              :key="product.name"
              class="group min-w-0"
            >
              <!-- Image -->
              <NuxtLink
                to="/shop"
                class="block overflow-hidden rounded-lg bg-gray-100"
              >
                <NuxtImg
                  :src="product.image"
                  :alt="product.name"
                  class="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </NuxtLink>

              <p class="mt-2 truncate font-body text-xs font-medium text-title">
                {{ product.name }}
              </p>

              <p class="mt-1 font-body text-xs font-semibold text-title">
                {{ product.price }}
              </p>

              <button
                type="button"
                class="mt-2 w-full rounded-md border border-violet-300 px-2 py-1.5 font-body text-[10px] font-medium text-violet-600 transition-colors hover:bg-violet-600 hover:text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50 p-5 shadow-card"
        >
          <div class="absolute right-4 top-4 text-pink-300">
            <UIcon name="i-lucide-sparkles" class="size-5" />
          </div>

          <div class="absolute bottom-5 right-24 text-yellow-400">
            <UIcon name="i-lucide-sparkle" class="size-4" />
          </div>

          <p
            class="font-body text-[10px] font-semibold uppercase tracking-wide text-primary"
          >
            Exclusive for You
          </p>

          <h2 class="mt-3 text-lg font-bold leading-6 text-title">
            Get 10% OFF on your next order!
          </h2>

          <p class="mt-2 font-body text-xs text-body">
            Use code:
            <span class="font-semibold text-primary"> BUYZIN10 </span>
            on checkout
          </p>

          <NuxtLink
            to="/shop"
            class="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-body text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Shop Now

            <UIcon name="i-lucide-arrow-right" class="size-3.5" />
          </NuxtLink>

          <div
            class="absolute bottom-4 right-5 flex size-20 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600 rotate-[-5deg]"
          >
            <UIcon name="i-lucide-gift" class="size-12" />
          </div>
          <div
            class="absolute bottom-8 right-3 flex size-7 items-center justify-center rounded-full bg-primary font-body text-[10px] font-bold text-white shadow"
          >
            %
          </div>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
