<script setup>
const route = useRoute()
const config = useRuntimeConfig()

useSchemaOrg([
  defineWebPage({
    name: 'Shipping & Delivery Policy | Buyzin Bangladesh',
    description:
      'Learn about Buyzin shipping methods, delivery coverage, estimated delivery times, shipping charges, and order tracking.',
    url: new URL(route.fullPath, config.public.siteUrl).toString(),
    inLanguage: 'en-BD',
  }),

  defineBreadcrumb({
    items: [
      {
        position: 1,
        name: 'Home',
        item: new URL('/', config.public.siteUrl).toString(),
      },
      {
        position: 2,
        name: 'Shipping & Delivery',
        item: new URL(route.fullPath, config.public.siteUrl).toString(),
      },
    ],
  }),

]);
</script>

<template>

  <main class="max-w-4xl mx-auto px-6 py-6">

    <Head>
      <Title>Shipping & Delivery Policy | Buyzin Bangladesh</Title>

      <Meta name="description"
        content="Learn about Buyzin shipping methods, delivery coverage, estimated delivery times, shipping charges, order tracking, and courier policies." />

      <Meta name="keywords"
        content="Buyzin shipping policy, delivery policy Bangladesh, order tracking, courier delivery, shipping charges, ecommerce delivery" />
    </Head>

    <section class="container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <div class="mb-6">
          <UBadge color="primary" variant="soft">
            Last Updated: June 12, 2026
          </UBadge>
        </div>

        <div class="space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                1. Shipping & Delivery Overview
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin is committed to delivering your orders safely, efficiently,
              and on time. This Shipping & Delivery Policy explains our order
              processing timelines, shipping methods, delivery coverage, estimated
              delivery times, and other important information regarding the shipment
              of products purchased through our platform.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                2. Delivery Coverage
              </h2>
            </template>

            <p class="text-gray-600 mb-4">
              We currently provide delivery services throughout Bangladesh.
            </p>

            <ul class="space-y-3 text-gray-600">
              <li>• Nationwide delivery coverage.</li>
              <li>• Home delivery available in most locations.</li>
              <li>• Delivery availability may vary for remote areas.</li>
              <li>• Certain products may have delivery restrictions based on location.</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                3. Order Processing Time
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Orders are typically processed within 24–48 business hours after
              successful order confirmation. Orders placed during weekends,
              public holidays, or promotional events may require additional processing time.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                4. Estimated Delivery Time
              </h2>
            </template>

            <div class="overflow-x-auto">
              <table class="w-full border border-gray-200 rounded-lg">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="text-left p-4 border-b">Location</th>
                    <th class="text-left p-4 border-b">Estimated Delivery Time</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td class="p-4 border-b">Dhaka City</td>
                    <td class="p-4 border-b">1–3 Business Days</td>
                  </tr>

                  <tr>
                    <td class="p-4 border-b">Major Cities</td>
                    <td class="p-4 border-b">2–5 Business Days</td>
                  </tr>

                  <tr>
                    <td class="p-4">Remote Areas</td>
                    <td class="p-4">3–7 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p class="text-sm text-gray-500 mt-4">
              Delivery timelines are estimates and may vary depending on courier operations and location.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                5. Shipping Charges
              </h2>
            </template>

            <p class="text-gray-600 mb-4">
              Shipping fees may vary depending on:
            </p>

            <ul class="space-y-3 text-gray-600">
              <li>• Delivery location.</li>
              <li>• Product dimensions and weight.</li>
              <li>• Courier service availability.</li>
              <li>• Ongoing promotions and free shipping campaigns.</li>
            </ul>

            <p class="text-gray-600 mt-4">
              Applicable shipping charges will be displayed during checkout before payment confirmation.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                6. Order Tracking
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Once your order has been shipped, tracking information may become
              available through your account dashboard or shipment notification.
              Tracking updates depend on courier partner systems and may not update instantly.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                7. Failed Delivery Attempts
              </h2>
            </template>

            <ul class="space-y-3 text-gray-600">
              <li>• Incorrect or incomplete address information.</li>
              <li>• Recipient unavailable during delivery.</li>
              <li>• Phone number unreachable.</li>
              <li>• Delivery location inaccessible.</li>
            </ul>

            <p class="text-gray-600 mt-4">
              Additional delivery charges may apply if re-delivery is required.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                8. Delivery Delays
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Delivery may occasionally be delayed due to weather conditions,
              public holidays, natural disasters, transportation disruptions,
              government restrictions, or other circumstances beyond our control.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                9. Delivery Inspection
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Customers are encouraged to inspect delivered products upon receipt.
              Any visible damage, missing items, or delivery issues should be reported
              promptly to our customer support team.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                10. International Shipping
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Currently, Buyzin primarily serves customers within Bangladesh.
              International shipping availability may vary based on product category,
              supplier, and destination country.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                11. Policy Updates
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin reserves the right to modify this Shipping & Delivery Policy
              at any time. Updated versions will be published on this page along
              with the revised effective date.
            </p>
          </UCard>

          <UCard class="border-primary">
            <template #header>
              <h2 class="text-xl font-semibold">
                Need Delivery Assistance?
              </h2>
            </template>

            <p class="text-gray-600">
              If you have questions regarding shipping, delivery timelines,
              order tracking, or courier services, please contact our customer support team.
            </p>

            <div class="mt-6">
              <UButton to="/contact" size="lg">
                Contact Support
              </UButton>
            </div>
          </UCard>

        </div>
      </div>
    </section>

  </main>
</template>
