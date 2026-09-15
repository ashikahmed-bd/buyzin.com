<script setup>
const authStore = useAuthStore();
const categoryStore = useCategoryStore();

const { user } = storeToRefs(authStore);

const mobileNavigation = ref(false);

const closeMobileNavigation = () => {
  mobileNavigation.value = false;
};

const { data: categories } = await useAsyncData("categories", async () => {
  return await categoryStore.getCategories();
});

const logout = async () => {
  if (confirm("Are you sure you want to logout?")) {
    await authStore.logout();
  }
};

const items = [
  [
    {
      label: "Dashboard",
      to: "/account",
      icon: "i-lucide-layout-dashboard",
    },
    {
      label: "My Orders",
      to: "/account/orders",
      icon: "i-lucide-package",
    },

    {
      label: "Messages",
      to: "/account/messages",
      icon: "i-lucide-messages-square",
    },

    {
      label: "My Reviews",
      to: "/account/reviews",
      icon: "i-lucide-star",
    },
    {
      label: "Wishlist",
      to: "/account/wishlist",
      icon: "i-lucide-heart",
    },
    {
      label: "My Profile",
      to: "/account/profile",
      icon: "i-lucide-user",
    },
    {
      label: "Address",
      to: "/account/addresses",
      icon: "i-lucide-map-pin",
    },
    {
      label: "Notifications",
      to: "/account/notifications",
      icon: "i-lucide-bell",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      color: "error",
      onSelect: logout,
    },
  ],
];
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

          <UDropdownMenu
            :items="authStore.loggedIn ? items : []"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 8,
            }"
            :ui="{
              content: 'w-60',
            }"
          >
            <UButton
              :to="authStore.loggedIn ? '/account' : '/auth/login'"
              variant="link"
              class="flex items-center gap-2 rounded-full px-1.5 hover:bg-gray-100"
            >
              <NuxtImg
                v-if="user?.photo_url"
                :src="user.photo_url"
                :alt="user.name"
                class="size-10 object-cover rounded-full"
              />

              <UIcon
                v-else
                name="i-lucide-user-round"
                class="size-5 text-gray-500"
              />

              <div class="hidden text-left sm:block">
                <p class="text-xs leading-3 text-body">
                  {{ user ? "Welcome back" : "Account" }}
                </p>
                <h4
                  class="max-w-24 truncate text-sm font-semibold leading-5 text-body"
                >
                  {{ user?.name ?? "Sign In" }}
                </h4>
              </div>
              <UIcon
                name="i-lucide-chevron-down"
                class="hidden size-4 text-gray-400 sm:block"
              />
            </UButton>
          </UDropdownMenu>
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
