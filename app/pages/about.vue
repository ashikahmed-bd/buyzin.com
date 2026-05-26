<script setup>
import { main } from "#build/ui";

useHead({
  title: "About Us | Buyzin",
  meta: [
    {
      name: "description",
      content:
        "Learn more about Buyzin — Bangladesh’s most trusted online shopping platform. Discover our mission, vision, and why thousands of customers choose Buyzin every day.",
    },
  ],
});
</script>

<template>
  <SeoMeta
    title="About Us | Buyzin - Trusted Online Shopping in Bangladesh"
    description="Learn about Buyzin, Bangladesh’s trusted online shopping platform. Discover our mission, vision, values, and why thousands of customers choose Buyzin for genuine products, fast delivery, and secure shopping."
    keywords="Buyzin About Us, online shopping Bangladesh, ecommerce platform Bangladesh, trusted online store, genuine products, fast delivery, Buyzin mission vision"
  />

  <main class="max-w-7xl mx-auto px-4 py-4">
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-blue-50 to-blue-100 py-16 text-center"
    >
      <div class="max-w-4xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About <span class="text-primary">Buyzin</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Your trusted destination for 100% genuine products in Bangladesh. Shop
          smart. Live easy.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="max-w-6xl mx-auto py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h2 class="text-3xl font-semibold mb-4 text-gray-900">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed">
          At <strong>Buyzin</strong>, our mission is simple — to make online
          shopping in Bangladesh faster, safer, and more reliable. We’re
          committed to offering 100% genuine products at competitive prices,
          with quick delivery and hassle-free returns.
        </p>
        <ul class="list-disc pl-6 mt-4 text-gray-600 space-y-2">
          <li>Provide authentic and verified products.</li>
          <li>Deliver exceptional customer experiences.</li>
          <li>Support local and global brands in reaching customers easily.</li>
        </ul>
      </div>

      <div>
        <h2 class="text-3xl font-semibold mb-4 text-gray-900">Our Vision</h2>
        <p class="text-gray-600 leading-relaxed">
          We envision a digital Bangladesh where every individual has access to
          trustworthy, affordable, and convenient online shopping — anytime,
          anywhere.
        </p>
        <div class="mt-4 bg-blue-50 border-l-4 border-primary p-4 rounded-xl">
          <p class="text-gray-700 italic">
            “Our goal is to build a platform where customers shop confidently
            and sellers grow their business transparently.”
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold mb-10 text-gray-900">
          Why Choose Buyzin?
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-2xl border border-border transition">
            <div
              class="w-12 h-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold"
            >
              🛒
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">
              100% Genuine Products
            </h3>
            <p class="text-gray-600 text-sm">
              Every item on Buyzin is verified for authenticity. No fakes, no
              compromises.
            </p>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-border transition">
            <div
              class="w-12 h-12 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold"
            >
              🚚
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">
              Fast & Reliable Delivery
            </h3>
            <p class="text-gray-600 text-sm">
              With trusted courier partners, we ensure timely delivery across
              Bangladesh.
            </p>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-border transition">
            <div
              class="w-12 h-12 mx-auto mb-4 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold"
            >
              💬
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900">
              24/7 Customer Support
            </h3>
            <p class="text-gray-600 text-sm">
              Need help? Our support team is always ready to assist you by phone
              or email.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats / Achievements -->
    <section class="max-w-6xl mx-auto py-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-semibold text-gray-900 mb-2">
          Our Achievements
        </h2>
        <p class="text-gray-600">
          We’re growing faster every day — thanks to our customers' trust.
        </p>
      </div>
      <div class="grid md:grid-cols-4 gap-6 text-center">
        <div class="bg-white shadow-sm rounded-xl p-6 border">
          <h3 class="text-4xl font-bold text-blue-600">50K+</h3>
          <p class="text-gray-600 mt-1">Happy Customers</p>
        </div>
        <div class="bg-white shadow-sm rounded-xl p-6 border">
          <h3 class="text-4xl font-bold text-green-600">10K+</h3>
          <p class="text-gray-600 mt-1">Products Delivered</p>
        </div>
        <div class="bg-white shadow-sm rounded-xl p-6 border">
          <h3 class="text-4xl font-bold text-yellow-600">500+</h3>
          <p class="text-gray-600 mt-1">Brands Onboard</p>
        </div>
        <div class="bg-white shadow-sm rounded-xl p-6 border">
          <h3 class="text-4xl font-bold text-pink-600">24/7</h3>
          <p class="text-gray-600 mt-1">Customer Support</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 text-center rounded-2xl p-4 text-white"
    >
      <h2 class="text-3xl font-semibold mb-3">
        Ready to Shop Smart & Live Easy?
      </h2>
      <p class="mb-6 text-blue-100">
        Discover thousands of genuine products from trusted brands — only on
        Buyzin.
      </p>
      <NuxtLink
        to="/shop"
        class="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition"
      >
        Start Shopping →
      </NuxtLink>
    </section>
  </main>
</template>
