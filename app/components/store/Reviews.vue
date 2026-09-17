<script setup>
const shopStore = useShopStore();

const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});

const form = reactive({
  page: 1,
  sort: "newest",
});

const {
  data: reviews,
  pending,
  error,
  refresh,
} = await useAsyncData(
  `store-${props.store.slug}-reviews`,
  () =>
    shopStore.getReviews(props.store.slug, {
      page: form.page,
      sort: form.sort,
    }),
  {
    watch: [() => form.page, () => form.sort],
  },
);

watch(
  () => form.sort,
  () => {
    form.page = 1;
  },
);
</script>

<template>
  <section class="w-full text-sm">
    <div
      class="grid grid-cols-1 items-start gap-3 lg:grid-cols-[320px_minmax(0,1fr)]"
    >
      <aside class="space-y-2.5 lg:sticky lg:top-28 lg:self-start">
        <div class="rounded-md border border-slate-200 bg-white p-4">
          <h3 class="font-semibold text-title">Overall Rating</h3>

          <div class="mt-2 flex items-end gap-1">
            <span class="text-3xl font-bold leading-none text-title">
              {{ Number(reviews?.average ?? 0).toFixed(1) }}
            </span>

            <span class="mb-0.5 text-body"> / 5 </span>
          </div>

          <div class="mt-2 flex items-center gap-0.5">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons:star-solid"
              :class="[
                'size-4',
                i <= Math.round(reviews?.average ?? 0)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300',
              ]"
            />
          </div>

          <p class="mt-1 text-body">
            Based on {{ reviews?.total ?? 0 }} reviews
          </p>

          <div class="mt-4 space-y-2.5">
            <div
              v-for="[stars, count] in Object.entries(
                reviews?.breakdown ?? {},
              ).sort(([a], [b]) => Number(b) - Number(a))"
              :key="stars"
              class="flex items-center gap-2"
            >
              <span class="w-12 shrink-0 text-body"> {{ stars }} Star </span>

              <div
                class="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100"
              >
                <div
                  class="h-full rounded-full bg-primary transition-all"
                  :style="{
                    width: `${
                      reviews?.total ? (Number(count) / reviews.total) * 100 : 0
                    }%`,
                  }"
                />
              </div>

              <span class="w-10 text-right text-body">
                {{
                  reviews?.total
                    ? Math.round((Number(count) / reviews.total) * 100)
                    : 0
                }}%
              </span>

              <span class="w-7 text-right text-body">
                {{ count }}
              </span>
            </div>
          </div>

          <div class="mt-5 rounded-md bg-primary/20 p-3">
            <div class="flex gap-2">
              <div
                class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary"
              >
                <UIcon
                  name="i-lucide-shield-check"
                  class="size-3.5 text-white"
                />
              </div>

              <div>
                <p class="font-medium text-title">Verified Buyer Reviews</p>

                <p class="mt-1 leading-5 text-body">
                  Only customers who have purchased from this store can leave a
                  review.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-md border border-border bg-white p-4">
          <div class="flex gap-2">
            <UIcon
              name="i-lucide-pen-line"
              class="mt-0.5 size-4 shrink-0 text-primary"
            />

            <div>
              <h4 class="font-semibold text-title">Share Your Experience</h4>

              <p class="mt-1 text-body">
                How was your experience with this store?
              </p>
            </div>
          </div>

          <button
            type="button"
            class="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded border border-primary font-medium text-primary transition hover:bg-primary/5"
          >
            <UIcon name="i-lucide-pen-line" class="size-4" />

            Write a Review
          </button>
        </div>
      </aside>

      <section class="min-w-0 rounded-md border border-slate-200 bg-white">
        <div
          class="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-2">
            <h2 class="font-semibold text-title">Customer Reviews</h2>

            <span
              class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-body"
            >
              {{ reviews?.total ?? 0 }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="hidden text-xs text-body sm:block"> Sort by </span>
            <div class="relative">
              <select
                v-model="form.sort"
                class="min-w-36 appearance-none rounded-md border border-border bg-white px-3 py-2 pr-9 text-sm text-title outline-none transition hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>

              <UIcon
                name="i-lucide-chevron-down"
                class="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-body"
              />
            </div>
          </div>
        </div>

        <LoadingState v-if="pending" />

        <ErrorState
          v-else-if="error"
          :retry="refresh"
          title="Unable to load reviews"
          description="Something went wrong while loading customer reviews."
        />

        <EmptyState v-else-if="!reviews?.data?.length" :retry="refresh" />

        <template v-else>
          <div class="divide-y divide-border">
            <ReviewCard
              v-for="review in reviews.data"
              :key="review.id"
              :review="review"
            />
          </div>

          <div
            v-if="reviews?.meta?.last_page > 1"
            class="flex justify-center py-8"
          >
            <UPagination
              v-model:page="form.page"
              show-edges
              :sibling-count="1"
              :total="reviews?.meta?.total"
              :items-per-page="reviews?.meta?.per_page"
            />
          </div>
        </template>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
