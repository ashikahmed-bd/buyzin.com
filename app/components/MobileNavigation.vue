<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  categories: {
    type: Object,
    default: {},
  }
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Transition name="slide-fade">
    <aside v-if="open" class="fixed top-0 inset-x-0 z-40 bg-white">
      <div class="flex items-center justify-between px-4 h-16 border-b shrink-0">
        <NuxtLink to="/" class="block py-2">
          <img src="/logo.svg" class="h-12 w-auto" />
        </NuxtLink>

        <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="emit('close')" />
      </div>

      <nav class="overflow-y-auto h-[calc(100dvh-64px)] px-2 py-4">
        <ul class="space-y-2">
          <NavigationItem v-for="category in props.categories.data" :key="category.id" :item="category" />
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<style scoped></style>
