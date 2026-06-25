<script setup>
const authStore = useAuthStore()
const categoryStore = useCategoryStore();

const open = ref(false);

const { data: categories, error, pending } = useAsyncData("categories", async () => {
  return categoryStore.getCategories();
});

</script>

<template>
  <div class="w-full hidden md:block bg-gray-100 text-xs text-gray-600 border-b">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
      <div class="flex items-center gap-6">
        <span>Free delivery on orders over 2999 BDT.</span>
      </div>

      <div class="flex items-center gap-4">
        <a href="#" class="hover:text-black">Sell on Buyzin</a>
        <a href="#" class="hover:text-black">Track Order</a>
        <a href="#" class="hover:text-black">Help & Support</a>
        <span>English / BDT</span>
      </div>
    </div>
  </div>
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
          <div class="flex w-full items-center bg-white border border-border rounded-full transition">
            <select class="max-w-40 bg-transparent px-4 py-2 text-sm text-body focus:outline-none">
              <option value="">All Categories</option>
              <template v-for="parent in categories.data" :key="parent.id">
                <optgroup :label="parent.name">
                  <option :value="parent.slug">
                    All {{ parent.name }}
                  </option>
                  <option v-for="child in parent.children" :key="child.id" :value="child.slug">
                    {{ child.name }}
                  </option>
                  <template v-for="child in parent.children">
                    <option v-for="item in child.children" :key="item.id" :value="item.slug">
                      — {{ item.name }}
                    </option>
                  </template>
                </optgroup>
              </template>
            </select>

            <input type="search" placeholder="Search products..."
              class="flex-1 px-4 py-2 text-sm text-body placeholder-gray-400 bg-transparent focus:outline-none" />
            <button
              class="m-1 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 active:scale-[0.98] transition">
              Search
            </button>

          </div>
        </div>

        <div class="flex items-center gap-6">
          <NuxtLink :to="authStore.user ? '/account' : '/auth/login'"
            class="flex items-center gap-2.5 rounded-xl px-2.5">
            <template v-if="authStore.user">
              <NuxtImg :src="authStore.user.photo_url" :alt="authStore.user.name"
                class="h-10 w-10 rounded-full border object-cover" />

              <div class="leading-tight">
                <p class="text-xs text-gray-500">
                  Welcome back
                </p>

                <p class="max-w-2xs truncate text-sm font-semibold text-title">
                  {{ authStore.user.name }}
                </p>
              </div>
            </template>

            <template v-else>
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <UIcon name="i-lucide-user-round" class="size-5 text-gray-600" />
              </div>
              <div class="leading-tight">
                <p class="text-xs text-gray-500">
                  Account
                </p>
                <p class="text-sm font-semibold text-gray-900">
                  Sign In
                </p>
              </div>
            </template>
          </NuxtLink>

          <div class="relative hidden md:block cursor-pointer">
            <UIcon name="i-lucide-heart" class="size-6 text-body" />
            <span class="absolute -top-2 -right-2 bg-danger text-white text-xs px-1 rounded-full">
              0
            </span>
          </div>

          <div class="relative hidden md:block cursor-pointer">
            <UIcon name="i-lucide-shopping-cart" class="size-6 text-body" />
            <span class="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
              0
            </span>
          </div>
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

  <MobileNavigation :categories="categories" v-if="open" :open="open" @close="open = false" />

</template>

<style scoped></style>
