<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const cartStore = useCartStore();
const orderStore = useOrderStore();

definePageMeta({
  middleware: ["cart"],
});

const { data: cart, pending, refresh } = await useAsyncData("checkout", async () => {
  return await cartStore.getItems();
});

const form = reactive({
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "Bangladesh",
  note: "",
  payment_method: "",
});

const submit = async () => {
  if (!form.name) {
    toast.error("Please enter your name.");
    return;
  }

  if (!form.phone) {
    toast.error("Please enter your phone number.");
    return;
  }

  if (!form.address) {
    toast.error("Please enter your address.");
    return;
  }

  if (!form.city) {
    toast.error("Please enter your city.");
    return;
  }

  if (!form.state) {
    toast.error("Please enter your State / Province.");
    return;
  }

  if (!form.payment_method) {
    toast.error("Please select a payment method.");
    return;
  }

  const payload = {
    name: form.name,
    phone: form.phone,
    address: form.address,
    city: form.city,
    state: form.state,
    postal_code: form.postal_code,
    country: form.country,
    note: form.note,
    payment_method: form.payment_method,
  };

  try {
    const response = await orderStore.store(payload);

    cartStore.$reset();

    if (response?.success) {
      toast.success(response.message);

      await refresh();

      // Online payment gateway redirect
      if (response?.data?.redirect_url) {
        return navigateTo(response.data.redirect_url, {
          external: true,
        });
      }

      // Order success page
      if (response?.data?.order_number) {
        return navigateTo(`/orders/${response.data.order_number}`);
      }

      return navigateTo("/orders");
    }

    toast.error(response?.message);
  } catch (error) {
    toast.error(
      error?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again."
    );
  }
};

useSchemaOrg([
  defineWebPage({
    name: "Secure Checkout",
    description:
      "Complete your purchase securely. Enter shipping details, choose a payment method, and place your order online.",
    url: new URL(route.fullPath, config.public.siteUrl).toString(),
    inLanguage: "en-US",
  }),

  defineBreadcrumb({
    items: [
      {
        name: "Home",
        item: "/",
      },
      {
        name: "Checkout",
        item: route.fullPath,
      },
    ],
  }),
]);
</script>

<template>
  <SeoMeta title="Checkout | Buyzin - Secure Payment & Fast Delivery in Bangladesh"
    description="Complete your purchase on Buyzin with a secure and easy checkout process. Pay online, review your order, and enjoy fast delivery across Bangladesh."
    keywords="checkout, secure payment, online shopping, ecommerce, Buyzin, Bangladesh, fast delivery, order review, complete purchase" />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <div v-if="pending" class="py-20 text-center">
      Loading...
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Shipping Address -->
        <div class="bg-white rounded-xl border border-border overflow-hidden">
          <div class="border-b px-5 py-4">
            <h6 class="font-semibold text-lg">
              Shipping Address
            </h6>
          </div>

          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 text-sm font-medium">
                Full Name *
              </label>

              <input v-model="form.name" type="text" placeholder="Enter your full name"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                Phone Number *
              </label>

              <input v-model="form.phone" type="tel" placeholder="01XXXXXXXXX"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div class="md:col-span-2">
              <label class="block mb-2 text-sm font-medium">
                Address *
              </label>

              <input v-model="form.address" type="text" placeholder="House, Road, Area, Thana"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                City *
              </label>

              <input v-model="form.city" type="text" placeholder="e.g. Dhaka"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                State / Province
              </label>

              <input v-model="form.state" type="text" placeholder="e.g. Dhaka Division"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                Postal Code
              </label>

              <input v-model="form.postal_code" type="text" placeholder="e.g. 1207"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                Country
              </label>

              <input v-model="form.country" type="text" placeholder="Bangladesh"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div class="md:col-span-2">
              <label class="block mb-2 text-sm font-medium">
                Notes
              </label>

              <input v-model="form.note" type="text" placeholder="Additional delivery instructions (optional)"
                class="w-full rounded-lg border border-border px-4 py-3 focus:border-primary focus:outline-none" />
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white rounded-xl border border-border overflow-hidden">
          <div class="border-b px-5 py-4">
            <h6 class="font-semibold text-lg">
              Payment Method
            </h6>
          </div>

          <div class="p-5 space-y-3">
            <label class="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary">
              <span>Cash on Delivery</span>

              <input v-model="form.payment_method" type="radio" value="cod" />
            </label>

            <label class="flex items-center justify-between border rounded-lg p-4 cursor-pointer hover:border-primary">
              <span>bKash / Nagad</span>

              <input v-model="form.payment_method" type="radio" value="online" />
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <aside>
        <div class="bg-white rounded-xl border border-border sticky top-24">
          <div class="border-b p-4">
            <h6 class="font-semibold text-lg">
              Order Summary
            </h6>
          </div>

          <div class="space-y-2 p-4">
            <div v-for="item in cart?.items" :key="item.id" class="flex items-center justify-between">
              <div class="w-full flex items-center gap-2">
                <NuxtImg :src="item.cover_url" :alt="item.name" class="w-12 h-12 object-cover rounded border" />

                <div class="grow">
                  <h2 class="text-sm font-medium">
                    {{ item.name }}
                  </h2>

                  <div v-if="item.variant" class="flex flex-wrap gap-2 text-xs text-gray-600">
                    <span v-for="(value, key) in item.variant.options" :key="key"
                      class="px-2 py-0.5 bg-gray-100 rounded-md">
                      {{ key }}: {{ value }}
                    </span>
                  </div>
                </div>

                <span class="text-sm">
                  × {{ item.quantity }}
                </span>
              </div>
            </div>
          </div>

          <div class="border-t p-4 space-y-3">
            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ cart?.subtotal_formatted }}</span>
              </div>

              <div class="flex justify-between">
                <span>Shipping</span>
                <span>{{ cart?.shipping_formatted }}</span>
              </div>

              <div class="flex justify-between">
                <span>Tax</span>
                <span>{{ cart?.tax_formatted }}</span>
              </div>

              <div class="flex justify-between text-success">
                <span>Discount</span>
                <span>{{ cart?.discount_formatted }}</span>
              </div>

              <div class="flex justify-between font-semibold text-lg pt-3">
                <span>Total</span>
                <span>{{ cart?.total_formatted }}</span>
              </div>
            </div>

            <BaseButton class="w-full" :disabled="!cart?.items?.length" :loading="orderStore.loading" @click="submit">
              Place Order
            </BaseButton>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>