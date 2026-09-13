<script setup>
const authStore = useAuthStore();
const cartStore = useCartStore();

const { user } = storeToRefs(authStore);

const mobileNavigation = ref(false);

const closeMobileNavigation = () => {
  mobileNavigation.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur">
    <div class="container mx-auto px-4 border-b border-border">
      <div class="flex items-center justify-between py-2.5">
        <button
          type="button"
          @click="mobileNavigation = !mobileNavigation"
          class="inline-flex items-center justify-center rounded-lg p-2 text-body transition hover:bg-gray-100 hover:text-primary md:hidden"
        >
          <UIcon
            :name="mobileNavigation ? 'i-lucide-x' : 'i-lucide-menu'"
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

        <div class="flex items-center gap-6">
          <a
            :href="user ? '/account' : '/auth/login'"
            class="hidden md:flex items-center gap-2.5 rounded-xl px-2.5"
          >
            <template v-if="user">
              <NuxtImg
                v-if="user.photo_url"
                :src="user.photo_url"
                :alt="user.name"
                class="h-10 w-10 rounded-full border object-cover p-0.5"
              />

              <div
                v-else
                class="flex h-10 w-10 items-center justify-center rounded-full border bg-gray-100 text-sm font-semibold"
              >
                {{ user.name?.charAt(0) }}
              </div>

              <div class="leading-tight">
                <p class="text-xs text-gray-500">Welcome back</p>

                <p class="max-w-2xs truncate text-sm font-semibold text-title">
                  {{ user.name }}
                </p>
              </div>
            </template>

            <template v-else>
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <UIcon
                  name="i-lucide-user-round"
                  class="size-5 text-gray-600"
                />
              </div>
              <div class="hidden md:block leading-tight">
                <p class="text-xs text-gray-500">Account</p>
                <p class="text-sm font-semibold text-gray-900">Sign In</p>
              </div>
            </template>
          </a>

          <div class="flex items-center gap-4">
            <a href="/wishlist" class="relative hidden md:block cursor-pointer">
              <UIcon name="i-lucide-heart" class="size-5 text-body" />
              <span
                class="absolute -top-2 -right-2 bg-danger text-white text-xs px-1 rounded-full"
              >
                0
              </span>
            </a>

            <a href="/cart" class="relative cursor-pointer">
              <UIcon name="i-lucide-shopping-cart" class="size-5 text-body" />
              <ClientOnly>
                <span
                  class="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full"
                >
                  {{ cartStore.itemCount }}
                </span>
              </ClientOnly>
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile search -->
      <form class="relative w-full block md:hidden">
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
        :open="mobileNavigation"
        @close="closeMobileNavigation"
      />
    </div>
    <MainNavigation />
  </header>
</template>

<style scoped></style>
