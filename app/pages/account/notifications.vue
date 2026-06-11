<script setup>
const notifications = ref([
  {
    id: 1,
    title: "Order Confirmed",
    message: "Your order #1024 has been confirmed successfully.",
    time: "2 min ago",
    read: false,
    type: "success",
  },
  {
    id: 2,
    title: "Payment Received",
    message: "We received your payment for order #1023.",
    time: "10 min ago",
    read: false,
    type: "info",
  },
  {
    id: 3,
    title: "Order Shipped",
    message: "Your order #1020 has been shipped.",
    time: "1 hour ago",
    read: true,
    type: "warning",
  },
])

const markAsRead = (id) => {
  const item = notifications.value.find(n => n.id === id)
  if (item) item.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(n => (n.read = true))
}
</script>

<template>
  <Dashboard>
    <div class="bg-white p-4 md:p-6 max-w-3xl">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
            Notifications
          </h1>
          <p class="text-sm text-gray-500">
            Latest updates from your account
          </p>
        </div>

        <button
          class="text-sm px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          @click="markAllAsRead"
        >
          Mark all read
        </button>
      </div>

      <div v-if="notifications.length" class="space-y-3">
        <div
          v-for="n in notifications"
          :key="n.id"
          class="flex gap-3 p-4 rounded-xl border transition hover:shadow-sm"
          :class="n.read ? 'bg-white' : 'bg-blue-50 border-blue-200'"
        >
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full"
            :class="{
              'bg-green-100 text-green-600': n.type === 'success',
              'bg-blue-100 text-blue-600': n.type === 'info',
              'bg-yellow-100 text-yellow-600': n.type === 'warning',
            }"
          >
            🔔
          </div>

          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-medium text-gray-900">
                {{ n.title }}
              </h3>
              <span class="text-xs text-gray-400">{{ n.time }}</span>
            </div>

            <p class="text-sm text-gray-600 mt-1">
              {{ n.message }}
            </p>

            <div class="mt-2 flex gap-3">
              <button
                v-if="!n.read"
                class="text-xs text-blue-600 hover:underline"
                @click="markAsRead(n.id)"
              >
                Mark as read
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <div class="text-5xl mb-3">🔕</div>
        <h2 class="text-lg font-medium text-gray-800">
          No notifications
        </h2>
        <p class="text-sm text-gray-500">
          You're all caught up!
        </p>
      </div>
    </div>
  </Dashboard>
</template>