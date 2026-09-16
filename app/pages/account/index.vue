<script setup>
const dashboardStore = useDashboardStore();

definePageMeta({
  middleware: ["auth"],
});

const {
  data: dashboard,
  pending,
  error,
  refresh,
} = await useAsyncData("dashboard", () => dashboardStore.index());

const carousel = ref(null);

const scrollPrev = () => {
  carousel.value?.emblaApi?.scrollPrev();
};

const scrollNext = () => {
  carousel.value?.emblaApi?.scrollNext();
};
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

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'My Account',
          to: '/account',
        },
        {
          label: 'Dashboard',
        },
      ]"
      class="text-sm"
    />

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else class="w-full space-y-4">
      <div class="w-full">
        <h1 class="text-xl font-bold text-title">
          Welcome back,
          <span class="text-primary">{{ dashboard?.user?.name }}</span>
        </h1>

        <p class="font-body text-xs text-body">
          Here's what's happening with your account today.
        </p>
      </div>

      <section class="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-xl border border-default bg-white p-4">
          <div class="flex items-start justify-between">
            <div
              class="flex size-11 items-center justify-center rounded-full bg-violet-100 text-violet-600"
            >
              <UIcon name="i-lucide-shopping-bag" class="size-5" />
            </div>

            <div class="text-right">
              <p class="font-body text-xs text-body">Total Orders</p>
              <h4 class="mt-1 text-2xl font-bold text-title">
                {{ dashboard?.stats?.total_orders ?? 0 }}
              </h4>
            </div>
          </div>

          <NuxtLink
            to="/account/orders"
            class="mt-3 flex items-center justify-between font-body text-xs text-body transition-colors hover:text-primary"
          >
            <span>View all orders</span>
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </NuxtLink>
        </div>

        <div class="rounded-xl border border-default bg-white p-4">
          <div class="flex items-start justify-between">
            <div
              class="flex size-11 items-center justify-center rounded-full bg-green-100 text-green-600"
            >
              <UIcon name="i-lucide-package-check" class="size-5" />
            </div>

            <div class="text-right">
              <p class="font-body text-xs text-body">Delivered Orders</p>
              <h4 class="mt-1 text-2xl font-bold text-title">
                {{ dashboard?.stats?.delivered_orders ?? 0 }}
              </h4>
            </div>
          </div>

          <NuxtLink
            to="/account/orders?status=delivered"
            class="mt-3 flex items-center justify-between font-body text-xs text-body transition-colors hover:text-primary"
          >
            <span>View details</span>
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </NuxtLink>
        </div>

        <div class="rounded-xl border border-default bg-white p-4">
          <div class="flex items-start justify-between">
            <div
              class="flex size-11 items-center justify-center rounded-full bg-orange-100 text-orange-600"
            >
              <UIcon name="i-lucide-clock-3" class="size-5" />
            </div>

            <div class="text-right">
              <p class="font-body text-xs text-body">Pending Orders</p>
              <h4 class="mt-1 text-2xl font-bold text-title">
                {{ dashboard?.stats?.pending_orders ?? 0 }}
              </h4>
            </div>
          </div>

          <NuxtLink
            to="/account/orders?status=pending"
            class="mt-3 flex items-center justify-between font-body text-xs text-body transition-colors hover:text-primary"
          >
            <span>Track your orders</span>
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </NuxtLink>
        </div>

        <div class="rounded-xl border border-default bg-white p-4">
          <div class="flex items-start justify-between">
            <div
              class="flex size-11 items-center justify-center rounded-full bg-sky-100 text-sky-600"
            >
              <UIcon name="i-lucide-wallet-cards" class="size-5" />
            </div>

            <div class="text-right">
              <p class="font-body text-xs text-body">Total Spent</p>
              <h4 class="mt-1 text-2xl font-bold text-title">
                {{ dashboard?.stats?.total_spent ?? 0 }}
              </h4>
            </div>
          </div>

          <NuxtLink
            to="/account/orders"
            class="mt-3 flex items-center justify-between font-body text-xs text-body transition-colors hover:text-primary"
          >
            <span>View spending</span>
            <UIcon name="i-lucide-chevron-right" class="size-4" />
          </NuxtLink>
        </div>
      </section>

      <section class="rounded-xl border border-gray-100 bg-white p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Recent Orders</h2>

          <a
            href="/account/orders"
            class="group inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All Orders
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div class="overflow-x-auto">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] border-collapse">
              <!-- Header -->
              <thead>
                <tr class="border-b border-border bg-gray-50">
                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    #
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Order
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Date
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Items
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Total
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Due
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Payment
                  </th>

                  <th
                    class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Status
                  </th>

                  <th
                    class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody class="divide-y divide-border">
                <!-- Empty -->
                <tr v-if="!dashboard.orders.length">
                  <td colspan="9" class="px-4 py-10">
                    <EmptyState />
                  </td>
                </tr>

                <!-- Orders -->
                <tr
                  v-else
                  v-for="(order, index) in dashboard.orders"
                  :key="order.id"
                  class="group transition-colors hover:bg-gray-50/70"
                >
                  <!-- # -->
                  <td
                    class="whitespace-nowrap px-4 py-3.5 text-sm text-gray-500"
                  >
                    {{ index + 1 }}
                  </td>

                  <td class="px-4 py-3.5">
                    <div class="flex items-center gap-3">
                      <div class="min-w-0">
                        <a
                          :href="`/account/orders/${order.id}`"
                          class="block truncate text-sm font-semibold text-gray-800 transition-colors hover:text-primary"
                        >
                          #{{ order.order_number }}
                        </a>

                        <div class="mt-0.5 flex items-center gap-1.5">
                          <UIcon
                            name="i-lucide-credit-card"
                            class="size-3 text-gray-400"
                          />

                          <span class="text-xs uppercase text-gray-400">
                            {{ order.payment }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="whitespace-nowrap px-4 py-3.5">
                    <span class="text-sm text-gray-600">
                      {{ $date(order.created_at) }}
                    </span>
                  </td>

                  <td class="whitespace-nowrap px-4 py-3.5">
                    <span
                      class="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                    >
                      {{ order.items_count }} items
                    </span>
                  </td>

                  <td class="whitespace-nowrap px-4 py-3.5">
                    <div class="text-sm font-semibold text-gray-800">
                      {{ $currency(order.total, order.currency) }}
                    </div>

                    <div
                      v-if="Number(order.discount) > 0"
                      class="mt-0.5 text-xs text-emerald-600"
                    >
                      Discount:
                      {{ $currency(order.discount, order.currency) }}
                    </div>
                  </td>

                  <td class="whitespace-nowrap px-4 py-3.5">
                    <div
                      class="text-sm font-semibold"
                      :class="
                        Number(order.due_amount) > 0
                          ? 'text-orange-600'
                          : 'text-emerald-600'
                      "
                    >
                      {{ $currency(order.due_amount, order.currency) }}
                    </div>

                    <div class="mt-0.5 text-xs text-gray-400">
                      Paid:
                      {{ $currency(order.paid_amount, order.currency) }}
                    </div>
                  </td>

                  <td class="px-4 py-3.5">
                    <span
                      class="inline-flex w-fit rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium uppercase text-blue-600"
                    >
                      {{ order.method }}
                    </span>
                  </td>

                  <td class="px-4 py-3.5">
                    <span
                      class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium capitalize"
                      :class="{
                        'bg-amber-50 text-amber-600':
                          order.status === 'pending',

                        'bg-blue-50 text-blue-600':
                          order.status === 'confirmed',

                        'bg-indigo-50 text-indigo-600':
                          order.status === 'processing',

                        'bg-violet-50 text-violet-600':
                          order.status === 'shipped',

                        'bg-emerald-50 text-emerald-600':
                          order.status === 'delivered',

                        'bg-green-50 text-green-600':
                          order.status === 'completed',

                        'bg-red-50 text-red-500': order.status === 'cancelled',

                        'bg-gray-100 text-gray-600':
                          order.status === 'refunded',
                      }"
                    >
                      <span class="size-1.5 rounded-full bg-current"></span>

                      {{ order.status }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-4 py-3.5 text-right">
                    <a
                      :href="`/account/orders/${order.id}`"
                      class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      View
                      <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-white px-4 py-6">
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-sm font-bold text-title">
              Recently Viewed Products
            </h2>

            <p class="mt-1 text-xs text-body">Products you recently viewed</p>
          </div>
          <div class="flex shrink-0 items-center gap-1">
            <button
              type="button"
              @click="scrollPrev"
              aria-label="Previous products"
              class="flex size-7 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
            >
              <UIcon name="i-lucide-chevron-left" class="size-4" />
            </button>

            <button
              type="button"
              @click="scrollNext"
              aria-label="Next products"
              class="flex size-7 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
            >
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </button>
          </div>
        </div>

        <UCarousel
          v-slot="{ item }"
          :items="dashboard.recently_viewed"
          :ui="{
            item: 'basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4',
          }"
        >
          <ProductCard :product="item" />
        </UCarousel>
      </section>
    </template>
  </Dashboard>
</template>
