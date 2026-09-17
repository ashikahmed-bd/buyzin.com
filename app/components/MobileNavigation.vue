<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  categories: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="props.open"
      class="absolute left-0 top-full z-50 w-full overflow-hidden rounded-b-xl border border-border bg-white"
      @click.stop
    >
      <aside class="flex max-h-[calc(100vh-80px)] flex-col" @click.stop>
        <!-- Categories -->
        <nav class="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <NavigationItem
            v-for="category in props.categories.data"
            :key="category.id"
            :item="category"
          />
        </nav>

        <!-- Bottom Actions -->
        <div class="shrink-0 border-t border-dashed border-border bg-white p-4">
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink
              to="/auth/login"
              class="inline-flex items-center justify-center rounded border border-border px-4 py-3 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              Sign in
            </NuxtLink>

            <NuxtLink
              to="/auth/register"
              class="inline-flex items-center justify-center rounded bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
              @click="close"
            >
              Sign up
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </transition>
</template>
