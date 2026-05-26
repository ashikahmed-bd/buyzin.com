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
          <!-- 1. Overview -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">1. Overview</h2>
            <p>
              At Buyzin, we strive to provide the best shopping experience. If
              you are not completely satisfied with your purchase, you may
              request a return, exchange, or refund according to the terms
              outlined below.
            </p>
          </section>

          <!-- 2. Eligibility for Returns -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              2. Eligibility for Returns
            </h2>
            <ul class="list-disc ml-6">
              <li>
                Items must be returned within <strong>7 days</strong> of
                delivery.
              </li>
              <li>
                Products must be unused, undamaged, and in their original
                packaging.
              </li>
              <li>
                Proof of purchase (invoice or order ID) is required for all
                returns.
              </li>
              <li>
                Some items such as perishable goods, software, or intimate
                apparel are not eligible for return.
              </li>
            </ul>
          </section>

          <!-- 3. Return Process -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              3. Return Process
            </h2>
            <p>To initiate a return, please follow these simple steps:</p>
            <ol class="list-decimal ml-6">
              <li>
                Contact our support team at
                <strong>support@buyzin.com</strong> within 7 days of delivery.
              </li>
              <li>Provide your order number and reason for return.</li>
              <li>
                Our team will review your request and guide you through the
                return procedure.
              </li>
              <li>Ship the item back to our designated return address.</li>
            </ol>
            <p class="mt-3">
              Once the item is received and inspected, we will notify you of the
              approval or rejection of your refund.
            </p>
          </section>

          <!-- 4. Refunds -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">4. Refunds</h2>
            <p>
              Approved refunds will be processed within
              <strong>7–10 business days</strong> after we receive your returned
              item.
            </p>
            <ul class="list-disc ml-6">
              <li>Refunds will be issued to your original payment method.</li>
              <li>
                Shipping charges are non-refundable unless the return is due to
                our error.
              </li>
              <li>
                If you paid via Cash on Delivery (COD), we will contact you for
                bank or mobile wallet details.
              </li>
            </ul>
          </section>

          <!-- 5. Exchanges -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">5. Exchanges</h2>
            <p>
              We replace items only if they are defective, damaged, or the wrong
              item was received. To request an exchange, email us at
              <strong>support@buyzin.com</strong> with your order details and a
              photo of the product.
            </p>
          </section>

          <!-- 6. Non-Returnable Items -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              6. Non-Returnable Items
            </h2>
            <p>Certain types of goods are exempt from being returned:</p>
            <ul class="list-disc ml-6">
              <li>Gift cards and vouchers</li>
              <li>Downloadable software products</li>
              <li>
                Health and personal care items (e.g., cosmetics, innerwear)
              </li>
              <li>Clearance or sale items</li>
            </ul>
          </section>

          <!-- 7. Return Shipping -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">
              7. Return Shipping
            </h2>
            <p>
              Customers are responsible for shipping costs when returning items,
              except when the product is defective or incorrect. We recommend
              using a trackable shipping service to ensure safe delivery.
            </p>
          </section>

          <!-- 8. Contact Information -->
          <section>
            <h2 class="text-2xl font-semibold text-gray-800">8. Contact Us</h2>
            <p>
              For questions related to refunds and returns, please contact our
              support team:
            </p>
            <div class="mt-4">
              <p><strong>Email:</strong> support@buyzin.com</p>
              <p><strong>Phone:</strong> +880-1516-598533</p>
              <p><strong>Address:</strong> Buyzin Limited, Dhaka, Bangladesh</p>
            </div>
          </section>

          <!-- Last Updated -->
          <div class="text-sm text-gray-400 mt-12 text-center">
            Last updated: November 2025
          </div>
        </div>
      </template>
    </div>
  </main>
</template>
