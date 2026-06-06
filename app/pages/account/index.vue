<script setup>

definePageMeta({
  middleware: "auth",
});

const stats = [
  {
    title: 'Total Orders',
    value: '48',
    icon: 'i-lucide-package'
  },
  {
    title: 'Wishlist',
    value: '16',
    icon: 'i-lucide-heart'
  },
  {
    title: 'Reward Points',
    value: '1250',
    icon: 'i-lucide-gift'
  },
  {
    title: 'Coupons',
    value: '4',
    icon: 'i-lucide-ticket-percent'
  }
]


const recentOrders = [
  {
    id: '#ORD-260601',
    date: '01 Jun 2026',
    amount: '৳3,450',
    status: 'Delivered'
  },
  {
    id: '#ORD-260528',
    date: '28 May 2026',
    amount: '৳1,890',
    status: 'Shipped'
  },
  {
    id: '#ORD-260524',
    date: '24 May 2026',
    amount: '৳5,200',
    status: 'Processing'
  },
  {
    id: '#ORD-260520',
    date: '20 May 2026',
    amount: '৳2,750',
    status: 'Delivered'
  }
]

const statusClass = (status) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-700'

    case 'Shipped':
      return 'bg-blue-100 text-blue-700'

    case 'Processing':
      return 'bg-amber-100 text-amber-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
}

</script>

<template>
  <Dashboard>
    <Head>
      <Title>Dashboard | Buyzin.com</Title>
      <Meta name="description"
        content="Manage your Buyzin.com account, track orders, view order history, update profile information, and manage your preferences from your customer dashboard." />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="item in stats" :key="item.title"
        class="rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500">
              {{ item.title }}
            </p>

            <h3 class="mt-2 text-3xl font-bold text-slate-900">
              {{ item.value }}
            </h3>
          </div>

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <UIcon :name="item.icon" class="size-7 text-primary" />
          </div>
        </div>
      </div>
    </div>


    <div class="rounded-2xl bg-white">
      <div class="border-b border-slate-100 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            Recent Orders
          </h2>

          <NuxtLink to="/account/orders" class="text-sm font-medium text-primary">
            View All
          </NuxtLink>
        </div>
      </div>

      <div class="divide-y divide-slate-100">
        <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-6">
          <div>
            <h3 class="font-medium text-slate-900">
              {{ order.id }}
            </h3>

            <p class="mt-1 text-sm text-slate-500">
              {{ order.date }}
            </p>
          </div>

          <div class="text-right">
            <p class="font-semibold text-slate-900">
              {{ order.amount }}
            </p>

            <span :class="statusClass(order.status)"
              class="mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium">
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Dashboard>

</template>
