<script setup>
const buyerLinks = [
  { label: "Browse Products", to: "/products" },
  { label: "Request a Quote", to: "/request-a-quote" },
  { label: "Find Suppliers", to: "/suppliers" },
  { label: "Buying Guide", to: "/buying-guide" },
  { label: "Trade Assurance", to: "/trade-assurance" },
  { label: "Help Center", to: "/help-center" },
];

const supplierLinks = [
  { label: "Create a Store", to: "/seller/create-store" },
  { label: "Supplier Membership", to: "/seller/membership" },
  { label: "Selling Guide", to: "/selling-guide" },
  { label: "Success Stories", to: "/success-stories" },
  { label: "Partner Program", to: "/partner-program" },
  { label: "Supplier Support", to: "/supplier-support" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "News & Blog", to: "/blog" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cookie Policy", to: "/cookies" },
];

const socialLinks = [
  { label: "Facebook", icon: "i-lucide-facebook", href: "#" },
  { label: "LinkedIn", icon: "i-lucide-linkedin", href: "#" },
  { label: "YouTube", icon: "i-lucide-youtube", href: "#" },
  { label: "Instagram", icon: "i-lucide-instagram", href: "#" },
  { label: "X", icon: "i-lucide-twitter", href: "#" },
];
</script>

<template>
  <footer class="bg-white">
    <section class="container mx-auto px-4 py-12">
      <div class="relative rounded-xl bg-primary px-6 py-10">
        <div
          class="relative grid gap-4 lg:grid-cols-[1fr_1.05fr] lg:items-center"
        >
          <div>
            <div
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <UIcon name="i-lucide-sparkles" class="size-3.5" />
              Stay Ahead
            </div>

            <h2
              class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Grow Your Business With Buyzin
            </h2>

            <p class="max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Get new products, supplier offers, market insights and exclusive
              B2B opportunities directly in your inbox.
            </p>
          </div>

          <div>
            <form class="flex flex-col gap-3 sm:flex-row">
              <div class="relative flex-1">
                <UIcon
                  name="i-lucide-mail"
                  class="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  class="h-12 w-full rounded-xl border-0 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-2 focus:ring-white/30"
                />
              </div>

              <button
                type="submit"
                class="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-primary transition hover:bg-slate-100"
              >
                Subscribe
              </button>
            </form>

            <p class="mt-3 flex items-center gap-1.5 text-xs text-white/60">
              <UIcon name="i-lucide-lock" class="size-3.5" />
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-8">
      <div
        class="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_1fr]"
      >
        <!-- Logo / About -->
        <div class="col-span-2 lg:col-span-1">
          <NuxtLink to="/" class="inline-flex">
            <NuxtImg src="/logo.svg" alt="Buyzin" class="h-16 w-auto" />
          </NuxtLink>

          <p class="mt-5 max-w-sm text-sm leading-7 text-slate-500">
            Your trusted B2B marketplace for global trade. Discover quality
            products, connect with verified suppliers and grow your business
            without borders.
          </p>

          <!-- Social -->
          <div class="mt-6 flex items-center gap-2">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="flex size-10 items-center justify-center rounded-full border border-border bg-white text-body transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <UIcon :name="social.icon" class="size-4.5" />
            </a>
          </div>
        </div>

        <!-- Buyers -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">
            For Buyers
          </h3>

          <nav class="mt-5 flex flex-col gap-3">
            <NuxtLink
              v-for="item in buyerLinks"
              :key="item.label"
              :to="item.to"
              class="group flex items-center text-sm text-slate-500 transition hover:text-primary"
            >
              <span>{{ item.label }}</span>

              <UIcon
                name="i-lucide-arrow-up-right"
                class="ml-1 size-3.5 opacity-0 transition group-hover:opacity-100"
              />
            </NuxtLink>
          </nav>
        </div>

        <!-- Suppliers -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">
            For Suppliers
          </h3>

          <nav class="mt-5 flex flex-col gap-3">
            <NuxtLink
              v-for="item in supplierLinks"
              :key="item.label"
              :to="item.to"
              class="group flex items-center text-sm text-slate-500 transition hover:text-primary"
            >
              <span>{{ item.label }}</span>

              <UIcon
                name="i-lucide-arrow-up-right"
                class="ml-1 size-3.5 opacity-0 transition group-hover:opacity-100"
              />
            </NuxtLink>
          </nav>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">
            Company
          </h3>

          <nav class="mt-5 flex flex-col gap-3">
            <NuxtLink
              v-for="item in companyLinks"
              :key="item.label"
              :to="item.to"
              class="group flex items-center text-sm text-slate-500 transition hover:text-primary"
            >
              <span>{{ item.label }}</span>

              <UIcon
                name="i-lucide-arrow-up-right"
                class="ml-1 size-3.5 opacity-0 transition group-hover:opacity-100"
              />
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wide text-slate-900">
            Get in Touch
          </h3>

          <div class="mt-5 space-y-4">
            <a
              href="mailto:support@buyzin.com"
              class="group flex gap-3 text-sm text-slate-500 transition hover:text-primary"
            >
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-primary/10 group-hover:text-primary"
              >
                <UIcon name="i-lucide-mail" class="size-4" />
              </span>

              <span class="pt-1.5 break-all"> support@buyzin.com </span>
            </a>

            <a
              href="tel:+8801234567890"
              class="group flex gap-3 text-sm text-slate-500 transition hover:text-primary"
            >
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-primary/10 group-hover:text-primary"
              >
                <UIcon name="i-lucide-phone" class="size-4" />
              </span>

              <span class="pt-1.5"> +880 1234 567890 </span>
            </a>

            <div class="flex gap-3 text-sm text-slate-500">
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
              >
                <UIcon name="i-lucide-map-pin" class="size-4" />
              </span>

              <span class="pt-1.5"> Dhaka, Bangladesh </span>
            </div>

            <div class="flex gap-3 text-sm text-slate-500">
              <span
                class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"
              >
                <UIcon name="i-lucide-clock-3" class="size-4" />
              </span>

              <span class="pt-1.5 leading-5">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM (UTC+6)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="container mx-auto px-4 py-2.5 border-t border-border border-dashed"
    >
      <div class="flex items-center flex-wrap gap-4 lg:justify-between">
        <div>
          <p class="text-sm text-slate-500">
            © 2026
            <span class="font-semibold text-slate-700">Buyzin</span>. All rights
            reserved.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <NuxtLink
            to="/terms"
            class="text-sm text-slate-500 transition hover:text-primary"
          >
            Terms
          </NuxtLink>

          <NuxtLink
            to="/privacy"
            class="text-sm text-slate-500 transition hover:text-primary"
          >
            Privacy
          </NuxtLink>

          <NuxtLink
            to="/cookies"
            class="text-sm text-slate-500 transition hover:text-primary"
          >
            Cookies
          </NuxtLink>

          <NuxtLink
            to="/sitemap.xml"
            class="text-sm text-slate-500 transition hover:text-primary"
          >
            Sitemap
          </NuxtLink>
        </div>
      </div>
    </section>
  </footer>
</template>
