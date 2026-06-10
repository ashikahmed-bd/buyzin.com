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
</script>

<template>
  <div class="w-full">
    <div class="overflow-hidden rounded-2xl bg-white">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        arrows
        :items="product.gallery ?? product.cover_url"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :ui="{
          container: 'gap-0',
          item: 'basis-full',
          prev: 'start-3 size-9 rounded-full bg-white/90 shadow border border-gray-200',
          next: 'end-3 size-9 rounded-full bg-white/90 shadow border border-gray-200',
        }"
        class="w-full"
        @select="onSelect"
      >
        <div class="aspect-square w-full bg-gray-50">
          <NuxtImg
            :src="item"
            :alt="product.meta_title"
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </UCarousel>
    </div>

    <div class="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button
        v-for="(item, index) in product.gallery"
        :key="index"
        type="button"
        class="shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all"
        :class="
          activeIndex === index
            ? 'border-primary ring-2 ring-primary/15'
            : 'border-gray-200'
        "
        @click="select(index)"
      >
        <NuxtImg
          :src="item"
          :alt="product.meta_title"
          loading="lazy"
          class="size-16 sm:size-20 object-cover"
        />
      </button>
    </div>
  </div>
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
