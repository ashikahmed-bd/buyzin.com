<script setup>
const authStore = useAuthStore();
const chatStore = useChatStore();
const messageStore = useMessageStore();

definePageMeta({
  middleware: ["auth"],
});

const { conversation } = storeToRefs(chatStore);
const { messages } = storeToRefs(messageStore);

const { $echo } = useNuxtApp();

const search = ref("");

const {
  data: conversations,
  pending,
  error,
  refresh,
} = await useAsyncData("conversations", () => chatStore.getConversations(), {
  default: () => ({ data: [] }),
});

const filteredConversations = computed(() => {
  const items = conversations.value?.data ?? [];
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) {
    return items;
  }
  return items.filter((item) => {
    const name = item.user?.name?.toLowerCase() ?? "";
    const message = item.last_message?.toLowerCase() ?? "";
    return name.includes(keyword) || message.includes(keyword);
  });
});

const selectConversation = async (item) => {
  await chatStore.show(item.id);
  await messageStore.getMessages(item.id);
  await messageStore.markAsRead(item.id);
};

const message = ref("");

const sendMessage = async () => {
  if (!conversation.value?.id || !message.value.trim()) {
    return;
  }

  await messageStore.sendMessage(conversation.value.id, {
    message: message.value.trim(),
    type: "text",
  });

  message.value = "";
};

const subscribeToConversation = () => {
  if (!conversation.value?.id) return;

  const channel = `conversations.${conversation.value.id}`;

  $echo.private(channel).listen(".message.created", async () => {
    await messageStore.getMessages(conversation.value.id);
  });
};

onMounted(subscribeToConversation);

const dialog = ref(false);

const unreadCount = computed(() => {
  const participant = conversation?.participants?.find(
    (item) => item.user?.id === authStore.user?.id,
  );

  return participant?.unread_count ?? 0;
});
</script>

<template>
  <div class="fixed right-2 bottom-2 z-50">
    <button
      type="button"
      aria-label="Open messages"
      class="bg-primary duration-200 flex group hover:scale-105 items-center justify-center relative ring-2 rounded-full size-12 text-white transition-all"
      @click="dialog = !dialog"
    >
      <span
        v-if="unreadCount > 0"
        class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-xs font-bold leading-none text-white dark:border-slate-950"
      >
        {{ unreadCount > 9 ? "9+" : unreadCount }}
      </span>

      <UIcon
        v-if="!dialog"
        name="i-lucide-messages-square"
        class="size-6 transition-transform duration-200 group-hover:scale-110"
      />

      <UIcon
        v-else
        name="i-lucide-x"
        class="size-6 transition-transform duration-200 group-hover:scale-110"
      />
    </button>
  </div>

  <!-- Chat Dialog -->
  <Transition name="chat-dialog">
    <div v-if="dialog" class="fixed inset-0 z-40">
      <div
        class="absolute inset-0 bg-black/10 backdrop-blur"
        @click="dialog = false"
      />

      <div
        class="absolute right-4 bottom-14 w-[calc(100vw-2rem)] max-w-3xl overflow-hidden rounded-xl border border-border bg-white"
      >
        <div
          class="flex h-[calc(100dvh-200px)] overflow-hidden rounded-xl bg-white"
        >
          <template v-if="authStore.loggedIn">
            <aside
              class="flex min-h-0 w-full max-w-2xs shrink-0 flex-col border-r border-border"
              :class="conversation ? 'hidden md:flex' : 'flex'"
            >
              <div class="shrink-0 border-b border-border p-3">
                <div class="relative">
                  <UIcon
                    name="i-lucide-search"
                    class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body"
                  />

                  <input
                    v-model="search"
                    type="text"
                    placeholder="Search messages..."
                    class="w-full rounded-md border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-body outline-none transition placeholder:text-body focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div class="min-h-0 flex-1 overflow-y-auto scrollbar">
                <div
                  v-if="pending"
                  class="flex flex-col items-center justify-center py-10"
                >
                  <UIcon
                    name="i-lucide-loader"
                    class="size-6 animate-spin text-primary"
                  />

                  <p class="mt-2 text-sm text-body">Please wait...</p>
                </div>

                <div
                  v-else-if="error"
                  class="flex flex-col items-center justify-center p-8 text-center"
                >
                  <UIcon
                    name="i-lucide-circle-alert"
                    class="mb-2 size-6 text-red-500"
                  />

                  <p class="text-sm font-medium text-title">
                    We couldn't load your conversations.
                  </p>

                  <p class="mt-1 text-xs text-body">
                    Please try again in a moment.
                  </p>

                  <div class="py-4">
                    <button
                      type="button"
                      @click="refresh"
                      class="bg-primary text-white px-4 py-2 rounded"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <div
                  v-else-if="!filteredConversations.length"
                  class="flex flex-col items-center justify-center p-8 text-center"
                >
                  <UIcon
                    name="i-lucide-message-circle"
                    class="mb-3 size-8 text-gray-400"
                  />

                  <p class="text-sm font-semibold text-title">
                    No conversations yet
                  </p>

                  <p class="mt-1 max-w-xs text-xs leading-5 text-body">
                    Your conversations with buyers and sellers will appear here.
                  </p>

                  <div class="py-4">
                    <button
                      type="button"
                      @click="refresh"
                      class="bg-primary text-white px-4 py-2 rounded"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <template v-else>
                  <div class="space-y-0.5 p-2">
                    <ChatConversationItem
                      v-for="item in filteredConversations"
                      :key="item.id"
                      :conversation="item"
                      :selected="conversation?.id === item.id"
                      @click="selectConversation(item)"
                    />
                  </div>
                </template>
              </div>
            </aside>

            <section
              class="flex min-h-0 min-w-0 flex-1 flex-col"
              :class="conversation ? 'flex' : 'hidden md:flex'"
            >
              <div
                v-if="!conversation"
                class="flex min-h-0 flex-1 items-center justify-center px-6"
              >
                <div class="max-w-sm text-center">
                  <div
                    class="mx-auto flex size-16 items-center justify-center rounded-full bg-gray-50"
                  >
                    <UIcon
                      name="i-lucide-message-circle"
                      class="size-8 text-gray-300"
                    />
                  </div>

                  <h3 class="mt-4 text-sm font-semibold text-title">
                    Select a conversation
                  </h3>

                  <p class="mt-1 text-xs leading-5 text-body">
                    Choose a conversation to view messages.
                  </p>
                </div>
              </div>

              <template v-else>
                <div class="shrink-0 border-b border-border">
                  <div class="flex items-center">
                    <button
                      type="button"
                      class="pl-2.5 hover:text-title md:hidden"
                      @click="conversation = null"
                    >
                      <UIcon name="i-lucide-arrow-left" class="size-5" />
                    </button>

                    <div class="min-w-0 flex-1">
                      <LazyChatHeader
                        :conversation="conversation"
                        :store="conversation.store"
                      />
                    </div>
                  </div>
                </div>

                <main
                  class="min-h-0 flex-1 overflow-y-auto scrollbar-none px-3 py-4 sm:px-4"
                >
                  <div
                    v-if="!messages"
                    class="flex h-full items-center justify-center"
                  >
                    <div class="text-center">
                      <UIcon
                        name="i-lucide-loader"
                        class="mx-auto size-6 animate-spin text-primary"
                      />

                      <p class="mt-2 text-sm text-body">Loading messages...</p>
                    </div>
                  </div>

                  <div
                    v-else-if="!messages.length"
                    class="flex h-full items-center justify-center text-sm text-body"
                  >
                    No messages yet.
                  </div>

                  <div v-else class="space-y-3 sm:space-y-4">
                    <LazyChatMessageItem
                      v-for="item in messages"
                      :key="item.id"
                      :message="item"
                    />
                  </div>
                </main>

                <footer
                  class="shrink-0 border-t border-border bg-white p-2.5 sm:p-3"
                >
                  <form
                    @submit.prevent="sendMessage"
                    class="flex items-center gap-2"
                  >
                    <input
                      v-model="message"
                      @keydown.enter.exact.prevent="sendMessage"
                      type="text"
                      autocomplete="off"
                      placeholder="Type your message..."
                      class="min-w-0 flex-1 rounded border border-border bg-white px-3 py-2.5 text-sm text-body outline-none transition placeholder:text-body focus:border-primary focus:ring-1 focus:ring-primary"
                    />

                    <button
                      type="button"
                      class="flex size-10 shrink-0 items-center justify-center rounded border border-border text-body transition hover:bg-gray-50 hover:text-title"
                    >
                      <UIcon name="i-lucide-smile" class="size-4" />
                    </button>

                    <button
                      type="button"
                      class="hidden size-10 shrink-0 items-center justify-center rounded border border-border text-body transition hover:bg-gray-50 hover:text-title sm:flex"
                    >
                      <UIcon name="i-lucide-paperclip" class="size-4" />
                    </button>

                    <button
                      type="submit"
                      :disabled="!message.trim() || messageStore.loading"
                      class="flex size-10 shrink-0 items-center justify-center rounded bg-primary text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-4"
                    >
                      <UIcon
                        v-if="messageStore.loading"
                        name="i-lucide-loader"
                        class="size-4 animate-spin"
                      />
                      <UIcon v-else name="i-lucide-send" class="size-4" />
                    </button>
                  </form>
                </footer>
              </template>
            </section>
          </template>

          <template v-else>
            <main class="flex min-h-0 flex-1 items-center justify-center px-6">
              <div class="max-w-xs text-center">
                <div
                  class="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <UIcon name="i-lucide-message-circle" class="size-8" />
                </div>

                <h3 class="mt-4 text-base font-semibold text-title">
                  Login to start chatting
                </h3>

                <p class="mt-2 text-sm leading-5 text-body">
                  Sign in to your account to chat with sellers, manage
                  conversations, and keep your messages in one place.
                </p>

                <div class="mt-5 flex flex-col gap-2">
                  <NuxtLink
                    to="/auth/login"
                    class="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary/90"
                    @click="dialog = false"
                  >
                    <UIcon name="i-lucide-log-in" class="size-4" />
                    Login to Chat
                  </NuxtLink>

                  <NuxtLink
                    to="/auth/register"
                    class="flex items-center justify-center rounded border border-border px-4 py-2.5 text-sm font-medium text-title transition hover:bg-gray-50"
                    @click="dialog = false"
                  >
                    Create an account
                  </NuxtLink>
                </div>
              </div>
            </main>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>
