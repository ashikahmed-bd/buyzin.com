<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const toggle = (e) => {
  e.stopPropagation();
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <li class="block">
    <div class="flex items-center justify-between hover:bg-gray-100 rounded-lg py-2 px-3">
      <a :href="`/shop?categories/${item.slug}`" class="flex items-center gap-2 w-1/2">
        <NuxtImg v-if="item.image_url" :src="item.image_url" loading="eager" class="w-6 h-6 rounded object-cover" />
        <span class="text-sm font-medium whitespace-nowrap">{{item.name}}</span>
      </a>

      <div v-if="item.children?.length" class="flex justify-end w-1/2 cursor-pointer p-1" @click="toggle">
        <UIcon v-if="isOpen" name="i-lucide-chevron-down" class="size-4"/>
        <UIcon v-else name="i-lucide-chevron-right" class="size-4"/>
      </div>
    </div>

    <ul v-if="item.children?.length" class="ml-6 mt-1 space-y-1" v-show="isOpen">
      <NavigationItem v-for="child in item.children" :key="child.id" :item="child" />
    </ul>
  </li>
</template>
