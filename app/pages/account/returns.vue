<script setup>
const form = reactive({
  orderId: "",
  reason: "",
  condition: "",
  details: "",
  files: [],
});

const stats = [
  {
    label: "Total Returns",
    value: "12",
    description: "All return requests",
    icon: "i-lucide-package",
    iconClass: "bg-primary/10 text-primary",
  },
  {
    label: "Pending",
    value: "3",
    description: "Waiting for review",
    icon: "i-lucide-clock-3",
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Approved",
    value: "7",
    description: "Return approved",
    icon: "i-lucide-circle-check",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Refunded",
    value: "2",
    description: "Refund completed",
    icon: "i-lucide-wallet-cards",
    iconClass: "bg-violet-50 text-violet-600",
  },
];

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

const statusClasses = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Refunded: "bg-violet-50 text-violet-700 ring-violet-200",
  Rejected: "bg-red-50 text-red-700 ring-red-200",
};

const handleFiles = (event) => {
  form.files = Array.from(event.target.files || []);
};

const submitReturn = () => {
  console.log("Return request:", form);
};
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
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex items-center gap-4 rounded border border-border bg-white px-2.5 py-4"
          >
            <div
              class="flex size-14 shrink-0 items-center justify-center rounded-full"
              :class="stat.iconClass"
            >
              <UIcon :name="stat.icon" class="size-8" />
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-title">
                {{ stat.label }}
              </p>

              <p class="text-xl font-bold leading-5 text-title">
                {{ stat.value }}
              </p>

              <p class="text-xs text-body">
                {{ stat.description }}
              </p>
            </div>
          </div>
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
                    <option value="#ORD12345">#ORD12345</option>
                    <option value="#ORD12310">#ORD12310</option>
                    <option value="#ORD12280">#ORD12280</option>
                  </select>
                </div>

                <div class="form__group">
                  <label class="form__label"> Reason for Return </label>
                  <select v-model="form.reason" class="form__select">
                    <option value="">Select Reason</option>
                    <option value="defective">Defective product</option>
                    <option value="size">Size doesn't fit</option>
                    <option value="not-described">Not as described</option>
                    <option value="changed-mind">Changed my mind</option>
                  </select>
                </div>

                <div class="form__group">
                  <label class="form__label"> Item Condition </label>
                  <select v-model="form.condition" class="form__select">
                    <option value="">Select Condition</option>
                    <option value="new">New / Unused</option>
                    <option value="opened">Opened</option>
                    <option value="used">Used</option>
                    <option value="damaged">Damaged</option>
                  </select>
                </div>

                <div class="form__group">
                  <label class="form__label">
                    Additional Comments
                    <span class="font-normal text-slate-400"> (Optional) </span>
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
              <UIcon name="i-lucide-shield-check" class="size-4 text-primary" />
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
          <div class="border-b border-slate-100 px-3 py-2">
            <h2 class="text-xs font-semibold text-slate-900">
              Your Return Requests
            </h2>
          </div>

          <div class="w-full overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-slate-50">
                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Order ID
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Item
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Reason
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Status
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Refund Amount
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Requested On
                  </th>

                  <th
                    class="px-3 py-2 text-left text-sm font-semibold text-title"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-border">
                <tr
                  v-for="request in returnRequests"
                  :key="request.orderId"
                  class="transition hover:bg-slate-50/70"
                >
                  <td class="px-3 py-2 text-sm font-medium text-body">
                    {{ request.orderId }}
                  </td>

                  <td class="px-3 py-2">
                    <div class="flex items-center gap-2">
                      <img
                        :src="request.image"
                        :alt="request.item"
                        class="size-7 rounded border border-border object-cover"
                      />

                      <div>
                        <p class="text-sm font-medium text-body">
                          {{ request.item }}
                        </p>

                        <p class="text-sm text-body">
                          {{ request.variant }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-3 py-2 text-sm text-body">
                    {{ request.reason }}
                  </td>

                  <td class="px-3 py-2">
                    <span
                      class="inline-flex rounded px-1.5 py-0.5 text-sm text-body font-medium ring-1 ring-inset"
                      :class="statusClasses[request.status]"
                    >
                      {{ request.status }}
                    </span>
                  </td>

                  <td class="px-3 py-2 text-[9px] font-medium text-slate-700">
                    {{ request.refund }}
                  </td>

                  <td class="px-3 py-2 text-[9px] text-slate-500">
                    {{ request.date }}
                  </td>

                  <td class="px-3 py-2">
                    <NuxtLink
                      :to="`/account/returns/${request.orderId.replace('#', '')}`"
                      class="inline-flex h-6 items-center rounded border border-violet-200 px-2 text-[8px] font-medium text-violet-600 transition hover:bg-violet-50"
                    >
                      View Details
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </Dashboard>
</template>
