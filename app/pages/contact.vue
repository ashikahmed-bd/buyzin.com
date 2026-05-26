<script setup>
const { $settings } = useNuxtApp();
const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const success = ref(false);

const handleSubmit = () => {
  success.value = true;
  setTimeout(() => (success.value = false), 4000);
  form.value = { name: "", email: "", subject: "", message: "" };
};
</script>

<template>
  <SeoMeta
    title="Contact Us | Buyzin - Get Support for Your Online Shopping in Bangladesh"
    description="Reach out to Buyzin’s customer support for any questions about orders, products, payments, or deliveries. We’re here to help you shop confidently in Bangladesh."
    keywords="Buyzin Contact Us, customer support Bangladesh, online shopping help, ecommerce support Bangladesh, order inquiries, Buyzin support"
  />

  <main class="max-w-7xl mx-auto px-4 py-6">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-3 text-gray-800">Contact Us</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Have questions or need support? Our team is here to help you with any
        inquiries about your order, products, or services.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div class="bg-white rounded-2xl p-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">
          Send a Message
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="relative block mb-2">
            <label class="block mb-2 text-sm text-dark capitalize font-medium"
              >Your Name</label
            >
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 text-sm rounded border border-border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
            />
          </div>

          <div class="relative block mb-2">
            <label class="block mb-2 text-sm text-dark capitalize font-medium"
              >Email Address</label
            >
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 text-sm rounded border border-border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
            />
          </div>

          <div class="relative block mb-2">
            <label class="block mb-2 text-sm text-dark capitalize font-medium"
              >Subject</label
            >
            <input
              v-model="form.subject"
              type="text"
              required
              class="w-full px-4 py-2 text-sm rounded border border-border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
            />
          </div>

          <div class="relative block mb-2">
            <label class="block mb-2 text-sm text-dark capitalize font-medium"
              >Message</label
            >
            <textarea
              v-model="form.message"
              rows="5"
              required
              class="w-full px-4 py-2 text-sm rounded border border-border focus:border-primary focus:outline-none focus:outline-primary disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
            ></textarea>
          </div>

          <BaseButton> Send Message</BaseButton>

          <p
            v-if="success"
            class="text-green-600 mt-4 text-center font-medium transition-opacity"
          >
            Message sent successfully! We’ll get back to you soon.
          </p>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            Get in Touch
          </h2>
          <p class="text-gray-600">
            We’d love to hear from you! Reach out through any of the channels
            below or visit our office during working hours.
          </p>
        </div>

        <div class="space-y-4 text-body">
          <div class="flex items-center gap-3">
            <span
              class="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full"
            >
              <IconsIconEmail class="size-5" />
            </span>
            <div>
              <p class="font-semibold">Email</p>
              <p>{{ $settings?.contact?.email }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full"
            >
              <IconsIconSupport class="size-5" />
            </span>
            <div>
              <p class="font-semibold">Phone</p>
              <p>{{ $settings?.contact?.phone }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center rounded-full"
            >
              <IconsIconLocation class="size-5" />
            </span>
            <div>
              <p class="font-semibold">Address</p>
              <p v-html="$settings?.contact?.address"></p>
            </div>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.844207395304!2d90.3671!3d23.7891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76f9f90bb7d%3A0xb7d3ef2b9f03c6df!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1709838299230!5m2!1sen!2sbd"
          width="100%"
          height="250"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          class="rounded-2xl shadow-md"
        ></iframe>
      </div>
    </div>
  </main>
</template>
