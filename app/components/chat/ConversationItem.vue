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
      <NuxtImg
        :src="conversation.user?.photo_url"
        :alt="conversation.user?.name"
        class="size-10 shrink-0 rounded-full object-cover"
      />

      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate text-sm font-semibold text-title">
            {{ conversation.user?.name ?? "Unknown" }}
          </h3>

          <span class="shrink-0 text-xs text-body">
            {{
              conversation.last_message_at
                ? $date(conversation.last_message_at)
                : ""
            }}
          </span>
        </div>

        <div class="mt-1 flex items-center justify-between gap-2">
          <p class="truncate text-xs text-body">
            {{ conversation.last_message ?? "No messages" }}
          </p>

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
