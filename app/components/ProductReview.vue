<script setup>
const route = useRoute();
const reviewStore = useReviewStore();

const reviews = ref([]);

const loadReviews = async () => {
  const response = await reviewStore.getReviews(route.params.id);
  reviews.value = response.data;
};

onMounted(() => {
  loadReviews();
});
</script>

<template>
  <div class="max-w-4xl bg-white">
    <template v-if="reviews.data">
      <h2 class="text-2xl font-bold mb-6">Reviews</h2>
      <div class="flex items-start gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-primary">
            {{ reviews?.average_rating }}
          </div>
          <div class="flex items-center gap-1 text-yellow-500">
            <template v-for="i in 5" :key="i">
              <IconsIconStarFill v-if="i <= Math.floor(reviews?.average_rating)" class="size-5 icon__star filled" />
              <IconsIconStar v-else class="size-5 icon__star" />
            </template>
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
                <div class="bg-primary h-2 rounded-full absolute left-0 top-0" :style="{
                  width: (count / reviews?.total_reviews) * 100 + '%',
                }"></div>
              </div>
              <span>{{ count }}</span>
            </div>
          </template>
        </div>
      </div>

      <div class="mt-8 space-y-6">
        <div v-for="review in reviews.data" :key="review.id"
          class="border border-gray-200 rounded-xl p-4 transition duration-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img :src="review.user?.photo_url" :alt="review.user?.name" class="h-10 w-10 rounded-full object-cover" />
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-gray-800">{{
                    review.user?.name
                  }}</span>
                  <span v-if="review.is_verified_purchase"
                    class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Verified</span>
                </div>
                <span class="text-gray-400 text-sm">{{
                  review.created_at?.human
                }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-gray-800">{{
                review.rating.toFixed(1)
              }}</span>
              <div class="flex items-center gap-0.5">
                <template v-for="i in 5" :key="i">
                  <IconsIconStarFill v-if="i <= Math.floor(review?.rating)" class="w-4 h-4 text-yellow-400" />
                  <IconsIconStar v-else class="w-4 h-4 text-gray-300" />
                </template>
              </div>
            </div>
          </div>

          <div class="text-gray-700 mt-3 text-sm leading-relaxed" v-html="review.review"></div>

          <div v-if="review.images && review.images.length" class="flex gap-2 mt-4 overflow-x-auto">
            <img v-for="(img, idx) in review.images" :key="idx" :src="img" alt="Review Image"
              class="h-16 w-16 object-cover rounded-lg shrink-0 border border-gray-200 p-1" />
          </div>

          <div class="flex gap-4 mt-4 text-gray-500 text-sm">
            <button type="button" @click="reviewStore.like(review.id)" class="space-x-2">
              <UIcon name="i-lucide-thumbs-up" class="size-5" />
              <span class="hover:text-primary transition">{{
                review.helpful_count
              }}</span>
            </button>

            <button type="button" @click="reviewStore.unlike(review.id)" class="space-x-2">
              <UIcon name="i-lucide-thumbs-down" class="size-5" />
              <span class="hover:text-primary transition">{{
                review.not_helpful_count
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
    <!-- skeleton -->
    <template v-else>
      <div class="max-w-4xl bg-white p-6 rounded-lg shadow space-y-6">
        <div class="flex items-start gap-8 mb-8">
          <div class="text-center">
            <div class="h-10 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div class="flex gap-1 justify-center mt-1">
              <div class="h-4 w-4 bg-gray-200 rounded-full animate-pulse" v-for="i in 5" :key="i"></div>
            </div>
            <div class="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>

          <div class="flex-1 space-y-1">
            <div v-for="i in 5" :key="i" class="flex items-center gap-2">
              <span class="h-3 w-4 bg-gray-200 rounded animate-pulse"></span>
              <div class="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
              <span class="h-3 w-4 bg-gray-200 rounded animate-pulse"></span>
            </div>
          </div>
        </div>

        <div v-for="i in 3" :key="i" class="border border-gray-200 rounded-xl p-4 animate-pulse space-y-3">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div class="flex-1 space-y-1">
              <div class="h-3 w-1/3 bg-gray-200 rounded"></div>
              <div class="h-2 w-1/4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
