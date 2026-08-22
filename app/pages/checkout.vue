<script setup>
const { getLocation } = useLocation();

const cartStore = useCartStore();
const giftCardStore = useGiftCardStore();

const { data, pending, error, refresh } = await useAsyncData(
  "checkout",
  async () => {
    return await cartStore.getItems();
  },
);

const form = reactive({
  name: "",
  phone: "",
  country: "BD",
  state: "",
  city: "",
  area: "",
  address: "",
  note: "",
  payment_method: "",
});

const giftCard = reactive({
  code: giftCardStore?.giftCard?.code ?? "",
});

const applyGiftCard = async () => {
  if (!giftCard.code.trim()) return;

  await giftCardStore.apply(giftCard.code, cartStore.total);
  await refresh();
};

const removeGiftCard = async () => {
  if (confirm("Are you sure you want to remove this gift card?")) {
    await giftCardStore.remove();
    await refresh();
  }
};

const submit = async () => {
  const location = await getLocation();

  const payload = {
    name: form.name,
    phone: form.phone,
    address: form.address,
    city: form.city,
    state: form.state,
    postcode: form.postcode,
    country: form.country,
    latitude: location.latitude,
    longitude: location.longitude,
    note: form.note,
    payment_method: form.payment_method,
  };

  await cartStore.checkout(payload);
};

// watch(
//   () => form.country,
//   async () => {
//     await cartStore.getShippingCost({
//       country: form.country,
//     });

//     await refresh();
//   },
//   { immediate: true },
// );

watch(
  () => giftCardStore?.giftCard?.code,
  (code) => {
    giftCard.code = code ?? "";
  },
  { immediate: true },
);
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-4">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!data" />

    <template v-else>
      <Head>
        <Title
          >Checkout | Buyzin - Secure Payment & Fast Delivery in
          Bangladesh</Title
        >
        <Meta
          name="description"
          content="Complete your order securely. Review billing details, shipping address, and choose a payment method."
        />
        <Meta name="robots" content="noindex, nofollow" />
        <Meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-xl border border-border overflow-hidden">
            <div class="border-b px-5 py-4">
              <h6 class="font-semibold text-lg">Shipping Address</h6>
            </div>

            <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-2 text-sm font-medium">
                  Full Name *
                </label>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium">
                  Phone Number *
                </label>

                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>

              <BaseSelect
                label="Country"
                v-model="form.country"
                :items="[
                  {
                    name: 'Bangladesh',
                    id: 'BD',
                  },
                ]"
                placeholder="Select country"
                :required="true"
                error=""
              />

              <BaseInput
                label="State / Province"
                v-model="form.state"
                placeholder="e.g. Dhaka Division"
                :required="true"
                error=""
              />

              <BaseInput
                label="City"
                v-model="form.city"
                placeholder="e.g. Dhaka"
                :required="true"
                error=""
              />

              <BaseInput
                label="Area"
                v-model="form.area"
                placeholder="e.g. Dhaka"
                :required="true"
                error=""
              />

              <BaseInput
                label="Address"
                v-model="form.address"
                placeholder="e.g. House, Road, Area, Thana"
                :required="true"
                error=""
              />

              <BaseInput
                label="Notes"
                v-model="form.note"
                placeholder="Additional delivery instructions (optional)"
                :required="false"
                error=""
              />
            </div>
          </div>

          <div class="bg-white rounded-xl border border-border overflow-hidden">
            <div class="border-b px-5 py-4">
              <h6 class="font-semibold text-lg">Payment Method</h6>
            </div>

            <div class="p-5 space-y-3">
              <label
                class="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary"
              >
                <span>Cash on Delivery</span>
                <input v-model="form.payment_method" type="radio" value="cod" />
              </label>

              <label
                class="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary"
              >
                <span>BKash</span>
                <input
                  v-model="form.payment_method"
                  type="radio"
                  value="bkash"
                />
              </label>
            </div>
          </div>
        </div>

        <aside>
          <div class="bg-white rounded-xl border border-border sticky top-24">
            <div class="border-b p-4">
              <h6 class="font-semibold text-lg">Order Summary</h6>
            </div>

            <div class="space-y-2 p-4">
              <div
                v-for="item in data?.items"
                :key="item.id"
                class="flex items-center justify-between"
              >
                <div class="w-full flex items-center gap-2">
                  <NuxtImg
                    :src="item.cover_url"
                    :alt="item.name"
                    class="w-12 h-12 object-cover rounded border"
                  />

                  <div class="grow">
                    <h2 class="text-sm font-medium line-clamp-1">
                      {{ item.name }}
                    </h2>
                    <span class="text-sm">
                      {{ item.price }}x {{ item.quantity }}
                    </span>
                    <div
                      v-if="item.variant"
                      class="flex flex-wrap gap-2 text-xs text-gray-600"
                    >
                      <span
                        v-for="(value, key) in item.variant.options"
                        :key="key"
                        class="px-2 py-0.5 bg-gray-100 rounded-md"
                      >
                        {{ key }}: {{ value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t p-4">
              <div class="space-y-2">
                <div class="form__group">
                  <label class="text-sm font-medium text-title">
                    Gift Card <span class="text-danger">*</span>
                  </label>
                  <div class="flex">
                    <input
                      type="text"
                      v-model="giftCard.code"
                      placeholder="Enter gift card code"
                      class="border px-3 py-2 text-sm rounded-l w-full focus:outline-none"
                    />

                    <button
                      type="button"
                      @click="applyGiftCard"
                      :disabled="giftCardStore.loading"
                      class="bg-primary text-white flex items-center gap-2.5 px-4 text-sm rounded-r"
                    >
                      <UIcon
                        v-if="giftCardStore.loading"
                        name="i-lucide-loader"
                        class="size-5 animate-spin"
                      />
                      <span>{{
                        giftCardStore.loading ? "Applying" : "Apply"
                      }}</span>
                    </button>
                  </div>
                </div>

                <div
                  v-if="giftCardStore.giftCard"
                  class="flex items-center justify-between gap-3 rounded border border-success/20 bg-success/5 p-2.5"
                >
                  <div class="min-w-0">
                    <p class="text-xs text-body">
                      {{ giftCardStore?.giftCard?.title }}
                    </p>
                    <p class="truncate text-sm font-medium text-title">
                      {{ giftCardStore?.giftCard?.code }}
                    </p>
                  </div>

                  <div class="flex shrink-0 items-center gap-3">
                    <span class="text-sm font-semibold text-success">
                      - {{ data?.gift_card_formatted }}
                    </span>

                    <button
                      type="button"
                      class="text-xs text-danger hover:underline disabled:opacity-50"
                      :disabled="giftCardStore.loading"
                      @click="removeGiftCard"
                    >
                      {{ giftCardStore.loading ? "Removing..." : "Remove" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t p-4 space-y-3">
              <div class="space-y-2.5 text-sm">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ data?.subtotal_formatted }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Shipping</span>
                  <span>{{ data?.shipping_formatted }}</span>
                </div>

                <div class="flex justify-between">
                  <span>Tax</span>
                  <span>{{ data?.tax_formatted }}</span>
                </div>

                <div class="flex justify-between text-danger">
                  <span>Discount</span>
                  <span>- {{ data?.discount_formatted }}</span>
                </div>

                <div class="flex items-center justify-between text-success">
                  <span> Gift Card </span>
                  <span> - {{ data?.gift_card_formatted }} </span>
                </div>

                <div class="flex justify-between font-semibold text-lg pt-3">
                  <span>Total</span>
                  <span>{{ data?.total_formatted }}</span>
                </div>
              </div>

              <BaseButton
                class="w-full"
                :disabled="!data?.items?.length"
                :loading="cartStore.loading"
                @click="submit"
              >
                Place Order
              </BaseButton>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </main>
</template>
