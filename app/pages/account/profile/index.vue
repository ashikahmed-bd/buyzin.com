<script setup>
definePageMeta({
  middleware: "auth",
});

const profileStore = useProfileStore();

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useAsyncData("profile", () => profileStore.getProfile());

const password = reactive({
  current: "",
  new: "",
  confirmation: "",
});

const saveProfile = async () => {
  console.log("Profile:", profile.value);
};

const changePassword = async () => {
  console.log("Password:", password);
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!profile" />

    <template v-else>
      <Head>
        <Title>Profile | Buyzin</Title>

        <Meta
          name="description"
          content="View and manage your personal information and account settings on Buyzin."
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
            label: 'Profile',
          },
        ]"
        class="py-4 text-xs"
      />

      <div class="rounded-2xl bg-white">
        <div class="border-b border-dashed border-border px-4 py-3">
          <h1 class="text-lg font-semibold text-title">My Profile</h1>

          <p class="mt-1 text-sm text-body">
            Manage your personal information and account security.
          </p>
        </div>

        <div class="space-y-4 p-4 sm:p-5">
          <section class="rounded-lg border border-border bg-white p-4">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex min-w-0 items-center gap-4">
                <div class="relative shrink-0">
                  <div
                    class="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border bg-gray-100"
                  >
                    <NuxtImg
                      :src="profile.photo_url"
                      :alt="profile.name"
                      class="size-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <button
                    type="button"
                    class="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <UIcon name="i-lucide-camera" class="size-3.5" />
                  </button>
                </div>

                <div class="min-w-0">
                  <h2 class="truncate text-sm font-semibold text-title">
                    {{ profile.name }}
                  </h2>

                  <div class="mt-2 space-y-1 text-xs text-body">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-mail" class="size-3.5 shrink-0" />

                      <span class="truncate">
                        {{ profile.email }}
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-phone" class="size-3.5 shrink-0" />

                      <span>
                        {{ profile.phone }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-primary px-3 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <UIcon name="i-lucide-camera" class="size-4" />

                Change Photo
              </button>
            </div>
          </section>

          <!-- Account Settings -->
          <section
            class="overflow-hidden rounded-lg border border-border bg-white"
          >
            <UTabs
              color="primary"
              variant="link"
              :items="[
                {
                  label: 'Personal Information',
                  icon: 'i-lucide-user',
                  slot: 'account',
                },
                {
                  label: 'Change Password',
                  icon: 'i-lucide-lock',
                  slot: 'password',
                },
              ]"
            >
              <!-- Personal Information -->
              <template #account>
                <form class="p-4 sm:p-5" @submit.prevent="saveProfile">
                  <div class="grid gap-4 sm:grid-cols-2">
                    <BaseInput
                      v-model="profile.name"
                      label="Full Name"
                      placeholder="Enter your full name"
                      required
                    />

                    <BaseInput
                      v-model="profile.phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter phone number"
                      required
                    />

                    <BaseInput
                      v-model="profile.email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter email address"
                      :required="false"
                    />

                    <BaseInput
                      v-model="profile.birthday"
                      label="Date of Birth"
                      type="date"
                      :required="false"
                    />

                    <BaseSelect
                      v-model="profile.gender"
                      label="Gender"
                      :items="[
                        {
                          name: 'Female',
                          id: 'female',
                        },
                        {
                          name: 'Male',
                          id: 'male',
                        },
                        {
                          name: 'Other',
                          id: 'other',
                        },
                      ]"
                      placeholder="Select gender"
                      :required="false"
                    />
                  </div>

                  <div
                    class="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <NuxtLink
                      to="/account/addresses"
                      class="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border px-4 text-xs font-medium text-body transition-colors hover:border-primary hover:text-primary"
                    >
                      <UIcon name="i-lucide-map-pin" class="size-3.5" />

                      Manage Addresses
                    </NuxtLink>

                    <button
                      type="submit"
                      class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      <UIcon name="i-lucide-save" class="size-3.5" />

                      Save Changes
                    </button>
                  </div>
                </form>
              </template>

              <!-- Change Password -->
              <template #password>
                <form
                  class="max-w-2xl p-4 sm:p-5"
                  @submit.prevent="changePassword"
                >
                  <div class="grid gap-4">
                    <BaseInput
                      v-model="password.current"
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                      required
                    />

                    <BaseInput
                      v-model="password.new"
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      required
                    />

                    <BaseInput
                      v-model="password.confirmation"
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <div
                    class="mt-5 flex justify-end border-t border-border pt-4"
                  >
                    <button
                      type="submit"
                      class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      <UIcon name="i-lucide-lock" class="size-3.5" />

                      Update Password
                    </button>
                  </div>
                </form>
              </template>
            </UTabs>
          </section>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
