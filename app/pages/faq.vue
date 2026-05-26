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

const faqs = ref([
  {
    question: "What is Buyzin?",
    answer:
      "Buyzin is Bangladesh’s trusted online shopping platform offering 100% genuine and authentic products with fast delivery and secure payments.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse your favorite products, add them to your cart, and complete checkout using any of our supported payment methods.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept Bkash, Nagad, Rocket, Visa, MasterCard, and Cash on Delivery for your convenience.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Dhaka are usually delivered within 1–3 days, while outside Dhaka may take 3–7 days depending on location.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes! You can return or exchange products within 7 days of delivery if they are unused, unopened, and in their original packaging.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@buyzin.com or call us at +880-1516-598533.",
  },
]);

const searchQuery = ref("");
const activeIndex = ref(null);

const filteredFaqs = computed(() =>
  faqs.value.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

useSchemaOrg([
  defineWebPage({
    "@type": "FAQPage",
  }),
  defineQuestion({
    name: "How long is a piece of string?",
    acceptedAnswer:
      "The length of a piece of string is the number of characters in the string.",
  }),
  defineQuestion({
    name: "How big is a giraffe?",
    acceptedAnswer: "A giraffe is 12 feet tall",
  }),
]);
</script>

<template>
  <Head>
    <Title>{{ page?.meta_title ?? "" }}</Title>
    <Meta name="description" :content="page?.meta_description" />
    <Meta name="keywords" :content="page?.meta_keywords" />
  </Head>

  <main class="max-w-4xl mx-auto px-4 py-6">
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
        <div class="mx-auto">
          <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">
            {{ page?.title }}
          </h1>
          <p class="text-center text-gray-500 mb-10">
            {{ page?.subtitle }}
          </p>
        </div>
        <!-- Search Bar -->
        <div class="flex justify-center mb-8">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for a question..."
            class="w-full max-w-sm border border-border rounded-full px-5 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-4">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            class="border border-border rounded-2xl overflow-hidden"
          >
            <button
              @click="toggle(index)"
              class="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{{ faq.question }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': activeIndex === index }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-screen"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="opacity-100 max-h-screen"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="activeIndex === index"
                class="px-6 pb-4 text-gray-600 bg-gray-50"
              >
                {{ faq.answer }}
              </div>
            </transition>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredFaqs.length === 0"
          class="text-center mt-10 text-gray-500"
        >
          No results found for "<strong>{{ searchQuery }}</strong
          >"
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped></style>
