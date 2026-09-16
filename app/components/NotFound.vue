<script setup>

defineProps({
  title: {
    type: String,
    default: "Oops! Item Not Found",
  },
  description: {
    type: String,
    default:
      "Sorry, the item you are looking for does not exist or has been removed.",
  },
});
</script>

<template>
  <div class="bg-white rounded-xl px-4 py-6 text-center">
    <svg class="mx-auto w-24 h-24 text-red-500 mb-4 animate-bounce" fill="none" stroke="currentColor"
      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>

    <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
      {{ title }}
    </h1>
    <p class="text-gray-600 mb-6">
      {{ description }}
    </p>

    <NuxtLink to="/" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
      Go Back Home
    </NuxtLink>
  </div>
</template>

<style scoped></style>
