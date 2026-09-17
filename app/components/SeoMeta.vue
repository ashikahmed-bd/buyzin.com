<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "/og-image.jpg",
  },
  url: {
    type: String,
    default: () => useRequestURL().href,
  },
  robots: {
    type: String,
    default: "noindex, nofollow",
  },

  author: {
    type: String,
    default: "Buyzin",
  },
});
</script>

<template>
  <Head>
    <Title>{{ props.title }}</Title>

    <Meta name="description" :content="props.description" />
    <Meta name="keywords" :content="props.keywords" />
    <Link rel="canonical" :href="props.url" />
    <Meta name="robots" :content="props.robots" />
    <Meta name="author" :content="props.author" />

    <Meta property="og:title" :content="props.title" />
    <Meta property="og:description" :content="props.description" />
    <Meta property="og:image" :content="props.image" />
    <Meta property="og:image:width" content="1200" />
    <Meta property="og:image:height" content="630" />
    <Meta property="fb:app_id" content="1631179298041343" />
    <Meta property="og:url" :content="props.url" />
    <Meta property="og:type" content="website" />
    <Meta property="og:site_name" content="Buyzin.com" />

    <Meta property="og:locale" content="en_US" />
    <Meta property="og:image:alt" :content="props.title" />

    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="props.title" />
    <Meta name="twitter:description" :content="props.description" />
    <Meta name="twitter:image" :content="props.image" />
    <Meta name="twitter:site" content="@BuyzinOfficial" />
    <Meta name="twitter:creator" content="@BuyzinOfficial" />
  </Head>
</template>
