<script setup>
const addressStore = useAddressStore();

const {
  data: addresses,
  pending,
  error,
  refresh,
} = await useAsyncData("addresses", async () => {
  return await addressStore.all();
});

const deleteAddress = (address) => {
  console.log("Delete:", address);
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!addresses.data" />

    <template v-else>
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
            class="overflow-hidden rounded border border-border bg-white"
          >
            <article
              v-for="address in addresses.data"
              :key="address.id"
              class="border-b border-border border-l-2 px-3 py-4"
              :class="
                address.default ? 'border-l-primary' : 'border-l-transparent'
              "
            >
              <div class="flex flex-col gap-5 lg:flex-row lg:items-start">
                <!-- Contact -->
                <div class="flex min-w-0 shrink-0 items-start gap-3 lg:w-56">
                  <div
                    class="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500"
                  >
                    <UIcon
                      :name="
                        address.type === 'office'
                          ? 'i-lucide-building-2'
                          : 'i-lucide-house'
                      "
                      class="size-5"
                    />
                  </div>

                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-sm font-semibold capitalize text-title">
                        {{ address.type }}
                      </h3>

                      <span
                        v-if="address.default"
                        class="rounded bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-500"
                      >
                        Default
                      </span>
                    </div>

                    <p class="mt-1 truncate text-sm text-body">
                      {{ address.name }}
                    </p>

                    <p class="mt-0.5 text-sm text-body">
                      {{ address.phone }}
                    </p>
                  </div>
                </div>

                <!-- Address -->
                <div class="flex min-w-0 flex-1 gap-2 text-sm text-body">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="mt-0.5 size-4 shrink-0 text-gray-400"
                  />

                  <div class="min-w-0 leading-5">
                    <p>{{ address.address }}</p>
                    <p>{{ address.area }}</p>
                    <p>{{ address.city }}, {{ address.state }}</p>
                    <p>{{ address.country }}</p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex shrink-0 items-start gap-2 lg:ml-auto">
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
          </section>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
