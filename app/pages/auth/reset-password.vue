<script setup>
const authStore = useAuthStore();

const { errors } = storeToRefs(authStore);

definePageMeta({
  middleware: "guest",
});

const route = useRoute();

const form = reactive({
  token: route.query.token || "",
  email: route.query.email || "",
  password: "",
  password_confirmation: "",
});

const submit = async () => {
  await authStore.reset(form);
};
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <Head>
      <Title>Reset Password - Create New Password</Title>
      <Meta
        name="description"
        content="Create a new secure password for your account and regain access to your account."
      />
    </Head>

    <div
      class="w-full max-w-5xl mx-auto bg-white rounded-lg grid grid-cols-1 md:grid-cols-2"
    >
      <div class="hidden md:flex flex-col justify-center items-center p-10">
        <img src="/auth.jpg" alt="Reset password illustration" class="mb-6" />

        <h2 class="text-2xl font-bold text-center mb-3">
          Create a New Password
        </h2>

        <p class="text-gray-500 text-center">
          Choose a strong password to keep your account secure. Make sure your
          new password is different from your previous password.
        </p>

        <div class="flex justify-center mt-6 space-x-2">
          <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
          <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
          <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      <div class="px-8 py-10">
        <h2 class="text-2xl font-bold mb-2">Reset Password</h2>
        <p class="text-gray-500 mb-6">
          Enter your new password below to securely reset your account password.
        </p>

        <form @submit.prevent="submit">
          <BaseInput
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            :required="true"
            :disabled="true"
            :error="errors.email"
            autocomplete="email"
          />

          <BaseInput
            v-model="form.password"
            type="password"
            label="New Password"
            placeholder="Enter your new password"
            :required="true"
            :error="errors.password"
            autocomplete="new-password"
            class="mt-4"
          />

          <BaseInput
            v-model="form.password_confirmation"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            :required="true"
            :error="errors.password_confirmation"
            autocomplete="new-password"
            class="mt-4"
          />

          <BaseButton
            type="submit"
            :loading="authStore.loading"
            class="w-full"
          >
            Reset Password
          </BaseButton>
        </form>

        <p class="text-sm text-center text-body py-4">
          Remember your password?
          <NuxtLink
            to="/auth/login"
            class="font-semibold text-primary hover:text-opacity-90"
          >
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>
