<script setup>
const route = useRoute()
const config = useRuntimeConfig()

const faqs = [
  {
    category: "Orders & Shopping",
    items: [
      {
        question: "How do I place an order on Buyzin?",
        answer:
          "Browse products, add items to your cart, proceed to checkout, enter your shipping details, and complete payment."
      },
      {
        question: "Can I cancel my order after placing it?",
        answer:
          "Orders can be cancelled before they are shipped. Contact our support team as soon as possible."
      },
      {
        question: "How can I track my order?",
        answer:
          "You can track your order from your account dashboard under the Orders section."
      }
    ]
  },
  {
    category: "Payments",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept Cash on Delivery (COD), Visa, Mastercard, Mobile Banking, and Online Payments."
      },
      {
        question: "Is online payment secure?",
        answer:
          "Yes. All transactions are processed through secure payment gateways with industry-standard encryption."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery usually takes 1–3 business days inside Dhaka and 2–7 business days outside Dhaka."
      },
      {
        question: "Do you deliver nationwide?",
        answer:
          "Yes. Buyzin delivers products across Bangladesh."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Eligible products can be returned within the return window if they meet our return conditions."
      },
      {
        question: "How do refunds work?",
        answer:
          "Approved refunds are processed to the original payment method or store credit depending on the payment type."
      }
    ]
  },
  {
    category: "Warranty & Support",
    items: [
      {
        question: "Do products come with warranty?",
        answer:
          "Warranty coverage depends on the product and brand. Warranty information is shown on the product page."
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can contact us through our contact page, email, or customer support hotline."
      }
    ]
  }
]


useSchemaOrg([
  defineWebPage({
    name: 'Frequently Asked Questions (FAQ) | Buyzin Bangladesh',
    description:
      'Find answers to common questions about orders, payments, shipping, delivery, returns, refunds, warranty, and customer support at Buyzin.',
    url: new URL(route.fullPath, config.public.siteUrl).toString(),
    inLanguage: 'en-US',
  }),

  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Home',
        item: new URL('/', config.public.siteUrl).toString(),
      },
      {
        name: 'FAQ',
        item: new URL(route.fullPath, config.public.siteUrl).toString(),
      },
    ],
  }),

  {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I place an order on Buyzin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browse products, add items to your cart, proceed to checkout, enter your shipping details, and complete payment.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I track my order?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can track your order from your account dashboard under the Orders section.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods are accepted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept Cash on Delivery (COD), Visa, Mastercard, Mobile Banking, and secure online payments.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does delivery take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Delivery typically takes 1-3 business days inside Dhaka and 2-7 business days outside Dhaka.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I return a product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eligible products can be returned within the applicable return period according to our return policy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do products come with warranty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Warranty coverage varies by product and brand. Please check the warranty information on the product page.',
        },
      },
    ],
  },
])
</script>

<template>

  <main class="max-w-4xl mx-auto px-4 py-6">

    <Head>
      <Title>Frequently Asked Questions (FAQ) | Buyzin Bangladesh</Title>
      <Meta name="description"
        content="Find answers to common questions about orders, payments, shipping, returns, refunds, warranty, and account management at Buyzin Bangladesh." />
      <Meta name="keywords"
        content="Buyzin FAQ, Buyzin help center, online shopping Bangladesh, order tracking, return policy, refund policy, payment methods, warranty information, ecommerce support" />
    </Head>


    <div class="bg-white">
      <section class="border-b border-gray-100">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>

            <p class="mt-4 text-lg text-gray-600">
              Find quick answers about orders, payments, delivery,
              returns, warranties, and more.
            </p>
          </div>
        </div>
      </section>

      <section class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto space-y-10">
          <div v-for="section in faqs" :key="section.category" class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900 border-b pb-3">
              {{ section.category }}
            </h2>

            <UAccordion :items="section.items.map(item => ({
              label: item.question,
              content: item.answer
            }))
              " />
          </div>
        </div>
      </section>

      <section class="bg-gray-50">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900">
              Still Need Help?
            </h2>

            <p class="mt-4 text-gray-600">
              Can't find the answer you're looking for? Our support team is ready to help.
            </p>

            <div class="mt-8">
              <UButton to="/contact-us" size="xl">
                Contact Support
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
