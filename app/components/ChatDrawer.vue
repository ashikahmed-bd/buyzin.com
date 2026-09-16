<script setup>
const chatStore = useChatStore();

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const form = reactive({
  product_id: props.product.id,
  subject: "",
  message: "",
});

const submit = async () => {
  if (!form.message.trim()) {
    return;
  }

  await chatStore.store(form);
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
  >
    <div
      v-if="chatStore.dialog"
      @click.self="chatStore.dialog = false"
      class="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      <div
        class="flex items-center justify-between border-b border-dashed bg-white px-5 py-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-full bg-primary/10"
          >
            <NuxtImg
              :src="product.store.logo_url"
              :alt="product.store?.name"
              class="size-full object-cover"
            />
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <h3 class="truncate text-sm font-semibold text-slate-900">
                {{ product.store?.name }}
              </h3>

              <UIcon
                v-if="product.store?.verified"
                name="i-lucide-badge-check"
                class="size-4 shrink-0 text-blue-500"
              />
            </div>

            <p class="text-xs text-slate-500">Send a message to the seller</p>
          </div>
        </div>

        <button
          type="button"
          @click="chatStore.dialog = false"
          class="flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <UIcon name="i-lucide-x" class="size-5" />
        </button>
      </div>

      <form @submit.prevent="submit" class="space-y-4 px-4 py-5">
        <div class="form__group">
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Subject
            <span class="text-red-500">*</span>
          </label>

          <USelect
            v-model="form.subject"
            :items="[
              'Wholesale Price',
              'Product Availability',
              'Bulk Order',
              'MOQ Inquiry',
              'Shipping & Delivery',
              'Sample Request',
              'Custom Order',
              'Payment & Pricing',
              'Other',
            ]"
            placeholder="Select a subject"
            size="lg"
            class="w-full"
          />
        </div>

        <div class="form__group">
          <label class="mb-1.5 block text-sm font-medium text-slate-700">
            Message
            <span class="text-red-500">*</span>
          </label>

          <UTextarea
            v-model="form.message"
            placeholder="Write your message..."
            :rows="4"
            size="lg"
            class="w-full"
          />
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            @click="chatStore.dialog = false"
          >
            Cancel
          </UButton>

          <UButton
            type="submit"
            :loading="chatStore.loading"
            :disabled="!form.subject.trim() || !form.message.trim()"
            icon="i-lucide-send"
          >
            Send Message
          </UButton>
        </div>
      </form>
    </div>
  </Transition>
</template>
