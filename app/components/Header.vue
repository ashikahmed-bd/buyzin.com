<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const cartStore = useCartStore();

const { user } = storeToRefs(authStore);

const profileRef = ref(null);
const showProfileDropdown = ref(false);
const open = ref(false);

const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

const onClickOutside = (event) => {
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    showProfileDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});

const logout = async () => {
  if (confirm("Are you sure you went to logout?")) {
    await authStore.logout();
  }
};

const categoryStore = useCategoryStore();

const { data: categories, pending } = await useAsyncData("categories", async () => {
  return await categoryStore.getCategories();
});

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
              <icons-icon-search class="size-5 text-gray-400" />
            </div>

            <input type="search" placeholder="Enter search keywords..."
              class="w-full pl-10 pr-24 py-2.5 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400" />

            <button
              class="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white px-5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-200">
              Search
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <NuxtLink to="/cart"
            class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80 relative">
            <IconsIconCart class="size-5" />
            <span
              class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
              {{ cartStore.itemCount ?? 0 }}
            </span>
          </NuxtLink>

          <template v-if="authStore.loggedIn && authStore.user">
            <div ref="profileRef" class="relative">
              <div @click="toggleProfileDropdown" class="flex items-center gap-2 cursor-pointer">
                <div class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80">
                  <IconsIconUser class="size-5" />
                </div>

                <div class="hidden md:flex flex-col text-left">
                  <small class="text-xs">Hello, sign in</small>
                  <span class="font-semibold text-body whitespace-nowrap">
                    Account & Lists
                  </span>
                </div>
                <svg :class="{ 'rotate-180': showProfileDropdown }"
                  class="w-4 h-4 text-gray-500 transition-transform duration-200 hidden md:block" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <transition name="fade">
                <nav v-if="showProfileDropdown"
                  class="absolute top-full right-0 mt-2 w-64 rounded-xl border border-border bg-white z-50 shadow-lg">
                  <div class="flex items-center gap-3 border-b border-border px-4 py-2">
                    <NuxtImg :src="user?.photo_url" :alt="user?.name"
                      class="w-10 h-10 rounded-full border border-border" />
                    <div>
                      <h4 class="text-sm font-semibold text-heading">
                        {{ user?.name }}
                      </h4>
                      <p class="text-xs">
                        {{ user?.email ?? "N/A" }}
                      </p>
                    </div>
                  </div>

                  <ul class="space-y-1 text-sm text-gray-700 px-2 py-4">
                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition">
                      <IconsIconProfile class="size-5" />
                      <NuxtLink to="/profile">My Profile</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition">
                      <IconsIconList class="size-5" />
                      <NuxtLink to="/profile/orders">Orders</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition">
                      <IconsIconLocation class="size-5" />
                      <NuxtLink to="/profile/address">Address</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition">
                      <IconsIconHeart class="size-5" />
                      <NuxtLink to="/profile/wishlist">Wishlist</NuxtLink>
                    </li>

                    <li
                      class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-red-500 cursor-pointer rounded transition">
                      <IconsIconLoading v-if="authStore.loading" class="size-5 animate-spin" />
                      <IconsIconLogout v-else class="size-5" />
                      <button @click="logout" class="flex items-center gap-1 disabled:opacity-50">
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </transition>
            </div>
          </template>

          <template v-else>
            <NuxtLink to="/auth/login" class="flex items-center gap-2 cursor-pointer">
              <div class="bg-white border border-border text-primary p-2 rounded-full hover:text-primary/80">
                <IconsIconUser class="size-5" />
              </div>

              <div class="hidden md:flex flex-col text-left">
                <small class="text-xs">Hello, sign in</small>
                <span class="font-semibold text-body whitespace-nowrap">
                  Account & Lists
                </span>
              </div>

              <svg class="w-4 h-4 text-gray-500 transition-transform duration-200 hidden md:block" fill="none"
                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </NuxtLink>
          </template>
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
