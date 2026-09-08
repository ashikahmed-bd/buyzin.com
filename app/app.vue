<script setup>
useSchemaOrg([
  defineWebSite({
    name: "Buyzin",
    url: "https://buyzin.com",
    description:
      "Buyzin is a modern online shopping platform in Bangladesh offering authentic fashion, gadgets, electronics, lifestyle products, and everyday essentials with fast delivery and secure shopping.",
    inLanguage: "en-US",
  }),

  defineOrganization({
    name: "Buyzin",
    description:
      "Buyzin is Bangladesh’s trusted ecommerce platform for fashion, electronics, gadgets, lifestyle products, and everyday essentials.",
    url: "https://buyzin.com",
    logo: "https://buyzin.com/logo.svg",
    image: ["https://buyzin.com/logo.svg", "https://buyzin.com/og-image.jpg"],
    email: "support@buyzin.com",
    telephone: "+880-9649-492233",
    sameAs: [
      "https://www.facebook.com/BuyzinOfficial",
      "https://www.instagram.com/BuyzinOfficial",
      "https://www.threads.com/@buyzinofficial",
      "https://www.youtube.com/@BuyzinOfficial",
      "https://www.pinterest.com/BuyzinOfficial",
      "https://www.linkedin.com/company/buyzinofficial",
    ],

    address: {
      "@type": "PostalAddress",
      streetAddress: "Rowmari",
      addressLocality: "Kurigram",
      addressRegion: "Rangpur Division",
      postalCode: "5640",
      addressCountry: "BD",
    },

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+880-1911-588858",
        contactType: "customer support",
        areaServed: "Bangladesh",
        availableLanguage: ["English", "Bengali"],
      },
    ],

    foundingDate: "2025-01-01",
  }),
]);

const route = useRoute();

const menuItems = [
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Shop",
    icon: "i-lucide-shopping-bag",
    to: "/shop",
  },
  {
    label: "Categories",
    icon: "i-lucide-layout-grid",
    to: "/categories",
  },
  {
    label: "Wishlist",
    icon: "i-lucide-heart",
    to: "/wishlist",
  },
  {
    label: "Account",
    icon: "i-lucide-user-round",
    to: "/account",
  },
];

const isActive = (to) => {
  if (to === "/") {
    return route.path === "/";
  }

  return route.path === to || route.path.startsWith(`${to}/`);
};
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UApp>
      <NuxtPage />
    </UApp>
    <nav
      class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/50 lg:hidden backdrop-blur"
      aria-label="Mobile navigation"
    >
      <div class="mx-auto grid max-w-lg grid-cols-5 py-3">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="relative flex flex-col items-center justify-center gap-1 transition-colors"
          :class="
            isActive(item.to)
              ? 'text-blue-600'
              : 'text-slate-500 hover:text-slate-900'
          "
        >
          <UIcon :name="item.icon" class="h-5 w-5" />

          <span
            class="text-xs leading-none"
            :class="isActive(item.to) ? 'font-semibold' : 'font-medium'"
          >
            {{ item.label }}
          </span>

          <span
            v-if="isActive(item.to)"
            class="absolute bottom-0 h-0.5 w-8 rounded-full bg-blue-600"
          />
        </NuxtLink>
      </div>
    </nav>
  </NuxtLayout>
</template>
