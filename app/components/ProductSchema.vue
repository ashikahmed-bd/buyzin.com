<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
})

const route = useRoute()
const config = useRuntimeConfig()

// Wrap everything in computed refs so it's reactive
useSchemaOrg([

    defineWebPage(() => ({
        name: props.product?.name,
        description: props.product?.meta_description ?? props.product?.summary ?? '',
        url: new URL(route.fullPath, config.public.siteUrl).toString(),
        inLanguage: 'en-BD',
    })),

    defineBreadcrumb(() => ({
        itemListElement: [
            {
                name: 'Home',
                item: config.public.siteUrl,
            },
            {
                name: props.product?.category?.name ?? 'category',
                item: `${config.public.siteUrl}/categories/${props.product?.category?.slug ?? ''}`,
            },
            {
                name: props.product?.name,
                item: new URL(route.fullPath, config.public.siteUrl).toString(),
            },
        ],
    })),

    defineProduct(() => ({
        name: props.product?.meta_title,
        description: props.product?.meta_description ?? '',
        image: [
            props.product?.cover_url,
            ...(props.product?.gallery ?? [])
        ],
        sku: props.product?.sku,
        mpn: props.product?.mpn ?? props.product?.sku,
        category: props.product?.category?.name,
        brand: {
            name: props.product?.brand?.name ?? 'Individual',
        },
        offers: {
            url: new URL(route.fullPath, config.public.siteUrl).toString(),
            priceCurrency: 'BDT',
            price: props.product?.price,
            availability: props.product?.quantity > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            priceValidUntil: '2027-12-31',
            shippingDetails: {
                shippingRate: { value: 100, currency: 'BDT' },
                shippingDestination: { addressCountry: 'BD' },
                deliveryTime: {
                    handlingTime: { minValue: 1, maxValue: 2, unitCode: 'DAY' },
                    transitTime: { minValue: 2, maxValue: 5, unitCode: 'DAY' },
                },
            },
            hasMerchantReturnPolicy: {
                applicableCountry: 'BD',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 7,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
            },
        },
        aggregateRating: {
            ratingValue: props.product?.rating_avg ?? 0,
            reviewCount: parseInt(String(props.product?.review_count ?? '0')),
            bestRating: 5,
            worstRating: 1,
        },
    })),

])
</script>

<template></template>