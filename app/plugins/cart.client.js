export default defineNuxtPlugin(async () => {
  const cartStore = useCartStore();

  await callOnce(async () => {
    // await cartStore.getItems();
  });
});
