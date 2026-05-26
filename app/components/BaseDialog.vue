<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Dialog" },
  size: {
    type: String,
    default: "lg",
    validator: (val) => ["sm", "md", "lg", "xl", "full"].includes(val),
  },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "max-w-sm";
    case "md":
      return "max-w-md";
    case "lg":
      return "max-w-2xl";
    case "xl":
      return "max-w-4xl";
    case "full":
      return "max-w-full";
    default:
      return "max-w-md";
  }
});
</script>

<template>
  <div v-if="modelValue"
    class="fixed inset-0 z-40 flex items-start justify-center overflow-x-hidden overflow-y-auto scrollbar bg-black/50 pt-8">
    <div @click.stop class="bg-white rounded-xl w-full mx-4 mb-8 flex flex-col" :class="sizeClass">
      <div class="flex justify-between items-center border-b border-gray-200 p-4">
        <h4 class="text-lg font-semibold text-heading">{{ title }}</h4>
        <button @click="$emit('update:modelValue', false)" class="text-body hover:text-danger cursor-pointer">
          <IconsIconClose class="size-5" />
        </button>
      </div>

      <div class="px-6 py-6 space-y-4">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
