<script setup>
useSchemaOrg([
  defineWebSite({
    name: "Buyzin",
    url: "https://buyzin.com",
    description: "Buyzin is a modern online shopping platform in Bangladesh offering authentic fashion, gadgets, electronics, lifestyle products, and everyday essentials with fast delivery and secure shopping.",
    inLanguage: "en-US",
  }),

  defineOrganization({
    name: "Buyzin",
    description: "Buyzin is Bangladesh’s trusted ecommerce platform for fashion, electronics, gadgets, lifestyle products, and everyday essentials.",
    url: "https://buyzin.com",
    logo: "https://buyzin.com/logo.svg",
    image: [
      "https://buyzin.com/logo.svg",
      "https://buyzin.com/og-image.jpg",
    ],
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
        telephone: "+880-1911-742233",
        contactType: "customer support",
        areaServed: "Bangladesh",
        availableLanguage: ["English", "Bengali"],
      },
    ],

    foundingDate: "2025-01-01"
  }),
]);
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>