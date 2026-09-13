<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
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
      class="bg-white absolute left-0 top-full z-50 border border-border w-full rounded-b-xl"
      @click.stop
    >
      <aside @click.stop>
        <nav class="py-4">
          <div class="space-y-1">
            <a
              href="/"
              class="flex items-center justify-between rounded px-4 py-2.5 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              <span>Become a Supplier</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
            <a
              href="/help-center"
              class="flex items-center justify-between rounded px-4 py-2.5 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              <span>Help Center</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
            <a
              href="/contact"
              class="flex items-center justify-between rounded px-4 py-2.5 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              <span>Contact</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
            <a
              href="/about"
              class="flex items-center justify-between rounded px-4 py-2.5 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              <span>About US</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
            <a
              href="/blog"
              class="flex items-center justify-between rounded px-4 py-2.5 text-sm font-medium text-body transition hover:bg-slate-100"
              @click="close"
            >
              <span>Blog</span>
              <UIcon name="i-lucide-chevron-right" class="size-4" />
            </a>
          </div>
        </nav>

        <div class="border-t border-border border-dashed p-4">
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

<style scoped></style>
