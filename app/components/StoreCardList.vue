<script setup>
defineProps({
    store: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div
        class="overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1">
        <div class="relative h-32 overflow-hidden">
            <img :src="store.banner" :alt="store.name" class="h-full w-full object-cover" />
            <div
                class="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white shadow">
                <img :src="store.logo" :alt="store.name" class="h-full w-full rounded-full object-cover" />
            </div>
        </div>

        <div class="p-4 pt-5">
            <div class="flex items-center gap-2">
                <h3 class="font-semibold text-gray-900">
                    {{ store.name }}
                </h3>

                <UIcon v-if="store.verified" name="i-lucide-badge-check" class="h-4 w-4 text-blue-500" />
            </div>

            <div class="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <UIcon name="i-lucide-star" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{{ store.rating }}</span>
                <span>({{ store.reviews }})</span>
            </div>

            <p class="mt-2 text-sm text-gray-500">
                250+ Products
            </p>

            <NuxtLink :to="`/stores/${store.slug}`"
                class="mt-4 flex h-10 items-center justify-center rounded-lg border border-gray-200 font-medium text-gray-700 transition hover:bg-gray-50">
                Visit Store
            </NuxtLink>
        </div>
    </div>
</template>