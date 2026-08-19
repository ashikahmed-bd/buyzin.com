<script setup>
const stats = [
  {
    label: "Total Reviews",
    value: 24,
    sub: "All reviews",
    icon: "i-lucide-message-square-text",
    iconClass: "bg-primary/10 text-primary",
  },
  {
    label: "Published",
    value: 18,
    sub: "Visible to everyone",
    icon: "i-lucide-check-circle-2",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Pending",
    value: 4,
    sub: "Waiting for approval",
    icon: "i-lucide-clock-3",
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Average Rating",
    value: "4.6",
    extra: "★",
    sub: "Based on published reviews",
    icon: "i-lucide-star",
    iconClass: "bg-violet-50 text-violet-600",
  },
];

const reviews = [
  {
    id: 1,
    product: "Premium Cotton T-Shirt",
    variant: "Black / Large",
    price: "$24.00",
    order: "#BZ-10245",
    image: "https://placehold.co/200x200",
    rating: 5,
    title: "Excellent quality",
    review:
      "The fabric quality is really good and the fitting is perfect. Highly recommended.",
    helpful: 12,
    date: "Aug 18, 2026",
    status: "Published",
  },
  {
    id: 2,
    product: "Classic Sneakers",
    variant: "White / 42",
    price: "$68.00",
    order: "#BZ-10221",
    image: "https://placehold.co/200x200",
    rating: 4,
    title: "Good shoes",
    review:
      "Comfortable and looks great. Delivery was also faster than expected.",
    helpful: 8,
    date: "Aug 15, 2026",
    status: "Pending",
  },
  {
    id: 3,
    product: "Casual Hoodie",
    variant: "Gray / Medium",
    price: "$42.00",
    order: "#BZ-10198",
    image: "https://placehold.co/200x200",
    rating: 0,
    title: "",
    review: "",
    helpful: 0,
    date: "Aug 10, 2026",
    status: "Draft",
  },
];

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
      <!-- Header -->
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

      <!-- Stats -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3"
        >
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-full"
            :class="stat.iconClass"
          >
            <UIcon :name="stat.icon" class="size-5" />
          </div>

          <div class="min-w-0">
            <p class="text-xs font-medium text-title">
              {{ stat.label }}
            </p>

            <div class="mt-0.5 flex items-center gap-1.5">
              <p class="text-lg font-bold leading-6 text-title">
                {{ stat.value }}
              </p>

              <span v-if="stat.extra" class="text-xs text-amber-400">
                {{ stat.extra }}
              </span>
            </div>

            <p class="truncate text-xs text-body">
              {{ stat.sub }}
            </p>
          </div>
        </article>
      </div>

      <!-- Reviews -->
      <section class="overflow-hidden rounded-lg border border-border bg-white">
        <!-- Table Header -->
        <div
          class="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 class="font-semibold text-title">All Reviews</h2>

            <p class="mt-0.5 text-xs text-body">Manage your product reviews.</p>
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

        <!-- Review List -->
        <div
          v-for="review in reviews"
          :key="review.id"
          class="relative border-b border-border px-4 py-4 last:border-b-0"
        >
          <div
            class="grid gap-4 lg:grid-cols-[72px_190px_minmax(0,1fr)_150px_120px]"
          >
            <!-- Product Image -->
            <div>
              <img
                :src="review.image"
                :alt="review.product"
                width="64"
                height="64"
                loading="lazy"
                class="size-16 rounded-lg border border-border bg-slate-50 object-cover"
              />
            </div>

            <!-- Product Info -->
            <div class="min-w-0">
              <p class="truncate font-semibold text-title">
                {{ review.product }}
              </p>

              <p class="truncate text-sm text-body">
                {{ review.variant }}
              </p>

              <p class="mt-1 font-semibold text-title">
                {{ review.price }}
              </p>

              <p class="mt-0.5 text-xs text-muted">Order {{ review.order }}</p>

              <NuxtLink
                :to="`/account/orders/${review.order.replace('#', '')}`"
                class="mt-1 inline-flex text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                View Product
              </NuxtLink>
            </div>

            <!-- Review Content -->
            <div class="min-w-0">
              <!-- Rating -->
              <div
                class="mb-1 flex items-center gap-0.5"
                :aria-label="`${review.rating} out of 5 stars`"
              >
                <UIcon
                  v-for="(filled, index) in getStars(review.rating)"
                  :key="index"
                  name="i-lucide-star"
                  class="size-4"
                  :class="
                    filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
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

              <!-- Helpful -->
              <div
                v-if="review.status === 'Published'"
                class="mt-2 flex items-center gap-3 text-xs text-muted"
              >
                <span>Helpful?</span>

                <button
                  type="button"
                  class="inline-flex items-center gap-1 transition-colors hover:text-primary"
                  :aria-label="`Mark review helpful. ${review.helpful} people found it helpful`"
                >
                  <UIcon name="i-lucide-thumbs-up" class="size-3.5" />

                  {{ review.helpful }}
                </button>

                <button
                  type="button"
                  class="transition-colors hover:text-title"
                  aria-label="Mark review not helpful"
                >
                  <UIcon name="i-lucide-thumbs-down" class="size-3.5" />
                </button>
              </div>
            </div>

            <!-- Status -->
            <div>
              <p class="mb-3 text-xs text-muted">
                {{ review.date }}
              </p>

              <span
                class="inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                :class="statusClasses[review.status]"
              >
                {{ review.status }}
              </span>

              <p
                v-if="review.status === 'Pending'"
                class="mt-2 text-xs leading-4 text-muted"
              >
                This review is under review. It will be published soon.
              </p>

              <p
                v-else-if="review.status === 'Draft'"
                class="mt-2 text-xs leading-4 text-muted"
              >
                You haven't submitted this review yet.
              </p>
            </div>

            <div class="flex flex-col items-start gap-2">
              <template v-if="review.status === 'Published'">
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
                v-else-if="review.status === 'Pending'"
                type="button"
                class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-body transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                @click="cancelReview(review)"
              >
                Cancel Review
              </button>

              <button
                v-else-if="review.status === 'Draft'"
                type="button"
                class="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-violet-200 px-3 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                @click="continueReview(review)"
              >
                <UIcon name="i-lucide-pencil" class="size-3.5" />

                Continue Review
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!reviews.length"
          class="flex flex-col items-center justify-center px-6 py-12 text-center"
        >
          <div
            class="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"
          >
            <UIcon name="i-lucide-message-square-text" class="size-6" />
          </div>

          <h3 class="mt-3 font-semibold text-title">No reviews yet</h3>

          <p class="mt-1 max-w-sm text-sm text-body">
            You haven't written any product reviews yet.
          </p>

          <button
            type="button"
            class="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            @click="writeReview"
          >
            <UIcon name="i-lucide-pen-line" class="size-4" />

            Write a Review
          </button>
        </div>
      </section>
    </section>
  </Dashboard>
</template>
