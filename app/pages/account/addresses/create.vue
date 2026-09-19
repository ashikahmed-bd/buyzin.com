<script setup>
const addressStore = useAddressStore();

definePageMeta({
  middleware: ["auth"],
});

const form = reactive({
  name: "",
  phone: "",
  country: "Bangladesh",
  state: "",
  city: "",
  area: "",
  address: "",
  landmark: "",
  type: "home",
  default: true,
});

const addressTypes = [
  {
    id: "home",
    label: "Home",
    description: "Personal address",
    icon: "i-lucide-house",
    iconClass: "bg-violet-50 text-violet-500",
  },
  {
    id: "office",
    label: "Office",
    description: "Work / office address",
    icon: "i-lucide-briefcase-business",
    iconClass: "bg-blue-50 text-blue-500",
  },
  {
    id: "other",
    label: "Other",
    description: "Other address",
    icon: "i-lucide-star",
    iconClass: "bg-orange-50 text-orange-500",
  },
];

const submit = async () => {
  await addressStore.store(form);
};

const cancel = () => {
  navigateTo("/account/addresses");
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Messages | Buyzin</Title>
      <Meta
        name="description"
        content="Manage your conversations and communicate with buyers and sellers on Buyzin."
      />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'My Account',
          to: '/account',
        },
        {
          label: 'Address',
          to: '/account/addresses',
        },
        {
          label: 'Add New Address',
        },
      ]"
      class="py-4 text-sm"
    />

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div class="overflow-hidden rounded-lg border border-border bg-white">
        <div class="border-b border-border px-4 py-4">
          <h1 class="text-lg font-semibold text-title">Add New Address</h1>

          <p class="mt-1 text-sm text-body">
            Fill in the details below to add a new address.
          </p>
        </div>

        <form @submit.prevent="submit">
          <div class="space-y-5 p-4">
            <section>
              <div class="mb-3">
                <h2 class="text-sm font-semibold text-title">
                  Contact Information
                </h2>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <BaseInput
                  label="Name"
                  v-model="form.name"
                  placeholder="Enter name"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Phone"
                  v-model="form.phone"
                  placeholder="e.g 01xxxxxxxxx"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Country / Region"
                  v-model="form.country"
                  placeholder="Enter country"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Division"
                  v-model="form.state"
                  placeholder="Enter state / division"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="District"
                  v-model="form.city"
                  placeholder="Enter district"
                  :required="true"
                  error=""
                />

                <BaseInput
                  label="Upazila / Thana"
                  v-model="form.area"
                  placeholder="Enter upazila"
                  :required="true"
                  error=""
                />
              </div>
              <BaseInput
                label="Address Line 1"
                v-model="form.address"
                placeholder="House number, street name, building, etc."
                :required="true"
                error=""
              />

              <div class="mb-3">
                <h2 class="text-sm font-semibold text-title">Address Type</h2>

                <p class="mt-0.5 text-xs text-body">
                  Select the type of address
                </p>
              </div>
              <div class="grid gap-3 sm:grid-cols-3">
                <button
                  v-for="type in addressTypes"
                  :key="type.id"
                  type="button"
                  class="relative flex items-center gap-3 rounded-md border p-3 text-left transition-colors"
                  :class="
                    form.type === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  "
                  @click="form.type = type.id"
                >
                  <span
                    class="absolute right-3 top-3 flex size-4 items-center justify-center rounded-full border"
                    :class="
                      form.type === type.id
                        ? 'border-primary'
                        : 'border-gray-300'
                    "
                  >
                    <span
                      v-if="form.type === type.id"
                      class="size-2 rounded-full bg-primary"
                    />
                  </span>

                  <span
                    class="flex size-9 shrink-0 items-center justify-center rounded-full"
                    :class="type.iconClass"
                  >
                    <UIcon :name="type.icon" class="size-4" />
                  </span>

                  <span class="min-w-0">
                    <span class="block text-sm font-semibold text-title">
                      {{ type.label }}
                    </span>

                    <span class="mt-0.5 block text-xs text-body">
                      {{ type.description }}
                    </span>
                  </span>
                </button>
              </div>
            </section>

            <section class="border-t border-border pt-5">
              <div>
                <h2 class="text-sm font-semibold text-title">Set as Default</h2>
              </div>

              <label class="mt-3 flex cursor-pointer items-start gap-2">
                <input
                  v-model="form.default"
                  type="checkbox"
                  class="mt-0.5 size-4 rounded border-gray-300 text-primary accent-primary"
                />

                <span>
                  <span class="block text-sm font-medium text-title">
                    Set as default shipping address
                  </span>

                  <span class="mt-0.5 block text-xs text-body">
                    This address will be used as your default shipping address.
                  </span>
                </span>
              </label>
            </section>
          </div>

          <div
            class="flex items-center justify-between gap-3 border-t border-border px-4 py-3"
          >
            <button
              type="button"
              class="inline-flex h-9 items-center justify-center rounded-md border border-border bg-white px-4 text-sm font-medium text-body transition-colors hover:bg-gray-50"
              @click="cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="addressStore.loading"
              class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UIcon
                v-if="addressStore.loading"
                name="i-lucide-loader"
                class="size-4 animate-spin"
              />

              <span>
                {{ addressStore.loading ? "Saving..." : "Save Address" }}
              </span>
            </button>
          </div>
        </form>
      </div>

      <aside
        class="h-fit rounded-lg border border-violet-100 bg-violet-50/50 p-4"
      >
        <h2 class="text-sm font-semibold text-primary">Address Tips</h2>

        <div class="mt-4 space-y-4">
          <div class="flex gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-violet-500"
            >
              <UIcon name="i-lucide-map-pin" class="size-4" />
            </div>

            <div>
              <h3 class="text-sm font-medium text-title">
                Provide accurate details
              </h3>

              <p class="mt-0.5 text-xs leading-5 text-body">
                Make sure your address and contact information are correct.
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-violet-500"
            >
              <UIcon name="i-lucide-map" class="size-4" />
            </div>

            <div>
              <h3 class="text-sm font-medium text-title">Use landmarks</h3>

              <p class="mt-0.5 text-xs leading-5 text-body">
                Adding landmarks helps our delivery partners find your location
                easily.
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-violet-500"
            >
              <UIcon name="i-lucide-map-pin-check" class="size-4" />
            </div>

            <div>
              <h3 class="text-sm font-medium text-title">
                Pincode is important
              </h3>

              <p class="mt-0.5 text-xs leading-5 text-body">
                Double-check your postal code for faster and accurate delivery.
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-violet-500"
            >
              <UIcon name="i-lucide-user-round" class="size-4" />
            </div>

            <div>
              <h3 class="text-sm font-medium text-title">Default address</h3>

              <p class="mt-0.5 text-xs leading-5 text-body">
                You can set one address as default for a smoother checkout
                experience.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </Dashboard>
</template>
