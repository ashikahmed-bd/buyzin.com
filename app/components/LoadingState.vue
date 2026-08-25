<script setup>
defineProps({
  title: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-white rounded-2xl"
  >
    <div class="flex flex-col items-center gap-4">
      <NuxtImg
        src="/loading.gif"
        alt="Buyzin"
        class="h-16 w-auto object-contain"
      />
      <p class="text-sm text-title">
        {{ title }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
