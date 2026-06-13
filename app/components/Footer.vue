<script setup>
const settings = useSettings();

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
              <a :href="settings?.social?.facebook" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-blue-100">
                <UIcon name="i-simple-icons-facebook" class="size-5 text-blue-600" />
              </a>

              <a :href="settings?.social?.instagram" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-pink-100">
                <UIcon name="i-simple-icons-instagram" class="size-5 text-pink-600" />
              </a>

              <a :href="settings?.social?.threads" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200">
                <UIcon name="i-simple-icons-threads" class="size-5 text-black" />
              </a>

              <a :href="settings?.social?.youtube" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-100">
                <UIcon name="i-simple-icons-youtube" class="size-5 text-red-600" />
              </a>

              <a :href="settings?.social?.pinterest" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-red-100">
                <UIcon name="i-simple-icons-pinterest" class="size-5 text-red-600" />
              </a>

              <a :href="settings?.social?.linkedin" target="_blank" rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-blue-100">
                <UIcon name="i-simple-icons-linkedin" class="size-5 text-blue-700" />
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
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/privacy-policy" class="group-hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/terms-and-conditions" class="group-hover:text-primary transition-colors duration-200">
                    Terms & Conditions
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/return-policy" class="group-hover:text-primary transition-colors duration-200">
                    Return & Refund
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/shipping-delivery" class="group-hover:text-primary transition-colors duration-200">
                    Shipping & Delivery
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/warranty-policy" class="group-hover:text-primary transition-colors duration-200">
                    Warranty Policy
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/cookie-settings" class="group-hover:text-primary transition-colors duration-200">
                    Cookie Policy
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
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/" class="hover:text-primary transition-colors duration-200">
                    FAQ
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/contact" class="hover:text-primary transition-colors duration-200">
                    Help Center
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/about" class="hover:text-primary transition-colors duration-200">
                    Blog
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/orders/tracking" class="hover:text-primary transition-colors duration-200">
                    Order Tracking
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/" class="hover:text-primary transition-colors duration-200">
                    About Us
                  </NuxtLink>
                </li>
                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
                  <NuxtLink to="/" class="hover:text-primary transition-colors duration-200">
                    Contact Us
                  </NuxtLink>
                </li>

                <li class="flex items-center group">
                  <LazyUIcon name="i-lucide-chevrons-right" class="size-4 mr-1 group-hover:text-primary transition" />
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
              <div class="flex items-start gap-3">
                <LazyUIcon name="i-lucide-map-pin" class="size-6 text-body hover:text-primary" />
                <address v-html="settings.app.address" class="not-italic text-body hover:text-primary" />
              </div>

              <div class="flex items-start gap-3">
                <LazyUIcon name="i-lucide-headset" class="size-6 text-body hover:text-primary" />
                <div class="flex flex-col">
                  <a :href="`tel:${settings.app.contact.sales_phone}`" class="text-body hover:text-primary">
                    {{ settings.app.contact.sales_phone }}
                  </a>
                  <a :href="`tel:${settings.app.contact.support_phone}`" class="text-body hover:text-primary">
                    {{ settings.app.contact.support_phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <LazyUIcon name="i-lucide-send" class="size-6 text-body hover:text-primary" />
                <div class="flex flex-col">
                  <a :href="`mailto:${settings.app.contact.sales_email}`" class="text-body hover:text-primary">
                    {{ settings.app.contact.sales_email }}
                  </a>
                  <a :href="`mailto:${settings.app.contact.support_email}`" class="text-body hover:text-primary">
                    {{ settings.app.contact.support_email }}
                  </a>
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
