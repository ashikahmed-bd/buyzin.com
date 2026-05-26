<script setup>
import { onMounted, ref } from 'vue'
import apiClient from '~/utils/axios'

const props = defineProps({
  position: {
    type: String,
    required: true,
  },
})

const banner = ref(null)
const loading = ref(true)

const loadBanner = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/api/banners', {
      params: { position: props.position },
    })
    banner.value = response.data
  } catch (error) {
    banner.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBanner()
})
</script>

<template>
  <div class="relative w-full rounded-xl overflow-hidden">
    <div v-if="loading" class="w-full h-64 bg-gray-200 animate-pulse rounded-xl">
    </div>
    <div v-else-if="banner?.data" class="group">
      <NuxtLink :to="banner.data.target_url || '/'" class="block w-full h-full">
        <NuxtImg :src="banner.data.image_url" :alt="banner.data.title" loading="lazy"
          class="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </NuxtLink>
    </div>
    <div v-else class="w-full h-64 bg-gray-100 rounded-xl"></div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
