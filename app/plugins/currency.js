export default defineNuxtPlugin(() => {
  const currency = (amount, currency = "BDT") => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  return {
    provide: {
      currency,
    },
  };
});
