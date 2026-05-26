<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <Head>
    <Title>404 - Page Not Found | Buyzin</Title>
    <Meta
      name="description"
      content="Oops! The page you are looking for does not exist on Buyzin. Return to the homepage to continue shopping safely and easily."
    />
    <Meta name="robots" content="noindex, follow" />
  </Head>
  <main class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div
      class="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center max-w-7xl w-full"
    >
      <div class="grow">
        <div
          class="transform perspective-500 rotate-x-2 rotate-y-2 transition-transform duration-500"
        >
          <NuxtImg
            src="/error.svg"
            alt="error-page-img"
            class="w-full object-cover"
          />
        </div>
      </div>
      <div class="text-center xl:text-left space-y-6">
        <div class="text-9xl font-extrabold text-gray-800">
          40<span class="text-primary">4</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-semibold text-gray-900">
          Oops! It looks like you're lost.
        </h1>
        <p class="text-gray-600 max-w-lg">
          The page you're looking for isn't available. Try to search again or
          use the Go Back button below.
        </p>
        <button
          @click="handleError"
          class="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/70 transition-all duration-300"
        >
          Go Home
        </button>
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

div[perspective-500] {
  perspective: 500px;
  animation: float 3s ease-in-out infinite;
}
</style>
