<script setup>
const route = useRoute()
const config = useRuntimeConfig()

useSchemaOrg([
  defineWebPage({
    name: 'Privacy Policy | Buyzin Bangladesh',
    description:
      'Read Buyzin Bangladesh Privacy Policy to understand how we collect, use, store, protect, and process your personal information, orders, payments, and account data when using our website and services.',
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
        name: 'Privacy Policy',
        item: new URL(route.fullPath, config.public.siteUrl).toString(),
      },
    ],
  }),
])
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">

    <Head>
      <Title>Privacy Policy | Buyzin Bangladesh</Title>
      <Meta name="description"
        content="Learn how Buyzin collects, uses, protects, and manages your personal information when you use our website and services." />
      <Meta name="keywords"
        content="Buyzin privacy policy, data protection, customer privacy, personal information, ecommerce privacy Bangladesh" />
    </Head>

    <div class="bg-white">
      <section class="border-b border-gray-100">
        <div class="container mx-auto px-4 py-8">
          <div class="max-w-4xl mx-auto text-center">
            <UBadge color="primary" variant="soft" size="lg">
              Legal Information
            </UBadge>

            <h1 class="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Privacy Policy
            </h1>

            <p class="mt-6 text-lg text-gray-600">
              Your privacy matters to us. This policy explains how
              Buyzin collects, uses, stores, and protects your
              personal information.
            </p>

            <p class="mt-4 text-sm text-gray-500">
              Last Updated: June 12, 2026
            </p>
          </div>
        </div>
      </section>

      <section class="container mx-auto px-4 py-8 lg:py-12">
        <div class="max-w-5xl mx-auto space-y-6">
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                1. Introduction
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              At Buyzin, we value your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, store, share, and safeguard information
              when you visit our website, create an account, place orders, make payments, or interact with
              our services. By using Buyzin, you agree to the practices described in this policy.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                2. Information We Collect
              </h2>
            </template>

            <p class="text-gray-600 mb-4">
              To provide a seamless shopping experience, we may collect the following information:
            </p>

            <ul class="space-y-3 text-gray-600">
              <li>• Full name and account information</li>
              <li>• Email address and mobile phone number</li>
              <li>• Shipping and billing addresses</li>
              <li>• Order history and purchase records</li>
              <li>• Payment-related transaction information</li>
              <li>• Device, browser, IP address, and usage analytics</li>
              <li>• Customer support communications and feedback</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                3. How We Use Your Information
              </h2>
            </template>

            <ul class="space-y-3 text-gray-600">
              <li>• Process and deliver your orders</li>
              <li>• Manage customer accounts and authentication</li>
              <li>• Provide customer support and resolve issues</li>
              <li>• Improve website performance and user experience</li>
              <li>• Prevent fraud, abuse, and unauthorized activities</li>
              <li>• Send order updates, service notices, and account notifications</li>
              <li>• Provide personalized offers, discounts, and recommendations</li>
              <li>• Comply with legal and regulatory obligations</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                4. Cookies & Tracking Technologies
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin uses cookies, pixels, and similar technologies to remember your preferences,
              improve website functionality, analyze traffic patterns, enhance security, and deliver
              personalized shopping experiences. You may disable cookies through your browser settings,
              although some features may not function properly.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                5. Information Sharing & Disclosure
              </h2>
            </template>

            <p class="text-gray-600 mb-4">
              We do not sell or rent your personal information.
            </p>

            <p class="text-gray-600">
              Information may be shared with trusted third-party service providers including payment
              gateways, delivery partners, cloud infrastructure providers, analytics services, and
              regulatory authorities when required by law or necessary to provide our services.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                6. Data Security
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              We implement reasonable technical, administrative, and organizational safeguards to
              protect your personal information against unauthorized access, misuse, loss, disclosure,
              alteration, or destruction. While we strive to protect your data, no internet transmission
              or electronic storage system can be guaranteed to be 100% secure.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                7. Data Retention
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              We retain personal information only for as long as necessary to fulfill business,
              operational, legal, tax, accounting, and regulatory requirements. When data is no longer
              required, it is securely deleted or anonymized.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                8. Your Privacy Rights
              </h2>
            </template>

            <ul class="space-y-3 text-gray-600">
              <li>• Access your personal information</li>
              <li>• Update inaccurate account details</li>
              <li>• Request account deletion where applicable</li>
              <li>• Opt out of marketing communications</li>
              <li>• Request information regarding stored personal data</li>
              <li>• Raise privacy-related concerns with our support team</li>
            </ul>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                9. Third-Party Services
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Our website may contain links to third-party websites, services, or applications.
              Buyzin is not responsible for the privacy practices, policies, or content of external
              websites. We encourage users to review the privacy policies of those services before use.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                10. Policy Updates
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              We may update this Privacy Policy from time to time to reflect changes in our business,
              technology, legal requirements, or services. Updates will be published on this page along
              with the revised effective date.
            </p>
          </UCard>
        </div>
      </section>

      <section class="bg-gray-50">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-3xl mx-auto">
            <UCard>
              <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-900">
                  Questions About Privacy?
                </h2>

                <p class="mt-3 text-gray-600">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your
                  personal information, please contact the Buyzin Customer Support Team.
                </p>

                <div class="mt-8">
                  <UButton to="/contact" size="xl">
                    Contact Support
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
