<script setup>
defineProps({ error: { type: Object, default: null } });
const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
<template>
  <Head>
    <Title>404 - Page Not Found | Buyzin</Title>
    <Meta
      name="description"
      content="The page you're looking for could not be found on Buyzin."
    />
    <Meta name="robots" content="noindex, follow" />
  </Head>
  <main
    class="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-10"
  >
    <div
      class="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div class="flex justify-center">
        <div class="animate-float w-full max-w-md">
          <NuxtImg
            src="/error.svg"
            alt="Page not found"
            class="h-auto w-full"
          />
        </div>
      </div>
      <div class="text-center lg:text-left">
        <div
          class="text-7xl font-black tracking-tight text-gray-900 sm:text-8xl"
        >
          40<span class="text-primary">4</span>
        </div>
        <h1
          class="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
        >
          Page not found
        </h1>
        <p
          class="mx-auto mt-3 max-w-md text-sm leading-6 text-body sm:text-base lg:mx-0"
        >
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to where you started.
        </p>
        <button
          type="button"
          class="mt-7 inline-flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
          @click="handleError"
        >
          <UIcon name="i-lucide-house" class="size-4" /> Go to Homepage
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
.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
</style>
