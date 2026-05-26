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
        <div
          class="flex flex-wrap items-center justify-between gap-4 md:gap-16"
        >
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
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full px-3 py-2 rounded text-body text-sm focus:outline-none"
              />

              <button
                type="submit"
                class="bg-primary text-white font-semibold px-4 py-2 rounded whitespace-nowrap"
              >
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
            <img src="/logo.svg" alt="logo" class="h-16 object-cover w-auto" />
          </NuxtLink>
          <p class="text-body">
            Shop Smart. Live Easy. We are committed to providing 100% genuine
            and authentic products at the best prices. Our mission is to make
            your shopping experience easy, fast, and hassle-free. Trust in
            Buyzin for all your needs.
          </p>
          <div class="py-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900 mb-2">
              Payment & Shipping
            </h3>
            <div class="flex flex-wrap items-center gap-3">
              <img
                src="/pci-dss.png"
                alt="PCI-DSS"
                class="max-h-10 w-auto object-contain"
              />

              <img
                src="/dhl.png"
                alt="DHL"
                class="max-h-10 w-auto object-contain"
              />

              <img
                src="/redx.png"
                alt="RedX"
                class="max-h-10 w-auto object-contain"
              />
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
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/faq"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    FAQ
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/privacy-policy"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Privacy Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/return-policy"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Return Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/terms-and-conditions"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Terms & Conditions
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/cookie-settings"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
                    Cookie Settings
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <IconsIconChevronDoubleRight
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/shipping-delivery"
                    class="group-hover:text-primary transition-colors duration-200"
                  >
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
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/profile"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    My Account
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/profile/orders"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    My Orders
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/orders/tracking"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Order Tracking
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/about"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    About Us
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/contact"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Contact Us
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <icons-icon-chevron-double-right
                    class="size-4 mr-1 text-gray-400 group-hover:text-primary transition"
                  />
                  <NuxtLink
                    to="/apply-vendor"
                    class="hover:text-primary transition-colors duration-200"
                  >
                    Become an Vendor
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div class="block">
            <h3
              class="mb-4 text-base font-semibold md:text-xl md:font-bold text-gray-800"
            >
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
                  <a href="tel:09649492233" class="text-body hover:text-primary"
                    >(88096) 4949-2233</a
                  >
                  <a
                    href="tel:8801516598533"
                    class="text-body hover:text-primary"
                    >(880) 1516-598533</a
                  >
                </div>
              </div>

              <div class="flex items-center gap-3">
                <icons-icon-email class="size-6 text-body hover:text-primary" />
                <div class="flex flex-col">
                  <a
                    href="mailto:support@buyzin.com"
                    class="text-body hover:text-primary"
                    >sales@buyzin.com</a
                  >
                  <a
                    href="mailto:support@buyzin.com"
                    class="text-body hover:text-primary"
                  >
                    support@buyzin.com</a
                  >
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
