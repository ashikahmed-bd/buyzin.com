<script setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const menu = [
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
];

const logout = async () => {
  if (confirm("Are you sure you want to logout?")) {
    await authStore.logout();
  }
};
</script>

<template>
  <div class="bg-background py-4">
    <div class="container mx-auto px-4">
      <div class="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <nav class="bg-white rounded-2xl space-y-1 sticky top-28 px-4 py-6">
            <a
              v-for="item in menu"
              :key="item.to"
              :href="item.to"
              :exact="item.exact"
              class="group flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-body transition hover:bg-primary/10 hover:text-primary"
              active-class="bg-primary text-white hover:bg-primary hover:text-white"
            >
              <UIcon :name="item.icon" class="size-5 shrink-0" />
              <span>{{ item.label }}</span>
            </a>
            <button
              type="button"
              @click="logout"
              class="group flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-body transition hover:bg-red-50 hover:text-red-600"
            >
              <UIcon name="i-lucide-log-out" class="size-5 shrink-0" />

              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <main class="min-w-0 space-y-3">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
