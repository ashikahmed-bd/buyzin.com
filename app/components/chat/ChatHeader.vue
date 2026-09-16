<script setup>
const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },

  store: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <header
    class="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-3"
  >
    <div class="flex min-w-0 items-center gap-2.5">
      <NuxtImg
        :src="store?.logo_url"
        :alt="store?.name"
        class="size-10 shrink-0 rounded-full border border-gray-100 object-cover"
      />
      <div class="min-w-0">
        <h2 class="truncate text-sm font-semibold">
          {{ store.name }}
        </h2>

        <div class="flex items-center gap-1.5">
          <span class="relative flex size-2.5">
            <span
              v-if="store.is_online"
              class="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75"
            />

            <span
              class="relative inline-flex size-2.5 rounded-full"
              :class="store.is_online ? 'bg-success' : 'bg-gray-400'"
            />
          </span>

          <span class="text-xs text-muted">
            {{ store.is_online ? "Active now" : "Offline" }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-1">
      <button
        type="button"
        class="flex size-8 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
      >
        <UIcon name="i-lucide-star" class="size-4" />
      </button>
      <button
        type="button"
        class="flex size-8 items-center justify-center rounded-md text-body transition hover:bg-gray-100 hover:text-title"
      >
        <UIcon name="i-lucide-ellipsis-vertical" class="size-4" />
      </button>
    </div>
  </header>
</template>
