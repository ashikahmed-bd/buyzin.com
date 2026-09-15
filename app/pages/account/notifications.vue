<script setup>
const route = useRoute();

const notificationStore = useNotificationStore();

const page = computed({
  get: () => Number(route.query.page) || 1,

  set: (value) => {
    navigateTo({
      query: {
        ...route.query,
        page: value > 1 ? value : undefined,
      },
    });
  },
});

const {
  data: notifications,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "notifications",
  () =>
    notificationStore.getNotifications({
      type: route.query.type,
      page: page.value,
    }),
  {
    watch: [() => route.query.type, () => route.query.page],
    default: () => ({
      data: [],
      unread: 0,
      tabs: [],
    }),
  },
);

const markAsRead = async (notification) => {
  if (notification.read_at) {
    return;
  }
  await notificationStore.markAsRead(notification.id);
  await refresh();
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
      class="text-sm"
    />

    <div class="space-y-4">
      <div class="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section class="min-w-0 py-4">
          <div class="mb-5">
            <div class="flex items-center justify-between gap-4">
              <div>
                <h1
                  class="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl"
                >
                  Notifications
                </h1>

                <p class="mt-1 text-sm text-gray-500">
                  Stay updated with your latest activities and updates.
                </p>
              </div>

              <div
                v-if="notifications?.unread"
                class="hidden shrink-0 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 sm:block"
              >
                {{ notifications.unread }} unread
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-border">
            <div class="flex overflow-x-auto border-b border-border px-2">
              <NuxtLink
                v-for="tab in notifications?.tabs ?? []"
                :key="tab.slug"
                :to="{
                  query: {
                    ...route.query,
                    type: tab.slug === 'all' ? undefined : tab.slug,
                  },
                }"
                class="relative shrink-0 px-4 py-4 text-sm font-medium transition"
                :class="
                  (route.query.type || 'all') === tab.slug
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-900'
                "
              >
                {{ tab.label }} ({{ tab.count }})

                <span
                  v-if="(route.query.type || 'all') === tab.slug"
                  class="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                />
              </NuxtLink>
            </div>

            <div v-if="pending" class="divide-y divide-border">
              <div
                v-for="item in 5"
                :key="item"
                class="flex gap-4 px-4 py-5 sm:px-5"
              >
                <div
                  class="size-11 shrink-0 animate-pulse rounded-full bg-gray-100"
                />

                <div class="min-w-0 flex-1 space-y-2">
                  <div class="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div class="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                  <div class="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>

            <ErrorState
              v-else-if="error"
              :retry="refresh"
              icon="i-lucide-circle-alert"
              title="Unable to load notifications"
              description="Something went wrong. Please try again."
            />

            <EmptyState
              v-else-if="!notifications.data.length"
              title="No notifications"
              description="You don't have any notifications here."
            />

            <template v-else>
              <div class="divide-y divide-border">
                <article
                  v-for="notification in notifications.data"
                  :key="notification.id"
                  class="group px-4 py-4 transition hover:bg-gray-50/60 sm:px-5"
                  :class="{
                    'bg-violet-50/20': !notification.read_at,
                  }"
                >
                  <div class="flex items-start gap-4">
                    <div
                      class="flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600"
                    >
                      <UIcon name="i-lucide-bell" class="size-5" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="mb-1 flex items-center justify-between gap-3">
                        <h3
                          class="text-sm font-semibold leading-5"
                          :class="
                            notification.read_at
                              ? 'text-gray-700'
                              : 'text-gray-900'
                          "
                        >
                          {{ notification.data?.title }}

                          <span
                            v-if="!notification.read_at"
                            class="ml-1.5 inline-block size-1.5 rounded-full bg-violet-600 align-middle"
                          />
                        </h3>

                        <span
                          class="shrink-0 whitespace-nowrap text-2xs text-gray-400"
                        >
                          {{ $date(notification.created_at) }}
                        </span>
                      </div>

                      <p
                        class="mt-0.5 text-sm leading-5"
                        :class="
                          notification.read_at
                            ? 'text-gray-500'
                            : 'text-gray-600'
                        "
                      >
                        {{ notification.data?.message }}
                      </p>

                      <div
                        class="mt-2.5 flex items-center justify-between gap-3"
                      >
                        <NuxtLink
                          v-if="notification.data?.url"
                          :to="notification.data.url"
                          class="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                        >
                          {{ notification.data.label }}

                          <UIcon
                            name="i-lucide-arrow-up-right"
                            class="size-3.5"
                          />
                        </NuxtLink>

                        <span v-else />

                        <UButton
                          v-if="!notification.read_at"
                          size="xs"
                          color="neutral"
                          variant="ghost"
                          icon="i-lucide-check"
                          :loading="notification._reading"
                          class="opacity-0 transition group-hover:opacity-100"
                          @click.stop="markAsRead(notification)"
                        >
                          Mark as read
                        </UButton>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </template>

            <div
              v-if="notifications?.meta?.last_page > 1"
              class="flex justify-center py-8"
            >
              <UPagination
                v-model:page="page"
                show-edges
                :sibling-count="1"
                :total="notifications?.meta?.total"
                :items-per-page="notifications?.meta?.per_page"
              />
            </div>
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
              <div
                v-for="setting in [
                  {
                    title: 'Order Updates',
                    description: 'Get notified about your orders',
                  },
                  {
                    title: 'Promotions & Offers',
                    description: 'Receive exclusive deals and offers',
                  },
                  {
                    title: 'Account Updates',
                    description: 'Important updates about your account',
                  },
                  {
                    title: 'New Arrivals',
                    description: 'Get alerts on new products',
                  },
                  {
                    title: 'Price Drop Alerts',
                    description: 'Be notified when prices drop',
                  },
                ]"
                :key="setting.title"
                class="flex items-center justify-between gap-3"
              >
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-gray-700">
                    {{ setting.title }}
                  </p>

                  <p class="mt-0.5 text-2xs leading-4 text-gray-400">
                    {{ setting.description }}
                  </p>
                </div>

                <USwitch size="sm" color="primary" />
              </div>
            </div>

            <NuxtLink
              to="/account/notifications"
              class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              Notification Settings

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
                v-if="notifications?.unread"
                class="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
              >
                {{ notifications.unread }}
              </span>
            </div>

            <h3 class="relative mt-4 text-sm font-semibold text-gray-900">
              You have {{ notifications?.unread ?? 0 }}
              unread notifications
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
