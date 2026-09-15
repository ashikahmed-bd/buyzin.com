<script setup>
const chatStore = useChatStore();
const messageStore = useMessageStore();

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
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Messages | Buyzin</Title>
      <Meta
        name="description"
        content="Manage your conversations and communicate with buyers and sellers on Buyzin."
      />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'My Account',
          to: '/account',
        },
        {
          label: 'Messages',
        },
      ]"
      class="text-sm"
    />

    <div class="mb-6 sticky top-5">
      <h1 class="text-2xl font-bold text-title">Messages</h1>
      <p class="mt-1 text-sm text-body">
        Communicate with your buyers and manage all conversations.
      </p>
    </div>

    <div
      class="flex h-[calc(100dvh-20px)] min-h-0 overflow-hidden rounded-xl bg-white"
    >
      <aside
        class="flex w-full min-h-0 shrink-0 flex-col border-r border-gray-200 md:w-80"
      >
        <div class="shrink-0 border-b border-gray-200 p-3">
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
          <div v-if="pending" class="text-center py-6">
            <UIcon
              name="i-lucide-loader"
              class="size-6 animate-spin text-primary"
            />
            <p class="text-sm text-body">Please wait...</p>
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
            <p class="mt-1 text-xs text-body">Please try again in a moment.</p>
          </div>

          <div
            v-else-if="!filteredConversations.length"
            class="flex flex-col items-center justify-center p-8 text-center"
          >
            <UIcon
              name="i-lucide-message-circle"
              class="mb-3 size-8 text-gray-400"
            />
            <p class="text-sm font-semibold text-title">No conversations yet</p>
            <p class="mt-1 max-w-xs text-xs leading-5 text-body">
              Your conversations with buyers and sellers will appear here.
            </p>
          </div>

          <template v-else>
            <ChatConversationItem
              v-for="item in filteredConversations"
              :key="item.id"
              :conversation="item"
              :selected="conversation?.data?.id === item.id"
              @click="selectConversation(item)"
            />
          </template>
        </div>

        <div
          class="flex shrink-0 items-center border-t border-gray-100 px-4 py-2 text-xs text-body"
        >
          Showing {{ filteredConversations.length }} of
          {{ conversations?.data?.length ?? 0 }} conversations
        </div>
      </aside>

      <section class="hidden min-h-0 min-w-0 flex-1 flex-col md:flex">
        <div v-if="conversation" class="shrink-0">
          <LazyChatHeader
            :conversation="conversation"
            :user="conversation.sender"
          />
        </div>

        <template v-if="messages">
          <main class="min-h-0 flex-1 overflow-y-auto scrollbar px-4 py-2">
            <div
              v-if="!messages.length"
              class="flex h-full items-center justify-center text-sm text-body"
            >
              No messages yet.
            </div>

            <div v-else class="space-y-4">
              <LazyChatMessageItem
                v-for="item in messages"
                :key="item.id"
                :message="item"
              />
            </div>
          </main>

          <div class="shrink-0">
            <footer class="border-t border-gray-200 bg-white p-3">
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
                  :disabled="!message.trim() || messageStore.loading"
                  class="flex shrink-0 items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span class="hidden sm:inline"> Send </span>
                  <UIcon
                    v-if="messageStore.loading"
                    name="i-lucide-loader"
                    class="size-4 animate-spin"
                  />
                  <UIcon v-else name="i-lucide-send" class="size-4" />
                </button>
              </form>
            </footer>
          </div>
        </template>

        <div v-else class="flex min-h-0 flex-1 items-center justify-center">
          <div class="text-center">
            <UIcon
              name="i-lucide-message-circle"
              class="mx-auto size-10 text-gray-300"
            />

            <h3 class="mt-3 text-sm font-semibold text-title">
              Select a conversation
            </h3>

            <p class="mt-1 text-xs text-body">
              Choose a conversation to view messages.
            </p>
          </div>
        </div>
      </section>
    </div>
  </Dashboard>
</template>
