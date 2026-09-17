<script setup>
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Application Submitted | Buyzin",
  description:
    "Your seller application has been successfully submitted to Buyzin.",
});
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <div class="mx-auto max-w-2xl">
      <div
        class="rounded-xl border border-border bg-white px-5 py-8 text-center sm:px-8 sm:py-10"
      >
        <div
          class="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50"
        >
          <div
            class="flex size-11 items-center justify-center rounded-full bg-green-100"
          >
            <UIcon name="i-lucide-check" class="size-6 text-green-600" />
          </div>
        </div>

        <div class="mt-5">
          <h1 class="text-xl font-bold text-title sm:text-2xl">
            Application Submitted Successfully!
          </h1>

          <p class="mx-auto mt-2 max-w-lg text-sm leading-6 text-body">
            Thank you for applying to become a seller on Buyzin. Your
            application has been received and is now under review.
          </p>
        </div>

        <div
          class="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-left"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100"
          >
            <UIcon name="i-lucide-clock-3" class="size-5 text-amber-600" />
          </div>

          <div>
            <p class="text-sm font-semibold text-title">
              Application Under Review
            </p>

            <p class="mt-0.5 text-sm text-body">
              Our team will review your store information.
            </p>
          </div>
        </div>

        <div class="mt-8 text-left">
          <h2 class="text-sm font-bold text-title">What happens next?</h2>
          <div class="mt-4 space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100"
              >
                <UIcon name="i-lucide-check" class="size-4 text-green-600" />
              </div>

              <div>
                <p class="text-sm font-semibold text-title">
                  Application submitted
                </p>

                <p class="mt-0.5 text-sm leading-5 text-body">
                  Your seller application has been successfully submitted.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10"
              >
                <span class="text-sm font-semibold text-primary"> 2 </span>
              </div>

              <div>
                <p class="text-sm font-semibold text-title">
                  Application review
                </p>

                <p class="mt-0.5 text-sm leading-5 text-body">
                  Our team will review your business and store information.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100"
              >
                <span class="text-sm font-semibold text-body"> 3 </span>
              </div>

              <div>
                <p class="text-sm font-semibold text-title">Start selling</p>

                <p class="mt-0.5 text-sm leading-5 text-body">
                  Once approved, you can access your seller store and start
                  selling on Buyzin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-3 text-left py-6">
          <UIcon
            name="i-lucide-mail"
            class="mt-0.5 size-5 shrink-0 text-primary"
          />

          <p class="text-sm leading-5 text-body">
            We'll notify you by email once your application has been reviewed.
            Please make sure you can access the email address provided in your
            application.
          </p>
        </div>

        <div class="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <NuxtLink
            to="/"
            class="flex h-9 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-title transition hover:bg-light"
          >
            <UIcon name="i-lucide-house" class="size-4" />

            Back to Home
          </NuxtLink>

          <NuxtLink
            to="/account"
            class="flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Go to My Account

            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- Support -->
      <div class="mt-4 text-center">
        <p class="text-sm text-body">
          Need help?

          <NuxtLink
            to="/support"
            class="font-medium text-primary hover:underline"
          >
            Contact Support
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>
