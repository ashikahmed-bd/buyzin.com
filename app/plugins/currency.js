export default defineNuxtPlugin((nuxtApp) => {
  const currency = (amount) => {
    const formatted = new Intl.NumberFormat("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

    return `৳${formatted}`;
  };

  nuxtApp.provide("currency", currency);
});
