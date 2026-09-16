<script setup>
const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);

definePageMeta({
  middleware: "guest",
});

const form = reactive({
  name: "",
  phone: "",
  password: "",
});

const submit = async () => {
  await authStore.register(form);
};
</script>

<template>
  <Head>
    <Title>Register - Create Your Account</Title>

    <Meta
      name="description"
      content="Create your account to join the platform and access premium features in seconds."
    />
    <Meta
      name="keywords"
      content="register, sign up, create account, user registration"
    />
  </Head>

  <main class="max-w-5xl mx-auto px-4 py-8">
    <div
      class="w-full max-w-5xl mx-auto bg-white rounded-lg grid grid-cols-1 md:grid-cols-2"
    >
      <div class="hidden md:flex flex-col justify-center items-center p-10">
        <img src="/auth.jpg" alt="Illustration" class="mb-6" />
        <h2 class="text-2xl font-bold text-center mb-3">
          Show your skills and be an innovator
        </h2>
        <p class="text-gray-500 text-center">
          Seize the moment and shape the future by starting your journey today.
        </p>

        <div class="flex justify-center mt-6 space-x-2">
          <span class="w-2 h-2 bg-cyan-500 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>

      <div class="px-8 py-10">
        <h2 class="text-2xl font-bold mb-2">Create an Account</h2>
        <p class="text-gray-500 mb-6">
          Join us and start your learning journey today.
        </p>

        <form @submit.prevent="submit" class="space-y-4">
          <BaseInput
            v-model="form.name"
            label="Full Name"
            placeholder="Enter your name"
            :required="true"
            :error="errors.name"
          />

          <BaseInput
            v-model="form.phone"
            label="Phone Number"
            placeholder="Enter your phone"
            :required="true"
            :error="errors.phone"
          />

          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Enter password"
            :required="true"
            :error="errors.password"
          />

          <BaseButton :loading="authStore.loading" class="w-full">
            Create Account
          </BaseButton>
        </form>

        <p class="text-sm text-center text-body mt-6">
          Already have an account?
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
