<script setup>
const dashboardStore = useDashboardStore();

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

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else class="w-full space-y-4">
      <section
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="w-full">
          <h1 class="text-xl font-bold text-title">
            Welcome back,
            <span class="text-primary">{{ dashboard?.user?.name }}</span>
          </h1>

          <p class="font-body text-xs text-body">
            Here's what's happening with your account today.
          </p>
        </div>

        <UButton
          color="primary"
          variant="outline"
          size="sm"
          :loading="pending"
          @click="refresh()"
        >
          <UIcon name="i-lucide-refresh-cw" class="size-4" />
          Refresh
        </UButton>
      </section>

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div
          class="overflow-hidden rounded-xl border border-default bg-white xl:col-span-2"
        >
          <div class="rounded-2xl bg-white">
            <div
              class="flex items-center justify-between border-b border-default px-4 py-4"
            >
              <div>
                <h2 class="text-sm font-bold text-title">Recent Orders</h2>

                <p class="mt-1 text-xs text-body">
                  Your latest orders and delivery updates
                </p>
              </div>

              <NuxtLink
                to="/account/orders"
                class="text-xs font-semibold text-primary hover:underline"
              >
                View all
              </NuxtLink>
            </div>

            <div class="divide-y divide-border px-4 py-4">
              <EmptyState v-if="!dashboard.recent_orders.length" />
              <article
                v-else
                v-for="order in dashboard.recent_orders"
                :key="order.id"
                class="transition border border-border hover:bg-gray-50 p-2.5 rounded"
              >
                <div class="flex items-center justify-between gap-4">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <h3 class="text-sm font-semibold text-title">
                        #{{ order.order_no }}
                      </h3>

                      <span
                        class="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold capitalize text-orange-600"
                      >
                        {{ order.status }}
                      </span>
                    </div>

                    <p class="mt-1 text-xs text-body">
                      {{ order.items_count ?? 0 }} items
                    </p>

                    <p class="mt-1 text-xs text-muted">
                      {{ $date(order.created_at) }}
                    </p>
                  </div>
                  <div class="shrink-0 text-right">
                    <p class="text-sm font-bold text-title">
                      {{ $currency(order.total) }}
                    </p>

                    <div class="mt-1 flex items-center justify-end gap-1">
                      <UIcon
                        :name="
                          order.payment?.status === 'paid'
                            ? 'i-lucide-circle-check'
                            : 'i-lucide-clock-3'
                        "
                        class="size-4"
                      />

                      <span
                        class="text-xs capitalize"
                        :class="
                          order.payment?.status === 'paid'
                            ? 'text-green-600'
                            : 'text-orange-600'
                        "
                      >
                        {{ order.payment?.status }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-3 flex items-center justify-between">
                  <div class="text-xs text-body">
                    <span class="capitalize">
                      {{ order.payment?.method }}
                    </span>
                  </div>

                  <NuxtLink
                    :to="`/account/orders/${order.id}`"
                    class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View details

                    <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
                  </NuxtLink>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-xl border border-border bg-white p-4">
            <h2 class="text-sm font-bold text-title mb-4">Order Summary</h2>

            <div v-if="dashboard.order_summary" class="space-y-3">
              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-2 font-body text-xs text-body"
                >
                  <span class="size-2 rounded-full bg-yellow-500"></span>
                  Pending
                </span>

                <span class="font-body text-xs font-semibold text-title">
                  {{ dashboard.order_summary?.pending }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-2 font-body text-xs text-body"
                >
                  <span class="size-2 rounded-full bg-green-500"></span>
                  Delivered
                </span>

                <span class="font-body text-xs font-semibold text-title">
                  {{ dashboard.order_summary?.delivered }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-2 font-body text-xs text-body"
                >
                  <span class="size-2 rounded-full bg-indigo-500"></span>
                  Shipped
                </span>

                <span class="font-body text-xs font-semibold text-title">
                  {{ dashboard.order_summary?.shipped }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-2 font-body text-xs text-body"
                >
                  <span class="size-2 rounded-full bg-orange-400"></span>
                  Processing
                </span>

                <span class="font-body text-xs font-semibold text-title">
                  {{ dashboard.order_summary?.processing }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-2 font-body text-xs text-body"
                >
                  <span class="size-2 rounded-full bg-red-500"></span>
                  Cancelled
                </span>

                <span class="font-body text-xs font-semibold text-title">
                  {{ dashboard.order_summary?.cancelled }}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-white p-4">
            <h2 class="mb-3 text-sm font-bold text-title">Quick Actions</h2>

            <div class="">
              <NuxtLink
                to="/account/orders"
                class="group flex items-center gap-2 p-2.5"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded bg-violet-50 text-violet-600"
                >
                  <UIcon name="i-lucide-shopping-bag" class="size-4" />
                </span>

                <div class="min-w-0">
                  <p
                    class="truncate font-body text-xs font-semibold text-title"
                  >
                    My Orders
                  </p>
                  <p class="truncate font-body text-xs text-body">
                    View & track
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/account"
                class="group flex items-center gap-2 p-2.5"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded bg-green-50 text-green-600"
                >
                  <UIcon name="i-lucide-rotate-ccw" class="size-4" />
                </span>

                <div class="min-w-0">
                  <p
                    class="truncate font-body text-xs font-semibold text-title"
                  >
                    Return & Refund
                  </p>
                  <p class="truncate font-body text-xs text-body">
                    Request return
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/account/addresses"
                class="group flex items-center gap-2 p-2.5"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded bg-orange-50 text-orange-600"
                >
                  <UIcon name="i-lucide-map-pin" class="size-4" />
                </span>

                <div class="min-w-0">
                  <p
                    class="truncate font-body text-xs font-semibold text-title"
                  >
                    Address Book
                  </p>
                  <p class="truncate font-body text-xs text-body">
                    Manage addresses
                  </p>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/account"
                class="group flex items-center gap-2 p-2.5"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600"
                >
                  <UIcon name="i-lucide-credit-card" class="size-4" />
                </span>

                <div class="min-w-0">
                  <p
                    class="truncate font-body text-xs font-semibold text-title"
                  >
                    Payment Methods
                  </p>
                  <p class="truncate font-body text-xs text-body">
                    Manage cards
                  </p>
                </div>
              </NuxtLink>
            </div>
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
