<script setup>
const addresses = [
  {
    id: 1,
    type: "Home",
    icon: "i-lucide-house",
    iconClass: "bg-violet-50 text-violet-500",
    borderClass: "border-l-violet-500",
    badge: "Default",
    badgeClass: "bg-violet-50 text-violet-500",
    person: "Sarah Jahan",
    phone: "+880 1712 345 678",
    address: "House 12, Road 5, Block C",
    area: "Banasree, Rampura",
    location: "Dhaka - 1219, Bangladesh",
    shipping: true,
    billing: false,
  },
  {
    id: 2,
    type: "Office",
    icon: "i-lucide-briefcase-business",
    iconClass: "bg-emerald-50 text-emerald-500",
    borderClass: "border-l-emerald-500",
    badge: "Default",
    badgeClass: "bg-emerald-50 text-emerald-500",
    person: "Sarah Jahan",
    phone: "+880 1712 345 678",
    address: "Level 8, Suite 805, XYZ Tower",
    area: "Gulshan Avenue, Gulshan 1",
    location: "Dhaka - 1212, Bangladesh",
    shipping: false,
    billing: true,
  },
  {
    id: 3,
    type: "Parents Home",
    icon: "i-lucide-gift",
    iconClass: "bg-orange-50 text-orange-500",
    borderClass: "border-l-orange-500",
    badge: "",
    badgeClass: "",
    person: "Sarah Jahan",
    phone: "+880 1712 345 678",
    address: "Vill: Kazipara, P.O: Mirpur",
    area: "P.S: Mirpur, Kushtia - 7000",
    location: "Bangladesh",
    shipping: false,
    billing: false,
  },
  {
    id: 4,
    type: "Friend's House",
    icon: "i-lucide-users",
    iconClass: "bg-blue-50 text-blue-500",
    borderClass: "border-l-blue-500",
    badge: "",
    badgeClass: "",
    person: "Sarah Jahan",
    phone: "+880 1712 345 678",
    address: "House 24, Road 3, Sector 7",
    area: "Uttara, Dhaka - 1230",
    location: "Bangladesh",
    shipping: false,
    billing: false,
  },
];

const selectedSort = ref("recent");

const editAddress = (address) => {
  console.log("Edit:", address);
};

const deleteAddress = (address) => {
  console.log("Delete:", address);
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Address Book | Buyzin</Title>

      <Meta
        name="description"
        content="Manage your saved addresses and default delivery information."
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
        },
      ]"
      class="py-4 text-sm"
    />

    <div class="rounded-2xl bg-white px-4 text-sm">
      <div
        class="flex flex-col gap-4 border-b border-dashed border-border py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 class="text-lg font-semibold text-title">Address Book</h1>

          <p class="mt-1 text-sm text-body">
            Manage your saved addresses for a faster checkout experience.
          </p>
        </div>

        <NuxtLink
          to="/account/addresses/create"
          class="inline-flex h-9 items-center justify-center gap-2 rounded bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          <UIcon name="i-lucide-plus" class="size-4" />
          Add Address
        </NuxtLink>
      </div>

      <div class="space-y-4 py-4">
        <section
          class="overflow-hidden rounded-lg border border-border bg-white"
        >
          <div
            class="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <h2 class="text-sm font-semibold text-title">Saved Addresses</h2>

            <BaseSelect
              v-model="selectedSort"
              :items="[
                {
                  name: 'Recently Added',
                  id: 'recent',
                },
                {
                  name: 'Oldest First',
                  id: 'oldest',
                },
                {
                  name: 'Name',
                  id: 'name',
                },
              ]"
              placeholder="Sort by"
              class="mb-0 w-full sm:w-36"
            />
          </div>

          <div>
            <article
              v-for="address in addresses"
              :key="address.id"
              class="border-b border-border border-l-2 px-3 py-4 last:border-b-0 sm:px-4"
              :class="address.borderClass"
            >
              <div
                class="grid gap-4 lg:grid-cols-[180px_minmax(220px,1fr)_auto_auto]"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex size-10 shrink-0 items-center justify-center rounded-full"
                    :class="address.iconClass"
                  >
                    <UIcon :name="address.icon" class="size-5" />
                  </div>

                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-sm font-semibold text-title">
                        {{ address.type }}
                      </h3>

                      <span
                        v-if="address.badge"
                        class="rounded px-2 py-0.5 text-xs font-medium"
                        :class="address.badgeClass"
                      >
                        {{ address.badge }}
                      </span>
                    </div>

                    <p class="mt-1 text-sm text-body">
                      {{ address.person }}
                    </p>

                    <p class="mt-0.5 text-sm text-body">
                      {{ address.phone }}
                    </p>
                  </div>
                </div>

                <div class="flex gap-2 text-sm text-body">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="mt-0.5 size-4 shrink-0 text-gray-400"
                  />

                  <div class="leading-5">
                    <p>{{ address.address }}</p>
                    <p>{{ address.area }}</p>
                    <p>{{ address.location }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-2">
                  <span
                    v-if="address.shipping"
                    class="mt-1 whitespace-nowrap rounded bg-violet-50 px-2 py-1 text-xs font-medium text-violet-500"
                  >
                    Default Shipping
                  </span>

                  <span
                    v-if="address.billing"
                    class="mt-1 whitespace-nowrap rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500"
                  >
                    Default Billing
                  </span>
                </div>

                <div class="flex items-start gap-2">
                  <button
                    type="button"
                    class="inline-flex h-8 items-center justify-center rounded-md border border-violet-200 px-3 text-sm font-medium text-violet-500 transition-colors hover:bg-violet-50"
                    @click="editAddress(address)"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    class="inline-flex h-8 items-center justify-center rounded-md border border-red-200 px-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    @click="deleteAddress(address)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </Dashboard>
</template>
