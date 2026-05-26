<script setup>
const props = defineProps({
  date: {
    type: [String, Number, Date],
    required: true,
  },
});

const now = ref(Date.now());
let interval = null;

const targetTime = computed(() => new Date(props.date).getTime());

const diff = computed(() => Math.max(targetTime.value - now.value, 0));

const isExpired = computed(() => diff.value <= 0);

const timeLeft = computed(() => {
  const totalSeconds = Math.floor(diff.value / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
});

onMounted(() => {
  interval = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div v-if="!isExpired" class="flex gap-2">
    <div class="bg-gray-900 text-white rounded py-0.5 px-1">
      {{ timeLeft.days }}
    </div>
    <div class="bg-gray-900 text-white rounded py-0.5 px-1">
      {{ timeLeft.hours }}
    </div>
    <div class="bg-gray-900 text-white rounded py-0.5 px-1">
      {{ timeLeft.minutes }}
    </div>
    <div class="bg-gray-900 text-white rounded py-0.5 px-1">
      {{ timeLeft.seconds }}
    </div>
  </div>

  <div
    v-else
    class="inline-flex rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
  >
    Offer expired
  </div>
</template>
