<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-xl w-full">
    <MDC :value="props.store?.description" class="prose max-w-none" />
  </div>
</template>

<style scoped></style>
