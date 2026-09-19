<script setup>
defineProps({
  title: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center px-4 py-6 text-center"
  >
    <span class="loader"></span>

    <div class="mt-5 max-w-sm">
      <p class="text-base font-semibold tracking-tight text-title">
        {{ title }}
      </p>

      <p class="mt-1.5 text-sm leading-6 text-slate-500">
        Please wait while we prepare everything for you.
      </p>
    </div>
  </div>
</template>

<style scoped>
.loader {
  --color-1: rgb(15 23 42 / 0.12);
  --color-2: var(--color-primary);
  --size: 1px;

  display: block;
  width: calc(50 * var(--size));
  height: calc(50 * var(--size));

  animation: rotate 1.8s infinite;
}

.loader::before,
.loader::after {
  display: block;
  width: calc(20 * var(--size));
  height: calc(20 * var(--size));

  content: "";
  border-radius: 50%;
}

/* First Ball */
.loader::before {
  margin-bottom: calc(10 * var(--size));

  background-color: var(--color-1);

  box-shadow: calc(30 * var(--size)) 0 0 var(--color-2);

  animation: ball1 1.8s infinite;
}

/* Second Ball */
.loader::after {
  background-color: var(--color-2);

  box-shadow: calc(30 * var(--size)) 0 0 var(--color-1);

  animation: ball2 1.8s infinite;
}

/* Rotation */
@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.8);
  }

  50% {
    transform: rotate(360deg) scale(1.15);
  }

  100% {
    transform: rotate(720deg) scale(0.8);
  }
}

/* First Ball Animation */
@keyframes ball1 {
  0% {
    box-shadow: calc(30 * var(--size)) 0 0 var(--color-2);
  }

  50% {
    margin-bottom: 0;

    transform: translate(calc(15 * var(--size)), calc(15 * var(--size)));

    box-shadow: 0 0 0 var(--color-2);
  }

  100% {
    margin-bottom: calc(10 * var(--size));

    box-shadow: calc(30 * var(--size)) 0 0 var(--color-2);
  }
}

/* Second Ball Animation */
@keyframes ball2 {
  0% {
    box-shadow: calc(30 * var(--size)) 0 0 var(--color-1);
  }

  50% {
    margin-top: calc(-20 * var(--size));

    transform: translate(calc(15 * var(--size)), calc(15 * var(--size)));

    box-shadow: 0 0 0 var(--color-1);
  }

  100% {
    margin-top: 0;

    box-shadow: calc(30 * var(--size)) 0 0 var(--color-1);
  }
}
</style>
