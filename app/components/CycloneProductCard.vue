<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <article class="group bg-white rounded overflow-hidden transition border border-border">
        <div class="relative bg-gray-100 aspect-square overflow-hidden">
            <NuxtLink :to="`/product/${product.slug}/${product.id}`" :title="product.meta_title">
                <NuxtImg :src="product.cover_url" :alt="product.meta_title ?? product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            </NuxtLink>

            <div v-if="product.has_discount"
                class="absolute top-2 left-2 bg-danger text-white text-xs px-2 py-1 rounded">
                -{{ product.discount_percentage }} OFF
            </div>
        </div>

        <div class="p-3 space-y-2">
            <NuxtLink :to="`/product/${product.slug}/${product.id}`" :title="product.meta_title">
                <h3 class="text-sm font-medium line-clamp-2 text-heading hover:text-primary transition">
                    {{ product.name }}
                </h3>
            </NuxtLink>


            <div class="flex items-center gap-2 ">
                <span class="text-red-600 font-bold font-bangla">
                    {{ product.price_formatted }}
                </span>

                <span v-if="product.base_price_formatted" class="text-gray-400 line-through text-xs font-bangla">
                    {{ product.base_price_formatted }}
                </span>
            </div>

            <div class="space-y-1">
                <div class="flex justify-between text-xs text-gray-500">
                    <span>{{ Math.min(Math.round((product.sold_count / product.quantity) * 100), 100) }}% Sold</span>
                    <span>{{ product.sold_count }} sold</span>
                </div>

                <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all"
                        :style="{ width: Math.min(Math.round((product.sold_count / product.quantity) * 100), 100) + '%' }" />
                </div>
            </div>
        </div>
    </article>
</template>