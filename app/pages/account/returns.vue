<script setup>
const returns = ref([
  {
    id: 201,
    order_id: "#10021",
    reason: "Damaged product",
    status: "pending",
    time: "2 hours ago",
  },
  {
    id: 202,
    order_id: "#10018",
    reason: "Wrong item delivered",
    status: "approved",
    time: "1 day ago",
  },
  {
    id: 203,
    order_id: "#10010",
    reason: "Not satisfied",
    status: "refunded",
    time: "3 days ago",
  },
])

const form = reactive({
  order_id: "",
  reason: "",
  message: "",
})

const reasons = [
  "Damaged product",
  "Wrong item delivered",
  "Not satisfied",
  "Changed mind",
  "Other",
]

const submitReturn = () => {
  console.log("Return request:", form)
}

const getStatusClass = (status) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-700"
  if (status === "approved") return "bg-blue-100 text-blue-600"
  if (status === "refunded") return "bg-green-100 text-green-600"
  if (status === "rejected") return "bg-red-100 text-red-600"
  return "bg-gray-100 text-gray-600"
}
</script>

<template>
  <Dashboard>
    <div class="bg-white p-4 md:p-6 max-w-6xl mx-auto space-y-6">

      <!-- HEADER -->
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          Returns & Refunds
        </h1>
        <p class="text-sm text-gray-500">
          Manage your return requests and refunds
        </p>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT: RETURNS LIST -->
        <div class="lg:col-span-2 space-y-4">

          <div
            v-for="r in returns"
            :key="r.id"
            class="bg-white border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
          >
            <div>
              <h3 class="font-medium text-gray-900">
                Order {{ r.order_id }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ r.reason }} • {{ r.time }}
              </p>
            </div>

            <span
              class="text-xs px-3 py-1 rounded-full font-medium"
              :class="getStatusClass(r.status)"
            >
              {{ r.status }}
            </span>
          </div>

          <!-- EMPTY STATE -->
          <div v-if="!returns.length" class="text-center py-16">
            <div class="text-5xl mb-2">📦</div>
            <p class="text-gray-500">No return requests found</p>
          </div>

        </div>

        <!-- RIGHT: CREATE RETURN -->
        <div class="space-y-6">

          <div class="bg-white border rounded-xl p-5">
            <h2 class="font-semibold text-gray-800 mb-4">
              Request Return
            </h2>

            <div class="space-y-3">

              <input
                v-model="form.order_id"
                type="text"
                placeholder="Order ID (e.g. #10021)"
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />

              <select
                v-model="form.reason"
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <option value="">Select reason</option>
                <option v-for="r in reasons" :key="r" :value="r">
                  {{ r }}
                </option>
              </select>

              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Describe your issue..."
                class="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              ></textarea>

            </div>

            <button
              @click="submitReturn"
              class="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Submit Request
            </button>
          </div>

          <!-- INFO BOX -->
          <div class="bg-white border rounded-xl p-5 text-sm text-gray-600">
            <h3 class="font-semibold text-gray-800 mb-2">
              Return Policy
            </h3>
            <p>• Returns accepted within 7–14 days</p>
            <p>• Product must be unused</p>
            <p>• Refund processed within 3–5 days</p>
          </div>

        </div>
      </div>
    </div>
  </Dashboard>
</template>