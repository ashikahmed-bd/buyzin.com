<script setup>
import { computed } from 'vue'

const props = defineProps({
    meta: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['page-change'])

const changePage = (page) => {
    if (page < 1 || page > props.meta.last_page) return
    emit('page-change', page)
}

/**
 * Limit visible pages (1 ... 4 5 6 ... last)
 */
const pages = computed(() => {
    const current = props.meta.current_page
    const last = props.meta.last_page
    const delta = 2

    const range = []
    for (
        let i = Math.max(1, current - delta);
        i <= Math.min(last, current + delta);
        i++
    ) {
        range.push(i)
    }

    return range
})
</script>

<template>
    <div v-if="meta && meta.last_page > 1" class="flex items-center justify-center gap-2 mt-8">
        <!-- Prev -->
        <button :disabled="meta.current_page === 1" @click="changePage(meta.current_page - 1)" class="px-3 py-2 rounded border text-sm disabled:opacity-40
             hover:bg-gray-100">
            Prev
        </button>

        <!-- Pages -->
        <button v-for="page in pages" :key="page" @click="changePage(page)" :class="[
            'px-3 py-2 rounded text-sm border',
            page === meta.current_page
                ? 'bg-primary text-white border-primary'
                : 'hover:bg-gray-100'
        ]">
            {{ page }}
        </button>

        <!-- Next -->
        <button :disabled="meta.current_page === meta.last_page" @click="changePage(meta.current_page + 1)" class="px-3 py-2 rounded border text-sm disabled:opacity-40
             hover:bg-gray-100">
            Next
        </button>
    </div>
</template>
