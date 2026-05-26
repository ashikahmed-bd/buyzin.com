<script setup>
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const addressStore = useAddressStore();
const orderStore = useOrderStore();

const { $settings } = useNuxtApp();

definePageMeta({
  middleware: ["cart"],
});

const { items, coupon, subtotal, discount, shipping, tax, total } =
  storeToRefs(cartStore);

const { addresses } = storeToRefs(addressStore);

const shippings = ref([]);

const selectShipping = (shipping) => {
  form.shipping = shipping.slug;
  cartStore.shippingCost = Number(shipping.price);
};

const cart = computed(() => ({
  subtotal: subtotal.value,
  discount: discount.value,
  shipping: shipping.value,
  tax: tax.value,
  total: total.value,
}));

const selectedAddress = (address) => {
  form.address = address;
};

const form = reactive({
  address: "",
  shipping: "",
  payment_method: "",
  note: "",
});

const submit = async () => {
  if (!form.address) {
    toast.error("Please select a shipping address.");
    return;
  }

  if (!form.shipping) {
    toast.error("Please select a Choose Shipping.");
    return;
  }

  if (!form.payment_method) {
    toast.error("Please select a payment method.");
    return;
  }

  const payload = {
    subtotal: cart.value.subtotal,
    discount: cart.value.discount,
    shipping_cost: cart.value.shipping,
    tax: cart.value.tax,
    total: cart.value.total,
    items: items.value,
    coupon: coupon.value,

    address: form.address,
    payment_method: form.payment_method,
    note: form.note,
  };

  await orderStore.store(payload);
};

const loadShippings = async () => {
  const response = await checkoutStore.getShippings();
  shippings.value = response.data;
};

const loadAddress = async () => {
  await addressStore.all();
};

const addressDiolog = ref(false);

const address = reactive({
  type: "shipping",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "Bangladesh",
  default: true,
});

const addressSubmit = async () => {
  await addressStore.store(address);
  addressDiolog.value = false;
  await loadAddress();
};

onMounted(() => {
  loadAddress();
  loadShippings();
});
</script>

<template>
  <SeoMeta title="Checkout | Buyzin - Secure Payment & Fast Delivery in Bangladesh"
    description="Complete your purchase on Buyzin with a secure and easy checkout process. Pay online, review your order, and enjoy fast delivery across Bangladesh."
    keywords="checkout, secure payment, online shopping, ecommerce, Buyzin, Bangladesh, fast delivery, order review, complete purchase" />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Shipping Info -->
      <div class="bg-white rounded-xl md:col-span-2">
        <div class="flex items-center justify-between border-b p-4 py-4">
          <h6 class="text-n900 dark:text-n0 font-bold text-base">
            Shipping Address
          </h6>
        </div>

        <div class="p-4">
          <template v-if="addressStore.loading">
            <div class="p-4 border border-border rounded-xl animate-pulse">
              <div class="space-y-3">
                <div class="h-4 w-32 bg-gray-300/70 rounded"></div>

                <div class="h-3 w-48 bg-gray-300/60 rounded"></div>
                <div class="h-3 w-40 bg-gray-300/60 rounded"></div>

                <div class="h-3 w-52 bg-gray-300/60 rounded"></div>
                <div class="h-3 w-28 bg-gray-300/60 rounded"></div>

                <div class="h-3 w-36 bg-gray-300/60 rounded"></div>
              </div>
            </div>
          </template>

          <template v-else-if="addresses?.data?.length">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="address in addresses?.data" :key="address.id" @click="selectedAddress(address)" :class="[
                'flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all',
                address.id === form.address?.id
                  ? 'border-primary'
                  : 'border-border hover:border-primary',
              ]">
                <div class="w-full flex items-start justify-between">
                  <div>
                    <h4 class="text-body text-base font-semibold mb-1">
                      {{ address?.name }}
                    </h4>
                    <address>{{ address?.address }}</address>

                    <p class="text-body text-sm mb-1">
                      {{ address?.city }}, {{ address?.state }},{{
                        address?.postal_code
                      }}<br />
                      {{ address?.country }}
                    </p>
                    <p class="text-body text-sm">{{ address?.phone }}</p>
                  </div>

                  <div v-if="address.id === form.address.id" class="text-cyan-500">
                    <UIcon name="i-lucide-check" class="size-6" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="text-center py-10 flex flex-col items-center">
              <div class="bg-gray-100 p-4 rounded-full mb-3">
                <UIcon name="i-lucide-map-pin-off" class="size-8 text-gray-400" />
              </div>

              <h3 class="text-lg font-semibold text-gray-700">
                No Address Found
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                You haven’t added any shipping address yet.
              </p>

              <button type="button" @click="addressDiolog = true"
                class="mt-4 px-5 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition">
                Add Address
              </button>
            </div>
          </template>
        </div>

        <div class="p-4 rounded-xl mb-6">
          <h6 class="text-heading font-bold text-base mb-3">Choose Shipping</h6>

          <template v-if="Object.keys(shippings).length">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div v-for="shipping in shippings" :key="shipping.slug" @click="selectShipping(shipping)" :class="[
                'flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all',
                form.shipping === shipping.slug
                  ? 'bg-cyan-50 text-primary border-primary'
                  : 'border-border hover:border-primary',
              ]">
                <div class="flex items-start gap-3">
                  <div class="bg-primary text-white p-2 rounded">
                    <UIcon :name="shipping.icon" class="size-8" />
                  </div>

                  <div>
                    <h4 class="text-heading text-base font-semibold">
                      {{ shipping.name }}
                    </h4>
                    <p class="text-xs text-gray-500">
                      {{ shipping.description }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ shipping.delivery_time_label }} •
                      {{
                        shipping.is_free ? "Free" : $currency(shipping.price)
                      }}
                    </p>
                  </div>
                </div>

                <div v-if="form.shipping === shipping.slug" class="text-cyan-500">
                  <UIcon name="i-lucide-check" class="size-6" />
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div v-for="i in 2" :key="i"
                class="flex items-center justify-between p-4 rounded-lg border border-gray-200 animate-pulse bg-gray-50">
                <div class="flex items-start gap-3 w-full">
                  <div class="bg-gray-200 p-3 rounded w-12 h-12"></div>

                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-32"></div>
                    <div class="h-3 bg-gray-200 rounded w-48"></div>
                    <div class="h-3 bg-gray-200 rounded w-40"></div>
                  </div>
                </div>
                <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </template>
        </div>

        <div class="px-4 py-2">
          <div class="block mb-2">
            <label class="block mb-2 text-sm text-dark capitalize font-medium">Notes (Optional)</label>
            <textarea v-model="form.note"
              class="w-full px-4 py-2 text-sm rounded border border-border focus:border-primary focus:outline-none focus:outline-primary"></textarea>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="flex-none">
        <div class="bg-white rounded-xl">
          <div class="px-4 py-3 border-b border-border">
            <h3 class="text-lg font-semibold text-heading">Order Summary</h3>
          </div>

          <div class="relative overflow-x-auto p-4 divide-y divide-dashed space-y-4">
            <!-- Cart Items -->
            <div class="space-y-2 py-4">
              <div v-for="item in items" :key="item.id" class="flex items-center justify-between">
                <div class="w-full flex items-center gap-2">
                  <img :src="item.cover_url" class="w-12 h-12 object-cover rounded-md border" :alt="item.name" />
                  <div class="grow">
                    <span class="text-sm font-medium">{{ item.name }}</span>
                    <div class="flex flex-wrap text-sm">
                      <span class="after:content-['•'] after:mx-2 last:after:content-none">
                        Quantity: {{ item.quantity }}
                      </span>
                      <span class="after:content-['•'] after:mx-2 last:after:content-none">
                        Price: {{ $currency(item.price) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Gateways -->
            <div class="py-4">
              <div class="space-y-3">
                <ClientOnly>
                  <button type="button" v-for="gateway in $settings?.payment_gateways" :key="gateway?.id"
                    @click="form.payment_method = gateway.id" :class="[
                      'w-full flex items-center gap-3 p-4 rounded-xl border transition-all',
                      form.payment_method === gateway.id
                        ? 'border-cyan-500 bg-cyan-50 shadow'
                        : 'border-gray-300 hover:border-gray-400',
                    ]">
                    <NuxtImg :src="gateway?.logo_url" :alt="gateway.name" loading="eager"
                      class="w-10 h-10 object-contain" />
                    <span class="text-base font-medium">
                      {{ gateway.name }}
                    </span>

                    <UIcon v-if="form.payment_method === gateway.id" name="i-lucide-check-circle-2"
                      class="size-6 text-cyan-600 ml-auto" />
                  </button>
                </ClientOnly>
              </div>
            </div>

            <!-- Total -->
            <div class="space-y-3 py-4">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ $currency(cart.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Discount</span>
                <span>{{ $currency(cart.discount) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ $currency(cart.shipping) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ $currency(cart.tax) }}</span>
              </div>
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ $currency(cart.total) }}</span>
              </div>
              <BaseButton @click="submit" :disabled="!items?.length" :loading="orderStore.loading" class="w-full">
                Place
                Order
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Address Diolog -->
  <BaseDialog v-model="addressDiolog" title="Add Address">
    <template #body>
      <form @submit.prevent="addressSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect label="Type" v-model="address.type" :items="[
            { label: 'Billing', value: 'billing' },
            { label: 'Shipping', value: 'shipping' },
          ]" />

          <BaseInput label="Full Name" v-model="address.name" placeholder="Enter full name" :required="true" error="" />

          <BaseInput label="Phone Number" v-model="address.phone" placeholder="Enter Phone Number" :required="true"
            error="" />

          <BaseInput label="Address" v-model="address.address" placeholder="Enter Address" :required="true" error="" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput label="City" v-model="address.city" placeholder="Enter City" :required="true" error="" />

          <BaseInput label="State/Province" v-model="address.state" placeholder="Enter State / Province"
            :required="true" error="" />

          <BaseInput label="Postal Code" v-model="address.postal_code" placeholder="Enter Postal Code" :required="true"
            error="" />
        </div>

        <div class="flex items-center gap-2">
          <input v-model="address.default" type="checkbox" id="default" class="w-4 h-4 accent-primary" />
          <label for="default" class="text-sm">Set as default address</label>
        </div>

        <BaseButton :loading="addressStore.loading">Save Address</BaseButton>
      </form>
    </template>
  </BaseDialog>
</template>

<style scoped></style>
