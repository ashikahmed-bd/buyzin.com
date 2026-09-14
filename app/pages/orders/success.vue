<script setup></script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-4">
    <Head>
      <Title>Order Successful | Thank You</Title>
      <Meta
        name="description"
        content="Your order has been placed successfully. You will receive a confirmation email shortly with order details and tracking information."
      />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>
    <div class="bg-white rounded-2xl w-full p-6">
      <div class="flex justify-center mb-4">
        <div class="bg-primary rounded-full p-4">
          <LazyUIcon name="i-lucide-check-circle" class="size-8 text-white" />
        </div>
      </div>

      <div class="max-w-md mx-auto mb-4">
        <h2 class="text-2xl font-bold text-center text-primary mb-2">
          Congratulations!
        </h2>
        <p class="text-center text-body mb-4">
          Your order has been successfully placed.
        </p>
        <p class="text-center text-gray-500 text-sm mb-6">
          We have received your order and it will be processed shortly. Our team
          will contact you to confirm your order details.
        </p>
      </div>

      <div
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-gray-700 mb-6"
      >
        Please keep your phone available. Our team will contact you to confirm
        your order. Check your package on delivery.
      </div>

      <div class="flex justify-center mb-4">
        <button
          class="bg-primary text-white px-6 py-2.5 rounded-full font-semibold transition"
        >
          Go to Home
        </button>
      </div>

      <div class="text-center text-body text-xs">
        Need help? Contact us:
        <a href="mailto:support@buyzin.com" class="text-primary font-medium">
          support@buyzin.com
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
