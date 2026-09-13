<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="flex" :class="message.self ? 'justify-end' : 'justify-start'">
    <div
      class="flex max-w-[85%] gap-2 sm:max-w-[70%]"
      :class="message.self ? 'flex-row-reverse' : 'flex-row'"
    >
      <div
        class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
        :class="message.self ? 'bg-primary' : 'bg-gray-400'"
      >
        {{ message.self ? "ME" : (user?.name ?? "U").charAt(0) }}
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
          <span>
            {{ message.time }}
          </span>

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
