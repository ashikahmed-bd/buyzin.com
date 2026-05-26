<script setup>
import { ref } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // Example: [{ label: 'Tab 1', slot: 'tab1' }, { label: 'Tab 2', slot: 'tab2' }]
  },
});

const activeTab = ref(0);
</script>

<template>
  <div>
    <!-- Tab Headers -->
    <div class="flex border-b border-border">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-4 py-2 -mb-px border-b-2"
        :class="
          activeTab === index
            ? 'border-primary text-primary font-semibold'
            : 'border-transparent text-gray-500 hover:text-primary/70'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="p-4">
      <slot :name="tabs[activeTab].slot"></slot>
    </div>
  </div>
</template>

<style scoped></style>
