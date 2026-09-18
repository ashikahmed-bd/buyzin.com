<script setup>
definePageMeta({
  middleware: "auth",
});

const profileStore = useProfileStore();
const { errors } = storeToRefs(profileStore);

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useAsyncData("profile", () => profileStore.getProfile());

const form = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const saveProfile = async () => {
  await profileStore.update(profile.value);
};

const changePassword = async () => {
  await profileStore.changePassword(form);
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

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
        class="text-xs"
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
                          label: 'Female',
                          id: 'female',
                        },
                        {
                          label: 'Male',
                          id: 'male',
                        },
                        {
                          label: 'Other',
                          id: 'other',
                        },
                      ]"
                      placeholder="Select gender"
                      :required="false"
                    />
                  </div>

                  <button
                    type="submit"
                    :disabled="profileStore.loading"
                    :class="[
                      'inline-flex items-center justify-center gap-2 rounded-md bg-primary px-2.5 py-2 text-xs font-medium text-white transition',
                      profileStore.loading
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-primary/90',
                    ]"
                  >
                    <UIcon
                      v-if="profileStore.loading"
                      name="i-lucide-loader"
                      class="size-4 animate-spin"
                    />

                    <UIcon v-else name="i-lucide-save" class="size-4" />

                    {{ profileStore.loading ? "Saving..." : "Save Changes" }}
                  </button>
                </form>
              </template>

              <template #password>
                <form
                  class="max-w-2xl p-4 sm:p-5"
                  @submit.prevent="changePassword"
                >
                  <div class="grid gap-4">
                    <BaseInput
                      v-model="form.current_password"
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                      :required="true"
                      :error="errors.current_password"
                    />

                    <BaseInput
                      v-model="form.password"
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      :required="true"
                      :error="errors.password"
                    />

                    <BaseInput
                      v-model="form.password_confirmation"
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      :required="true"
                      :error="errors.password"
                    />
                  </div>

                  <button
                    type="submit"
                    :disabled="profileStore.loading"
                    :class="[
                      'inline-flex items-center justify-center gap-2 rounded-md bg-primary px-2.5 py-2 text-xs font-medium text-white transition',
                      profileStore.loading
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-primary/90',
                    ]"
                  >
                    <UIcon
                      v-if="profileStore.loading"
                      name="i-lucide-loader"
                      class="size-4 animate-spin"
                    />

                    <UIcon v-else name="i-lucide-lock" class="size-4" />

                    {{
                      profileStore.loading
                        ? "Please wait..."
                        : "Change Password"
                    }}
                  </button>
                </form>
              </template>
            </UTabs>
          </section>
        </div>
      </div>
    </template>
  </Dashboard>
</template>
