<script setup>
const { $settings } = useNuxtApp();
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-4">
    <div class="bg-white rounded-2xl w-full p-6">
      <!-- Success Icon -->
      <div class="flex justify-center mb-4">
        <div class="bg-primary rounded-full p-4">
          <IconsIconCheckCircle class="size-8 text-white" />
        </div>
      </div>

      <!-- Heading -->
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

      <!-- Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div class="bg-green-50 rounded-xl p-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto w-6 h-6 text-primary mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <p class="text-sm font-medium">Processing</p>
          <p class="text-xs text-body">Within 24-48 hours</p>
        </div>

        <div class="bg-blue-50 rounded-xl p-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto w-6 h-6 text-primary mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h2l.4 2M7 13h10l1-5H6l1 5zm0 0v6m0 0h10m-10 0h10"
            />
          </svg>
          <p class="text-sm font-medium">Phone Confirmation</p>
          <client-only>
            <p v-if="$settings?.contact">{{ $settings.contact.phone }}</p>
          </client-only>
        </div>

        <div class="bg-cyan-50 rounded-xl p-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto w-6 h-6 text-primary mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p class="text-sm font-medium">Delivery</p>
          <p class="text-xs text-gray-500">3-5 business days</p>
        </div>
      </div>

      <!-- Important Note -->
      <div
        class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-gray-700 mb-6"
      >
        Please keep your phone available. Our team will contact you to confirm
        your order. Check your package on delivery.
      </div>

      <!-- Home Button -->
      <div class="flex justify-center mb-4">
        <button
          class="bg-primary text-white px-6 py-2.5 rounded-full font-semibold transition"
        >
          Go to Home
        </button>
      </div>

      <!-- Contact Info -->
      <client-only>
        <div class="text-center text-body text-xs">
          Need help? Contact us:
          <template v-if="$settings?.contact">
            <a
              :href="`mailto:${$settings.contact.email}`"
              class="text-primary font-medium after:content-['.'] after:mx-1"
            >
              {{ $settings.contact.email }}
            </a>
            <a
              :href="`https://wa.me/${$settings.contact.whatsapp}`"
              target="_blank"
              class="text-green-500 font-medium"
            >
              WhatsApp
            </a>
          </template>
        </div>
      </client-only>
    </div>
  </main>
</template>

<style scoped></style>
