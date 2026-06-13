<script setup>
const route = useRoute()
const config = useRuntimeConfig()

useSchemaOrg([
  defineWebPage({
    name: 'Terms & Conditions | Buyzin Bangladesh',
    description:
      'Read Buyzin Terms & Conditions governing purchases, accounts, payments, deliveries, returns, and website usage.',
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
        name: 'Terms & Conditions',
        item: new URL(route.fullPath, config.public.siteUrl).toString(),
      },
    ],
  }),
]);
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 py-8">

    <Head>
      <Title>Terms & Conditions | Buyzin Bangladesh</Title>

      <Meta name="description"
        content="Read Buyzin Bangladesh Terms & Conditions governing account usage, purchases, payments, shipping, returns, warranties, and customer responsibilities." />

      <Meta name="keywords"
        content="Buyzin terms and conditions, ecommerce terms, online shopping terms Bangladesh, customer agreement, Buyzin policy" />
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
                1. Acceptance of Terms
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Welcome to Buyzin. These Terms & Conditions govern your access to and use of
              our website, mobile applications, products, and services. By accessing,
              browsing, creating an account, or placing an order through Buyzin, you agree
              to comply with and be bound by these Terms & Conditions.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                2. Eligibility
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              You must be legally capable of entering into binding agreements under
              applicable laws. By using Buyzin, you represent that all information
              provided is accurate, complete, and current.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                3. User Accounts
              </h2>
            </template>

            <ul class="space-y-3 text-gray-600">
              <li>• You are responsible for maintaining account confidentiality.</li>
              <li>• You must provide accurate account information.</li>
              <li>• You are responsible for activities occurring under your account.</li>
              <li>• Buyzin reserves the right to suspend or terminate accounts for violations.</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                4. Orders & Purchases
              </h2>
            </template>

            <p class="text-gray-600 mb-4">
              All orders are subject to product availability and order verification.
            </p>

            <ul class="space-y-3 text-gray-600">
              <li>• Order confirmation does not guarantee acceptance.</li>
              <li>• Buyzin may cancel orders due to stock shortages or pricing errors.</li>
              <li>• Additional verification may be required before processing certain orders.</li>
              <li>• Customers are responsible for providing accurate delivery information.</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                5. Pricing & Payments
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Product prices, promotions, and availability may change without notice.
              Buyzin reserves the right to correct pricing inaccuracies, typographical
              errors, or system-generated errors at any time.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                6. Shipping & Delivery
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Delivery timelines provided by Buyzin are estimates only. Actual delivery
              times may vary due to courier operations, weather conditions, public holidays,
              remote locations, or circumstances beyond our control.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                7. Returns, Refunds & Exchanges
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Returns, refunds, and exchanges are governed by Buyzin's Return Policy and
              Refund Policy. Eligibility requirements, timelines, and conditions apply.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                8. Product Warranty
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Warranty coverage depends on the manufacturer, supplier, or distributor.
              Warranty information displayed on product pages should be reviewed before
              purchase.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                9. Acceptable Use
              </h2>
            </template>

            <ul class="space-y-3 text-gray-600">
              <li>• Do not misuse or interfere with website functionality.</li>
              <li>• Do not attempt unauthorized access to systems or accounts.</li>
              <li>• Do not submit false, misleading, or fraudulent information.</li>
              <li>• Do not engage in unlawful activities using Buyzin services.</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                10. Intellectual Property
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              All content available on Buyzin, including logos, trademarks, product
              descriptions, graphics, images, software, and website design elements,
              are protected by applicable intellectual property laws and may not be
              copied, reproduced, or distributed without authorization.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                11. Third-Party Services
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin may integrate with payment gateways, logistics providers, analytics
              platforms, and other third-party services. We are not responsible for the
              content, practices, or policies of third-party services.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                12. Limitation of Liability
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              To the fullest extent permitted by law, Buyzin shall not be liable for any
              indirect, incidental, consequential, special, or punitive damages arising
              from the use of our website, products, or services.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                13. Indemnification
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              You agree to indemnify and hold harmless Buyzin, its employees, affiliates,
              partners, and service providers from claims, damages, liabilities, costs,
              and expenses arising from your violation of these Terms & Conditions.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                14. Suspension & Termination
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin reserves the right to suspend, restrict, or terminate access to
              accounts, services, or website features without prior notice if violations
              of these Terms & Conditions are detected.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                15. Changes to Terms
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin may modify these Terms & Conditions at any time. Updated versions
              will be published on this page with the revised effective date.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                16. Governing Law
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              These Terms & Conditions shall be governed and interpreted in accordance
              with the applicable laws of Bangladesh, without regard to conflict of law principles.
            </p>
          </UCard>

          <UCard class="border-primary">
            <template #header>
              <h2 class="text-xl font-semibold">
                17. Contact Information
              </h2>
            </template>

            <p class="text-gray-600">
              If you have any questions regarding these Terms & Conditions, please
              contact the Buyzin Customer Support Team.
            </p>

            <div class="mt-6">
              <UButton to="/contact-us" size="lg">
                Contact Support
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </section>
  </main>
</template>
