<script setup>
defineProps({
  error: Object,
})

const handleError = () => {
  clearError({ redirect: "/" })
}
</script>

<template>

  <Head>
    <Title>404 - Page Not Found | Buyzin</Title>
    <Meta name="description" content="Page not found on Buyzin. Go back to homepage." />
    <Meta name="robots" content="noindex, follow" />
  </Head>

  <main class="min-h-screen flex items-center justify-center bg-gray-50 px-6">

    <div class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      <!-- Image -->
      <div class="flex justify-center">
        <div class="animate-float">
          <NuxtImg src="/error.svg" alt="404 error" class="w-[280px] md:w-[380px]" />
        </div>
      </div>

      <!-- Content -->
      <div class="text-center lg:text-left space-y-6">

        <div class="text-8xl md:text-9xl font-extrabold text-gray-900 tracking-tight">
          40<span class="text-primary">4</span>
        </div>

        <h1 class="text-2xl md:text-4xl font-semibold text-gray-900">
          Oops! Page not found
        </h1>

        <p class="text-gray-600 max-w-lg">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to the homepage.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

          <button @click="handleError"
            class="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow hover:bg-primary/90 transition">
            Go Home
          </button>

          <NuxtLink to="/"
            class="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Back to Homepage
          </NuxtLink>

        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
</style>