<template>
  <div class="flex items-start gap-4 flex-wrap">
    <div
      class="w-20 h-20 flex items-center justify-center border border-dashed border-gray-200 rounded-lg text-gray-400 flex-shrink-0 overflow-hidden">
      <template v-if="preview">
        <img :src="preview" alt="Preview" class="object-cover w-full h-full" />
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </template>
    </div>

    <div class="flex-1 min-w-xs">
      <div class="flex items-center gap-3 flex-wrap mb-3">
        <label
          class="inline-flex items-center px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition">
          <span class="text-sm font-medium">Upload</span>
          <input type="file" class="sr-only" @change="handleFileChange" :accept="accept" />
        </label>

        <button type="button" class="base__button hover:underline" @click="removeFile">
          Remove
        </button>
      </div>
      <p class="text-xs text-gray-500">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: File,
  accept: { type: String, default: 'image/*' },
  hint: { type: String, default: 'Upload image size 2MB, Format JPG, PNG, SVG' },
})

const emit = defineEmits(['update:modelValue'])

const file = ref(props.modelValue || null)
const preview = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    file.value = val
    if (val instanceof File) {
      const reader = new FileReader()
      reader.onload = (e) => (preview.value = e.target.result)
      reader.readAsDataURL(val)
    } else {
      preview.value = null
    }
  },
  { immediate: true },
)

function handleFileChange(event) {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  file.value = selectedFile
  emit('update:modelValue', selectedFile)

  const reader = new FileReader()
  reader.onload = (e) => (preview.value = e.target.result)
  reader.readAsDataURL(selectedFile)
}

function removeFile() {
  file.value = null
  preview.value = null
  emit('update:modelValue', null)
}
</script>

<style scoped></style>
