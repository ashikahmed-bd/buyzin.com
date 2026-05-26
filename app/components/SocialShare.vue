<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Check this out!",
  },
  url: {
    type: String,
    default: () => (process.client ? window.location.href : ""),
  },
  platforms: {
    type: Array,
    default: () => ["facebook", "x", "linkedin", "whatsapp"],
  },
});

const share = (platform) => {
  const encodedURL = encodeURIComponent(props.url);
  const encodedText = encodeURIComponent(props.text);

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    x: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedURL}`,
  };

  if (links[platform]) {
    window.open(
      links[platform],
      "_blank",
      "width=600,height=500,scrollbars=yes,resizable=yes"
    );
  }
};
</script>

<template>
  <UModal
    title="Social Share"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <UButton icon="i-lucide-share-2" color="cyan" variant="subtle" />

    <template #body>
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-if="platforms.includes('facebook')"
          @click="share('facebook')"
          class="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition"
        >
          <UIcon name="i-fa6-brands-facebook" class="text-blue-600 text-xl" />
          <span class="text-blue-700 font-medium text-sm">Facebook</span>
        </div>

        <div
          v-if="platforms.includes('x')"
          @click="share('x')"
          class="flex items-center gap-2 bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
        >
          <UIcon name="i-fa6-brands-x-twitter" class="text-black text-xl" />
          <span class="text-black font-medium text-sm">X</span>
        </div>

        <div
          v-if="platforms.includes('linkedin')"
          @click="share('linkedin')"
          class="flex items-center gap-2 bg-blue-50 border border-blue-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition"
        >
          <UIcon name="i-fa6-brands-linkedin" class="text-blue-700 text-xl" />
          <span class="text-blue-800 font-medium text-sm">LinkedIn</span>
        </div>

        <div
          v-if="platforms.includes('whatsapp')"
          @click="share('whatsapp')"
          class="flex items-center gap-2 bg-green-50 border border-green-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-green-100 transition"
        >
          <UIcon name="i-fa6-brands-whatsapp" class="text-green-600 text-xl" />
          <span class="text-green-700 font-medium text-sm">WhatsApp</span>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style></style>
