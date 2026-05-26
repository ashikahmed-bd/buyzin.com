<script setup>
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.getProfile();
  }
});
</script>

<template>
  <Header />
  <slot />
  <Footer />
</template>
