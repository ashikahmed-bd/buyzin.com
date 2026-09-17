<script setup>
const route = useRoute();
const productStore = useProductStore();

const {
  data: reviews,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `reviews-${route.params.slug}-${route.params.code}`,
  () => productStore.getReviews(route.params.slug, route.params.code),
);
</script>

<template>
  <div class="max-w-4xl bg-white">
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

      <div class="mt-8 space-y-6">
        <ReviewCard
          v-for="review in reviews.data"
          :key="review.id"
          :review="review"
        />
      </div>
    </template>
    <template v-else>
      <EmptyState />
    </template>
  </div>
</template>

<style scoped></style>
