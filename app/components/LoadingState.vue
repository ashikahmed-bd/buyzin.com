<script setup>
defineProps({
    title: {
        type: String,
        default: "Loading..."
    },
})
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center gap-4">
        <div class="size-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p class="text-sm text-muted-foreground">
            {{ title }}
        </p>
    </div>
</template>