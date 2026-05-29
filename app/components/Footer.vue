<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref(null);

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<template>
  <footer class="bg-white z-10">
    <div class="bg-primary text-white py-8 md:py-10 lg:py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-wrap items-center justify-between gap-4 md:gap-16">
          <div class="grow max-w-sm">
            <h3 class="font-semibold text-xl md:text-2xl">
              Join 2,000+ fashion lovers & get exclusive updates
            </h3>
            <p class="text-xs md:text-sm mt-1 opacity-90">
              Subscribe with your email to receive new arrivals, brand drops,
              and special discounts — straight to your inbox.
            </p>
          </div>

          <div class="flex-1 max-w-sm">
            <form class="flex items-center gap-2 bg-white rounded p-2">
              <input type="email" placeholder="Enter your email"
                class="w-full px-3 py-2 rounded text-body text-sm focus:outline-none" />

              <button type="submit" class="bg-primary text-white font-semibold px-4 py-2 rounded whitespace-nowrap">
                Subscribe
              </button>
            </form>

            <p class="text-xs mt-1 opacity-70">
              Get the latest offers, promotions & new arrivals
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div class="flex w-full flex-col items-start">
          <NuxtLink to="/" class="mb-3">
            <img src="/logo.svg" alt="logo" class="h-12 object-cover w-auto" />
          </NuxtLink>
          <p class="text-body">
            We are committed to providing 100% genuine
            and authentic products at the best prices. Our mission is to make
            your shopping experience easy, fast, and hassle-free. Trust in
            Buyzin for all your needs.
          </p>

          <!-- Social Links -->
          <div class="mt-4">
            <h3 class="mb-2 text-base font-semibold text-gray-900">
              Follow Us
            </h3>

            <div class="flex items-center gap-3">
              <a href="https://www.facebook.com/BuyzinLimited" target="_blank"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition">
                <svg class="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/BuyzinLimited" target="_blank"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-pink-100 transition">
                <svg class="h-5 w-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
                </svg>
              </a>

              <a href="https://x.com/" target="_blank"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
                <svg class="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.3L6.4 22H2l7.3-8.4L1 2h6.3l4.4 5.7L18.9 2zm-1.1 18h1.7L6.2 3.9H4.4L17.8 20z" />
                </svg>
              </a>

              <a href="https://youtube.com/" target="_blank"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition">
                <svg class="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23 7.5s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C17.2 4 12 4 12 4s-5.2 0-8.1.1c-.4 0-1.3.1-2.1 1C1.2 5.8 1 7.5 1 7.5S.8 9.5.8 11.5v1c0 2 .2 4 .2 4s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1C6.8 20 12 20 12 20s5.2 0 8.1-.1c.4 0 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4v-1c0-2-.2-4-.2-4zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div class="w-full">
              <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Information
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/faq" class="group-hover:text-primary transition-colors duration-200">
                    FAQ
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/privacy-policy" class="group-hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/return-policy" class="group-hover:text-primary transition-colors duration-200">
                    Return Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/terms-and-conditions" class="group-hover:text-primary transition-colors duration-200">
                    Terms & Conditions
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/cookie-settings" class="group-hover:text-primary transition-colors duration-200">
                    Cookie Settings
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/shipping-delivery" class="group-hover:text-primary transition-colors duration-200">
                    Shipping & Delivery
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="w-full">
              <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Our Company
              </h3>
              <ul class="space-y-2">
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/profile" class="hover:text-primary transition-colors duration-200">
                    My Account
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/profile/orders" class="hover:text-primary transition-colors duration-200">
                    My Orders
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/orders/tracking" class="hover:text-primary transition-colors duration-200">
                    Order Tracking
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/about" class="hover:text-primary transition-colors duration-200">
                    About Us
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/contact" class="hover:text-primary transition-colors duration-200">
                    Contact Us
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition" />
                  <NuxtLink to="/apply-vendor" class="hover:text-primary transition-colors duration-200">
                    Become an Vendor
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div class="block">
            <h3 class="mb-4 text-base font-semibold md:text-xl md:font-bold text-gray-800">
              Help & Contact
            </h3>

            <div class="space-y-3">
              <div class="group flex items-start gap-3">
                <icons-icon-location class="size-6 text-body" />
                <address class="text-body hover:text-primary">
                  Tapur Char, Rowmari Sadar,<br />
                  Rowmari, Kurigram 5640, Bangladesh
                </address>
              </div>

              <div class="flex items-center gap-3">
                <icons-icon-support class="size-6 text-body" />
                <div class="flex flex-col">
                  <a href="tel:09649492233" class="text-body hover:text-primary">(88096) 4949-2233</a>
                  <a href="tel:8801516598533" class="text-body hover:text-primary">(880) 1516-598533</a>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <icons-icon-email class="size-6 text-body hover:text-primary" />
                <div class="flex flex-col">
                  <a href="mailto:support@buyzin.com" class="text-body hover:text-primary">sales@buyzin.com</a>
                  <a href="mailto:support@buyzin.com" class="text-body hover:text-primary">
                    support@buyzin.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 text-center py-4">
      <p class="text-sm font-normal text-gray-600">
        © {{ currentYear }} <a href="/" class="text-primary">Buyzin</a> - All
        rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
