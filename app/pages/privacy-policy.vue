<script setup>
import { main } from "#build/ui";

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

  <main class="max-w-5xl mx-auto px-4 py-8">
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
        <div class="space-y-10 prose max-w-none">
          <!-- 1. Introduction -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              1. Introduction
            </h2>
            <p>
              Welcome to Buyzin ("we", "our", "us"). By accessing or using our
              website, you agree to this Privacy Policy. We are committed to
              safeguarding your privacy and ensuring transparency in how we
              handle your data.
            </p>
          </section>

          <!-- 2. Information We Collect -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              2. Information We Collect
            </h2>
            <p>
              We collect different types of information to provide and improve
              our services:
            </p>
            <ul class="list-disc ml-6">
              <li>
                <strong>Personal Information:</strong> Name, phone number, email
                address, shipping and billing address.
              </li>
              <li>
                <strong>Account Information:</strong> Login details, password
                (encrypted).
              </li>
              <li>
                <strong>Transaction Details:</strong> Orders, payments, and
                purchase history.
              </li>
              <li>
                <strong>Device & Usage Data:</strong> IP address, browser type,
                and usage analytics.
              </li>
            </ul>
          </section>

          <!-- 3. How We Use Your Information -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul class="list-disc ml-6">
              <li>Process and deliver your orders.</li>
              <li>Provide customer support and respond to inquiries.</li>
              <li>Improve our website, products, and services.</li>
              <li>
                Send updates, offers, or promotional information (only with your
                consent).
              </li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <!-- 4. Cookies and Tracking -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies to personalize your shopping experience, analyze
              website traffic, and improve site performance. You can manage or
              disable cookies in your browser settings.
            </p>
          </section>

          <!-- 5. Data Protection -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              5. How We Protect Your Data
            </h2>
            <p>
              We implement strong technical and organizational measures to
              protect your data against unauthorized access, alteration,
              disclosure, or destruction. Sensitive information (like passwords
              and payment data) is encrypted and securely transmitted.
            </p>
          </section>

          <!-- 6. Third-Party Services -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              6. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party service providers (like payment
              gateways and delivery partners) to perform functions on our
              behalf. These parties are obligated to protect your data and use
              it only as necessary.
            </p>
          </section>

          <!-- 7. Your Rights -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul class="list-disc ml-6">
              <li>Access and review your personal data.</li>
              <li>Request corrections to inaccurate information.</li>
              <li>Request deletion of your account and data.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
          </section>

          <!-- 8. Policy Updates -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              improvements or legal requirements. Updates will be posted on this
              page with the revised date.
            </p>
          </section>

          <!-- 9. Contact -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <div class="mt-4">
              <p><strong>Email:</strong> support@buyzin.com</p>
              <p><strong>Phone:</strong> +880-1516-598533</p>
              <p><strong>Address:</strong> Buyzin Limited, Dhaka, Bangladesh</p>
            </div>
          </section>

          <!-- Last updated -->
          <div class="text-sm text-gray-400 mt-12 text-center">
            Last updated: November 2025
          </div>
        </div>
      </template>
    </div>
  </main>
</template>
