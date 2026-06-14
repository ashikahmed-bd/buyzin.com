<script setup>
import { ref } from 'vue'

const search = ref('')

const categories = [
    { title: 'Orders & Shipping', icon: '📦', desc: 'Track orders, delivery info & returns' },
    { title: 'Payments & Refunds', icon: '💳', desc: 'Payment methods, refunds & invoices' },
    { title: 'Account & Security', icon: '🔐', desc: 'Login, password & account safety' },
    { title: 'Products & Warranty', icon: '🛠️', desc: 'Product info, warranty & support' },
    { title: 'Seller Support', icon: '🏪', desc: 'Sell on Buyzin & manage your store' },
    { title: 'Technical Help', icon: '⚙️', desc: 'Website & app related issues' },
]

const faqs = ref([
    {
        q: 'How can I track my order?',
        a: 'You can track your order from your account dashboard under the “My Orders” section.',
        open: false,
    },
    {
        q: 'What payment methods are supported?',
        a: 'We support bKash, Nagad, Rocket, debit/credit cards and cash on delivery.',
        open: false,
    },
    {
        q: 'How do I request a refund?',
        a: 'Refund requests can be made from order details within 7 days of delivery.',
        open: false,
    },
])


</script>

<template>

    <Head>
        <Title>Buyzin Help Center | Customer Support, FAQs & Order Assistance</Title>

        <Meta name="description"
            content="Get help at Buyzin Help Center. Find answers to FAQs, track orders, manage payments, refunds, returns, and get customer support for shopping on Buyzin.com." />

        <Meta name="keywords"
            content="Buyzin help center, Buyzin support, Buyzin customer service, order tracking, payment help, refund policy, return process, FAQ Buyzin" />
    </Head>

    <main class="max-w-5xl mx-auto px-4 py-8">
        <div class="bg-white rounded-xl px-4 py-8">
            <!-- Hero Section -->
            <section class="bg-white border-b">
                <div class="max-w-7xl mx-auto px-4 py-14 text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
                        Buyzin Help Center
                    </h1>
                    <p class="text-gray-500 mt-2">
                        How can we help you today?
                    </p>

                    <div class="max-w-2xl mx-auto py-6">
                        <input v-model="search" type="text" placeholder="Search for help articles..."
                            class="w-full rounded-xl border border-gray-300 px-5 py-3 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                </div>
            </section>

            <!-- Categories -->
            <section class="max-w-7xl mx-auto px-4 py-12">
                <h2 class="text-xl font-semibold mb-6">Browse by Category</h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(cat, i) in categories" :key="i"
                        class="bg-white rounded-2xl p-6 border border-border transition cursor-pointer">
                        <div class="text-3xl">{{ cat.icon }}</div>
                        <h3 class="mt-3 font-semibold text-lg">{{ cat.title }}</h3>
                        <p class="text-sm text-gray-500 mt-1">
                            {{ cat.desc }}
                        </p>
                    </div>
                </div>
            </section>

            <!-- FAQ -->
            <section class="bg-white">
                <div class="max-w-4xl mx-auto px-4 py-12">
                    <h2 class="text-xl font-semibold mb-6">
                        Frequently Asked Questions
                    </h2>

                    <div class="space-y-4">
                        <div v-for="(faq, i) in faqs" :key="i" class="border rounded-xl p-4">
                            <button @click="faq.open = !faq.open"
                                class="w-full flex justify-between items-center text-left">
                                <span class="font-medium">{{ faq.q }}</span>
                                <span class="text-xl">
                                    {{ faq.open ? '−' : '+' }}
                                </span>
                            </button>

                            <p v-if="faq.open" class="text-sm text-gray-600 mt-3">
                                {{ faq.a }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Support -->
            <section class="bg-primary/5">
                <div class="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h2 class="text-2xl font-semibold">
                        Still need help?
                    </h2>
                    <p class="text-gray-600 mt-2">
                        Our support team is ready to assist you.
                    </p>

                    <div class="mt-6 flex justify-center gap-4">
                        <button class="px-6 py-3 rounded bg-primary text-white hover:bg-primary/90">
                            Contact Support
                        </button>
                        <button class="px-6 py-3 rounded border border-gray-300 hover:bg-white">
                            Live Chat
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>

</template>

<style scoped></style>
