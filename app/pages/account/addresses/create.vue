<script setup>
const form = reactive({
  fullName: "Sarah Jahan",
  country: "Bangladesh",
  division: "Dhaka",
  district: "Dhaka",
  upazila: "Dhanmondi",
  address1: "House 12, Road 5, Block C",
  address2: "",
  zip: "1219",
  phone: "1712 345 678",
  addressType: "Home",
  defaultShipping: true,
});

const countryItems = [
  { name: "Bangladesh", id: "Bangladesh" },
  { name: "India", id: "India" },
  { name: "Pakistan", id: "Pakistan" },
];

const divisionItems = [
  { name: "Dhaka", id: "Dhaka" },
  { name: "Chattogram", id: "Chattogram" },
  { name: "Rajshahi", id: "Rajshahi" },
  { name: "Khulna", id: "Khulna" },
];

const districtItems = [
  { name: "Dhaka", id: "Dhaka" },
  { name: "Gazipur", id: "Gazipur" },
  { name: "Narayanganj", id: "Narayanganj" },
];

const upazilaItems = [
  { name: "Dhanmondi", id: "Dhanmondi" },
  { name: "Mirpur", id: "Mirpur" },
  { name: "Uttara", id: "Uttara" },
];

const addressTypes = [
  {
    id: "Home",
    label: "Home",
    description: "Personal address",
    icon: "i-lucide-house",
    iconClass: "bg-violet-50 text-violet-500",
  },
  {
    id: "Office",
    label: "Office",
    description: "Work / office address",
    icon: "i-lucide-briefcase-business",
    iconClass: "bg-blue-50 text-blue-500",
  },
  {
    id: "Other",
    label: "Other",
    description: "Other address",
    icon: "i-lucide-star",
    iconClass: "bg-orange-50 text-orange-500",
  },
];

const addressTips = [
  {
    title: "Provide accurate details",
    description: "Make sure your address and contact information are correct.",
    icon: "i-lucide-map-pin",
  },
  {
    title: "Use landmarks",
    description:
      "Adding landmarks helps our delivery partners find your location easily.",
    icon: "i-lucide-map",
  },
  {
    title: "Pincode is important",
    description:
      "Double-check your postal code for faster and accurate delivery.",
    icon: "i-lucide-map-pin-check",
  },
  {
    title: "Default address",
    description:
      "You can set one address as default for a smoother checkout experience.",
    icon: "i-lucide-user-round",
  },
];

const saveAddress = () => {
  console.log("Save address:", form);
};

const cancel = () => {
  navigateTo("/account/addresses");
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Add New Address | Buyzin</Title>

      <Meta
        name="description"
        content="Add a new delivery and billing address to your Buyzin account."
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

        <form @submit.prevent="saveAddress">
          <div class="space-y-5 p-4">
            <section>
              <div class="mb-3">
                <h2 class="text-sm font-semibold text-title">
                  Contact Information
                </h2>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="form__group">
                  <label class="form__label">
                    Full Name
                    <span class="text-red-500">*</span>
                  </label>

                  <input
                    v-model="form.fullName"
                    type="text"
                    class="form__control"
                    required
                  />
                </div>

                <div class="form__group">
                  <label class="form__label">
                    Phone Number
                    <span class="text-red-500">*</span>
                  </label>

                  <div
                    class="flex h-10 overflow-hidden rounded-md border border-border bg-white"
                  >
                    <button
                      type="button"
                      class="flex shrink-0 items-center gap-2 border-r border-border px-3 text-sm text-body"
                    >
                      🇧🇩
                      <span>+880</span>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="size-3.5 text-gray-400"
                      />
                    </button>

                    <input
                      v-model="form.phone"
                      type="tel"
                      class="min-w-0 flex-1 border-0 px-3 text-sm text-title outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="border-t border-border pt-5">
              <div class="mb-3">
                <h2 class="text-sm font-semibold text-title">
                  Address Details
                </h2>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <BaseSelect
                  v-model="form.country"
                  label="Country / Region"
                  :items="countryItems"
                  placeholder="Select country"
                  required
                />

                <BaseSelect
                  v-model="form.division"
                  label="Division"
                  :items="divisionItems"
                  placeholder="Select division"
                  required
                />

                <BaseSelect
                  v-model="form.district"
                  label="District"
                  :items="districtItems"
                  placeholder="Select district"
                  required
                />

                <BaseSelect
                  v-model="form.upazila"
                  label="Upazila / Thana"
                  :items="upazilaItems"
                  placeholder="Select upazila"
                  required
                />
              </div>

              <BaseInput
                label="Address Line 1"
                v-model="form.address1"
                placeholder="House number, street name, building, etc."
              />
            </section>

            <section class="border-t border-border pt-5">
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
                    form.addressType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  "
                  @click="form.addressType = type.id"
                >
                  <span
                    class="absolute right-3 top-3 flex size-4 items-center justify-center rounded-full border"
                    :class="
                      form.addressType === type.id
                        ? 'border-primary'
                        : 'border-gray-300'
                    "
                  >
                    <span
                      v-if="form.addressType === type.id"
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
                  v-model="form.defaultShipping"
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
              class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>

      <aside
        class="h-fit rounded-lg border border-violet-100 bg-violet-50/50 p-4"
      >
        <h2 class="text-sm font-semibold text-violet-600">Address Tips</h2>

        <div class="mt-4 space-y-4">
          <div v-for="tip in addressTips" :key="tip.title" class="flex gap-3">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-violet-500"
            >
              <UIcon :name="tip.icon" class="size-4" />
            </div>

            <div>
              <h3 class="text-sm font-medium text-title">
                {{ tip.title }}
              </h3>

              <p class="mt-0.5 text-xs leading-5 text-body">
                {{ tip.description }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </Dashboard>
</template>
