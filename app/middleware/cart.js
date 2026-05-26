export default defineNuxtRouteMiddleware((to, from) => {
  const cart = useCartStore();
  const { items } = storeToRefs(cart);

  if (!items.value.length) {
    return navigateTo("/cart");
  }
});
