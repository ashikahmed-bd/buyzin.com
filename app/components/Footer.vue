```vue
<script setup>
const currentYear = new Date().getFullYear();

const props = defineProps({
  settings: {
    type: Object,
    default: () => ({}),
  },
});

const email = ref("");
const subscribing = ref(false);

const socialLinks = [
  {
    key: "facebook",
    icon: "i-lucide-facebook",
  },
  {
    key: "instagram",
    icon: "i-lucide-instagram",
  },
  {
    key: "linkedin",
    icon: "i-lucide-linkedin",
  },
  {
    key: "youtube",
    icon: "i-lucide-youtube",
  },
];

const businessLinks = [
  { label: "Become a Supplier", to: "/store/apply" },
  { label: "Supplier Dashboard", to: "/dashboard" },
  { label: "Request a Quote", to: "/request-a-quote" },
  { label: "Wholesale Solutions", to: "/wholesale" },
];

const buyerLinks = [
  { label: "Browse Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Brands", to: "/brands" },
  { label: "Deals", to: "/deals" },
];

const informationLinks = [
  { label: "About Buyzin", to: "/about" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const subscribe = async () => {
  if (!email.value || subscribing.value) return;

  subscribing.value = true;

  try {
    // await newsletterStore.subscribe(email.value);

    email.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    subscribing.value = false;
  }
};
</script>

<template>
  <footer class="border-t border-gray-200 bg-white">
    <!-- CTA -->
    <section class="border-b border-white/10 bg-primary">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12"
        >
          <div class="max-w-2xl">
            <div
              class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
            >
              <UIcon name="i-lucide-sparkles" class="size-3.5" />
              Built for modern businesses
            </div>

            <h2
              class="text-2xl font-bold tracking-tight text-white md:text-3xl"
            >
              Source smarter. Grow faster.
            </h2>

            <p class="mt-2 max-w-xl text-sm leading-6 text-white/75">
              Connect with verified suppliers, discover wholesale products,
              compare offers, and source inventory for your business.
            </p>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row">
            <NuxtLink
              to="/products"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-primary shadow-sm transition hover:bg-gray-100"
            >
              <UIcon name="i-lucide-shopping-bag" class="size-4" />
              Browse Products
            </NuxtLink>

            <NuxtLink
              to="/store/apply"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <UIcon name="i-lucide-store" class="size-4" />
              Become a Supplier
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Main -->
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:py-14"
      >
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-2">
          <NuxtLink to="/" aria-label="Buyzin" class="inline-flex">
            <NuxtImg src="/logo.svg" alt="Buyzin" class="h-9 w-auto" />
          </NuxtLink>

          <p class="mt-4 max-w-md text-sm leading-6 text-gray-500">
            Buyzin is a B2B wholesale marketplace connecting businesses with
            suppliers across Bangladesh. Discover products, source inventory,
            communicate with suppliers, and grow your business from one
            platform.
          </p>

          <!-- Trust Cards -->
          <div class="mt-6 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <UIcon name="i-lucide-badge-check" class="size-4.5" />
              </div>

              <div>
                <p class="text-xs font-semibold text-gray-900">
                  Trusted Suppliers
                </p>

                <p class="mt-0.5 text-[11px] text-gray-500">
                  Business-focused sourcing
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3"
            >
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                <UIcon name="i-lucide-package-check" class="size-4.5" />
              </div>

              <div>
                <p class="text-xs font-semibold text-gray-900">
                  Wholesale Products
                </p>

                <p class="mt-0.5 text-[11px] text-gray-500">
                  Built for bulk buying
                </p>
              </div>
            </div>
          </div>

          <!-- Social -->
          <div class="mt-7">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400"
            >
              Follow Buyzin
            </p>

            <div class="flex items-center gap-2">
              <template v-for="social in socialLinks" :key="social.key">
                <a
                  v-if="settings?.social?.[social.key]"
                  :href="settings.social[social.key]"
                  :aria-label="`Buyzin on ${social.key}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <UIcon :name="social.icon" class="size-4" />
                </a>
              </template>
            </div>
          </div>
        </div>

        <!-- Business -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-gray-900">For Business</h3>

          <ul class="space-y-3">
            <li v-for="item in businessLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm text-gray-500 transition hover:text-primary"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Buyers -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-gray-900">For Buyers</h3>

          <ul class="space-y-3">
            <li v-for="item in buyerLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm text-gray-500 transition hover:text-primary"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Information -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-gray-900">Information</h3>

          <ul class="space-y-3">
            <li v-for="item in informationLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm text-gray-500 transition hover:text-primary"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Support + Newsletter -->
      <div class="border-t border-gray-200 py-8">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <!-- Support -->
          <div>
            <h3 class="mb-4 text-sm font-semibold text-gray-900">
              Business Support
            </h3>

            <div class="space-y-4">
              <div v-if="settings?.app?.address" class="flex items-start gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100"
                >
                  <UIcon name="i-lucide-map-pin" class="size-4 text-gray-500" />
                </div>

                <address
                  v-html="settings.app.address"
                  class="not-italic text-sm leading-5 text-gray-500"
                />
              </div>

              <div
                v-if="
                  settings?.app?.contact?.sales_phone ||
                  settings?.app?.contact?.support_phone
                "
                class="flex items-start gap-3"
              >
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100"
                >
                  <UIcon name="i-lucide-phone" class="size-4 text-gray-500" />
                </div>

                <div class="flex flex-col gap-1 text-sm">
                  <a
                    v-if="settings?.app?.contact?.sales_phone"
                    :href="`tel:${settings.app.contact.sales_phone}`"
                    class="text-gray-500 hover:text-primary"
                  >
                    Sales: {{ settings.app.contact.sales_phone }}
                  </a>

                  <a
                    v-if="settings?.app?.contact?.support_phone"
                    :href="`tel:${settings.app.contact.support_phone}`"
                    class="text-gray-500 hover:text-primary"
                  >
                    Support: {{ settings.app.contact.support_phone }}
                  </a>
                </div>
              </div>

              <div
                v-if="
                  settings?.app?.contact?.sales_email ||
                  settings?.app?.contact?.support_email
                "
                class="flex items-start gap-3"
              >
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100"
                >
                  <UIcon name="i-lucide-mail" class="size-4 text-gray-500" />
                </div>

                <div class="flex flex-col gap-1 text-sm">
                  <a
                    v-if="settings?.app?.contact?.sales_email"
                    :href="`mailto:${settings.app.contact.sales_email}`"
                    class="text-gray-500 hover:text-primary"
                  >
                    {{ settings.app.contact.sales_email }}
                  </a>

                  <a
                    v-if="settings?.app?.contact?.support_email"
                    :href="`mailto:${settings.app.contact.support_email}`"
                    class="text-gray-500 hover:text-primary"
                  >
                    {{ settings.app.contact.support_email }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="lg:col-span-2">
            <div
              class="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6"
            >
              <div
                class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
              >
                <div class="max-w-md">
                  <div class="flex items-center gap-2">
                    <div
                      class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    >
                      <UIcon name="i-lucide-mail-plus" class="size-4" />
                    </div>

                    <h3 class="text-sm font-semibold text-gray-900">
                      Stay updated with Buyzin
                    </h3>
                  </div>

                  <p class="mt-2 text-sm leading-5 text-gray-500">
                    Get wholesale deals, new supplier updates, sourcing
                    opportunities, and business insights in your inbox.
                  </p>
                </div>

                <form
                  class="flex w-full flex-col gap-2 sm:flex-row md:max-w-md"
                  @submit.prevent="subscribe"
                >
                  <input
                    id="footer-email"
                    v-model="email"
                    type="email"
                    required
                    autocomplete="email"
                    placeholder="Business email"
                    class="h-10 min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                  <button
                    type="submit"
                    :disabled="subscribing"
                    class="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <UIcon
                      :name="
                        subscribing ? 'i-lucide-loader-circle' : 'i-lucide-send'
                      "
                      class="size-4"
                      :class="{ 'animate-spin': subscribing }"
                    />

                    {{ subscribing ? "Joining..." : "Subscribe" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="border-t border-gray-200 bg-gray-50/70">
      <div
        class="container mx-auto flex flex-col gap-3 px-4 py-4 text-center md:flex-row md:items-center md:justify-between md:text-left"
      >
        <p class="text-xs text-gray-500">
          © {{ currentYear }}
          <NuxtLink to="/" class="font-medium text-gray-700 hover:text-primary">
            Buyzin
          </NuxtLink>
          . All rights reserved.
        </p>

        <div
          class="flex items-center justify-center gap-5 text-xs text-gray-500"
        >
          <NuxtLink to="/privacy-policy" class="transition hover:text-primary">
            Privacy
          </NuxtLink>

          <NuxtLink
            to="/terms-and-conditions"
            class="transition hover:text-primary"
          >
            Terms
          </NuxtLink>

          <NuxtLink to="/contact" class="transition hover:text-primary">
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
```
