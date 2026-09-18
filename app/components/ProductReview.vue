<script setup>
const route = useRoute()
const productStore = useProductStore()

const page = ref(1)

const {
  data: reviews,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `reviews-${route.params.slug}-${route.params.code}`,
  () =>
    productStore.getReviews(
      route.params.slug,
      route.params.code,
      page.value,
    ),
  {
    watch: [page],
  },
)
</script>

<template>
  <div class="bg-white px-4 py-6 rounded-xl">
    <template v-if="pending">
      <LoadingState />
    </template>

    <template v-else-if="error">
      <ErrorState :retry="refresh" />
    </template>

    <template v-else-if="reviews">
      <h2 class="text-2xl font-bold mb-6">Reviews</h2>
      <div class="flex items-start gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-primary">
            {{ reviews?.average_rating }}
          </div>
          <div class="flex items-center gap-1 text-yellow-500">
            <div class="flex items-center gap-0.5">
              <UIcon
                v-for="i in 5"
                :key="i"
                name="i-lucide-star"
                class="size-5"
                :class="
                  i <= Math.floor(reviews?.average_rating ?? 0)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                "
              />
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-1">
            {{ reviews?.total_reviews }} ratings
          </div>
        </div>

        <div class="flex-1 space-y-1">
          <template v-for="(count, star) in reviews.ratings" :key="star">
            <div class="flex items-center text-sm text-gray-500 gap-2">
              <span>{{ star }}.0</span>
              <div class="bg-gray-200 rounded-full w-full h-2 relative">
                <div
                  class="bg-primary h-2 rounded-full absolute left-0 top-0"
                  :style="{
                    width: (count / reviews?.total_reviews) * 100 + '%',
                  }"
                ></div>
              </div>
              <span>{{ count }}</span>
            </div>
          </template>
        </div>
      </div>

      <div class="space-y-4 py-6">
        <article
          v-for="review in reviews.data"
          :key="review.id"
          class="px-2 py-3.5"
        >
          <div class="flex gap-3">
            <div class="shrink-0">
              <NuxtImg
                :src="review.user?.photo_url"
                :alt="review.user?.name"
                class="size-12 rounded-full border border-border bg-muted object-cover"
              />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 class="truncate text-sm font-semibold text-title">
                  {{ review.user?.name }}
                </h3>

                <span
                  v-if="review.is_verified"
                  class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700"
                >
                  <UIcon name="i-lucide-badge-check" class="size-3.5" />
                  Verified Purchase
                </span>
              </div>

              <p class="mt-0.5 text-xs text-body">
                {{ review.created_at?.human }}
              </p>

              <div class="mt-2 flex items-center gap-1">
                <div class="flex items-center">
                  <UIcon
                    v-for="star in 5"
                    :key="star"
                    name="i-heroicons:star-solid"
                    :class="[
                      'size-4',
                      star <= review.rating
                        ? 'text-amber-400'
                        : 'text-slate-300',
                    ]"
                  />
                </div>

                <span class="ml-1 text-xs font-semibold text-title">
                  {{ review.rating }}.0
                </span>
              </div>

              <p v-if="review.review" class="text-sm leading-6 text-body">
                {{ review.review }}
              </p>

              <div class="flex items-center gap-4 py-2">
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-body transition-colors hover:text-title"
                >
                  <UIcon name="i-lucide-thumbs-up" class="size-3.5" />
                  Helpful
                  <span class="text-muted">
                    ({{ review.helpful_count || 0 }})
                  </span>
                </button>

                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 text-xs font-medium text-body transition-colors hover:text-title"
                >
                  <UIcon name="i-lucide-thumbs-down" class="size-3.5" />

                  Not helpful

                  <span class="text-muted">
                    ({{ review.not_helpful_count || 0 }})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>

        <div
          v-if="reviews?.meta?.last_page > 1"
          class="flex justify-center py-8"
        >
          <UPagination
            v-model:page="page"
            show-edges
            :sibling-count="1"
            :total="reviews?.meta?.total"
            :items-per-page="reviews?.meta?.per_page"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <EmptyState />
    </template>
  </div>
</template>

<style scoped></style>
