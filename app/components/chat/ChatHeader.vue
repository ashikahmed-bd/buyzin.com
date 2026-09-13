<script setup>
const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },
});

const user = computed(() => props.conversation?.user);
</script>
<template>
  <header
    class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3.5"
  >
    <div class="flex min-w-0 items-center gap-3">
      <NuxtImg
        :src="user?.photo_url"
        :alt="user?.name"
        class="size-9 shrink-0 rounded-full border border-gray-100 object-cover"
      />
      <div class="min-w-0">
        <h2 class="truncate text-sm font-semibold text-title">
          {{ user?.name ?? "Unknown" }}
        </h2>
        <div class="mt-0.5 flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-success" />
          <span class="text-xs text-success"> Active now </span>
        </div>
      </div>
      <div
        v-if="conversation.product"
        class="ml-2 hidden min-w-0 items-center gap-2 border-l border-gray-200 pl-3 sm:flex"
      >
        <NuxtImg
          :src="conversation.product.cover_url"
          :alt="conversation.product.name"
          class="size-9 shrink-0 rounded-md border border-gray-100 object-cover"
        />
        <div class="min-w-0">
          <p class="max-w-50 truncate text-xs font-medium text-title">
            {{ conversation.product.name }}
          </p>
          <p class="mt-0.5 text-xs text-body">Product</p>
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
