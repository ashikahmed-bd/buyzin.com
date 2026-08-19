<script setup>
const profile = reactive({
  fullName: "Sarah Jahan",
  username: "sarahjahan_98",
  email: "sarah.jahan@email.com",
  phone: "+880 1712 345 678",
  dateOfBirth: "1998-03-15",
  gender: "Female",
  country: "Bangladesh",
  city: "Dhaka",
  postalCode: "1219",
  occupation: "Web Developer",
  bio: "Passionate about technology, shopping and exploring new trends.",
});

const password = reactive({
  current: "",
  new: "",
  confirmation: "",
});

const countryOptions = [
  { name: "Bangladesh", id: "Bangladesh" },
  { name: "India", id: "India" },
  { name: "Pakistan", id: "Pakistan" },
];

const cityOptions = [
  { name: "Dhaka", id: "Dhaka" },
  { name: "Chattogram", id: "Chattogram" },
  { name: "Sylhet", id: "Sylhet" },
];

const saveProfile = async () => {
  console.log("Profile:", profile);
};

const changePassword = async () => {
  console.log("Password:", password);
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Profile | Buyzin</Title>

      <Meta
        name="description"
        content="View and manage your saved products on Buyzin."
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

    <div class="rounded-2xl bg-white px-4">
      <div class="border-b border-dashed border-border py-3">
        <h1 class="text-lg font-semibold text-title">My Profile</h1>

        <p class="mt-1 text-sm text-body">
          Manage your personal information and account details.
        </p>
      </div>

      <div class="space-y-4 py-5">
        <section class="rounded border border-border bg-white p-4">
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-4">
              <div class="relative shrink-0">
                <div
                  class="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border bg-gray-100"
                >
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Sarah Jahan"
                    class="size-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  class="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <UIcon name="i-lucide-camera" class="size-3.5" />
                </button>
              </div>

              <div>
                <h2 class="text-sm font-semibold text-title">Sarah Jahan</h2>
                <div class="mt-2 space-y-1 text-xs text-body">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-mail" class="size-3.5" />
                    <span>{{ profile.email }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-phone" class="size-3.5" />
                    <span>{{ profile.phone }}</span>
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
                    v-model="profile.fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />

                  <BaseInput
                    v-model="profile.email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
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
                    v-model="profile.dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    required
                  />

                  <BaseSelect
                    v-model="profile.gender"
                    label="Gender"
                    :items="[
                      { name: 'Female', id: 'Female' },
                      { name: 'Male', id: 'Male' },
                      { name: 'Other', id: 'Other' },
                    ]"
                    placeholder="Select gender"
                    required
                  />

                  <BaseSelect
                    v-model="profile.country"
                    label="Country"
                    :items="countryOptions"
                    placeholder="Select country"
                    :required="true"
                  />

                  <BaseSelect
                    v-model="profile.city"
                    label="City"
                    :items="cityOptions"
                    placeholder="Select city"
                    required
                  />

                  <BaseInput
                    v-model="profile.postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                  />

                  <div class="sm:col-span-2">
                    <UFormField label="Bio" description="Optional">
                      <UTextarea
                        v-model="profile.bio"
                        :rows="4"
                        placeholder="Write something about yourself"
                        autoresize
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </div>

                <div class="mt-5 flex justify-end">
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

                <div class="mt-5 flex justify-end">
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
  </Dashboard>
</template>
