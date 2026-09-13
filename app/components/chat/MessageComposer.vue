<script setup>
const message = ref("");

const emit = defineEmits(["send"]);

const submit = () => {
  const text = message.value.trim();
  if (!text) {
    return;
  }
  emit("send", text);
  message.value = "";
};
</script>

<template>
  <footer class="border-t border-gray-200 bg-white p-3">
    <form class="flex items-center gap-2" @submit.prevent="submit">
      <input
        v-model="message"
        type="text"
        autocomplete="off"
        placeholder="Type your message..."
        class="min-w-0 flex-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-body outline-none transition placeholder:text-body focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <button
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded border border-gray-200 text-body transition hover:bg-gray-50 hover:text-title"
      >
        <UIcon name="i-lucide-smile" class="size-4" />
      </button>
      <button
        type="button"
        class="flex size-10 shrink-0 items-center justify-center rounded border border-gray-200 text-body transition hover:bg-gray-50 hover:text-title"
      >
        <UIcon name="i-lucide-paperclip" class="size-4" />
      </button>

      <button
        type="submit"
        :disabled="!message.trim()"
        class="flex shrink-0 items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span class="hidden sm:inline"> Send </span>
        <UIcon name="i-lucide-send" class="size-4" />
      </button>
    </form>
  </footer>
</template>
