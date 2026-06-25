<script setup>
defineProps({
    title: {
        type: String,
        default: "No data found"
    },

    description: {
        type: String,
        default: "There is nothing to display right now."
    }
})
</script>

<template>
    <ClientOnly>
        <div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div class="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Icon name="heroicons:inbox" class="size-8 text-muted-foreground" />
            </div>

            <h2 class="text-lg font-semibold">
                {{ title }}
            </h2>

            <p class="mt-2 max-w-md text-sm text-muted-foreground">
                {{ description }}
            </p>
            <slot />
        </div>
    </ClientOnly>
</template>