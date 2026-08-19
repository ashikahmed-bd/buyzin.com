<script setup>
const route = useRoute();
const reviewStore = useReviewStore();

const {
  data: faqs,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `reviews-${route.params.slug}-${route.params.id}`,
  () => reviewStore.getReviews(route.params.id),
);
</script>

<template>
  <div class="bg-white">
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="faqs">
      <h2 class="text-2xl font-bold mb-6">Faqs</h2>
    </template>

    <EmptyState v-else />
  </div>
</template>

<style scoped></style>
