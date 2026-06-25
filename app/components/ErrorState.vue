<script setup>
defineProps({
    title: {
        type: String,
        default: "Something went wrong"
    },

    description: {
        type: String,
        default: "Please try again later."
    },

    retry: {
        type: Function,
        default: null
    }
})
</script>

<template>
    <ClientOnly>
        <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div class="mb-4 flex size-16 items-center justify-center rounded-full bg-red-50">
                <Icon name="heroicons:exclamation-triangle" class="size-8 text-red-500" />
            </div>

            <h2 class="text-lg font-semibold">
                {{ title }}
            </h2>

            <p class="mt-2 max-w-md text-sm text-muted-foreground">
                {{ description }}
            </p>

            <button v-if="retry"
                class="mt-6 rounded bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                @click="retry">
                Try Again
            </button>

            <slot />
        </div>
    </ClientOnly>
</template>