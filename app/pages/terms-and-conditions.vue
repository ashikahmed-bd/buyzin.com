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

  <main class="max-w-4xl mx-auto px-4 py-8">
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

        <!-- Content -->
        <div class="space-y-8 text-gray-700 leading-relaxed">
          <!-- Introduction -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Buyzin</strong> (referred to as “we”, “our”, or
              “us”). By accessing or using our website
              <a href="https://buyzin.com" class="text-primary hover:underline"
                >https://buyzin.com</a
              >, you agree to comply with these Terms and Conditions.
            </p>
          </section>

          <!-- Account Responsibility -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              2. Account Responsibilities
            </h2>
            <p>
              When you create an account with us, you are responsible for
              maintaining the confidentiality of your account information and
              password. You agree to accept responsibility for all activities
              that occur under your account.
            </p>
          </section>

          <!-- Product Information -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              3. Product Information & Pricing
            </h2>
            <p>
              We make every effort to ensure that product descriptions and
              prices are accurate. However, errors may occur. In case of such
              errors, we reserve the right to correct them without prior notice.
            </p>
          </section>

          <!-- Orders -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              4. Orders & Payments
            </h2>
            <p>
              All orders are subject to acceptance and availability. We reserve
              the right to cancel or refuse any order for any reason. Payment
              must be completed before products are shipped.
            </p>
          </section>

          <!-- Returns -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              5. Return & Refund Policy
            </h2>
            <p>
              Please review our
              <a href="/return-policy" class="text-primary hover:underline"
                >Return Policy</a
              >
              for information on returns, exchanges, and refunds.
            </p>
          </section>

          <!-- Intellectual Property -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              6. Intellectual Property
            </h2>
            <p>
              All content, including text, images, and graphics on this website,
              is the property of Buyzin and may not be used or reproduced
              without prior written consent.
            </p>
          </section>

          <!-- Limitation of Liability -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              7. Limitation of Liability
            </h2>
            <p>
              Buyzin shall not be liable for any direct, indirect, incidental,
              or consequential damages resulting from the use or inability to
              use our website or products.
            </p>
          </section>

          <!-- Changes -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              8. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions from time to time. Any
              changes will be posted on this page with the updated date.
            </p>
          </section>

          <!-- Contact -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at
              <a
                href="mailto:support@buyzin.com"
                class="text-primary hover:underline"
                >support@buyzin.com</a
              >.
            </p>
          </section>
        </div>
      </template>
    </div>
  </main>
</template>
