<script setup>
import ProfileLayout from "~/components/ProfileLayout.vue";

const addressStore = useAddressStore();
const { addresses } = storeToRefs(addressStore);

const loadAddresses = async () => {
  await addressStore.all();
};

onMounted(() => {
  loadAddresses();
});
</script>

<template>

  <Head>
    <Title>My Addresses | Buyzin - Manage Your Shipping & Billing Addresses</Title>
    <Meta name="description"
      content="Easily manage your shipping and billing addresses on Buyzin. Add new addresses, edit existing ones, and enjoy faster checkout across Bangladesh." />
  </Head>
  <ProfileLayout>
    <div class="bg-white rounded-xl">
      <div class="px-4 py-3 border-b border-border">
        <h3 class="text-lg font-semibold text-heading">Address</h3>
      </div>
      <div class="p-4 relative overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <template v-if="addresses?.data">
            <div v-for="address in addresses?.data" :key="address.id"
              class="bg-white rounded-xl border border-gray-200 transition-all duration-200">
              <div class="flex items-center justify-between border-b px-2.5 py-2">
                <div class="flex items-center gap-2">
                  <h4 class="text-lg font-semibold capitalize">
                    {{ address.type }} Address
                  </h4>
                </div>

                <button @click="editAddress(address)"
                  class="text-primary font-medium hover:underline flex items-center gap-1">
                  <span>Edit</span>
                </button>
              </div>

              <div class="px-2.5 py-2">
                <h4 class="font-semibold text-base text-heading">
                  {{ address.name }}
                </h4>

                <div class="py-2">
                  <address>{{ address.address }}</address>
                  <p>
                    {{ address.city }}, {{ address.state }}
                    {{ address.postal_code }}<br />
                    {{ address.country }}
                  </p>
                </div>

                <div class="flex items-center justify-between border-t py-2 border-border">
                  <p class="text-gray-700 text-sm mb-1">
                    <strong>Phone:</strong> {{ address.phone }}
                  </p>

                  <span v-if="address.default" class="font-semibold text-primary text-xs">
                    Default
                  </span>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="animate-pulse space-y-4">
              <div class="bg-white p-5 rounded-2xl border border-gray-200">
                <div class="flex items-center justify-between mb-4">
                  <div class="h-4 w-32 bg-gray-200 rounded"></div>
                  <div class="h-4 w-10 bg-gray-200 rounded"></div>
                </div>

                <div class="h-4 w-40 bg-gray-200 rounded mb-3"></div>

                <div class="space-y-2">
                  <div class="h-3 w-full bg-gray-200 rounded"></div>
                  <div class="h-3 w-3/4 bg-gray-200 rounded"></div>
                  <div class="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div class="h-3 w-1/3 bg-gray-200 rounded"></div>
                  <div class="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<style scoped></style>
