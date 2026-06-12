<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index) {
  activeIndex.value = index;
}

function select(index) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}

const isVideoOpen = ref(false)
const videoUrl = ref('')

const videoPlay = (url) => {
  const id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^?&]+)/)?.[1]

  if (!id) return

  videoUrl.value = `https://www.youtube.com/embed/${id}?autoplay=1`
  isVideoOpen.value = true
}
</script>

<template>
  <div class="w-full">
    <div class="overflow-hidden">
      <UCarousel v-if="product.gallery" ref="carousel" v-slot="{ item }" arrows :items="product.gallery"
        :prev="{ onClick: onClickPrev }" :next="{ onClick: onClickNext }" prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right" :ui="{
          container: 'gap-0',
          item: 'basis-full',
          prev: 'start-3 size-9 rounded-full bg-white/90 shadow border border-gray-200',
          next: 'end-3 size-9 rounded-full bg-white/90 shadow border border-gray-200',
        }" class="w-full" @select="onSelect">
        <div class="relative aspect-square rounded-2xl overflow-hidden">
          <NuxtImg :src="item" :alt="product.meta_title" loading="lazy" class="w-full h-full object-cover" />
          <button v-if="product.video_url" @click="videoPlay(product.video_url)"
            class="absolute inset-0 flex items-center justify-center">
            <div class="size-16 rounded-full bg-black/70 flex items-center justify-center">
              <UIcon name="i-heroicons-play-solid" class="size-8 text-white ml-1" />
            </div>
          </button>
        </div>
      </UCarousel>

      <div v-else class="relative aspect-square rounded-2xl overflow-hidden">
        <NuxtImg :src="product.cover_url" :alt="product.meta_title" loading="lazy" class="w-full h-full object-cover" />
        <button v-if="product.video_url" @click="videoPlay(product.video_url)"
          class="absolute inset-0 flex items-center justify-center">
          <div class="size-16 rounded-full bg-black/70 flex items-center justify-center">
            <UIcon name="i-heroicons-play-solid" class="size-8 text-white ml-1" />
          </div>
        </button>
      </div>
    </div>

    <div v-if="product.gallery" class="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button v-for="(item, index) in product.gallery" :key="index" type="button"
        class="shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all" :class="activeIndex === index
          ? 'border-primary ring-2 ring-primary/15'
          : 'border-gray-200'
          " @click="select(index)">
        <NuxtImg :src="item" :alt="product.meta_title" loading="lazy" class="size-20 sm:size-28 object-cover p-2" />
      </button>
    </div>
  </div>

  <UModal v-model:open="isVideoOpen" @update:open="(open) => !open && (videoUrl = '')" :ui="{
    content: 'max-w-5xl p-0 overflow-hidden'
  }">
    <template #content>
      <div class="aspect-video w-full bg-black">
        <iframe :src="videoUrl" class="w-full h-full" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen />
      </div>
    </template>
  </UModal>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
