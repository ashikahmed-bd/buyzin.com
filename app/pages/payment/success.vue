<script setup>
const route = useRoute();
</script>

<template>
  <Head>
    <Title>Payment Successful | Thank You</Title>

    <Meta
      name="description"
      content="Your payment was completed successfully. Thank you for your purchase!"
    />
    <Meta
      name="keywords"
      content="payment success, order completed, transaction successful, thank you"
    />
  </Head>

  <main class="max-w-5xl mx-auto px-4 py-8">
    <div
      class="bg-white/70 backdrop-blur-xl rounded-3xl border border-border p-10"
    >
      <section class="w-full max-w-xl mx-auto text-center">
        <!-- Icon -->
        <div
          class="w-24 h-24 mx-auto mb-6 rounded-2xl grid place-items-center bg-emerald-500/10 shadow-inner"
        >
          <svg
            class="w-12 h-12 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              class="opacity-20"
              stroke-width="1.5"
            />
            <path
              d="M7 13.5l3 3 7-9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-semibold text-slate-800 mb-2">
          Payment Successful
        </h1>
        <p class="text-slate-500 mb-8">
          Thank you — your payment has been processed.
        </p>

        <!-- Info Cards -->
        <div class="grid sm:grid-cols-3 gap-4 mb-8">
          <div class="bg-white border border-border p-5 rounded-2xl text-left">
            <span class="text-xs text-slate-400">Amount</span>
            <p class="text-lg font-semibold mt-1 text-slate-800">
              {{ route.query.currency }} {{ route.query.amount }}
            </p>
          </div>

          <div class="bg-white border border-border p-5 rounded-2xl text-left">
            <span class="text-xs text-body">Order ID</span>
            <p class="text-sm mt-1 text-slate-800">
              {{ route.query.order_number }}
            </p>
          </div>

          <div class="bg-white border border-border p-5 rounded-2xl text-left">
            <span class="text-xs text-slate-400">trxID</span>
            <p class="text-sm mt-1 text-slate-800">{{ route.query.trxID }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 justify-center">
          <button
            class="px-6 py-3 rounded-xl font-semibold bg-primary text-white transition-all"
          >
            Go Home
          </button>

          <button
            class="px-6 py-3 rounded-xl font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            Continue Shopping
          </button>
        </div>
        <footer class="text-body text-sm mt-8">
          <p class="text-body">
            Questions?
            <NuxtLink to="/contact" class="underline text-primary"
              >Contact support</NuxtLink
            >
          </p>
        </footer>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
