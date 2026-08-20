<script setup>
const returnStore = useReturnStore();

const {
  data: returns,
  pending,
  error,
  refresh,
} = await useAsyncData("returns", async () => {
  return await returnStore.getReturns();
});

const form = reactive({
  orderId: "",
  reason: "",
  condition: "",
  details: "",
  files: [],
});

const returnRequests = [
  {
    orderId: "#ORD12345",
    item: "Premium Cotton T-Shirt",
    variant: "Black / L",
    reason: "Size doesn't fit",
    status: "Pending",
    refund: "৳1,250",
    date: "Aug 18, 2026",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100",
  },
  {
    orderId: "#ORD12310",
    item: "Classic Sneakers",
    variant: "White / 42",
    reason: "Defective product",
    status: "Approved",
    refund: "৳2,890",
    date: "Aug 14, 2026",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
  },
  {
    orderId: "#ORD12280",
    item: "Casual Hoodie",
    variant: "Gray / M",
    reason: "Changed my mind",
    status: "Refunded",
    refund: "৳1,850",
    date: "Aug 10, 2026",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100",
  },
];

const submitReturn = () => {
  console.log("Return request:", form);
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="returns">
      <Head>
        <Title>My Orders | Buyzin</Title>
        <Meta
          name="description"
          content="Track and manage your Buyzin orders easily."
        />
        <Meta name="robots" content="noindex, nofollow" />
      </Head>

      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: ' My Account', to: '/account' },
          { label: 'Return & Refund' },
        ]"
        class="py-4 text-sm"
      />

      <div class="bg-white rounded-2xl px-4">
        <div class="mb-3 border-b border-border border-dashed py-2.5">
          <h2 class="text-lg font-semibold text-title">Return & Refund</h2>

          <p class="mt-1 text-sm text-body">
            Request return, track status and view refund details.
          </p>
        </div>

        <div class="space-y-5">
          <section class="mb-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <article
              class="flex items-center gap-4 rounded border border-border bg-white px-2.5 py-4"
            >
              <div
                class="bg-primary/10 text-primary flex size-14 shrink-0 items-center justify-center rounded-full"
              >
                <UIcon name="i-lucide-package" class="size-8" />
              </div>
              <div class="min-w-0">
                <h4 class="truncate text-sm font-medium text-title">
                  Total Returns
                </h4>
                <span class="text-xl font-bold leading-5 text-title">
                  {{ returns?.returns }}
                </span>
                <p class="text-xs text-body">All return requests</p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded border border-border bg-white px-2.5 py-4"
            >
              <div
                class="bg-amber-50 text-amber-600 flex size-14 shrink-0 items-center justify-center rounded-full"
              >
                <UIcon name="i-lucide-clock-3" class="size-8" />
              </div>
              <div class="min-w-0">
                <h4 class="truncate text-sm font-medium text-title">Pending</h4>
                <span class="text-xl font-bold leading-5 text-title">
                  {{ returns?.pending }}
                </span>
                <p class="text-xs text-body">Waiting for review</p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded border border-border bg-white px-2.5 py-4"
            >
              <div
                class="bg-emerald-50 text-emerald-600 flex size-14 shrink-0 items-center justify-center rounded-full"
              >
                <UIcon name="i-lucide-circle-check" class="size-8" />
              </div>
              <div class="min-w-0">
                <h4 class="truncate text-sm font-medium text-title">
                  Approved
                </h4>
                <span class="text-xl font-bold leading-5 text-title">
                  {{ returns?.approved }}
                </span>
                <p class="text-xs text-body">Return approved</p>
              </div>
            </article>

            <article
              class="flex items-center gap-4 rounded border border-border bg-white px-2.5 py-4"
            >
              <div
                class="bg-violet-50 text-violet-600 flex size-14 shrink-0 items-center justify-center rounded-full"
              >
                <UIcon name="i-lucide-wallet-cards" class="size-8" />
              </div>
              <div class="min-w-0">
                <h4 class="truncate text-sm font-medium text-title">
                  Refunded
                </h4>
                <span class="text-xl font-bold leading-5 text-title">
                  {{ returns?.refunded }}
                </span>
                <p class="text-xs text-body">Refund completed</p>
              </div>
            </article>
          </section>

          <section
            class="grid rounded border border-border bg-white lg:grid-cols-[1.45fr_1fr]"
          >
            <div class="px-4 py-4">
              <div class="mb-3 flex items-start gap-2.5">
                <div
                  class="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-package" class="size-4" />
                </div>

                <div class="w-full">
                  <h2 class="text-sm font-semibold text-title">
                    Request a Return
                  </h2>

                  <p class="text-sm text-body">
                    Fill the form below to request a return for your order.
                  </p>
                </div>
              </div>

              <form @submit.prevent="submitReturn" class="space-y-4">
                <div class="grid gap-2.5 sm:grid-cols-2">
                  <div class="form__group">
                    <label class="form__label"> Order ID </label>
                    <select v-model="form.orderId" class="form__select">
                      <option value="">Select Order</option>
                    </select>
                  </div>

                  <div class="form__group">
                    <label class="form__label">Reason for Return</label>

                    <select v-model="form.reason" class="form__select">
                      <option value="">Select Reason</option>
                      <option value="Defective Product">
                        Defective Product
                      </option>
                      <option value="Wrong Item">Wrong Item</option>
                      <option value="Missing Item">Missing Item</option>
                      <option value="Not as Described">Not as Described</option>
                      <option value="Quality Issue">Quality Issue</option>
                      <option value="Changed My Mind">Changed My Mind</option>
                      <option value="Ordered by Mistake">
                        Ordered by Mistake
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="form__group">
                    <label class="form__label">Item Condition</label>

                    <select v-model="form.condition" class="form__select">
                      <option value="">Select Condition</option>
                      <option value="Unused">Unused</option>
                      <option value="Opened">Opened</option>
                      <option value="Used">Used</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Defective">Defective</option>
                      <option value="Missing Parts">Missing Parts</option>
                    </select>
                  </div>

                  <div class="form__group">
                    <label class="form__label">
                      Additional Comments
                      <span class="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      v-model="form.details"
                      rows="2"
                      placeholder="Write any additional details..."
                      class="form__control"
                    />
                  </div>
                </div>

                <div class="form__group">
                  <label class="form__label">
                    Upload Images
                    <span class="font-normal text-slate-400"> (Optional) </span>
                  </label>

                  <UFileUpload
                    label="Drop your image here"
                    description="SVG, PNG, JPG or GIF (max. 2MB)"
                    class="min-h-40"
                  />
                </div>

                <BaseButton>Submit Request</BaseButton>
              </form>
            </div>

            <div class="bg-slate-100 p-4">
              <div class="mb-3 flex items-center gap-2">
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-4 text-primary"
                />
                <h2 class="text-sm font-semibold text-primary">
                  Return & Refund Policy
                </h2>
              </div>

              <div class="space-y-3">
                <div class="flex gap-2.5">
                  <div
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-primary"
                  >
                    <UIcon name="i-lucide-calendar-days" class="size-5" />
                  </div>

                  <div>
                    <h4 class="text-xs font-semibold text-title">
                      Return Window
                    </h4>
                    <p class="mt-0.5 text-xs leading-4 text-body">
                      You can request a return within 7 days of delivery.
                    </p>
                  </div>
                </div>

                <div class="flex gap-2.5">
                  <div
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-primary"
                  >
                    <UIcon name="i-lucide-box" class="size-5" />
                  </div>

                  <div>
                    <h4 class="text-xs font-semibold text-title">
                      Item Condition
                    </h4>

                    <p class="mt-0.5 text-xs leading-4 text-body">
                      Items must be unused, unwashed and in original packaging.
                    </p>
                  </div>
                </div>

                <div class="flex gap-2.5">
                  <div
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-primary"
                  >
                    <UIcon name="i-lucide-circle-dollar-sign" class="size-5" />
                  </div>

                  <div>
                    <h4 class="text-xs font-semibold text-title">
                      Refund Process
                    </h4>

                    <p class="mt-0.5 text-xs leading-4 text-body">
                      Refunds are processed within 5-7 business days after we
                      receive the returned item.
                    </p>
                  </div>
                </div>

                <div class="flex gap-2.5">
                  <div
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-primary"
                  >
                    <UIcon name="i-lucide-info" class="size-5" />
                  </div>

                  <div>
                    <h4 class="text-xs font-semibold text-title">Exceptions</h4>
                    <p class="mt-0.5 text-xs leading-4 text-body">
                      Certain items like intimate wear, gift cards are
                      non-returnable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="overflow-hidden rounded-md border border-border bg-white py-4"
          >
            <div class="border-b border-border px-3 py-2">
              <h2 class="text-base font-semibold text-title">
                Your Return Requests
              </h2>
            </div>

            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Order ID</th>
                    <th>Item</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Requested On</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="request in returns.data" :key="request.id">
                    <td>{{ request.ref }}</td>
                    <td>{{ request.order?.order_no }}</td>

                    <td>
                      <div
                        v-for="item in request.items"
                        :key="item.id"
                        class="flex items-center gap-2"
                      >
                        <img
                          :src="item.cover_url"
                          :alt="item.name"
                          class="size-8 rounded border border-border object-cover"
                        />

                        <div class="min-w-0">
                          <p
                            class="max-w-48 truncate text-sm font-medium text-body"
                          >
                            {{ item.name }}
                          </p>

                          <p class="text-xs text-muted">
                            Qty: {{ item.quantity }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      {{ request.reason }}
                    </td>

                    <td>
                      <span
                        class="inline-flex items-center rounded px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset"
                        :class="{
                          'bg-amber-50 text-amber-700 ring-amber-200':
                            request.status === 'pending',

                          'bg-emerald-50 text-emerald-700 ring-emerald-200':
                            request.status === 'approved',

                          'bg-violet-50 text-violet-700 ring-violet-200':
                            request.status === 'refunded',

                          'bg-red-50 text-red-700 ring-red-200':
                            request.status === 'rejected',
                        }"
                      >
                        {{ request.status }}
                      </span>
                    </td>

                    <td>
                      ৳{{
                        request.items
                          ?.reduce(
                            (total, item) =>
                              total + Number(item.amount) * item.quantity,
                            0,
                          )
                          .toFixed(2)
                      }}
                    </td>

                    <td>
                      {{ new Date(request.created_at).toLocaleDateString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </template>

    <EmptyState v-else />
  </Dashboard>
</template>
