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
            v-if="authStore.loggedIn"
            :items="items"
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
              variant="link"
              class="flex items-center gap-2 rounded-full px-1.5"
            >
              <NuxtImg
                v-if="user?.photo_url"
                :src="user.photo_url"
                :alt="user.name"
                class="size-10 rounded-full object-cover"
              />

              <span
                v-else
                class="flex size-10 items-center justify-center rounded-full bg-gray-100"
              >
                <UIcon
                  name="i-lucide-user-round"
                  class="size-5 text-gray-500"
                />
              </span>

              <div class="hidden text-left sm:block">
                <p class="text-xs leading-3 text-body">Welcome back</p>

                <h4
                  class="max-w-24 truncate text-sm font-semibold leading-5 text-body"
                >
                  {{ user?.name ?? "Account" }}
                </h4>
              </div>
              <UIcon
                name="i-lucide-chevron-down"
                class="hidden size-4 text-gray-400 sm:block"
              />
            </UButton>
          </UDropdownMenu>

          <UButton
            v-else
            to="/auth/login"
            variant="link"
            class="flex items-center gap-2 rounded-full px-1.5"
          >
            <span
              class="flex size-10 items-center justify-center rounded-full bg-gray-100"
            >
              <UIcon name="i-lucide-user-round" class="size-5 text-gray-500" />
            </span>

            <div class="hidden text-left sm:block">
              <p class="text-xs leading-3 text-body">Account</p>

              <h4 class="text-sm font-semibold leading-5 text-body">Sign In</h4>
            </div>
          </UButton>
        </div>
      </div>

      <MobileSearch />

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
