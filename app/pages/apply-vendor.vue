<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  phone: "",
  store_name: "",
  message: "",
});
</script>

<template>
  <SeoMeta
    title="Become a Vendor | Buyzin - Sell Your Products Online in Bangladesh"
    description="Join Buyzin as a vendor and start selling your products online in Bangladesh. Reach thousands of customers, grow your business, and enjoy seamless online selling with Buyzin."
    keywords="Buyzin vendor, sell online Bangladesh, online marketplace Bangladesh, ecommerce seller platform, start selling online, Buyzin marketplace"
  />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <!-- Breadcrumb Section -->
    <section class="bg-[url('/bg-vendor.jpg')] py-16 md:py-32">
      <div class="mx-auto px-4">
        <div class="flex flex-col lg:flex-row lg:items-center">
          <div class="lg:w-7/12">
            <div class="space-y-4">
              <h2 class="text-3xl font-bold text-white">
                Become a Buyzin Limited seller
              </h2>
              <p class="text-white">
                More than half the units sold in our stores are from independent
                sellers.
              </p>
              <a
                href="#"
                class="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
                >Sign up</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Become Seller Section -->
    <section class="py-16">
      <div class="mx-auto px-4 space-y-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 lg:col-start-2 space-y-4">
            <h2 class="text-3xl font-bold">
              Why become a seller on <br class="hidden md:inline" />
              Zenmart?
            </h2>
            <p class="text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img
                  src="/icons/parcel-box.svg"
                  alt="parcel-box"
                  class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Free Shipping</h3>
                <p class="text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img
                  src="/icons/payment-card.svg"
                  alt="payment-card"
                  class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Flexible Payment</h3>
                <p class="text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img
                  src="/icons/online-support.svg"
                  alt="online-support"
                  class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Online Support</h3>
                <p class="text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Fun Facts -->
        <div
          class="bg-secondary rounded-xl py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div class="text-2xl md:text-4xl font-bold text-primary">120+</div>
            <div class="text-white mt-2">Stores around the world</div>
          </div>
          <div>
            <div class="text-2xl md:text-4xl font-bold text-primary">15M</div>
            <div class="text-white mt-2">Products sold till date</div>
          </div>
          <div>
            <div class="text-2xl md:text-4xl font-bold text-primary">200K</div>
            <div class="text-white mt-2">Registered users</div>
          </div>
          <div>
            <div class="text-2xl md:text-4xl font-bold text-primary">300+</div>
            <div class="text-white mt-2">Brands available in store</div>
          </div>
        </div>

        <!-- Steps Section -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 lg:col-start-2 space-y-4">
            <h2 class="text-3xl font-bold">
              Over $50K in potential <br class="hidden md:inline" />
              benefits
            </h2>
            <p class="text-gray-600">
              Ready to sell? Launch your brand today with a powerful playbook
              for new sellers and over $50K in potential benefits.
            </p>
          </div>
          <div class="lg:col-span-5 space-y-6">
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img src="/icons/step-1.svg" alt="step-1" class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Step 1</h3>
                <p>Create an account on our website. It is fast and free.</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img src="/icons/step-2.svg" alt="step-2" class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Step 2</h3>
                <p>Upload your products.</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <span class="shrink-0"
                ><img src="/icons/step-3.svg" alt="step-3" class="w-12 h-12"
              /></span>
              <div>
                <h3 class="font-semibold text-lg">Step 3</h3>
                <p>We’ll verify your account and then you can start selling!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div class="max-w-3xl mx-auto space-y-4">
          <div class="border rounded shadow-sm">
            <button
              class="w-full text-left px-4 py-3 font-medium hover:bg-gray-100 flex justify-between items-center"
            >
              <span>01. What is the monthly cost of your app?</span>
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div class="px-4 py-3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </div>
          <div class="border rounded shadow-sm">
            <button
              class="w-full text-left px-4 py-3 font-medium hover:bg-gray-100 flex justify-between items-center"
            >
              <span>02. Do you have any local branches?</span>
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div class="px-4 py-3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
          </div>
          <!-- Add more FAQ items similarly -->
        </div>
      </div>
    </section>

    <!-- Banner Section -->
    <section class="bg-cyan-100 py-16">
      <div class="mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5 lg:col-start-2 space-y-4">
            <h2 class="text-3xl font-bold">Start selling today</h2>
            <p class="text-gray-600">
              Put your products in front of the millions of customers who search
              buyzin.com every day.
            </p>
            <a
              href="#"
              class="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
              >Sign up</a
            >
          </div>
          <div class="lg:col-span-5">
            <img src="/about/1.png" alt="" class="w-full" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
