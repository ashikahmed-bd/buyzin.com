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

const cookies = ref([
  {
    name: "Essential Cookies",
    description: "Required for basic site functionality. Cannot be disabled.",
    enabled: true,
    required: true,
  },
  {
    name: "Performance Cookies",
    description: "Help us analyze site traffic and improve performance.",
    enabled: false,
    required: false,
  },
  {
    name: "Functional Cookies",
    description: "Remember user preferences such as language or location.",
    enabled: false,
    required: false,
  },
  {
    name: "Marketing Cookies",
    description: "Used for personalized ads and marketing optimization.",
    enabled: false,
    required: false,
  },
]);

const savePreferences = () => {
  alert("Your cookie preferences have been saved!");
};

const acceptAll = () => {
  cookies.value.forEach((c) => {
    if (!c.required) c.enabled = true;
  });
  alert("All cookies accepted!");
};

useHead({
  title: "Cookie Settings | Buyzin",
  meta: [
    {
      name: "description",
      content:
        "Manage your cookie preferences on Buyzin. Control essential, performance, functional, and marketing cookies to personalize your online shopping experience.",
    },
  ],
});
</script>

<template>
  <Head>
    <Title>{{ page?.meta_title ?? "" }}</Title>
    <Meta name="description" :content="page?.meta_description" />
    <Meta name="keywords" :content="page?.meta_keywords" />
  </Head>

  <main class="max-w-4xl mx-auto px-6 py-12">
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

        <!-- Introduction -->
        <div class="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              our website. They help us improve functionality, analyze traffic,
              and provide a personalized experience.
            </p>
          </section>

          <!-- Types of Cookies -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              2. Types of Cookies We Use
            </h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Necessary for website
                functionality — such as login, cart, and checkout processes.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect data to help us
                understand how visitors use the site and improve user
                experience.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                like language, location, or login details.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant ads
                and measure the effectiveness of our marketing campaigns.
              </li>
            </ul>
          </section>

          <!-- Cookie Control -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              3. How to Manage Cookie Preferences
            </h2>
            <p>
              You can choose which cookies to accept or decline below. You can
              also modify your preferences at any time in your browser settings.
            </p>

            <div class="mt-6 space-y-4">
              <div
                v-for="(cookie, index) in cookies"
                :key="index"
                class="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <h3 class="font-semibold text-gray-900">{{ cookie.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ cookie.description }}</p>
                </div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    v-model="cookie.enabled"
                    :disabled="cookie.required"
                  />
                  <div
                    class="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-primary transition"
                  >
                    <div
                      class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"
                    ></div>
                  </div>
                </label>
              </div>
            </div>

            <div class="mt-8 flex gap-4">
              <button
                @click="savePreferences"
                class="bg-primary hover:bg-primary text-white px-6 py-2 rounded-lg font-medium"
              >
                Save Preferences
              </button>
              <button
                @click="acceptAll"
                class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium"
              >
                Accept All
              </button>
            </div>
          </section>

          <!-- More Info -->
          <section>
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
              4. Learn More
            </h2>
            <p>
              For more information about how we use cookies and protect your
              data, please read our
              <a href="/privacy-policy" class="text-primary hover:underline"
                >Privacy Policy</a
              >.
            </p>
          </section>
        </div>
      </template>
    </div>
  </main>
</template>
