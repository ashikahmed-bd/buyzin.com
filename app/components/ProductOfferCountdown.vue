<script setup>
const props = defineProps({
  endDate: {
    type: [String, Number, Date],
    required: true,
  },
  title: {
    type: String,
    default: "Discount 20 OFF!",
  },
  icon: {
    type: String,
    default: "i-lucide-badge-percent",
  },
});

const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

let timer = null;

const updateTimer = () => {
  const target = new Date(props.endDate).getTime();
  const distance = target - Date.now();

  if (distance <= 0) {
    timeLeft.value = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    return;
  }

  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

onMounted(() => {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div
    class="bg-gradient-to-r from-blue-700 via-indigo-500 to-indigo-900 w-full flex items-center justify-between gap-4 rounded-xl px-4 py-3"
  >
    <div class="flex min-w-0 items-center gap-2.5">
      <div
        class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-red-500 shadow-sm"
      >
        <UIcon :name="icon" class="size-6" />
      </div>

      <h4 class="text-base font-semibold text-white">
        {{ title }}
      </h4>
    </div>

    <div class="flex shrink-0 items-center gap-1">
      <template v-for="(value, key, index) in timeLeft" :key="key">
        <div
          class="flex min-w-9 flex-col items-center rounded bg-white/30 px-2 py-1.5"
        >
          <span class="text-sm font-bold leading-none text-white">
            {{ String(value).padStart(2, "0") }}
          </span>

          <small
            class="mt-1 text-[8px] font-medium uppercase leading-none text-white"
          >
            {{ key }}
          </small>
        </div>

        <span v-if="index < 3" class="px-0.5 text-sm font-bold text-gray-400">
          :
        </span>
      </template>
    </div>
  </div>
</template>
