<script setup>
const orderStore = useOrderStore();

const page = ref(1);

const {
  data: orders,
  pending,
  error,
  refresh,
} = await useAsyncData("orders", async () => {
  return await orderStore.getOrders(page.value);
});
</script>

<template>
  <Dashboard>
    <Head>
      <Title>My Orders | Buyzin</Title>
      <Meta
        name="description"
        content="Track and manage your Buyzin orders easily."
      />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="orders">
      <div class="bg-white rounded-2xl px-4">
        <div class="mb-3 border-b border-border border-dashed py-2.5">
          <h2 class="text-lg font-semibold text-title">My Orders</h2>

          <p class="mt-1 text-sm text-body">
            Track and manage all your orders in one place.
          </p>
        </div>

        <div class="space-y-3">
          <article
            v-for="order in orders.data"
            :key="order.id"
            class="group rounded-xl border border-border border-dashed bg-white p-4 transition hover:border-primary/30"
          >
            <div
              class="flex flex-col gap-3 border-b border-dashed border-border sm:flex-row sm:items-center sm:justify-between py-2"
            >
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-sm font-bold text-heading">
                    #{{ order.order_no }}
                  </h3>

                  <span
                    class="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600"
                  >
                    {{ order.items_count }} items
                  </span>
                </div>

                <p class="mt-1 text-xs text-body">
                  {{ order.timestamps?.placed_at }}
                </p>
              </div>

              <span
                class="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold capitalize text-primary"
              >
                {{ order.status }}
              </span>
            </div>

            <div
              class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div
                class="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:items-center sm:gap-8"
              >
                <div>
                  <p
                    class="text-xs font-medium uppercase tracking-wide text-body"
                  >
                    Payment
                  </p>
                  <p class="mt-0.5 text-sm font-semibold capitalize text-body">
                    {{ order.payment_method }}
                  </p>
                </div>

                <div>
                  <p
                    class="text-xs font-medium uppercase tracking-wide text-body"
                  >
                    Payment Status
                  </p>
                  <p
                    class="mt-0.5 text-sm font-semibold capitalize text-green-600"
                  >
                    {{ order.payment_status }}
                  </p>
                </div>

                <div>
                  <p
                    class="text-xs font-medium uppercase tracking-wide text-body"
                  >
                    Customer
                  </p>
                  <p
                    class="mt-0.5 max-w-40 truncate text-sm font-semibold text-body"
                  >
                    {{ order.user?.name ?? order.contact?.name }}
                  </p>
                </div>
              </div>

              <div class="sm:text-right">
                <p
                  class="text-xs font-medium uppercase tracking-wide text-body"
                >
                  Total
                </p>

                <p class="mt-0.5 text-lg font-bold text-heading">
                  {{ order.total_formatted }}
                </p>
              </div>
            </div>

            <div
              class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="">
                <h4 class="text-sm font-semibold text-body">
                  {{ order.contact?.name || "—" }}
                </h4>

                <address class="text-xs leading-5 text-body">
                  {{ order.contact?.address || "—" }},
                  {{ order.contact?.city || "—" }},
                  {{ order.contact?.state || "—" }}
                  {{ order.contact?.postcode || "" }},
                  {{ order.contact?.country || "" }}
                </address>

                <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-body">
                  <span v-if="order.contact?.phone">
                    {{ order.contact.phone }}
                  </span>

                  <span v-if="order.contact?.email">
                    {{ order.contact.email }}
                  </span>
                </div>
              </div>

              <a
                :href="`/account/orders/${order.id}`"
                class="inline-flex items-center justify-center rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90"
              >
                View Details
              </a>
            </div>
          </article>

          <div class="py-4">
            <UPagination
              v-model:page="page"
              show-edges
              :sibling-count="1"
              :total="orders?.meta?.total"
              :items-per-page="orders?.meta?.per_page"
            />
          </div>
        </div>
      </div>
    </template>

    <EmptyState v-else />
  </Dashboard>
</template>
