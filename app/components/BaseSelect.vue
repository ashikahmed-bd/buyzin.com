<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  items: {
    type: Array,
    default: () => [],
  },
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="relative block mb-3">
    <label v-if="label" class="block mb-2 capitalize">
      {{ label }}
    </label>
    <select
      v-model="modelValue"
      :class="[
        'w-full border rounded px-3 py-2 focus:outline-cyan-500 focus:ring focus:ring-cyan-200',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
    >
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <small v-if="error" class="text-red-500">{{ error[0] }}</small>
  </div>
</template>

<style scoped></style>
