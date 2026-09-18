<script setup>
const openMenu = ref(null);

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};

const menus = [
  {
    key: "sell",
    title: "Sell on Buyzin",
    links: [
      "Become a Supplier",
      "Supplier Dashboard",
      "Pricing & Plans",
      "Supplier Resources",
      "Success Stories",
    ],
  },
  {
    key: "support",
    title: "Support",
    links: [
      "Help Center",
      "Buying Guide",
      "Selling Guide",
      "Shipping & Delivery",
      "Returns & Refunds",
      "Safety & Security",
      "Contact Us",
    ],
  },
  {
    key: "company",
    title: "Company",
    links: [
      "About Us",
      "Our Mission",
      "Careers",
      "Press & Media",
      "Blog",
      "Terms of Service",
      "Privacy Policy",
    ],
  },
];

const benefits = [
  {
    icon: "i-lucide-shield-check",
    title: "Verified Suppliers",
    description: "Trade with confidence",
  },
  {
    icon: "i-lucide-package",
    title: "Global Shipping",
    description: "Reach new markets",
  },
  {
    icon: "i-lucide-credit-card",
    title: "Secure Payments",
    description: "Multiple payment options",
  },
];
</script>

<template>
  <footer class="w-full">
    <section class="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div
        class="relative container mx-auto overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 px-5 py-7"
      >
        
        <div
          class="relative grid items-center gap-7 lg:grid-cols-[1fr_1.05fr_auto]"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-primary"
            >
              <UIcon name="i-lucide-mail" class="size-7" />
            </div>

            <div>
              <p
                class="text-sm font-semibold uppercase tracking-wide text-primary"
              >
                Stay Ahead
              </p>

              <h2
                class="mt-1 text-xl font-bold tracking-tight text-title sm:text-2xl"
              >
                Subscribe to our Newsletter
              </h2>

              <p class="mt-2 max-w-xl text-sm leading-6 text-body sm:text-base">
                Get the latest B2B deals, supplier updates, industry insights
                and exclusive offers directly to your inbox.
              </p>
            </div>
          </div>

          <!-- Newsletter form -->
          <div>
            <form
              class="flex flex-col gap-2 rounded-xl border border-border bg-white p-1.5 sm:flex-row"
              @submit.prevent
            >
              <div class="flex min-w-0 flex-1 items-center gap-3 px-3">
                <UIcon name="i-lucide-mail" class="size-5 shrink-0 text-body" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  class="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                />
              </div>

              <UButton
                type="submit"
                color="primary"
                size="lg"
                class="h-11 justify-center rounded-lg px-6 text-sm font-semibold"
              >
                Subscribe

                <UIcon name="i-lucide-arrow-right" class="size-4" />
              </UButton>
            </form>

            <div
              class="mt-2 flex items-center gap-2 px-1 text-sm text-slate-500"
            >
              <UIcon name="i-lucide-lock-keyhole" class="size-4" />

              <span> No spam. Unsubscribe anytime. </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative overflow-hidden bg-dark px-4 pt-12 text-white sm:px-6 lg:px-8"
    >
      <div
        class="pointer-events-none absolute -right-40 top-20 size-96 rounded-full bg-blue-600/5 blur-3xl"
      />

      <div class="relative container mx-auto ">
        <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr] py-6">
          <div>
            <NuxtLink to="/">
              <NuxtImg src="/logo.svg" alt="logo" class="h-20 w-auto" />
            </NuxtLink>
            <p class="max-w-sm text-sm leading-6 text-slate-300 py-2.5">
              Buyzin is a global B2B marketplace connecting verified suppliers
              and buyers. We make sourcing, trading and growing your business
              easier, faster and more reliable.
            </p>

            <div class="flex items-center gap-3 py-2.5">
              <a
                v-for="social in [
                  {
                    icon: 'i-lucide-facebook',
                    label: 'Facebook',
                  },
                  {
                    icon: 'i-lucide-linkedin',
                    label: 'LinkedIn',
                  },
                  {
                    icon: 'i-lucide-youtube',
                    label: 'YouTube',
                  },
                  {
                    icon: 'i-lucide-instagram',
                    label: 'Instagram',
                  },
                ]"
                :key="social.label"
                href="#"
                :aria-label="social.label"
                class="flex size-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-primary hover:text-white"
              >
                <UIcon :name="social.icon" class="size-5" />
              </a>
            </div>
          </div>

          <div
            v-for="menu in menus"
            :key="menu.key"
            class="border-t border-white/10 pt-5 lg:border-0 lg:pt-0"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between text-left lg:pointer-events-none"
              @click="toggleMenu(menu.key)"
            >
              <span class="text-base font-semibold text-white">
                {{ menu.title }}
              </span>

              <UIcon
                name="i-lucide-chevron-down"
                class="size-5 text-slate-400 transition-transform lg:hidden"
                :class="{
                  'rotate-180': openMenu === menu.key,
                }"
              />
            </button>

            <div
              class="overflow-hidden transition-all duration-300 lg:mt-6 lg:max-h-none lg:opacity-100"
              :class="
                openMenu === menu.key
                  ? 'mt-5 max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 lg:max-h-none'
              "
            >
              <ul class="space-y-4">
                <li v-for="link in menu.links" :key="link">
                  <NuxtLink
                    to="#"
                    class="flex items-center gap-2 text-sm text-slate-300 transition hover:text-primary"
                  >
                    {{ link }}

                    <span
                      v-if="link === 'Careers'"
                      class="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white"
                    >
                      We're Hiring
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/2 p-4">
            <div class="relative h-24 overflow-hidden rounded-xl bg-blue-500/5">
              <UIcon
                name="i-lucide-globe-2"
                class="absolute -right-3 -top-8 size-36 text-blue-500/10"
              />

              <div
                class="absolute left-1/4 top-1/2 size-2 rounded-full bg-primary"
              />

              <div
                class="absolute left-1/2 top-1/3 size-2 rounded-full bg-primary"
              />
            </div>

            <div class="py-3.5 ">
              <h3 class="text-lg font-bold">Global Trade</h3>
              <p class="text-lg font-bold text-primary">Stronger Together</p>
            </div>

            <div class="space-y-4">
              <div
                v-for="item in benefits"
                :key="item.title"
                class="flex items-center gap-4"
              >
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <UIcon :name="item.icon" class="size-6" />
                </div>

                <div class="space-y-1">
                  <h4 class="text-sm font-semibold text-white truncate">
                    {{ item.title }}
                  </h4>
                  <p class="text-sm text-slate-400 truncate">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-dashed border-slate-700 border-t min-w-0 mx-auto text-center py-2.5">
              <p class="text-sm font-medium text-slate-300">
                © 2026 Buyzin. All rights reserved.
              </p>

              <p class="mt-1.5 text-sm text-slate-300">
                A more open, transparent and sustainable global trade.
              </p>
            </div>
      </div>
    </section>
  </footer>
</template>
