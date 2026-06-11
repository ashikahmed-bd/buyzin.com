<script setup>
const tickets = ref([
  {
    id: 101,
    subject: "Order not received",
    status: "open",
    time: "2 hours ago",
  },
  {
    id: 102,
    subject: "Payment issue",
    status: "resolved",
    time: "1 day ago",
  },
  {
    id: 103,
    subject: "Refund request",
    status: "pending",
    time: "3 days ago",
  },
])

const form = reactive({
  subject: "",
  message: "",
})

const submitTicket = () => {
  console.log("Ticket submitted:", form)
}

const getStatusClass = (status) => {
  if (status === "open") return "bg-red-100 text-red-600"
  if (status === "pending") return "bg-yellow-100 text-yellow-700"
  if (status === "resolved") return "bg-green-100 text-green-600"
  return "bg-gray-100 text-gray-600"
}
</script>

<template>
  <Dashboard>
    <div class="bg-white p-4 md:p-6 max-w-6xl mx-auto space-y-6">

      <!-- HEADER -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Support Center
        </h1>
        <p class="text-sm text-gray-500">
          Create tickets or track your support requests
        </p>
      </div>

      <!-- MAIN GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT: TICKETS -->
        <div class="lg:col-span-2 space-y-4">

          <div
            v-for="t in tickets"
            :key="t.id"
            class="bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
          >
            <div>
              <h3 class="font-medium text-gray-900">
                {{ t.subject }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ t.time }}
              </p>
            </div>

            <span
              class="text-xs px-3 py-1 rounded-full font-medium"
              :class="getStatusClass(t.status)"
            >
              {{ t.status }}
            </span>
          </div>

          <!-- EMPTY STATE -->
          <div v-if="!tickets.length" class="text-center py-16">
            <div class="text-5xl mb-2">🎧</div>
            <p class="text-gray-500">No support tickets found</p>
          </div>

        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="space-y-6">

          <!-- CREATE TICKET -->
          <div class="bg-white border rounded-xl p-5">
            <h2 class="font-semibold text-gray-800 mb-4">
              Create Ticket
            </h2>

            <div class="space-y-3">
              <input
                v-model="form.subject"
                type="text"
                placeholder="Subject"
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />

              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Describe your issue..."
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              ></textarea>
            </div>

            <button
              @click="submitTicket"
              class="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Submit Ticket
            </button>
          </div>

          <!-- FAQ -->
          <div class="bg-white border rounded-xl p-5">
            <h2 class="font-semibold text-gray-800 mb-3">
              Frequently Asked Questions
            </h2>

            <div class="space-y-3 text-sm text-gray-600">
              <p>• How long does support take?</p>
              <p>• How to cancel an order?</p>
              <p>• How to request refund?</p>
              <p>• Which payment methods are supported?</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Dashboard>
</template>