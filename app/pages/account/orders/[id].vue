<script setup>
const route = useRoute();
const orderStore = useOrderStore();

definePageMeta({
  middleware: ["auth"],
});

const {
  data: order,
  pending,
  error,
  refresh,
} = await useAsyncData(`order-${route.params.id}`, () =>
  orderStore.getOrder(route.params.id),
);

const statusConfig = {
  pending: {
    label: "Pending",
    icon: "i-lucide-clock-3",
    classes: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    icon: "i-lucide-circle-check",
    classes: "bg-blue-50 text-blue-700 ring-blue-200",
  },
  processing: {
    label: "Processing",
    icon: "i-lucide-loader-circle",
    classes: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  shipped: {
    label: "Shipped",
    icon: "i-lucide-truck",
    classes: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  delivered: {
    label: "Delivered",
    icon: "i-lucide-package-check",
    classes: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  completed: {
    label: "Completed",
    icon: "i-lucide-badge-check",
    classes: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: "i-lucide-circle-x",
    classes: "bg-red-50 text-red-700 ring-red-200",
  },
};

const statusSteps = [
  {
    key: "pending",
    label: "Pending",
    icon: "i-lucide-clock-3",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: "i-lucide-circle-check",
  },
  {
    key: "processing",
    label: "Processing",
    icon: "i-lucide-package",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: "i-lucide-truck",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: "i-lucide-package-check",
  },
];

const currentStatusIndex = computed(() => {
  const index = statusSteps.findIndex(
    (step) => step.key === order.value?.status,
  );

  return index === -1 ? 0 : index;
});

const currentStatus = computed(() => {
  return (
    statusConfig[order.value?.status] || {
      label: order.value?.status || "Unknown",
      icon: "i-lucide-circle-help",
      classes: "bg-slate-50 text-slate-600 ring-slate-200",
    }
  );
});

const paymentLabel = computed(() => {
  const payment = order.value?.payment;

  if (!payment) return "N/A";

  return payment === "cod"
    ? "Cash on Delivery"
    : String(payment).replaceAll("_", " ").toUpperCase();
});

const formatOption = (option) => {
  if (!option?.attribute?.name || !option?.option?.name) return null;

  return `${option.attribute.name}: ${option.option.name}`;
};

const itemOptions = (item) => {
  return (item.options || []).map(formatOption).filter(Boolean);
};

const hasDiscount = computed(() => {
  return Number(order.value?.discount || 0) > 0;
});

const isPaid = computed(() => {
  return Number(order.value?.paid_amount || 0) > 0;
});

const isDue = computed(() => {
  return Number(order.value?.due_amount || 0) > 0;
});
</script>

<template>
  <Dashboard>
    <Head>
      <Title> Order #{{ order?.order_number || "Details" }} | Buyzin </Title>

      <Meta
        name="description"
        content="View your order details, items, payment and delivery information."
      />

      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="order">
      <div class="mx-auto max-w-7xl space-y-5">
        <!-- Header -->
        <div
          class="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-6"
        >
          <UBreadcrumb
            :items="[
              { label: 'Home', to: '/' },
              { label: 'My Orders', to: '/account/orders' },
              { label: `#${order.order_number}` },
            ]"
            class="mb-4 text-sm"
          />

          <div
            class="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h1
                  class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
                >
                  Order #{{ order.order_number }}
                </h1>

                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset"
                  :class="currentStatus.classes"
                >
                  <UIcon :name="currentStatus.icon" class="size-3.5" />

                  {{ currentStatus.label }}
                </span>
              </div>

              <p class="mt-1.5 text-sm text-slate-500">
                Placed on {{ $date(order.created_at) }}
              </p>
            </div>

            <div class="flex items-center gap-2">
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
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <!-- Left -->
          <div class="min-w-0 space-y-5">
            <!-- Order Status -->
            <section
              class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div
                class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 class="text-base font-bold text-slate-900">
                    Order Status
                  </h2>

                  <p class="mt-1 text-sm text-slate-500">
                    Track your order progress.
                  </p>
                </div>

                <span
                  class="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset sm:mt-0"
                  :class="currentStatus.classes"
                >
                  <UIcon :name="currentStatus.icon" class="size-3.5" />

                  {{ currentStatus.label }}
                </span>
              </div>

              <!-- Desktop Timeline -->
              <div class="mt-7 hidden md:block">
                <div class="relative">
                  <div
                    class="absolute left-[10%] right-[10%] top-5 h-0.5 bg-slate-200"
                  />

                  <div
                    class="absolute left-[10%] top-5 h-0.5 bg-primary transition-all"
                    :style="{
                      width: `${
                        Math.min(
                          currentStatusIndex / (statusSteps.length - 1),
                          1,
                        ) * 80
                      }%`,
                    }"
                  />

                  <div class="relative grid grid-cols-5">
                    <div
                      v-for="(step, index) in statusSteps"
                      :key="step.key"
                      class="flex flex-col items-center"
                    >
                      <div
                        class="relative z-10 flex size-10 items-center justify-center rounded-full border-2 transition"
                        :class="
                          index <= currentStatusIndex
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-200 bg-white text-slate-400'
                        "
                      >
                        <UIcon :name="step.icon" class="size-4.5" />
                      </div>

                      <p
                        class="mt-2 text-xs font-semibold"
                        :class="
                          index <= currentStatusIndex
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        "
                      >
                        {{ step.label }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile Timeline -->
              <div class="mt-5 space-y-4 md:hidden">
                <div
                  v-for="(step, index) in statusSteps"
                  :key="step.key"
                  class="flex items-start gap-3"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="flex size-9 shrink-0 items-center justify-center rounded-full border-2"
                      :class="
                        index <= currentStatusIndex
                          ? 'border-primary bg-primary text-white'
                          : 'border-slate-200 bg-white text-slate-400'
                      "
                    >
                      <UIcon :name="step.icon" class="size-4" />
                    </div>

                    <div
                      v-if="index < statusSteps.length - 1"
                      class="mt-1 h-6 w-0.5"
                      :class="
                        index < currentStatusIndex
                          ? 'bg-primary'
                          : 'bg-slate-200'
                      "
                    />
                  </div>

                  <div class="pt-1">
                    <p
                      class="text-sm font-semibold"
                      :class="
                        index <= currentStatusIndex
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      "
                    >
                      {{ step.label }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Payment Status -->
              <div
                class="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2"
              >
                <div
                  class="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5"
                >
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm"
                  >
                    <UIcon name="i-lucide-credit-card" class="size-4.5" />
                  </div>

                  <div class="min-w-0">
                    <p class="text-xs text-slate-400">Payment Method</p>

                    <p
                      class="mt-0.5 truncate text-sm font-semibold text-slate-900"
                    >
                      {{ paymentLabel }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5"
                >
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm"
                  >
                    <UIcon name="i-lucide-wallet" class="size-4.5" />
                  </div>

                  <div class="min-w-0">
                    <p class="text-xs text-slate-400">Payment Status</p>

                    <p
                      class="mt-0.5 text-sm font-semibold"
                      :class="isDue ? 'text-amber-600' : 'text-emerald-600'"
                    >
                      {{ isDue ? "Payment Due" : "Paid" }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Order Items -->
            <section
              class="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div
                class="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5"
              >
                <div>
                  <h2 class="text-base font-bold text-slate-900">
                    Order Items
                  </h2>

                  <p class="mt-0.5 text-xs text-slate-400">
                    {{ order.items_count }}
                    {{ order.items_count > 1 ? "items" : "item" }}
                  </p>
                </div>
              </div>

              <div>
                <article
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:gap-4 sm:px-5"
                >
                  <!-- Product Image -->
                  <div
                    class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:size-20"
                  >
                    <NuxtImg
                      v-if="item.cover_url"
                      :src="item.cover_url"
                      :alt="item.name"
                      class="size-full object-contain p-2"
                    />

                    <UIcon
                      v-else
                      name="i-lucide-image"
                      class="size-6 text-slate-300"
                    />
                  </div>

                  <!-- Product Info -->
                  <div class="min-w-0 flex-1">
                    <div
                      class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div class="min-w-0">
                        <h3
                          class="line-clamp-2 text-sm font-semibold text-slate-900 sm:text-[15px]"
                        >
                          {{ item.name }}
                        </h3>

                        <p class="mt-1 text-xs text-slate-400">
                          SKU: {{ item.sku }}
                        </p>
                      </div>

                      <div class="hidden shrink-0 text-right sm:block">
                        <p class="text-xs text-slate-400">Total</p>

                        <p class="mt-0.5 text-sm font-bold text-slate-900">
                          {{ $currency(item.total) }}
                        </p>
                      </div>
                    </div>

                    <!-- Options -->
                    <div
                      v-if="itemOptions(item).length"
                      class="mt-2 flex flex-wrap gap-1.5"
                    >
                      <span
                        v-for="option in itemOptions(item)"
                        :key="option"
                        class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {{ option }}
                      </span>
                    </div>

                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span class="text-sm font-semibold text-slate-900">
                        {{ $currency(item.unit_price) }}
                      </span>

                      <span class="text-xs text-slate-400"> x </span>

                      <span
                        class="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600"
                      >
                        Qty {{ item.quantity }}
                      </span>

                      <span class="text-xs text-slate-400 sm:hidden"> = </span>

                      <span class="text-sm font-bold text-slate-900 sm:hidden">
                        {{ $currency(item.total) }}
                      </span>
                    </div>

                    <p class="mt-1.5 text-xs text-slate-400">
                      Tax: {{ $currency(item.tax) }}
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <!-- Right -->
          <aside class="space-y-5">
            <!-- Order Summary -->
            <section
              class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-slate-900">
                  Order Summary
                </h2>

                <UIcon
                  name="i-lucide-receipt-text"
                  class="size-5 text-slate-400"
                />
              </div>

              <div class="mt-5 space-y-3.5 text-sm">
                <div class="flex items-center justify-between gap-4">
                  <span class="text-slate-500"> Subtotal </span>

                  <span class="font-medium text-slate-900">
                    {{ $currency(order.subtotal) }}
                  </span>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <span class="text-slate-500"> Shipping </span>

                  <span class="font-medium text-slate-900">
                    {{ $currency(order.shipping) }}
                  </span>
                </div>

                <div class="flex items-center justify-between gap-4">
                  <span class="text-slate-500"> Tax </span>

                  <span class="font-medium text-slate-900">
                    {{ $currency(order.tax) }}
                  </span>
                </div>

                <div
                  v-if="hasDiscount"
                  class="flex items-center justify-between gap-4"
                >
                  <span class="text-slate-500"> Discount </span>

                  <span class="font-semibold text-emerald-600">
                    -{{ $currency(order.discount) }}
                  </span>
                </div>

                <div class="border-t border-dashed border-slate-200 pt-4">
                  <div class="flex items-end justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-slate-900">
                        Grand Total
                      </p>

                      <p class="mt-0.5 text-xs text-slate-400">
                        {{ order.currency }}
                      </p>
                    </div>

                    <p class="text-xl font-bold text-slate-900">
                      {{ $currency(order.total) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Payment -->
              <div class="mt-5 space-y-2">
                <div
                  class="flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-3"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-circle-check"
                      class="size-4 text-emerald-600"
                    />

                    <span class="text-sm text-emerald-700"> Paid </span>
                  </div>

                  <span class="text-sm font-bold text-emerald-700">
                    {{ $currency(order.paid_amount) }}
                  </span>
                </div>

                <div
                  v-if="isDue"
                  class="flex items-center justify-between rounded-xl bg-amber-50 px-3.5 py-3"
                >
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-clock-3"
                      class="size-4 text-amber-600"
                    />

                    <span class="text-sm text-amber-700"> Due </span>
                  </div>

                  <span class="text-sm font-bold text-amber-700">
                    {{ $currency(order.due_amount) }}
                  </span>
                </div>
              </div>

              <!-- Payment Method -->
              <div
                class="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <div
                  class="flex size-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm"
                >
                  <UIcon name="i-lucide-banknote" class="size-4.5" />
                </div>

                <div>
                  <p class="text-[11px] text-slate-400">Payment Method</p>

                  <p class="mt-0.5 text-sm font-semibold text-slate-900">
                    {{ paymentLabel }}
                  </p>
                </div>
              </div>
            </section>

            <!-- Customer -->
            <section
              class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <h2 class="text-base font-bold text-slate-900">Customer</h2>

              <div class="mt-4 flex items-center gap-3">
                <div
                  class="size-11 shrink-0 overflow-hidden rounded-full bg-slate-100"
                >
                  <NuxtImg
                    :src="order.user?.photo_url"
                    :alt="order.user?.name"
                    class="size-full object-cover"
                  />
                </div>

                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ order.user?.name || "N/A" }}
                  </p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    {{ order.user?.phone || "N/A" }}
                  </p>
                </div>
              </div>

              <div
                v-if="order.user?.email"
                class="mt-3 flex items-center gap-2 text-xs text-slate-500"
              >
                <UIcon name="i-lucide-mail" class="size-3.5" />

                {{ order.user.email }}
              </div>
            </section>

            <!-- Delivery Address -->
            <section
              v-if="order.address"
              class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-slate-900">
                  Delivery Address
                </h2>

                <span
                  class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-500"
                >
                  {{ order.address.type || "Address" }}
                </span>
              </div>

              <div class="mt-4 space-y-3">
                <div class="flex gap-3">
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500"
                  >
                    <UIcon name="i-lucide-user" class="size-4" />
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ order.address.name }}
                    </p>

                    <p class="mt-0.5 text-xs text-slate-500">
                      {{ order.address.phone }}
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500"
                  >
                    <UIcon name="i-lucide-map-pin" class="size-4" />
                  </div>

                  <div class="text-sm leading-5 text-slate-600">
                    <p>
                      {{ order.address.address }}
                    </p>

                    <p>
                      {{ order.address.area }}, {{ order.address.city }},
                      {{ order.address.state }}
                    </p>

                    <p>
                      {{ order.address.country }}
                    </p>

                    <p
                      v-if="order.address.landmark"
                      class="mt-1 text-xs text-slate-400"
                    >
                      Landmark: {{ order.address.landmark }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Order Note -->
            <section
              v-if="order.note"
              class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div class="flex gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600"
                >
                  <UIcon name="i-lucide-sticky-note" class="size-4" />
                </div>

                <div>
                  <h2 class="text-sm font-bold text-slate-900">Order Note</h2>

                  <p class="mt-1 text-sm leading-5 text-slate-500">
                    {{ order.note }}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
