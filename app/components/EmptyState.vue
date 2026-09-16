<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "i-lucide-inbox",
  },

  title: {
    type: String,
    default: "No data found",
  },

  description: {
    type: String,
    default: "There is nothing to display right now.",
  },

  retry: {
    type: Function,
    default: null,
  },

  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <ClientOnly>
    <div
      class="flex flex-col items-center justify-center rounded-2xl bg-white px-4 py-10 text-center"
    >
      <div
        class="mb-4 flex size-16 items-center justify-center rounded-full bg-light"
      >
        <Icon :name="props.icon" class="size-8 text-body" />
      </div>

      <h2 class="text-lg font-semibold text-title">{{ props.title }}</h2>

      <p class="mt-2 max-w-md text-sm text-body">
        {{ props.description }}
      </p>

      <button
        v-if="props.retry"
        type="button"
        :disabled="props.loading"
        class="mt-5 inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        @click="props.retry"
      >
        <Icon
          :name="props.loading ? 'i-lucide-loader' : 'i-lucide-refresh-cw'"
          :class="['size-4', props.loading && 'animate-spin']"
        />
        {{ props.loading ? "Loading..." : "Try again" }}
      </button>
      <slot />
    </div>
  </ClientOnly>
</template>
