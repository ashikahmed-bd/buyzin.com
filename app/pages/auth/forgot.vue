<script setup>
const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);

definePageMeta({
  middleware: "guest",
});

const form = reactive({
  phone: "",
});

const submit = async () => {
  await authStore.forgot(form);
};
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <Head>
      <Title>Forgot Password - Reset Access</Title>
      <Meta
        name="description"
        content="Reset your password by entering your phone number. We will send instructions to recover your account."
      />
    </Head>

    <div
      class="w-full max-w-5xl mx-auto bg-white rounded-lg grid grid-cols-1 md:grid-cols-2"
    >
      <div class="hidden md:flex flex-col justify-center items-center p-10">
        <img src="/auth.jpg" alt="Illustration" class="mb-6" />

        <h2 class="text-2xl font-bold text-center mb-3">
          Forgot Your Password?
        </h2>

        <p class="text-gray-500 text-center">
          Don’t worry! Enter your registered phone number and we will help you
          reset your password in a few steps.
        </p>

        <div class="flex justify-center mt-6 space-x-2">
          <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      <div class="px-8 py-10">
        <h2 class="text-2xl font-bold mb-2">Forgot Password</h2>
        <p class="text-gray-500 mb-6">
          Enter your registered phone number. We will send an OTP to help you
          reset your password securely.
        </p>

        <form @submit.prevent="submit">
          <BaseInput
            v-model="form.phone"
            label="Phone Number"
            placeholder="Enter your phone"
            :required="true"
            :error="errors.phone"
          />

          <BaseButton :loading="authStore.loading" class="w-full mt-4">
            Submit
          </BaseButton>
        </form>

        <p class="text-sm text-center text-body mt-6">
          Remember your password?
          <NuxtLink
            to="/auth/login"
            class="font-semibold text-primary hover:text-opacity-90"
            >Sign in</NuxtLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
