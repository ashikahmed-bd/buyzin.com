<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const isToday = (date) => {
  const createdAt = new Date(date).getTime();
  const now = Date.now();

  return now - createdAt < 24 * 60 * 60 * 1000;
};
</script>

<template>
  <div class="flex" :class="message.self ? 'justify-end' : 'justify-start'">
    <div
      class="flex max-w-[85%] gap-2 sm:max-w-[70%]"
      :class="message.self ? 'flex-row-reverse' : 'flex-row'"
    >
      <div class="size-7 shrink-0 overflow-hidden rounded-full">
        <NuxtImg
          v-if="message.sender"
          :src="message.sender.photo_url"
          :alt="message.sender.name"
          class="size-full object-cover"
        />
        <div
          v-else
          class="flex size-full items-center justify-center text-xs font-semibold text-white"
          :class="message.self ? 'bg-primary' : 'bg-gray-400'"
        >
          {{ message.self ? "ME" : (message.sender?.name ?? "U").charAt(0) }}
        </div>
      </div>

      <div class="min-w-0">
        <div
          class="rounded-xl px-3.5 py-2.5 text-sm leading-5"
          :class="
            message.self
              ? 'rounded-tr-sm bg-primary/10 text-body'
              : 'rounded-tl-sm border border-gray-100 bg-white text-body'
          "
        >
          {{ message.message }}
        </div>

        <div
          class="mt-1 flex items-center gap-1 text-xs text-body"
          :class="message.self ? 'justify-end' : 'justify-start'"
        >
          {{
            isToday(message.created_at) ? message.humans : message.display_time
          }}

          <UIcon
            v-if="message.self"
            :name="message.read_at ? 'i-lucide-check-check' : 'i-lucide-check'"
            class="size-3.5"
            :class="message.read_at ? 'text-primary' : 'text-body'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
