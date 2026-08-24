<script setup>
const notificationStore = useNotificationStore();

const {
  data: notifications,
  pending,
  error,
  refresh,
} = await useAsyncData("notifications", async () => {
  return await notificationStore.getNotifications();
});

const types = {
  order: {
    icon: "i-lucide-shopping-bag",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  payment: {
    icon: "i-lucide-credit-card",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  shipping: {
    icon: "i-lucide-truck",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  delivery: {
    icon: "i-lucide-package-check",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  refund: {
    icon: "i-lucide-rotate-ccw",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  promotion: {
    icon: "i-lucide-tag",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
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
          <div class="bg-white rounded border border-border">
            <article
              v-for="notification in notifications.data"
              :key="notification.id"
              class="group flex gap-3.5 px-4 py-4 transition hover:bg-gray-50/70"
              :class="{ 'bg-violet-50/40': !notification.read_at }"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-full"
                :class="types[notification.data?.type]?.bg ?? 'bg-gray-100'"
              >
                <UIcon
                  :name="
                    types[notification.data?.type]?.icon ?? 'i-lucide-bell'
                  "
                  class="size-4"
                  :class="
                    types[notification.data?.type]?.color ?? 'text-gray-600'
                  "
                />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex min-w-0 items-center gap-2">
                    <h3
                      class="truncate text-sm font-semibold"
                      :class="
                        notification.read_at ? 'text-gray-700' : 'text-gray-900'
                      "
                    >
                      {{ notification.data?.title }}
                    </h3>

                    <span
                      v-if="!notification.read_at"
                      class="size-1.5 shrink-0 rounded-full bg-primary"
                    />
                  </div>

                  <span class="shrink-0 whitespace-nowrap text-xs text-body">
                    {{ $date(notification.created_at) }}
                  </span>
                </div>

                <p
                  class="text-xs leading-5 sm:text-sm"
                  :class="notification.read_at ? 'text-title' : 'text-body'"
                >
                  {{ notification.data?.message }}
                </p>

                <div class="flex flex-wrap items-center justify-between gap-2">
                  <NuxtLink
                    v-if="notification.data?.order_id"
                    :to="`/account/orders/${notification.data.order_id}`"
                    class="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                  >
                    {{ notification.data?.action || "View order" }}

                    <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
                  </NuxtLink>

                  <UButton
                    v-if="!notification.read_at"
                    size="xs"
                    color="neutral"
                    variant="soft"
                    icon="i-lucide-check"
                    :loading="notification._reading"
                    class="shrink-0"
                    @click="markAsRead(notification)"
                  >
                    Mark as read
                  </UButton>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside class="space-y-4">
          <div class="rounded-xl border border-gray-200 bg-white p-4">
            <div class="mb-4">
              <h2 class="text-sm font-semibold text-gray-900">
                Notification Settings
              </h2>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    Order Updates
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    Get notified about your orders
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    Promotions & Offers
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    Receive exclusive deals and offers
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    Account Updates
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    Important updates about your account
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    New Arrivals
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    Get alerts on new products
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
              </div>

              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    Price Drop Alerts
                  </p>

                  <p class="mt-0.5 text-[11px] leading-4 text-gray-400">
                    Be notified when prices drop
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
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
            class="relative overflow-hidden rounded border border-border bg-white px-5 py-6 text-center"
          >
            <div
              class="relative mx-auto flex size-16 items-center justify-center rounded-full bg-violet-100"
            >
              <UIcon name="i-lucide-bell-ring" class="size-8 text-violet-600" />

              <span
                class="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
              >
                {{ notifications?.unread }}
              </span>
            </div>

            <h3 class="relative mt-4 text-sm font-semibold text-gray-900">
              You have {{ notifications?.unread }} unread notifications
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
        </aside>
      </div>
    </div>
  </Dashboard>
</template>
