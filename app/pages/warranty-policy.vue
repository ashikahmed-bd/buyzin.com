<script setup>
const route = useRoute()
const config = useRuntimeConfig()

useSchemaOrg([
    defineWebPage({
        name: 'Warranty Policy | Buyzin Bangladesh - Buyzin.com',
        description:
            'Buyzin.com Warranty Policy explains product coverage, warranty conditions, claim process, exclusions, and support guidelines for customers in Bangladesh.',
        url: new URL(route.fullPath, config.public.siteUrl).toString(),
        inLanguage: 'en-BD',
    }),

    defineBreadcrumb({
        items: [
            { name: 'Home', item: '/' },
            { name: 'Warranty Policy', item: '/warranty-policy' },
        ],
    }),
])
</script>

<template>
    <main class="max-w-5xl mx-auto px-4 py-10">
        <Head>
            <Title>Warranty Policy | Buyzin.com Bangladesh</Title>

            <Meta name="description"
                content="Buyzin.com Warranty Policy outlines coverage, exclusions, claim process, and support guidelines for all eligible products purchased from Buyzin Bangladesh." />

            <Meta name="keywords"
                content="Buyzin warranty policy, product warranty Bangladesh, ecommerce warranty terms, Buyzin support, claim warranty Buyzin" />

            <Meta name="robots" content="index, follow" />
            <Link rel="canonical" href="/warranty-policy" />
        </Head>

        <header class="mb-10 border-b pb-6">
            <h1 class="text-3xl font-bold text-gray-900">
                Warranty Policy
            </h1>
            <p class="text-gray-600 mt-2 leading-relaxed">
                This Warranty Policy explains how product warranties are handled at Buyzin.com,
                including coverage, exclusions, and claim procedures.
            </p>
        </header>

        <section class="space-y-8 text-gray-700 leading-relaxed">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    1. Warranty Coverage
                </h2>
                <p class="mt-2">
                    At Buyzin.com, certain products are covered under manufacturer or seller warranty.
                    Warranty applies only to defects in materials or workmanship under normal usage conditions.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    2. Warranty Duration
                </h2>
                <p class="mt-2">
                    Warranty period varies by product, brand, and category. The exact duration is clearly
                    mentioned on the product page or invoice at the time of purchase. In case of mismatch,
                    invoice terms will be considered final.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    3. Warranty Exclusions
                </h2>
                <ul class="mt-2 list-disc pl-6 space-y-1">
                    <li>Physical damage, cracks, burns, or accidental damage</li>
                    <li>Liquid or water damage (unless explicitly stated)</li>
                    <li>Unauthorized repair, modification, or tampering</li>
                    <li>Improper installation or misuse of product</li>
                    <li>Normal wear and tear over time</li>
                </ul>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    4. Warranty Claim Process
                </h2>
                <p class="mt-2">
                    To initiate a warranty claim, customers must provide a valid order invoice and product details.
                    Claims can be submitted through our Help Center or Contact Support page.
                    Our team will verify eligibility before processing the request.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    5. Repair or Replacement Policy
                </h2>
                <p class="mt-2">
                    Depending on the issue and manufacturer policy, eligible products may be repaired or replaced.
                    If neither option is available, alternative resolution will be provided as per company policy.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    6. Processing Time
                </h2>
                <p class="mt-2">
                    Warranty processing time depends on product category and service center availability.
                    Typically, it may take 7–21 business days for complete resolution.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    7. Customer Responsibility
                </h2>
                <ul class="mt-2 list-disc pl-6 space-y-1">
                    <li>Keep original invoice safe for warranty claims</li>
                    <li>Use products as per manufacturer instructions</li>
                    <li>Report issues within warranty period</li>
                </ul>
            </div>

            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    8. Contact & Support
                </h2>
                <p class="mt-2">
                    For any warranty-related issues, contact Buyzin Support via Help Center or Contact page.
                    Our support team will assist you with the next steps.
                </p>
            </div>
        </section>
    </main>
</template>