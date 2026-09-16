<script setup>
defineProps({
  conversation: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    class="w-full px-3 py-2.5 text-left transition hover:bg-gray-50"
    :class="selected ? 'bg-gray-100' : ''"
  >
    <div class="flex gap-3">
      <div class="relative shrink-0">
        <NuxtImg
          :src="conversation.store?.logo_url"
          :alt="conversation.store?.name"
          class="size-10 rounded-full object-cover"
        />

        <span
          class="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white"
          :class="
            conversation.store?.is_online ? 'bg-green-500' : 'bg-gray-400'
          "
        />
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate text-sm font-semibold text-title">
            {{ conversation.store?.name ?? "Unknown" }}
          </h3>

          <span class="shrink-0 text-xs text-body">
            {{ conversation.message_at }}
          </span>
        </div>

        <div class="mt-1 flex items-center justify-between gap-2">
          <h4 class="truncate text-xs text-body">
            {{ conversation.message ?? "No messages" }}
          </h4>

          <span
            v-if="conversation.unread_count > 0"
            class="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
          >
            {{ conversation.unread_count }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
