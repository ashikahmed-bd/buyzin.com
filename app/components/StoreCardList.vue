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
        class="overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1">
        <div class="relative">
            <NuxtImg :src="store.banner_url" :alt="store.name" class="w-full h-auto" />
            <div
                class="absolute left-2.5 bottom-0 translate-y-1/2 z-10 size-12 overflow-hidden rounded-full border-2 border-white bg-white">
                <img :src="store.logo_url" :alt="store.name" class="h-full w-full object-cover" />
            </div>
        </div>

        <div class="relative z-10 p-4 pt-5">
            <div class="flex items-center gap-2">
                <h3 class="font-semibold text-gray-900">
                    {{ store.name }}
                </h3>

                <UIcon v-if="store.verified" name="i-lucide-badge-check" class="h-4 w-4 text-blue-500" />
            </div>

            <div class="mt-2 flex items-center text-sm text-gray-500">
                <UIcon v-for="i in 5" :key="i" :name="i <= Math.round(store.rating)
                    ? 'heroicons:star-solid'
                    : 'heroicons:star'" class="size-4" :class="i <= Math.round(store.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'" />
                <span>{{ store.rating }}</span>
                <span class="ml-2">({{ store.reviews_count }})</span>
            </div>

            <a :href="`/stores/${store.slug}`"
                class="mt-4 flex h-10 items-center justify-center rounded-lg border border-gray-200 font-medium text-gray-700 transition hover:bg-gray-50">
                Visit Store
            </a>
        </div>
    </div>
</template>