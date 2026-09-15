<script setup>
const authStore = useAuthStore();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();

const { user } = storeToRefs(authStore);

const mobileNavigation = ref(false);

const closeMobileNavigation = () => {
  mobileNavigation.value = false;
};

const { data: categories } = await useAsyncData("categories", async () => {
  return await categoryStore.getCategories();
});
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur">
    <div class="container mx-auto px-4 border-b border-border">
      <div class="flex items-center justify-between py-2.5">
        <button
          type="button"
          @click="mobileNavigation = !mobileNavigation"
          class="text-body transition hover:text-primary md:hidden"
        >
          <UIcon
            :name="
              mobileNavigation ? 'i-lucide-x' : 'i-lucide-text-align-start'
            "
            class="size-6"
          />
        </button>
        <div class="flex-none">
          <a href="/" class="block">
            <NuxtImg
              src="/logo.svg"
              alt="buyzin"
              class="h-12 w-auto object-contain"
            />
          </a>
        </div>

        <!-- search -->
        <SearchBar />

        <div class="flex items-center gap-1">
          <a
            href="/account/notifications"
            class="relative flex size-10 shrink-0 items-center justify-center rounded-full text-body transition hover:bg-gray-100"
          >
            <UIcon name="i-lucide-bell" class="size-5" />
            <span
              class="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white"
            />
          </a>

          <a
            :href="user ? '/account' : '/auth/login'"
            class="group flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50"
          >
            <div
              class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50"
            >
              <NuxtImg
                v-if="user?.photo_url"
                :src="user.photo_url"
                :alt="user.name"
                class="size-full object-cover"
              />

              <UIcon
                v-else
                name="i-lucide-user-round"
                class="size-5 text-gray-500"
              />
            </div>

            <div class="hidden min-w-0 text-left md:block">
              <p class="text-xs leading-4 text-gray-500">
                {{ user ? "Welcome back" : "Account" }}
              </p>

              <p
                class="max-w-32 truncate text-sm font-semibold leading-5 text-title"
              >
                {{ user?.name || "Sign In" }}
              </p>
            </div>

            <UIcon
              name="i-lucide-chevron-down"
              class="hidden size-4 text-gray-400 transition group-hover:text-gray-600 md:block"
            />
          </a>
        </div>
      </div>

      <!-- Mobile search -->
      <form class="relative w-full block md:hidden mb-2">
        <input
          type="search"
          placeholder="Search products..."
          class="w-full border-2 border-primary/70 rounded py-2.5 pl-4 pr-14 text-sm outline-none focus:border-primary focus:outline-none transition"
        />
        <button
          type="submit"
          class="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-primary rounded-r hover:bg-primary/90 transition"
        >
          <UIcon name="i-lucide-search" class="size-5 text-white" />
        </button>
      </form>

      <!-- Mobile navigation -->
      <MobileNavigation
        :categories="categories"
        :open="mobileNavigation"
        @close="closeMobileNavigation"
      />
    </div>
    <MainNavigation :categories="categories" />
  </header>
</template>

<style scoped></style>
