<script setup>
const searchQuery = ref("");
const openFaq = ref(null);

const faqs = [
  {
    title: "How can I track my order?",
    description:
      "You can track your order using your Order ID from the My Orders section.",
    icon: "i-lucide-truck",
    color: "text-violet-600 bg-violet-50",
  },
  {
    title: "What is your return policy?",
    description:
      "We offer easy returns within 7 days of delivery. Check our Return & Refund policy for details.",
    icon: "i-lucide-rotate-ccw",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "How do I request a refund?",
    description:
      "Go to My Orders > Select Order > Request Return/Refund. Our team will review and process it.",
    icon: "i-lucide-wallet-cards",
    color: "text-orange-500 bg-orange-50",
  },
  {
    title: "What payment methods do you accept?",
    description:
      "We accept all major credit/debit cards, bKash, Nagad, and other secure payment methods.",
    icon: "i-lucide-credit-card",
    color: "text-blue-500 bg-blue-50",
  },
  {
    title: "How can I update my account information?",
    description:
      "You can update your profile, address, and password from the My Profile section.",
    icon: "i-lucide-user-round",
    color: "text-pink-500 bg-pink-50",
  },
];

const popularTopics = [
  "Track Order",
  "Return & Refund",
  "Payment Issues",
  "Account Settings",
];

const quickLinks = [
  {
    label: "Track your Order",
    to: "/account/orders",
    icon: "i-lucide-package-search",
  },
  {
    label: "Return & Refund Policy",
    to: "/help/return-refund",
    icon: "i-lucide-rotate-ccw",
  },
  {
    label: "Shipping Information",
    to: "/help/shipping",
    icon: "i-lucide-truck",
  },
  {
    label: "Payment Methods",
    to: "/help/payment",
    icon: "i-lucide-credit-card",
  },
  {
    label: "Terms & Conditions",
    to: "/terms",
    icon: "i-lucide-file-text",
  },
  {
    label: "Privacy Policy",
    to: "/privacy",
    icon: "i-lucide-shield-check",
  },
];

const contactMethods = [
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: "i-lucide-message-circle",
    color: "text-violet-600 bg-violet-50",
  },
  {
    title: "Email Support",
    description: "support@shophub.com",
    icon: "i-lucide-mail",
    color: "text-blue-500 bg-blue-50",
  },
  {
    title: "Phone Support",
    description: "+880 1712 345 678",
    meta: "9AM - 9PM",
    icon: "i-lucide-phone",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "WhatsApp",
    description: "+880 1712 345 678",
    icon: "i-lucide-message-circle",
    color: "text-green-500 bg-green-50",
  },
];

const filteredFaqs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return faqs;
  }

  return faqs.filter((faq) => {
    return (
      faq.title.toLowerCase().includes(query) ||
      faq.description.toLowerCase().includes(query)
    );
  });
});

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};

const selectTopic = (topic) => {
  searchQuery.value = topic;
  openFaq.value = null;
};
</script>

<template>
  <Dashboard>
    <Head>
      <Title>Help & Support | Buyzin</Title>

      <Meta
        name="description"
        content="Find answers, get support and manage your orders with ease."
      />

      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <UBreadcrumb
      :items="[
        {
          label: 'Home',
          to: '/',
        },
        {
          label: 'My Account',
          to: '/account',
        },
        {
          label: 'Help & Support',
        },
      ]"
      class="py-4 text-sm"
    />

    <div class="rounded-2xl bg-white px-4">
      <div class="border-b border-dashed border-border py-4">
        <h1 class="text-lg font-semibold text-title">Help & Support</h1>

        <p class="mt-1 text-sm text-body">
          We're here to help you. Find answers, get support and manage your
          orders with ease.
        </p>
      </div>

      <div class="space-y-4 py-4">
        <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
          <main class="min-w-0 space-y-4">
            <section class="rounded border border-border bg-light p-4">
              <div class="flex items-center justify-between gap-6">
                <div class="min-w-0 flex-1">
                  <h2 class="text-sm font-semibold text-gray-900 sm:text-base">
                    How can we help you today?
                  </h2>
                  <div
                    class="mt-3 flex h-9 max-w-xl overflow-hidden rounded border border-border bg-white text-sm"
                  >
                    <div class="flex min-w-0 flex-1 items-center gap-2 px-3">
                      <UIcon
                        name="i-lucide-search"
                        class="size-4 shrink-0 text-gray-400"
                      />

                      <input
                        type="text"
                        placeholder="Search for help topics, keywords..."
                        class="min-w-0 flex-1 bg-transparent text-sm text-body outline-none focus:outline-none placeholder:text-muted"
                      />
                    </div>

                    <button
                      type="button"
                      class="bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary/70"
                    >
                      Search
                    </button>
                  </div>

                  <div class="mt-3 flex flex-wrap items-center gap-2">
                    <span class="text-2xs font-semibold text-title">
                      Popular:
                    </span>

                    <button
                      type="button"
                      class="rounded border border-border bg-white px-2.5 py-1 text-2xs font-medium text-primary transition hover:bg-light"
                    >
                      Track Order
                    </button>

                    <button
                      type="button"
                      class="rounded border border-border bg-white px-2.5 py-1 text-2xs font-medium text-primary transition hover:bg-light"
                    >
                      Return & Refund
                    </button>

                    <button
                      type="button"
                      class="rounded border border-border bg-white px-2.5 py-1 text-2xs font-medium text-primary transition hover:bg-light"
                    >
                      Payment Issues
                    </button>

                    <button
                      type="button"
                      class="rounded border border-border bg-white px-2.5 py-1 text-2xs font-medium text-primary transition hover:bg-light"
                    >
                      Account Settings
                    </button>
                  </div>
                </div>

                <div class="hidden shrink-0 sm:block">
                  <img
                    src="/icons/help-center.png"
                    alt="Customer support"
                    class="h-24 w-28 object-contain"
                  />
                </div>
              </div>
            </section>

            <section class="rounded border border-border bg-white p-3 text-sm">
              <div class="flex items-center justify-between px-1 py-2 sm:px-2">
                <h2 class="font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>

                <NuxtLink
                  to="/help/faq"
                  class="flex items-center gap-1 font-semibold text-primary transition hover:text-primary/70"
                >
                  View All FAQs

                  <UIcon name="i-lucide-arrow-right" class="size-4" />
                </NuxtLink>
              </div>

              <div class="rounded border border-border">
                <UAccordion
                  :items="filteredFaqs"
                  :ui="{
                    root: 'divide-y divide-border',
                    item: 'first:border-t-0',
                    trigger:
                      'flex w-full items-center gap-3 px-3 py-3.5 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50',
                    content: 'px-3 pb-3',
                    body: 'border-t border-gray-100 bg-gray-50/60 px-3 py-3 text-sm leading-5 text-body',
                  }"
                >
                  <template #leading="{ item }">
                    <div
                      :class="[
                        'flex size-9 shrink-0 items-center justify-center rounded-lg',
                        item.color,
                      ]"
                    >
                      <UIcon :name="item.icon" class="size-4.5" />
                    </div>
                  </template>

                  <template #default="{ item }">
                    <div class="min-w-0 flex-1">
                      <p class="font-semibold text-gray-800">
                        {{ item.title }}
                      </p>

                      <p class="mt-1 text-sm leading-5 text-gray-500">
                        {{ item.description }}
                      </p>
                    </div>
                  </template>

                  <template #content="{ item }">
                    <p>
                      {{ item.answer }}
                    </p>
                  </template>
                </UAccordion>

                <div v-if="!filteredFaqs.length" class="px-4 py-10 text-center">
                  <UIcon
                    name="i-lucide-search-x"
                    class="mx-auto size-8 text-gray-300"
                  />

                  <p class="mt-3 font-medium text-gray-600">
                    No help topics found
                  </p>

                  <p class="mt-1 text-sm text-gray-400">
                    Try searching with another keyword.
                  </p>
                </div>
              </div>
            </section>

            <section
              class="flex items-center justify-between gap-4 overflow-hidden rounded border border-border bg-light px-4 py-3 text-sm"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100/80"
                >
                  <UIcon
                    name="i-lucide-headphones"
                    class="h-4 w-4 text-primary"
                  />
                </div>

                <div class="min-w-0">
                  <h3 class="font-semibold leading-5 text-title">
                    Still Need Help?
                  </h3>

                  <p class="mt-0.5 max-w-md text-xs leading-4 text-body">
                    Can't find what you're looking for? Our support team is
                    ready to assist you personally.
                  </p>

                  <button
                    type="button"
                    class="mt-2 inline-flex h-7 items-center rounded bg-primary px-3 text-xs font-medium text-white transition hover:bg-primary/70"
                  >
                    Contact Support
                  </button>
                </div>
              </div>

              <div class="hidden shrink-0 sm:block">
                <img
                  src="/icons/mail.png"
                  alt="Contact support"
                  class="h-20 w-32 object-contain"
                />
              </div>
            </section>
          </main>

          <!-- Sidebar -->
          <aside class="space-y-4">
            <!-- Contact Us -->
            <section class="rounded-lg border border-gray-100 bg-white p-4">
              <h2 class="text-sm font-bold text-gray-900">Contact Us</h2>

              <p class="mt-1 text-sm leading-5 text-gray-500">
                Reach out to us through any of these channels. We usually
                respond within a few minutes.
              </p>

              <div class="mt-4 space-y-1">
                <NuxtLink
                  v-for="contact in contactMethods"
                  :key="contact.title"
                  to="/help/contact"
                  class="group flex items-center gap-3 rounded-lg px-1 py-2.5 transition hover:bg-gray-50"
                >
                  <div
                    :class="[
                      'flex size-9 shrink-0 items-center justify-center rounded-full',
                      contact.color,
                    ]"
                  >
                    <UIcon :name="contact.icon" class="size-4" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-gray-800">
                      {{ contact.title }}
                    </p>

                    <p class="truncate text-sm text-gray-500">
                      {{ contact.description }}
                    </p>

                    <p v-if="contact.meta" class="text-sm text-gray-400">
                      {{ contact.meta }}
                    </p>
                  </div>

                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-4 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-violet-600"
                  />
                </NuxtLink>
              </div>
            </section>

            <!-- Quick Links -->
            <section class="rounded-lg border border-gray-100 bg-white p-4">
              <h2 class="text-sm font-bold text-gray-900">Quick Links</h2>

              <div class="mt-3">
                <NuxtLink
                  v-for="link in quickLinks"
                  :key="link.label"
                  :to="link.to"
                  class="group flex items-center gap-3 border-b border-gray-50 py-3 last:border-0"
                >
                  <UIcon
                    :name="link.icon"
                    class="size-4 shrink-0 text-gray-500 transition group-hover:text-violet-600"
                  />

                  <span
                    class="min-w-0 flex-1 text-sm font-medium text-gray-600 group-hover:text-violet-600"
                  >
                    {{ link.label }}
                  </span>

                  <UIcon
                    name="i-lucide-chevron-right"
                    class="size-4 text-gray-400"
                  />
                </NuxtLink>
              </div>
            </section>

            <!-- Feedback -->
            <section class="rounded-lg border border-gray-100 bg-white p-4">
              <h2 class="text-sm font-bold text-gray-900">Give Us Feedback</h2>

              <p class="mt-1 text-sm leading-5 text-gray-500">
                Help us improve your shopping experience.
              </p>

              <UButton
                to="/help/feedback"
                label="Share Feedback"
                icon="i-lucide-message-square-share"
                variant="outline"
                color="primary"
                size="sm"
                class="mt-4"
              />
            </section>
          </aside>
        </div>
      </div>
    </div>
  </Dashboard>
</template>
