<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const cookies = reactive({
  analytics: true,
  marketing: true,
  personalization: true,
})

const acceptAll = () => {
  cookies.analytics = true
  cookies.marketing = true
  cookies.personalization = true
}

const rejectOptional = () => {
  cookies.analytics = false
  cookies.marketing = false
  cookies.personalization = false
}

const savePreferences = () => {
  // API Call
}

</script>

<template>
  <main class="max-w-4xl mx-auto px-6 py-6">

    <Head>
      <Title>Cookie Settings | Buyzin Bangladesh</Title>

      <Meta name="description"
        content="Manage your cookie preferences and learn how Buyzin uses cookies for security, analytics, personalization, and marketing." />

      <Meta name="keywords"
        content="Buyzin cookie settings, cookie policy, privacy preferences, analytics cookies, marketing cookies, ecommerce privacy" />
    </Head>

    <section class="container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <UCard class="mb-6">
          <div class="text-center py-4">
            <UBadge color="primary" variant="soft" class="mb-4">
              Privacy Controls
            </UBadge>

            <h1 class="text-3xl md:text-4xl font-bold">
              Cookie Settings
            </h1>

            <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
              Manage how Buyzin uses cookies and similar technologies to improve
              your shopping experience, personalize content, analyze traffic,
              and enhance website security.
            </p>
          </div>
        </UCard>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <UButton block size="lg" color="primary" @click="acceptAll">
            Accept All Cookies
          </UButton>

          <UButton block size="lg" color="neutral" variant="outline" @click="rejectOptional">
            Reject Optional Cookies
          </UButton>

          <UButton block size="lg" variant="soft" @click="savePreferences">
            Save Preferences
          </UButton>
        </div>

        <div class="space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold">
                    Essential Cookies
                  </h2>

                  <p class="text-sm text-gray-500">
                    Required for website functionality
                  </p>
                </div>

                <USwitch :model-value="true" disabled />
              </div>
            </template>

            <p class="text-gray-600 leading-7">
              Essential cookies enable core website functionality such as account
              login, shopping cart management, checkout processing, fraud prevention,
              security protection, and session management. These cookies cannot be disabled.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold">
                    Analytics Cookies
                  </h2>

                  <p class="text-sm text-gray-500">
                    Help us understand website usage
                  </p>
                </div>

                <USwitch v-model="cookies.analytics" />
              </div>
            </template>

            <p class="text-gray-600 leading-7">
              Analytics cookies help us understand how visitors interact with Buyzin,
              identify popular products, monitor performance, and improve the overall
              customer experience.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold">
                    Marketing Cookies
                  </h2>

                  <p class="text-sm text-gray-500">
                    Personalized advertising and promotions
                  </p>
                </div>

                <USwitch v-model="cookies.marketing" />
              </div>
            </template>

            <p class="text-gray-600 leading-7">
              Marketing cookies help display relevant advertisements, promotions,
              product recommendations, and measure advertising effectiveness across platforms.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold">
                    Personalization Cookies
                  </h2>

                  <p class="text-sm text-gray-500">
                    Customized shopping experience
                  </p>
                </div>

                <USwitch v-model="cookies.personalization" />
              </div>
            </template>

            <p class="text-gray-600 leading-7">
              These cookies remember your preferences such as language,
              recently viewed products, wishlist items, and shopping behavior
              to provide a more personalized experience.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                What Are Cookies?
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Cookies are small text files stored on your device when you visit a website.
              They help websites function efficiently, remember preferences, improve security,
              and provide insights into user behavior.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                Third-Party Cookies
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Buyzin may use trusted third-party services such as analytics providers,
              payment gateways, advertising networks, and customer support platforms
              that may set cookies according to their own privacy policies.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                Cookie Retention
              </h2>
            </template>

            <p class="text-gray-600 leading-7">
              Some cookies expire when your browser session ends, while others remain
              stored for a defined period to remember your preferences across visits.
            </p>
          </UCard>

          <UCard class="border-primary">
            <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <h3 class="font-semibold text-lg">
                  Update Your Preferences
                </h3>

                <p class="text-gray-600 mt-2">
                  Your cookie preferences can be updated at any time from this page.
                </p>
              </div>

              <UButton size="lg" color="primary" @click="savePreferences">
                Save Preferences
              </UButton>
            </div>
          </UCard>

        </div>
      </div>
    </section>
  </main>
</template>
