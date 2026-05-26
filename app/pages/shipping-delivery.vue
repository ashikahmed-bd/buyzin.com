<script setup>
const appStore = useAppStore();
const route = useRoute();
const page = ref(null);

const loadPage = async () => {
  const response = await appStore.getPage(route.name);
  page.value = response.data;
};

onMounted(() => {
  loadPage();
});
</script>

<template>
  <Head>
    <Title>{{ page?.meta_title ?? "" }}</Title>
    <Meta name="description" :content="page?.meta_description" />
    <Meta name="keywords" :content="page?.meta_keywords" />
  </Head>

  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="bg-white rounded-xl px-4 py-8">
      <template v-if="page === null">
        <div class="space-y-6">
          <div
            class="h-10 bg-gray-200 rounded w-3/5 mx-auto animate-pulse"
          ></div>

          <div
            class="h-6 bg-gray-200 rounded w-2/5 mx-auto animate-pulse"
          ></div>

          <div class="space-y-4 mt-6">
            <div
              v-for="n in 5"
              :key="n"
              class="h-4 bg-gray-200 rounded animate-pulse"
            ></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-heading mb-3">
            {{ page?.title }}
          </h1>
          <p class="max-w-2xl mx-auto">{{ page?.subtitle }}</p>
        </div>
        <!-- Main Content -->
        <div class="space-y-10 text-gray-700 leading-relaxed">
          <!-- Section 1 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              1. Delivery Coverage
            </h2>
            <p>
              Buyzin delivers across all major cities and towns in Bangladesh.
              Our goal is to make sure every customer enjoys a smooth and fast
              delivery experience no matter where they are located.
            </p>
            <ul class="list-disc pl-6 mt-3 space-y-2">
              <li>Dhaka Metro — same-day or next-day delivery.</li>
              <li>Outside Dhaka — within 2–5 working days.</li>
              <li>Remote areas — within 5–7 working days.</li>
            </ul>
          </section>

          <!-- Section 2 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              2. Shipping Partners
            </h2>
            <p>
              We partner with trusted courier services such as Pathao, RedX, and
              Sundarban Courier to ensure your products are delivered safely and
              on time.
            </p>
          </section>

          <!-- Section 3 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              3. Processing & Dispatch
            </h2>
            <p>
              Orders are processed within <strong>24 hours</strong> of
              confirmation. Once dispatched, you’ll receive a tracking link via
              SMS or email so you can follow your order’s journey.
            </p>
            <ul class="list-disc pl-6 mt-3 space-y-2">
              <li>Orders placed before 3 PM are shipped the same day.</li>
              <li>Orders after 3 PM are shipped the next business day.</li>
              <li>Public holidays may affect delivery timelines.</li>
            </ul>
          </section>

          <!-- Section 4 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              4. Shipping Fees
            </h2>
            <p>
              We offer affordable and transparent shipping charges based on your
              location and the size/weight of your order.
            </p>
            <div class="overflow-x-auto mt-4">
              <table class="min-w-full border rounded-lg">
                <thead>
                  <tr class="bg-gray-100 text-left text-gray-800">
                    <th class="py-2 px-4 border-b">Location</th>
                    <th class="py-2 px-4 border-b">Delivery Time</th>
                    <th class="py-2 px-4 border-b">Charge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-2 px-4 border-b">Dhaka Metro</td>
                    <td class="py-2 px-4 border-b">1–2 Days</td>
                    <td class="py-2 px-4 border-b">৳60</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b">Outside Dhaka</td>
                    <td class="py-2 px-4 border-b">2–5 Days</td>
                    <td class="py-2 px-4 border-b">৳100</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 border-b">Remote Areas</td>
                    <td class="py-2 px-4 border-b">5–7 Days</td>
                    <td class="py-2 px-4 border-b">৳150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Section 5 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              5. Order Tracking
            </h2>
            <p>
              Once your order is shipped, you can easily track its progress
              using the tracking number provided in your confirmation message.
              You can also check the status anytime by visiting your
              <a href="/orders/tracking" class="text-primary hover:underline"
                >Order History</a
              >
              page.
            </p>
          </section>

          <!-- Section 6 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              6. Delayed or Missing Deliveries
            </h2>
            <p>
              In rare cases, delays may occur due to weather, traffic, or
              courier issues. If your order is delayed beyond the estimated
              delivery time, please contact our customer support team at
              <a
                href="mailto:support@buyzin.com"
                class="text-primary hover:underline"
              >
                support@buyzin.com </a
              >.
            </p>
          </section>

          <!-- Section 7 -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              7. International Shipping
            </h2>
            <p>
              Currently, we only deliver within Bangladesh. However,
              international shipping options will be available soon.
            </p>
          </section>
        </div>
      </template>
    </div>
  </div>
</template>
