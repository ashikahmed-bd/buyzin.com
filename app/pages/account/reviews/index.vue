<script setup>
const reviewStore = useReviewStore();

const {
  data: reviews,
  pending,
  error,
  refresh,
} = await useAsyncData("reviews", async () => {
  return await reviewStore.getReviews();
});

const sortBy = ref("newest");

const statusClasses = {
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Draft: "bg-slate-50 text-slate-600 ring-slate-200",
};

const getStars = (rating) => {
  return Array.from({ length: 5 }, (_, index) => index < rating);
};

const writeReview = () => {
  // Navigate to write review page
};

const editReview = (review) => {
  // Navigate to edit review page
};

const deleteReview = (review) => {
  // Delete review
};

const cancelReview = (review) => {
  // Cancel pending review
};

const continueReview = (review) => {
  // Continue draft review
};

const moreReviewActions = (review) => {
  // Open review action menu
};
</script>

<template>
  <Dashboard>
    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <template v-else-if="reviews">
      <Head>
        <Title>My Reviews | Buyzin</Title>

        <Meta
          name="description"
          content="Manage and track your Buyzin product reviews easily."
        />

        <Meta name="robots" content="noindex, nofollow" />
      </Head>

      <UBreadcrumb
        :items="[
          {
            label: 'Home',
            to: '/',
          },
          {
            label: 'My Account',
            to: '/account',
          },
          {
            label: 'My Reviews',
          },
        ]"
        class="py-4 text-sm"
      />

      <section class="space-y-4 rounded-2xl bg-white p-4 text-sm">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 class="text-xl font-bold tracking-tight text-title">
              My Reviews
            </h1>

            <p class="mt-1 text-sm text-body">
              Manage and track all your product reviews in one place.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
            @click="writeReview"
          >
            <UIcon name="i-lucide-pen-line" class="size-4" />

            Write a Review
          </button>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article
            class="flex items-center gap-3 rounded border border-border bg-white px-4 py-3"
          >
            <div
              class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <UIcon name="i-lucide-message-square-text" class="size-5" />
            </div>

            <div class="min-w-0">
              <h4 class="text-xs font-medium text-title">Total Reviews</h4>
              <h2 class="text-lg font-bold leading-6 text-title">
                {{ reviews?.total }}
              </h2>
              <p class="truncate text-xs text-body">All reviews</p>
            </div>
          </article>
          <article
            class="flex items-center gap-3 rounded border border-border bg-white px-4 py-3"
          >
            <div
              class="bg-amber-50 text-amber-600 flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <UIcon name="i-lucide-clock-3" class="size-5" />
            </div>

            <div class="min-w-0">
              <h4 class="text-xs font-medium text-title">Pending</h4>
              <h2 class="text-lg font-bold leading-6 text-title">
                {{ reviews?.pending }}
              </h2>
              <p class="truncate text-xs text-body">Waiting for approval</p>
            </div>
          </article>
          <article
            class="flex items-center gap-3 rounded border border-border bg-white px-4 py-3"
          >
            <div
              class="bg-emerald-50 text-emerald-600 flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <UIcon name="i-lucide-check-circle-2" class="size-5" />
            </div>

            <div class="min-w-0">
              <h4 class="text-xs font-medium text-title">Published</h4>
              <h2 class="text-lg font-bold leading-6 text-title">
                {{ reviews?.published }}
              </h2>
              <p class="truncate text-xs text-body">Visible to everyone</p>
            </div>
          </article>

          <article
            class="flex items-center gap-3 rounded border border-border bg-white px-4 py-3"
          >
            <div
              class="bg-violet-50 text-violet-600 flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <UIcon name="i-lucide-star" class="size-5" />
            </div>

            <div class="min-w-0">
              <h4 class="text-xs font-medium text-title">Average Rating</h4>
              <h2 class="text-lg font-bold leading-6 text-title">
                {{ reviews?.average }}
              </h2>
              <p class="truncate text-xs text-body">Based on reviews</p>
            </div>
          </article>
        </div>

        <section class="overflow-hidden rounded border border-border bg-white">
          <div
            class="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="font-semibold text-title">All Reviews</h2>

              <p class="mt-0.5 text-xs text-body">
                Manage your product reviews.
              </p>
            </div>

            <select
              v-model="sortBy"
              class="form__select w-full sm:w-auto"
              aria-label="Sort reviews"
            >
              <option value="newest">Sort by: Newest</option>

              <option value="oldest">Sort by: Oldest</option>

              <option value="highest">Highest Rating</option>

              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <article
            v-for="review in reviews.data"
            :key="review.id"
            class="relative border-b border-border px-4 py-4 last:border-b-0"
          >
            <div
              class="grid gap-4 lg:grid-cols-[72px_190px_minmax(0,1fr)_150px_120px]"
            >
              <NuxtImg
                :src="review.product?.cover_url"
                :alt="review.product?.name"
                loading="lazy"
                class="size-16 rounded border border-border bg-white object-cover"
              />

              <div class="min-w-0">
                <h1 class="truncate font-semibold text-title">
                  {{ review.product?.name }}
                </h1>

                <p class="mt-1 font-semibold text-title">
                  {{ review.order.total_formatted }}
                </p>
                <p class="mt-0.5 text-xs text-muted">
                  Order #{{ review.order?.order_no }}
                </p>

                <NuxtLink
                  :to="`/product/${review.product?.slug}/${review.product?.id}`"
                  target="_blank"
                  class="mt-1 inline-flex text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                >
                  View Product
                </NuxtLink>
              </div>

              <div class="min-w-0">
                <div
                  class="mb-1 flex items-center gap-0.5"
                  :aria-label="`${review.rating} out of 5 stars`"
                >
                  <UIcon
                    v-for="index in 5"
                    :key="index"
                    :name="
                      index <= review.rating
                        ? 'i-heroicons-star-solid'
                        : 'i-heroicons-star'
                    "
                    class="size-4"
                    :class="
                      index <= review.rating
                        ? 'text-amber-400'
                        : 'text-slate-300'
                    "
                  />
                </div>

                <p v-if="review.title" class="font-semibold text-title">
                  {{ review.title }}
                </p>
                <p
                  v-if="review.review"
                  class="mt-1 line-clamp-2 text-sm leading-5 text-body"
                >
                  {{ review.review }}
                </p>

                <div
                  v-if="review.is_verified"
                  class="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success"
                >
                  <UIcon name="i-lucide-badge-check" class="size-3.5" />

                  Verified Purchase
                </div>

                <div class="mt-2 flex items-center gap-3 text-xs text-muted">
                  <span>Helpful?</span>

                  <button
                    type="button"
                    class="inline-flex items-center gap-1 transition-colors hover:text-primary"
                    :aria-label="`Mark review helpful. ${review.helpful_count} people found it helpful`"
                  >
                    <UIcon name="i-lucide-thumbs-up" class="size-3.5" />

                    {{ review.helpful_count }}
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center gap-1 transition-colors hover:text-title"
                    :aria-label="`Mark review not helpful. ${review.not_helpful_count} people found it not helpful`"
                  >
                    <UIcon name="i-lucide-thumbs-down" class="size-3.5" />

                    {{ review.not_helpful_count }}
                  </button>
                </div>
              </div>

              <div>
                <p class="mb-3 text-xs text-muted">
                  {{ $date(review.created_at) }}
                </p>

                <span
                  class="inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset"
                  :class="{
                    'bg-emerald-50 text-emerald-700 ring-emerald-200':
                      review.status === 'approved',

                    'bg-amber-50 text-amber-700 ring-amber-200':
                      review.status === 'pending',

                    'bg-red-50 text-red-700 ring-red-200':
                      review.status === 'rejected',
                  }"
                >
                  {{ review.status }}
                </span>
              </div>

              <div class="flex flex-col items-start gap-2">
                <template v-if="review.status === 'approved'">
                  <button
                    type="button"
                    class="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-violet-200 px-2 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    @click="editReview(review)"
                  >
                    <UIcon name="i-lucide-pencil" class="size-3.5" />

                    Edit Review
                  </button>

                  <button
                    type="button"
                    class="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-red-200 px-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    @click="deleteReview(review)"
                  >
                    <UIcon name="i-lucide-trash-2" class="size-3.5" />

                    Delete Review
                  </button>
                </template>

                <button
                  v-else-if="review.status === 'rejected'"
                  type="button"
                  class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-violet-200 px-3 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  @click="editReview(review)"
                >
                  <UIcon name="i-lucide-pencil" class="size-3.5" />

                  Edit Review
                </button>
              </div>
            </div>
          </article>
        </section>
      </section>
    </template>

    <EmptyState v-else />
  </Dashboard>
</template>
