<script setup>
const route = useRoute();

const orderStore = useOrderStore();

const {
  data: order,
  pending,
  error,
  refresh,
} = await useAsyncData(`order-${route.params.id}`, () =>
  orderStore.getOrder(route.params.id),
);
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="order">
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
            { label: `#${order.order_no}` },
          ]"
          class="py-4 text-sm"
        />
        <div
          class="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 class="text-xl font-bold text-title">
              Order Number: {{ order.order_no }}
            </h1>

            <p class="mt-1.5 text-sm text-slate-500">
              Placed on {{ $date(order.created_at) }}
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
          </div>
        </div>

        <div
          class="grid grid-cols-1 gap-5 pb-6 xl:grid-cols-[minmax(0,1fr)_280px]"
        >
          <div class="min-w-0 space-y-4">
            <section
              class="space-y-4 rounded border border-border bg-white p-4"
            >
              <div>
                <h2 class="text-base font-semibold text-title">Order Status</h2>

                <p class="text-sm text-body">
                  Follow the progress of your order.
                </p>
              </div>

              <div class="relative">
                <div
                  v-for="(tracking, index) in order.trackings"
                  :key="tracking.id"
                  class="relative flex gap-4 pb-6 last:pb-0"
                >
                  <div
                    v-if="index !== order.trackings.length - 1"
                    class="absolute left-4 top-9 h-full w-px bg-slate-200"
                  ></div>

                  <div
                    class="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full"
                    :class="
                      tracking.status === order.status
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-500'
                    "
                  >
                    <UIcon
                      :name="
                        tracking.status === 'delivered'
                          ? 'i-lucide-circle-check'
                          : tracking.status === 'shipped'
                            ? 'i-lucide-truck'
                            : tracking.status === 'packed'
                              ? 'i-lucide-package-check'
                              : tracking.status === 'processing'
                                ? 'i-lucide-loader-circle'
                                : 'i-lucide-shopping-bag'
                      "
                      class="size-4"
                    />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div
                      class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <h3 class="text-sm font-semibold text-slate-900">
                        {{ tracking.title }}
                      </h3>

                      <span class="text-xs text-slate-400">
                        {{ $date(tracking.tracked_at) }}
                      </span>
                    </div>

                    <p class="mt-1 text-sm leading-5 text-slate-500">
                      {{ tracking.description }}
                    </p>

                    <p
                      v-if="tracking.location"
                      class="mt-2 flex items-center gap-1 text-xs text-slate-400"
                    >
                      <UIcon name="i-lucide-map-pin" class="size-3.5" />

                      {{ tracking.location }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
              >
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                >
                  <UIcon name="i-lucide-truck" class="size-5" />
                </div>

                <div class="min-w-0">
                  <p class="text-sm font-semibold text-title">Order Tracking</p>
                  <p class="mt-1 text-sm text-slate-500">
                    Courier:
                    <span class="font-medium text-slate-700">
                      {{ order.courier ?? "N/A" }}
                    </span>
                  </p>

                  <p class="mt-1 text-sm text-slate-500">
                    Tracking ID:
                    <span class="font-medium text-primary">
                      {{ order.tracking_no ?? "N/A" }}
                    </span>
                  </p>

                  <p class="mt-1 text-xs text-slate-400">
                    Expected delivery:
                    {{ $date(order.expected_delivery_at) ?? "N/A" }}
                  </p>
                </div>
              </div>
            </section>

            <section class="rounded border border-border bg-white">
              <div
                class="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 class="text-base font-semibold text-title">
                    Order Items
                  </h2>

                  <p class="mt-1 text-xs text-slate-400">
                    {{ order.items_count }}
                    item{{ order.items_count > 1 ? "s" : "" }}
                  </p>
                </div>
              </div>

              <article
                v-for="item in order.items"
                :key="item.id"
                class="group flex items-center gap-4 border-b border-slate-100 px-4 py-4 transition last:border-b-0 hover:bg-slate-50/60 sm:px-5"
              >
                <div class="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50"
                  >
                    <NuxtImg
                      :src="item.cover_url"
                      :alt="item.name"
                      class="size-full object-contain p-1.5 transition group-hover:scale-105"
                    />
                  </div>

                  <div class="min-w-0">
                    <h3
                      class="truncate text-sm font-semibold text-title sm:text-[15px]"
                    >
                      {{ item.name }}
                    </h3>

                    <p class="mt-1 text-xs text-slate-400">
                      SKU: {{ item.sku }}
                    </p>

                    <div class="mt-2 flex items-center gap-2 sm:hidden">
                      <span class="text-sm font-semibold text-title">
                        {{ $currency(item.price.sale) }}
                      </span>

                      <span
                        class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500"
                      >
                        Qty {{ item.quantity }}
                      </span>
                    </div>

                    <div class="mt-2">
                      <UButton
                        color="primary"
                        variant="outline"
                        size="xs"
                        class="whitespace-nowrap"
                      >
                        <UIcon name="i-lucide-star" class="mr-1 size-3.5" />
                        Write Review
                      </UButton>
                    </div>
                  </div>
                </div>

                <div class="hidden w-24 shrink-0 sm:block">
                  <p class="text-xs text-slate-400">Price</p>
                  <p class="mt-1 text-sm font-semibold text-title">
                    {{ $currency(item.price.sale) }}
                  </p>
                </div>

                <div class="hidden w-16 shrink-0 text-center sm:block">
                  <p class="text-xs text-slate-400">Qty</p>
                  <p class="mt-1 text-sm font-medium text-title">
                    {{ item.quantity }}
                  </p>
                </div>

                <div class="hidden w-28 shrink-0 sm:block">
                  <p class="text-xs text-slate-400">Total</p>
                  <p class="mt-1 text-sm font-bold text-title">
                    {{ $currency(item.price.sale * item.quantity) }}
                  </p>
                </div>
              </article>
            </section>
          </div>

          <aside class="space-y-4">
            <section class="rounded border border-border bg-white p-4">
              <h2 class="text-base font-semibold text-title">Order Summary</h2>

              <div class="mt-5 space-y-3 text-sm">
                <div class="flex justify-between gap-4 text-title">
                  <span> Subtotal ({{ order.items_count }} items) </span>
                  <span class="font-medium text-body">
                    {{ $currency(order.subtotal) }}
                  </span>
                </div>

                <div class="flex justify-between gap-4 text-title">
                  <span>Shipping Fee</span>
                  <span class="font-medium text-body">
                    {{ $currency(order.shipping) }}
                  </span>
                </div>

                <div class="flex justify-between gap-4 text-title">
                  <span>Tax</span>
                  <span class="font-medium text-body">
                    {{ $currency(order.tax) }}
                  </span>
                </div>

                <div
                  v-if="Number(order.discount) > 0"
                  class="flex justify-between gap-4 text-title"
                >
                  <span>
                    Discount

                    <span
                      v-if="order.coupon?.code"
                      class="text-xs text-slate-400"
                    >
                      ({{ order.coupon.code }})
                    </span>
                  </span>

                  <span class="font-medium text-emerald-600">
                    -{{ $currency(order.discount) }}
                  </span>
                </div>

                <div
                  v-if="Number(order.gift_card) > 0"
                  class="flex justify-between gap-4 text-title"
                >
                  <span>Gift Card</span>
                  <span class="font-medium text-emerald-600">
                    -{{ $currency(order.gift_card) }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="font-semibold text-slate-900"> Total Paid </span>
                  <span class="text-lg font-bold text-slate-900">
                    {{ $currency(order.total) }}
                  </span>
                </div>

                <div
                  v-if="order.payment"
                  class="flex items-center gap-2 rounded bg-emerald-50 px-3 py-2.5 text-sm text-emerald-600"
                >
                  <UIcon name="i-lucide-badge-check" class="size-4" />

                  <span>
                    Paid via
                    <strong class="uppercase">
                      {{ order.payment.method }}
                    </strong>
                  </span>
                </div>
              </div>
            </section>

            <section
              v-if="order.contact"
              class="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h2 class="text-base font-semibold text-title">
                Delivery Address
              </h2>

              <div class="mt-4 space-y-2 text-sm">
                <h4 class="font-medium text-title">
                  {{ order.contact.name }}
                </h4>
                <h5 class="text-title">
                  {{ order.contact.phone }}
                </h5>
                <p class="leading-5 text-body">
                  {{ order.contact.address }}, {{ order.contact.area }},
                  {{ order.contact.city }}, {{ order.contact.state }} -
                  {{ order.contact.postcode }}
                </p>

                <p class="text-body">
                  {{ order.contact.country }}
                </p>
              </div>
            </section>

            <section class="rounded-xl border border-slate-200 bg-white p-5">
              <h2 class="text-base font-semibold text-slate-900">Need Help?</h2>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                View our help center or contact us for any queries regarding
                your order.
              </p>

              <div class="mt-4 divide-y divide-slate-100">
                <NuxtLink
                  to="/help"
                  class="flex items-center justify-between py-3 text-sm text-primary transition hover:text-primary/80"
                >
                  <span class="flex items-center gap-3">
                    <UIcon
                      name="i-lucide-circle-help"
                      class="size-4 text-slate-500"
                    />

                    Help Center
                  </span>

                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-4 text-slate-400"
                  />
                </NuxtLink>

                <NuxtLink
                  to="/returns-refunds"
                  class="flex items-center justify-between py-3 text-sm text-primary transition hover:text-primary/80"
                >
                  <span class="flex items-center gap-3">
                    <UIcon
                      name="i-lucide-rotate-ccw"
                      class="size-4 text-slate-500"
                    />

                    Return & Refund
                  </span>

                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-4 text-slate-400"
                  />
                </NuxtLink>

                <NuxtLink
                  to="/support"
                  class="flex items-center justify-between py-3 text-sm text-primary transition hover:text-primary/80"
                >
                  <span class="flex items-center gap-3">
                    <UIcon
                      name="i-lucide-message-circle"
                      class="size-4 text-slate-500"
                    />

                    Chat with Support
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
    </template>
  </Dashboard>
</template>
