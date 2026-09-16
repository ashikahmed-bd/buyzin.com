<script setup>
const route = useRoute();
const shopStore = useShopStore();
const {
  data: store,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `store-${route.params.slug}`,
  () => shopStore.getStoreBySlug(route.params.slug),
  { watch: [() => route.params.slug] },
);

const shareLink = async (store) => {
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: store.name,
        text: `Check out ${store.name}`,
        url,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Unable to share the link.");
      }
    }

    return;
  }

  if (!navigator.clipboard?.writeText) {
    alert("Sharing is not supported on this browser.");
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    alert("Link copied successfully.");
  } catch {
    alert("Unable to copy the link.");
  }
};
</script>
<template>
  <main class="container mx-auto px-4">
    <UBreadcrumb
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Store', to: '/store' },
        { label: store?.name },
      ]"
      class="py-2"
    />

    <section class="relative h-48 overflow-hidden bg-gray-100 sm:h-64 lg:h-80">
      <NuxtImg
        v-if="store?.banner_url"
        :src="store.banner_url"
        :alt="store.name"
        class="size-full object-cover rounded-xl"
      />
      <div
        v-else
        class="flex size-full items-center justify-center text-gray-300"
      >
        <UIcon name="i-lucide-store" class="size-12" />
      </div>
      <button
        type="button"
        @click="shareLink(store)"
        class="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 transition hover:bg-white hover:text-primary"
      >
        <UIcon name="i-lucide-share-2" class="size-4" />
      </button>
    </section>

    <section class="py-4 space-y-4">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="size-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:size-20"
          >
            <NuxtImg
              v-if="store?.logo_url"
              :src="store.logo_url"
              :alt="store.name"
              class="size-full object-cover"
            />

            <div
              v-else
              class="flex size-full items-center justify-center text-body"
            >
              <UIcon name="i-lucide-store" class="size-7" />
            </div>
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h1 class="truncate text-base font-semibold text-body">
                {{ store?.name }}
              </h1>

              <span
                v-if="store?.verified"
                class="flex shrink-0 items-center gap-1 text-sm text-primary"
              >
                <UIcon name="i-lucide-badge-check" class="size-4" />
                Verified
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-2 text-sm text-body">
              <span class="flex items-center gap-1">
                <UIcon
                  name="heroicons:star-solid"
                  class="size-4 text-yellow-400"
                />
                <span class="font-medium text-body">
                  {{ Number(store?.rating?.average || 0).toFixed(1) }}
                </span>
                ({{ store?.rating?.reviews_count ?? 0 }})
              </span>

              <span class="text-body"
                >Member since
                <strong>{{ $date(store?.created_at) }}</strong></span
              >
            </div>

            <div
              v-if="store?.location"
              class="flex items-center gap-1 text-sm text-body"
            >
              <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
              <address class="truncate">
                {{
                  [
                    store.location.address,
                    store.location.city,
                    store.location.state,
                    store.location.country,
                  ]
                    .filter(Boolean)
                    .join(", ")
                }}
              </address>
            </div>
          </div>
        </div>

        <div class="flex w-full gap-2 lg:w-auto">
          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            <UIcon name="i-lucide-message-square" class="size-4" />
            Message
          </button>

          <button
            type="button"
            class="flex flex-1 items-center justify-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium text-body"
          >
            <UIcon name="i-lucide-message-circle" class="size-4" />
            WhatsApp
          </button>
        </div>
      </div>

      <UTabs
        variant="link"
        :items="[
          { label: 'Products', icon: 'i-lucide-package', slot: 'products' },
          { label: 'About', icon: 'i-lucide-store', slot: 'about' },
          { label: 'Reviews', icon: 'i-lucide-star', slot: 'reviews' },
          { label: 'Policy', icon: 'i-lucide-file-text', slot: 'policy' },
          {
            label: 'Contact',
            icon: 'i-lucide-message-circle',
            slot: 'contact',
          },
        ]"
        :ui="{
          list: 'flex flex-wrap gap-y-2',
        }"
      >
        <template #products>
          <div class="pt-5"><ShopProducts /></div>
        </template>
        <template #about>
          <div class="pt-5"><ShopAbout /></div>
        </template>
        <template #reviews>
          <div class="pt-5"><ShopReviews /></div>
        </template>
        <template #policy>
          <div class="pt-5"><ShopPolicy /></div>
        </template>
        <template #contact>
          <div class="pt-5"><ShopContact /></div>
        </template>
      </UTabs>
    </section>
  </main>
</template>
