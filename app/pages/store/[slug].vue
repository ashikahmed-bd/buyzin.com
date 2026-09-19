<script setup>
const route = useRoute();
const shopStore = useShopStore();
const chatStore = useChatStore();

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

const tab = computed(() => route.query.tab ?? "home");

const isActive = (tab) => route.query.tab === tab;

const form = reactive({
  store_id: store.value.data?.id,
  type: "store",
  subject: "",
  message: "",
});

const submit = async () => {
  if (!form.subject.trim() || !form.message.trim()) {
    return;
  }

  await chatStore.store({
    store_id: form.store_id,
    product_id: form.product_id,
    type: form.type,
    subject: form.subject.trim(),
    message: form.message.trim(),
  });

  form.subject = "";
  form.message = "";
};
</script>

<template>
  <main class="container mx-auto px-4">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!store" />

    <template v-else>
      <SeoMeta
        :title="store?.data?.meta_title"
        :description="store?.data?.meta_description"
        :keywords="store?.data?.meta_keywords"
        :image="store?.data?.logo_url"
      />

      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Store', to: '/store' },
          { label: store?.data?.name },
        ]"
        class="py-2"
      />
      <section class="space-y-4">
        <div class="relative overflow-hidden rounded-xl">
          <NuxtImg
            :src="store?.data?.banner_url"
            :alt="store?.data?.name"
            class="absolute inset-0 z-0 size-full object-cover"
          />

          <div
            class="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-black/25 to-black/5"
          ></div>

          <div class="relative z-10 flex items-center px-4 py-8">
            <div class="w-full max-w-3xl">
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="size-16 shrink-0 overflow-hidden rounded-full bg-white p-0.5"
                >
                  <NuxtImg
                    v-if="store?.data?.logo_url"
                    :src="store.data?.logo_url"
                    :alt="store.data?.name"
                    class="size-full rounded-full object-cover"
                  />

                  <div
                    v-else
                    class="flex size-full items-center justify-center text-body"
                  >
                    <UIcon name="i-lucide-store" class="size-7" />
                  </div>
                </div>

                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <h1 class="text-lg font-bold leading-6 text-white">
                      {{ store?.data?.name }}
                    </h1>

                    <span
                      v-if="store?.verified"
                      class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                    >
                      <UIcon name="lucide:badge-check" class="size-3.5" />
                      Verified
                    </span>
                  </div>

                  <p class="mt-1 text-sm text-white/85">
                    {{ store?.data?.tagline }}
                  </p>

                  <div
                    class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/85"
                  >
                    <span>
                      Since
                      <strong class="text-white">
                        {{ $date(store?.data?.created_at) }}
                      </strong>
                    </span>

                    <span
                      v-if="store?.data?.location"
                      class="inline-flex items-center gap-1.5"
                    >
                      <UIcon name="lucide:map-pin" class="size-4" />

                      <address class="truncate not-italic">
                        {{
                          [
                            store.data?.location?.state,
                            store.data?.location?.country,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        }}
                      </address>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  @click="chatStore.dialog = true"
                  class="flex items-center justify-center gap-2 rounded bg-primary px-3 py-2 text-sm font-medium text-white"
                >
                  <UIcon name="i-lucide-messages-square" class="size-5" />
                  Message
                </button>

                <a
                  :href="store?.data?.whatsapp_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded border border-white/30 bg-white px-3 py-2 text-sm font-medium text-body"
                >
                  <UIcon name="i-lucide-message-circle" class="size-5" />
                  WhatsApp
                </a>

                <button
                  type="button"
                  @click="shareLink(store?.data)"
                  class="flex items-center justify-center gap-2 rounded border border-white/30 bg-white px-3 py-2 text-sm font-medium text-body"
                >
                  <UIcon name="i-lucide-share-2" class="size-5" />
                  Share
                </button>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
                <div>
                  <p class="inline-flex items-center">
                    <UIcon
                      v-for="star in 5"
                      :key="star"
                      name="i-heroicons:star-solid"
                      :class="[
                        'size-4',
                        star <= store?.data?.rating?.average
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300',
                      ]"
                    />

                    <span class="ml-2 font-semibold text-white">
                      {{ Number(store?.data?.rating?.average).toFixed(1) }}
                    </span>
                  </p>
                  <p class="text-sm text-white/75">
                    ({{ store?.data?.rating?.reviews_count }} reviews)
                  </p>
                </div>

                <div>
                  <p class="text-base font-bold text-white">
                    {{ store?.positive_reviews ?? 0 }}
                  </p>
                  <p class="text-sm text-white/75">Positive Reviews</p>
                </div>

                <div>
                  <p class="text-base font-bold text-white">
                    {{ store?.response_time ?? "-- --" }}
                  </p>
                  <p class="text-sm text-white/75">Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white px-4 rounded-xl space-y-4">
          <nav class="flex items-center gap-4 font-semibold overflow-x-auto">
            <NuxtLink
              to="?tab=home"
              :class="[
                'flex shrink-0 items-center gap-2 border-b border-transparent py-2 text-sm',
                isActive('home') ? 'border-primary text-primary' : 'text-body',
              ]"
            >
              <UIcon name="i-lucide-house" class="size-4" />
              Home
            </NuxtLink>

            <NuxtLink
              to="?tab=about"
              :class="[
                'flex shrink-0 items-center gap-2 py-2 text-sm',
                isActive('about')
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-body',
              ]"
            >
              <UIcon name="i-lucide-store" class="size-4" />
              About
            </NuxtLink>

            <NuxtLink
              to="?tab=reviews"
              :class="[
                'flex shrink-0 items-center gap-2 py-2 text-sm',
                isActive('reviews')
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-body',
              ]"
            >
              <UIcon name="i-lucide-star" class="size-4" />
              Reviews
            </NuxtLink>

            <NuxtLink
              to="?tab=policy"
              :class="[
                'flex shrink-0 items-center gap-2 py-2 text-sm',
                isActive('policy')
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-body',
              ]"
            >
              <UIcon name="i-lucide-file-text" class="size-4" />
              Policy
            </NuxtLink>

            <NuxtLink
              to="?tab=contact"
              :class="[
                'flex shrink-0 items-center gap-2 py-2 text-sm',
                isActive('contact')
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-body',
              ]"
            >
              <UIcon name="i-lucide-message-circle" class="size-4" />
              Contact
            </NuxtLink>
          </nav>

          <div class="py-2">
            <LazyStoreHome v-if="tab === 'home'" />

            <LazyStoreAbout v-else-if="tab === 'about'" :store="store?.data" />

            <LazyStoreReviews
              v-else-if="tab === 'reviews'"
              :store="store?.data"
            />

            <LazyStorePolicy
              v-else-if="tab === 'policy'"
              :store="store?.data"
            />

            <LazyStoreContact
              v-else-if="tab === 'contact'"
              :store="store?.data"
            />
          </div>
        </div>
      </section>
    </template>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
    >
      <div
        v-if="chatStore.dialog"
        @click.self="chatStore.dialog = false"
        class="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div
          class="flex items-center justify-between border-b border-dashed bg-white px-5 py-4"
        >
          <div class="flex items-center gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-1">
                <h3 class="truncate text-sm font-semibold text-slate-900">
                  {{ store?.name }}
                </h3>

                <UIcon
                  v-if="store?.verified"
                  name="i-lucide-badge-check"
                  class="size-4 shrink-0 text-blue-500"
                />
              </div>

              <small class="text-xs text-body"
                >Send a message to the seller</small
              >
            </div>
          </div>

          <button
            type="button"
            @click="chatStore.dialog = false"
            class="flex size-8 items-center justify-center rounded-full text-body transition hover:bg-slate-100 hover:text-slate-600"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>
        </div>

        <form @submit.prevent="submit" class="space-y-4 px-4 py-5">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="subject in [
                'Wholesale Price',
                'Product Availability',
                'Bulk Order',
                'MOQ Inquiry',
                'Shipping & Delivery',
                'Sample Request',
                'Custom Order',
                'Payment & Pricing',
                'Other',
              ]"
              :key="subject"
              type="button"
              @click="form.subject = subject"
              class="rounded-full border px-3 py-1.5 text-xs font-medium transition"
              :class="
                form.subject === subject
                  ? 'border-primary bg-primary text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
              "
            >
              {{ subject }}
            </button>
          </div>

          <div class="form__group">
            <label class="mb-1.5 block text-sm font-medium text-slate-700">
              Message
              <span class="text-red-500">*</span>
            </label>

            <UTextarea
              v-model="form.message"
              placeholder="Write your message..."
              :rows="4"
              size="lg"
              class="w-full"
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-1">
            <UButton
              type="reset"
              color="neutral"
              variant="ghost"
              @click="chatStore.dialog = false"
            >
              Cancel
            </UButton>

            <UButton
              type="submit"
              :loading="chatStore.loading"
              :disabled="!form.subject.trim() || !form.message.trim()"
              icon="i-lucide-send"
            >
              Send
            </UButton>
          </div>
        </form>
      </div>
    </Transition>
  </main>
</template>
