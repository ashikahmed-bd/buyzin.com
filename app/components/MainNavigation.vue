<script setup>
const props = defineProps({
  categories: {
    type: Object,
    default: {},
  },
});

const categoryOpen = ref(false);
</script>

<template>
  <nav class="z-40 hidden bg-white lg:block border-b border-border py-2.5">
    <div class="container mx-auto flex items-center px-4">
      <div class="relative shrink-0">
        <button
          type="button"
          @click="categoryOpen = !categoryOpen"
          class="flex items-center gap-2 text-sm font-medium text-body"
        >
          <UIcon name="i-lucide-grip" class="size-4" />
          <span>All Categories</span>

          <UIcon
            :name="
              categoryOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
            "
            class="size-5"
          />
        </button>

        <div
          v-if="categoryOpen"
          @mouseleave="categoryOpen = false"
          class="absolute left-0 top-full z-50 mt-2 w-72 rounded-b-xl bg-white"
        >
          <ul
            class="max-h-[calc(100vh-180px)] space-y-1 overflow-y-auto scrollbar p-2"
          >
            <NavigationItem
              v-for="category in categories?.data ?? []"
              :key="category.id"
              :item="category"
            />
          </ul>

          <a
            href="/categories"
            class="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs font-semibold text-primary transition hover:bg-gray-50"
          >
            <span>View All Categories</span>
            <UIcon name="i-lucide-arrow-right" class="size-4" />
          </a>
        </div>
      </div>

      <div class="ml-8 flex items-center gap-4">
        <div class="ml-8 flex items-center gap-6">
          <a
            href="/"
            class="relative flex items-center whitespace-nowrap text-sm font-medium text-gray-800 transition hover:text-primary"
          >
            Home
          </a>

          <a
            href="/brands"
            class="relative flex items-center whitespace-nowrap text-sm font-medium text-gray-800 transition hover:text-primary"
          >
            Brands
          </a>

          <a
            href="/store/apply"
            class="relative flex items-center whitespace-nowrap text-sm font-medium text-gray-800 transition hover:text-primary"
          >
            Become a Seller
          </a>
        </div>
      </div>

      <div class="ml-auto flex items-center gap-6">
        <a
          href="/help"
          class="flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-primary"
        >
          <UIcon name="i-lucide-circle-help" class="size-4" />
          <span>Support</span>
        </a>

        <a
          href="tel:+8809649492233"
          class="flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-primary"
        >
          <UIcon name="i-lucide-headset" class="size-4" />
          <span>096 4949 2233</span>
        </a>
      </div>
    </div>
  </nav>
</template>
