<script setup>
const sidebarOpen = ref(false);
</script>
<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-lg p-2 text-body transition hover:bg-gray-100 hover:text-primary md:hidden"
    @click="sidebarOpen = true"
  >
    <UIcon name="i-lucide-menu" class="size-6" />
  </button>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>
    <Transition name="sidebar">
      <aside
        v-if="sidebarOpen"
        class="fixed inset-y-0 left-0 z-50 flex flex-col w-full bg-white md:hidden"
      >
        <div
          class="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4"
        >
          <NuxtLink to="/" @click="sidebarOpen = false">
            <img src="/logo.svg" alt="Logo" class="h-10 w-auto" />
          </NuxtLink>
          <button
            type="button"
            class="inline-flex size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            @click="sidebarOpen = false"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto">
          <NuxtLink
            to="/"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/brands"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Brands
          </NuxtLink>
          <NuxtLink
            to="/deals"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Deals
          </NuxtLink>
          <NuxtLink
            to="/request-a-quote"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Request a Quote
          </NuxtLink>
          <NuxtLink
            to="/become-a-seller"
            class="block border-b border-gray-100 px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Become a Seller
          </NuxtLink>
          <NuxtLink
            to="/support"
            class="block px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            active-class="bg-primary/5 text-primary"
            @click="sidebarOpen = false"
          >
            Support
          </NuxtLink>
        </nav>
      </aside>
    </Transition>
  </Teleport>
</template>
<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
