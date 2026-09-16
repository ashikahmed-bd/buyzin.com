<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },

  modelValue: {
    type: [String, Number],
    default: "",
  },

  items: {
    type: Array,
    default: () => [],
  },

  placeholder: {
    type: String,
    default: "Select an option",
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="mb-3">
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700">
      {{ label }}

      <span v-if="required" class="ml-0.5 text-red-500">*</span>
    </label>

    <select
      v-model="model"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full appearance rounded border bg-white px-3 py-2 text-sm text-gray-800 outline-none transition',
        'focus:border-primary focus:ring-1 focus:ring-primary/20',
        'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
          : 'border-gray-200',
      ]"
    >
      <option value="" disabled>
        {{ placeholder }}
      </option>

      <option v-for="item in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>

    <small v-if="error" class="mt-1 block text-xs text-red-500">
      {{ error }}
    </small>
  </div>
</template>
