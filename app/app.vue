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
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UApp>
      <NuxtPage />
    </UApp>
    <nav
      class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white lg:hidden"
      aria-label="Mobile navigation"
    >
      <div class="mx-auto grid max-w-lg grid-cols-5 py-3">
        <a
          href="/"
          exact-active-class="text-primary"
          class="flex flex-col items-center justify-center gap-1 text-gray-500 router-link-exact-active:font-semibold"
        >
          <UIcon name="i-lucide-house" class="size-5" />
          <span class="text-xs leading-none">Home</span>
        </a>

        <a
          href="/shop"
          active-class="text-primary"
          class="flex flex-col items-center justify-center gap-1 text-gray-500"
        >
          <UIcon name="i-lucide-shopping-bag" class="size-5" />
          <span class="text-xs leading-none">Shop</span>
        </a>

        <a
          href="/categories"
          active-class="text-primary"
          class="flex flex-col items-center justify-center gap-1 text-gray-500"
        >
          <UIcon name="i-lucide-layout-grid" class="size-5" />
          <span class="text-xs leading-none">Categories</span>
        </a>

        <a
          href="/account/messages"
          active-class="text-primary"
          class="flex flex-col items-center justify-center gap-1 text-gray-500"
        >
          <UIcon name="i-lucide-messages-square" class="size-5" />
          <span class="text-xs leading-none">Messages</span>
        </a>

        <a
          href="/account"
          active-class="text-primary"
          class="flex flex-col items-center justify-center gap-1 text-gray-500"
        >
          <UIcon name="i-lucide-user-round" class="size-5" />
          <span class="text-xs leading-none">Account</span>
        </a>
      </div>
    </nav>
  </NuxtLayout>
</template>
