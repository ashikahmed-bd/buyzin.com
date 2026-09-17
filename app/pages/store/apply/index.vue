<script setup>
const planStore = usePlanStore();
const shopStore = useShopStore();

definePageMeta({
  middleware: ["auth"],
});

const {
  data: plans,
  pending,
  error,
  refresh,
} = await useAsyncData("plans", () => planStore.getPlans(), {
  default: () => [],
});

const form = reactive({
  plan_id: "",
  billing_cycle: "monthly",

  name: "",
  tagline: "",
  phone: "",
  email: "",
  whatsapp: "",

  country: "BD",
  state: "",
  city: "",
  address: "",
  postcode: "",

  description: "",
});

const submit = async () => {
  await shopStore.apply(form);
};

const getPlanPrice = (plan) => {
  return form.billing_cycle === "monthly" ? plan.monthly : plan.yearly;
};

const selectBillingCycle = (cycle) => {
  form.billing_cycle = cycle;
};

const selectedPlan = computed(() => {
  return plans.value?.data?.find((plan) => plan.id === form.plan_id);
});

watch(
  () => plans.value?.data,
  (items) => {
    if (!form.plan_id && items?.length) {
      const plan = items.find((plan) => plan.slug === "professional");

      form.plan_id = plan?.id ?? items[0].id;
    }
  },
  { immediate: true },
);
</script>

<template>
  <main class="container mx-auto px-4 py-4">
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
          label: 'Store',
          to: '/account',
        },
        {
          label: 'Apply',
        },
      ]"
      class="text-sm"
    />

    <LoadingState v-if="pending" />

    <ErrorState v-else-if="error" :retry="refresh" />

    <EmptyState v-else-if="!plans.data?.length" />

    <template v-else>
      <SeoMeta
        title="Become a Seller on Buyzin | Start Selling Online"
        description="Join Buyzin as a seller and grow your business online. Create your store, manage products and orders, and connect with business buyers across Bangladesh."
        keywords="Buyzin seller, become a seller, sell on Buyzin, B2B marketplace Bangladesh, wholesale marketplace Bangladesh, online seller, business marketplace, seller registration"
      />

      <div class="py-4">
        <div
          class="grid grid-cols-1 gap-4 lg:grid-cols-[18rem_minmax(0,1fr)_16rem]"
        >
          <aside class="min-w-0">
            <div class="sticky top-4 overflow-hidden bg-white rounded-xl">
              <div class="p-4">
                <h2 class="text-lg font-bold leading-tight text-title">
                  Start Your<br />
                  Business Today
                </h2>

                <p class="mt-1 text-sm leading-5 text-body">
                  Reach millions of customers and grow your brand with
                  MarketPro.
                </p>

                <ul class="mt-4 space-y-2">
                  <li class="flex items-center gap-2 text-sm text-body">
                    <UIcon
                      name="i-lucide-circle-check"
                      class="size-4 shrink-0 text-green-600"
                    />
                    Easy store setup
                  </li>

                  <li class="flex items-center gap-2 text-sm text-body">
                    <UIcon
                      name="i-lucide-circle-check"
                      class="size-4 shrink-0 text-green-600"
                    />
                    Flexible plans
                  </li>

                  <li class="flex items-center gap-2 text-sm text-body">
                    <UIcon
                      name="i-lucide-circle-check"
                      class="size-4 shrink-0 text-green-600"
                    />
                    Secure payments
                  </li>

                  <li class="flex items-center gap-2 text-sm text-body">
                    <UIcon
                      name="i-lucide-circle-check"
                      class="size-4 shrink-0 text-green-600"
                    />
                    Dedicated support
                  </li>
                </ul>
              </div>

              <div class="px-3 pt-3">
                <div class="relative flex h-48 items-end justify-center">
                  <div class="relative z-10 w-36">
                    <div
                      class="mx-auto w-28 rounded-t-md bg-white px-2 py-2 text-center shadow-sm"
                    >
                      <p class="text-sm font-bold leading-4 text-title">
                        Your Store
                      </p>
                      <p class="text-sm font-bold leading-4 text-title">
                        Your Success
                      </p>
                    </div>

                    <div
                      class="flex h-7 overflow-hidden rounded-t-md border border-orange-300 bg-white"
                    >
                      <span class="flex-1 bg-orange-500" />
                      <span class="flex-1 bg-white" />
                      <span class="flex-1 bg-orange-500" />
                      <span class="flex-1 bg-white" />
                      <span class="flex-1 bg-orange-500" />
                      <span class="flex-1 bg-white" />
                      <span class="flex-1 bg-orange-500" />
                    </div>

                    <!-- Store -->
                    <div
                      class="flex h-24 items-center justify-center border border-gray-200 bg-white shadow-sm"
                    >
                      <UIcon
                        name="i-lucide-store"
                        class="size-14 text-gray-300"
                      />
                    </div>
                  </div>

                  <!-- Plants -->
                  <UIcon
                    name="i-lucide-trees"
                    class="absolute bottom-0 left-1 size-10 text-green-600"
                  />

                  <UIcon
                    name="i-lucide-package"
                    class="absolute bottom-0 right-1 size-10 text-amber-600"
                  />
                </div>
              </div>

              <div class="border-t border-blue-100 px-4 py-4">
                <p class="text-center text-sm leading-5 text-body">
                  “Empowering local businesses for a bigger tomorrow.”
                </p>

                <p class="mt-2 text-center text-sm text-body">
                  — Buyzin B2B Marketplce
                </p>
              </div>
            </div>
          </aside>

          <section class="min-w-0 space-y-4">
            <div class="block">
              <h1 class="text-xl font-bold text-title">Apply for a Store</h1>
              <p class="mt-0.5 text-sm text-body">
                Fill in the details below to create your seller store.
              </p>
            </div>

            <div class="space-x-4">
              <div class="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h2 class="text-base font-bold text-title">
                    1. Choose a Plan
                  </h2>

                  <p class="mt-0.5 text-sm text-body">
                    Select a subscription plan that fits your business needs.
                  </p>
                </div>

                <div
                  class="flex shrink-0 rounded border border-border bg-white p-0.5"
                >
                  <button
                    type="button"
                    class="rounded px-2.5 py-1.5 text-sm font-medium transition"
                    :class="
                      form.billing_cycle === 'monthly'
                        ? 'bg-primary text-white'
                        : 'text-body hover:text-title'
                    "
                    @click="selectBillingCycle('monthly')"
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    class="rounded px-3 py-1.5 text-sm font-medium transition"
                    :class="
                      form.billing_cycle === 'yearly'
                        ? 'bg-primary text-white'
                        : 'text-body hover:text-title'
                    "
                    @click="selectBillingCycle('yearly')"
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <article v-for="plan in plans.data" :key="plan.id">
                  <button
                    type="button"
                    class="relative w-full rounded-xl border bg-white p-2.5 text-left transition"
                    :class="
                      form.plan_id === plan.id
                        ? 'border-primary'
                        : 'border-border'
                    "
                    @click="form.plan_id = plan.id"
                  >
                    <div class="flex items-start gap-2">
                      <div
                        class="flex size-9 shrink-0 items-center justify-center rounded"
                        :class="
                          plan.slug === 'professional'
                            ? 'bg-amber-50'
                            : plan.slug === 'enterprise'
                              ? 'bg-blue-50'
                              : 'bg-green-50'
                        "
                      >
                        <UIcon
                          :name="plan.icon"
                          class="size-5"
                          :class="
                            plan.slug === 'professional'
                              ? 'text-amber-500'
                              : plan.slug === 'enterprise'
                                ? 'text-blue-500'
                                : 'text-green-600'
                          "
                        />
                      </div>

                      <div class="min-w-0">
                        <h3 class="text-sm font-bold text-title">
                          {{ plan.name }}
                        </h3>

                        <p
                          class="mt-0.5 line-clamp-2 text-sm leading-5 text-body"
                        >
                          {{ plan.description }}
                        </p>
                      </div>
                    </div>

                    <div class="py-2">
                      <span class="text-lg font-bold text-title">
                        {{ $currency(getPlanPrice(plan)) }}
                      </span>

                      <span class="text-sm text-body">
                        /
                        {{
                          form.billing_cycle === "monthly" ? "month" : "year"
                        }}
                      </span>
                    </div>

                    <div
                      class="flex items-center justify-between rounded bg-light px-2.5 py-2"
                    >
                      <span class="text-sm text-body"> Commission </span>

                      <span class="text-sm font-semibold text-title">
                        {{ plan.commission }}%
                      </span>
                    </div>

                    <ul class="space-y-1.5 py-2.5">
                      <li
                        v-for="feature in plan.features"
                        :key="feature"
                        class="flex items-start gap-1.5 text-sm text-body"
                      >
                        <UIcon
                          name="i-lucide-circle-check-big"
                          class="mt-0.5 size-4 shrink-0 text-primary"
                        />

                        <span>{{ feature }}</span>
                      </li>
                    </ul>

                    <div class="py-4">
                      <span
                        class="flex h-9 items-center justify-center rounded-md border text-sm font-medium transition"
                        :class="
                          form.plan_id === plan.id
                            ? 'border-primary bg-primary text-white'
                            : 'border-border text-title'
                        "
                      >
                        {{
                          form.plan_id === plan.id ? "Selected" : "Select Plan"
                        }}
                      </span>
                    </div>
                  </button>
                </article>
              </div>
            </div>

            <div class="py-4">
              <div>
                <h2 class="text-base font-bold text-title">
                  2. Store Information
                </h2>

                <p class="mt-0.5 text-sm text-body">
                  Tell us about your business. This information will be visible
                  to your customers.
                </p>
              </div>

              <form @submit.prevent="submit" class="py-4">
                <div class="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
                  <BaseInput
                    label="Store name"
                    v-model="form.name"
                    placeholder="e.g. Tech Valley BD"
                    :required="true"
                    error=""
                  />

                  <BaseInput
                    label="Tagline"
                    v-model="form.tagline"
                    placeholder="e.g. Quality Electronics at Best Price"
                    error=""
                  />

                  <BaseInput
                    label="Phone Number"
                    v-model="form.phone"
                    placeholder="e.g. 01xxxxxxxxx"
                    error=""
                  />

                  <BaseInput
                    label="Email"
                    v-model="form.email"
                    placeholder="e.g. info@yourstore.com"
                    error=""
                  />

                  <BaseInput
                    label="WhatsApp"
                    v-model="form.whatsapp"
                    placeholder="e.g. +8801712345678"
                    error=""
                  />

                  <BaseSelect
                    v-model="form.country"
                    label="Country"
                    :items="[
                      {
                        label: 'Bangladesh',
                        id: 'BD',
                      },
                      {
                        label: 'India',
                        id: 'IN',
                      },
                      {
                        label: 'Pakistan',
                        id: 'PK',
                      },
                    ]"
                    error=""
                  />

                  <BaseInput
                    label="State / Division"
                    v-model="form.division"
                    placeholder="e.g. Dhaka"
                    error=""
                  />

                  <BaseInput
                    label="City"
                    v-model="form.city"
                    placeholder="e.g. Dhaka"
                    error=""
                  />

                  <BaseInput
                    label="Address"
                    v-model="form.address"
                    placeholder="e.g. 123, Elephant Road, Dhaka"
                    error=""
                  />

                  <BaseInput
                    label="Postcode"
                    v-model="form.postcode"
                    placeholder="e.g. 1205"
                    error=""
                  />
                </div>

                <BaseTextarea
                  label="Description"
                  v-model="form.description"
                  placeholder="Tell us about your store..."
                  error=""
                />

                <div class="flex items-center justify-between py-4">
                  <button
                    type="button"
                    class="h-9 rounded-md bg-gray-100 px-5 text-sm font-medium text-title hover:bg-gray-200"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    :disabled="shopStore.loading"
                    class="flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {{ shopStore.loading ? "Please wait..." : "Submit" }}
                    </span>

                    <UIcon
                      v-if="shopStore.loading"
                      name="i-lucide-loader"
                      class="size-4 animate-spin"
                    />

                    <UIcon v-else name="i-lucide-arrow-right" class="size-4" />
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside class="min-w-0">
            <div class="sticky top-4 space-y-4">
              <!-- Plan Summary -->
              <div
                v-if="selectedPlan"
                class="rounded-xl border border-border bg-white p-4"
              >
                <h2 class="text-sm font-bold text-title">Plan Summary</h2>

                <!-- Selected Plan -->
                <div class="mt-4 flex items-start gap-3">
                  <div
                    class="flex size-9 shrink-0 items-center justify-center rounded-md"
                    :class="
                      selectedPlan.slug === 'professional'
                        ? 'bg-amber-50'
                        : selectedPlan.slug === 'enterprise'
                          ? 'bg-blue-50'
                          : 'bg-green-50'
                    "
                  >
                    <UIcon
                      :name="selectedPlan.icon"
                      class="size-5"
                      :class="
                        selectedPlan.slug === 'professional'
                          ? 'text-amber-500'
                          : selectedPlan.slug === 'enterprise'
                            ? 'text-blue-500'
                            : 'text-green-600'
                      "
                    />
                  </div>

                  <div class="min-w-0">
                    <h3 class="text-sm font-bold text-title">
                      {{ selectedPlan.name }}
                    </h3>

                    <p class="mt-0.5 text-sm text-body">
                      {{ $currency(getPlanPrice(selectedPlan)) }}
                      /
                      {{ form.billing_cycle === "monthly" ? "month" : "year" }}
                    </p>
                  </div>
                </div>

                <!-- Features -->
                <ul class="mt-4 space-y-2">
                  <li
                    v-for="feature in selectedPlan.features"
                    :key="feature"
                    class="flex items-start gap-2 text-sm text-body"
                  >
                    <UIcon
                      name="i-lucide-circle-check-big"
                      class="mt-0.5 size-4 shrink-0 text-primary"
                    />

                    <span>{{ feature }}</span>
                  </li>
                </ul>

                <div class="my-4 border-t border-gray-100" />

                <!-- Billing Cycle -->
                <div class="flex items-center justify-between text-sm">
                  <span class="text-body"> Billing Cycle </span>

                  <span class="font-medium capitalize text-title">
                    {{ form.billing_cycle }}
                  </span>
                </div>

                <!-- Commission -->
                <div class="mt-2 flex items-center justify-between text-sm">
                  <span class="text-body"> Platform Commission </span>

                  <span class="font-medium text-title">
                    {{ selectedPlan.commission }}%
                  </span>
                </div>

                <!-- Total -->
                <div class="mt-4 border-t border-gray-100 pt-4">
                  <div class="flex items-center justify-between gap-3">
                    <span class="text-sm font-semibold text-title">
                      Total
                    </span>

                    <span class="text-base font-bold text-title">
                      {{ $currency(getPlanPrice(selectedPlan)) }}
                      /
                      {{ form.billing_cycle === "monthly" ? "month" : "year" }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- What happens next -->
              <div class="rounded border border-border bg-white p-4">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-info" class="size-5 text-primary" />

                  <h2 class="text-sm font-bold text-primary">
                    What happens next?
                  </h2>
                </div>

                <div class="mt-4 space-y-3">
                  <div class="flex items-start gap-2">
                    <span
                      class="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-primary"
                    >
                      1
                    </span>

                    <p class="text-sm text-body">Submit your application</p>
                  </div>

                  <div class="flex items-start gap-2">
                    <span
                      class="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-primary"
                    >
                      2
                    </span>

                    <p class="text-sm text-body">
                      Our team will review your information
                    </p>
                  </div>

                  <div class="flex items-start gap-2">
                    <span
                      class="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-primary"
                    >
                      3
                    </span>

                    <p class="text-sm text-body">
                      Get approved and start selling
                    </p>
                  </div>
                </div>

                <p class="mt-4 text-sm leading-5 text-body">
                  You'll be notified via email once your application is
                  reviewed.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </template>
  </main>
</template>
