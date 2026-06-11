<script setup>
const authStore = useAuthStore()
const cartStore = useCartStore();

const open = ref(false);

const categoryStore = useCategoryStore();

const { data: categories } = await useAsyncData("categories", async () => {
  return await categoryStore.getCategories();
}
);

</script>

<template>
  <header class="sticky top-0 z-30 border-b border-border bg-white">
    <div class="max-w-7xl mx-auto px-4 py-2.5">
      <div class="flex items-center justify-between">
        <button type="button" class="p-2 rounded hover:text-primary hover:bg-gray-100 md:hidden" @click="open = true">
          <UIcon name="i-lucide-menu" class="size-6" />
        </button>

        <div class="flex-none">
          <a href="/" class="block">
            <NuxtImg src="/logo.svg" alt="buyzin" class="h-12 w-auto object-contain" />
          </a>
        </div>

        <div class="hidden lg:block grow max-w-2xl mx-12">
          <div class="relative w-full mx-auto">
            <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <LazyUIcon name="i-lucide-search" class="size-5 text-muted" />
            </div>

            <input type="search" placeholder="Enter search keywords..."
              class="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400" />

            <button
              class="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white px-5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200">
              Search
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Cart -->
          <NuxtLink to="/cart"
            class="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-primary hover:bg-gray-50 transition-all">
            <UIcon name="i-lucide-shopping-cart" class="size-5" />

            <span
              class="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-primary rounded-full">
              {{ cartStore.items?.length ?? 0 }}
            </span>
          </NuxtLink>

          <NuxtLink :to="authStore.loggedIn ? '/account' : '/auth/login'"
            class="group flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-all">
            <div
              class="size-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shrink-0">
              <UIcon name="i-lucide-user-round" class="size-5" />
            </div>

            <div class="hidden md:flex flex-col leading-tight min-w-0">
              <span class="text-xs text-gray-500">
                {{ authStore.loggedIn ? 'Welcome back' : 'Hello, Sign in' }}
              </span>

              <span class="font-semibold text-gray-900 truncate">
                {{ authStore.loggedIn ? authStore.user?.name : 'Account & Lists' }}
              </span>
            </div>

            <UIcon name="i-lucide-chevron-down"
              class="hidden md:block size-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile search -->
      <form class="relative w-full mx-auto mt-3 block md:hidden">
        <input type="search" placeholder="Search products..."
          class="w-full border-2 border-primary/70 rounded py-2.5 pl-4 pr-14 text-sm outline-none focus:border-primary focus:outline-none transition" />
        <button type="submit"
          class="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-primary rounded-r hover:bg-primary/90 transition">
          <UIcon name="i-lucide-search" class="size-5 text-white" />
        </button>
      </form>
    </div>
  </header>

  <nav class="hidden md:block bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <nav class="scrollbar flex items-center overflow-x-auto whitespace-nowrap">
        <UDropdownMenu v-for="parent in categories?.data" :key="parent.id" :items="parent.children.map((item) => ({
          label: item.name,
          to: `/categories/${parent.slug}/${item.slug}`,
          trailingIcon: item.children?.length
            ? 'i-lucide-chevron-right'
            : undefined,

          children: item.children?.map((child) => ({
            label: child.name,
            to: `/categories/${parent.slug}/${item.slug}/${child.slug}`,
            trailingIcon: child.children?.length
              ? 'i-lucide-chevron-right'
              : undefined,

            children: child.children?.map((sub) => ({
              label: sub.name,
              to: `/categories/${parent.slug}/${item.slug}/${child.slug}/${sub.slug}`,
            })),
          })),
        }))" :ui="{
          content: 'w-60'
        }">

          <UButton color="neutral" variant="ghost" trailing-icon="i-lucide-chevron-down">
            {{ parent.name }}
          </UButton>
        </UDropdownMenu>
      </nav>
    </div>
  </nav>

  <MobileNavigation :categories="categories" v-if="open" :open="open" @close="open = false" />
</template>

<style scoped></style>
