<script setup>
const props = defineProps({
    label: { type: String, default: "Select" },
    options: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(["select"])
const open = ref(false)

function selectOption(option) {
    emit("select", option)
    open.value = false
}
</script>

<template>
    <div class="relative inline-block text-left" @click.outside="open = false">
        <button @click.stop="open = !open"
            class="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded hover:bg-gray-50 transition">
            <span>{{ label }}</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <ul v-if="open" class="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded z-50">
                <li v-for="(option, index) in options" :key="index">
                    <button @click.stop="selectOption(option)"
                        class="w-full flex items-center px-4 py-2 whitespace-nowrap text-left text-sm text-gray-700 hover:bg-gray-100">
                        {{ option.label }}
                    </button>
                </li>
            </ul>
        </transition>
    </div>
</template>
