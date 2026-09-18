<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-full bg-white px-4 py-2.5 rounded-xl">
    <MDC :value="props.store?.policy" class="prose max-w-none" />
  </div>
</template>
