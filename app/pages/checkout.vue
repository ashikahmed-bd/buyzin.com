<script setup>
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const shippingStore = useShippingStore();
const addressStore = useAddressStore();

const {
  data: cart,
  pending,
  error,
  refresh,
} = await useAsyncData("checkout", async () => {
  return await cartStore.getItems();
});

const { data: addresses } = await useAsyncData("addresses", async () => {
  return await addressStore.all();
});

const goToCart = () => {
  return navigateTo("/cart");
};

const editAddress = (address) => {
  console.log("Edit address:", address);
};

const form = reactive({
  address_id: null,
  method: "cod",
  note: null,
});

const calculateShipping = async (address) => {
  if (!address) return;

  form.address_id = address;

  await shippingStore.calculate(address);

  await refresh();
};

const business = reactive({
  name: "",
  contact_person: "",
  phone: "",
  email: "",
  business_type: "",
  bin: "",
});

const submit = async () => {
  if (!form.address_id) {
    return;
  }

  await checkoutStore.placeOrder(form);
};
</script>

<template>
  <main class="container mx-auto">
    <Head>
      <Title>
        Checkout | Buyzin - Secure Payment & Fast Delivery in Bangladesh
      </Title>

      <Meta
        name="description"
        content="Complete your order securely. Review billing details, shipping address, and choose a payment method."
      />

      <Meta name="robots" content="noindex, nofollow" />
      <Meta name="referrer" content="no-referrer-when-downgrade" />
    </Head>

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!cart" />

    <template v-else>
      <div class="px-4 py-6">
        <div class="mb-6">
          <h1 class="mt-1 text-xl font-semibold tracking-tight text-title">
            Complete your order
          </h1>

          <p class="mt-1 text-body">
            Review your business, delivery and payment information.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div class="space-y-5 lg:col-span-8">
            <section class="rounded-xl bg-white p-4">
              <div class="mb-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
                  >
                    <UIcon name="i-lucide-building-2" class="h-5 w-5" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-title">
                      Business Information
                    </h2>

                    <p class="text-sm text-slate-500">
                      Your registered business details
                    </p>
                  </div>
                </div>

                <NuxtLink
                  to="/account/profile"
                  class="text-sm font-medium text-primary transition"
                >
                  Edit Profile
                </NuxtLink>
              </div>

              <div
                class="grid grid-cols-1 gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2 md:grid-cols-3"
              >
                <BaseInput
                  v-model="business.name"
                  label="Business Name"
                  placeholder="Enter business name"
                  :required="true"
                  error=""
                />

                <BaseInput
                  v-model="business.contact_person"
                  label="Contact Person"
                  placeholder="Enter contact person"
                  :required="true"
                  error=""
                />

                <BaseInput
                  v-model="business.phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  :required="true"
                  error=""
                />

                <BaseInput
                  v-model="business.email"
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  :required="true"
                  error=""
                />

                <BaseInput
                  v-model="business.business_type"
                  label="Business Type"
                  placeholder="Enter business type"
                  :required="true"
                  error=""
                />

                <BaseInput
                  v-model="business.bin"
                  label="Tax ID (BIN)"
                  placeholder="Enter BIN"
                  error=""
                />
              </div>
            </section>

            <section class="rounded-xl bg-white p-4">
              <div class="mb-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
                  >
                    <UIcon name="i-lucide-truck" class="h-5 w-5" />
                  </div>

                  <div>
                    <h2 class="font-semibold text-title">
                      Shipping Information
                    </h2>

                    <p class="text-sm text-slate-500">
                      Choose where your order should be delivered
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <label
                  v-for="address in addresses.data"
                  :key="address.id"
                  :class="[
                    'block cursor-pointer rounded-xl border-2 p-4 transition',
                    form.address_id === address.id
                      ? 'border-primary bg-blue-50/30'
                      : 'border-slate-200 hover:border-primary',
                  ]"
                >
                  <div class="flex gap-3">
                    <input
                      v-model="form.address_id"
                      @change="calculateShipping(form.address_id)"
                      type="radio"
                      name="address"
                      :value="address.id"
                      class="mt-1 h-4 w-4"
                    />

                    <div class="min-w-0 flex-1">
                      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <div class="flex items-center gap-2">
                            <h3 class="font-semibold capitalize text-body">
                              {{ address.type }}
                            </h3>

                            <span
                              v-if="address.default"
                              class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
                            >
                              Default
                            </span>
                          </div>

                          <p class="mt-2 text-sm leading-5 text-body">
                            {{ address.address }}
                          </p>

                          <p class="mt-1 text-sm text-slate-500">
                            {{ address.area }}, {{ address.city }},
                            {{ address.state }}
                          </p>

                          <p class="mt-1 text-sm text-slate-500">
                            {{ address.country }}
                          </p>
                        </div>

                        <div class="relative">
                          <p class="font-semibold capitalize text-body">
                            {{ address.name }}
                          </p>

                          <p class="mt-1 text-sm text-slate-500">
                            {{ address.phone }}
                          </p>

                          <button
                            type="button"
                            class="absolute right-0 top-0 text-sm font-medium text-primary"
                            @click.prevent="editAddress(address)"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>

                <button
                  type="button"
                  class="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm font-medium text-primary transition hover:border-primary"
                >
                  <UIcon name="i-lucide-plus" class="h-4 w-4" />
                  Add New Address
                </button>
              </div>
            </section>
          </div>

          <aside class="self-start lg:col-span-4">
            <div class="sticky top-4">
              <section class="overflow-hidden rounded-xl bg-white">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h2 class="text-base font-semibold text-title">
                        Order Summary
                      </h2>

                      <p class="mt-1 text-sm text-slate-500">
                        <span class="after:mx-2 after:content-['·']">
                          {{ cartStore?.itemCount }} items
                        </span>

                        {{ cartStore?.totalItems }} pcs
                      </p>
                    </div>

                    <button
                      type="button"
                      @click="goToCart"
                      class="rounded px-2 py-1 text-sm font-medium text-primary transition"
                    >
                      Edit Cart
                    </button>
                  </div>
                </div>

                <div class="max-h-60 space-y-2.5 overflow-y-auto scrollbar">
                  <article
                    v-for="item in cart?.items"
                    :key="item.id"
                    class="flex gap-3 rounded-xl bg-slate-50/70 transition p-2.5"
                  >
                    <div
                      class="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <NuxtImg
                        :src="item.product?.cover_url"
                        :alt="item.product?.name"
                        class="size-full object-contain"
                      />
                    </div>

                    <div class="min-w-0 flex-1">
                      <h3
                        class="truncate text-sm font-semibold leading-5 text-body"
                      >
                        {{ item.product?.name }}
                      </h3>

                      <div class="mt-1 flex flex-wrap items-center gap-x-2">
                        <p class="text-xs text-slate-500">
                          SKU:
                          <strong class="font-medium text-body">{{
                            item.product?.sku
                          }}</strong>
                        </p>

                        <template v-if="item.variant?.options?.length">
                          <p class="text-xs text-slate-500">
                            <span
                              v-for="(option, index) in item.variant.options"
                              :key="`${option.attribute}-${option.option}`"
                            >
                              {{ option.attribute }}:

                              <strong class="font-medium text-body">
                                {{ option.option }}
                              </strong>

                              <span
                                v-if="index < item.variant.options.length - 1"
                                class="mx-1 text-body"
                              >
                                ·
                              </span>
                            </span>
                          </p>
                        </template>
                      </div>

                      <div class="mt-2 flex items-center justify-between gap-2">
                        <span class="text-xs font-medium text-body">
                          {{ $currency(item.unit_price) }}
                          ×
                          {{ item.quantity }}
                        </span>

                        <span class="text-sm font-semibold text-body">
                          {{ $currency(item.total) }}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>

                <div class="space-y-4 px-4 py-6">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-body"> Subtotal </span>

                      <span class="text-sm font-medium text-body">
                        {{ $currency(cart.subtotal, cart.currency) }}
                      </span>
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-sm text-body"> Shipping Charge </span>

                      <span class="text-sm font-medium text-body">
                        {{ $currency(cart.shipping, cart.currency) }}
                      </span>
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-sm text-body"> VAT </span>

                      <span class="text-sm font-medium text-body">
                        {{ $currency(cart.tax, cart.currency) }}
                      </span>
                    </div>

                    <div class="flex items-center justify-between">
                      <span class="text-sm text-body"> Discount </span>

                      <span
                        class="text-sm font-medium"
                        :class="
                          cart.discount > 0
                            ? 'text-emerald-600'
                            : 'text-slate-800'
                        "
                      >
                        {{ $currency(cart.discount, cart.currency) }}
                      </span>
                    </div>
                  </div>

                  <div
                    class="flex items-center justify-between rounded border border-border border-dashed px-4 py-3"
                  >
                    <div>
                      <p class="text-sm font-semibold text-title">
                        Total Amount
                      </p>

                      <p class="mt-0.5 text-xs text-slate-500">
                        Including VAT & shipping
                      </p>
                    </div>

                    <span class="text-xl font-bold tracking-tight text-primary">
                      {{ $currency(cart.total, cart.currency) }}
                    </span>
                  </div>
                </div>

                <div class="px-5 py-4">
                  <div class="mb-4 flex items-center gap-3">
                    <div
                      class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
                    >
                      <UIcon name="i-lucide-credit-card" class="size-5" />
                    </div>

                    <div>
                      <h2 class="text-sm font-semibold text-title">
                        Payment Method
                      </h2>

                      <p class="mt-0.5 text-xs text-slate-500">
                        Choose how you want to pay
                      </p>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label
                      class="flex cursor-pointer items-stretch gap-3 rounded-xl border p-3 transition"
                    >
                      <input
                        v-model="form.method"
                        type="radio"
                        name="payment"
                        value="cod"
                        class="size-4"
                      />
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-title">
                          Cash on Delivery (COD)
                        </p>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                          Available for approved business accounts only.
                        </p>
                      </div>
                    </label>

                    <label
                      class="flex cursor-pointer items-stretch gap-3 rounded-xl border p-3 transition"
                    >
                      <input
                        v-model="form.method"
                        type="radio"
                        name="payment"
                        value="bank"
                        class="size-4"
                      />
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-title">
                          Bank Transfer (B2B)
                        </p>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                          Pay via bank transfer. Our team will confirm manually.
                        </p>
                      </div>
                    </label>

                    <button
                      type="button"
                      :disabled="checkoutStore.loading"
                      @click="submit"
                      class="flex w-full items-center justify-center rounded bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <UIcon
                        v-if="checkoutStore.loading"
                        name="i-lucide-loader"
                        class="mr-2 size-4 animate-spin"
                      />

                      <span>
                        {{
                          checkoutStore.loading
                            ? "Placing Order..."
                            : "Place Order"
                        }}
                      </span>

                      <UIcon
                        v-if="!checkoutStore.loading"
                        name="i-lucide-arrow-right"
                        class="ml-2 size-4"
                      />
                    </button>
                    <p class="mt-2 text-center text-xs text-slate-400">
                      By placing this order, you agree to our terms and
                      conditions.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </main>
</template>
