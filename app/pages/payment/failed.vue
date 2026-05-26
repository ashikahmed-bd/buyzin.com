<script setup>
const route = useRoute();
</script>

<template>
  <Head>
    <Title>Payment Failed | Transaction Cancelled</Title>

    <Meta
      name="description"
      content="Your payment could not be completed. Please try again or use a different payment method."
    />
    <Meta
      name="keywords"
      content="payment failed, payment cancelled, transaction error, try again"
    />
  </Head>

  <main class="max-w-3xl mx-auto px-4 py-4">
    <div class="bg-white rounded-2xl p-10 max-w-md w-full text-center">
      <div
        class="w-24 h-24 mx-auto mb-6 rounded-full grid place-items-center bg-red-50 shadow-inner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-12 h-12 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <div class="max-w-xs mx-auto">
        <h1 class="text-3xl font-semibold text-heading mb-3">Payment Failed</h1>

        <p class="text-body leading-relaxed mb-8">
          Your payment could not be completed. Please try again or use a
          different payment method.
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          :to="`/profile/orders/${route.query.order_number}`"
          class="bg-white text-body border border-border px-4 py-2 rounded"
        >
          View Order
        </NuxtLink>

        <NuxtLink to="/" class="bg-primary text-white px-4 py-2 rounded">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
