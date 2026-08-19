<script setup>
const authStore = useAuthStore();

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
    label: "Return & Refund",
    to: "/account/returns",
    icon: "i-lucide-rotate-ccw",
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
    to: "/account/address",
    icon: "i-lucide-map-pin",
  },
  {
    label: "Gift Cards",
    to: "/account/gift-cards",
    icon: "i-lucide-gift",
  },
  {
    label: "Notifications",
    to: "/account/notifications",
    icon: "i-lucide-bell",
  },
  {
    label: "Help & Support",
    to: "/account/support",
    icon: "i-lucide-circle-help",
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
      <div class="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside>
          <div class="sticky top-24 rounded-2xl bg-white p-4">
            <div class="border-b border-slate-100 pb-5">
              <div v-if="authStore.user" class="flex items-center gap-3">
                <div
                  class="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200"
                >
                  <NuxtImg
                    :src="authStore.user.photo_url"
                    :alt="authStore.user.name"
                    class="h-full w-full object-cover p-1"
                    loading="lazy"
                  />
                </div>

                <div class="min-w-0">
                  <h3 class="truncate font-semibold text-slate-900">
                    {{ authStore.user.name }}
                  </h3>

                  <span class="text-xs text-body">
                    Since {{ authStore.user.since }}
                  </span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2">
                <NuxtLink
                  to="/account/profile"
                  class="flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Edit Profile
                </NuxtLink>

                <button
                  type="button"
                  class="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-body transition hover:bg-slate-50"
                >
                  <span>Wallet</span>
                  <span>৳2,500</span>
                </button>
              </div>
            </div>

            <nav class="mt-4 space-y-1">
              <NuxtLink
                v-for="item in menu"
                :key="item.to"
                :to="item.to"
                :exact="item.exact"
                class="group flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-body transition hover:bg-primary/10 hover:text-primary"
                active-class="!bg-primary !text-white hover:!bg-primary hover:!text-white"
              >
                <UIcon :name="item.icon" class="size-5 shrink-0" />
                <span>{{ item.label }}</span>
              </NuxtLink>
              <button
                type="button"
                @click="logout"
                class="group flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-body transition hover:bg-red-50 hover:text-red-600"
              >
                <UIcon name="i-lucide-log-out" class="size-5 shrink-0" />

                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        <main class="min-w-0 space-y-3">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
