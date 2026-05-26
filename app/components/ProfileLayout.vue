<script setup>
const route = useRoute();
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const logout = async () => {
  if (confirm("Are you sure you went to logout?")) {
    await authStore.logout();
  }
};
</script>

<template>
  <main class="container mx-auto p-4">
    <div class="flex items-start gap-4">
      <aside
        class="bg-white w-80 max-w-full rounded-xl hidden md:block h-screen"
      >
        <div class="flex items-center gap-4 p-4 border-b border-border">
          <NuxtImg
            :src="user?.photo_url"
            :alt="user?.name"
            class="w-12 h-12 rounded-full"
          />
          <div class="text-left">
            <h5 class="font-semibold text-base">{{ user?.name }}</h5>
            <a
              class="text-sm text-gray-500 truncate block"
              href="mailto:alitfn58@gmail.com"
              >{{ user?.email ?? "N/A" }}</a
            >
          </div>
        </div>

        <ul class="grow space-y-2 p-4">
          <li>
            <NuxtLink
              to="/profile"
              class="flex items-center gap-2 font-medium p-2 rounded hover:bg-gray-100"
              :class="{
                'text-primary bg-primary/10': route.path === '/profile',
              }"
            >
              <IconsIconHome class="size-5" />
              <span>My Account</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/profile/orders"
              class="flex items-center gap-2 font-medium p-2 rounded hover:bg-gray-100"
              :class="{
                'text-primary bg-primary/10': route.path === '/profile/orders',
              }"
            >
              <IconsIconShoppingBag class="size-5" />
              <span class="font-normal">Order</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/profile/address"
              class="flex items-center gap-2 font-medium p-2 rounded hover:bg-gray-100"
              :class="{
                'text-primary bg-primary/10': route.path === '/profile/address',
              }"
            >
              <IconsIconLocation class="size-5" />
              <span>Address</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/profile/wishlist"
              class="flex items-center gap-2 font-medium p-2 rounded hover:bg-gray-100"
              :class="{
                'text-primary bg-primary/10':
                  route.path === '/profile/wishlist',
              }"
            >
              <IconsIconHeart class="size-5" />
              <span>Wishlist</span>
            </NuxtLink>
          </li>

          <li>
            <button
              type="button"
              @click="logout"
              class="w-full flex items-center gap-2 font-medium p-2 rounded text-red-500 hover:bg-gray-100"
            >
              <IconsIconLogout class="size-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- Content -->
      <div class="flex-1 relative overflow-x-auto">
        <slot />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
