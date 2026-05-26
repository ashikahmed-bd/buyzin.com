<script setup></script>

<template>
  <div class="flex flex-col h-full justify-center py-20">
    <div class="flex flex-col items-center">
      <div
        class="flex justify-center items-center w-20 h-20 rounded-full bg-cyan-100"
      >
        <span class="text-cyan-400 text-4xl block">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"
            ></path>
          </svg>
        </span>
      </div>
      <h3 class="font-semibold text-gray-700 text-lg pt-5">
        Your cart is empty
      </h3>
      <p class="px-12 text-center text-sm text-gray-500 pt-2 mb-3">
        No items added in your cart. Please add product to your cart list.
      </p>
      <NuxtLink
        to="/shop"
        class="px-4 py-2.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none transition whitespace-nowrap disabled:opacity-50"
      >
        Go To shop
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
