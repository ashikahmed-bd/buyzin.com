<script setup>
defineProps({
  review: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="px-4 py-4">
    <div
      class="grid grid-cols-[40px_minmax(0,1fr)] gap-3 sm:grid-cols-[40px_minmax(0,1fr)_180px]"
    >
      <div class="shrink-0">
        <NuxtImg
          :src="review.user?.photo_url"
          :alt="review.user?.name"
          class="size-10 rounded-full border border-border object-cover"
        />
      </div>

      <div class="min-w-0 space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-semibold text-title">
            {{ review.user?.name }}
          </h3>

          <span
            v-if="review.is_verified"
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600"
          >
            <UIcon name="i-lucide-badge-check" class="size-3.5" />

            Verified Purchase
          </span>
        </div>

        <p class="text-xs text-body">
          {{ review.created_at?.human }}
        </p>

        <div class="flex items-center gap-1">
          <UIcon
            v-for="star in 5"
            :key="star"
            name="i-heroicons:star-solid"
            :class="[
              'size-4',
              star <= review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300',
            ]"
          />

          <span class="ml-1 text-xs font-medium text-body">
            {{ review.rating }}.0
          </span>
        </div>

        <div class="block">
          <a :href="review.product?.url" target="_blank">
            <h4 class="font-medium text-link">
              <span
                class="inline-flex rounded-full border border-border bg-slate-100 px-2 py-0.5 text-xs text-body"
              >
                Product
              </span>
              {{ review.product?.name }}
            </h4>
          </a>
          <p v-if="review.review" class="leading-6 text-body">
            {{ review.review }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button
            type="button"
            class="flex items-center gap-1.5 text-xs text-body transition hover:text-title"
          >
            <UIcon name="i-lucide-thumbs-up" class="size-4" />

            Helpful
            <span>({{ review.helpful_count }})</span>
          </button>

          <button
            type="button"
            class="flex items-center gap-1.5 text-xs text-body transition hover:text-title"
          >
            <UIcon name="i-lucide-thumbs-down" class="size-4" />

            Not helpful
            <span>({{ review.not_helpful_count }})</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
