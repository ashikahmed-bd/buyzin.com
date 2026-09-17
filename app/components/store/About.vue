<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-full max-w-5xl">
    <MDC :value="props.store?.description" class="prose max-w-none" />
  </div>
</template>

<style scoped></style>
