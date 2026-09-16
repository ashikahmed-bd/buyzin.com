<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "submit",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "Please wait...",
  },
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.loading"
    :aria-busy="props.loading"
    :class="[
      'inline-flex items-center justify-center gap-2',
      'px-4 py-2.5 rounded',
      'text-sm font-medium text-gray-100',
      'bg-primary transition-opacity duration-200',
      'hover:opacity-90',
      'focus:outline-none focus:ring-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      !props.loading && 'cursor-pointer',
    ]"
  >
    <UIcon
      v-if="props.loading"
      name="i-lucide-loader"
      class="size-5 shrink-0 animate-spin"
    />

    <span v-if="props.loading">
      {{ props.text }}
    </span>

    <slot v-else />
  </button>
</template>
