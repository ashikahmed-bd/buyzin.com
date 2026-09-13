<script setup>
const chatStore = useChatStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  store: {
    type: Object,
    default: () => ({
      name: "Supplier",
      logo_url: null,
    }),
  },

  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:open"]);

const message = ref("");

const close = () => {
  emit("update:open", false);
};

const sendMessage = () => {
  const text = message.value.trim();

  if (!text) {
    return;
  }

  console.log("Send message:", {
    supplier: props.supplier,
    product: props.product,
    message: text,
  });

  message.value = "";
};
</script>

<template>
  <USlideover v-model:open="chatStore.dialog" side="right">
    <template #content>
      <div class="flex h-full flex-col bg-white">
        <header class="flex items-center justify-between px-5 py-4">
          <div class="flex items-center gap-2.5">
            <div class="bg-white size-10 shrink-0">
              <NuxtImg
                v-if="store.logo_url"
                :src="store.logo_url"
                :alt="store.name"
                class="size-full object-contain rounded-full"
              />
              <UIcon v-else name="i-lucide-store" class="size-5 text-primary" />
            </div>

            <div class="block">
              <h3 class="text-sm font-semibold text-title">
                {{ store.name }}
              </h3>

              <div class="mt-0.5 flex items-center gap-1.5">
                <span class="relative flex size-2">
                  <span
                    class="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex size-2 rounded-full bg-success"
                  ></span>
                </span>
                <span class="text-xs text-slate-500"> Online </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="size-8 text-body hover:text-danger transition duration-150"
            @click="chatStore.close()"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>
        </header>

        <div class="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-5 py-5">
          <div class="flex items-start gap-2">
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
            >
              <UIcon name="i-lucide-store" class="size-4 text-primary" />
            </div>

            <div class="max-w-[80%]">
              <div class="rounded rounded-tl-none bg-white px-4 py-3">
                <p class="text-sm leading-5 text-slate-700">
                  Hello! How can we help you today?
                </p>
              </div>

              <p class="mt-1 text-[11px] text-slate-400">
                Usually responds within 24 hours
              </p>
            </div>
          </div>

          <div class="flex min-h-40 items-center justify-center">
            <div class="text-center">
              <div
                class="mx-auto flex size-12 items-center justify-center rounded-full bg-white"
              >
                <UIcon
                  name="i-lucide-message-circle"
                  class="size-6 text-slate-300"
                />
              </div>

              <p class="mt-3 text-sm font-medium text-slate-500">
                Start a conversation
              </p>

              <p class="mt-1 max-w-xs text-xs text-slate-400">
                Ask about wholesale prices, MOQ, availability or delivery.
              </p>
            </div>
          </div>
        </div>

        <!-- Product -->
        <div
          v-if="product"
          class="border-t border-slate-200 bg-white px-4 py-3"
        >
          <div
            class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <div
              class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded bg-white"
            >
              <NuxtImg
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="size-full object-contain"
              />

              <UIcon
                v-else
                name="i-lucide-package"
                class="size-5 text-slate-400"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-semibold text-slate-700">
                {{ product.name }}
              </p>

              <p
                v-if="product.price"
                class="mt-0.5 text-xs font-medium text-primary"
              >
                {{ product.price }}
              </p>

              <p v-if="product.moq" class="text-xs text-slate-500">
                MOQ: {{ product.moq }}
              </p>
            </div>
          </div>
        </div>

        <!-- Message -->
        <div class="border-t border-slate-200 bg-white p-4">
          <div
            class="flex items-end gap-2 rounded-lg border border-slate-200 p-2 focus-within:border-primary"
          >
            <textarea
              v-model="message"
              rows="1"
              placeholder="Type your message..."
              class="min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none focus:ring-0"
              @keydown.enter.exact.prevent="sendMessage"
            />

            <button
              type="button"
              :disabled="!message.trim()"
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              @click="sendMessage"
            >
              <UIcon name="i-lucide-send" class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
