<script setup>
defineProps({
    store: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <NuxtLink :to="`/stores/${store.slug}`"
        class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-3 text-center transition duration-300 hover:border-primary sm:flex-row sm:text-left">
        <div class="size-16 flex shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <NuxtImg :src="store.logo_url" :alt="store.name" class="size-12 object-contain" />
        </div>

        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-center gap-1 sm:justify-start">
                <h4 class="truncate font-semibold text-title">
                    {{ store.name }}
                </h4>

                <UIcon v-if="store.verified" name="i-heroicons-check-badge" class="size-4 shrink-0 text-green-600" />
            </div>

            <div class="mt-1 flex items-center justify-center gap-1 text-xs sm:justify-start">
                <UIcon name="i-heroicons-star-solid" class="size-4 shrink-0 text-yellow-500" />

                <span class="font-medium">
                    {{ store.rating }}
                </span>

                <span class="text-body">
                    ({{ store.reviews_count }} reviews)
                </span>
            </div>
        </div>
    </NuxtLink>
</template>