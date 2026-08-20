<script setup>
const activeTab = ref("All");
const showAll = ref(false);

const notifications = ref([
  {
    id: 1,
    type: "Orders",
    title: "Your order #SH12345 has been delivered",
    description:
      "Hi Sarah, your order has been delivered successfully. We hope you love it!",
    time: "2 min ago",
    icon: "i-lucide-package-check",
    iconClass: "bg-violet-50 text-violet-600",
    unread: true,
    action: "View Order",
  },
  {
    id: 2,
    type: "Offers",
    title: "Special offer just for you!",
    description: "Get 20% off on your next purchase. Use code: SAVE20",
    time: "1 hour ago",
    icon: "i-lucide-tag",
    iconClass: "bg-emerald-50 text-emerald-600",
    unread: true,
    action: "Shop Now",
  },
  {
    id: 3,
    type: "Orders",
    title: "Your order #SH12346 is on the way",
    description: "Good news! Your order is shipped and will be delivered soon.",
    time: "5 hours ago",
    icon: "i-lucide-truck",
    iconClass: "bg-blue-50 text-blue-600",
    unread: true,
    action: "Track Order",
  },
  {
    id: 4,
    type: "Updates",
    title: "Review & earn rewards!",
    description: "Review your purchased items and earn 100 reward points.",
    time: "Yesterday",
    icon: "i-lucide-star",
    iconClass: "bg-amber-50 text-amber-600",
    unread: true,
    action: "Write a Review",
  },
  {
    id: 5,
    type: "Orders",
    title: "Payment of $129.99 successful",
    description: "Your payment for order #SH12344 was successful.",
    time: "2 days ago",
    icon: "i-lucide-wallet-cards",
    iconClass: "bg-rose-50 text-rose-600",
    unread: true,
    action: "View Order",
  },
  {
    id: 6,
    type: "Account",
    title: "Profile updated successfully",
    description: "Your profile information has been updated successfully.",
    time: "3 days ago",
    icon: "i-lucide-user-round",
    iconClass: "bg-purple-50 text-purple-600",
    unread: true,
    action: null,
  },
  {
    id: 7,
    type: "Offers",
    title: "Don't miss out!",
    description:
      "Thousands of deals are waiting for you. Check out the latest offers.",
    time: "4 days ago",
    icon: "i-lucide-bell",
    iconClass: "bg-orange-50 text-orange-600",
    unread: true,
    action: "Explore Offers",
  },
  {
    id: 8,
    type: "Updates",
    title: "Happy Birthday, Sarah! 🎉",
    description:
      "Here's a special birthday treat - 15% off on your next order.",
    time: "5 days ago",
    icon: "i-lucide-gift",
    iconClass: "bg-sky-50 text-sky-600",
    unread: true,
    action: "Shop Now",
  },
]);

const settings = ref([
  {
    title: "Order Updates",
    description: "Get notified about your orders",
    enabled: true,
  },
  {
    title: "Promotions & Offers",
    description: "Receive exclusive deals and offers",
    enabled: true,
  },
  {
    title: "Account Updates",
    description: "Important updates about your account",
    enabled: true,
  },
  {
    title: "New Arrivals",
    description: "Get alerts on new products",
    enabled: false,
  },
  {
    title: "Price Drop Alerts",
    description: "Be notified when prices drop",
    enabled: false,
  },
]);

const quickLinks = [
  {
    label: "View My Orders",
    icon: "i-lucide-package",
    to: "/account/orders",
  },
  {
    label: "Track Order",
    icon: "i-lucide-map-pin",
    to: "/account/orders",
  },
  {
    label: "Browse Offers",
    icon: "i-lucide-tag",
    to: "/offers",
  },
  {
    label: "Help Center",
    icon: "i-lucide-circle-help",
    to: "/help",
  },
];

const filteredNotifications = computed(() => {
  const filtered =
    activeTab.value === "All"
      ? notifications.value
      : notifications.value.filter(
          (notification) => notification.type === activeTab.value,
        );

  return showAll.value ? filtered : filtered.slice(0, 8);
});

const unreadCount = computed(
  () =>
    notifications.value.filter((notification) => notification.unread).length,
);

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.unread = false;
  });
};

const markAsRead = (notification) => {
  notification.unread = false;
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Notifications | Buyzin</Title>

      <Meta
        name="description"
        content="Stay updated with your orders, offers and account activities."
      />

      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'My Account',
          to: '/account',
        },
        {
          label: 'Notifications',
        },
      ]"
      class="py-4 text-sm"
    />

    <div class="space-y-6">
      <div
        class="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1
            class="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl"
          >
            Notifications
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            Stay updated with your orders, offers and account activities.
          </p>
        </div>

        <button
          type="button"
          @click="markAllAsRead"
          class="inline-flex items-center gap-2 rounded border border-violet-200 bg-white px-3.5 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50"
        >
          <UIcon name="i-lucide-check" class="size-4" />

          Mark all as read
        </button>
      </div>

      <div class="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section class="min-w-0">
          <UTabs
            v-model="activeTab"
            variant="link"
            :items="[
              {
                label: 'All',
                value: 'All',
              },
              {
                label: 'Orders',
                value: 'Orders',
              },
              {
                label: 'Offers',
                value: 'Offers',
              },
              {
                label: 'Account',
                value: 'Account',
              },
              {
                label: 'Updates',
                value: 'Updates',
              },
            ]"
          >
            <template #content>
              <div
                class="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div
                  v-for="notification in filteredNotifications"
                  :key="notification.id"
                  class="group flex gap-3.5 border-b border-gray-100 px-4 py-4 transition last:border-b-0 hover:bg-gray-50/70 sm:px-5"
                  @click="markAsRead(notification)"
                >
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-full"
                    :class="notification.iconClass"
                  >
                    <UIcon :name="notification.icon" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <h3
                          class="truncate text-sm font-semibold text-gray-800"
                        >
                          {{ notification.title }}
                        </h3>

                        <p
                          class="mt-1 text-xs leading-5 text-gray-500 sm:text-sm"
                        >
                          {{ notification.description }}
                        </p>

                        <NuxtLink
                          v-if="notification.action"
                          to="#"
                          class="mt-1 inline-block text-xs font-semibold text-violet-600 hover:text-violet-700"
                        >
                          {{ notification.action }}
                        </NuxtLink>
                      </div>

                      <div class="flex shrink-0 items-center gap-2">
                        <span
                          class="whitespace-nowrap text-[11px] text-gray-400 sm:text-xs"
                        >
                          {{ notification.time }}
                        </span>

                        <span
                          v-if="notification.unread"
                          class="size-1.5 rounded-full bg-violet-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="filteredNotifications.length === 0"
                  class="px-5 py-14 text-center"
                >
                  <UIcon
                    name="i-lucide-bell-off"
                    class="mx-auto size-8 text-gray-300"
                  />

                  <p class="mt-3 text-sm font-medium text-gray-700">
                    No notifications found
                  </p>

                  <p class="mt-1 text-xs text-gray-400">
                    You're all caught up.
                  </p>
                </div>

                <div
                  v-if="filteredNotifications.length > 0 && !showAll"
                  class="flex justify-center border-t border-gray-100 px-4 py-3"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                    @click="showAll = true"
                  >
                    Load More

                    <UIcon name="i-lucide-chevron-down" class="size-3.5" />
                  </button>
                </div>
              </div>
            </template>
          </UTabs>
        </section>

        <aside class="space-y-4">
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <div class="mb-4">
              <h2 class="text-sm font-semibold text-gray-900">
                Notification Settings
              </h2>
            </div>

            <div class="space-y-4">
              <div
                v-for="setting in settings"
                :key="setting.title"
                class="flex items-center justify-between gap-3"
              >
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    {{ setting.title }}
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    {{ setting.description }}
                  </p>
                </div>

                <USwitch v-model="setting.enabled" size="sm" color="primary" />
              </div>
            </div>

            <NuxtLink
              to="/account/notifications"
              class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              Manage Notification Settings

              <UIcon name="i-lucide-arrow-right" class="size-3.5" />
            </NuxtLink>
          </div>

          <div
            class="relative overflow-hidden rounded-xl border border-violet-100 bg-violet-50 px-5 py-6 text-center"
          >
            <div
              class="absolute -right-8 -top-8 size-20 rounded-full bg-white/60"
            />

            <div
              class="relative mx-auto flex size-16 items-center justify-center rounded-full bg-violet-100"
            >
              <UIcon name="i-lucide-bell-ring" class="size-8 text-violet-600" />

              <span
                class="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
              >
                {{ unreadCount }}
              </span>
            </div>

            <h3 class="relative mt-4 text-sm font-semibold text-gray-900">
              You have {{ unreadCount }} unread notifications
            </h3>

            <p class="relative mt-1 text-xs leading-5 text-gray-500">
              Stay updated with the latest updates and offers.
            </p>

            <NuxtLink
              to="/account/notifications"
              class="relative mt-4 inline-flex h-8 w-full items-center justify-center rounded-md bg-violet-600 px-4 text-xs font-semibold text-white transition hover:bg-violet-700"
            >
              View All Notifications
            </NuxtLink>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <h2 class="mb-3 text-sm font-semibold text-gray-900">
              Quick Links
            </h2>

            <div class="divide-y divide-gray-100">
              <NuxtLink
                v-for="link in quickLinks"
                :key="link.label"
                :to="link.to"
                class="flex items-center gap-3 py-2.5 text-xs font-medium text-gray-600 transition first:pt-1 last:pb-1 hover:text-violet-600"
              >
                <UIcon :name="link.icon" class="size-4 text-gray-400" />

                <span class="flex-1">
                  {{ link.label }}
                </span>

                <UIcon
                  name="i-lucide-chevron-right"
                  class="size-3.5 text-gray-300"
                />
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </Dashboard>
</template>
